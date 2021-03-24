import React, { useState, useEffect } from "react";
import Modal from "./components/Modal"
import { Button, Table, Header, Icon, Grid } from 'semantic-ui-react'
import axios from 'axios'

const App = () => {
  const refreshList = () => {
    axios.get('/api/passwords')
    .then((res)=>{
      let todoItems = res.data;

      let newItems = []

      for(let i=0;i<todoItems.length;i++){
        newItems.push({
          id:todoItems[i].id,
          name:todoItems[i].name,
          passwordTxt:todoItems[i].passwordTxt,
          timestamp:todoItems[i].timestamp.substring(8,10)+"/"+todoItems[i].timestamp.substring(5,7)+"/"+todoItems[i].timestamp.substring(0,4)
        })
      }
      // this.setState({todoList:newItems})
      setTodoList(newItems)
    }).catch((err)=>console.log(err))
  }

  useEffect(()=>refreshList(), [])
  // const [viewCompleted, setViewCompleted] = useState(false)
  const [todoList, setTodoList] = useState([])
  const [modal, setModal] = useState(false)
  const [activeItem, setActiveItem] = useState({name:"", passwordTxt:"", timestamp:null})

  const toggle = (e) => {
    // this.setState({ modal: !this.state.modal });
    setModal(!modal)
  };

  const handleSubmit = (item) => {
    toggle();

    if(item.id){
      axios.put(`/api/passwords/${item.id}/`,item)
      .then((res)=>refreshList())
      return
    }
    axios.post(`/api/passwords/`,item)
    .then((res)=>refreshList())
  };

  const handleDelete = (item) => {
    axios.delete(`/api/passwords/${item.id}/`)
    .then((res)=>refreshList())
  };

  const createItem = () => {
    const date = new Date()
    const item = { name: "", passwordTxt: "", timestamp: date.toISOString()};
    // this.setState({ activeItem: item, modal: !this.state.modal });
    setActiveItem(item)
    setModal(!modal)
  };

  const editItem = (item) => {
    item.timestamp = new Date().toISOString()
    // this.setState({ activeItem: item, modal: !this.state.modal });
    setActiveItem(item)
    setModal(!modal)
  };

  const renderItems = () => {

    return todoList.map((item) => (
        <Table.Row>
          <Table.Cell textAlign='center'>{item.name}</Table.Cell>
          <Table.Cell textAlign='center'>{item.passwordTxt}</Table.Cell>
          <Table.Cell textAlign='center'>{item.timestamp}</Table.Cell>
          <Table.Cell textAlign='center'>
            <Button
            color='facebook'
            onClick={()=> editItem(item)}
            >
              Edit
            </Button>
          <Button
            color='red'
            onClick={()=> handleDelete(item)}
          >
            Delete
          </Button></Table.Cell>
        </Table.Row>
      
    ));
  };

    return (
      <main className="container">

        <Header textAlign="center" as='h2' icon>
          <div style={{marginTop:'1rem'}}></div>
          <Icon name='settings'/>
          Password Manager
          <Header.Subheader>
            Manage your passwords with Password Manager
          </Header.Subheader>
        </Header>

      <Grid>
        <Grid.Column textAlign='center'>
        <Button
            positive
            onClick={()=>createItem()}
          >
            Add Password
          </Button>
        </Grid.Column>
      </Grid>

        <Table singleLine>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell textAlign='center'>Title</Table.HeaderCell>
              <Table.HeaderCell textAlign='center'>Password</Table.HeaderCell>
              <Table.HeaderCell textAlign='center'>Last Updated</Table.HeaderCell>
              <Table.HeaderCell textAlign='center'>Action</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>{renderItems()}</Table.Body>
        </Table>
            
        {modal ? (
          <Modal
            toggle={toggle}
            activeItem={activeItem}
            onSave={handleSubmit}
          />
        ) : null}
      </main>
    );

    
  
}

export default App;