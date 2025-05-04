import { parseStackTrace } from '../../utils/stackTraceParser';
import { findRecentCommitsForFiles } from '../../git/findRecentCommits';

import fs from 'fs';

export async function runDebug(filePath: string) {
  const log = fs.readFileSync(filePath, 'utf8');
  const stack = parseStackTrace(log);

  console.log('\n[!] Stack trace parsed:');
  console.log(stack);

  const relatedCommits = await findRecentCommitsForFiles(stack.map(s => s.file));

  const prompt = `
You are a senior software engineer helping debug an error.

Here is the stack trace:
${log}

Here are recent commits to related files:
${relatedCommits.join('\n')}

What is the most likely root cause and suggested fix?
`;



  console.log('\n[AI Debug Suggestion]');

}
