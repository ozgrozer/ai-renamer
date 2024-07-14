const fs = require('fs')
const axios = require('axios')

const ollamaApis = async ({ model, prompt, images, baseURL }) => {
  try {
    const url = `${baseURL}/api/generate`

    const data = {
      model,
      prompt,
      stream: false
    }

    if (images && images.length > 0) {
      data.images = await Promise.all(images.map(async imagePath => {
        const imageData = await fs.promises.readFile(imagePath)
        return imageData.toString('base64')
      }))
    }

    const apiResult = await axios({
      url,
      data,
      method: 'post',
      headers: { 'Content-Type': 'application/json' }
    })

    return apiResult.data.response
  } catch (err) {
    throw new Error(err?.response?.data?.error?.message || err?.response?.data?.error || err.message)
  }
}

const openaiApis = async ({ model, prompt, images, apiKey, baseURL }) => {
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

    if (images && images.length > 0) {
      for (const imagePath of images) {
        const imageData = await fs.promises.readFile(imagePath)
        messages[0].content.push({
          type: 'image_url',
          image_url: { url: `data:image/jpeg;base64,${imageData.toString('base64')}` }
        })
      }
    }

    data.messages = messages

    const apiResult = await axios({
      url,
      data,
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        ...(apiKey && { Authorization: `Bearer ${apiKey}` })
      }
    })

    return apiResult.data.choices[0].message.content
  } catch (err) {
    throw new Error(err?.response?.data?.error?.message || err?.response?.data?.error || err.message)
  }
}

module.exports = async options => {
  try {
    const { provider } = options

    if (provider === 'ollama') {
      return ollamaApis(options)
    } else if (provider === 'openai' || provider === 'lm-studio') {
      return openaiApis(options)
    } else {
      throw new Error('🔴 No supported provider found')
    }
  } catch (err) {
    throw new Error(err.message)
  }
}
