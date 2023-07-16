import React from "react";


function LogoutButton() {
    const logout = () => {
        localStorage.removeItem("user");
        window.location.assign("/");
    };
    return (
        <div>
            <button
                onClick={logout}
                style={{
                color: "red",
                border: "1px solid gray",
                backgroundColor: "white",
                padding: "0.5rem 1rem",
                cursor: "pointer",
                }}>
                Logout
            </button>
        </div>
    );
}

export default LogoutButton;