# 🚦 CodeScope CLI

**CodeScope** is a command-line tool that helps developers understand the risk and complexity of code changes before they ship & designed to interact with the LLaMA 3 API for generating code snippets and includes a utility for transposing matrices using a Bash script. It's built for engineers who want fast, lightweight insights directly from the terminal.

Currently supports **JavaScript, Python, Typescript & Git-based change risk analysis**.

---
## ✨ Features

- 📊 Cyclomatic complexity estimation  
- 🔍 Detection of functions, if-statements, and loops  
- ⚡ Fast CLI-based analysis — no IDE plugin required  
- 🧠 Designed for future Git + dependency impact analysis  
- 🔍 Analyze code and dependencies to assess change impact
- 🤖 Prompt Meta LLaMA 3 locally for intelligent code generation
- 📜 Save generated Bash scripts to `.sh` files
- 🔧 Auto-make scripts executable and ready to run
- ✅ CLI-based workflow (no Express server required)
- 🧠 Git Diff Analysis: Analyze Git diffs for potential risks and recommendations using the `analyze-diff` command.
- `explain-file` command: Generates explanations for files or directories using AI and optionally saves the results in Markdown format.
---

## 💡 Vision

> _"What will break if I change this?"_

**CodeScope** helps developers answer this by surfacing:

- Code complexity hotspots  
- Function and control structure density  
- File-level dependency info (coming soon)  
- Git commit history and change risk analysis (coming soon)  
- AI-powered change impact summaries (planned)  

Use it before committing changes or during code reviews for an extra layer of confidence.

---

## 📦 Installation

### Prerequisites
1. **Node.js**: Ensure you have Node.js installed for running the JavaScript code.
2. **Bash**: The `transpose.sh` script requires a Unix-based shell (e.g., Bash).
3. **LLaMA 3 Server**: Ensure the LLaMA 3 server is running locally on `http://localhost:11434`.

### Clone and set up locally

```bash
git clone https://github.com/Gene7Him/CodeScope-CLI.git
cd codescope-cli
npm install
npm link

> Make the Bash script executable:
chmod +x transpose.sh
```

> `npm link` lets you use `codescope` as a global command while in development.

---

## 🔧 Usage

### Analyze a single JavaScript file

```bash
codescope analyze path/to/file.js
```

---

## 🧾 Example Output

```bash
📄 File: utils.js
🔹 Functions: 4
🔹 Ifs: 3
🔹 Loops: 2
🔹 Estimated Complexity: 6
```

---

Interacting with LLaMA 3
The llama3-local.js script sends a prompt to the LLaMA 3 API and logs the response.

### Start the LLaMA 3 server:
### Ensure the server is running on http://localhost:11434

### Run the script:
```bash
node llama3-local.js
```

### Example prompt: 

The script sends the following prompt to LLaMA 3:
```bash
Write a bash script that takes a matrix represented as a string with format '[1,2],[3,4],[5,6]' and prints the transpose in the same format.
```

The response from LLaMA 3 will be logged to the console.

---

### Matrix Transposition
The transpose.sh script takes a matrix as input and outputs its transpose.

### Run the script:
```bash
[transpose.sh](http://_vscodecontentref_/1)
```

### Provide the matrix input:
```bash
Enter the matrix in the format [1,2],[3,4],[5,6] and press Enter.
```

### Example:
```bash
Input:  [1,2],[3,4],[5,6]
Output: [1,3,5],[2,4,6]
```


### `analyze-diff` Command

The `analyze-diff` command analyzes the most recent Git diff and provides a risk assessment, summary, and recommendations using AI.

### How to Use

Ensure you have staged changes in your Git repository:

```bash
git add <file>
```
Run the `analyze-diff` command:

```bash
node cli.js analyze-diff
```
### Example Output:

```bash
📊 Risk Analysis:
🧩 Risk Level: 8/10
📝 Summary: Removed unnecessary import statements, added new command 'analyze-diff', and modified existing code to handle new command
💡 Reasoning: The removal of the 'debug' command's import statement reduces the overall complexity of the codebase. However, this change introduces a potential risk if the 'debug' command is not used correctly.,The introduction of the 'analyze-diff' command adds a new layer of functionality to the CLI tool but may require additional testing and validation to ensure correct usage.
📁 Modules: src/commands/debug.js, src/commands/analyze-diff.js
🛠 Recommendations:
 - Ensure that the 'debug' command is used correctly and consider adding more robust error handling.
 - Thoroughly test the 'analyze-diff' command to ensure its functionality and accuracy.
 ```

### What It Does

**Risk Level**: Rates the risk of the changes on a scale of 1-10.
**Summary**: Provides a concise summary of the changes.
**Reasoning**: Explains why the changes might introduce risks or benefits.
**Impacted Modules**: Lists the files affected by the changes.
**Recommendations**: Offers actionable steps to mitigate risks and improve the changes.

### Notes

The `analyze-diff` command uses the LLaMA 3 API to generate its analysis. Ensure the API is running and accessible.
If no changes are detected in the Git diff, the command will display a warning.

### `explain-file` Command

#### How to Use

1. Run the command with a file or directory path:

   ```bash
   node cli.js explain-file <fileOrDir> [options]
   ```

2. Options:

`--recursive`: Recursively process directories.
`--filter <ext>`: Filter files by extension (e.g., .js).
`--output <format>`: Specify the output format (``markdown to save explanations as `.md` files).

3. Example:
```bash
node cli.js explain-file ./src/commands --recursive --filter .js --output markdown
```
4. Output:

Explanations are printed to the console.
If `--output markdown` is specified, explanations are saved as `.md` files in the same directory as the original files.

Other Commands

`analyze`
Analyze the complexity and structure of a JavaScript file.

```bash
node [cli.js](http://_vscodecontentref_/1) analyze <filepath>
```

`git-risk`
Analyze Git churn for a directory.

```bash
node [cli.js](http://_vscodecontentref_/2) git-risk <dir>
```

`impact`
Analyze dependency impact for a directory.

```bash
node [cli.js](http://_vscodecontentref_/3) impact <dir>
```

`summarize`
Generate AI-based summaries of recent code changes.

```bash
node [cli.js](http://_vscodecontentref_/4) summarize
```

`scan`
Recursively scan a project directory.

```bash
node [cli.js](http://_vscodecontentref_/5) scan <dir> --json
```


---

## ⏭ Coming Soon

```bash
# Dependency tree mapping
codescope deps path/to/file.js
```

---

## 🧪 Tech Stack

- **Node.js** – CLI tooling and script automation
- **commander** - (https://www.npmjs.com/package/commander) — CLI command handler  
- **Native Node.js** - `fs` module for file parsing  
- **Simple-git** - for Git integration  
- **LLaMA 3** (via Ollama) – Local AI for code generation
- **fs/promises** – File system operations
- **child_process** – Making scripts executable and runnable
- **readline** – Interactive CLI input
- **dotenv** – Configuration management (optional)
- **chalk** – Stylish terminal output (optional)
- **boxen** – Highlight messages in the terminal (optional)
- **(Planned)** - Tree-sitter for AST parsing  

---

## 🧑‍💻 Contributing

This is a solo project by **Eugene Faison** for now.  
Feedback, ideas, and eventual contributions are welcome.

Open an issue if you want to suggest a feature or improvement.

---

## 🪪 License

MIT License

---

## 🙌 Author

**Eugene Faison**  
Veteran | Software Developer | Builder  
[GitHub: Gene7Him](https://github.com/Gene7Him)

