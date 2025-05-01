export default function analyzeComplexity(code) {
    const functionCount = (code.match(/function\s|\=\>\s/g) || []).length;
    const ifCount = (code.match(/\bif\s*\(/g) || []).length;
    const loopCount = (code.match(/\b(for|while)\s*\(/g) || []).length;
    const complexity = functionCount + ifCount + loopCount;
  
    return { functionCount, ifCount, loopCount, complexity };
  }
  