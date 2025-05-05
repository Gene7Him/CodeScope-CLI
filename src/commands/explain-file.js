import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import askLlama from '../../llama3-local.js';
import { walkDir, filterFiles } from '../../utils/file-utils.js';

export async function explainFile(fileOrDir, options = {}) {
  try {
    const files = [];

    if (fs.statSync(fileOrDir).isDirectory()) {
      const allFiles = walkDir(fileOrDir);
      files.push(...filterFiles(allFiles, options.filter));
    } else {
      files.push(fileOrDir);
    }

    for (const filepath of files) {
      const code = fs.readFileSync(filepath, 'utf8');
      const ext = path.extname(filepath).slice(1);
      const prompt = `Explain what this ${ext} file does as if to a junior developer:\n\n${code}`;

      console.log(chalk.cyan(`\n📂 ${filepath}`));
      console.log(chalk.gray('🧠 Asking CodeScope AI...'));

      const explanation = await askLlama(prompt);
      console.log(chalk.green(explanation));

      if (options.output === 'markdown') {
        const outputPath = filepath + '.md';
        fs.writeFileSync(outputPath, `# ${path.basename(filepath)}\n\n${explanation}`);
        console.log(chalk.blue(`📝 Saved to ${outputPath}`));
      }
    }
  } catch (err) {
    console.error(chalk.red(`❌ Error explaining file: ${err.message}`));
  }
}

export default explainFile;
