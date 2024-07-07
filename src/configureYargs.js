const path = require('path')
const yargs = require('yargs')
const fs = require('fs').promises
const { hideBin } = require('yargs/helpers')

const CONFIG_FILE = path.join(process.cwd(), 'yargs-config.json')

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
    }).argv

  if (argv.help) {
    yargs.showHelp()
    process.exit(0)
  }

  if (argv['set-case']) {
    config.case = argv['set-case']
    await saveConfig({ config })
    console.log(`⚪ Case set to: ${config.case}`)
  }

  if (argv['set-model']) {
    config.model = argv['set-model']
    await saveConfig({ config })
    console.log(`⚪ Model set to: ${config.model}`)
  }

  return { argv, config }
}
