
import React, { useState } from 'react';
import { Offcanvas, Button } from 'react-bootstrap';
import { WhatsappShareButton, WhatsappIcon } from 'react-share';
import RecipePDFDocument from './RecipePDFDocument';

function ShareRecipe({ recipedata }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    console.log("recipe prop:",recipedata);

    const generatePDF = () => {
        const blob = new Blob([<RecipePDFDocument recipedata={recipedata} />], { type: 'application/pdf' });
        console.log("blob:",blob);
        const pdfUrl = URL.createObjectURL(blob);
        console.log(pdfUrl);
         return pdfUrl;
       
    };

    const pdfUrl = generatePDF();
    

    const downloadPDF = () => {
      const pdfUrl = generatePDF();
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = 'recipe.pdf'; // Set the desired filename
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  };

    return (
        <>
            <Button className='btn btn-dark share' onClick={handleShow}>
                <i className="fa-solid fa-share-nodes fa-shake"></i>
            </Button>

            <Offcanvas show={show} onHide={handleClose} placement="bottom" className='w-50 rounded shadow-lg bg-light' style={{ left: '25%' }}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Sharing options</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                <a href="#" onClick={downloadPDF}>Download PDF</a>

                    <WhatsappShareButton
                        url={pdfUrl}
                        title="Check out this recipe PDF!">
                        <WhatsappIcon size={32} round={true} />
                    </WhatsappShareButton>
                </Offcanvas.Body>
            </Offcanvas>
            {/* <iframe src={pdfUrl} title="PDF Viewer" width="100%" height="500px" /> */}
        </>
    );
}

export default ShareRecipe;


