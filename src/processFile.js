const path = require('path')
const fs = require('fs').promises

const getNewName = require('./getNewName')
const readFileContent = require('./readFileContent')
const isProcessableFile = require('./isProcessableFile')

module.exports = async ({ model, _case, chars, language, filePath }) => {
  try {
    const fileName = path.basename(filePath)

    if (fileName === '.DS_Store') return

    if (!isProcessableFile({ filePath })) {
      console.log(`🟡 Unsupported file: ${fileName}`)
      return
    }

    const content = await readFileContent({ filePath })
    if (!content) {
      console.log(`🔴 No text content: ${fileName}`)
      return
    }

    const newName = await getNewName({ model, _case, chars, content, language })
    if (!newName) {
      console.log(`🔴 No new name: ${fileName}`)
      return
    }

    const dir = path.dirname(filePath)
    const ext = path.extname(filePath)
    const newFileName = newName + ext
    const newPath = path.join(dir, newFileName)
    await fs.rename(filePath, newPath)
    console.log(`🟢 Renamed: ${fileName} to ${newFileName}`)
  } catch (err) {
    throw new Error(err.message)
  }
}
