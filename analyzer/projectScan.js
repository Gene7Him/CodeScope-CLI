import fs from 'fs';
import path from 'path';
import analyzeFile from './parser.js';
import chalk from 'chalk';

async function scanDirectory(dir) {
  let results = [];

  const files = await fs.promises.readdir(dir, { withFileTypes: true });

  for (const file of files) {
    const fullPath = path.join(dir, file.name);

    if (file.isDirectory()) {
      const nestedResults = await scanDirectory(fullPath);
      results = results.concat(nestedResults);
    } else if (isCodeFile(file.name)) {
      results.push(fullPath);
    }
    
  }

  return results;
}

export default async function scanProject(dir, options) {
  try {
    const files = await scanDirectory(dir);
    const summary = {
      filesAnalyzed: 0,
      functions: 0,
      ifs: 0,
      loops: 0,
      complexity: 0,
      dependencies: 0,
    };

    for (const file of files) {
      const code = fs.readFileSync(file, 'utf8');
      const ext = path.extname(file);
      let result;

      if (ext === '.js' || ext === '.ts') {

        const analyze = (await import('./complexity.js')).default;
        const getDeps = (await import('./dependencyGraph.js')).default;
        result = analyze(code);
        result.dependencies = getDeps(code).length;
      } else if (ext === '.py') {
        const analyze = (await import('./pythonParser.js')).default;
        result = analyze(code);
      }

      if (result) {
        summary.filesAnalyzed += 1;
        summary.functions += result.functionCount;
        summary.ifs += result.ifCount;
        summary.loops += result.loopCount;
        summary.complexity += result.complexity;
        summary.dependencies += result.dependencies;
      }
    }

    if (options.json) {
      console.log(JSON.stringify(summary, null, 2));
    } else {
      console.log(chalk.bold.blue(`📁 Scanned directory: ${dir}`));
      console.log(chalk.green(`✔ Files analyzed: ${summary.filesAnalyzed}`));
      console.log(chalk.green(`🔹 Functions: ${summary.functions}`));
      console.log(chalk.yellow(`🔹 Ifs: ${summary.ifs}`));
      console.log(chalk.magenta(`🔹 Loops: ${summary.loops}`));
      console.log(chalk.redBright(`🔹 Total Complexity: ${summary.complexity}`));
      console.log(chalk.cyan(`🔹 Total Dependencies: ${summary.dependencies}`));
    }

  } catch (err) {
    console.error(chalk.red(`Error scanning directory: ${err.message}`));
  }
}

const isCodeFile = file =>
  file.endsWith('.js') ||
  file.endsWith('.ts') ||  // ✅ Add this line
  file.endsWith('.py');
