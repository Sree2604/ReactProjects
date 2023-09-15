import { useState } from "react";

const Resource = ({ resData, mainData, adder }) => {
  const [componentType, setComponentType] = useState("");
  const [showRes, setShowRes] = useState(false);
  const [showMain, setShowMain] = useState(true);
  const [location, setLocation] = useState("");
  const [component, setComponent] = useState("");
  let tempReuse = {};
  let tempReduce = {};
  let tempRecycle = {};
  let tempLink = {};

  const addDetails_main = async (details) => {
    const res = await fetch("http://localhost:5000/methodsmain", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(details),
    });
    const resp = await res.json();
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
    setReduces([...reduce, ""]);
  };

  const removeReduceInput = (index) => {
    const updatedReduces = [...reduce];
    updatedReduces.splice(index, 1);
    setReduces(updatedReduces);
  };

  const [link, setLink] = useState([]);

  const handleLinkChange = (index, value) => {
    const updatedLinks = [...link];
    updatedLinks[index] = value;
    setLink(updatedLinks);
    console.log(link)
  };

  const addLinkInput = () => {
    setLink([...link, ""]);
  };

  const removeLinkInput = (index) => {
    const updatedLinks = [...link];
    updatedLinks.splice(index, 1);
    setLink(updatedLinks);
  };

  const [recycle, setRecycles] = useState([]);

  const handleRecycleChange = (index, value) => {
    const updatedRecycles = [...recycle];
    updatedRecycles[index] = value;
    setRecycles(updatedRecycles);
  };

  const addRecycleInput = () => {
    setRecycles([...recycle, ""]);
  };

  const removeRecycleInput = (index) => {
    const updatedRecycles = [...recycle];
    updatedRecycles.splice(index, 1);
    setRecycles(updatedRecycles);
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
      {
        componentType,
        tempReuse: reuse,
        tempReduce: reduce,
        tempRecycle: recycle,
        tempLink: link
      }
    );
    alert("Data Submitted");
    setLocation("");
    setComponent("");
    setComponentType("");
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
      setLink("");
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
      {showMain && !showRes && (
        <div className="flex mt-8 justify-center">
          <div className="bg-gray-90 rounded-lg shadow-lg p-8 w-full max-w-prose ">
            <h1 className="text-2xl select-none font-admin mb-6 text-center">Add Data</h1>
            <form onSubmit={HandleSubmission}>
              <div className="mb-4">
                <label
                  htmlFor="location"
                  className="block font-bold text-l font-admin text-gray-700"
                >
                  Location
                </label>

                <div>
                  <div>
                    <input
                      className="w-full shadow-md rounded py-2 px-3 mt-1 bg-gray-50 font-admin  focus:outline-none focus:ring focus:border-emerald-400"
                      type="text"
                      value={location}
                      placeholder="Where is in the house?"
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>
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
              </div>
              <div className="mb-4">
                <label
                  htmlFor="componentType"
                  className="block font-bold text-l font-admin text-gray-700"
                >
                  Obstacle
                </label>
                <div>
                  <div>
                    <input
                      className="w-full  shadow-md rounded py-2 px-3 mt-1 bg-gray-50 font-admin focus:outline-none focus:ring focus:border-emerald-400"
                      type="text"
                      value={componentType}
                      placeholder="What is the object?  "
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
              <div className="mb-4">
                <label
                  htmlFor="component"
                  className="block font-bold text-l font-admin text-gray-700"
                >
                  Obstacle Type
                </label>
                <div>
                  <div>
                    <input
                      className="w-full shadow-md rounded py-2 px-3 mt-1 bg-gray-50 font-admin  focus:outline-none focus:ring focus:border-emerald-400"
                      type="text"
                      value={component}
                      placeholder="What is the obstacle tends to?"
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
              
              <div className="mt-6">
                <button
                  onClick={changeState}
                  type="submit"
                  className="w-30 shadow-md py-2 px-4 bg-green-600 text-l text-white font-admin rounded hover:shadow-lg"
                >
                  Next
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {showRes && !showMain && (
        <div className="flex mt-2 justify-center">
          <div className="bg-gray-90 rounded-lg shadow-lg p-8 w-full max-w-prose ">
            
            
            <h1 className="text-2xl select-none font-admin mb-6 text-center">
              Add Data
            </h1>
            <form onSubmit={HandleSubmission}>
              <div className="mb-4">
                <label
                  htmlFor="ComponentType"
                  className="block font-bold text-l font-admin text-gray-700"
                >
                  Obstacle Type
                </label>
                <div>
                  <div>
                    <input
                      className="w-full shadow-md rounded py-2 px-3 mt-1 bg-gray-50 font-admin  focus:outline-none focus:ring focus:border-emerald-400"
                      type="text"
                      value={componentType}
                      placeholder="Enter the Component Type"
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
              <div className="mb-4">
              <div className="relative w-full">
                <label
                  htmlFor="Reuse"
                  className="w-full font-bold border rounded py-2 px-3 mt-1 bg-gray-50 font-admin focus:outline-none focus:ring focus:border-emerald-400"
                >
                  Reuse
                </label>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer">
                  <ion-icon
                    size="small"
                    name="add-outline"
                    onClick={addResuseInput}
                  ></ion-icon>
                </div>
              </div>
              <div >
                {reuse.map((item, index) => (
                  <div key={index} className="relative w-full">
                    <input
                      type="text"
                      id={`reuse_${index}`}
                      placeholder={`Enter Reuse ${index + 1} Method`}
                      value={item}
                      onChange={(e) => handleReuseChange(index, e.target.value)}
                      className="w-full shadow-md rounded py-2 px-3 mt-1 bg-gray-50 font-admin focus:outline-none focus:ring focus:border-emerald-400"
                      required
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer">
                      <ion-icon
                        size="small"
                        name="close-outline"
                        onClick={() => removeReuseInput(index)}
                        className="cursor-pointer"
                      ></ion-icon>
                    </div>
                  </div>
                ))}
              </div>
              </div>
              <div className="mb-4">
              <div className="relative w-full">
                <label
                  htmlFor="Reduce"
                  className="w-full font-bold border rounded py-2 px-3 mt-1 bg-gray-50 font-admin focus:outline-none focus:ring focus:border-emerald-400"
                >
                  Reduce
                </label>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer">
                  <ion-icon
                    size="small"
                    name="add-outline"
                    onClick={addReduceInput}
                  ></ion-icon>
                </div>
              </div>
              <div>
                {reduce.map((item, index) => (
                  <div key={index} className="relative w-full">
                    <input
                      type="text"
                      id={`reduce_${index}`}
                      placeholder={`Enter Reduce ${index + 1} Method`}
                      value={item}
                      onChange={(e) =>
                        handleReduceChange(index, e.target.value)
                      }
                      className="w-full shadow-md rounded py-2 px-3 mt-1 bg-gray-50 font-admin focus:outline-none focus:ring focus:border-emerald-400"
                      required
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer">
                      <ion-icon
                        size="small"
                        name="close-outline"
                        onClick={() => removeReduceInput(index)}
                        className="cursor-pointer"
                      ></ion-icon>
                    </div>
                  </div>
                ))}
              
              </div>
              </div>
              <div className="mb-4">
              <div className="relative w-full">
                <label
                  htmlFor="Recycle"
                  className="w-full font-bold border rounded py-2 px-3 mt-1 bg-gray-50 font-admin focus:outline-none focus:ring focus:border-emerald-400"
                >
                  Recycle
                </label>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer">
                  <ion-icon
                    size="small"
                    name="add-outline"
                    onClick={addRecycleInput}
                  ></ion-icon>
                </div>
              </div>
              <div>
                {recycle.map((item, index) => (
                  <div key={index} className="relative w-full">
                   
                    <input
                      type="text"
                      id={`recycle_${index}`}
                      placeholder={`Enter Recycle ${index + 1} Method`}
                      value={item}
                      onChange={(e) =>
                        handleRecycleChange(index, e.target.value)
                      }
                      className="w-full shadow-md rounded py-2 px-3 mt-1 bg-gray-50 font-admin focus:outline-none focus:ring focus:border-emerald-400"
                      required
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer">
                      <ion-icon
                        size="small"
                        name="close-outline"
                        onClick={() => removeRecycleInput(index)}
                        className="cursor-pointer"
                      ></ion-icon>
                    </div>
                  </div>
                ))}
              </div>
              </div>
              <div className="mb-4">
              <div className="relative w-full">
                <label
                  htmlFor="Link"
                  className="w-full font-bold border rounded py-2 px-3 mt-1 bg-gray-50 font-admin focus:outline-none focus:ring focus:border-emerald-400"
                >
                  Link
                </label>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer">
                  <ion-icon
                    size="small"
                    name="add-outline"
                    onClick={addLinkInput}
                  ></ion-icon>
                </div>
              </div>
              <div>
                {link.map((item, index) => (
                  <div key={index} className="relative w-full">
                   
                    <input
                      type="text"
                      id={`recycle_${index}`}
                      placeholder={`Enter Link ${index + 1} Method`}
                      value={item}
                      onChange={(e) =>
                        handleLinkChange(index, e.target.value)
                      }
                      className="w-full shadow-md rounded py-2 px-3 mt-1 bg-gray-50 font-admin focus:outline-none focus:ring focus:border-emerald-400"
                      required
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer">
                      <ion-icon
                        size="small"
                        name="close-outline"
                        onClick={() => removeLinkInput(index)}
                        className="cursor-pointer"
                      ></ion-icon>
                    </div>
                  </div>
                ))}
              </div>
              </div>
              
              <div className="mt-6">
                <button
                  type="submit"
                  className="w-30 shadow-md py-2 px-4 bg-green-600 text-l text-white font-admin rounded hover:shadow-lg"
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
