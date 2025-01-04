import React, { useState, useEffect } from "react";
import HTMLFlipBook from "react-pageflip";
import "./MagazineReader.css";

const MagazineReader = ({ magazineName }) => {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    const loadPages = async () => {
      const pageList = [];
      for (let i = 1; i <= 100; i++) {
        const pagePath = `/dergiler/${magazineName}/${i}.jpg`;
        const exists = await checkImageExists(pagePath);

        if (exists) {
          pageList.push(pagePath);
        } else {
          break;
        }
      }
      setPages(pageList);
    };

    loadPages();
  }, [magazineName]);

  const checkImageExists = (url) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = url;
    });
  };

  return (
    <div className="magazine-container">
      <HTMLFlipBook
        width={400} // 1414px / 2
        height={566} // 2000px / 2
        showCover={true}
        className="flipbook"
      >
        {pages.map((page, index) => (
          <div key={index} className="page">
            <img src={page} alt={`Sayfa ${index + 1}`} />
          </div>
        ))}
      </HTMLFlipBook>
    </div>
  );
};

export default MagazineReader;
