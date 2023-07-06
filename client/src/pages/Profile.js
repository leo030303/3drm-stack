import React from "react";
import Container from "react-bootstrap/esm/Container";
import { useOutletContext } from 'react-router-dom';

function Profile() {
    const [title, setTitle] = useOutletContext();
    setTitle("Profile");
    return (
        <Container>
            Profile Placeholder
        </Container>
    );
}

export default Profile;