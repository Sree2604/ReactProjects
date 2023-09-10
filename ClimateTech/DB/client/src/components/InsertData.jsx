import { useState } from "react";
// import "InsertData.css";
import Button  from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
const InsertData = () => {

  return (
    <>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>Component Type</Form.Label>
          <Form.Control
            type="text"
            className="w-full border rounded py-2 px-3 mt-1 focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Enter Name"
            // value={commonId}
            disabled
          />
        </Form.Group>
        <Row id='methods'>
        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>Methods</Form.Label>
          <Form.Control
            type="text"
            className="w-full border rounded py-2 px-3 mt-1 focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Enter Name"
            // value={commonId}
          />
        </Form.Group>
        </Row>
        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>ID</Form.Label>
          <Form.Control
            type="text"
            className="w-full border rounded py-2 px-3 mt-1 focus:outline-none focus:ring focus:border-blue-300" 
            placeholder="Enter Name"
            // value={commonId}
            disabled
          />
        </Form.Group>
      </Form>
    </>
  );
};

export default InsertData;
