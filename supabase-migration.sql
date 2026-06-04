-- Supabase 数据库迁移 SQL
-- 在 Supabase Dashboard → SQL Editor 中执行此文件

-- 成绩记录表
CREATE TABLE IF NOT EXISTS sessions (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  exam_type TEXT NOT NULL CHECK (exam_type IN ('listening', 'translation')),
  year INTEGER NOT NULL,
  month INTEGER NOT NULL,
  set_number INTEGER,
  score INTEGER NOT NULL,
  total INTEGER NOT NULL,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_sessions_user ON sessions(user_id, timestamp DESC);

-- 错题本
CREATE TABLE IF NOT EXISTS error_book (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  question_id TEXT NOT NULL,
  user_answer TEXT NOT NULL DEFAULT '',
  timestamp TIMESTAMPTZ NOT NULL DEFAULT now(),
  is_resolved BOOLEAN NOT NULL DEFAULT false,
  practice_count INTEGER NOT NULL DEFAULT 1,
  UNIQUE(user_id, question_id)
);

CREATE INDEX idx_error_book_user ON error_book(user_id, is_resolved);

-- 生词本
CREATE TABLE IF NOT EXISTS vocabulary_book (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  word TEXT NOT NULL,
  translation TEXT NOT NULL DEFAULT '',
  context TEXT,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, word)
);

CREATE INDEX idx_vocabulary_book_user ON vocabulary_book(user_id);

-- Row Level Security —— 用户只能访问自己的数据
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE error_book ENABLE ROW LEVEL SECURITY;
ALTER TABLE vocabulary_book ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own sessions" ON sessions
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own sessions" ON sessions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can read own errors" ON error_book
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own errors" ON error_book
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own errors" ON error_book
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can read own words" ON vocabulary_book
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own words" ON vocabulary_book
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own words" ON vocabulary_book
  FOR DELETE USING (auth.uid() = user_id);
