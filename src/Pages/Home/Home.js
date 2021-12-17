import React, {useState} from 'react';
import { Col, FloatingLabel, Form, Row } from 'react-bootstrap';
import Navbars from './Navbars/Navbars';

const Home = () => {
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
        const listdata = {...tododata, createdAt}
        console.log(listdata)
    }
    return (
        <div className="container-fluid">
            <Navbars></Navbars>
            <h2 className="text-center my-4 fw-bold">This is a Todo list</h2>
            <Row className="justify-content-center">
                <Col lg={7} md={10} sm={12}>
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
                </Col>
            </Row>
        </div>
    );
};

export default Home;