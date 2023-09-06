import { useState,useEffect } from 'react'
import './App.css'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Inserter from './components/Inserter';
import Resource from './components/Resource';
import NavBar from './components/NavBar';

function App() {
  const [main_data,setMainData] = useState([])
  const [resource_data,setResourceData] = useState([])
  useEffect(()=>{                     //this function is used to render the screen with new data
    const getTables= async () =>{
      const dataFromServer = await fetchTable()
      setMainData(dataFromServer)
    }
    getTables()
  },[]) 
  
  const fetchTable= async ()=>{
    const res = await fetch('http://localhost:5000/')
    const data = await res.json()
    return data
  }
  const addDetails_main = async (details) =>{    //function to POST the card details to json
    const res = await fetch('http://localhost:5000/methodsmain',{
      method: 'POST',
      headers: {
        'Content-type' : 'application/json'
      },
      body: JSON.stringify(details)
    })
    const resp = await res.json()
    setMainData([...main_data, resp])
    console.log("Hello");
  }
  const addDetails_resource = async (details) =>{    //function to POST the card details to json
    const res = await fetch('http://localhost:5000/methodsresource',{
      method: 'POST',
      headers: {
        'Content-type' : 'application/json'
      },
      body: JSON.stringify(details)
    })
    const resp = await res.json()
    setResourceData([...data, resp])
    Console.log("Hello");
  }

  return (
    <>
    <Router>
          
          <NavBar/>
          <br></br>
          
          <Routes>

          <Route path='/main' element={<Inserter data={main_data} adder={addDetails_main}/>}/>

          <Route path='/resource' element={<Resource data={resource_data} adder={addDetails_resource}/>}/>
          
          </Routes>
          </Router>
    </>
  )
}

export default App
