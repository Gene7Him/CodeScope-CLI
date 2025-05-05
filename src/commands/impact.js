// src/commands/impact.js

import madge from 'madge';
import path from 'path';
import fs from 'fs';
import chalk from 'chalk';

async function analyzeImpact(fileOrDir, options = {}) {
    try {
      const absPath = path.resolve(fileOrDir);
      const format = options.output || 'console';
  
      console.log(chalk.cyan(`🔍 Analyzing dependencies for: ${absPath}`));
  
      const result = await madge(absPath, {
        baseDir: process.cwd(),
        fileExtensions: ['js', 'ts'],
        includeNpm: false
      });
  
      const graph = result.obj();
  
      // Reverse dependency map
      const reverseGraph = {};
      for (const [src, deps] of Object.entries(graph)) {
        deps.forEach(dep => {
          if (!reverseGraph[dep]) reverseGraph[dep] = [];
          reverseGraph[dep].push(src);
        });
      }
  
      const markdownLines = ['# CodeScope Impact Report\n\n## Summary\n'];
      const mermaidLines = ['```mermaid', 'graph TD'];
  
      for (const file of Object.keys(graph)) {
        const dependents = reverseGraph[file] || [];
        const impactScore = dependents.length;
  
        if (format === 'console') {
          console.log(`${chalk.green(file)} → ${impactScore} impacted file(s)`);
          dependents.forEach(d => console.log(`   - ${chalk.yellow(d)}`));
        }
  
        if (format === 'markdown') {
          if (impactScore > 0) {
            markdownLines.push(`- \`${file}\` impacts:`);
            dependents.forEach(d => markdownLines.push(`  - \`${d}\``));
          }
        }
  
        if (format === 'mermaid') {
          dependents.forEach(d => {
            mermaidLines.push(`  ${file} --> ${d}`);
          });
        }
      }
  
      // Output file
      if (format === 'markdown') {
        const mdOut = absPath + '.impact.md';
        fs.writeFileSync(mdOut, markdownLines.join('\n') + '\n');
        console.log(`\n📝 Markdown saved: ${mdOut}`);
      }
  
      if (format === 'mermaid') {
        const mermaidOut = absPath + '.impact.mmd';
        fs.writeFileSync(mermaidOut, mermaidLines.join('\n') + '\n```');
        console.log(`\n🖼 Mermaid diagram saved: ${mermaidOut}`);
      }
  
      if (format === 'json') {
        const jsonOut = absPath + '.impact.json';
        fs.writeFileSync(jsonOut, JSON.stringify(reverseGraph, null, 2));
        console.log(`\n📝 JSON saved: ${jsonOut}`);
      }
  
    } catch (err) {
      console.error(chalk.red(`❌ Impact analysis failed: ${err.message}`));
    }
  }
  

export default analyzeImpact;
