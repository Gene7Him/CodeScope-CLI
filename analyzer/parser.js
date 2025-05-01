import fs from 'fs';
import chalk from 'chalk';
import analyzeComplexity from './complexity.js';
import getDependencies from './dependencyGraph.js';

export default function analyzeFile(filepath, options = {}) {
  try {
    const code = fs.readFileSync(filepath, 'utf8');

    const { functionCount, ifCount, loopCount, complexity } = analyzeComplexity(code);
    const deps = getDependencies(code); // placeholder

    if (options.json) {
      console.log(JSON.stringify({
        file: filepath,
        functions: functionCount,
        ifs: ifCount,
        loops: loopCount,
        complexity,
        dependencies: deps,
      }, null, 2));
    } else {
      console.log(chalk.blueBright(`📄 File: ${filepath}`));
      console.log(chalk.green(`🔹 Functions: ${functionCount}`));
      console.log(chalk.yellow(`🔹 Ifs: ${ifCount}`));
      console.log(chalk.magenta(`🔹 Loops: ${loopCount}`));
      console.log(chalk.redBright(`🔹 Estimated Complexity: ${complexity}`));
      console.log(chalk.cyan(`🔹 Dependencies: ${deps.length}`));
    }
  } catch (err) {
    console.error(chalk.red(`Error reading file: ${err.message}`));
  }
}
