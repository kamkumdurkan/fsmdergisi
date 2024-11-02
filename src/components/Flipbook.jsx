import { useState } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import '../Modal.css';
import './Flipbook.css';
import logo from '../logo512.png';

function Flipbook({ pdfPath, background }) {
    const [numPages, setNumPages] = useState(null);
    const [loading, setLoading] = useState(true);
    pdfPath="http://fsmdergisi.vercel.app/dergiler" + pdfPath
    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
        setLoading(false);
    }

    function onDocumentLoadError(error) {
        console.error("Error loading PDF:", error);
        setLoading(false); // Hide loading on error
        
    }

    function pagesList() {
        const pages = [];
        for (let i = 1; i <= numPages; i++) {
            pages.push(
                <div key={i}>
                    <Page width={500} pageNumber={i} />
                </div>
            );
        }
        return pages;
    }

    return (
        <div className="flipbook-background" style={{ backgroundImage: `url(http://fsmdergisi.vercel.app/arkaplanlar/${background})` }}>
            {loading && (
                <div className="loading-overlay">
                    <img src={logo} className="App-logo" alt="Loading..." />
                </div>
            )}
            <Document
                file={pdfPath}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={onDocumentLoadError}
                className="modal-90w"
            >
                {!loading && (
                    <HTMLFlipBook width={500} height={707}>
                        {pagesList()}
                    </HTMLFlipBook>
                )}
            </Document>
        </div>
    );
    
}

export default Flipbook;
