import { useState } from 'react'
import './App.css'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Inserter from './components/Inserter';
import Resource from './components/Resource';
import NavBar from './components/NavBar';

function App() {
  const [count, setCount] = useState(0)
  
  const addDetails = async (details) =>{    //function to POST the card details to json
    // const res = await fetch('http://localhost:5000/adbk',{
    //   method: 'POST',
    //   headers: {
    //     'Content-type' : 'application/json'
    //   },
    //   body: JSON.stringify(details)
    // })
    // const resp = await res.json()
    // setData([...data, resp])
    Console.log("Hello");
  }

  return (
    <>
    <Router>
          
          <NavBar/>
          <br></br>
          
          <Routes>

          <Route path='/main' element={<Inserter adder={addDetails}/>}/>

          <Route path='/resource' element={<Resource adder={addDetails}/>}/>
          
          </Routes>
          </Router>
    </>
  )
}

export default App
