import React from "react";
import { useOutletContext } from 'react-router-dom';
import Container from 'react-bootstrap/Container';


  

function Contact() {
    const [title, setTitle] = useOutletContext();
    setTitle("Contact");
    return (
        <Container>
            <p>Author: Leo Ring
            leoring03@gmail.com</p>
        </Container>
    );
}

export default Contact;