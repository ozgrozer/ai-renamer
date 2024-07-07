const os = require('os')
const path = require('path')
const yargs = require('yargs')
const fs = require('fs').promises
const { hideBin } = require('yargs/helpers')

const CONFIG_FILE = path.join(os.homedir(), 'ai-renamer.json')

const loadConfig = async () => {
  try {
    const data = await fs.readFile(CONFIG_FILE, 'utf8')
    return JSON.parse(data)
  } catch (err) {
    return {}
  }
}

const saveConfig = async ({ config }) => {
  await fs.writeFile(CONFIG_FILE, JSON.stringify(config, null, 2))
}

module.exports = async () => {
  const config = await loadConfig()

  const argv = yargs(hideBin(process.argv))
    .option('help', {
      alias: 'h',
      type: 'boolean',
      description: 'Show help'
    })
    .option('set-case', {
      alias: 'c',
      type: 'string',
      description: 'Set the case style (e.g. camelCase, PascalCase, snake_case, kebab-case, lower_case, UPPER_CASE)'
    })
    .option('set-model', {
      alias: 'm',
      type: 'string',
      description: 'Set the Ollama model to use (e.g. phi3, llama3)'
    })
    .option('set-chars', {
      alias: 'x',
      type: 'number',
      description: 'Set the maximum number of characters in the new filename (e.g. 25)'
    }).argv

  if (argv.help) {
    yargs.showHelp()
    process.exit(0)
  }

  if (argv['set-case']) {
    config.defaultCase = argv['set-case']
    await saveConfig({ config })
    console.log(`⚪ Case set to: ${config.defaultCase}`)
    process.exit(1)
  }

  if (argv['set-model']) {
    config.defaultModel = argv['set-model']
    await saveConfig({ config })
    console.log(`⚪ Model set to: ${config.defaultModel}`)
    process.exit(1)
  }

  if (argv['set-chars']) {
    config.defaultChars = argv['set-chars']
    await saveConfig({ config })
    console.log(`⚪ Chars set to: ${config.defaultChars}`)
    process.exit(1)
  }

  return { argv, config }
}
