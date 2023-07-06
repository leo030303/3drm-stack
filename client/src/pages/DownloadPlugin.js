import React from "react";
import { useOutletContext } from 'react-router-dom';
import Container from 'react-bootstrap/Container';


  

function DownloadPlugin() {
    const [title, setTitle] = useOutletContext();
    setTitle("Download Plugin");
    return (
        <Container>
           <form action='' method='post'>
                <div>
                    <label htmlFor='toDownloadPlugin'>Click to Download Plugin:</label>
                    <input type='submit' name='toDownloadPlugin' id='toDownloadPlugin' value='Download'/>
                </div>
            </form> 
        </Container>
        
    );
}
export default DownloadPlugin;