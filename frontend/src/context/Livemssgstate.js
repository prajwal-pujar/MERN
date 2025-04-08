import Livemssgcontext from "./LivemssgContext";
import { useState } from "react";

const LivemssgState = (props) =>{
    const [messages, setMessages] = useState([]);
    const [users , setUsers] = useState([])
    const [auth , setAuth] = useState([])
    const [rec , setRec] = useState()



    const setToken = (index)=>{
      localStorage.setItem("token1" , auth[index])
      const a = localStorage.getItem("token1")
      console.log(a)
    }

    const getusers = async() =>{
      let auth = localStorage.getItem("token")
    
      try {
          const response = await fetch('http://localhost:5000/mssg/getusers', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'auth-token' : auth
            },
          });
        
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
        
          const data = await response.json();
          setUsers(data.users)
          setAuth(data.auth)
        } catch (error) {
          console.error('Error:', error);
        }
  }






    const fetchdata = async() =>{
      const a = localStorage.getItem("token1")
      let auth = localStorage.getItem("token")
        try {
            const response = await fetch('http://localhost:5000/mssg/fetch', {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'send-token' : auth,
                'rec-token': a
               
              },
            });
          
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
          
            const data = await response.json();
            setMessages(data)
            console.log(data);
          } catch (error) {
            console.error('Error:', error);
          }
    }

    const senddata = async(value) =>{
      const a = localStorage.getItem("token1")
      let auth = localStorage.getItem("token")
        try {
            const response = await fetch('http://localhost:5000/mssg/send', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'send-token' : auth,
                'rec-token': a
              },
              body: JSON.stringify({
                text : value
              })
            });
            
          
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
          
            const data = await response.json();
            
            console.log(data);
          } catch (error) {
            console.error('Error:', error);
          }
    }

    return(
        <Livemssgcontext.Provider value = {{messages , users, auth , fetchdata , senddata , getusers , setToken}}>
            {props.children}
        </Livemssgcontext.Provider>
    );
}

export default LivemssgState