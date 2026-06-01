// import { useState } from "react";
// import axios from "axios";

// function App() {
//   const [url, setUrl] = useState("");
//   const [shortUrl, setShortUrl] = useState("");

//   const generateShortUrl = async () => {
//     try {
//       const response = await axios.post(
//         "http://localhost:8080/shorten",
//         { url: url },                              // ✅ JSON object
//         {
//           headers: { "Content-Type": "application/json" }  // ✅ correct header
//         }
//       );

//       setShortUrl(response.data);  // backend returns plain string

//     } catch (error) {
//       console.error(error);
//       alert("Something went wrong: " + error.message);
//     }
//   };

//   return (
//     <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "100px", fontFamily: "Arial" }}>
//       <h1>URL Shortener</h1>
//       <input
//         type="text"
//         placeholder="Enter URL"
//         value={url}
//         onChange={(e) => setUrl(e.target.value)}
//         style={{ width: "400px", padding: "10px", marginBottom: "20px" }}
//       />
//       <button onClick={generateShortUrl} style={{ padding: "10px 20px", cursor: "pointer" }}>
//         Generate
//       </button>
//       {shortUrl && (
//         <div style={{ marginTop: "20px" }}>
//           <h3>Short URL:</h3>
//           <a href={shortUrl} target="_blank">{shortUrl}</a>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;


import { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://urls-backend-app-gmfseyhpcjbnhmhc.southeastasia-01.azurewebsites.net";

function App() {


  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [urls, setUrls] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");


  const fetchUrls = async () => {


    try {


      const response = await axios.get(
        `${API_BASE_URL}/all`
      );


      setUrls(response.data);


    } catch (error) {


      console.error(error);


    }


  };


  const searchUrls = async () => {


  try {


    const response = await axios.get(
      `${API_BASE_URL}/search?keyword=${searchKeyword}`
    );


    setUrls(response.data);


  } catch (error) {


    console.error(error);


  }


};


  useEffect(() => {


    fetchUrls();


  }, []);


  const generateShortUrl = async () => {


    try {


      const response = await axios.post(
        `${API_BASE_URL}/shorten`,
        {
          url: url
        },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );


      setShortUrl(response.data);


      fetchUrls();


      setUrl("");


    } catch (error) {


      console.error(error);


      alert(
        "Something went wrong: " +
        error.message
      );


    }


  };


  const copyToClipboard = () => {
  navigator.clipboard.writeText(shortUrl);
  alert("Short URL copied successfully!");
};

// 
// const deleteUrl = async (id) => {
// 
// 
  // try {
// 
// 
    // await axios.delete(
        // `${API_BASE_URL}/delete/${id}`
// 
// 
    // fetchUrls();
// 
// 
  // } catch (error) {
// 
// 
    // console.error(error);
// 
// 
    // alert("Delete failed");
// 
// 
  // }
// 
// 
// };
// 




const deleteUrl = async (id) => {

  try {

    await axios.delete(
      `${API_BASE_URL}/delete/${id}`
    );

    fetchUrls();

  } catch (error) {

    console.error(error);

    alert("Delete failed");

  }

};

  return (


    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "50px",
        fontFamily: "Arial"
      }}
    >


      <h1>URL Shortener</h1>


      <input
        type="text"
        placeholder="Enter URL"
        value={url}
        onChange={(e) =>
          setUrl(e.target.value)
        }
        style={{
          width: "400px",
          padding: "10px",
          marginBottom: "20px"
        }}
      />


      <button
        onClick={generateShortUrl}
        style={{
          padding: "10px 20px",
          cursor: "pointer"
        }}
      >
        Generate
      </button>


      {shortUrl && (


  <div
    style={{
      marginTop: "20px",
      textAlign: "center"
    }}
  >


    <h3>Generated Short URL</h3>


    <a
      href={shortUrl}
      target="_blank"
      rel="noreferrer"
    >
      {shortUrl}
    </a>


    <br />
    <br />


    <button
      onClick={copyToClipboard}
      style={{
        padding: "8px 15px",
        cursor: "pointer"
      }}
    >
      📋 Copy URL
    </button>


  </div>


)}


<div
  style={{
    marginTop: "30px"
  }}
>


  <input
    type="text"
    placeholder="Search URL..."
    value={searchKeyword}
    onChange={(e) =>
      setSearchKeyword(e.target.value)
    }
    style={{
      padding: "10px",
      width: "300px"
    }}
  />


  <button
    onClick={searchUrls}
    style={{
      marginLeft: "10px",
      padding: "10px"
    }}
  >
    Search
  </button>


  <button
    onClick={fetchUrls}
    style={{
      marginLeft: "10px",
      padding: "10px"
    }}
  >
    Show All
  </button>


</div>


      <button
        onClick={() =>
          setShowTable(!showTable)
        }
        style={{
          marginTop: "30px",
          padding: "10px 20px",
          cursor: "pointer"
        }}
      >
        {showTable
          ? "Hide Table"
          : "See Whole Table"}
      </button>


      {showTable && (


        <>


          <h2
            style={{
              marginTop: "30px"
            }}
          >
            All URLs
          </h2>


          <table
            border="1"
            cellPadding="10"
            style={{
              marginTop: "10px",
              borderCollapse: "collapse"
            }}
          >


            <thead>


              <tr>
                <th>ID</th>
                <th>Original URL</th>
                <th>Short URL</th>
                <th>Clicks</th>
                <th>Action</th>
              </tr>


            </thead>


            <tbody>


              {urls.map((item) => (


                <tr key={item.id}>


                  <td>{item.id}</td>


                  <td>{item.originalUrl}</td>


                  <td>


                    <a
                      href={`${API_BASE_URL}/${item.shortCode}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {item.shortCode}
                    </a>


                  </td>


                  <td>{item.clickCount}</td>


                    <td>
                      <a
                        href={`${API_BASE_URL}/qr/${item.shortCode}`}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          marginRight: "10px",
                          textDecoration: "none",
                          fontWeight: "bold",
                          color: "green"
                        }}
                      >
                        QR
                      </a>
                      <button
                        onClick={() => deleteUrl(item.id)}
                        style={{
                          backgroundColor: "red",
                          color: "white",
                          border: "none",
                          padding: "5px 10px",
                          cursor: "pointer"
                        }}
                      >
                        Delete
                      </button>
                    </td>


                </tr>


              ))}


            </tbody>


          </table>


        </>


      )}


    </div>


  );


}


export default App;