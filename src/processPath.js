const fs = require('fs').promises

const processFile = require('./processFile')
const chooseModel = require('./chooseModel')
const processDirectory = require('./processDirectory')

module.exports = async ({ inputPath, defaultCase, defaultModel, defaultChars, defaultBaseURL, defaultLanguage, defaultProvider, defaultIncludeSubdirectories }) => {
  try {
    const provider = defaultProvider || 'ollama'
    console.log(`⚪ Provider: ${provider}`)

    let baseURL = defaultBaseURL
    if (provider === 'ollama' && !baseURL) {
      baseURL = 'http://127.0.0.1:11434'
    } else if (provider === 'lm-studio' && !baseURL) {
      baseURL = 'http://127.0.0.1:1234'
    }
    console.log(`⚪ Base URL: ${baseURL}`)

    const model = defaultModel || await chooseModel({ baseURL, provider })
    console.log(`⚪ Model: ${model}`)

    const _case = defaultCase || 'kebabCase'
    console.log(`⚪ Case: ${_case}`)

    const chars = defaultChars || 20
    console.log(`⚪ Chars: ${chars}`)

    const language = defaultLanguage || 'English'
    console.log(`⚪ Language: ${language}`)

    const includeSubdirectories = defaultIncludeSubdirectories === 'true' || false
    console.log(`⚪ Include subdirectories: ${includeSubdirectories}`)

    console.log('--------------------------------------------------')

    const stats = await fs.stat(inputPath)
    const options = {
      model,
      _case,
      chars,
      baseURL,
      language,
      provider,
      inputPath,
      includeSubdirectories
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
