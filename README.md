# 🚦 CodeScope CLI

**CodeScope** is a command-line tool that helps developers understand the risk and complexity of code changes before they ship. It's built for engineers who want fast, lightweight insights directly from the terminal.

Currently supports **JavaScript**. Future support planned for Python, TypeScript, and Git-based change risk analysis.

---

## ✨ Features

- 📊 Cyclomatic complexity estimation  
- 🔍 Detection of functions, if-statements, and loops  
- ⚡ Fast CLI-based analysis — no IDE plugin required  
- 🧠 Designed for future Git + dependency impact analysis  

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

### Clone and set up locally

```bash
git clone https://github.com/Gene7Him/CodeScope-CLI.git
cd codescope-cli
npm install
npm link
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

## ⏭ Coming Soon

```bash
# Analyze other languages
codescope analyze path/to/file.py
codescope analyze path/to/file.ts

# Scan entire projects
codescope project-scan ./src

# Git commit risk profiling
codescope git-risk path/to/file.js

# Dependency tree mapping
codescope deps path/to/file.js
```

---

## 🧪 Tech Stack

- Node.js  
- [commander](https://www.npmjs.com/package/commander) — CLI command handler  
- [chalk](https://www.npmjs.com/package/chalk) — styled terminal output  
- Native Node.js `fs` module for file parsing  
- (Planned) Tree-sitter for AST parsing  
- (Planned) Simple-git for Git integration  

---

## 🧠 Roadmap

- [x] Basic JavaScript file analysis  
- [x] Add Python support  
- [ ] TypeScript support  
- [ ] Project-wide scan support  
- [ ] Git commit heatmap / change risk  
- [ ] Dependency impact analyzer  
- [ ] AI-generated change summaries  
- [ ] Export reports as Markdown or JSON  

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

