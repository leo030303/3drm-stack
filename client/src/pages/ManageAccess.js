import React from "react";
import Container from "react-bootstrap/esm/Container";
import { useOutletContext } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
  

function ManageAccess({user}) {
    const [title, setTitle] = useOutletContext();
    setTitle("Manage Access");
    return (
        <Container>
            Just for testing will remove
            <Form action='/api/manageAccess' method='post'>
                <Form.Group className="mb-3" controlId="fileID">
                    <Form.Label>Enter fileID:</Form.Label>
                    <Form.Control type='number' name='fileID' id='fileID' required=''/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="userID">
                    <Form.Label>Enter userID:</Form.Label>
                    <Form.Control type='number' name='userID' id='userID' required=''/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="expiryDate">
                    <Form.Label>Enter expiry date:</Form.Label>
                    <Form.Control type='date' name='expiryDate' id='expiryDate' required=''/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    );
}

export default ManageAccess;