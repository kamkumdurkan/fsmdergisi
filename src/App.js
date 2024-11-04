import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useParams, useLocation } from 'react-router-dom';
import './App.css';
import Flipbook from './components/Flipbook';
// FSM
function App() {
    const [pdfFiles, setPdfFiles] = useState([]);
    const location = useLocation();

    useEffect(() => {
        fetch('/dergiler.json')
            .then(response => response.json())
            .then(data => setPdfFiles(data.dergiler))
            .catch(error => console.error('Dergi dosyaları alınamadı:', error));
    }, []);

    const isFlipbookPage = location.pathname.startsWith('/dergi/');

    return (
        <div className="App">
            {!isFlipbookPage && (
                <header className="App-header">
                  
                    <h1>FSM DergisiA</h1>
                    <div>
                        {pdfFiles.map((file) => (
                            <button className='button' key={file.id} onClick={() => window.location.href = `/dergi/${file.id}`}>
                                {file.name}
                            </button>
                        ))}
                    </div>
                </header>
            )}

            <Routes>
                <Route path="/dergi/:id" element={<FlipbookLoader pdfFiles={pdfFiles} />} />
            </Routes>
        </div>
    );
}

function FlipbookLoader({ pdfFiles }) {
    const { id } = useParams();
    const pdfData = pdfFiles.find(file => file.id === id);

    if (pdfData) {
        const { path: pdfPath, background } = pdfData;
        return (
            <Flipbook pdfPath={pdfPath} background={background} />
        );
    } else {
        return <div>PDF bulunamadı.</div>;
    }
}

export default function AppWithRouter() {
    return (
        <Router>
            <App />
        </Router>
    );
}
