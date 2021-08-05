import React from "react";
import { Container, Grid, Segment,Form,Input, Button,Table,Header,Icon } from "semantic-ui-react";
import firebase from "./firebase";
import { useState, useEffect } from "react";

const FirebaseCrud = () => {

    const [fName, setFname] = useState("");
    const [lName, setLname] = useState("");
    const [userData, setUserData] = useState([]); //store userInfo
    const [uFirstName, setuFirstName] = useState("");
    const [uLastName, setuLastName] = useState("");
    const [userId, setUserId] = useState("");

    useEffect(() => {
        const firestore = firebase.database().ref("/UserInfo");
        firestore.on("value", (response)=> {
            const data = response.val();
            let userInfo = []; // store data get from firebase.
            for (let id in data) {
                userInfo.push({  // push data to the array
                    id: id,
                    firstName: data[id].firstName,
                    lastName: data[id].lastName,
                });
            }
            setUserData(userInfo);
        });
    },[]);

    const handleAddUser = () =>{
        const firestore = firebase.database().ref("/UserInfo"); //geting userInfo ref
        let data = {
            firstName: fName,
            lastName: lName
        }
        firestore.push(data); //push data to firebase
        setFname("");
        setLname("");
    }

    const handleUpdateUser = ()=>{
        const firestore = firebase.database().ref("/UserInfo").child(userId); //getting particular object by id
        firestore.update({
            firstName: uFirstName,
            lastName: uLastName
        })
        setuFirstName("");
        setuLastName("");
    }

     const handleUpdate = (data) =>{
         setuFirstName(data.firstName);
         setuLastName(data.lastName);
         setUserId(data.id); //id required to identify data
     }

     const handleDelete = (id) =>{
        const firestore = firebase.database().ref("/UserInfo").child(id);
        firestore.remove();
     }

    return ( 
        <div className="uiHidden">
            <Container>
                <Grid>
                    <Grid.Row columns="2">
                        <Grid.Column>
                            <Segment padded="very">
                                <Form>
                                    <Form.Field>
                                        <label>First Name</label>
                                        <Input placeholder="First Name" focus value={fName} onChange={(e)=>{setFname(e.target.value)}}/> 
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Last Name</label>
                                        <Input placeholder="Last Name" focus value={lName} onChange={(e)=>{setLname(e.target.value)}}/> 
                                    </Form.Field>
                                    <Form.Field>
                                       <Button onClick={handleAddUser} positive><Icon name="add"></Icon> Add User</Button>
                                    </Form.Field>
                                </Form>
                            </Segment>
                        </Grid.Column>
                        <Grid.Column>
                        <Segment padded="very">
                                <Form>
                                    <Form.Field>
                                        <label>First Name</label>
                                        <Input placeholder="First Name" focus value={uFirstName} onChange={(e)=>{setuFirstName(e.target.value)}}/> 
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Last Name</label>
                                        <Input placeholder="Last Name" focus value={uLastName} onChange={(e)=>{setuLastName(e.target.value)}}/> 
                                    </Form.Field>
                                    <Form.Field>
                                       <Button onClick={handleUpdateUser} primary><Icon name="edit"></Icon> Update User</Button>
                                    </Form.Field>
                                </Form>
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns="1">
                        <Grid.Column>
                            {
                                userData.length === 0 ? (<Segment padded="very">
                                    <Header textAlign="center">
                                        Oops ! There is no Student Records 
                                    </Header>
                                </Segment>) : (<Segment padded="very">
                                    <Table celled fixed singleLine>
                                        <Table.Header>
                                            <Table.Row>
                                                <Table.HeaderCell>First Name</Table.HeaderCell>
                                                <Table.HeaderCell>Last Name</Table.HeaderCell>
                                                <Table.HeaderCell></Table.HeaderCell>
                                            </Table.Row>
                                        </Table.Header>
                                        {
                                            userData.map((data)=>{
                                                return(
                                                    <Table.Body>
                                                        <Table.Cell>{data.firstName}</Table.Cell>
                                                        <Table.Cell>{data.lastName}</Table.Cell>
                                                        <Table.Cell>
                                                            <Button primary onClick={()=>{handleUpdate(data)}}><Icon name="edit" ></Icon> Update</Button>
                                                            <Button color="red" onClick={()=>{handleDelete(data.id)}}><Icon name="delete" ></Icon> Delete</Button>
                                                        </Table.Cell>
                                                    </Table.Body>
                                                )
                                            })
                                        }
                                    </Table>
                                </Segment>)
                            }
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        </div>
     );
}
 
export default FirebaseCrud;