import React from "react";


  

function DownloadPlugin() {
    return (
        <div class="chunks">
           <form action='' method='post'>
                <div>
                    <label htmlFor='toDownloadPlugin'>Click to Download Plugin:</label>
                    <input type='submit' name='toDownloadPlugin' id='toDownloadPlugin' value='Download'/>
                </div>
            </form> 
        </div>
        
    );
}
export default DownloadPlugin;