import React, {useState} from 'react';
import { FloatingLabel, Form, Row } from 'react-bootstrap';
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
        fetch('http://localhost:5000/addinglist',{
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
        <Row className="justify-content-center">
        <h2 className="text-center my-4 fw-bold">Add a Task To-Do list</h2>
        <Form  onSubmit={SubmitHandler}> 
        <FloatingLabel
            controlId="floatingInput"
            label="Write Title"
            className="mb-3"
        >
            <Form.Control name="title" onBlur={onBlurHandler} type="text" placeholder="Enter Title" />
        </FloatingLabel>
        <FloatingLabel controlId="floatingTextarea2" label="Write Description">
            <Form.Control
            name="description" onBlur={onBlurHandler}
            as="textarea"
            placeholder="Write Description"
            style={{ height: '80px' }}
            />
        </FloatingLabel>
        <button type="submit" className="btn btn-dark fw-bold text-warning my-4">Add to List</button>
        </Form>
        </Row>
    );
};

export default Addatask;