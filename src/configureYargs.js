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
    .option('provider', {
      alias: 'p',
      type: 'string',
      description: 'Set the provider (e.g. ollama, openai, lm-studio)'
    })
    .option('api-key', {
      alias: 'a',
      type: 'string',
      description: 'Set the API key if you\'re using openai as provider'
    })
    .option('base-url', {
      alias: 'u',
      type: 'string',
      description: 'Set the API base URL (e.g. http://127.0.0.1:11434 for ollama)'
    })
    .option('model', {
      alias: 'm',
      type: 'string',
      description: 'Set the model to use (e.g. gemma2, llama3, gpt-4o)'
    })
    .option('frames', {
      alias: 'f',
      type: 'number',
      description: 'Set the maximum number of frames to extract from videos (e.g. 3, 5, 10)'
    })
    .option('case', {
      alias: 'c',
      type: 'string',
      description: 'Set the case style (e.g. camelCase, pascalCase, snakeCase, kebabCase)'
    })
    .option('chars', {
      alias: 'x',
      type: 'number',
      description: 'Set the maximum number of characters in the new filename (e.g. 25)'
    })
    .option('language', {
      alias: 'l',
      type: 'string',
      description: 'Set the output language (e.g. English, Turkish)'
    })
    .option('include-subdirectories', {
      alias: 's',
      type: 'string',
      description: 'Include files in subdirectories when processing (e.g: true, false)'
    })
    .option('custom-prompt', {
      alias: 'r',
      type: 'string',
      description: 'Add a custom prompt to the LLM (e.g. "Only describe the background")'
    }).argv

  if (argv.help) {
    yargs.showHelp()
    process.exit(0)
  }

  if (argv.provider) {
    config.defaultProvider = argv.provider
    await saveConfig({ config })
  }

  if (argv['api-key']) {
    config.defaultApiKey = argv['api-key']
    await saveConfig({ config })
  }

  if (argv['base-url']) {
    config.defaultBaseURL = argv['base-url']
    await saveConfig({ config })
  }

  if (argv.model) {
    config.defaultModel = argv.model
    await saveConfig({ config })
  }

  if (argv.frames) {
    config.defaultFrames = argv.frames
    await saveConfig({ config })
  }

  if (argv.case) {
    config.defaultCase = argv.case
    await saveConfig({ config })
  }

  if (argv.chars) {
    config.defaultChars = argv.chars
    await saveConfig({ config })
  }

  if (argv.language) {
    config.defaultLanguage = argv.language
    await saveConfig({ config })
  }

  if (argv['include-subdirectories']) {
    config.defaultIncludeSubdirectories = argv['include-subdirectories']
    await saveConfig({ config })
  }

  if (argv['custom-prompt']) {
    config.defaultCustomPrompt = argv['custom-prompt']
    await saveConfig({ config })
  }

  return { argv, config }
}
