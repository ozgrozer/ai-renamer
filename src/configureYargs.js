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
    })
    .option('regex', {
      alias: 'g',
      type: 'string',
      description: 'Set a regex pattern to filter files (e.g. "\.jpg$" for jpg files only)'
    }).argv

  if (argv.help) {
    yargs.showHelp()
    process.exit(0)
  }

  const updateConfig = async (key, value) => {
    config[key] = value
    await saveConfig({ config })
  }

  if (argv.provider) await updateConfig('defaultProvider', argv.provider)
  if (argv['api-key']) await updateConfig('defaultApiKey', argv['api-key'])
  if (argv['base-url']) await updateConfig('defaultBaseURL', argv['base-url'])
  if (argv.model) await updateConfig('defaultModel', argv.model)
  if (argv.frames) await updateConfig('defaultFrames', argv.frames)
  if (argv.case) await updateConfig('defaultCase', argv.case)
  if (argv.chars) await updateConfig('defaultChars', argv.chars)
  if (argv.language) await updateConfig('defaultLanguage', argv.language)
  if (argv['include-subdirectories']) await updateConfig('defaultIncludeSubdirectories', argv['include-subdirectories'])
  if (argv['custom-prompt']) await updateConfig('defaultCustomPrompt', argv['custom-prompt'])

  const returnedConfig = {
    ...config,
    regex: argv.regex
  }

  return { argv, config: returnedConfig }
}