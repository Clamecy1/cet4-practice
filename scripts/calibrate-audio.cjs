// 使用 ffmpeg silencedetect 校准 audioStart 值
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const SECTIONS_PATH = path.join(__dirname, '..', 'src', 'data', 'sections.ts');
const AUDIO_DIR = path.join(__dirname, '..', 'public', 'audio');

// 获取音频静音段（间隙 > minDuration 秒）
function getSilenceGaps(audioPath, minDuration = 1.0) {
  try {
    const absPath = path.resolve(audioPath);
    const cmd = `ffmpeg -i "${absPath}" -af "silencedetect=n=-25dB:d=${minDuration}" -f null - 2>&1`;
    const output = execSync(cmd, { encoding: 'utf-8', timeout: 120000 });

    const gaps = [];
    const lines = output.split('\n');
    for (const line of lines) {
      // Parse: silence_start: 16.811202
      const startMatch = line.match(/silence_start:\s*([\d.]+)/);
      if (startMatch) {
        gaps.push(parseFloat(startMatch[1]));
      }
      // Parse: silence_end: 18.457982 | silence_duration: 1.64678
      const endMatch = line.match(/silence_end:\s*([\d.]+)/);
      if (endMatch) {
        gaps.push(parseFloat(endMatch[1]));
      }
    }
    return gaps;
  } catch (e) {
    console.error(`  ffmpeg failed for ${path.basename(audioPath)}: ${e.message}`);
    return null;
  }
}

// 获取音频总时长
function getDuration(audioPath) {
  try {
    const absPath = path.resolve(audioPath);
    const output = execSync(
      `ffprobe -v error -show_entries format=duration -of csv=p=0 "${absPath}"`,
      { encoding: 'utf-8', timeout: 10000 }
    );
    return parseFloat(output.trim());
  } catch (e) {
    return null;
  }
}

// 从 silence_gaps 推断 8 个 section 的起始时间
// CET-4 听力结构: [Intro] [SecA-1] [~3s] [SecA-2] [~3s] [SecA-3]
//   [~15s Directions] [SecB-1] [~3s] [SecB-2]
//   [~15s Directions] [SecC-1] [~3s] [SecC-2] [~3s] [SecC-3]
function inferSectionStarts(silenceGaps, duration) {
  if (!silenceGaps || silenceGaps.length < 6) return null;

  // silenceGaps 格式: [silence_start1, silence_end1, silence_start2, silence_end2, ...]
  // 收集 silence_end 点（静音结束=声音重新开始）作为候选 section 起点
  const candidates = [];

  // 先找到所有显著的 silence_end（>2s 的间隙结束点）
  for (let i = 0; i < silenceGaps.length - 1; i += 2) {
    const gapStart = silenceGaps[i];
    const gapEnd = silenceGaps[i + 1];
    const gapDuration = gapEnd - gapStart;
    if (gapDuration >= 2.0) {
      candidates.push({ end: gapEnd, duration: gapDuration });
    }
  }

  // CET-4 有 8 个 section: 3 News + 2 Conversations + 3 Passages
  // 长间隙 (>10s) 通常是 Section 之间的 Directions
  const longGaps = candidates.filter(g => g.duration >= 10.0);

  // 短间隙 (2-6s) 是同一 Section 内各段之间的间隔
  const shortGaps = candidates.filter(g => g.duration >= 2.0 && g.duration < 10.0);

  const result = {
    secA1: 0,
    secA2: 0,
    secA3: 0,
    secB1: 0,
    secB2: 0,
    secC1: 0,
    secC2: 0,
    secC3: 0,
    duration,
  };

  // 策略：找到 intro 结束后的第一个非零起点
  // Intro 通常 30-60s，结束后有一个间隙
  const firstGap = candidates.find(g => g.end > 15 && g.duration >= 2.0);
  if (firstGap) {
    result.secA1 = Math.round(firstGap.end);
  }

  // 收集所有 gap end 作为 section 起点的候选（过滤掉太靠近的）
  const allCandidates = candidates.map(g => Math.round(g.end));

  // 取前 7 个 > 20s 的 gap end 作为 section 起点
  // SecA1 已从 firstGap 得到，从它之后找其余 7 个
  const sectionStarts = [result.secA1];

  for (const t of allCandidates) {
    if (t > sectionStarts[sectionStarts.length - 1] + 15) {
      sectionStarts.push(t);
      if (sectionStarts.length >= 8) break;
    }
  }

  if (sectionStarts.length >= 8) {
    result.secA1 = sectionStarts[0];
    result.secA2 = sectionStarts[1];
    result.secA3 = sectionStarts[2];
    result.secB1 = sectionStarts[3];
    result.secB2 = sectionStarts[4];
    result.secC1 = sectionStarts[5];
    result.secC2 = sectionStarts[6];
    result.secC3 = sectionStarts[7];
    return result;
  }

  return null;
}

