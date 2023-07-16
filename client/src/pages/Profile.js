import { Link, useOutletContext, useNavigate } from 'react-router-dom';
import React from 'react';
import FileCardGrid from '../components/FileCardGrid';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import LogoutButton from '../components/LogoutButton';
import Button from 'react-bootstrap/Button';



function Profile({user}) {
      const [title, setTitle] = useOutletContext();
      setTitle("Profile");
      if (!user){
          window.location.assign("/login")
      }
      let navigate = useNavigate();
      function routeChange(){ 
          navigate("/uploadFile");
      }
      return (
        <div style={{ textAlign: "center", margin: "3rem" }}>
          <h1>Hello {user?.firstName} {user?.lastName}</h1>
          <Tabs
            defaultActiveKey="profile"
            id="myTabs"
            className="mb-3"
          >
            <Tab eventKey="profile" title="Profile">
              <Button style={{ margin: "1rem" }} onClick={routeChange}>Create Ad</Button>
              <LogoutButton />
            </Tab>
            <Tab eventKey="yourAds" title="Your Ads">
              <FileCardGrid boolPrivilege={false} searchField={"ownerEmail"} fieldVal={user.email} user={user}/>
            </Tab>
            <Tab eventKey="boughtAds" title="Bought Ads">
              <FileCardGrid boolPrivilege={true} searchField={"ownerEmail"} fieldVal={user.email} user={user}/>
            </Tab>
          </Tabs>
          
        </div>
      );
}

export default Profile;
