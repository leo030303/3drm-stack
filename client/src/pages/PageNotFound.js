import React, { useEffect, useState } from 'react';
import Container from "react-bootstrap/esm/Container";
import { useOutletContext } from 'react-router-dom';

function PageNotFound() {
    const [, setTitle] = useOutletContext();
    useEffect(() => {
        setTitle("404");
    }, [])
    return (
        <Container>
            Page Not Found
        </Container>
    );
}

export default PageNotFound;