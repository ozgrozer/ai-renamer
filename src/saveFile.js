const path = require('path')
const fs = require('fs').promises

module.exports = async ({ ext, newName, filePath }) => {
  try {
    const dir = path.dirname(filePath)
    const newFileName = newName + ext
    const newPath = path.join(dir, newFileName)
    await fs.rename(filePath, newPath)
    return newFileName
  } catch (err) {
    console.log(err.message)
  }
}
