import React from "react";
import Container from "react-bootstrap/esm/Container";
import { useOutletContext } from 'react-router-dom';

  

function YourFiles() {
    const [title, setTitle] = useOutletContext();
    setTitle("Your Files");
    return (
        <Container>
            Your Files Placeholder
        </Container>
    );
}

export default YourFiles;