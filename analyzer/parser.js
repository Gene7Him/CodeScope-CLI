import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import analyzeJS from './complexity.js';
import analyzePython from './pythonParser.js';
import getDependencies from './dependencyGraph.js';

export default function analyzeFile(filepath, options = {}) {
  try {
    const code = fs.readFileSync(filepath, 'utf8');
    const ext = path.extname(filepath);

    let result = {};

    if (ext === '.js') {
      const jsAnalysis = analyzeJS(code);
      const deps = getDependencies(code);
      result = { ...jsAnalysis, dependencies: deps.length };
    } else if (ext === '.py') {
      result = analyzePython(code);
    } else {
      console.log(chalk.red(`Unsupported file type: ${ext}`));
      return;
    }

    if (options.json) {
      console.log(JSON.stringify({
        file: filepath,
        ...result,
      }, null, 2));
    } else {
      console.log(chalk.blueBright(`📄 File: ${filepath}`));
      console.log(chalk.green(`🔹 Functions: ${result.functionCount}`));
      console.log(chalk.yellow(`🔹 Ifs: ${result.ifCount}`));
      console.log(chalk.magenta(`🔹 Loops: ${result.loopCount}`));
      console.log(chalk.redBright(`🔹 Estimated Complexity: ${result.complexity}`));
      console.log(chalk.cyan(`🔹 Dependencies: ${result.dependencies}`));
    }
  } catch (err) {
    console.error(chalk.red(`Error reading file: ${err.message}`));
  }
}

export function parseFileContent(filePath, content) {
  const ext = path.extname(filePath);

  if (ext === '.py') {
    return parsePython(content);
  } else if (ext === '.ts' || ext === '.js') {
    return parseJavaScript(content); // same logic
  } else {
    return null;
  }
}
