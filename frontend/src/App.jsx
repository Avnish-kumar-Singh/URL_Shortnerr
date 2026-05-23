import { useState } from "react";
import axios from "axios";

function App() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const generateShortUrl = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/shorten",
        { url: url },                              // ✅ JSON object
        {
          headers: { "Content-Type": "application/json" }  // ✅ correct header
        }
      );

      setShortUrl(response.data);  // backend returns plain string

    } catch (error) {
      console.error(error);
      alert("Something went wrong: " + error.message);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "100px", fontFamily: "Arial" }}>
      <h1>URL Shortener</h1>
      <input
        type="text"
        placeholder="Enter URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={{ width: "400px", padding: "10px", marginBottom: "20px" }}
      />
      <button onClick={generateShortUrl} style={{ padding: "10px 20px", cursor: "pointer" }}>
        Generate
      </button>
      {shortUrl && (
        <div style={{ marginTop: "20px" }}>
          <h3>Short URL:</h3>
          <a href={shortUrl} target="_blank">{shortUrl}</a>
        </div>
      )}
    </div>
  );
}

export default App;