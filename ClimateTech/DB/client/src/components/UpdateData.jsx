import { useState } from "react";

import { useNavigate } from "react-router-dom";

const Updater = ({ data, update }) => {
  const navigate = useNavigate();

  const UpdateMain = async (details, id) => {
    const res = await fetch(`http://localhost:5000/umain/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(details),
    });
    const resp = await res.json();
  };
  const UpdateRes = async (details, id) => {
    const res = await fetch(`http://localhost:5000/ures/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(details),
    });
    const resp = await res.json();
  };
  let unique_location = [];
  let unique_component = [];
  let unique_component_type = [];
  data.map((val) => {
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
  unique_component_type = unique_component_type.filter(
    (item, index) => unique_component_type.indexOf(item) === index
  );

  const sId = JSON.parse(sessionStorage.getItem("update_main")).id;
  const sLocation = JSON.parse(sessionStorage.getItem("update_main"))[
    "location"
  ];
  const sComponent = JSON.parse(sessionStorage.getItem("update_main"))[
    "component"
  ];
  const sComponent_type = JSON.parse(sessionStorage.getItem("update_main"))[
    "component_type"
  ];
  const sLink = JSON.parse(sessionStorage.getItem("update_main"))["link"];
  const sCommonId = JSON.parse(sessionStorage.getItem("update_main"))["res_id"];
  const sReuse = JSON.parse(sessionStorage.getItem("update_main"))["reuse"];
  const sReduce = JSON.parse(sessionStorage.getItem("update_main"))["reduce"];
  const sRecycle = JSON.parse(sessionStorage.getItem("update_main"))["recycle"];
  const [reuse, setReuses] = useState([...sReuse]);
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

  const [reduce, setReduces] = useState([...sReduce]);

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

  const [recycle, setRecycles] = useState([...sRecycle]);

  const handleRecycleChange = (index, value) => {
    const updatedRecycles = [...recycle];
    updatedRecycles[index] = value;
    setRecycles(updatedRecycles);
  };

  const addRecycleInput = () => {
    setRecycles([...recycle, ""]);
  };

  const removeRecycleInput = (index) => {
    const updatedMethods = [...recycle];
    updatedMethods.splice(index, 1);
    setRecycles(updatedMethods);
  };

  const [link, setLink] = useState([...sLink]);
  const handleLinkChange = (index, value) => {
    const updatedLinks = [...link];
    updatedLinks[index] = value;
    setLink(updatedLinks);
  };

  const addLinkInput = () => {
    setLink([...link, ""]);
  };

  const removeLinkInput = (index) => {
    const updatedLinks = [...link];
    updatedLinks.splice(index, 1);
    setLink(updatedLinks);
  };
  const [id, setId] = useState(sId);
  const [location, setLocation] = useState(sLocation);
  const [component, setComponent] = useState(sComponent);
  const [componentType, setComponentType] = useState(sComponent_type);
  const [commonId, setCommonId] = useState(sCommonId);


  const HandleSubmission = (e) => {
    e.preventDefault();

    UpdateRes({ componentType, reuse, recycle, reduce, link }, commonId);
    UpdateMain({ location, component, componentType }, id);
    setId("");
    setLocation("");
    setComponent("");
    setComponentType("");
    setCommonId("");
    alert("data Updated");
    navigate('/view');
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-prose">
        <h1 className="text-2xl font-semibold mb-6 text-center">Update Data</h1>
        <form onSubmit={HandleSubmission}>
          <div className="mb-4">
            <label
              htmlFor="location"
              className="block text-l font-bold font-admin text-gray-700"
              >
              Location
            </label>
            <input
              id="loc"
              type="text"
              list="location"
              value={location}
              placeholder="Enter Location"
              className="w-full shadow-md rounded py-2 px-3 mt-1 bg-gray-50 font-admin focus:outline-none focus:ring focus:border-emerald-400"
              onChange={(e) => setLocation(e.target.value)}
              required
            />
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
            <label
              htmlFor="component"
              className="block text-l font-bold font-admin text-gray-700"
              >
              Component
            </label>
            <input
              id="comp"
              type="text"
              value={component}
              list="component"
              placeholder="Enter Component"
              className="w-full shadow-md rounded py-2 px-3 mt-1 bg-gray-50 font-admin focus:outline-none focus:ring focus:border-emerald-400"
              onChange={(e) => setComponent(e.target.value)}
              required
            />
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
            <label
              htmlFor="componentType"
              className="block text-l font-bold font-admin text-gray-700"
              >
              Component Type
            </label>
            <input
              id="compt"
              type="text"
              value={componentType}
              list="componenttype"
              placeholder="Enter Component Type"
              className="w-full shadow-md rounded py-2 px-3 mt-1 bg-gray-50 font-admin focus:outline-none focus:ring focus:border-emerald-400"
              onChange={(e) => setComponentType(e.target.value)}
              required
            />
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

          <div className="mb-4">
              <div className="relative w-full">
                <label
                  htmlFor="Reuse"
                  className="w-full border font-bold rounded py-2 px-3 mt-1 bg-gray-50 font-admin focus:outline-none focus:ring focus:border-emerald-400"
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
                    <textarea
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
                  className="w-full border font-bold rounded py-2 px-3 mt-1 bg-gray-50 font-admin focus:outline-none focus:ring focus:border-emerald-400"
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
                    <textarea
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
                  className="w-full border font-bold rounded py-2 px-3 mt-1 bg-gray-50 font-admin focus:outline-none focus:ring focus:border-emerald-400"
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
                   
                    <textarea
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
                  htmlFor="Reuse"
                  className="w-full border font-bold rounded py-2 px-3 mt-1 bg-gray-50 font-admin focus:outline-none focus:ring focus:border-emerald-400"
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
              
              <div >
                {link.map((item, index) => (
                  <div key={index} className="relative w-full">
                    <input
                      type="text"
                      id={`reuse_${index}`}
                      placeholder={`Enter Link ${index + 1}`}
                      value={item || ''}
                      onChange={(e) => handleLinkChange(index, e.target.value)}
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
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Updater;
