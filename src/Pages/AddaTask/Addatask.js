import React, {useState} from 'react';
import {  Form, Row, Col } from 'react-bootstrap';
import Swal from 'sweetalert2';

const Addatask = () => {
    const [tododata, setTododata] = useState({});

    const onBlurHandler = e => {
        const dataname = e.target.name;
        const datavalue = e.target.value;

        const newdata = {...tododata}
        newdata[dataname] = datavalue;

        setTododata(newdata)
    }
    const SubmitHandler = e => {
        e.preventDefault()
        const createdAt = new Date().toLocaleDateString();
        const listdata = {...tododata, createdAt }

        //adding list 
        fetch('https://stormy-ocean-88119.herokuapp.com/addinglist',{
            method: 'POST',
            headers:{
                'content-type':'application/json'
            },
            body: JSON.stringify(listdata)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            Swal.fire(
                'Your ToDo is Added',
                '',
                'success'
              )
              e.target.reset()
        })
        
    }
    return (
        <Row className="justify-content-center ">
            <Col lg={8} md={12} sm={12}>
            <h2 className="text-center my-4 fw-bold">Add Todo Task</h2>
        <Form className="addtaskform p-4"  onSubmit={SubmitHandler}> 
        <Row>

        <Form.Group className="mb-4" as={Col} controlId="formGridEmail">
              <Form.Label className="fw-bold fs-6">Write Title</Form.Label>
              <Form.Control placeholder="Write Title" name="title" type="text" onBlur={onBlurHandler}  />
            </Form.Group>

            <Form.Group className="mb-4" as={Col} controlId="formGridEmail">
              <Form.Label className="fw-bold fs-6">Select Date </Form.Label>
              <Form.Control name="taskdate" type="date" onBlur={onBlurHandler}  />
            </Form.Group>
        </Row>

        <Form.Group className="mb-4" as={Col} controlId="formGridEmail">
              <Form.Label className="fw-bold fs-6">Write Description</Form.Label>
              <Form.Control as="textarea"  style={{ height: '80px' }} placeholder="Write Description" name="description" type="text" onBlur={onBlurHandler}  />
            </Form.Group>
        <button type="submit" className="btn btn-warning fw-bold text-dark my-4">Add to List</button>
        </Form>
            </Col>
        </Row>
    );
};

export default Addatask;