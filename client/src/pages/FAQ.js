import React from "react";
import { useOutletContext } from 'react-router-dom';
import Container from 'react-bootstrap/Container';


  

function FAQ() {
    const [title, setTitle] = useOutletContext();
    setTitle("Help");
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