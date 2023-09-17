import React, { useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import postFetch from "../hooks/postFetch";



function ChangeUsername({user}) {
    const handleSubmit = (event) => {
        event.preventDefault();
        postFetch("/api/changeUsername", { newName: event.target.elements.newName.value }, user.token);
        event.target.reset();
    }
    return (
        <Container className="h-100 d-flex">
            <Form onSubmit={handleSubmit} className="m-auto mb-3">
                <Stack direction="horizontal" gap={3}>
                    <Form.Group controlId="newName">
                        <Form.Control type='text' placeholder="New Username" name='newName' id='newName' required=''/>
                    </Form.Group>
                    <Button variant="primary" type="submit" >
                        Change Username
                    </Button>
                </Stack>
            </Form>
        </Container>
    );
}

export default ChangeUsername;