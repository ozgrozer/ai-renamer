const processPath = require('./processPath')

const main = async () => {
  const inputPath = process.argv[2]

  if (!inputPath) {
    console.log('Please provide a file or folder path')
    process.exit(1)
  }

  await processPath({ inputPath })
}

main()
