export default function analyzePython(code) {
    const functionCount = (code.match(/^def\s+/gm) || []).length;
    const ifCount = (code.match(/\bif\s+/g) || []).length;
    const loopCount = (code.match(/\b(for|while)\s+/g) || []).length;
    const importCount = (code.match(/^import\s+|^from\s+.*\s+import\s+/gm) || []).length;
  
    const complexity = functionCount + ifCount + loopCount;
  
    return {
      functionCount,
      ifCount,
      loopCount,
      complexity,
      dependencies: importCount,
    };
  }
  