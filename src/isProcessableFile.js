const path = require('path')

const supportedExtensions = require('./supportedExtensions')

module.exports = ({ filePath }) => {
  const ext = path.extname(filePath).toLowerCase()
  return supportedExtensions.includes(ext)
}
