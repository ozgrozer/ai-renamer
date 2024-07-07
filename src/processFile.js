const path = require('path')
const fs = require('fs').promises

const readFileContent = require('./readFileContent')
const isProcessableFile = require('./isProcessableFile')

module.exports = async ({ filePath }) => {
  try {
    if (!isProcessableFile({ filePath })) {
      console.log(`Skipping non-processable file: ${filePath}`)
      return
    }

    const content = await readFileContent({ filePath })
    console.log(content)
    const newName = 'test'

    const dir = path.dirname(filePath)
    const ext = path.extname(filePath)
    const newPath = path.join(dir, newName + ext)
    await fs.rename(filePath, newPath)
    console.log(`Renamed ${filePath} to ${newPath}`)
  } catch (err) {
    console.log(`Error processing ${filePath}:`, err.message)
  }
}
