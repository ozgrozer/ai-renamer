const ollama = require('ollama').default

const listModels = async () => {
  try {
    const response = await ollama.list()
    return response.models
  } catch (err) {
    return []
  }
}

const chooseModel = ({ models }) => {
  const preferredModels = [
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

module.exports = async () => {
  try {
    const models = await listModels()
    console.log(`⚪ Available models: ${models.map(m => m.name).join(', ')}`)

    const model = await chooseModel({ models })
    if (!model) throw new Error('🔴 No suitable model found')

    return model
  } catch (err) {
    throw new Error(err.message)
  }
}
