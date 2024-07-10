const fs = require('fs').promises

const processFile = require('./processFile')
const chooseModel = require('./chooseModel')
const processDirectory = require('./processDirectory')

module.exports = async ({ inputPath, defaultCase, defaultModel, defaultChars, defaultBaseURL, defaultLanguage, defaultPlatform, defaultIncludeSubdirectories }) => {
  try {
    const platform = defaultPlatform || 'ollama'
    console.log(`⚪ Platform: ${platform}`)

    let baseURL = defaultBaseURL
    if (platform === 'ollama' && !baseURL) {
      baseURL = 'http://127.0.0.1:11434'
    } else if (platform === 'lm-studio' && !baseURL) {
      baseURL = 'http://127.0.0.1:1234'
    }
    console.log(`⚪ Base URL: ${baseURL}`)

    const model = defaultModel || await chooseModel()
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
      platform,
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
