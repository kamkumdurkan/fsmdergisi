import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useParams, useLocation } from 'react-router-dom';
import './App.css';
import Flipbook from './components/Flipbook';
import logo from './logo512.png'
function App() {
  const [pdfFiles, setPdfFiles] = useState([]);
  const location = useLocation(); // Get the current location

  useEffect(() => {
    fetch('/dergiler.json')
      .then(response => response.json())
      .then(data => setPdfFiles(data.dergiler))
      .catch(error => console.error('PDF dosyaları alınamadı:', error));
  }, []);

  // Determine if we are on the flipbook page
  const isFlipbookPage = location.pathname.startsWith('/dergi/');

  return (
    <div className="App">
      {!isFlipbookPage && ( // Render header and buttons only if not on the flipbook page
        <header className="App-header">
          <h1>FSM Dergisi</h1>
          <div>
            {/* Render buttons for each PDF file */}
            {pdfFiles.map((file) => (
              <button className='button' key={file.id} onClick={() => window.location.href = `/dergi/${file.id}`}>
                {file.name}
              </button>
            ))}
          </div>
        </header>
      )}

      <Routes>
        {/* Define a route for flipping through PDFs */}
        <Route path="/dergi/:id" element={<FlipbookLoader pdfFiles={pdfFiles} />} />
      </Routes>
    </div>
  );
}
function FlipbookLoader({ pdfFiles }) {
  const { id } = useParams();
  // Constructing the PDF path using HTTPS
  const pdfPath = pdfFiles.find(file => file.id === id)?.path.replace('http://', 'https://');

  if (pdfPath) {
    return (
      <>
        <img src={logo} className="App-logo" alt="logo" />
        <Flipbook pdfPath={pdfPath} />
      </>
    );
  } else {
    return <div>PDF bulunamadı.</div>;
  }
}


// Wrap your App component with Router
export default function AppWithRouter() {
  return (
    <Router>
      <App />
    </Router>
  );
}
