import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import Container from 'react-bootstrap/Container';


  

function FAQ() {
    const [title, setTitle] = useOutletContext();
    useEffect(() => {
        setTitle("Help");
    }, [])
    return (
        <Container>
            FAQ
            <ul>
                <li>
                    Item 1
                </li>
                <li>
                    Item 2
                </li>
                <li>
                    Item 3
                </li>
            </ul>
            </Container>
            
    );
}

export default FAQ;