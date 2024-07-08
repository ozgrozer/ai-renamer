const path = require('path')

const isImage = require('./isImage')
const saveFile = require('./saveFile')
const getNewName = require('./getNewName')
const readFileContent = require('./readFileContent')
const isProcessableFile = require('./isProcessableFile')

module.exports = async ({ model, _case, chars, language, filePath }) => {
  try {
    const fileName = path.basename(filePath)
    const ext = path.extname(filePath).toLowerCase()

    if (fileName === '.DS_Store') return

    if (!isProcessableFile({ filePath })) {
      console.log(`🟡 Unsupported file: ${fileName}`)
      return
    }

    let content
    const images = []
    if (isImage({ ext })) {
      images.push(filePath)
    } else {
      content = await readFileContent({ filePath })
      if (!content) {
        console.log(`🔴 No text content: ${fileName}`)
        return
      }
    }

    const newName = await getNewName({ model, _case, chars, content, language, images })
    if (!newName) {
      console.log(`🔴 No new name: ${fileName}`)
      return
    }

    const newFileName = await saveFile({ ext, newName, filePath })
    console.log(`🟢 Renamed: ${fileName} to ${newFileName}`)
  } catch (err) {
    throw new Error(err.message)
  }
}
