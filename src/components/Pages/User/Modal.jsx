import React, { useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/2.6.347/pdf.worker.min.js`;

function Modal() {
  const [numPages, setNumPages] = useState(null);
  const [textContent, setTextContent] = useState('');

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  async function extractTextContent() {
    const pages = [];

    for (let pageNum = 1; pageNum <= numPages; pageNum++) {
      const page = await pdfjs.getDocument({ url: 'example.pdf' }).getPage(pageNum);
      const content = await page.getTextContent();
      pages.push(content.items.map(item => item.str).join(' '));
    }

    const textContent = pages.join('\n');
    setTextContent(textContent);
  }

  return (
    <div>
      <Document file="example.pdf" onLoadSuccess={onDocumentLoadSuccess}>
        {Array.from(new Array(numPages), (el, index) => (
          <Page key={`page_${index + 1}`} pageNumber={index + 1} />
        ))}
      </Document>
      <button onClick={extractTextContent}>Extract Text Content</button>
      {textContent && (
        <div>
          <h3>Text Content:</h3>
          <pre>{textContent}</pre>
        </div>
      )}
    </div>
  );
}

export default Modal;
