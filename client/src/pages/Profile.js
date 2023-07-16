import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useOutletContext,  Link } from 'react-router-dom';
import React from 'react';
import Container from 'react-bootstrap/Container';
import FileCardGrid from '../components/FileCardGrid';



function Profile({user}) {
      const [title, setTitle] = useOutletContext();
      setTitle("Profile");
      const logout = () => {
          localStorage.removeItem("user");
          window.location.assign("/");
      };
      if (!user){
          window.location.assign("/login")
      }
      
      return (
        <div style={{ textAlign: "center", margin: "3rem" }}>
          <h1>Hello {user?.firstName} {user?.lastName}</h1>
    
          <Navbar expand="lg" bg="primary" data-bs-theme="light" className="bg-body-tertiary">
                <Container fluid>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav>
                      <Nav.Link as={Link} to="/uploadFile"><img src='/images/uploadFile.ico' alt='Upload File' width='30'/>Upload File</Nav.Link>
                      <Nav.Link as={Link} to="/manageAccess"><img src='/images/access.ico' alt='Manage Access' width='30'/>Manage Access</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                </Container>
            </Navbar>
          <FileCardGrid searchField={"ownerEmail"} fieldVal={user.email}/>
          <div>
            <button
              onClick={logout}
              style={{
                color: "red",
                border: "1px solid gray",
                backgroundColor: "white",
                padding: "0.5rem 1rem",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </div>
        </div>
      );
}

export default Profile;
