import Taro from '@tarojs/taro'

const DEEPSEEK_API_URL = 'https://api.deepseek.com/chat/completions'

function getApiKey(): string {
  const hardcoded = 'sk-160fd820de10466a89f56b1b85dfe368'
  const stored = Taro.getStorageSync('deepseek_api_key') || ''
  return stored || hardcoded
}

export async function scoreTranslation(
  chineseText: string,
  referenceAnswer: string,
  userTranslation: string,
): Promise<{ score: number; feedback: string }> {
  const apiKey = getApiKey()
  if (!apiKey) {
    return { score: 0, feedback: '请先在首页设置 DeepSeek API Key' }
  }

  const prompt = `你是一位英语四级翻译评分老师。请对以下学生的翻译进行评分和点评。

【中文原文】
${chineseText}

【参考译文】
${referenceAnswer}

【学生译文】
${userTranslation}

请按以下格式回复：
分数：[0-100的整数]
点评：[用中文给出简短点评，指出优缺点和改进建议]`

  try {
    const res = await Taro.request({
      url: DEEPSEEK_API_URL,
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      data: {
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: '你是一位专业的英语四级翻译评分老师。' },
          { role: 'user', content: prompt },
        ],
        temperature: 0.3,
        max_tokens: 500,
      },
    })

    const content = res.data.choices?.[0]?.message?.content || ''

    const scoreMatch = content.match(/分数[：:]\s*(\d+)/)
    const score = scoreMatch ? Math.min(100, Math.max(0, Number(scoreMatch[1]))) : 60

    const feedbackMatch = content.match(/点评[：:]\s*([\s\S]*)/)
    const feedback = feedbackMatch ? feedbackMatch[1].trim() : content

    return { score, feedback }
  } catch {
    return {
      score: 0,
      feedback: 'API 调用失败，请检查网络连接和 API Key 是否正确',
    }
  }
}

export async function getWordDefinition(word: string): Promise<string> {
  const apiKey = getApiKey()
  if (!apiKey) return '请先设置 DeepSeek API Key'

  try {
    const res = await Taro.request({
      url: DEEPSEEK_API_URL,
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      data: {
        model: 'deepseek-chat',
        messages: [
          {
            role: 'user',
            content: `请用中文简要解释英语单词"${word}"的意思，包含词性、中文释义和一个例句。限50字以内。`,
          },
        ],
        temperature: 0.3,
        max_tokens: 200,
      },
    })

    return res.data.choices?.[0]?.message?.content || '无法获取释义'
  } catch {
    return '获取释义失败'
  }
}
