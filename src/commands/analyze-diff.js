import simpleGit from 'simple-git';
import askLlama from '../../llama3-local.js';
import chalk from 'chalk';



export async function analyzeDiff() {
  try {
    const git = simpleGit();
    const diff = await git.diff(); // Use '--cached' for staged only

    if (!diff || diff.trim() === '') {
      console.log(chalk.yellow('⚠️ No code changes detected in Git diff.'));
      return;
    }

    const prompt = `
You are a senior code reviewer. A developer made the following Git changes:

${diff}

Please respond with a JSON object like this:
{
  "riskLevel": 1-10,
  "summary": "...",
  "reasoning": "...",
  "impactedModules": ["..."],
  "recommendations": ["..."]
}

Analyze the diff and fill out this structure.
`;

    console.log(chalk.cyan('🧠 Analyzing Git diff with CodeScope AI...'));
    const result = await askLlama(prompt);

    if (!result) {
      console.log(chalk.red('❌ No response received from LLaMA 3. Please check the API or server.'));
      return;
    }

    // Extract the JSON object from the response
    const jsonMatch = result.match(/\{[\s\S]*\}/); // Match the JSON object
    if (!jsonMatch) {
      console.log(chalk.yellow('⚠️ Could not find a JSON object in the response. Raw output:'));
      console.log(result);
      return;
    }

    const cleanedResult = jsonMatch[0]; // Extract the JSON portion

    try {
      const parsed = JSON.parse(cleanedResult);
      console.log(chalk.green('\n📊 Risk Analysis:'));
      console.log(`🧩 Risk Level: ${parsed.riskLevel}/10`);
      console.log(`📝 Summary: ${parsed.summary}`);
      console.log(`💡 Reasoning: ${parsed.reasoning}`);
      console.log(`📁 Modules: ${parsed.impactedModules.join(', ')}`);
      console.log(`🛠 Recommendations:\n - ${parsed.recommendations.join('\n - ')}`);
    } catch (e) {
      console.log(chalk.yellow('⚠️ Could not parse extracted JSON. Raw output:'));
      console.log(cleanedResult);
    }
  } catch (error) {
    console.error('❌ Error analyzing diff:', error.message);
  }
}