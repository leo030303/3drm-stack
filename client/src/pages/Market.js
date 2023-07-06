import React from "react";
import Container from "react-bootstrap/esm/Container";
import { useOutletContext } from 'react-router-dom';

function Market() {
    const [title, setTitle] = useOutletContext();
    setTitle("Market");
    return (
        <Container>
            Market Placeholder
        </Container>
    );
}

export default Market;