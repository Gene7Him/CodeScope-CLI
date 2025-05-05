#!/usr/bin/env node
import { Command } from 'commander';
import scanProject from './analyzer/projectScan.js';
import chalk from 'chalk';
import analyzeFile from './analyzer/parser.js';
import analyzeGitRisk from './analyzer/gitRisk.js';
import { printBanner } from './utils/banner.js';
import { getRecentDiffs } from './analyzer/changeSummary.js';
//import { runDebug } from './src/commands/debug.js';
import { analyzeDiff } from './src/commands/analyze-diff.js';
import explainFile from './src/commands/explain-file.js';
import analyzeImpact from './src/commands/impact.js';

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
    await scanProject(dir, options); // ✅ Let scanProject handle scanning and output

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
  .command('scan <dir>')
  .description('Recursively scan a project directory')
  .option('--json', 'Output results in JSON format')
  .action(async (dir, options) => {
    await scanProject(dir, options); // ✅ Let scanProject handle everything
  });



  console.log('Registering analyze-diff command...');
  program
  .command('analyze-diff')
  .description('Analyze Git diff for risk assessment')
  .action(async () => {
    console.log('Running analyze-diff...');
    await analyzeDiff();
  });

  program
  .command('help')
  .description('Show help information')
  .action(() => {
    program.help();
  });


  program
  .command('explain-file')
  .argument('<target>', 'Target file or directory to explain')
  .option('--recursive', 'Recursively walk directories')
  .option('--filter <ext>', 'Filter files by extension (e.g., .js)', '.js')
  .option('--output <format>', 'Output format (e.g., markdown)')
  .description('Explain a file or set of files using AI')
  .action(async (target, options) => {
    console.log(chalk.magenta('📖 Running explain-file...'));
    await explainFile(target, {
      recursive: options.recursive || false,
      filter: options.filter || '.js',
      output: options.output || null
    });
  });
 

  program
  .command('analyze-impact <fileOrDir>')
  .option('--output <format>', 'Output format (json or markdown)')
  .description('Analyze file/module dependency impact')
  .action(analyzeImpact);


program.parse(process.argv);
