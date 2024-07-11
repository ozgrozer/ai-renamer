const axios = require('axios')

const ollamaApis = async ({ baseURL }) => {
  try {
    const apiResult = await axios({
      data: {},
      method: 'get',
      url: `${baseURL}/api/tags`
    })

    return apiResult.data.models
  } catch (err) {
    throw new Error(err?.response?.data?.error || err.message)
  }
}

const lmStudioApis = async ({ baseURL }) => {
  try {
    const apiResult = await axios({
      data: {},
      method: 'get',
      url: `${baseURL}/v1/models`
    })

    return apiResult.data.data
  } catch (err) {
    throw new Error(err?.response?.data?.error || err.message)
  }
}

const listModels = async options => {
  try {
    const { provider } = options

    if (provider === 'ollama') {
      return ollamaApis(options)
    } else if (provider === 'lm-studio') {
      return lmStudioApis(options)
    } else if (provider === 'openai') {
      return [
        { name: 'gpt-4o' },
        { name: 'gpt-4' },
        { name: 'gpt-3.5-turbo' }
      ]
    } else {
      throw new Error('🔴 No supported provider found')
    }
  } catch (err) {
    throw new Error(err.message)
  }
}

const filterModelNames = arr => {
  return arr.map((item) => {
    if (item.id !== undefined) {
      return { name: item.id }
    } else if (item.name !== undefined) {
      return { name: item.name }
    } else {
      throw new Error('Item does not contain id or name property')
    }
  })
}

const chooseModel = ({ models }) => {
  const preferredModels = [
    'llava',
    'llama',
    'gemma',
    'phi',
    'qwen',
    'aya',
    'mistral',
    'mixtral',
    'deepseek-coder'
  ]

  for (const modelName of preferredModels) {
    if (models.some(model => model.name.toLowerCase().includes(modelName))) {
      return models.find(model => model.name.toLowerCase().includes(modelName)).name
    }
  }

  return models.length > 0 ? models[0].name : null
}

module.exports = async options => {
  try {
    const _models = await listModels(options)
    const models = filterModelNames(_models)
    console.log(`⚪ Available models: ${models.map(m => m.name).join(', ')}`)

    const model = await chooseModel({ models })
    if (!model) throw new Error('🔴 No suitable model found')

    return model
  } catch (err) {
    throw new Error(err.message)
  }
}
