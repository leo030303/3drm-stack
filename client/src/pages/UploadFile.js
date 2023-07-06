import React from "react";
import Container from "react-bootstrap/esm/Container";
import { useOutletContext } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


function UploadFile() {
    const [title, setTitle] = useOutletContext();
    setTitle("Upload File");
    return (
        <Container>
            <Form action='' method='post' enctype="multipart/form-data">
                <Form.Group className="mb-3" controlId="toEncryptFile">
                    <Form.Label>Select file to encrypt:</Form.Label>
                    <Form.Control type="file"/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Encrypt
                </Button>
            </Form>
        </Container>
    );
}

export default UploadFile;