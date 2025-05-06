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
    const [tok , setTok] = useState(0)
    const [friendsFetched, setFriendsFetched] = useState(false);
    const [usersFetched, setUsersFetched] = useState(false);
    const [friendsFetchedRq, setFriendsFetchedRq] = useState(false);
    


    
    const clearMessages = () =>{
        setMessages([])
    }

    const resetState = () => {
  setMessages([]);
  setUsers([]);
  setAuth([]);
  setRec(null);
  setReq([]);
  setSento([]);
  setFriends([]);
  setTok(0);
  setFriendsFetched(false);
  setUsersFetched(false);
  setFriendsFetchedRq(false);
};

    const setSent =(index)=>{
     
      localStorage.setItem("token1" , sento[index])
      const a = localStorage.getItem("token1")

    }

    const removeReq = (index) => {
  setReq(prev => {
    const updated = [...prev];
    updated.splice(index, 1);
    return updated;
  });
};


    const setCred = (index) =>{
    localStorage.setItem("friim" , friends[index].image)
     localStorage.setItem("frinam" , friends[index].name)
    }

    const setToken = (index)=>{
        setTok(index)
   
      localStorage.setItem("token1" , auth[index])
      const a = localStorage.getItem("token1")
     
    }

    const getusers = async() =>{
        if(usersFetched) return;
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
          setUsersFetched(true)
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
      if(friendsFetchedRq) return;
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
            setFriendsFetchedRq(true)
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
      if (friendsFetched) return;
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
            setFriendsFetched(true)
           
            setAuth(data.auth)
         
          } catch (error) {
            console.error('Error:', error);
          }finally {
            setLoading(false); // Stop loading
          }
          
    }



    
    return(
        <Livemssgcontext.Provider value = {{messages , removeReq ,friends, users, auth , fetchdata , senddata , getusers , resetState ,setToken , setCred , clearMessages , sendreq , getreq ,req , setSent , accept,getfriends,loading , tok}}>
            {props.children}
        </Livemssgcontext.Provider>
    );
}

export default LivemssgState
