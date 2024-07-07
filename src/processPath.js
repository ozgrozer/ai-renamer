const path = require('path')
const fs = require('fs').promises

const processFile = require('./processFile')
const chooseModel = require('./chooseModel')

module.exports = async ({ model: defaultModel, _case, inputPath }) => {
  try {
    const model = defaultModel || await chooseModel()

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
