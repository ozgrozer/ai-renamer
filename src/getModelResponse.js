const fs = require('fs')
const axios = require('axios')

const ollamaApis = async ({ model, prompt, images: _images, baseURL }) => {
  try {
    const url = `${baseURL}/api/generate`

    const data = {
      model,
      prompt,
      stream: false
    }

    if (_images && _images.length > 0) {
      const imageData = await fs.readFileSync(_images[0])
      data.images = [imageData.toString('base64')]
    }

    const apiResult = await axios({
      url,
      data,
      method: 'post',
      headers: { 'Content-Type': 'application/json' }
    })

    return apiResult.data.response
  } catch (err) {
    throw new Error(err?.response?.data?.error || err.message)
  }
}

const lmStudioApis = async ({ model, prompt, images: _images, baseURL }) => {
  try {
    const url = `${baseURL}/v1/chat/completions`

    const data = {
      model,
      stream: false
    }

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

    const apiResult = await axios({
      url,
      data,
      method: 'post',
      headers: { 'Content-Type': 'application/json' }
    })

    return apiResult.data.choices[0].message.content
  } catch (err) {
    throw new Error(err?.response?.data?.error || err.message)
  }
}

module.exports = async options => {
  try {
    const { platform } = options

    if (platform === 'ollama') {
      return ollamaApis(options)
    } else if (platform === 'lm-studio') {
      return lmStudioApis(options)
    } else {
      throw new Error('🔴 No supported platform selected')
    }
  } catch (err) {
    throw new Error(err.message)
  }
}
