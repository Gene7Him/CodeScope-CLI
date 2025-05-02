export function generateMarkdown(results) {
    let output = `# 📊 CodeScope Report\n\n`;
  
    for (const file of Object.keys(results)) {
      output += `## ${file}\n`;
      const info = results[file];
      for (const [key, val] of Object.entries(info)) {
        output += `- **${key}**: ${val}\n`;
      }
      output += '\n';
    }
  
    return output;
  }
  