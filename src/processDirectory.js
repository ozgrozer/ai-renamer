const path = require('path')
const fs = require('fs').promises

const processFile = require('./processFile')

const processDirectory = async ({ options, inputPath }) => {
  try {
    const files = await fs.readdir(inputPath)
    for (const file of files) {
      const filePath = path.join(inputPath, file)
      const fileStats = await fs.stat(filePath)
      if (fileStats.isFile()) {
        await processFile({ ...options, filePath })
      } else if (fileStats.isDirectory() && options.includeSubdirectories) {
        await processDirectory({ options, inputPath: filePath })
      }
    }
  } catch (err) {
    console.log(err.message)
  }
}

module.exports = processDirectory
