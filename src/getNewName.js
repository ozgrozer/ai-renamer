const changeCase = require('./changeCase')
const getModelResponse = require('./getModelResponse')

module.exports = async ({ model, _case, chars, images, content, baseURL, language, provider, relativeFilePath }) => {
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

    const modelResult = await getModelResponse({ model, prompt, images, baseURL, provider })

    const maxChars = chars + 10
    const text = modelResult.trim().slice(-maxChars)
    const filename = await changeCase({ text, _case })
    return filename
  } catch (err) {
    console.log(`🔴 Model error: ${err.message} (${relativeFilePath})`)
  }
}
