import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import Container from 'react-bootstrap/Container';


  

function Contact() {
    const [title, setTitle] = useOutletContext();
    useEffect(() => {
        setTitle("Contact");
    }, [])
    return (
        <Container>
            <p>Author: Leo Ring<br/>
            Email: leoring03@gmail.com</p>
        </Container>
    );
}

export default Contact;