"""
extract_official_transcripts.py — 从官方真题 PDF 提取听力原文

支持两种 PDF：
- 文本型 (2021~2022.09)：PyMuPDF 直接提取文字
- 扫描型 (2022.12~2025.12)：easyocr OCR 识别

输出: scripts/official_transcripts.json
"""
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).parent.parent
SOURCE_BASE = Path(r'C:\Users\Administrator\Desktop\1.大学英语CET4-历年真题\01四级历年真题及答案解析+听力音频')
OUTPUT_PATH = ROOT / 'scripts' / 'official_transcripts.json'

# Question announcements to section mapping
# Format: (announcement_pattern, section_key)
QUESTION_MAP = [
    ('Questions 1 and 2', 'secA1'),
    ('Questions 3 and 4', 'secA2'),
    ('Questions 5 to 7', 'secA3'),
    ('Questions 8 to 11', 'secB1'),
    ('Questions 12 to 15', 'secB2'),
    ('Questions 16 to 18', 'secC1'),
    ('Questions 19 to 21', 'secC2'),
    ('Questions 22 to 25', 'secC3'),
]

# Alternate patterns (some PDFs use slightly different wording)
QUESTION_MAP_ALT = [
    ('Questions 1 and 2', 'secA1'),
    ('Questions 3 and 4', 'secA2'),
    ('Questions 5 to 7', 'secA3'),
    ('Questions 8 to 11', 'secB1'),
    ('Questions 12 to 15', 'secB2'),
    ('Questions 16 to 18', 'secC1'),
    ('Questions 19 to 21', 'secC2'),
    ('Questions 22 to 25', 'secC3'),
]


def find_pdf_files():
    """Find all answer key PDFs for 2021-2025."""
    pdfs = {}  # key: (year, month, set) -> path
    for year_dir in sorted(SOURCE_BASE.iterdir()):
        if not year_dir.is_dir():
            continue
        name = year_dir.name
        # Parse year and month from directory name
        m = re.match(r'(\d{4})年(\d{2})月', name)
        if not m:
            continue
        year = int(m.group(1))
        month = int(m.group(2))
        if year < 2021:
            continue

        # Find answer key subdirectory
        answer_dir = None
        for sub in ['答案解析', '02、答案解析', '03、答案解析']:
            cand = year_dir / sub
            if cand.exists():
                answer_dir = cand
                break
        # Some 2022/2023 directories have flat structure for small PDFs
        if not answer_dir:
            # Check for PDFs directly in year directory (like 2025-12)
            pdfs_in_dir = list(year_dir.glob('*解析*.pdf')) + list(year_dir.glob('*详解*.pdf'))
            if pdfs_in_dir:
                answer_dir = year_dir

        if not answer_dir:
            print(f'  SKIP {name}: no answer key directory')
            continue

        for pdf_path in sorted(answer_dir.glob('*.pdf')):
            fname = pdf_path.name
            # Determine set number
            if '第1套' in fname or '第一套' in fname:
                set_num = 1
            elif '第2套' in fname or '第二套' in fname:
                set_num = 2
            elif '第3套' in fname or '第三套' in fname:
                set_num = 3
            else:
                continue

            key = (year, month, set_num)
            # Prefer larger files (full answer keys) over smaller ones
            if key not in pdfs or pdf_path.stat().st_size > pdfs[key].stat().st_size:
                pdfs[key] = pdf_path

    return pdfs


def extract_text_from_pdf(pdf_path):
    """Extract text from a text-based PDF using PyMuPDF."""
    import fitz
    doc = fitz.open(str(pdf_path))
    full_text = ''
    for page in doc:
        full_text += page.get_text() + '\n'
    doc.close()
    return full_text


def is_text_based(text, min_chars=500):
    """Check if PDF has extractable text."""
    return len(text.strip()) > min_chars


def find_listening_section(text):
    """Find the listening comprehension section in extracted text."""
    patterns = [
        'Listening Comprehension',
        'Part II',
        'Part Ⅱ',
        'Section A',  # Fallback: some PDFs skip "Part II" header
    ]
    for pat in patterns:
        idx = text.find(pat)
        if idx >= 0:
            # For "Section A", make sure it's the listening one (before Part III)
            if pat == 'Section A':
                # Check if there's a Part III after this Section A
                part3_idx = text.find('Part III', idx)
                part3b_idx = text.find('Part Ⅲ', idx)
                # If Part III exists and is far away (>5000 chars), this is likely listening
                if part3_idx > idx + 1000 or part3b_idx > idx + 1000:
                    return idx
                # If no Part III, just return this Section A
                if part3_idx < 0 and part3b_idx < 0:
                    return idx
                continue
            return idx
    return None


