const fs = require('fs').promises

const processFile = require('./processFile')
const chooseModel = require('./chooseModel')
const processDirectory = require('./processDirectory')

module.exports = async ({
  inputPath,
  defaultCase,
  defaultModel,
  defaultChars,
  defaultFrames,
  defaultApiKey,
  defaultBaseURL,
  defaultLanguage,
  defaultProvider,
  defaultCustomPrompt,
  defaultIncludeSubdirectories
}) => {
  try {
    const provider = defaultProvider || 'ollama'
    console.log(`⚪ Provider: ${provider}`)

    const apiKey = defaultApiKey
    if (apiKey) {
      console.log('⚪ API key: **********')
    }

    let baseURL = defaultBaseURL
    if (provider === 'ollama' && !baseURL) {
      baseURL = 'http://127.0.0.1:11434'
    } else if (provider === 'lm-studio' && !baseURL) {
      baseURL = 'http://127.0.0.1:1234'
    } else if (provider === 'openai' && !baseURL) {
      baseURL = 'https://api.openai.com'
    }
    console.log(`⚪ Base URL: ${baseURL}`)

    const model = defaultModel || await chooseModel({ baseURL, provider })
    console.log(`⚪ Model: ${model}`)

    const frames = defaultFrames || 3
    console.log(`⚪ Frames: ${frames}`)

    const _case = defaultCase || 'kebabCase'
    console.log(`⚪ Case: ${_case}`)

    const chars = defaultChars || 20
    console.log(`⚪ Chars: ${chars}`)

    const language = defaultLanguage || 'English'
    console.log(`⚪ Language: ${language}`)

    const includeSubdirectories = defaultIncludeSubdirectories === 'true' || false
    console.log(`⚪ Include subdirectories: ${includeSubdirectories}`)

    const customPrompt = defaultCustomPrompt || null
    if (customPrompt) {
      console.log(`⚪ Custom Prompt: ${customPrompt}`)
    }

    console.log('--------------------------------------------------')

    const stats = await fs.stat(inputPath)
    const options = {
      model,
      _case,
      chars,
      frames,
      apiKey,
      baseURL,
      language,
      provider,
      inputPath,
      includeSubdirectories,
      customPrompt
    }

    if (stats.isDirectory()) {
      await processDirectory({ options, inputPath })
    } else if (stats.isFile()) {
      await processFile({ ...options, filePath: inputPath })
    }
  } catch (err) {
    console.log(err.message)
  }
}
