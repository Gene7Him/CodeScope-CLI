import simpleGit from 'simple-git';

const git = simpleGit();

export async function findRecentCommitsForFiles(files: string[]): Promise<string[]> {
  const results: string[] = [];
  for (const file of files) {
    try {
      const log = await git.log({ file, n: 3 });
      log.all.forEach(entry => {
        results.push(`${entry.date} - ${entry.author_name}: ${entry.message}`);
      });
    } catch {
      results.push(`No recent commits found for ${file}`);
    }
  }
  return results;
}
