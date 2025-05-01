import simpleGit from 'simple-git';
import path from 'path';
import chalk from 'chalk';

const git = simpleGit();

export default async function analyzeGitRisk(targetDir = '.') {
  try {
    const log = await git.raw([
      'log',
      '--pretty=format:',
      '--name-only',
      '--since=30.days',
    ]);

    const fileChanges = {};

    const files = log
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);

    for (const file of files) {
      const ext = path.extname(file);
      if (ext !== '.js' && ext !== '.py') continue;

      const fullPath = path.join(process.cwd(), file);
      if (!fullPath.startsWith(path.resolve(targetDir))) continue;

      fileChanges[file] = (fileChanges[file] || 0) + 1;
    }

    const entries = Object.entries(fileChanges);
    const sorted = entries.sort((a, b) => b[1] - a[1]);

    console.log(chalk.bold.blue('📊 Git Risk Analysis (Last 30 Days):'));
    if (sorted.length === 0) {
      console.log(chalk.gray('No recent changes to JS or Python files.'));
    } else {
      for (const [file, count] of sorted) {
        const riskColor =
          count >= 10 ? chalk.red :
          count >= 5 ? chalk.yellow :
          chalk.green;

        console.log(`${riskColor(file)} → ${count} changes`);
      }
    }

  } catch (err) {
    console.error(chalk.red(`❌ Git analysis failed: ${err.message}`));
  }
}
