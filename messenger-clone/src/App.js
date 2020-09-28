import React, { useState, useEffect } from 'react';
import {Button, FormControl, InputLabel, Input} from '@material-ui/core';
import firebase from 'firebase';
import Message from './Message';
import FlipMove from 'react-flip-move';

import './App.css';
import db from './firebase';

function App() {
  const[input, setInput] =useState('');
  const [messages, setMessages] = useState([]);
  const [username,setUsername] = useState('');
  //useState = variable in react and useEffect = run code on a condiction
  useEffect( () => {
  //corre cuando el componente carga

  db.collection('messages')
  .orderBy('timestamp', 'desc')
  .onSnapshot(snapshot => {
    setMessages(snapshot.docs.map(doc => ({id: doc.id, message:doc.data()})))
  });
  }, [] )
  useEffect(() => {
    //const name = prompt('Please enter your name');
    setUsername(prompt('Please enter your name'))
  }, [])
   //create evnt sendMessage
  const sendMessage = (event) =>{
     //all the logic to send a message goes
     event.preventDefault();
     db.collection('messages').add({
        message: input,
        username: username,
         timestamp: firebase.firestore.FieldValue.serverTimestamp()
     })
     setInput('');
  }
  return (
    <div className="App">
      <img src="https://facebookbrand.com/wp-content/uploads/2018/Header-e1538151782912.png?w=1000&h=1000"/>
      <h1> hello sortodev</h1>
      <h2>welcome {username}</h2>
      <form className="app_form">
        <FormControl>
            <InputLabel > Enter a message...</InputLabel>
            <Input  value={input} onChange={event => setInput(event.target.value)}/>
            <Button disabled={!input} variant="contained" color="primary" type ='submit' onClick={sendMessage}>enviar mensaje</Button>
        </FormControl>
      </form>
      {/*messages themselves*-*/}
      <flipMove>
      {
        messages.map( ({id, message}) =>(
          <Message key={id} username= {username} message ={message} />
        ))
      }
      </flipMove>
    
    </div>
  );
}

export default App;
