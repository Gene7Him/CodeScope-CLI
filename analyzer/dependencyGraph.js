import * as acorn from 'acorn';

import path from 'path';

export default function getDeps(code) {
  const ast = acorn.parse(code, {
    sourceType: 'module',
  });

  const dependencies = new Set();

  acorn.walk.simple(ast, {
    ImportDeclaration(node) {
      dependencies.add(node.source.value); // Store the imported module
    },
  });

  return Array.from(dependencies);
}

  