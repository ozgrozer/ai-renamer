const path = require('path')
const fs = require('fs').promises

const processFile = require('./processFile')

module.exports = async ({ inputPath }) => {
  try {
    const stats = await fs.stat(inputPath)

    if (stats.isDirectory()) {
      const files = await fs.readdir(inputPath)
      for (const file of files) {
        const filePath = path.join(inputPath, file)
        const fileStats = await fs.stat(filePath)
        if (fileStats.isFile()) {
          await processFile({ filePath })
        }
      }
    } else if (stats.isFile()) {
      await processFile({ filePath: inputPath })
    }
  } catch (err) {
    console.log(err.message)
  }
}
