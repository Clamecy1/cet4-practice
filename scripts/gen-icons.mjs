/**
 * 生成 tabBar 图标 PNG (81x81) - 简化版
 */
import { writeFileSync } from 'fs'
import { deflateSync } from 'zlib'

function createPNG(width, height, fillPixel) {
  const rawData = Buffer.alloc((width * 4 + 1) * height)
  for (let y = 0; y < height; y++) {
    rawData[y * (width * 4 + 1)] = 0
    for (let x = 0; x < width; x++) {
      const offset = y * (width * 4 + 1) + 1 + x * 4
      const [r, g, b, a] = fillPixel(x, y, width, height)
      rawData[offset] = r; rawData[offset + 1] = g
      rawData[offset + 2] = b; rawData[offset + 3] = a
    }
  }
  const compressed = deflateSync(rawData)
  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(width, 0); ihdr.writeUInt32BE(height, 4)
  ihdr[8] = 8; ihdr[9] = 6
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])
  const chunks = [makeChunk('IHDR', ihdr), makeChunk('IDAT', compressed), makeChunk('IEND', Buffer.alloc(0))]
  return Buffer.concat([sig, ...chunks])
}

function makeChunk(type, data) {
  const len = Buffer.alloc(4); len.writeUInt32BE(data.length, 0)
  const typeB = Buffer.from(type, 'ascii')
  const crcData = Buffer.concat([typeB, data])
  const c = crc32(crcData)
  const crcBuf = Buffer.alloc(4); crcBuf.writeUInt32BE(c, 0)
  return Buffer.concat([len, typeB, data, crcBuf])
}

function crc32(buf) { let c = 0xffffffff; for (let i = 0; i < buf.length; i++) { c ^= buf[i]; for (let j = 0; j < 8; j++) c = (c >>> 1) ^ (c & 1 ? 0xedb88320 : 0) } return (c ^ 0xffffffff) >>> 0 }

// Helper: check if point is inside a rect
function inRect(x, y, l, t, r, b) { return x >= l && x <= r && y >= t && y <= b }

// ====== Icon drawers ======

function homeIcon(x, y, w, h, color) {
  const cx = w / 2, cy = h / 2
  const roofTop = cy - 18, roofBase = cy + 1
  // Roof triangle
  if (y >= roofTop && y <= roofBase) {
    const halfW = ((w - 30) / 2) * ((y - roofTop) / (roofBase - roofTop))
    if (x >= cx - halfW && x <= cx + halfW) return color
  }
  // Body
  if (inRect(x, y, 22, roofBase, w - 22, cy + 21)) {
    // Door cutout
    if (inRect(x, y, cx - 7, cy + 2, cx + 7, cy + 21)) return [0, 0, 0, 0]
    return color
  }
  return [0, 0, 0, 0]
}

function reviewIcon(x, y, w, h, color) {
  const cx = w / 2, cy = h / 2, bw = 40, bh = 48
  const left = cx - bw / 2, top = cy - bh / 2, right = left + bw, bottom = top + bh
  if (!inRect(x, y, left, top, right, bottom)) return [0, 0, 0, 0]
  // Spine
  const sx = left + 10
  if (Math.abs(x - sx) <= 1.5 && y > top + 5 && y < bottom - 5) return color
  // Left page empty
  if (x < sx - 1 && x > left + 3) return [0, 0, 0, 0]
  // Right page text lines
  if (x > sx + 3 && x < right - 4) {
    for (let i = 0; i < 4; i++) {
      if (Math.abs(y - (top + 14 + i * 10)) <= 1.5) return color
    }
    return [0, 0, 0, 0]
  }
  return [0, 0, 0, 0]
}

function statsIcon(x, y, w, h, color) {
  const bottom = 58, top = 24, left = 18
  // Three bars
  const bars = [[left, 7, 0.55], [left + 11, 7, 0.9], [left + 22, 7, 0.4]]
  for (const [bx, bw, ratio] of bars) {
    const bh = (bottom - top) * ratio
    if (inRect(x, y, bx, bottom - bh, bx + bw, bottom)) return color
  }
  // Baseline
  if (Math.abs(y - bottom) <= 1.5 && x >= left - 2 && x <= left + 31) return color
  return [0, 0, 0, 0]
}

const icons = [
  ['home', homeIcon],
  ['review', reviewIcon],
  ['stats', statsIcon],
]

for (const [name, drawer] of icons) {
  for (const [color, suffix] of [
    [[0x9c, 0xa3, 0xaf, 255], ''],
    [[0x63, 0x66, 0xf1, 255], '-active'],
  ]) {
    const png = createPNG(81, 81, (x, y, w, h) => drawer(x, y, w, h, color))
    writeFileSync(`src/assets/${name}${suffix}.png`, png)
    console.log(`✅ src/assets/${name}${suffix}.png`)
  }
}
