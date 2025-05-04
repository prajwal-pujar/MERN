import { useState } from "react";
import LivegrpContext from "./LivegrpConstext";


const Livegrpstate = (props) =>{
   const [users , setUsers] = useState([])
   const [auth , setAuth] = useState([])
   const[messages , setMessages] = useState([])
    const [loading, setLoading] = useState(false);
   const[gro , setGro] = useState(false)

    const set = (index) =>{
      localStorage.setItem("grptoken" , auth[index])
     
    }
    const create = async(namea , options) =>{
        let a = localStorage.getItem('token')
        try {
            const response = await fetch('https://mern-zeta-nine.vercel.app/upload/grp', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'auth-token' : a,
              },
               mode:"cors",
              body: JSON.stringify({
                name : namea,
                users : options
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

    const get = async() =>{
       if(gro) return;
       setLoading(true)
      let a = localStorage.getItem('token')
      try {
          const response = await fetch('https://mern-zeta-nine.vercel.app/upload/grpdetail', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'auth-token' : a,
            },
             mode:"cors"
          });
          
        
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
        
          const data = await response.json();
          setGro(true)
          setAuth(data.token1)
          const names = data.data.map(item => item.name);
          setUsers(names)
        } catch (error) {
          console.error('Error:', error);
        }finally {
          setLoading(false); // Stop loading
        }
  }



  const fetchdata = async() =>{
    let grptokan = localStorage.getItem('grptoken')
    let a = localStorage.getItem('token')
    try {
      const response = await fetch('https://mern-zeta-nine.vercel.app/upload/get', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'send-token' : grptokan,
          'rec-token' : a
        },
         mode:"cors",
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
    let grptokan = localStorage.getItem('grptoken')
    let a = localStorage.getItem('token')
    try {
      const response = await fetch('https://mern-zeta-nine.vercel.app/upload/mssg', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'send-token' : grptokan,
          'rec-token' : a
        },
         mode:"cors",
        body: JSON.stringify({
          text : value,
          users : []
        })
      });
      
    
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    
      const data = await response.json();
     
    } catch (error) {
      console.error('Error:', error)
    }
  }


    return(
        <LivegrpContext.Provider value = {{create , get , users , set , fetchdata , messages , senddata , loading}}>
            {props.children}
        </LivegrpContext.Provider>
    );
}

export default Livegrpstate
