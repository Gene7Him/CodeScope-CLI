#!/usr/bin/env node
import scanProject from './analyzer/projectScan.js';
import { Command } from 'commander';
import chalk from 'chalk';
import analyzeFile from './analyzer/parser.js';
import analyzeGitRisk from './analyzer/gitRisk.js';
import { printBanner } from './utils/banner.js';
import { getRecentDiffs } from './analyzer/changeSummary.js';

printBanner('📦 CodeScope CLI', 'Analyzing your code like a boss 😎');


const program = new Command();

program
  .name('codescope')
  .description('CLI to analyze code complexity and structure')
  .version('0.1.0');

program
  .command('analyze')
  .argument('<filepath>', 'JavaScript file to analyze')
  .option('--json', 'Output as JSON')
  .action((filepath, options) => {
    analyzeFile(filepath, options);
  });

  program
  .command('git-risk')
  .argument('<dir>', 'Directory to analyze Git churn')
  .action((dir) => {
    analyzeGitRisk(dir);
  });

  program
  .command('impact')
  .argument('<dir>', 'Directory to analyze dependency impact')
  .action(async (dir) => {
    const files = await scanDirectory(dir); // reuse from projectScan
    const impact = analyzeDependencyImpact(files);

    printBanner('🔗 Dependency Impact', 'Inbound & Outbound References');

    for (const [file, info] of Object.entries(impact)) {
      console.log(chalk.bold(file));
      console.log(`  ➤ Imports: ${info.imports.length}`);
      console.log(`  ➤ Imported By: ${info.importedBy.length}`);
      console.log('');
    }
  });


  program
  .command('summarize')
  .description('Generate AI-based summaries of recent code changes')
  .action(async () => {
    const diffs = await getRecentDiffs();

    printBanner('🧠 Change Summary', 'AI-powered insights (stubbed)');

    for (const entry of diffs) {
      console.log(chalk.cyan(`Commit: ${entry.hash}`));
      console.log(chalk.yellow(`Message: ${entry.message}`));
      console.log(chalk.green(`Summary: ${entry.summary}`));
      console.log('');
    }
  });

  program
  .command('scan')
  .argument('<dir>', 'Directory to scan')
  .option('--format <type>', 'Output format: json | md', 'pretty')
  .action(async (dir, options) => {
    const files = await scanDirectory(dir);
    const results = analyzeComplexity(files); // or combine multiple analyzers

    if (options.format === 'json') {
      console.log(JSON.stringify(results, null, 2));
    } else if (options.format === 'md') {
      console.log(generateMarkdown(results));
    } else {
      printPrettyResults(results);
    }
  });


program.parse(process.argv);
