const ollama = require('ollama').default

module.exports = async ({ model, _case, chars, content }) => {
  try {
    const prompt = `Given the following file content, suggest a concise and descriptive filename in ${_case} format. Make the maximum number of characters ${chars} in the new filename. Don't include the extension. Don't include any special character. Don't include any description. Don't include any other text. Just give me the filename.\n\n${content}`
    const res = await ollama.generate({ model, prompt })
    return res.response.trim()
  } catch (err) {
    throw new Error(err.message)
  }
}
