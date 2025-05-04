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

Start the LLaMA 3 server:
# Ensure the server is running on http://localhost:11434

Run the script:
node llama3-local.js

Example prompt: The script sends the following prompt to LLaMA 3:
Write a bash script that takes a matrix represented as a string with 
format '[1,2],[3,4],[5,6]' and prints the transpose in the same format.

The response from LLaMA 3 will be logged to the console.

---

Matrix Transposition
The transpose.sh script takes a matrix as input and outputs its transpose.

Run the script:
[transpose.sh](http://_vscodecontentref_/1)

Provide the matrix input: Enter the matrix in the format [1,2],[3,4],[5,6] and press Enter.

Example:
Input:  [1,2],[3,4],[5,6]
Output: [1,3,5],[2,4,6]

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

