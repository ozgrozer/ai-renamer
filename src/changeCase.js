module.exports = async ({ text, _case }) => {
  const changeCase = await import('change-case')

  try {
    return changeCase[_case](text)
  } catch (err) {
    return changeCase.kebabCase(text)
  }
}
