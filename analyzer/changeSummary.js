import simpleGit from 'simple-git';

const git = simpleGit();

export async function getRecentDiffs(limit = 3) {
  const log = await git.log({ maxCount: limit });

  const summaries = [];

  for (const commit of log.all) {
    const diff = await git.diff([`${commit.hash}~1`, commit.hash]);
    summaries.push({
      hash: commit.hash,
      message: commit.message,
      summary: mockAISummary(diff),
    });
  }

  return summaries;
}

// 💡 Stub for now — plug into real AI later
function mockAISummary(diff) {
  if (!diff.trim()) return 'No significant code changes detected.';
  return `AI Summary: This commit likely modified logic, functions, or imports based on the diff size.`;
}
