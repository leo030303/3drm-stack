import React, { useEffect, useState } from 'react';
import { useOutletContext, useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import postFetch from '../hooks/postFetch';

  

function Buy({user}) {
    const [, setTitle] = useOutletContext();
    useEffect(() => {
        setTitle("Buy");
    }, [])
    const location = useLocation()
    const { FileID } = location.state
    function testPay(){ 
        postFetch("/api/grantAccess", {"email": user.email, "FileID":  FileID}, user.token)
    }
    return (
        <Container>
            <Button onClick={testPay}>Test Pay</Button>
        </Container>
    );
}

export default Buy;