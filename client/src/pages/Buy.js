import React from "react";
import { useOutletContext, useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

  

function Buy({user}) {
    const [title, setTitle] = useOutletContext();
    setTitle("Buy");
    const location = useLocation()
    const { FileID } = location.state
    function testPay(){ 
        var url = "/api/grantAccess";
        var bearer = 'Bearer ' + user.token;
        const myJSON = {"email": user.email, "FileID":  FileID}
        fetch(url, {
        method: 'POST',
        credentials: "include",
        headers: {
            'Authorization': bearer,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(myJSON),
        redirect: 'follow',
        })
    }
    return (
        <Container>
            <Button onClick={testPay}>Test Pay</Button>
        </Container>
    );
}

export default Buy;