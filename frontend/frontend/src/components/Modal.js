import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  Form
} from 'semantic-ui-react'


const CustomModal = (props) => {
    const [activeItem, setActiveItem] = useState(props.activeItem)
    // const [open, setOpen] = useState(false)

    const handleChange = (e) => {
      let { name, value } = e.target;
      
      setActiveItem({...activeItem, [name]:value})
    };  

  
      return (
        <Modal centered={true} size={'small'} dimmer={'blurring'} open={true}
        >
          <Modal.Header>Password Manager</Modal.Header>
          <Modal.Content>
            <Form>
              <Form.Field>
                <label for="todo-title">Name</label>
                <input
                  type="text"
                  id="todo-title"
                  name="name"
                  value={activeItem.title}
                  onChange={handleChange}
                  placeholder="Enter the app that your password is set"
                />
              </Form.Field>
              <Form.Field>
                <label for="todo-description">Password</label>
                <input
                  type="text"
                  id="todo-description"
                  name="passwordTxt"
                  value={activeItem.description}
                  onChange={handleChange}
                  placeholder="Enter password for the app"
                />
              </Form.Field>
              <Button
              floated={'right'}
              color="twitter"
              onClick={() => props.onSave(activeItem)}
            >
              Save
            </Button>
            <Button
              floated={'right'}
              color="red"
              onClick={() => props.toggle()}
            >
              Cancel
            </Button>
            <Form.Field></Form.Field>
            </Form>
            
          </Modal.Content>
          
        </Modal>
      );
    
}

  
export default CustomModal