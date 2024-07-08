const path = require('path')
const fs = require('fs').promises

const processFile = require('./processFile')
const chooseModel = require('./chooseModel')

module.exports = async ({ inputPath, defaultCase, defaultModel, defaultChars, defaultLanguage }) => {
  try {
    const model = defaultModel || await chooseModel()
    console.log(`⚪ Chosen model: ${model}`)

    const _case = defaultCase || 'kebabCase'
    console.log(`⚪ Chosen case: ${_case}`)

    const chars = defaultChars || 20
    console.log(`⚪ Chosen chars: ${chars}`)

    const language = defaultLanguage || 'English'
    console.log(`⚪ Chosen language: ${language}`)

    console.log('--------------------------------------------------')

    const stats = await fs.stat(inputPath)

    if (stats.isDirectory()) {
      const files = await fs.readdir(inputPath)
      for (const file of files) {
        const filePath = path.join(inputPath, file)
        const fileStats = await fs.stat(filePath)
        if (fileStats.isFile()) {
          await processFile({ model, _case, chars, language, filePath })
        }
      }
    } else if (stats.isFile()) {
      await processFile({ model, _case, chars, language, filePath: inputPath })
    }
  } catch (err) {
    console.log(err.message)
  }
}
