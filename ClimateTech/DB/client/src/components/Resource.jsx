import { useState } from "react";
// import './InsertData.css';
const Resource = ({ resData, mainData, adder }) => {
  const [componentType, setComponentType] = useState("");
  //   const [method, setMethod] = useState("");
  const [link, setLink] = useState("");
  const [showRes, setShowRes] = useState(false);
  const [showMain, setShowMain] = useState(true);
//   const [temp, setTemp] = useState({});
  const [location, setLocation] = useState("");
  const [component, setComponent] = useState("");
 let tempReuse = {};
 let tempReduce = {};
 let tempRecycle = {};

 const fetchLink= async ()=>{
    const res = await fetch('https://free-eyes-help.loca.lt/methods')
    const data = await res.json()
    console.log(JSON.stringify(data))
    return data
  }
fetchLink()
//   console.log(fetchLink())


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

  const addData = (main, res) => {
    addDetails_resource(res);
    setTimeout(addDetails_main(main), 1000);
  };

  const [reuse, setReuses] = useState([]);
  const handleReuseChange = (index, value) => {
    const updatedReuses = [...reuse];
    updatedReuses[index] = value;
    setReuses(updatedReuses);
    console.log(reuse);
  };

  const addResuseInput = () => {
    setReuses([...reuse, ""]);
  };

  const removeReuseInput = (index) => {
    const updatedReuses = [...reuse];
    updatedReuses.splice(index, 1);
    setReuses(updatedReuses);
  };
  
  const [reduce, setReduces] = useState([]); 

  const handleReduceChange = (index, value) => {
    const updatedReduces = [...reduce];
    updatedReduces[index] = value;
    setReduces(updatedReduces);
  };

  const addReduceInput = () => {
    setReduces([...reduce, '']); 
  };

  const removeReduceInput = (index) => {
    const updatedReduces = [...reduce];
    updatedReduces.splice(index, 1);
    setReduces(updatedReduces);
  };
  
  const [recycle, setRecycles] = useState([]);

  const handleRecycleChange = (index, value) => {
    const updatedRecycles = [...recycle];
    updatedRecycles[index] = value;
    setRecycles(updatedRecycles);
  };

  const addRecycleInput = () => {
    setRecycles([...recycle, '']); 
  };

  const removeRecycleInput = (index) => {
    const updatedMethods = [...recycle];
    updatedMethods.splice(index, 1);
    setRecycles(updatedMethods);
  };


  let unique_location = [];
  let unique_component = [];
  let unique_component_type = [];
  mainData.map((val) => {
    unique_location.push(val.location),
      unique_component.push(val.component),
      unique_component_type.push(val.component_type);
  });
  unique_location = unique_location.filter(
    (item, index) => unique_location.indexOf(item) === index
  );
  unique_component = unique_component.filter(
    (item, index) => unique_component.indexOf(item) === index
  );


  resData.map((val) => {
    unique_component_type.push(val.component_type);
  });
  unique_component_type = unique_component_type.filter(
    (item, index) => unique_component_type.indexOf(item) === index
  );
  const HandleSubmission = (e) => {
    e.preventDefault();
    
    addData(
      { componentType, location, component },
      { componentType, tempReuse : reuse,tempReduce : reduce,tempRecycle:recycle, link }
    );
    alert("Data Submitted");
    setLocation("");
    setComponent("");
    setComponentType("");
    setReuses("");
    setLink("");
    setShowMain(false);
    setShowRes(true);
    window.location.reload();
  };


  const changeState = () => {
    if (unique_component_type.includes(componentType)) {
      addDetails_main({ componentType, location, component });
      alert("Data Submitted");
      setLocation("");
      setComponent("");
      setComponentType("");
      setReuses("");
      setReduces("");
      setRecycles("");
      setLink("");
      setShowMain(false);
      setShowRes(true);
      window.location.reload();
    } else {
      setShowMain(false);
      setShowRes(true);
    }
  };

  return (
    <>
      {showRes && !showMain && (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
            <h1 className="text-2xl font-semibold font-navhead mb-6 text-center">
              Resource Table
            </h1>
            <form onSubmit={HandleSubmission}>
              <div className="mb-4">
                <label
                  htmlFor="ComponentType"
                  className="block text-sm font-sidebody text-gray-700"
                >
                  ComponentType
                </label>
                <div>
                  <div>
                    <input
                      className="w-full border rounded py-2 px-3 mt-1 focus:outline-none focus:ring focus:border-blue-300"
                      type="text"
                      value={componentType}
                      onChange={(e) => setComponentType(e.target.value)}
                    />
                  </div>
                  <div>
                    {unique_component_type
                      .filter((item) => {
                        const searchTerm = componentType.toLowerCase();
                        const temp = new String(item);
                        const loc = temp.toLowerCase();
                        return (
                          searchTerm &&
                          loc.startsWith(searchTerm) &&
                          loc !== searchTerm
                        );
                      })

                      .map((loc) => (
                        <div onClick={() => setComponentType(componentType)}>
                          {loc}
                        </div>
                      ))}
                  </div>
                </div>
              </div>
              <div>
                {reuse.map((method, index) => (
                  <div key={index} className="mb-4">
                    <label
                      htmlFor={`method_${index}`}
                      className="block text-sm font-medium text-gray-700"
                    >
                      Method {index + 1}
                    </label>
                    <input
                      type="text"
                      id={`method_${index}`}
                      placeholder="Enter Method"
                      value={method}
                      onChange={(e) => handleReuseChange(index, e.target.value)}
                      className="w-full border rounded py-2 px-3 mt-1 focus:outline-none focus:ring focus:border-blue-300"
                      required
                    />
                    <ion-icon size="large" name="close-outline" onClick={() => removeReuseInput(index)}></ion-icon>
                  </div>
                ))}
                <ion-icon size="large" name="add-outline" onClick={addResuseInput}></ion-icon>
              </div>
              <div>
                {reduce.map((item, index) => (
                  <div key={index} className="mb-4">
                    <label
                      className="block text-sm font-medium text-gray-700"
                    >
                      Reduce {index + 1}
                    </label>
                    <input
                      type="text"
                      id={`reduce_${index}`}
                      placeholder="Enter Reduce method"
                      value={item}
                      onChange={(e) => handleReduceChange(index, e.target.value)}
                      className="w-full border rounded py-2 px-3 mt-1 focus:outline-none focus:ring focus:border-blue-300"
                      required
                    />
                    <ion-icon size="large" name="close-outline" onClick={() => removeReduceInput(index)}></ion-icon>
                  </div>
                ))}
                <ion-icon size="large" name="add-outline" onClick={addReduceInput}></ion-icon>
              </div>
              <div>
                {recycle.map((item, index) => (
                  <div key={index} className="mb-4">
                    <label
                      className="block text-sm font-medium text-gray-700"
                    >
                      Recycle {index + 1}
                    </label>
                    <input
                      type="text"
                      id={`recycle_${index}`}
                      placeholder="Enter Recycle Method"
                      value={item}
                      onChange={(e) => handleRecycleChange(index, e.target.value)}
                      className="w-full border rounded py-2 px-3 mt-1 focus:outline-none focus:ring focus:border-blue-300"
                      required
                    />
                    <ion-icon size="large" name="close-outline" onClick={() => removeRecycleInput(index)}></ion-icon>
                  </div>
                ))}
                <ion-icon size="large" name="add-outline" onClick={addRecycleInput}></ion-icon>
              </div>
              
              <div className="mb-4">
                <label
                  htmlFor="componentType"
                  className="block text-sm font-medium text-gray-700"
                >
                  Link
                </label>
                <input
                  type="text"
                  id="componentType"
                  placeholder="Enter Link"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  className="w-full border rounded py-2 px-3 mt-1 focus:outline-none focus:ring focus:border-blue-300"
                  required
                />
              </div>
              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Next
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {showMain && !showRes && (
        <div className="flex items-center justify-center min-h-screen bg-gray-300">
          <div className="bg-gray-200 rounded-lg shadow-md p-8 w-full max-w-md ">
            <h1 className="text-2xl font-navhead mb-6 text-center">
              Main Table
            </h1>
            <form onSubmit={HandleSubmission}>
              <div className="mb-4">
                <label
                  htmlFor="location"
                  className="block text-l font-sidebody text-gray-700"
                >
                  Location
                </label>

                <div>
                  <div>
                    <input
                      className="w-full border rounded py-2 px-3 mt-1 bg-gray-100 font-navhead  focus:outline-none focus:ring focus:border-emerald-400"
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>
                  <div>
                    {unique_location
                      .filter((item) => {
                        // console.log(typeof(location))
                        const searchTerm = location.toLowerCase();
                        // console.log(typeof(item))
                        const temp = new String(item);
                        const loc = temp.toLowerCase();
                        return (
                          searchTerm &&
                          loc.startsWith(searchTerm) &&
                          loc !== searchTerm
                        );
                      })

                      .map((loc) => (
                        <div onClick={() => setLocation(location)}>{loc}</div>
                      ))}
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="component"
                  className="block text-l font-sidebody text-gray-700"
                >
                  Component
                </label>
                <div>
                  <div>
                    <input
                      className="w-full border rounded py-2 px-3 mt-1 bg-gray-100 font-navhead  focus:outline-none focus:ring focus:border-emerald-400"                      type="text"
                      value={component}
                      onChange={(e) => setComponent(e.target.value)}
                    />
                  </div>
                  <div>
                    {unique_component
                      .filter((item) => {
                        const searchTerm = component.toString().toLowerCase();
                        const temp = new String(item);
                        const comp = temp.toLowerCase();
                        return (
                          searchTerm &&
                          comp.startsWith(searchTerm) &&
                          comp !== searchTerm
                        );
                      })

                      .map((comp) => (
                        <div onClick={() => setComponent(comp)}>{comp}</div>
                      ))}
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="componentType"
                  className="block text-l font-sidebody text-gray-700"
                >
                  Component Type
                </label>
                <div>
                  <div>
                    <input
                      className="w-full border rounded py-2 px-3 mt-1 bg-gray-100 font-navhead focus:outline-none focus:ring focus:border-emerald-400"                      
                      type="text"
                      value={componentType}
                      onChange={(e) => setComponentType(e.target.value)}
                    />
                  </div>
                  <div>
                    {unique_component_type
                      .filter((item) => {
                        const compSearch = componentType.toLowerCase();
                        const temp = new String(item);
                        const compType = temp.toLowerCase();
                        return (
                          compSearch &&
                          compType.startsWith(compSearch) &&
                          compType !== compSearch
                        );
                      })

                      .map((compType) => (
                        <div onClick={() => setComponentType(compType)}>
                          {compType}
                        </div>
                      ))}
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <button
                  onClick={changeState}
                  type="submit"
                  className="w-full py-2 px-4 bg-teal-500 text-l text-white font-sidehead rounded hover:bg-teal-600"
                >
                  Insert
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Resource;
