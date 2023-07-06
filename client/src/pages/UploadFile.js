import React from "react";


  

function UploadFile() {
    return (
        <div class="chunks">
            <form action='' method='post' enctype="multipart/form-data">
                <div>
                    <label for='toEncryptFile'>Select a file to encrypt:</label>
                    <input type='file' name='toEncryptFile' id='toEncryptFile' accept="application/sla" required=''/>                </div>
                <div>
                    <input type='submit' value='Encrypt' />
                </div>
            </form>
        </div>
    );
}

export default UploadFile;