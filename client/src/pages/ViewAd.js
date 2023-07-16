import React from "react";
import { useOutletContext, useNavigate, useLocation} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';

  

function ViewAd() {
    const [title, setTitle] = useOutletContext();
    const location = useLocation()
    const { fileData } = location.state
    setTitle("temp");
    let navigate = useNavigate();
    function routeChange(){ 
        navigate("/buy", { state: { FileID: fileData.FileID} });
    }
    return (
        <Container>
            <h1>{fileData.filename}</h1>
            <h3>€{fileData.filePrice}</h3>
            <p>{fileData.fileDescription}</p>
            <Carousel>
                <Carousel.Item>
                    <img
                    className="d-block w-50"
                    src={"/api/"+fileData.filePictureRoute}
                    alt="First slide"
                    />
                </Carousel.Item>
            </Carousel>
            <Button onClick={routeChange}>Buy</Button>
        </Container> 
    );
}

export default ViewAd;