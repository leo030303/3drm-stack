import React from "react";
import Container from "react-bootstrap/esm/Container";
import { useOutletContext } from 'react-router-dom';

function PageNotFound() {
    const [title, setTitle] = useOutletContext();
    setTitle("404");
    return (
        <Container>
            Page Not Found
        </Container>
    );
}

export default PageNotFound;