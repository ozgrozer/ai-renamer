const ollama = require('ollama').default

const changeCase = require('./changeCase')

module.exports = async ({ model, _case, chars, content, language, images, relativeFilePath }) => {
  try {
    const promptLines = [
      'Generate a concise, descriptive filename for the following content:',
      `- Use ${_case} format`,
      `- Maximum ${chars} characters`,
      `- Use ${language} language in the filename`,
      '- Exclude file extension',
      '- Avoid special characters',
      '- Output only the filename',
      '',
      `IMPORTANT: Your entire response should be just the filename in ${_case} format, in ${language} language, and max ${chars} characters. Do not include any other text.`
    ]

    if (content) {
      promptLines.push('', 'Content:', content)
    }

    const prompt = promptLines.join('\n')

    const res = await ollama.generate({ model, prompt, images })
    const maxChars = chars + 10
    const text = res.response.trim().slice(-maxChars)
    const filename = await changeCase({ text, _case })
    return filename
  } catch (err) {
    console.log(`🔴 Ollama error: ${err.message} (${relativeFilePath})`)
  }
}
