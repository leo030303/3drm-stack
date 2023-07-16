import React from "react";
import Card from 'react-bootstrap/Card';
import { saveAs } from 'file-saver';

function BoughtFileCard({privilege, user}) {
    function downloadFile(){ 
        var url = "/api/getEncrypted";
        var bearer = 'Bearer ' + user.token;
        fetch(url, {
            method: 'POST',
            credentials: "include",
            headers: {
                'Authorization': bearer,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ FileID: privilege.FileID }),
        }).then(async function (response) {
            const myBlob = await response.blob();
            return myBlob
        }
        )
        .then(function(blob) {
            console.log(blob);
            saveAs(blob, privilege.fileName+".leo");
        })
        .catch(error => {
            //whatever
        })
    }
    return (
        <Card key={privilege.FileID} style={{ height: '18rem' }} onClick={downloadFile}>
            <Card.Img variant="top" src={"/api/"+privilege.filePictureRoute} />
            <Card.Body>
                <Card.Title>{privilege.fileName}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Expiry: {privilege.expiryDate.split("T")[0]}</Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">By: {privilege.ownerUsername}</Card.Subtitle>
            </Card.Body>
        </Card>
    );
}

export default BoughtFileCard;