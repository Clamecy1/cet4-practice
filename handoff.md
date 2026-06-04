# Handoff: CET4 听力翻译刷题器 — 听力原文修正

**Date**: 2026-06-04
**Session focus**: Fix broken build caused by garbled transcript text in sections.ts

---

## 1. Goal

Build a CET-4 listening practice web app with:
- 232 listening sections (12 exam dates × varying sets, 2021-2025)
- Each section has a transcript (English) and Chinese translation
- Translations pre-generated via DeepSeek API, stored in static JSON (`transcripts-cn.json`)
- Inline expand/collapse UI for both transcript and translation (Listening.tsx)
- All transcript text verified against official CET-4 answer key PDFs

---

## 2. Current State

**Build**: ✅ `npx tsc --noEmit` passes, `npx vite build` succeeds

**Data integrity**:
| Metric | Value |
|--------|-------|
| Total sections | 232 |
| Official transcript corrections applied | 53 (45 direct + 8 synced to S3) |
| Placeholder transcripts | 0 |
| Translations (transcripts-cn.json) | 232, all non-empty |
| Sections with garbled text | 0 |

**Remaining limitations**:
- **187 sections** (2022.12–2025.12) have NO official PDF verification — these are scanned-image PDFs, OCR was infeasible (model downloads blocked)
- **2022-09** only extracted 6/8 passages from official PDF (secA2, secB1 missed due to alternate announcement wording)
- **2021-12-S3** sections synced from S1's official data (same audio, same transcript expected)
- Translations for the 45 officially-corrected sections may be slightly stale (translated from pre-correction text, but differences are minor since most passages are the same)

**Source files**: `C:\Users\Administrator\Desktop\1.大学英语CET4-历年真题\01四级历年真题及答案解析+听力音频\`

---

## 3. Files in Flight

| File | Status | Notes |
|------|--------|-------|
| `src/data/sections.ts` | **Modified** | 53 transcript replacements applied from cleaned official data |
| `src/data/sections.ts.bak2` | Backup | Original pre-correction state |
| `src/data/transcripts-cn.json` | **Modified** | 232 Chinese translations (DeepSeek API) |
| `src/pages/Listening.tsx` | Modified earlier | Translation toggle button + inline display |
| `scripts/official_transcripts.json` | **Modified** | 45 cleaned official transcripts |
| `scripts/rebuild_from_backup.py` | **New** | Rebuilds sections.ts from backup, applying only known-good corrections |
| `scripts/clean_official.py` | **New** | v1 cleaner — detects and removes garbled PDF text |
| `scripts/clean_official_v2.py` | **New** | v2 cleaner — more aggressive line-based garbled detection |
| `scripts/fix_garbled.py` | **New** | Attempted direct fix (didn't work, superseded by rebuild approach) |
| `scripts/check_template_issues.py` | **New** | Diagnoses backtick/escape issues in template literals |
| `scripts/translate_transcripts.py` | Modified earlier | Batch translation via DeepSeek API |
| `scripts/correct_transcripts.py` | From previous session | Original correction script (HAS BUGS — see Section 5) |
| `tsconfig.app.json` | Modified earlier | Added `resolveJsonModule: true` |

---

## 4. Changed (This Session)

1. **Fixed broken `vite build`** — Root cause: garbled PDF text in sections.ts contained:
   - Backtick `` ` `` characters that prematurely closed template literals
   - Backslash sequences (`\x14`, `\u]`) causing "Bad escape sequence" errors
   - Unicode mojibake (U+1400–U+167F range) from corrupted PDF extraction

2. **Rebuilt `official_transcripts.json`** — 3-pass cleaning:
   - Pass 1: Truncate at garbled Unicode boundaries
   - Pass 2: Line-based detection (non-ASCII ratio > 20%)
   - Pass 3: Remove backtick and backslash characters

3. **Created `rebuild_from_backup.py`** — The reliable rebuild strategy:
   - Start from `sections.ts.bak2` (known-clean JS)
   - Apply only corrections from cleaned `official_transcripts.json`
   - Escape `\`, `` ` ``, `${` for JS template literal safety
   - Sync 2021-12-S3 placeholders from S1's official data

4. **Updated `translate_transcripts.py`** — Fixed bug where empty-string translations weren't detected as missing (changed `sid not in existing` → `sid not in existing or not existing[sid].strip()`)

---

## 5. Failed Attempts

| Attempt | Problem | Why Failed |
|---------|---------|------------|
| `correct_transcripts.py` cross-set sync | Propagated garbled text | Script synced S3 placeholders from S1/S2 which ALSO had garbled PDF text. The official_transcripts.json was not clean at that point. |
| `fix_garbled.py` direct repair | Incomplete fixes | Regex `([^`]*?)` couldn't match the full transcript field because garbled text contained backtick characters, causing the regex to stop early at the first embedded backtick. |
| OCR for scanned PDFs (2022.12-2025.12) | easyocr model download returned 9 bytes | GitHub releases blocked in this environment. Tesseract install also blocked (winget network error). Remaining 187 sections unverified. |
| `extract_official_transcripts.py` text extraction | Some passages included answer explanations | `clean_passage_text()` didn't always detect the English→Chinese transition. The garbled Chinese markers like `(fflffi` made detection unreliable. Fixed post-hoc by multi-pass cleaning. |
