import { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Resource from "./components/Resource";
import NavBar from "./components/NavBar";
import GridData from "./components/GridData";
import Updater from "./components/UpdateData";
import api from "./api";
import Login from "./components/Login";
import Displaypages from "./components/DisplayPages";


function App() {
  const [allData, setAllData] = useState([]);
  const [main_data, setMainData] = useState([]);
  const [resource_data, setResourceData] = useState([]);
  const [verify,setVerify] = useState(false);
  
  useEffect(() => {
    
    const auth = async () => {
      const username = import.meta.env.VITE_UNAME;
      const password = import.meta.env.VITE_UPASS;
      console.log(import.meta.env.VITE_UNAME);
      console.log(import.meta.env.VITE_UPASS);


    ///fn starts
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (response.ok) {
        const { token } = await response.json();
        localStorage.setItem("token", token);
        setVerify(true);
        console.log("Login successful");
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error:", error);
    } //fn ends
    };
    auth();

    const getTables = async () => {
      const dataFromServer = await fetchData();
      const mainDataFromServer = await fetchMainData();
      const resDataFromServer = await fetchResData();
      setMainData(mainDataFromServer);
      setResourceData(resDataFromServer);
      setAllData(dataFromServer);
    };
    getTables();
  }, []);

  // useEffect(()=> {
  //   auth()
  // },verify)

  const fetchData = async () => {
    const res = await api.get("http://localhost:5000/methods");
    const data = await res.json();
    return data;
  };

  const fetchMainData = async () => {
    const res = await api.get("http://localhost:5000/main");
    const data = await res.json();
    return data;
  };

  const fetchResData = async () => {
    const res = await api.get("http://localhost:5000/resource");
    const data = await res.json();
    return data;
  };

  const addDetails_main = async (details) => {
    const res = await fetch("http://localhost:5000/methodsmain", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(details),
    });
    const resp = await res.json();
    setMainData([...main_data, resp]);
  };
  const addDetails_resource = async (details) => {
    const res = await fetch("http://localhost:5000/methodsresource", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(details),
    });
    const resp = await res.json();
    setResourceData([...resource_data, resp]);
  };

  const deleteMain = async (id) => {

    await fetch(`http://localhost:5000/delete_main/${id}`, {
      method: "DELETE",
    });
    setAllData(allData.filter((val) => val.id !== id, console.log(id)));
  };
  return (
    <>
      <Router>
        <NavBar data={allData}/>
        <br></br>
        <Routes>
          <Route
            path="/"
            element={
              <Resource
                mainData={main_data}
                resData={resource_data}
                adder={addDetails_resource}
              />
            }
          />
          <Route
            path="/view"
            element={<GridData data={allData} onDelete={deleteMain} />}
          />
          <Route path="/update" element={<Updater data={allData} />} />
         
          {allData.map((item)=> <Route path={`/${item.location}`} element={<Displaypages pagedetails={item}/>}/>)}
          <Route
            path="/resource"
            element={
              <Resource
                mainData={main_data}
                resData={resource_data}
                adder={addDetails_resource}
              />
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
