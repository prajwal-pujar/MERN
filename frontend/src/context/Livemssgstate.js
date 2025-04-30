import Livemssgcontext from "./LivemssgContext";
import { useState } from "react";

const LivemssgState = (props) =>{
    const [messages, setMessages] = useState([]);
    const [users , setUsers] = useState([])
    const [auth , setAuth] = useState([])
    const [rec , setRec] = useState()
    const[req , setReq] = useState([]) 
    const [sento , setSento] = useState([])
    const [loading, setLoading] = useState(false);
     const [friends , setFriends] = useState([])



    const setSent =(index)=>{
     
      localStorage.setItem("token1" , sento[index])
      const a = localStorage.getItem("token1")

    }

    const setToken = (index)=>{
 
      localStorage.setItem("token1" , auth[index])
      const a = localStorage.getItem("token1")
     
    }

    const getusers = async() =>{
      let auth = localStorage.getItem("token")
      setLoading(true); 
      try {
          const response = await fetch('https://mern-zeta-nine.vercel.app/mssg/getusers', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'auth-token' : auth
            }, 
              mode:"cors"
          });
        
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
        
          const data = await response.json();
          setUsers(data.users)
          setAuth(data.auth)
        } catch (error) {
          console.error('Error:', error);
        }finally {
          setLoading(false); // Stop loading
        }
  }






    const fetchdata = async() =>{
      const a = localStorage.getItem("token1")
      let auth = localStorage.getItem("token")
        try {
            const response = await fetch('https://mern-zeta-nine.vercel.app/mssg/fetch', {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'send-token' : auth,
                'rec-token': a
               
              },
                mode:"cors"
            });
          
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
          
            const data = await response.json();
            setMessages(data)
            
          } catch (error) {
            console.error('Error:', error);
          }
    }

    const senddata = async(value) =>{
      const a = localStorage.getItem("token1")
      let auth = localStorage.getItem("token")
        try {
            const response = await fetch('https://mern-zeta-nine.vercel.app/mssg/send', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'send-token' : auth,
                'rec-token': a
              },
                mode:"cors",
              body: JSON.stringify({
                text : value
              })
            });
            
          
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
          
            const data = await response.json();
            
           
          } catch (error) {
            console.error('Error:', error);
          }
    }



    //FRIENDS


    const sendreq = async() =>{
      const a = localStorage.getItem("token1")
      let auth = localStorage.getItem("token")
        try {
            const response = await fetch('https://mern-zeta-nine.vercel.app/mssg/req', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'send-token' : auth,
                'rec-token': a
               
              },
                   mode:"cors"
            });
          
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
          
            const data = await response.json();
        
          } catch (error) {
            console.error('Error:', error);
          }
    }

    const getreq = async() =>{
      setLoading(true); 
      let auth = localStorage.getItem("token")
        try {
            const response = await fetch('https://mern-zeta-nine.vercel.app/mssg/getreq', {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'auth-token' : auth 
              },
                   mode:"cors"
            });
          
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
          
            const data = await response.json();
            setReq(data.requests)
            setSento(data.auth)

          } catch (error) {
            console.error('Error:', error);
          }finally {
            setLoading(false); // Stop loading
          }
    }

    const accept = async() =>{
      const a = localStorage.getItem("token1")
      let auth = localStorage.getItem("token")
      
        try {
            const response = await fetch('https://mern-zeta-nine.vercel.app/mssg/addfre', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'send-token' : auth,
                'rec-token': a
              },
                mode:"cors",
              body: JSON.stringify({
                mssg : "yes"
              })
            });
          
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
          
            const data = await response.json();
       
          } catch (error) {
            console.error('Error:', error);
          }
    }

    const getfriends = async() =>{
      let auth = localStorage.getItem("token")
      setLoading(true); 
        try {
            const response = await fetch('https://mern-zeta-nine.vercel.app/mssg/getfriends', {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'auth-token' : auth 
              },
                 mode:"cors",
            });
          
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
          
            const data = await response.json();
    
            setFriends(data.friends)
           
            setAuth(data.auth)
         
          } catch (error) {
            console.error('Error:', error);
          }finally {
            setLoading(false); // Stop loading
          }
    }



    
    return(
        <Livemssgcontext.Provider value = {{messages ,friends, users, auth , fetchdata , senddata , getusers , setToken , sendreq , getreq ,req , setSent , accept,getfriends,loading}}>
            {props.children}
        </Livemssgcontext.Provider>
    );
}

export default LivemssgState
