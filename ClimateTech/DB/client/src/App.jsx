import { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Resource from "./components/Resource";
import NavBar from "./components/NavBar";
import GridData from "./components/GridData";
import Updater from "./components/UpdateData";
import ShowGrid from "./components/ShowGrid";

function App() {
  const [allData, setAllData] = useState([]);
  const [main_data, setMainData] = useState([]);
  const [resource_data, setResourceData] = useState([]);
  
  useEffect(() => {
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

  const fetchData = async () => {
    const res = await fetch("http://localhost:5000/methods");
    const data = await res.json();
    return data;
  };

  const fetchMainData = async () => {
    const res = await fetch("http://localhost:5000/main");
    const data = await res.json();
    return data;
  };

  const fetchResData = async () => {
    const res = await fetch("http://localhost:5000/resource");
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

  const deleteMain = async (component_type) => {

    await fetch(`http://localhost:5000/delete_main/${component_type}`, {
      method: "DELETE",
    });
    setAllData(allData.filter((val) => val.component_type !== component_type, console.log(component_type)));
  };

  return (
    <>
      <Router>
        <NavBar />
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
          <Route path="/grid" element={<ShowGrid data={allData} />} />
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