def extract_english_text(text):
    """Extract primarily English text, removing Chinese commentary sections."""
    # Split by known Chinese section markers
    chinese_markers = [
        '答案详解', '答案与详解', '精析', '【精析】', '【答案】',
        'Part III', 'Part Ⅲ', 'Reading Comprehension',
        'Section A',  # This could be Reading Section A
    ]

    # Find the end of listening section
    end_markers = ['Part III', 'Part Ⅲ', 'Reading Comprehension']
    end_idx = len(text)
    for marker in end_markers:
        idx = text.find(marker)
        if idx > 0:
            end_idx = min(end_idx, idx)

    listen_text = text[:end_idx]

    # Remove lines that are predominantly Chinese
    lines = listen_text.split('\n')
    english_lines = []
    for line in lines:
        stripped = line.strip()
        if not stripped:
            english_lines.append('')
            continue
        # Count CJK characters
        cjk_count = sum(1 for c in stripped if '一' <= c <= '鿿' or '　' <= c <= '〿')
        ascii_count = sum(1 for c in stripped if c.isascii() and c.isalpha())
        # Skip lines that are >50% Chinese
        if cjk_count > len(stripped) * 0.3 and ascii_count < 20:
            # But keep if it contains question markers
            if not re.search(r'Questions?\s+\d+', stripped):
                continue
        english_lines.append(stripped)

    return '\n'.join(english_lines)


def parse_passages_from_text(text):
    """Parse individual listening passages from extracted text.

    Strategy:
    1. Find Section A, B, C boundaries
    2. Within each section, find question announcements
    3. Extract text between announcements
    4. Clean up answer markers and Chinese text
    """
    passages = {}

    # Find listening section start
    listen_start = find_listening_section(text)
    if listen_start is None:
        return passages

    listen_text = text[listen_start:]

    # Find section boundaries
    section_starts = []
    for marker in ['Section A', 'Section B', 'Section C']:
        idx = listen_text.find(marker)
        if idx >= 0:
            section_starts.append((marker, idx))
    section_starts.sort(key=lambda x: x[1])

    if not section_starts:
        return passages

    # For each section, extract individual passages
    for i, (sec_name, sec_start) in enumerate(section_starts):
        # Determine section end
        if i + 1 < len(section_starts):
            sec_end = section_starts[i + 1][1]
        else:
            sec_end = len(listen_text)

        sec_text = listen_text[sec_start:sec_end]

        # Determine which section keys belong to this section
        if sec_name == 'Section A':
            expected_keys = ['secA1', 'secA2', 'secA3']
        elif sec_name == 'Section B':
            expected_keys = ['secB1', 'secB2']
        else:
            expected_keys = ['secC1', 'secC2', 'secC3']

        # Find question announcements within this section
        announcement_pattern = re.compile(
            r'Questions?\s+(\d+)\s+(?:and|to)\s+(\d+)\s+are\s+based\s+on\s+(?:the\s+)?'
            r'(?:news\s+report|conversation|passage)\s+you\s+have\s+just\s+heard\.?',
            re.IGNORECASE
        )
        announcements = list(announcement_pattern.finditer(sec_text))

        # Extract text between consecutive announcements
        for j, ann in enumerate(announcements):
            # Determine which section key this announcement belongs to
            q_start = int(ann.group(1))

            # Map question number to section key
            if q_start == 1:
                sec_key = 'secA1'
            elif q_start == 3:
                sec_key = 'secA2'
            elif q_start == 5:
                sec_key = 'secA3'
            elif q_start == 8:
                sec_key = 'secB1'
            elif q_start == 12:
                sec_key = 'secB2'
            elif q_start == 16:
                sec_key = 'secC1'
            elif q_start == 19:
                sec_key = 'secC2'
            elif q_start == 22:
                sec_key = 'secC3'
            else:
                continue

            if sec_key not in expected_keys:
                continue

            # Text starts after the announcement, ends at next announcement or Chinese boundary
            content_start = ann.end()
            if j + 1 < len(announcements):
                content_end = announcements[j + 1].start()
            else:
                content_end = len(sec_text)

            passage_text = sec_text[content_start:content_end]

            # Clean up and truncate at Chinese explanations
            cleaned = clean_passage_text(passage_text)

            if cleaned and len(cleaned) > 50:
                # Keep the longest version if already exists
                if sec_key not in passages or len(cleaned) > len(passages[sec_key]):
                    passages[sec_key] = cleaned

    return passages


