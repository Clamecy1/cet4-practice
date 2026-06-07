---
name: cet4-mini-app
version: 2.0.0
description: CET-4 听力翻译刷题器 — 微信小程序设计系统

colors:
  primary:
    base: "#6366f1"
    light: "#eef2ff"
    dark: "#4f46e5"
    gradient: "linear-gradient(135deg, #6366f1, #8b5cf6)"
  accent:
    base: "#0ea5e9"
    light: "#f0f9ff"
    dark: "#0284c7"
  success:
    base: "#10b981"
    light: "#ecfdf5"
    dark: "#059669"
  warning:
    base: "#f59e0b"
    light: "#fffbeb"
    dark: "#d97706"
  danger:
    base: "#ef4444"
    light: "#fef2f2"
    dark: "#dc2626"
  neutral:
    50: "#f8fafc"
    100: "#f1f5f9"
    200: "#e2e8f0"
    300: "#cbd5e1"
    400: "#94a3b8"
    500: "#64748b"
    600: "#475569"
    700: "#334155"
    800: "#1e293b"
    900: "#0f172a"
  background:
    page: "#f1f5f9"
    card: "#ffffff"
    overlay: "rgba(15, 23, 42, 0.5)"

typography:
  fontFamily:
    base: "system-ui, -apple-system, 'PingFang SC', 'Microsoft YaHei', sans-serif"
    mono: "'SF Mono', 'Cascadia Code', monospace"
  fontSize:
    xs: "22rpx"
    sm: "24rpx"
    base: "28rpx"
    md: "30rpx"
    lg: "32rpx"
    xl: "36rpx"
    "2xl": "44rpx"
    "3xl": "56rpx"
    "4xl": "72rpx"
  fontWeight:
    normal: 400
    medium: 500
    semibold: 600
    bold: 700
  lineHeight:
    tight: 1.25
    normal: 1.5
    relaxed: 1.7

spacing:
  xs: "8rpx"
  sm: "12rpx"
  md: "16rpx"
  lg: "24rpx"
  xl: "32rpx"
  "2xl": "48rpx"

borderRadius:
  sm: "8rpx"
  md: "12rpx"
  lg: "16rpx"
  xl: "20rpx"
  "2xl": "24rpx"
  full: "50%"

elevation:
  none: "none"
  sm: "0 1px 2px rgba(0,0,0,0.04)"
  md: "0 2px 8px rgba(0,0,0,0.06)"
  lg: "0 4px 16px rgba(0,0,0,0.08)"
  xl: "0 8px 32px rgba(0,0,0,0.12)"

components:
  card:
    background: "{colors.background.card}"
    borderRadius: "{borderRadius.xl}"
    padding: "{spacing.lg}"
    shadow: "{elevation.sm}"
    border: "1px solid {colors.neutral.200}"
  button:
    primary:
      background: "{colors.primary.gradient}"
      color: "#ffffff"
      borderRadius: "{borderRadius.lg}"
      padding: "24rpx 48rpx"
      fontSize: "{typography.fontSize.lg}"
      fontWeight: "{typography.fontWeight.semibold}"
    secondary:
      background: "{colors.primary.light}"
      color: "{colors.primary.base}"
      borderRadius: "{borderRadius.lg}"
    ghost:
      background: "transparent"
      color: "{colors.neutral.500}"
    danger:
      background: "{colors.danger.light}"
      color: "{colors.danger.base}"
  chip:
    borderRadius: "{borderRadius.full}"
    padding: "6rpx 18rpx"
    fontSize: "{typography.fontSize.xs}"
  input:
    background: "{colors.neutral.50}"
    border: "1px solid {colors.neutral.200}"
    borderRadius: "{borderRadius.lg}"
    padding: "20rpx 24rpx"
    fontSize: "{typography.fontSize.base}"
    focusBorder: "{colors.primary.base}"
  progressBar:
    height: "8rpx"
    borderRadius: "{borderRadius.sm}"
    background: "{colors.neutral.200}"
    fill: "{colors.primary.base}"
  tab:
    inactive:
      background: "{colors.background.card}"
      color: "{colors.neutral.500}"
    active:
      background: "{colors.primary.base}"
      color: "#ffffff"

