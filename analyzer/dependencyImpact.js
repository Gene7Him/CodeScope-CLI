import fs from 'fs';
import path from 'path';

function extractImports(code, ext) {
  const importRegex = ext === '.js' || ext === '.ts'
    ? /import\s+.*?['"](.+?)['"]/g
    : /(?:from\s+['"](.+?)['"]|import\s+['"](.+?)['"])/g;

  const deps = new Set();
  let match;

  while ((match = importRegex.exec(code))) {
    const dep = match[1] || match[2];
    if (dep && !dep.startsWith('http') && !dep.startsWith('node:') && !dep.startsWith('/')) {
      deps.add(dep);
    }
  }

  return [...deps];
}

export default function analyzeDependencyImpact(filePaths) {
  const graph = {};

  for (const file of filePaths) {
    const ext = path.extname(file);
    if (!['.js', '.ts', '.py'].includes(ext)) continue;

    const content = fs.readFileSync(file, 'utf8');
    const imports = extractImports(content, ext);

    graph[file] = { imports, importedBy: [] };
  }

  // Track reverse (who depends on this file)
  for (const [file, { imports }] of Object.entries(graph)) {
    for (const imp of imports) {
      const absPath = path.resolve(path.dirname(file), imp);
      for (const target of Object.keys(graph)) {
        if (target.includes(absPath)) {
          graph[target].importedBy.push(file);
        }
      }
    }
  }

  return graph;
}
