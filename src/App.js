import React, { useState } from "react";
import MagazineReader from "./MagazineReader";
import "./App.css"
const magazines = ["Aralık Ayı Dergisi"]; // Klasör isimleri

function App() {
  const [selectedMagazine, setSelectedMagazine] = useState(null);

  return (
    <div style={{ padding: "20px" }}>
      {selectedMagazine ? (
        <MagazineReader magazineName={selectedMagazine} />
      ) : (
        <div className="cont">
          <h1>Fatih Sultan Mehmet İmam Hatip Ortaokulu E-Dergisi</h1>
          {magazines.map((magazine) => (
            <button className="batın"
              key={magazine}
              onClick={() => setSelectedMagazine(magazine)}
              style={{
                margin: "10px",
                padding: "10px 20px",
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              {magazine}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
