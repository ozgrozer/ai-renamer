const path = require('path')
const fs = require('fs').promises

const processFile = require('./processFile')
const chooseModel = require('./chooseModel')

module.exports = async ({ model: defaultModel, _case: defaultCase, inputPath }) => {
  try {
    const _case = defaultCase || 'kebab-case'
    console.log(`⚪ Chosen case: ${_case}`)

    const model = defaultModel || await chooseModel()
    console.log(`⚪ Chosen model: ${model}`)

    const stats = await fs.stat(inputPath)

    if (stats.isDirectory()) {
      const files = await fs.readdir(inputPath)
      for (const file of files) {
        const filePath = path.join(inputPath, file)
        const fileStats = await fs.stat(filePath)
        if (fileStats.isFile()) {
          await processFile({ model, _case, filePath })
        }
      }
    } else if (stats.isFile()) {
      await processFile({ model, _case, filePath: inputPath })
    }
  } catch (err) {
    console.log(err.message)
  }
}