function main() {
  const args = process.argv.slice(2);

  // 如果指定了具体文件参数
  if (args.length >= 3) {
    const [year, month, setNum] = args;
    const audioFile = path.join(AUDIO_DIR, `${year}-${String(month).padStart(2, '0')}-S${setNum}.mp3`);

    if (!fs.existsSync(audioFile)) {
      console.error(`Audio file not found: ${audioFile}`);
      process.exit(1);
    }

    console.log(`Analyzing: ${path.basename(audioFile)}`);
    const duration = getDuration(audioFile);
    console.log(`Duration: ${duration ? Math.round(duration) + 's' : 'unknown'}`);

    const silenceGaps = getSilenceGaps(audioFile, 1.0);
    if (silenceGaps) {
      console.log(`Found ${Math.floor(silenceGaps.length / 2)} silence gaps >= 1s`);
      for (let i = 0; i < silenceGaps.length - 1; i += 2) {
        const start = silenceGaps[i];
        const end = silenceGaps[i + 1];
        if (end - start >= 2.0) {
          console.log(`  Gap ${start.toFixed(1)}s → ${end.toFixed(1)}s (${(end - start).toFixed(1)}s)`);
        }
      }
    }

    const starts = inferSectionStarts(silenceGaps, duration);
    if (starts) {
      console.log('\nSuggested audioStart values:');
      console.log(`  SecA-1: ${starts.secA1}`);
      console.log(`  SecA-2: ${starts.secA2}`);
      console.log(`  SecA-3: ${starts.secA3}`);
      console.log(`  SecB-1: ${starts.secB1}`);
      console.log(`  SecB-2: ${starts.secB2}`);
      console.log(`  SecC-1: ${starts.secC1}`);
      console.log(`  SecC-2: ${starts.secC2}`);
      console.log(`  SecC-3: ${starts.secC3}`);
    } else {
      console.log('Could not reliably infer section starts');
    }
    return;
  }

  // 批量模式：扫描所有音频文件
  if (args[0] === '--all') {
    const files = fs.readdirSync(AUDIO_DIR).filter(f => f.endsWith('.mp3')).sort();
    console.log(`Calibrating ${files.length} audio files...\n`);

    const results = {};
    for (const file of files) {
      const audioPath = path.join(AUDIO_DIR, file);
      const key = file.replace('.mp3', '');
      console.log(`\n=== ${file} ===`);
      const duration = getDuration(audioPath);
      console.log(`  Duration: ${duration ? Math.round(duration) + 's' : 'unknown'}`);

      const silenceGaps = getSilenceGaps(audioPath, 1.0);
      const starts = inferSectionStarts(silenceGaps, duration);

      if (starts) {
        results[key] = starts;
        console.log(`  SecA-1: ${starts.secA1}, SecA-2: ${starts.secA2}, SecA-3: ${starts.secA3}`);
        console.log(`  SecB-1: ${starts.secB1}, SecB-2: ${starts.secB2}`);
        console.log(`  SecC-1: ${starts.secC1}, SecC-2: ${starts.secC2}, SecC-3: ${starts.secC3}`);
      } else {
        console.log(`  FAILED: Could not infer section starts`);
      }
    }

    // 输出 JSON 结果供后续使用
    console.log('\n\n=== JSON RESULTS ===');
    console.log(JSON.stringify(results, null, 2));

    // 保存到文件
    const outPath = path.join(__dirname, '..', 'audio-calibration.json');
    fs.writeFileSync(outPath, JSON.stringify(results, null, 2));
    console.log(`\nResults saved to: ${outPath}`);
    return;
  }

  console.log('用法: node scripts/calibrate-audio.cjs <year> <month> <set>');
  console.log('      node scripts/calibrate-audio.cjs --all  (批量处理所有音频)');
}

main();
