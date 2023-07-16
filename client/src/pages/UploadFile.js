import React, { useEffect, useState } from 'react';
import Container from "react-bootstrap/esm/Container";
import { useOutletContext } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';




function UploadFile({user}) {
    const [title, setTitle] = useOutletContext();
    useEffect(() => {
        setTitle("Upload File");
    }, [])
    const pictureInput = React.createRef();
    const stlInput = React.createRef();
    const handleSubmit = (event) => {
        event.preventDefault();

        var url = "/api/uploadFile";
        var bearer = 'Bearer ' + user.token;
        var formData = new FormData()
        formData.append("listingName", event.target.elements.listingName.value)
        formData.append("listingDescription", event.target.elements.listingDescription.value)
        formData.append("listingPrice", event.target.elements.listingPrice.value)
        formData.append("email", user.email)
        formData.append('listingSTL',  stlInput.current.files[0])
        formData.append('listingImage',  pictureInput.current.files[0])
        fetch(url, {
        method: 'POST',
        credentials: "include",
        headers: {
            'Authorization': bearer
        },
        body: formData,
        redirect: 'follow',
        })
        event.target.reset();
    }
    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="listingName">
                    <Form.Label>Enter the name of the listing:</Form.Label>
                    <Form.Control type='text' name='listingName' id='listingName' required=''/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="listingDescription">
                    <Form.Label>Describe the item:</Form.Label>
                    <textarea class="form-control" id="listingDescription" name='listingDescription' rows="6" ></textarea>
                </Form.Group>
                <Form.Group className="mb-3" controlId="listingPrice">
                    <Form.Label>Choose the price:</Form.Label>
                    <Form.Control type='number' step="0.01" name='listingPrice' id='listingPrice' required='' />
                </Form.Group>
                <Form.Group className="mb-3" controlId="listingImage">
                    <Form.Label>Select photos of the item:</Form.Label>
                    <Form.Control type='file' ref={pictureInput} name='listingImage' id='listingImage' accept="image/*" required='' />
                </Form.Group>
                <Form.Group className="mb-3" controlId="listingSTL">
                    <Form.Label>Select file to list for sale:</Form.Label>
                    <Form.Control type="file" ref={stlInput} name='listingSTL' id='listingSTL' accept='.stl, .STL' required=''/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    );
}

export default UploadFile;
