import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';

  

function DownloadPlugin() {
    const [, setTitle] = useOutletContext();
    useEffect(() => {
        setTitle("Download Plugin");
    }, [])
    return (
        <Container>
            <Form action='/api/plugin' method='post' >
                <Form.Group className="mb-3" controlId="downloadPluginForm">
                    <Form.Label>Click to download the 3DRM plugin for Ultimaker Cura:</Form.Label>
                    <Form.Control type="submit" name='downloadPlugin' id='downloadPlugin' value="Download" />
                </Form.Group>
            </Form>
        </Container>
        
    );
}
export default DownloadPlugin;