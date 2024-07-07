const path = require('path')
const pdf = require('pdf-parse')
const fs = require('fs').promises

module.exports = async ({ filePath }) => {
  try {
    const ext = path.extname(filePath).toLowerCase()

    let content = ''
    if (ext === '.pdf') {
      const dataBuffer = await fs.readFile(filePath)
      const pdfData = await pdf(dataBuffer)
      content = pdfData.text.trim()
    } else {
      content = fs.readFile(filePath, 'utf8')
    }

    return content
  } catch (err) {
    throw new Error(err.message)
  }
}
