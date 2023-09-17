import { Link, useOutletContext, useNavigate, useResolvedPath } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import FileCardGrid from '../components/FileCardGrid';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import LogoutButton from '../components/LogoutButton';
import Button from 'react-bootstrap/Button';
import ChangeUsername from '../components/ChangeUsername';



function Profile({user}) {
      const [username, setUsername] = useState("username");
      const [, setTitle] = useOutletContext();
      
      if (!user){
          window.location.assign("/login")
      }
      useEffect(() => {
        setTitle("Profile");
        var url = "/api/getUsername";
        var bearer = 'Bearer ' + user.token;
        fetch(url, {
        method: 'GET',
        credentials: "include",
        headers: {
            'Authorization': bearer
        },
        }).then(async responseJson => {
            responseJson.json().then((finished) => {
                setUsername(finished.username);
              })
        });
      }, []);
      let navigate = useNavigate();
      function routeChange(){ 
          navigate("/uploadFile");
      }
      return (
        <div style={{ textAlign: "center", margin: "3rem" }}>
          <h1>Hello {username}</h1>
          <Tabs
            defaultActiveKey="profile"
            id="myTabs"
            className="mb-3"
          >
            <Tab eventKey="profile" title="Profile">
              <Button style={{ margin: "1rem" }} onClick={routeChange}>Create Ad</Button>
              <ChangeUsername user={user}/>
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
