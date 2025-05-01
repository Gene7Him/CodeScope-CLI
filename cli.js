#!/usr/bin/env node
import scanProject from './analyzer/projectScan.js';
import { Command } from 'commander';
import chalk from 'chalk';
import analyzeFile from './analyzer/parser.js';

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
  .command('scan')
  .argument('<dir>', 'Directory to recursively scan')
  .option('--json', 'Output as JSON')
  .action((dir, options) => {
    scanProject(dir, options);
  });

program.parse(process.argv);
