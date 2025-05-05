import axios from 'axios';

async function askLlama(prompt) {
  try {
    const response = await axios.post('http://localhost:11434/api/generate', {
      model: 'llama3.2',
      prompt,
      stream: false,
    });

    if (response.data && response.data.response) {
      return response.data.response; // Extract the 'response' field
    } else {
      console.error('❌ LLaMA 3 API returned an unexpected response:', response.data);
      return null;
    }
  } catch (err) {
    console.error('🔥 Error talking to LLaMA 3:', err.message);
    return null;
  }
}

export default askLlama;
