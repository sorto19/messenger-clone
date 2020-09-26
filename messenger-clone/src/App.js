import React, { useState, useEffect } from 'react';
import {Button, FormControl, InputLabel, Input} from '@material-ui/core';

import Message from './Message';

import './App.css';
import db from './firebase';

function App() {
  const[input, setInput] =useState('');
  const [messages, setMessages] = useState([]);
  const [username,setUsername] = useState('');
  //useState = variable in react and useEffect = run code on a condiction
  useEffect( () => {
  //corre cuando el componente carga
  db.collection('messages').onSnapshot(snapshot => {
    setMessages(snapshot.docs.map(doc => doc.data()))
  })
  }, [])
  useEffect(() => {
    //const name = prompt('Please enter your name');
    setUsername(prompt('Please enter your name'))
  }, [])
   //create evnt sendMessage
  const sendMessage = (event) =>{
     //all the logic to send a message goes
     event.preventDefault();
     setMessages([...messages, {username:username, text: input}
    ]);
     setInput('');
  }
  return (
    <div className="App">
      <h1> hello sortodev</h1>
      <h2>welcome {username}</h2>
      <form>
        <FormControl>
            <InputLabel > Enter a message...</InputLabel>
            <Input  value={input} onChange={event => setInput(event.target.value)}/>
            <Button disabled={!input} variant="contained" color="primary" type ='submit' onClick={sendMessage}>enviar mensaje</Button>
        </FormControl>
      </form>
      {/*messages themselves*-*/}
      {
        messages.map( message =>(
          <Message username= {username} message ={message} />
        ))
      }
    </div>
  );
}

export default App;
