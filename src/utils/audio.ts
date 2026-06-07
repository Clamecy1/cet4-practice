// Supabase Storage CDN base URL for audio files
// 将本地路径 /audio/xxx.mp3 映射到 CDN URL
const CDN_BASE = 'https://mokecnghmnmnsordffog.supabase.co/storage/v1/object/public/cet4-audio'

export function resolveAudioUrl(audioSrc: string): string {
  // audioSrc like "/audio/2024-06-S1.mp3"
  const filename = audioSrc.replace(/^\/?audio\//, '')
  return `${CDN_BASE}/${filename}`
}
