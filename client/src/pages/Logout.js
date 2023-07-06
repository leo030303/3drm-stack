import React from "react";
import { useOutletContext } from 'react-router-dom';
import Container from 'react-bootstrap/Container';


function Logout() {
    const [title, setTitle] = useOutletContext();
    setTitle("Logout");
    return (
        <Container>
            Logout Placeholder
        </Container>
    );
}

export default Logout;