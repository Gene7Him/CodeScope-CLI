#!/usr/bin/env node
import '../cli.js';
import { Command } from 'commander';
import chalk from 'chalk';
import analyzeFile from '../src/analyze.js';

const program = new Command();

program
  .name('codescope')
  .description('CLI to analyze code complexity and structure')
  .version('0.1.0');

program
  .command('analyze')
  .argument('<filepath>', 'JavaScript file to analyze')
  .action((filepath) => {
    analyzeFile(filepath);
  });

program.parse(process.argv);