def clean_passage_text(text):
    """Clean up a passage: remove answer markers and truncate at Chinese text."""
    # Remove answer markers like (1), (2), (3-1), (8-l), etc.
    text = re.sub(r'\(\s*\d+\s*\)', '', text)
    text = re.sub(r'\(\s*\d+\s*[-–]\s*\d+\s*\)', '', text)
    text = re.sub(r'\(\s*\d+\s*[-–]\s*[a-zA-Z]\s*\)', '', text)  # (8-l), (3-a)
    text = re.sub(r'\(\s*[lI]\s*\)', '', text)  # common OCR/typo: (l) (I) instead of (1)
    text = re.sub(r'[©①②③④⑤⑥⑦⑧⑨⑩]', '', text)
    text = re.sub(r'【[^】]*】', '', text)
    text = re.sub(r'（\s*\d+\s*）', '', text)  # fullwidth parentheses

    # Remove page headers/footers like "2022.6/ 2 (第 1 套)"
    text = re.sub(r'\d{4}\.\d+\s*/\s*\d+\s*\(\s*第\s*\d+\s*套\s*\)', '', text)
    text = re.sub(r'\d{4}\.\d+\s*/\s*\d+', '', text)

    # Truncate at Chinese markers
    chinese_markers = [
        '答案详解', '答案与详解', '精析', '【精析】', '【答案】',
        'Part III', 'Part Ⅲ', 'Reading Comprehension',
    ]
    earliest = len(text)
    for marker in chinese_markers:
        idx = text.find(marker)
        if idx > 100:
            earliest = min(earliest, idx)

    if earliest < len(text):
        text = text[:earliest]

    # Find the last complete English sentence
    last_sentence = max(
        text.rfind('. '), text.rfind('? '), text.rfind('! '),
        text.rfind('."'), text.rfind('.\n'), text.rfind('.”'),
    )
    if last_sentence > 50:
        text = text[:last_sentence + 1]

    # Normalize whitespace
    text = re.sub(r'\s+', ' ', text).strip()

    # Normalize common OCR/formatting issues
    text = re.sub(r'(\d+)=year-old', r'\1-year-old', text)  # 64=year-old
    text = re.sub(r'energy—rich', 'energy-rich', text)

    # Remove leading non-alphabetic characters
    text = re.sub(r'^[^a-zA-Z"\']+', '', text)

    return text.strip()


def extract_text_pdf(pdf_path):
    """Extract passages from a text-based PDF."""
    text = extract_text_from_pdf(pdf_path)
    if not is_text_based(text):
        return None
    return parse_passages_from_text(text)


def extract_ocr_pdf(pdf_path):
    """Extract passages from a scanned PDF using easyocr."""
    import fitz
    import easyocr
    import numpy as np
    from PIL import Image
    import io

    # Only init reader once
    if not hasattr(extract_ocr_pdf, 'reader'):
        print('  Initializing easyocr reader...')
        extract_ocr_pdf.reader = easyocr.Reader(['en'], gpu=False)

    reader = extract_ocr_pdf.reader
    doc = fitz.open(str(pdf_path))

    # Only OCR pages that likely contain listening content (pages 2-5 usually)
    all_text_parts = []
    start_page = 1  # 0-indexed, skip title page
    end_page = min(8, len(doc))  # Don't go past page 8

    for page_num in range(start_page, end_page):
        page = doc[page_num]
        # Render page at 200 DPI for balance of speed/quality
        pix = page.get_pixmap(dpi=200)
        img_data = pix.tobytes('png')
        img = Image.open(io.BytesIO(img_data))
        img_array = np.array(img)

        print(f'  OCR page {page_num + 1}/{end_page}...')
        result = reader.readtext(img_array, detail=0, paragraph=True)
        page_text = ' '.join(result)
        all_text_parts.append(page_text)

    doc.close()
    full_text = '\n'.join(all_text_parts)
    return parse_passages_from_text(full_text)


def main():
    pdfs = find_pdf_files()
    print(f'找到 {len(pdfs)} 个答案 PDF')

    all_transcripts = {}
    text_count = 0
    ocr_count = 0
    fail_count = 0

    for (year, month, set_num), pdf_path in sorted(pdfs.items()):
        exam_key = f'{year}-{month:02d}-S{set_num}'
        print(f'\n处理: {exam_key} ({pdf_path.name})')

        # Try text extraction first
        text = extract_text_from_pdf(pdf_path)

        if is_text_based(text):
            print(f'  文本型 PDF ({len(text)} 字符)')
            passages = parse_passages_from_text(text)
            text_count += 1
        else:
            print(f'  扫描型 PDF，使用 OCR...')
            try:
                passages = extract_ocr_pdf(pdf_path)
                ocr_count += 1
            except Exception as e:
                print(f'  OCR 失败: {e}')
                passages = {}
                fail_count += 1

        # Map to section IDs
        for sec_key, transcript in passages.items():
            if transcript:
                section_id = f'{year}-{month:02d}-S{set_num}-{sec_key_to_label(sec_key)}'
                all_transcripts[section_id] = transcript

        print(f'  提取到 {len(passages)} 个 passage')

    # Save
    OUTPUT_PATH.write_text(
        json.dumps(all_transcripts, ensure_ascii=False, indent=2),
        encoding='utf-8'
    )

    print(f'\n{"=" * 60}')
    print(f'完成!')
    print(f'  文本型 PDF: {text_count}')
    print(f'  OCR PDF: {ocr_count}')
    print(f'  失败: {fail_count}')
    print(f'  总提取 transcript: {len(all_transcripts)}')
    print(f'  输出: {OUTPUT_PATH}')


def sec_key_to_label(key):
    """Convert sec key to section ID suffix."""
    mapping = {
        'secA1': 'SecA-1', 'secA2': 'SecA-2', 'secA3': 'SecA-3',
        'secB1': 'SecB-1', 'secB2': 'SecB-2',
        'secC1': 'SecC-1', 'secC2': 'SecC-2', 'secC3': 'SecC-3',
    }
    return mapping.get(key, key)


if __name__ == '__main__':
    main()
