import React, { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import FileDisplayCard from './FileDisplayCard';
import BoughtFileCard from './BoughtFileCard';


function FileCardGrid({boolPrivilege, searchField, fieldVal, user}) {
      const [fileArray, setFileArray] = useState([]);
      const [privilegeArray, setPrivilegeArray] = useState([]);
      const columnsPerRow = 4;
      useEffect(() => {
        if(boolPrivilege){
          var privUrl = "/api/yourPrivileges";
          var bearer = 'Bearer ' + user.token;
          fetch(privUrl, {
          method: 'GET',
          credentials: "include",
          headers: {
              'Authorization': bearer
          },
          redirect: 'follow',
          }).then(async responseJson => {
              responseJson.json().then((finished) => {
                  setPrivilegeArray(finished.entryData);
                })
          });
        } else{
          var fileUrl = `/api/getFiles?searchField=${searchField}&fieldVal=${fieldVal}`;
          fetch(fileUrl, {
              method: 'GET',
          }).then(async responseJson => {
              responseJson.json().then((finished) => {
                  setFileArray(finished.entryData);
                })
          });
        }
          
      }, []);
      const getColumnsForRow =()=>{
        var items= [];
        if (boolPrivilege){
          items = privilegeArray.map((privilege) => {
              return ( 
                <Col>
                  <BoughtFileCard user={user} privilege={privilege}/>
                </Col>
              );
          });
        } else{
          items = fileArray.map((file) => {
              return ( 
                <Col>
                  <FileDisplayCard file={file} />
                </Col>
              );
          });
        }
          
        return items;
      };
      return (
        <Container className="mx-auto my-2">
              <Row xs={1} md={columnsPerRow}>
                {getColumnsForRow()}
              </Row>
          </Container>
    );
}
  
export default FileCardGrid;