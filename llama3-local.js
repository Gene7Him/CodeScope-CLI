import axios from 'axios';

const prompt = `Write a bash script that takes a matrix represented as a string with 
format '[1,2],[3,4],[5,6]' and prints the transpose in the same format.`;

async function askLlama(prompt) {
  try {
    const response = await axios.post('http://localhost:11434/api/generate', {
      model: 'llama3.2', // or 'llama3:instruct' if you downloaded that
      prompt,
      stream: false,
    });

    console.log('\n🧠 LLaMA 3 Response:\n');
    console.log(response.data.response);
  } catch (err) {
    console.error('🔥 Error talking to LLaMA:', err.message);
  }
}

askLlama(prompt);
