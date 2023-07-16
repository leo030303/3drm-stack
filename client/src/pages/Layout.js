import { Outlet, Link } from "react-router-dom";
import React, {useState}  from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const Layout = () => {
    const [title, setTitle] = useState("Title");
    return (
        <div class="d-flex flex-column min-vh-100">
            <header class="jumbotron">
                <div class="container text-center">
                    <h1>{title}</h1>
                </div>
            </header>
            <Navbar expand="lg" bg="primary" data-bs-theme="light" className="bg-body-tertiary">
                <Container fluid>
                <Navbar.Brand as={Link} to="/profile"><img src='/images/profile.ico' alt='Profile' width='30'/></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav>
                        <Nav.Link as={Link} to="/"><img src='/images/index.ico' alt='Home' width='30'/>Market</Nav.Link>
                        <Nav.Link as={Link} to="/help"><img src='/images/help.ico' alt='Help' width='30'/>FAQ</Nav.Link>
                        <Nav.Link as={Link} to="/plugin"><img src='/images/plugin.ico' alt='Plugin' width='30'/>Plugin</Nav.Link>
                        <Nav.Link as={Link} to="/contact"><img src='/images/contact.ico' alt='Contact' width='30'/>Contact</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                </Container>
            </Navbar>
            <Outlet context={[title, setTitle]}/>
            <footer class="container-fluid text-center mt-auto">
                3DRM 2023 Leo Ring Contact: leoring03@gmail.com 
            </footer>
        </div>
    )
};

export default Layout;


        