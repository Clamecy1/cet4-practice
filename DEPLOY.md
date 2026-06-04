# CET-4 刷题器 — App 部署指南

## 1. Supabase 配置（5 分钟）

### 创建项目
1. 打开 [supabase.com](https://supabase.com)，注册/登录
2. 点击 **New project**，填写名称（如 `cet4-practice`），设置数据库密码
3. 等待项目创建完成（约 1 分钟）

### 执行数据库迁移
1. 左侧菜单 → **SQL Editor** → **New query**
2. 复制 `supabase-migration.sql` 的全部内容，粘贴并执行
3. 确认左侧 **Table Editor** 中出现 `sessions`、`error_book`、`vocabulary_book` 三张表

### 获取 API 密钥
1. 左侧菜单 → **Settings** → **API**
2. 复制 **Project URL**（如 `https://xxxxx.supabase.co`）
3. 复制 **anon public key**

### 配置环境变量
编辑项目根目录 `.env`：
```
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 启用邮箱认证
1. 左侧菜单 → **Authentication** → **Providers**
2. 确保 **Email** provider 已启用（默认开启）
3. 可选：关闭"Confirm email"（测试阶段），生产环境建议开启

## 2. 部署前端

### Vercel（推荐，免费）
```bash
npm i -g vercel
cd cet4-practice
vercel --prod
```
按提示绑定域名，自动识别 Vite 项目构建。

### 或手动部署到任意静态托管
```bash
npm run build   # 输出到 dist/
# 将 dist/ 目录上传到任何静态托管（Cloudflare Pages、Netlify、GitHub Pages 等）
```

## 3. PWA 安装测试

部署后，用手机浏览器打开你的域名：
- **iOS Safari**：点击底部"分享" → "添加到主屏幕"
- **Android Chrome**：会自动弹出"添加到主屏幕"提示
- 安装后将以独立 App 形态运行（无浏览器地址栏）

## 4. 验证清单

- [ ] 访问网站，自动跳转 `/login`
- [ ] 注册新账号 → 收到验证邮件
- [ ] 登录后看到首页
- [ ] 完成一套听力练习 → 点击"查看成绩"→ 成绩保存
- [ ] 切换到 `/stats` → 看到统计数据
- [ ] 切换到 `/errors` → 错题同步到云端
- [ ] 切换到 `/vocabulary` → 生词同步到云端
- [ ] 手机浏览器打开 → "添加到主屏幕"可用
- [ ] PWA 离线打开 → 能显示缓存内容

## 5. 项目文件结构

```
src/
├── contexts/
│   └── AuthContext.tsx      # 全局登录态（Supabase Auth）
├── lib/
│   └── supabase.ts         # Supabase 客户端
├── db/
│   ├── types.ts             # TypeScript 类型（含 SessionRecord）
│   ├── db.ts                # IndexedDB（本地数据）
│   └── cloudSync.ts        # Supabase 云端同步函数
├── pages/
│   ├── Login.tsx            # 注册/登录页
│   ├── Home.tsx             # 首页
│   ├── Listening.tsx        # 听力练习
│   ├── Translation.tsx      # 翻译练习
│   ├── Result.tsx           # 成绩页（含分享）
│   ├── Stats.tsx            # 统计看板
│   ├── Errors.tsx           # 错题本
│   └── Vocabulary.tsx       # 生词本
├── utils/
│   ├── api.ts               # DeepSeek API
│   └── shareCard.ts        # Canvas 分享图生成
├── components/              # 共享组件
└── App.tsx                  # 路由 + Auth 保护

supabase-migration.sql       # 数据库建表 SQL（在 Supabase 执行）
```

## 6. 数据流

```
用户操作 → IndexedDB（本地） → 同时写 Supabase（云端）
                                    ↓
用户换设备 → 登录 → 从 Supabase 拉取历史数据 → 合并到本地 IndexedDB
```
