export default function getDependencies(code) {
    const importMatches = code.match(/import\s.+?from\s['"].+?['"]/g) || [];
    const requireMatches = code.match(/require\(['"].+?['"]\)/g) || [];
  
    return [...importMatches, ...requireMatches];
  }
  