rules:
  contrast:
    - "All body text must meet WCAG AA (4.5:1 ratio)"
    - "Large text (≥24px) must meet 3:1 minimum"
  color:
    - "Primary color reserved for the single most important action per screen"
    - "Never convey status by color alone — always include icon or text"
  typography:
    - "Maximum 2 font weights per screen"
    - "Maximum 3 font sizes per card component"
  corners:
    - "Never mix rounded and sharp corners in the same view"
    - "All interactive elements use {borderRadius.lg} or larger"
  spacing:
    - "Consistent 8rpx grid for all spacing"
    - "Related items gap: 16rpx; section gap: 24rpx"
---

# CET-4 听力翻译刷题器 — 设计系统

## Overview

一个专注、清晰的学习工具。设计语言强调**克制、现代、高可读性**。
整体风格：简洁的白色卡片漂浮在冷灰色背景上，靛蓝主色引导核心操作，天蓝强调色提供视觉层次。
避免装饰性渐变，用干净的边框和微弱阴影区分层级。

**关键词**: Clean, Focused, Modern, Educational, Calm

## Colors

### Primary — Indigo
- **base**: `#6366f1` — 主按钮、激活态、进度条
- **light**: `#eef2ff` — 选中背景、标签底色
- **dark**: `#4f46e5` — 按压态
- **gradient**: `135deg, #6366f1, #8b5cf6` — 仅用于主 CTA 按钮

### Accent — Sky Blue
- **base**: `#0ea5e9` — 链接、次要强调
- **light**: `#f0f9ff` — 信息卡片背景

### Success — Emerald
- **base**: `#10b981` — 正确状态、完成标记
- **light**: `#ecfdf5` — 正确背景

### Danger — Red
- **base**: `#ef4444` — 错误状态、删除操作
- **light**: `#fef2f2` — 错误背景

### Neutral
- **page**: `#f1f5f9` — 页面底色（冷灰替代暖米色）
- **card**: `#ffffff` — 所有卡片/容器
- **text**: `#1e293b` (primary), `#64748b` (secondary), `#94a3b8` (muted)
- **border**: `#e2e8f0`

## Typography

字体栈: `system-ui, -apple-system, 'PingFang SC', 'Microsoft YaHei', sans-serif`

| Token | Size | Weight | Usage |
|-------|------|--------|-------|
| xs | 22rpx | 400 | 辅助标签、时间戳 |
| sm | 24rpx | 400 | 次要文字 |
| base | 28rpx | 400 | 正文、按钮文字 |
| md | 30rpx | 500 | 卡片标题 |
| lg | 32rpx | 600 | 页面标题 |
| xl | 36rpx | 600 | 大数字 |
| 2xl | 44rpx | 700 | 分数展示 |
| 3xl | 56rpx | 700 | 核心数据 |
| 4xl | 72rpx | 800 | 英雄数字 |

## Spacing

8rpx 基准网格: `8, 12, 16, 24, 32, 48` rpx
- 元素内 padding: `24rpx`
- 卡片间距: `16rpx`
- 段落间距: `24rpx`
- 页面 padding: `24rpx`

## Border Radius

统一使用圆角，不可混用直角:
- 小型元素 (标签、徽章): `8rpx`
- 输入框、小按钮: `12rpx`
- 卡片: `20rpx`
- 大按钮: `16rpx`
- 圆形元素: `50%`

## Elevation

扁平为主，微弱阴影区分层级:
- 静态卡片: `0 1px 2px rgba(0,0,0,0.04)` + `1px solid #e2e8f0`
- 悬浮元素: `0 2px 8px rgba(0,0,0,0.06)`
- 模态/弹窗: `0 8px 32px rgba(0,0,0,0.12)`

## Do's and Don'ts

### ✅ Do
- 每屏仅一个主色操作按钮
- 状态信息配合图标或文字（不只靠颜色）
- 每屏最多 2 种字重
- 保持卡片内边距一致 (24rpx)

### ❌ Don't
- 不在同一视图混用圆角和直角
- 不过度使用渐变（仅主 CTA 按钮用渐变）
- 不用超过 3 种字号在同一卡片
- 不在非交互元素上用主色
