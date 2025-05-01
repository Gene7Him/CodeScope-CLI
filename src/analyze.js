import fs from 'fs';
import chalk from 'chalk';

export default function analyzeFile(filepath) {
  try {
    const code = fs.readFileSync(filepath, 'utf8');

    const functionCount = (code.match(/function\s|\=\>\s/g) || []).length;
    const ifCount = (code.match(/\bif\s*\(/g) || []).length;
    const loopCount = (code.match(/\b(for|while)\s*\(/g) || []).length;
    const complexity = functionCount + ifCount + loopCount;

    console.log(chalk.blueBright(`📄 File: ${filepath}`));
    console.log(chalk.green(`🔹 Functions: ${functionCount}`));
    console.log(chalk.yellow(`🔹 Ifs: ${ifCount}`));
    console.log(chalk.magenta(`🔹 Loops: ${loopCount}`));
    console.log(chalk.redBright(`🔹 Estimated Complexity: ${complexity}`));
  } catch (err) {
    console.error(chalk.red(`Error reading file: ${err.message}`));
  }
}
