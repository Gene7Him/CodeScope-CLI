import fs from 'fs';
import readline from 'readline';
import axios from 'axios';

const prompt = `
Write a bash script that takes a matrix represented as a string with 
format '[1,2],[3,4],[5,6]' and prints the transpose in the same format.
`;

// Send prompt to LLaMA 3 running locally via Ollama
async function askLlama(prompt) {
    const response = await axios.post('http://localhost:11434/api/chat', {
      model: 'llama3.2',
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });
 
    return response.data.message.content;
  }
  (async () => {
    const response = await askLlama("Write a bash script that transposes a matrix string like '[1,2],[3,4],[5,6]'");
    console.log(response);
  })();
  

// Save output to a file
function saveScript(output, filename = 'transpose.sh') {
  const codeBlockMatch = output.match(/```bash\n([\s\S]*?)```/);
  const code = codeBlockMatch ? codeBlockMatch[1] : output;

  fs.writeFileSync(filename, code, { mode: 0o755 });
  console.log(`✅ Saved script to ${filename}`);
}

// Optional: prompt to run script with sample input
async function runScript(filename) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question('Run script with example input [1,2],[3,4],[5,6]? (y/n): ', (answer) => {
    if (answer.toLowerCase() === 'y') {
      const { spawn } = require('child_process');
      const echo = spawn('echo', ['[1,2],[3,4],[5,6]']);
      const script = spawn(`./${filename}`);

      echo.stdout.pipe(script.stdin);
      script.stdout.on('data', (data) => {
        console.log(`\n🧾 Output:\n${data}`);
      });
    }
    rl.close();
  });
}

// 🧠 Main flow
(async () => {
  const output = await askLlama(prompt);
  console.log('\n🧠 LLaMA 3 Response:\n');
  console.log(output);
  saveScript(output);
  await runScript('transpose.sh');
})();
