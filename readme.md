# AI Renamer

A Node.js CLI tool that uses Ollama and LM Studio models (Llava, Gemma, Llama, etc.) to intelligently rename files based on their contents.

[![npm](https://img.shields.io/npm/v/ai-renamer.svg?style=flat-square)](https://www.npmjs.com/package/ai-renamer)
[![license](https://img.shields.io/npm/l/ai-renamer?style=flat-square)](https://github.com/ozgrozer/ai-renamer/blob/main/license)

## Preview

Rename videos

https://github.com/user-attachments/assets/502aedba-044e-4ed5-a1c7-bca84af2f3ce

Rename images

https://github.com/ozgrozer/ai-renamer/assets/651938/0d229179-8385-4f17-a9fb-44d40c79d1e9

Rename files

https://github.com/user-attachments/assets/f8b37c3a-9cc0-48fc-aaea-f25f7b6ee4cc

## Usage

You need to have [Ollama](https://ollama.com/download) or [LM Studio](https://lmstudio.ai/) and at least one LLM (Llava, Gemma, Llama, etc.) installed on your system. Additionally, [FFmpeg](https://www.ffmpeg.org/download.html) is required for renaming videos.

Run with NPX:

```bash
npx ai-renamer /path
```

Run with NPM:

```bash
# Install it globally
npm install -g ai-renamer

# Run it
ai-renamer /path
```

## Ollama Usage

Ollama is the default provider, so you don't need to specify it explicitly. Simply run `npx ai-renamer /images`. On first launch, it will try to auto-select the Llava model. If it cannot do so, you can specify the model manually:

```bash
npx ai-renamer /path --provider=ollama --model=llava:13b
```

## LM Studio Usage

To use LM Studio, set the provider as `lm-studio`. It will automatically select the loaded model in LM Studio:

```bash
npx ai-renamer /path --provider=lm-studio
```

## OpenAI Usage

For OpenAI, set the provider to `openai` and provide your API key. The tool will auto-select the `gpt-4o` model by default, but you can specify any model using the `--model` flag:

```bash
npx ai-renamer /path --provider=openai --api-key=OPENAI_API_KEY
```

## Custom Ports

If you're using a non-default port in Ollama or LM Studio, you can specify the base URLs:

```bash
npx ai-renamer /path --provider=ollama --base-url=http://127.0.0.1:11434
npx ai-renamer /path --provider=lm-studio --base-url=http://127.0.0.1:1234
```

## Parameters

The values of the flags will be saved to your disk when you use them. You can find the config file at `~/ai-renamer.json`. If you're using a Mac, it will be located at `/Users/your-user-name/ai-renamer.json`. Once a flag is set, you don't need to specify it again—the script will retrieve the values from this config file.

### Available Options

```bash
npx ai-renamer --help
Options:
  -h, --help                    Show help                              [boolean]
      --version                 Show version number                    [boolean]
  -p, --provider                Set the provider (e.g. ollama, openai,
                                lm-studio)                              [string]
  -a, --api-key                 Set the API key if you're using OpenAI as
                                provider                                [string]
  -u, --base-url                Set the API base URL (e.g.
                                http://127.0.0.1:11434 for Ollama)      [string]
  -m, --model                   Set the model to use (e.g. gemma2, llama3,
                                gpt-4o)                                 [string]
  -f, --frames                  Set the maximum number of frames to extract from
                                videos (e.g. 3, 5, 10)                  [number]
  -c, --case                    Set the case style (e.g. camelCase, pascalCase,
                                snakeCase, kebabCase)                   [string]
  -x, --chars                   Set the maximum number of characters in the new
                                filename (e.g. 25)                      [number]
  -l, --language                Set the output language (e.g. English, Turkish)
                                                                        [string]
  -s, --include-subdirectories  Include files in subdirectories when processing
                                (e.g., true, false)                     [string]
  -r, --custom-prompt           Add a custom prompt to the LLM (e.g., "Only
                                describe the background")               [string]
  -g, --file-regex              Process only files matching the regex pattern
                                (e.g., ".*\\.jpg$")                     [string]
```

### Case Styling

`ai-renamer` uses the `change-case` library for case styling:

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

Feel free to contribute. Open a new [issue](https://github.com/ozgrozer/ai-renamer/issues) or make a [pull request](https://github.com/ozgrozer/ai-renamer/pulls).

## License

[GPL-3.0](https://github.com/ozgrozer/ai-renamer/blob/main/license)
