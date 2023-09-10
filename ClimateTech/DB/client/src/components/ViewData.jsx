import { useState } from "react";
import { Table } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";

// import { FaTimes } from "react-icons/fa";

const ViewData = ({ data }) => {
  const [commonId, setCommonId] = useState("");
  const [id,setId] = useState("");
  const [location, setLocation] = useState("");
  const [component, setComponent] = useState("");
  const [componentType, setComponentType] = useState("");
  const [method, setMethod] = useState("");
  const [reuse,setReuse] = useState([]);
  const [recycle,setRecycle] = useState([]);
  const [reduce,setReduce] = useState([]);
  const [link, setLink] = useState("");
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleClose = (val) => {
    setShow(false);
  };

  const tempReuse = {};
  const tempReduce = {};
  const tempRecycle = {};

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

  function updateSubmission(e){
    e.preventDefault();
    UpdateRes({componentType,tempReuse:reuse,tempRecycle:recycle,tempReduce:reduce,link},commonId)
    UpdateMain({location,component,componentType},id)
    alert("Data Updated")
    window.location.reload();
  }

  function updateData(data) {
    setShow(true);
    setId(data.unique_id);
    setCommonId(data.rid);
    setLocation(data.location);
    setReuse(data.reuse);
    setReduce(data.reduce);
    setRecycle(data.recycle);
    setComponent(data.component);
    setComponentType(data.component_type);
    setMethod(data.method);
    setLink(data.link);
  }
  console.log(data);
  
  return (
    <>
      <Container width="18em">
        <Table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Location</th>
              <th>Component</th>
              <th>Component Type</th>
              <th>Reuse</th>
              <th>Reduce</th>
              <th>Recycle</th>
              <th>Link</th>
            </tr>
          </thead>
          
          <tbody>
            {data.map((val) => (
              <tr>
                
                <td>{val.rid}</td>
                <td>{val.location}</td>
                <td>{val.component}</td>
                <td>{val.component_type}</td>
                <td >
                  {(val.reuse).map((item)=>(<li>{item}</li>))}
                </td>
                <td >
                  {(val.reduce).map((item)=>(<li>{item}</li>))}
                </td>
                <td >
                  {(val.recycle).map((item)=>(<li>{item}</li>))}
                </td>
                <td><a href={val.link}>{val.link}</a></td>
                <td>
                  <Button
                    style={{ color: "white", backgroundColor: "blue" }}
                    onClick={() => updateData(val)}
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
      <Modal show={show} onHide={handleClose}>
        <Modal.Header style={{ color: "black" }} closeButton>
          Update
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Card
              style={{
                border: "shadow",
                margin: "2%",
                borderRadius: "10px",
              }}
            >
              <Form onSubmit={updateSubmission} style={{ padding: "5px" }}>
                <Row>
                  <Form.Group className="mb-3" controlId="formBasicText">
                    <Form.Label>ID</Form.Label>
                    <Form.Control
                      type="text" 
                      placeholder="Enter Name"
                      value={commonId}
                      disabled
                    />
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group className="mb-3" controlId="formBasicText">
                    <Form.Label>Location</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Name"
                      value={location}
                      onChange={(e)=>setLocation(e.target.value)}
                      required
                    />
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group className="mb-3" controlId="formBasicText">
                    <Form.Label>Component</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Name"
                      value={component}
                      onChange={(e)=>setComponent(e.target.value)}
                      required
                    />
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group className="mb-3" controlId="formBasicText">
                    <Form.Label>Component Type</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Name"
                      value={componentType}
                      onChange={(e)=>setComponentType(e.target.value)}
                      required
                    />
                  </Form.Group>
                </Row>
                {reuse.map((method, index) => (
                  <div key={index} className="mb-4">
                    <label
                      htmlFor={`method_${index}`}
                      className="block text-sm font-medium text-gray-700"
                    >
                      Reuse {index + 1}
                    </label>
                    <input
                      type="text"
                      id={`method_${index}`}
                      placeholder="Enter Method"
                      value={method}
                      onChange={(e) => setReuse(e.target.value)}
                      className="w-full border rounded py-2 px-3 mt-1 focus:outline-none focus:ring focus:border-blue-300"
                      required
                    />
                  </div>
                ))}
                {reduce.map((method, index) => (
                  <div key={index} className="mb-4">
                    <label
                      htmlFor={`method_${index}`}
                      className="block text-sm font-medium text-gray-700"
                    >
                      Reduce {index + 1}
                    </label>
                    <input
                      type="text"
                      id={`method_${index}`}
                      placeholder="Enter Method"
                      value={method}
                      onChange={(e) => setReduce(e.target.value)}
                      className="w-full border rounded py-2 px-3 mt-1 focus:outline-none focus:ring focus:border-blue-300"
                      required
                    />
                  </div>
                ))}
                {recycle.map((method, index) => (
                  <div key={index} className="mb-4">
                    <label
                      htmlFor={`method_${index}`}
                      className="block text-sm font-medium text-gray-700"
                    >
                      Recycle {index + 1}
                    </label>
                    <input
                      type="text"
                      id={`method_${index}`}
                      placeholder="Enter Method"
                      value={method}
                      onChange={(e) => setRecycle(index, e.target.value)}
                      className="w-full border rounded py-2 px-3 mt-1 focus:outline-none focus:ring focus:border-blue-300"
                      required
                    />
                  </div>
                ))}
                <Row>
                  <Form.Group className="mb-3" controlId="formBasicText">
                    <Form.Label>Link</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Name"
                      value={link}
                      onChange={(e)=>setLink(e.target.value)}
                      required
                    />
                  </Form.Group>
                </Row>
                <Row>
                  <Button
                    style={{ color: "white", backgroundColor: "blue" }}
                    type="submit"
                  >
                    Update
                  </Button>
                </Row>
              </Form>
            </Card>
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ViewData;
