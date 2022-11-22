import { useState } from 'react';
import './App.css'
import { Configuration, OpenAIApi } from "openai";
function App() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [placeholder, setPlaceholder] = useState(
    "Search Bears with Paint Brushes the Starry Night, cars,apples and night moon"
  );
  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_Open_AI_Key,
  });

  const openai = new OpenAIApi(configuration);

  const generateImage = async () => {
    setPlaceholder(`Search ${prompt}..`);
    setLoading(true);
    const res = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: "512x512",
    });
    setLoading(false);
    setResult(res.data.data[0].url);
  };
  return (
    <div className="app-main">
    {loading ? (
      <>
        <h2>Generating..Please Wait..</h2>
        <div className="lds-ripple">
          <div></div>
          <div></div>
        </div>
      </>
    ) : (
      <>
        <h2>Generate an Image with Open AI API</h2>

        <textarea
          className="app-input"
          placeholder={placeholder}
          onChange={(e) => setPrompt(e.target.value)}
          rows="10"
          cols="40"
        />
        <button onClick={generateImage}>Generate an Image</button>
        {result.length > 0 ? (
          <img className="result-image" src={result} alt="result" />
        ) : (
          <></>
        )}
      </>
         )}
     </div>
  )
}

export default App
