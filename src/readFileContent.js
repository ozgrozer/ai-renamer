const path = require('path')
const pdf = require('pdf-parse')
const fs = require('fs').promises

module.exports = async ({ filePath }) => {
  const ext = path.extname(filePath).toLowerCase()

  if (ext === '.pdf') {
    const dataBuffer = await fs.readFile(filePath)
    const pdfData = await pdf(dataBuffer)
    return pdfData.text
  } else {
    return fs.readFile(filePath, 'utf8')
  }
}
