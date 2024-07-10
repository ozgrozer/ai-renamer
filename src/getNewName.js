const fs = require('fs')
const axios = require('axios')

const changeCase = require('./changeCase')

const getModelResult = async ({ model, prompt, images: _images, baseURL, platform }) => {
  try {
    let url
    if (platform === 'ollama') {
      url = `${baseURL}/api/generate`
    } else if (platform === 'lm-studio') {
      url = `${baseURL}/v1/chat/completions`
    }

    const data = {
      model,
      stream: false
    }

    if (platform === 'ollama') {
      data.prompt = prompt
      if (_images && _images.length > 0) {
        const imageData = await fs.readFileSync(_images[0])
        data.images = [imageData.toString('base64')]
      }
    } else if (platform === 'lm-studio') {
      const messages = [{
        role: 'user',
        content: [
          { type: 'text', text: prompt }
        ]
      }]
      if (_images && _images.length > 0) {
        const imageData = await fs.readFileSync(_images[0])
        messages[0].content.push({
          type: 'image_url',
          image_url: { url: `data:image/jpeg;base64,${imageData.toString('base64')}` }
        })
      }
      data.messages = messages
    }

    const apiResult = await axios({
      url,
      data,
      method: 'post',
      headers: { 'Content-Type': 'application/json' }
    })

    let result
    if (platform === 'ollama') {
      result = apiResult.data.response
    } else if (platform === 'lm-studio') {
      result = apiResult.data.choices[0].message.content
    }
    return result
  } catch (err) {
    throw new Error(err?.response?.data?.error || err.message)
  }
}

module.exports = async ({ model, _case, chars, images, content, baseURL, language, platform, relativeFilePath }) => {
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

    const modelResult = await getModelResult({ model, prompt, images, baseURL, platform })

    const maxChars = chars + 10
    const text = modelResult.trim().slice(-maxChars)
    const filename = await changeCase({ text, _case })
    return filename
  } catch (err) {
    console.log(`🔴 Model error: ${err.message} (${relativeFilePath})`)
  }
}
