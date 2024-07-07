# ai-renamer

A Node.js CLI tool that uses Ollama models (Llama, Gemma, Phi etc.) to intelligently rename files in a specified directory

[![npm](https://img.shields.io/npm/v/ai-renamer.svg?style=flat-square)](https://www.npmjs.com/package/ai-renamer)
[![license](https://img.shields.io/npm/l/ai-renamer?style=flat-square)](https://github.com/ozgrozer/ai-renamer/blob/main/license)

## Preview

https://github.com/ozgrozer/ai-renamer/assets/651938/7ac84a2d-8e05-4756-8827-3bd746b3edae

## Usage

You need to have [Ollama](https://ollama.com/download) and at least one LLM (Llama, Gemma etc.) installed on your system

Run with NPX

```bash
npx ai-renamer /path
```

Run with NPM

```bash
# Install it globally
npm install -g ai-renamer

# Run it
ai-renamer /path
```

## Params

```bash
npx ai-renamer --help
Options:
  -h, --help       Show help                                           [boolean]
      --version    Show version number                                 [boolean]
  -c, --set-case   Set the case style (e.g. camelCase, PascalCase, snake_case,
                   kebab-case, lower_case, UPPER_CASE)                  [string]
  -m, --set-model  Set the Ollama model to use (e.g. phi3, llama3)      [string]
  -x, --set-chars  Set the maximum number of characters in the new filename
                   (e.g. 25)                                            [number]
```

## Contribution

Feel free to contribute. Open a new [issue](https://github.com/ozgrozer/ai-renamer/issues), or make a [pull request](https://github.com/ozgrozer/ai-renamer/pulls).

## License

[GPL-3.0](https://github.com/ozgrozer/ai-renamer/blob/main/license)
