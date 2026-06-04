"""
translate_transcripts.py — 调用 DeepSeek API 批量翻译听力原文

用法: python scripts/translate_transcripts.py
自动从 .env 读取 VITE_DEEPSEEK_API_KEY。

特性:
- 批量翻译（每批 4 个 section），大幅减少 API 调用次数
- 增量翻译：已存在于 transcripts-cn.json 中的 section 跳过
- 每批后自动保存进度
"""
import json
import re
import os
import sys
import time
import urllib.request
import urllib.error
from pathlib import Path

ROOT = Path(__file__).parent.parent
SECTIONS_PATH = ROOT / 'src' / 'data' / 'sections.ts'
OUTPUT_PATH = ROOT / 'src' / 'data' / 'transcripts-cn.json'
DEEPSEEK_API_URL = 'https://api.deepseek.com/chat/completions'

BATCH_SIZE = 4

BATCH_SYSTEM_PROMPT = """你是一位专业翻译。请将以下英语四级听力原文翻译成中文，每个section独立翻译。

要求：
1. 保持原文段落结构
2. 翻译准确流畅，符合中文表达习惯
3. 保留专有名词（人名、地名、机构名）的英文原文
4. 数字保持原样

请严格按以下JSON格式输出，key是section ID，value是中文翻译：
{
  "2024-06-S1-SecA-1": "中文翻译...",
  "2024-06-S1-SecA-2": "中文翻译..."
}

只输出JSON，不要加任何解释或说明。"""


def get_api_key():
    """Read API key from .env file or environment."""
    # Try .env file
    env_path = ROOT / '.env'
    if env_path.exists():
        content = env_path.read_text(encoding='utf-8')
        for line in content.split('\n'):
            if 'VITE_DEEPSEEK_API_KEY' in line:
                key = line.split('=', 1)[1].strip()
                if key:
                    return key
    # Try environment
    key = os.environ.get('VITE_DEEPSEEK_API_KEY', '') or os.environ.get('DEEPSEEK_API_KEY', '')
    return key


def parse_sections_ts():
    content = SECTIONS_PATH.read_text(encoding='utf-8')
    pattern = re.compile(
        r"id:\s*'(\d{4}-\d{2}-S\d-Sec[ABC]-\d+)',\s*"
        r"year:\s*\d{4},\s*"
        r"month:\s*\d+,\s*"
        r"setNumber:\s*\d+,\s*"
        r"label:\s*'[^']+',\s*"
        r"(?:\.\.\.aud\(\d+,\s*\d+,\s*\d+,\s*\d+\),\s*|audioSrc:\s*'[^']+',\s*audioStart:\s*\d+,\s*)"
        r"transcript:\s*`((?:[^`]|\n)*?)`",
        re.MULTILINE
    )
    sections = []
    for m in pattern.finditer(content):
        sections.append({
            'id': m.group(1),
            'transcript': m.group(2),
        })
    return sections


def translate_batch(api_key, batch_items, max_retries=3):
    """Translate a batch of sections in one API call, returns JSON."""
    user_content_parts = []
    for item in batch_items:
        user_content_parts.append(f"[{item['id']}]\n{item['transcript']}\n")

    user_content = '\n'.join(user_content_parts)

    payload = json.dumps({
        'model': 'deepseek-chat',
        'messages': [
            {'role': 'system', 'content': BATCH_SYSTEM_PROMPT},
            {'role': 'user', 'content': user_content},
        ],
        'temperature': 0.3,
        'max_tokens': 4096,
        'response_format': {'type': 'json_object'},
    }).encode('utf-8')

    for attempt in range(max_retries):
        try:
            req = urllib.request.Request(
                DEEPSEEK_API_URL,
                data=payload,
                headers={
                    'Content-Type': 'application/json',
                    'Authorization': f'Bearer {api_key}',
                },
            )
            with urllib.request.urlopen(req, timeout=120) as resp:
                data = json.loads(resp.read().decode('utf-8'))
                content = data['choices'][0]['message']['content']
                # Parse JSON response
                result = json.loads(content)
                return result
        except urllib.error.HTTPError as e:
            error_body = e.read().decode('utf-8')[:300]
            print(f'  HTTP {e.code}: {error_body}')
            if e.code == 429:
                wait = (attempt + 1) * 15
                print(f'  限流，等待 {wait}s...')
                time.sleep(wait)
            elif e.code == 401:
                print('  API Key 无效')
                return None
            else:
                time.sleep(3)
        except json.JSONDecodeError as e:
            print(f'  JSON解析失败: {e}')
            if attempt < max_retries - 1:
                time.sleep(3)
        except Exception as e:
            print(f'  错误: {e}')
            time.sleep(3)

    return None


