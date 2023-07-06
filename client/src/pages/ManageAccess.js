import React from "react";


  

function ManageAccess() {
    return (
        <div class="chunks" id="access_fields">
            <form action='' method='post'>
                <div>
                    <label htmlFor='fileID'>Enter fileID:</label>:
                    <input type='number' name='fileID' id='fileID' required=''/>
                </div>
                <div>
                    <label htmlFor='userID'>Enter userID:</label>:
                    <input type='number' name='userID' id='userID' required=''/>
                </div>
                <div>
                    <label htmlFor='expiryDate'>Enter expiry date:</label>:
                    <input type='date' name='expiryDate' id='expiryDate' required=''/>
                </div>
                <div>
                    <input type='submit' value='Submit' />
                </div>
            </form>
        </div>
    );
}

export default ManageAccess;