const changeCase = require('./changeCase')
const getModelResponse = require('./getModelResponse')

module.exports = async options => {
  const { _case, chars, content, language, relativeFilePath } = options

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

    const modelResult = await getModelResponse({ ...options, prompt })

    const maxChars = chars + 10
    const text = modelResult.trim().slice(-maxChars)
    const filename = await changeCase({ text, _case })
    return filename
  } catch (err) {
    console.log(`🔴 Model error: ${err.message} (${relativeFilePath})`)
  }
}
