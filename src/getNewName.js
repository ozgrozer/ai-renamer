const ollama = require('ollama').default

module.exports = async ({ model, _case, chars, content, language }) => {
  try {
    const prompt = `
Generate a concise, descriptive filename for the following content:
- Use ${_case} format
- Maximum ${chars} characters
- Use ${language} language in the filename
- Exclude file extension
- Avoid special characters
- Output only the filename

IMPORTANT: Your entire response should be just the filename in ${_case} format, in ${language} language, and max ${chars} characters. Do not include any other text.

Content:
${content}`
    const res = await ollama.generate({ model, prompt })
    return res.response.trim()
  } catch (err) {
    throw new Error(err.message)
  }
}
