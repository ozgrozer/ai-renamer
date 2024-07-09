const fs = require('fs').promises

const processFile = require('./processFile')
const chooseModel = require('./chooseModel')
const processDirectory = require('./processDirectory')

module.exports = async ({ inputPath, defaultCase, defaultModel, defaultChars, defaultLanguage, defaultIncludeSubdirectories }) => {
  try {
    const model = defaultModel || await chooseModel()
    console.log(`⚪ Chosen model: ${model}`)

    const _case = defaultCase || 'kebabCase'
    console.log(`⚪ Chosen case: ${_case}`)

    const chars = defaultChars || 20
    console.log(`⚪ Chosen chars: ${chars}`)

    const language = defaultLanguage || 'English'
    console.log(`⚪ Chosen language: ${language}`)

    const includeSubdirectories = defaultIncludeSubdirectories === 'true' || false
    console.log(`⚪ Include subdirectories: ${includeSubdirectories}`)

    console.log('--------------------------------------------------')

    const stats = await fs.stat(inputPath)
    const options = { model, _case, chars, language, inputPath, includeSubdirectories }

    if (stats.isDirectory()) {
      await processDirectory({ options, inputPath })
    } else if (stats.isFile()) {
      await processFile({ ...options, filePath: inputPath })
    }
  } catch (err) {
    console.log(err.message)
  }
}
