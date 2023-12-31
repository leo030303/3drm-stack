import React, { useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import { useOutletContext } from 'react-router-dom';
import FileCardGrid from '../components/FileCardGrid';


function Market() {
    const [, setTitle] = useOutletContext();
    useEffect(() => {
        setTitle("Market");
    }, [])
    return (
        <Container>
            <FileCardGrid searchField={"none"} fieldVal={"none"}/>
        </Container>
    );
}

export default Market;