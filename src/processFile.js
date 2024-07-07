const path = require('path')
const fs = require('fs').promises

const getNewName = require('./getNewName')
const readFileContent = require('./readFileContent')
const isProcessableFile = require('./isProcessableFile')

module.exports = async ({ model, filePath }) => {
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

    const newName = await getNewName({ model, content })
    if (!newName) {
      console.log(`No new name: ${filePath}`)
      return
    }

    const dir = path.dirname(filePath)
    const ext = path.extname(filePath)
    const newPath = path.join(dir, newName + ext)
    await fs.rename(filePath, newPath)
    console.log(`Renamed: ${filePath} to ${newPath}`)
  } catch (err) {
    throw new Error(err.message)
  }
}
