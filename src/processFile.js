const path = require('path')
const fs = require('fs').promises

const readFileContent = require('./readFileContent')
const isProcessableFile = require('./isProcessableFile')

module.exports = async ({ filePath }) => {
  try {
    if (!isProcessableFile({ filePath })) {
      console.log(`Skipping file: ${filePath}`)
      return
    }

    const content = await readFileContent({ filePath })
    if (!content) {
      console.log(`No text content: ${filePath}`)
      return
    }

    const newName = 'test'

    const dir = path.dirname(filePath)
    const ext = path.extname(filePath)
    const newPath = path.join(dir, newName + ext)
    await fs.rename(filePath, newPath)
    console.log(`Renamed ${filePath} to ${newPath}`)
  } catch (err) {
    throw new Error(err.message)
  }
}
