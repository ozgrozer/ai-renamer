# ai-renamer

A Node.js CLI tool that uses Ollama models (Llama, Gemma, Phi etc.) to intelligently rename files in a specified directory

[![npm](https://img.shields.io/npm/v/ai-renamer.svg?style=flat-square)](https://www.npmjs.com/package/ai-renamer)
[![license](https://img.shields.io/npm/l/ai-renamer?style=flat-square)](https://github.com/ozgrozer/ai-renamer/blob/main/license)

## Preview

Rename images

https://github.com/ozgrozer/ai-renamer/assets/651938/0d229179-8385-4f17-a9fb-44d40c79d1e9

Rename files

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
  -h, --help                        Show help                          [boolean]
      --version                     Show version number                [boolean]
  -c, --set-case                    Set the case style (e.g. camelCase,
                                    pascalCase, snakeCase, kebabCase)   [string]
  -m, --set-model                   Set the Ollama model to use (e.g. gemma2,
                                    llama3)                             [string]
  -x, --set-chars                   Set the maximum number of characters in the
                                    new filename (e.g. 25)              [number]
  -l, --set-language                Set the output language (e.g. English,
                                    Turkish)                            [string]
  -s, --set-include-subdirectories  Include files in subdirectories when
                                    processing (e.g: true, false)       [string]
```

To get the model name to use in `--set-model`

```bash
ollama list
```

`ai-renamer` uses `change-case` library for case styling

```bash
# value: result
camelCase: twoWords
capitalCase: Two Words
constantCase: TWO_WORDS
dotCase: two.words
kebabCase: two-words
noCase: two words
pascalCase: TwoWords
pascalSnakeCase: Two_Words
pathCase: two/words
sentenceCase: Two words
snakeCase: two_words
trainCase: Two-Words
```

## Contribution

Feel free to contribute. Open a new [issue](https://github.com/ozgrozer/ai-renamer/issues), or make a [pull request](https://github.com/ozgrozer/ai-renamer/pulls).

## License

[GPL-3.0](https://github.com/ozgrozer/ai-renamer/blob/main/license)
