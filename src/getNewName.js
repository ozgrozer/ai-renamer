const ollama = require('ollama').default

module.exports = async ({ model, _case, content }) => {
  try {
    const prompt = `Given the following file content, suggest a concise and descriptive filename in ${_case} format. Don't include the extension. Don't include any other text or description. Just the filename.\n\n${content}`
    const res = await ollama.generate({ model, prompt })
    return res.response.trim()
  } catch (err) {
    throw new Error(err.message)
  }
}
