import React, { useState, useEffect } from 'react';
import HTMLFlipBook from 'react-pageflip';
import './Flipbook.css';

function Flipbook({ pdfPath, background, totalPages }) {
    const [pages, setPages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Sayfa URL'lerini oluştur
        const pageUrls = Array.from({ length: totalPages }, (_, index) => {
            return `/dergiler/${pdfPath}#page=${index + 1}`;
        });
        setPages(pageUrls);
        setLoading(false);
    }, [pdfPath, totalPages]);

    return (
        <div
            className="flipbook-background"
            style={{
                backgroundImage: `url(${background})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                width: '100%',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <HTMLFlipBook width={500} height={707}>
                {loading ? (
                    <p>Yükleniyor...</p>
                ) : (
                    pages.map((pageUrl, index) => (
                        <div key={index} className="flipbook-page">
                            <iframe
                                src={pageUrl}
                                width="100%"
                                height="100%"
                                style={{ border: 'none' }}
                                title={`PDF Sayfa ${index + 1}`}
                            />
                        </div>
                    ))
                )}
            </HTMLFlipBook>
        </div>
    );
}

export default Flipbook;
