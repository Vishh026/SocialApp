const { GoogleGenAI } =  require("@google/genai");
require("dotenv").config()

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});


async function generateCaption(base64ImageFile) {
  const contents = [
    {
      inlineData: {
        mimeType: "image/jpeg",
        data: base64ImageFile,
      },
    },
    { text: "Caption this image." },
  ];

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: contents,
    config: {
      systemInstruction: `You are an expert image captioning assistant. 
    Generate a clear, specific, and contextually accurate caption for the given image. 
    Describe what is visible, including actions, emotions, objects, and setting. 
    Use complete grammar and keep it human-like and creative.
    The output must be one descriptive sentence suitable for a social media post.,also use the hashtages and emojis`
    },
  });
  return response.text
  // console.log(response.text);
}

 
module.exports =  generateCaption