def deduplicate_sections(sections):
    """Group sections by unique transcript content (first 200 chars as key)."""
    groups = {}
    for sec in sections:
        key = sec['transcript'][:200]
        if key not in groups:
            groups[key] = {'ids': [], 'transcript': sec['transcript']}
        groups[key]['ids'].append(sec['id'])
    return list(groups.values())


def main():
    api_key = get_api_key()
    if not api_key:
        print('错误: 未找到 API Key')
        print('请在 .env 文件中设置 VITE_DEEPSEEK_API_KEY=your_key')
        sys.exit(1)

    print(f'API Key: {api_key[:12]}...')

    sections = parse_sections_ts()
    print(f'解析到 {len(sections)} 个 section')

    # Deduplicate
    unique_groups = deduplicate_sections(sections)
    print(f'去重后: {len(unique_groups)} 个唯一 transcript')

    # Load existing translations
    existing = {}
    if OUTPUT_PATH.exists():
        existing = json.loads(OUTPUT_PATH.read_text(encoding='utf-8'))
        print(f'已有 {len(existing)} 条翻译')

    # Find groups where NONE of the IDs have translation yet
    to_translate = [
        g for g in unique_groups
        if not any(sid in existing and existing[sid].strip() for sid in g['ids'])
    ]

    if not to_translate:
        # Check if all section IDs are covered with non-empty translations
        all_ids = {s['id'] for s in sections}
        empty_or_missing = [sid for sid in all_ids
                          if sid not in existing or not existing[sid].strip()]
        if empty_or_missing:
            print(f'{len(empty_or_missing)} 个 section ID 缺失翻译，从去重组填充...')
            for g in unique_groups:
                translated = [sid for sid in g['ids'] if sid in existing and existing[sid].strip()]
                if translated:
                    for sid in g['ids']:
                        if sid not in existing or not existing[sid].strip():
                            existing[sid] = existing[translated[0]]
            OUTPUT_PATH.write_text(
                json.dumps(existing, ensure_ascii=False, indent=2),
                encoding='utf-8'
            )
            print('填充完成')
        print('全部已翻译！')
        return

    print(f'待翻译组: {len(to_translate)} 组 (覆盖 {sum(len(g["ids"]) for g in to_translate)} 个 section)')

    # Translate in batches (each "item" is a group with ids + transcript)
    total_batches = (len(to_translate) + BATCH_SIZE - 1) // BATCH_SIZE
    for batch_idx in range(total_batches):
        start = batch_idx * BATCH_SIZE
        end = min(start + BATCH_SIZE, len(to_translate))
        batch_groups = to_translate[start:end]

        # Build batch items for API call
        batch_items = [{'id': g['ids'][0], 'transcript': g['transcript']} for g in batch_groups]
        short_ids = [bid['id'][-8:] for bid in batch_items]

        print(f'\n[批次 {batch_idx+1}/{total_batches}] {", ".join(short_ids)} ...', end=' ', flush=True)

        result = translate_batch(api_key, batch_items)
        if result:
            count = 0
            for item in batch_items:
                primary_id = item['id']
                cn = result.get(primary_id)
                if cn:
                    # Find the group and map to all its IDs
                    for g in batch_groups:
                        if g['ids'][0] == primary_id:
                            for sid in g['ids']:
                                existing[sid] = cn
                            count += len(g['ids'])
                            break
                else:
                    print(f'\n  ⚠ API 返回中未找到 {primary_id}')
            print(f'✓')
        else:
            print('✗ 批次失败')

        # Save after each batch
        OUTPUT_PATH.write_text(
            json.dumps(existing, ensure_ascii=False, indent=2),
            encoding='utf-8'
        )

        # Rate limiting
        time.sleep(3)

    print(f'\n完成! 共 {len(existing)} 条翻译')
    print(f'输出: {OUTPUT_PATH}')


if __name__ == '__main__':
    main()
