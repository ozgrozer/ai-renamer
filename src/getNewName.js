const fs = require('fs')
const axios = require('axios')

const changeCase = require('./changeCase')

const getModelResult = async ({ model, prompt, images: _images }) => {
  try {
    const images = []
    if (_images && _images.length > 0) {
      const imageData = await fs.readFileSync(_images[0])
      images.push(imageData.toString('base64'))
    }

    const apiResult = await axios({
      method: 'post',
      url: 'http://127.0.0.1:11434/api/generate',
      data: { model, prompt, images, stream: false },
      headers: { 'Content-Type': 'application/json' }
    })

    return apiResult.data.response
  } catch (err) {
    throw new Error(err?.response?.data?.error || err.message)
  }
}

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

    const modelResult = await getModelResult({ model, prompt, images })

    const maxChars = chars + 10
    const text = modelResult.trim().slice(-maxChars)
    const filename = await changeCase({ text, _case })
    return filename
  } catch (err) {
    console.log(`🔴 Model error: ${err.message} (${relativeFilePath})`)
  }
}
