const path = require('path')
const fs = require('fs').promises

module.exports = async ({ ext, newName, filePath }) => {
  try {
    const dir = path.dirname(filePath)
    let newFileName = newName + ext
    let newPath = path.join(dir, newFileName)
    let counter = 1

    while (true) {
      try {
        await fs.access(newPath)
        newFileName = `${newName}${counter}${ext}`
        newPath = path.join(dir, newFileName)
        counter++
      } catch (err) {
        break
      }
    }

    await fs.rename(filePath, newPath)
    return newFileName
  } catch (err) {
    console.log(err.message)
  }
}
