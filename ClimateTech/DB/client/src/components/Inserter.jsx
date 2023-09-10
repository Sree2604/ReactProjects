import { useState,useRef } from "react";
import Button  from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";

const Inserter = ({ adder,data }) => {
    const [location, setLocation] = useState("");
    const [component, setComponent] = useState("");
    const [componentType, setComponentType] = useState("");
    

    let unique_location = [];
    let unique_component = [];
    let unique_component_type = [];
    data.map((val)=>{unique_location.push(val.location),unique_component.push(val.component),unique_component_type.push(val.component_type)})
    unique_location=unique_location.filter((item,index) => unique_location.indexOf(item) === index);
    unique_component=unique_component.filter((item,index) => unique_component.indexOf(item) === index);
    unique_component_type=unique_component_type.filter((item,index) => unique_component_type.indexOf(item) === index);

    const onSearch = (searchTerm) => {
        setLocation(searchTerm)
    }

    const HandleSubmission = (e) => {
        e.preventDefault();
        console.log("Submitted");
        adder({ location, component, componentType });
        console.log(component+" "+componentType);
        setLocation("");
        setComponent("");
        setComponentType("");
        alert("Data Inserted");
        window.location.reload();
    }

    return (
        <>
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
                <h1 className="text-2xl font-semibold mb-6 text-center">Main Table</h1>
                <form onSubmit={HandleSubmission}>
                    <div className="mb-4">
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                            Location
                        </label>

                        <div>
                            <div>
                                <input className="w-full border rounded py-2 px-3 mt-1 focus:outline-none focus:ring focus:border-blue-300" type="text" value={location} onChange={(e) => setLocation(e.target.value)}/>
                            </div>
                            <div>
                                {unique_location.filter(item => {
                                    // console.log(typeof(location))
                                    const searchTerm = location.toLowerCase();
                                    // console.log(typeof(item))
                                    const temp = new String(item);
                                    const loc = temp.toLowerCase();
                                    return searchTerm && loc.startsWith(searchTerm) && loc !== searchTerm
                                })
                            
                                .map((loc)=> <div onClick={()=> onSearch(loc)}>{loc}</div>)}
                            </div>
                        </div>

                    </div>
                    <div className="mb-4">
                        <label htmlFor="component" className="block text-sm font-medium text-gray-700">
                            Component
                        </label>
                        <div>
                            <div>
                                <input className="w-full border rounded py-2 px-3 mt-1 focus:outline-none focus:ring focus:border-blue-300" type="text" value={component} onChange={(e) => setComponent(e.target.value)}/>
                            </div>
                            <div>
                                {unique_component.filter(item => {
                                    const searchTerm = component.toString().toLowerCase();
                                    const temp = new String(item);
                                    const comp = temp.toLowerCase();
                                    return searchTerm && comp.startsWith(searchTerm) && comp !== searchTerm
                                })
                                
                                .map((comp)=> <div onClick={()=> setComponent(comp)}>{comp}</div>)}
                            </div>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="componentType" className="block text-sm font-medium text-gray-700">
                            Component Type
                        </label>
                        <div>
                            <div>
                                <input className="w-full border rounded py-2 px-3 mt-1 focus:outline-none focus:ring focus:border-blue-300" type="text" value={componentType} onChange={(e) => setComponentType(e.target.value)}/>
                            </div>
                            <div>
                                {unique_component_type.filter(item => {
                                    const compSearch = componentType.toLowerCase();
                                    const temp = new String(item);
                                    const compType = temp.toLowerCase();
                                    return compSearch && compType.startsWith(compSearch) && compType !== compSearch
                                })
                                
                                .map((compType)=> <div onClick={()=> setComponentType(compType)}>{compType}</div>)}
                            </div>
                        </div>
                    </div>
                    <div className="mt-6">
                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Insert
                        </button>
                    </div>
                </form>
            </div>
        </div>
        <Container width="18em">
            <Table>
        <thead>
            <tr>
              <th>Id</th>
              <th>Location</th>
              <th>Component Type</th>
            </tr>
          </thead>
          <tbody>
            {data.map((val) => (
              <tr>
                <td>{val.rid}</td>
                <td>{val.location}</td>
                <td>{val.component_type}</td>
                <td>
                  <Button
                    style={{ color: "white", backgroundColor: "blue" }}
                  >
                    Edit
                  </Button>
                </td>
                {/* <td><Button style={{color:"white",backgroundColor:"red"}} >Delete</Button></td> */}
              </tr>
            ))}
          </tbody>
          </Table>
          </Container>
        </>
    );
};

export default Inserter;
