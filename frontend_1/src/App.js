import "./App.css";
import { useState } from "react";

// import Polaris from "./components/Polaris";

function App() {
  const [loading, setLoading] = useState(false);

  async function getImages() {
    setLoading(true);
    const data = await fetch("/get-images/sectional.png", 
    // {
    //   body: "/Users/zholmatov/Desktop/",
    // }
    ).then((res) => res.json());
    console.log(data, " data");
    setLoading(false);
    // return data;
  }

  return (
    <div className="App">
      {loading && <div>Loading...</div>}
      <button onClick={getImages} disabled={loading}>
        Get images
      </button>
    </div>
  );
}

export default App;
