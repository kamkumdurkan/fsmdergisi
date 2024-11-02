import { useState, useEffect } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import '../Modal.css';

function Flipbook({ pdfPath }) {
    const [numPages, setNumPages] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Reset states when pdfPath changes
        setNumPages(null);
        setLoading(true);
    }, [pdfPath]); // Re-run this effect when pdfPath changes

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
        setLoading(false); // Hide loading once PDF is fully loaded
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
        <div>
            <Document
                file={pdfPath} // Use the dynamic path from props
                onLoadSuccess={onDocumentLoadSuccess}
                className='modal-90w'
            >
                {!loading && ( // Render the flipbook only when the PDF is loaded
                    <HTMLFlipBook width={500} height={707}>
                        {pagesList()}
                    </HTMLFlipBook>
                )}
            </Document>
        </div>
    );
}

export default Flipbook;
