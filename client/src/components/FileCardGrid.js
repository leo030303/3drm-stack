import React, { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import { useNavigate } from "react-router-dom";


function FileCardGrid({searchField, fieldVal}) {
      const [fileArray, setFileArray] = useState([]);
      let navigate = useNavigate(); 
      function routeChange(file){ 
        navigate("/viewAd", { state: { fileData: file } });
      }
      const columnsPerRow = 4;
      var url = `/api/yourFiles?searchField=${searchField}&fieldVal=${fieldVal}`;
      useEffect(() => {
          fetch(url, {
              method: 'GET',
          }).then(async responseJson => {
              responseJson.json().then((finished) => {
                  setFileArray(finished.entryData);
                })
          });
      }, []);
      const getColumnsForRow =()=>{
          let items = fileArray.map((file) => {
            return ( 
              <Col>
                <Card key={file.FileID} style={{ height: '18rem' }} onClick={() => routeChange(file)}>
                  <Card.Img variant="top" src={"/api/"+file.filePictureRoute} />
                  <Card.Body>
                    <Card.Title>{file.filename}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">€{file.filePrice}</Card.Subtitle>
                    <Card.Text>
                      {file.fileDescription}
                    </Card.Text>               
                  </Card.Body>
                </Card>
              </Col>
            );
    
        });
        return items;
      };
      return (
        <Container className="mx-auto my-2">
              <Row xs={1} md={columnsPerRow}>
                {getColumnsForRow()}
              </Row>
          </Container>
    );
}
  
export default FileCardGrid;