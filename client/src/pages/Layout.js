import { Outlet, Link } from "react-router-dom";

const Layout = () => {
    return (
        <div>
            <header>
                Title
            </header>
            <nav>
                <Link to="/"><img src='/images/index.ico' alt='Home' width='30'/></Link>
                { /* https://www.iconspedia.com/icon/home-13-54.html */ }
                <Link to="/help"><img src='/images/help.ico' alt='Help' width='30'/></Link>
                { /* https://www.iconspedia.com/icon/info-icon-45523.html */ }
                <Link to="/plugin"><img src='/images/plugin.ico' alt='Plugin' width='30'/></Link>
                { /* https://www.iconspedia.com/icon/download-icon-45003.html */ }
                <Link to="/uploadFile"><img src='/images/uploadFile.ico' alt='Upload File' width='30'/></Link>
                { /* https://www.iconspedia.com/icon/add-file-icon-45026.html */ }
                <Link to="/yourFiles"><img src='/images/file.ico' alt='Your Files' width='30'/></Link>
                { /* https://www.iconspedia.com/icon/file-icon-45361.html */ }
                <Link to="/manageAccess"><img src='/images/access.ico' alt='Manage Access' width='30'/></Link>
                { /* https://www.iconspedia.com/icon/key-black-icon-28789.html */ }
                <Link to="/contact"><img src='/images/contact.ico' alt='Contact' width='30'/></Link>
                { /* https://www.iconspedia.com/icon/contacts2-icon-45270.html */ }
                <Link to="/login"><img src='/images/login.ico' alt='Login' width='30'/></Link>
                { /* https://www.iconspedia.com/icon/login-icon-45597.html */ }
                <Link to="/logout"><img src='/images/logout.ico' alt='Logout' width='30'/></Link>
                { /* https://www.iconspedia.com/icon/logout-icon-45598.html */ }
                <Link to="/profile"><img src='/images/profile.ico' alt='Profile' width='30'/></Link>
                { /* https://www.iconspedia.com/icon/user-11641.html */ }
            </nav>
            <Outlet />
            <footer>
                3DRM 2023 Leo Ring Contact: leoring03@gmail.com 
            </footer>
        </div>
    )
};

export default Layout;


        