#!/usr/bin/env node

const processPath = require('./processPath');
const configureYargs = require('./configureYargs');

const main = async () => {
  try {
    const { argv, config } = await configureYargs();
    const inputPath = argv._[0];
    const defaultFileRegex = argv['file-regex'];

    if (!inputPath) {
      console.log('🔴 Please provide a file or folder path');
      process.exit(1);
    }

    await processPath({ 
      ...config, 
      inputPath, 
      defaultFileRegex,
    });
  } catch (err) {
    console.log(err.message);
  }
};

main();
