import React from "react";
import { useOutletContext } from 'react-router-dom';
import Container from 'react-bootstrap/Container';

  

function Login() {
    const [title, setTitle] = useOutletContext();
    setTitle("Login");
    return (
        <Container>
            Login Placeholder
        </Container>
    );
}

export default Login;