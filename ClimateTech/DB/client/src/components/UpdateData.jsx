import { useState } from "react";

import { useNavigate } from "react-router-dom";

const Updater=({data,update})=>{
    const navigate=useNavigate();

    const UpdateMain = async (details,id) =>{    //function to POST the card details to json
        const res = await fetch(`http://localhost:5000/umain/${id}`,{
          method: 'PUT',
          headers: {
            'Content-type' : 'application/json'
          },
          body: JSON.stringify(details)
        })
        const resp = await res.json()
      }
      const UpdateRes = async (details,id) =>{    //function to POST the card details to json
        const res = await fetch(`http://localhost:5000/ures/${id}`,{
          method: 'PUT',
          headers: {
            'Content-type' : 'application/json'
          },
          body: JSON.stringify(details)
        })
        const resp = await res.json()
      }
    let unique_location = [];
    let unique_component = [];
    let unique_component_type = [];
    data.map((val)=>{unique_location.push(val.location),unique_component.push(val.component),unique_component_type.push(val.component_type)})
    unique_location=unique_location.filter((item,index) => unique_location.indexOf(item) === index);
    unique_component=unique_component.filter((item,index) => unique_component.indexOf(item) === index);
    unique_component_type=unique_component_type.filter((item,index) => unique_component_type.indexOf(item) === index);

    const sId=JSON.parse(sessionStorage.getItem('update_main')).id;
    const sLocation=JSON.parse(sessionStorage.getItem('update_main'))["location"];
    const sComponent=JSON.parse(sessionStorage.getItem('update_main'))["component"];
    const sComponent_type=JSON.parse(sessionStorage.getItem('update_main'))["component_type"];
    const sLink=JSON.parse(sessionStorage.getItem('update_main'))["link"];
    const sCommonId = JSON.parse(sessionStorage.getItem('update_main'))["res_id"];
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
  

    const [id,setId]=useState(sId);
    const [location,setLocation]=useState(sLocation);
    const [component,setComponent]=useState(sComponent);
    const [componentType,setComponentType]=useState(sComponent_type);
    const [commonId,setCommonId] = useState(sCommonId);

    const [link,setLink]=useState(sLink);


    const HandleSubmission=(e)=>{
        e.preventDefault()
        console.log(typeof(commonId));
        let tempReuse = {};
        let tempReduce = {};
        let tempRecycle = {};
        console.log("Submitted");
        
        // update({location,component,component_type,rid: link},id);
        UpdateRes({componentType,reuse,recycle,reduce,link},commonId)
        UpdateMain({location,component,componentType},id)
        setId("");
        setLocation("");
        setComponent("");
        setComponentType("");
        setLink("");
        setCommonId("");
        alert("data Updated");
        navigate('/grid');
        // navigate("/update_main");
    }


    
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
                <h1 className="text-2xl font-semibold mb-6 text-center">Update Main</h1>
                <form onSubmit={HandleSubmission}>
                    <div className="mb-4">
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                            Location
                        </label>
                        <input 
                        id="loc"
                        type="text" 
                        list="location" 
                        value={location}
                        placeholder="Enter Location" 
                        className="w-full border rounded py-2 px-3 mt-1 focus:outline-none focus:ring focus:border-blue-300"
                        onChange={(e) => setLocation(e.target.value)}
                        required/>
                        <div>
                        {unique_location
                      .filter((item) => {
                        const searchTerm = location.toLowerCase();
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
                    <div className="mb-4">
                        <label htmlFor="component" className="block text-sm font-medium text-gray-700">
                            Component
                        </label>
                        <input 
                        id="comp"
                        type="text" 
                        value={component}
                        list="component" 
                        placeholder="Enter Component" 
                        className="w-full border rounded py-2 px-3 mt-1 focus:outline-none focus:ring focus:border-blue-300"
                        onChange={(e) => setComponent(e.target.value)}
                        required/>
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
                    <div className="mb-4">
                        <label htmlFor="componentType" className="block text-sm font-medium text-gray-700">
                            Component Type
                        </label>
                        <input 
                        id="compt"
                        type="text" 
                        value={componentType}
                        list="componenttype" 
                        placeholder="Enter Component Type" 
                        className="w-full border rounded py-2 px-3 mt-1 focus:outline-none focus:ring focus:border-blue-300"
                        onChange={(e) => setComponentType(e.target.value)}
                        required/>
                        <div>
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
                        <label htmlFor="componentType" className="block text-sm font-medium text-gray-700">
                            Link
                        </label>
                        <input 
                        id="rid"
                        type="text" 
                        value={link}
                        list="r_id" 
                        placeholder="Enter Link" 
                        className="w-full border rounded py-2 px-3 mt-1 focus:outline-none focus:ring focus:border-blue-300"
                        onChange={(e) => setLink(e.target.value)}
                        required/>
                    </div>
                    <div className="mt-6">
                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Update Table
                        </button>
                    </div>
                </form>
            </div>
        </div>
      );
}
export default Updater