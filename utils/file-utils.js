import fs from 'fs';
import path from 'path';

export function walkDir(dir) {
  let results = [];

  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat && stat.isDirectory()) {
      results = results.concat(walkDir(fullPath));
    } else {
      results.push(fullPath);
    }
  });

  return results;
}

export function filterFiles(files, ext = '.js') {
  return files.filter(file => path.extname(file) === ext);
}
