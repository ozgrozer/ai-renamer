const processPath = require('./processPath')
const configureYargs = require('./configureYargs')

const main = async () => {
  const { argv, config } = await configureYargs()
  const [inputPath] = argv._
  const { model, case: _case } = config

  if (!inputPath) {
    console.log('🔴 Please provide a file or folder path')
    process.exit(1)
  }

  await processPath({ model, _case, inputPath })
}

main()
