#!/bin/bash
# 批量转写 CET-4 听力 transcript — 简化版（逐条写入，不依赖关联数组）
set +e  # 不在某条失败时退出

MODEL="whisper-model.bin"
AUDIO_DIR="public/audio"
OUT="transcribe-results.json"

echo "{" > "$OUT"
echo '  "results": {' >> "$OUT"

# 统计
TOTAL=48
DONE=0
OK=0
FAIL=0
FIRST_LINE=true

transcribe_one() {
    local SEC_ID="$1" AUDIO_KEY="$2" START="$3" DUR="$4"
    local AUDIO_FILE="$AUDIO_DIR/$AUDIO_KEY.mp3"
    local TMP="transcribe-temp.txt"

    DONE=$((DONE + 1))
    echo -n "[$DONE/$TOTAL] $SEC_ID @ ${START}s... "

    if [ ! -f "$AUDIO_FILE" ]; then
        echo "SKIP (no audio)"
        FAIL=$((FAIL + 1))
        return 1
    fi

    rm -f "$TMP"
    ffmpeg -y -ss "$START" -t "$DUR" -i "$AUDIO_FILE" \
        -af "whisper=model=$MODEL:language=en:format=text:destination=$TMP" \
        -f null NUL 2>/dev/null

    if [ -f "$TMP" ] && [ -s "$TMP" ]; then
        TEXT=$(cat "$TMP" | tr '\n' ' ' | sed "s/\"/'/g; s/\\\\/ /g; s/  */ /g" | head -c 600)
        echo "OK (${#TEXT} chars)"
        # 追加到 JSON
        if [ "$FIRST_LINE" = true ]; then FIRST_LINE=false; else echo "," >> "$OUT"; fi
        echo -n "    \"$SEC_ID\": \"$TEXT\"" >> "$OUT"
        rm -f "$TMP"
        OK=$((OK + 1))
        return 0
    else
        echo "FAILED"
        FAIL=$((FAIL + 1))
        return 1
    fi
}

# === 2022-12-S2 ===
transcribe_one "2022-12-S2-SecA-1" "2022-12-S2" 25 150
transcribe_one "2022-12-S2-SecA-2" "2022-12-S2" 100 150
transcribe_one "2022-12-S2-SecA-3" "2022-12-S2" 210 150
transcribe_one "2022-12-S2-SecC-1" "2022-12-S2" 610 180
transcribe_one "2022-12-S2-SecC-2" "2022-12-S2" 770 180
transcribe_one "2022-12-S2-SecC-3" "2022-12-S2" 940 180

# === 2025-06-S1 ===
transcribe_one "2025-06-S1-SecA-1" "2025-06-S1" 25 150
transcribe_one "2025-06-S1-SecA-2" "2025-06-S1" 100 150
transcribe_one "2025-06-S1-SecA-3" "2025-06-S1" 210 150
transcribe_one "2025-06-S1-SecC-1" "2025-06-S1" 610 180
transcribe_one "2025-06-S1-SecC-2" "2025-06-S1" 770 180
transcribe_one "2025-06-S1-SecC-3" "2025-06-S1" 940 180

# === 2025-06-S2 ===
transcribe_one "2025-06-S2-SecA-1" "2025-06-S2" 25 150
transcribe_one "2025-06-S2-SecA-2" "2025-06-S2" 100 150
transcribe_one "2025-06-S2-SecA-3" "2025-06-S2" 210 150
transcribe_one "2025-06-S2-SecC-1" "2025-06-S2" 610 180
transcribe_one "2025-06-S2-SecC-2" "2025-06-S2" 770 180
transcribe_one "2025-06-S2-SecC-3" "2025-06-S2" 940 180

# === 2025-06-S3 (使用 S1 音频) ===
transcribe_one "2025-06-S3-SecA-1" "2025-06-S1" 25 150
transcribe_one "2025-06-S3-SecA-2" "2025-06-S1" 100 150
transcribe_one "2025-06-S3-SecA-3" "2025-06-S1" 210 150
transcribe_one "2025-06-S3-SecC-1" "2025-06-S1" 610 180
transcribe_one "2025-06-S3-SecC-2" "2025-06-S1" 770 180
transcribe_one "2025-06-S3-SecC-3" "2025-06-S1" 940 180

# === 2025-12-S1 ===
transcribe_one "2025-12-S1-SecA-1" "2025-12-S1" 25 150
transcribe_one "2025-12-S1-SecA-2" "2025-12-S1" 100 150
transcribe_one "2025-12-S1-SecA-3" "2025-12-S1" 210 150
transcribe_one "2025-12-S1-SecB-1" "2025-12-S1" 330 180
transcribe_one "2025-12-S1-SecB-2" "2025-12-S1" 460 180
transcribe_one "2025-12-S1-SecC-1" "2025-12-S1" 600 180
transcribe_one "2025-12-S1-SecC-2" "2025-12-S1" 760 180
transcribe_one "2025-12-S1-SecC-3" "2025-12-S1" 930 180

# === 2025-12-S2 ===
transcribe_one "2025-12-S2-SecA-1" "2025-12-S2" 25 150
transcribe_one "2025-12-S2-SecA-2" "2025-12-S2" 100 150
transcribe_one "2025-12-S2-SecA-3" "2025-12-S2" 210 150
transcribe_one "2025-12-S2-SecB-1" "2025-12-S2" 330 180
transcribe_one "2025-12-S2-SecB-2" "2025-12-S2" 460 180
transcribe_one "2025-12-S2-SecC-1" "2025-12-S2" 600 180
transcribe_one "2025-12-S2-SecC-2" "2025-12-S2" 760 180
transcribe_one "2025-12-S2-SecC-3" "2025-12-S2" 930 180

# === 2025-12-S3 (使用 S1 音频) ===
transcribe_one "2025-12-S3-SecA-1" "2025-12-S1" 25 150
transcribe_one "2025-12-S3-SecA-2" "2025-12-S1" 100 150
transcribe_one "2025-12-S3-SecA-3" "2025-12-S1" 210 150
transcribe_one "2025-12-S3-SecB-1" "2025-12-S1" 330 180
transcribe_one "2025-12-S3-SecB-2" "2025-12-S1" 460 180
transcribe_one "2025-12-S3-SecC-1" "2025-12-S1" 600 180
transcribe_one "2025-12-S3-SecC-2" "2025-12-S1" 760 180
transcribe_one "2025-12-S3-SecC-3" "2025-12-S1" 930 180

# 结束 JSON
echo "" >> "$OUT"
echo '  },' >> "$OUT"
echo "  \"ok\": $OK," >> "$OUT"
echo "  \"failed\": $FAIL," >> "$OUT"
echo "  \"total\": $TOTAL" >> "$OUT"
echo "}" >> "$OUT"

echo ""
echo "=== DONE ==="
echo "OK: $OK, Failed: $FAIL, Total: $TOTAL"
echo "Results: $OUT"
rm -f transcribe-temp.txt
