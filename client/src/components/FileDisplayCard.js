import React from "react";
import Card from 'react-bootstrap/Card';
import { useNavigate } from "react-router-dom";

  

function FileDisplayCard({file}) {
    let navigate = useNavigate(); 
    function routeChange(){ 
        navigate("/viewAd", { state: { fileData: file } });
    }
    return (
        <Card key={file.FileID} style={{ height: '18rem' }} onClick={routeChange}>
            <Card.Img variant="top" src={"/api/"+file.filePictureRoute} />
            <Card.Body>
                <Card.Title>{file.fileName}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">€{file.filePrice}</Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">By: {file.ownerUsername}</Card.Subtitle>               
            </Card.Body>
        </Card>
    );
}

export default FileDisplayCard;