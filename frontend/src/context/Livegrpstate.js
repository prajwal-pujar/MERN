import { useState } from "react";
import LivegrpContext from "./LivegrpConstext";


const Livegrpstate = (props) =>{
   const [users , setUsers] = useState([])
   const [auth , setAuth] = useState([])
   const[messages , setMessages] = useState([])


    const set = (index) =>{
      localStorage.setItem("grptoken" , auth[index])
      console.log(index)
    }
    const create = async(namea , options) =>{
        let a = localStorage.getItem('token')
        try {
            const response = await fetch('http://localhost:5000/upload/grp', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'auth-token' : a,
              },
              body: JSON.stringify({
                name : namea,
                users : options
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

    const get = async() =>{
      let a = localStorage.getItem('token')
      try {
          const response = await fetch('http://localhost:5000/upload/grpdetail', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'auth-token' : a,
            },
          });
          
        
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
        
          const data = await response.json();
          setAuth(data.token1)
          const names = data.data.map(item => item.name);
          setUsers(names)
        } catch (error) {
          console.error('Error:', error);
        }
  }



  const fetchdata = async() =>{
    let grptokan = localStorage.getItem('grptoken')
    let a = localStorage.getItem('token')
    try {
      const response = await fetch('http://localhost:5000/upload/get', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'send-token' : grptokan,
          'rec-token' : a
        },
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
      const response = await fetch('http://localhost:5000/upload/mssg', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'send-token' : grptokan,
          'rec-token' : a
        },
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
      console.error('Error:', error);
    }
  }


    return(
        <LivegrpContext.Provider value = {{create , get , users , set , fetchdata , messages , senddata}}>
            {props.children}
        </LivegrpContext.Provider>
    );
}

export default Livegrpstate