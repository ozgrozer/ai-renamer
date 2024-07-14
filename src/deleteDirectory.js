const fs = require('fs')
const path = require('path')

const deleteDirectory = ({ folderPath }) => {
  if (fs.existsSync(folderPath)) {
    fs.readdirSync(folderPath).forEach((file) => {
      const curPath = path.join(folderPath, file)
      if (fs.lstatSync(curPath).isDirectory()) {
        deleteDirectory({ folderPath: curPath })
      } else {
        fs.unlinkSync(curPath)
      }
    })
    fs.rmdirSync(folderPath)
  }
}

module.exports = deleteDirectory
