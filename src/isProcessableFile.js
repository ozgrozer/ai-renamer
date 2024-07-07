const path = require('path')

const supportedExtensions = require('./supportedExtensions')

module.exports = ({ filePath }) => {
  const fileName = path.basename(filePath)
  if (fileName === '.DS_Store') return false

  const ext = path.extname(filePath).toLowerCase()
  return supportedExtensions.includes(ext)
}
