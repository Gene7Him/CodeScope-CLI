export function parseStackTrace(log: string): { file: string, line: number }[] {
    const lines = log.split('\n');
    const stack: { file: string, line: number }[] = [];
  
    for (const line of lines) {
      const match = line.match(/\(?([^:()]+\.js|\.ts):(\d+):\d+\)?/);
      if (match) {
        stack.push({ file: match[1], line: parseInt(match[2], 10) });
      }
    }
  
    return stack;
  }
  