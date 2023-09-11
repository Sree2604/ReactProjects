import { useState,useEffect } from 'react'
import './App.css'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Inserter from './components/Inserter';
import Resource from './components/Resource';
import NavBar from './components/NavBar';
import ViewData from './components/ViewData';
// import InsertData from './components/InsertData';
import GridData from './components/GridData';
import Updater from './components/UpdateData';


function App() {
  const [allData,setAllData] = useState([])
  const [main_data,setMainData] = useState([])
  const [resource_data,setResourceData] = useState([])
  useEffect(()=>{                     //this function is used to render the screen with new data
    const getTables= async () =>{
      const dataFromServer = await fetchData()
      const mainDataFromServer = await fetchMainData()
      const resDataFromServer = await fetchResData()
      setMainData(mainDataFromServer)
      setResourceData(resDataFromServer)
      setAllData(dataFromServer)
    }
    getTables()
  },[]) 
  


  const fetchData= async ()=>{
    const res = await fetch('http://localhost:5000/methods')
    const data = await res.json()
    return data
  }

  const fetchMainData= async ()=>{
    const res = await fetch('http://localhost:5000/main')
    const data = await res.json()
    return data
  }

  const fetchResData= async ()=>{
    const res = await fetch('http://localhost:5000/resource')
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
    setResourceData([...resource_data, resp])
  }

  const deleteMain = async (id)=>{    //the method for deleting json data

    await fetch(`http://localhost:5000/delete_main/${id}`,
    {method: 'DELETE'})
    setMainData(main_data.filter((val)=> val.id !==id,
    console.log(id)
    ))
}

  return (
    <>
    <Router>
          
          <NavBar/>
          <br></br>
          <Routes>
          <Route path='/' element={<Resource mainData={main_data} resData={resource_data} adder={addDetails_resource}/>}/>
          <Route path='/main' element={<Inserter data={main_data} adder={addDetails_main}/>}/>
          <Route path='/view' element={<GridData data={allData} onDelete={deleteMain}/>}/>
          {/* <Route path='/view' element={<ViewData data={allData}/>}/> */}
          <Route path='/update' element={<Updater data={allData}/>}/>
          <Route path='/resource' element={<Resource mainData={main_data} resData={resource_data} adder={addDetails_resource}/>}/>
          
          </Routes>
          </Router>
    </>
  )
}

export default App
