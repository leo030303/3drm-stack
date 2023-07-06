import { Outlet, Link } from "react-router-dom";
import React, {useState}  from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const Layout = () => {
    const [title, setTitle] = useState("Title");
    return (
        <div>
            <header class="jumbotron">
                <div class="container text-center">
                    <h1>{title}</h1>      
                    <p>Subtitle</p>
                </div>
            </header>
            <Navbar bg="primary" data-bs-theme="light">
                <Container fluid>
                <Nav >
                    <Nav.Link as={Link} to="/"><img src='/images/index.ico' alt='Home' width='30'/>Market</Nav.Link>
                    <Nav.Link as={Link} to="/help"><img src='/images/help.ico' alt='Help' width='30'/>FAQ</Nav.Link>
                    <Nav.Link as={Link} to="/plugin"><img src='/images/plugin.ico' alt='Plugin' width='30'/>Plugin</Nav.Link>
                    <Nav.Link as={Link} to="/uploadFile"><img src='/images/uploadFile.ico' alt='Upload File' width='30'/>Upload File</Nav.Link>
                    <Nav.Link as={Link} to="/yourFiles"><img src='/images/file.ico' alt='Your Files' width='30'/>Your Files</Nav.Link>
                    <Nav.Link as={Link} to="/manageAccess"><img src='/images/access.ico' alt='Manage Access' width='30'/>Manage Access</Nav.Link>
                    <Nav.Link as={Link} to="/contact"><img src='/images/contact.ico' alt='Contact' width='30'/>Contact</Nav.Link>
                </Nav>
                <Nav className="justify-content-end" >
                    <Nav.Link as={Link} to="/login"><img src='/images/login.ico' alt='Login' width='30'/>Login</Nav.Link>
                    <Nav.Link as={Link} to="/logout"><img src='/images/logout.ico' alt='Logout' width='30'/>Logout</Nav.Link>
                    <Nav.Link as={Link} to="/profile"><img src='/images/profile.ico' alt='Profile' width='30'/>Profile</Nav.Link>
                </Nav>
                </Container>
            </Navbar>
            <Outlet context={[title, setTitle]}/>
            <footer class="container-fluid text-center">
                3DRM 2023 Leo Ring Contact: leoring03@gmail.com 
            </footer>
        </div>
    )
};

export default Layout;


        