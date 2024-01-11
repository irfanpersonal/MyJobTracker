import styled from 'styled-components';
import React from 'react';
import {pdfjs, Document, Page} from 'react-pdf';
import {FaArrowAltCircleLeft, FaArrowAltCircleRight} from "react-icons/fa";
import {saveAs} from 'file-saver';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url,
).toString();

interface ViewPDFProps {
    location: string
}

const ViewPDF: React.FunctionComponent<ViewPDFProps> = ({location}) => {
    const previousPage = () => {
        setPageNumber(currentState => {
            const newState = currentState - 1;  
            if (newState === 0) {
                return numPages!;
            }
            return newState;
        });
    }
    const nextPage = () => {
        setPageNumber(currentState => {
            if (currentState === numPages) {
                return 1;
            }
            const newState = currentState + 1; 
            return newState;
        });
    }
    const download = async () => {
        const lastUnderscoreIndex = location.lastIndexOf('_');
        const fileName = location.slice(lastUnderscoreIndex + 1);
        try {
            const pdfBlob = await fetch(location).then((res) => res.blob());
            saveAs(pdfBlob, fileName);
        } 
        catch (error) {
            console.error("Error downloading PDF:", error);
        }
    };
    const [numPages, setNumPages] = React.useState<number>();
    const [pageNumber, setPageNumber] = React.useState<number>(1);
    function onDocumentLoadSuccess({numPages}: {numPages: number}): void {
        setNumPages(numPages);
    }
    return (
        <Wrapper>
            <div className="page-container">
                <div>Resume: {pageNumber} / {numPages}</div>
                {numPages! > 1 && (
                    <div><FaArrowAltCircleLeft className="arrow" onClick={previousPage}/><FaArrowAltCircleRight className="arrow" onClick={nextPage}/></div>
                )}
                <div className="download-button" onClick={download}>Download</div>
            </div>
            <Document file={location} onLoadSuccess={onDocumentLoadSuccess}>
                <Page pageNumber={pageNumber} renderTextLayer={false} renderAnnotationLayer={false}/>
            </Document>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    .page-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.5rem;
    }
    .download-button {
        cursor: pointer;
        user-select: none;
        color: white;
        background-color: gray;
        padding: 0.5rem;
    }
    .arrow {
        cursor: pointer;
        font-size: 1.5rem;
        margin-right: 1rem;
    }
    p {
        text-align: center;
        margin-bottom: 1rem;
    }
    padding: 1rem;
    margin-top: 1rem;
    background-color: rgb(229, 225, 218);
    border-radius: 0.5rem;
    box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1); 
    max-width: 100%;
    overflow-x: auto;
    canvas.react-pdf__Page__canvas {
        border: 1px solid black;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05); 
        max-width: 100%;
        margin: 0 auto;
    }
`;

export default ViewPDF;