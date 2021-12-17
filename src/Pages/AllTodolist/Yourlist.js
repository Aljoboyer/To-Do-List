import React, {useState, useEffect} from 'react';
import {FloatingLabel, Card, Col, InputGroup, Row , Modal, Button, Form} from 'react-bootstrap';
import Swal from 'sweetalert2';

const Yourlist = () => {
    const [lists, setLists] = useState([]);
    const [mark, setMark] = useState(false)
    const [demo, setDemo] = useState([]);
    const [tododata, setTododata] = useState({});
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const onBlurHandler = e => {
        const dataname = e.target.name;
        const datavalue = e.target.value;

        const newdata = {...tododata}
        newdata[dataname] = datavalue;

        setTododata(newdata)
    }

    useEffect(() => {
        fetch('http://localhost:5000/alltodo')
        .then(res => res.json())
        .then(data => setLists(data))
    },[demo])
    // const lists = lists.filter(list => list.isDone !== 'done')

    //inserting complete data
    const CompleteHandler = (list) => {
        const id = list._id
        delete list['_id'];
        fetch(`http://localhost:5000/completetask/${id}`,{
            method: 'PUT',
            body: JSON.stringify(list)
        })
        .then(res => res.json())
        .then(data => {
            setDemo(lists)
            setMark(true)
            Swal.fire(
              'Good Job',
              'Your Task is Completed',
              'success'
            )
        })
    }

    const FinalDelete = (id) => {
      fetch(`http://localhost:5000/deleteone/${id}`,{
        method: 'DELETE'
      })
      .then(res => res.json())
      .then(data => {
          Swal.fire(
              'Deleted!',
              'Task  has been deleted.',
              'success'
            )
            setDemo(lists)
      })
  }

  const DeleteHandler = (id) => {
    console.log("clicked")
      Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.isConfirmed) {
              FinalDelete(id)
              
          }
        })

  }

  const updatehandler = (id) => {
    fetch(`http://localhost:5000/findupdatelist/${id}`)
      .then(res => res.json())
      .then(data => {
        setTododata(data)
        setShow(true)
      })
  }


  const SubmitHandler = () =>{
    const updatedAt = new Date().toLocaleDateString()
    
    const newdata = {...tododata, updatedAt};
    delete newdata['_id'];
    fetch(`http://localhost:5000/updatelist/${tododata._id}`,{
      method: 'PUT',
      headers: {
        'content-type':'application/json'
      },
      body: JSON.stringify(newdata)
    })
    .then(res => res.json())
    .then(data => {
      if(data.modifiedCount > 0)
      {
        Swal.fire(
          'Updated!',
          'Task Updated Successfully.',
          'success'
        )
        setDemo(lists)
        setShow(false)
      }
    })
  }
    return (
       <Row className="justify-content-center g-2 ">
     <h2 className="text-center my-4 fw-bold">Your Todo list</h2>
         
          {
               lists?.map(list =>
                <Col key={list._id} lg={4} md={6} sm={12}>
               <Card  className="taskcolam" border="dark" style={{ width: '18rem' }}>
               <Card.Header className="d-flex justify-content-between"> <h4><i  onClick={() => updatehandler(list._id)} className="far fa-edit"></i></h4> <h4><i onClick={() => DeleteHandler(list._id)} className="far fa-calendar-times"></i></h4> </Card.Header>
               <Card.Body>
                 <h6> {mark ? <i className="far fa-check-circle fa-2x az me-2"></i> : <i onClick={() => CompleteHandler(list)}  class="far fa-check-circle fa-2x me-2"></i>} Mark As Done</h6>
                 <Card.Title className="d-flex">{list.title}</Card.Title>
                 <Card.Text>
                   <p className="fw-bold text-primary">{list.taskdate}</p>
                   {list.description}
                 </Card.Text>
               </Card.Body>
               <Card.Footer className="text-muted d-flex justify-content-between"><p>Creadted At: {list.createdAt}</p>{list.updatedAt && <p>Updated At: {list.updatedAt}</p>}</Card.Footer>
             </Card>
             </Col>
             )
           }
         

         <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Your Todo List</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <Form.Group className="mb-4" as={Col} controlId="formGridEmail">
              <Form.Label className="fw-bold fs-6">Write Title</Form.Label>
              <Form.Control value={tododata.title} name="title" type="text" onChange={onBlurHandler}  />
            </Form.Group>

            <Form.Group className="mb-4" as={Col} controlId="formGridEmail">
              <Form.Label className="fw-bold fs-6">Select Date </Form.Label>
              <Form.Control value={tododata.taskdate} name="taskdate" type="date" onChange={onBlurHandler}  />
            </Form.Group>

        <FloatingLabel controlId="floatingTextarea2" label="Write Description">
            <Form.Control
            value= {tododata.description}
            name="description" onChange={onBlurHandler}
            as="textarea"
            placeholder="Write Description"
            style={{ height: '80px' }}
            />
        </FloatingLabel>
        <button onClick={SubmitHandler} className="btn btn-dark fw-bold text-warning my-4">Update to List</button>

        </Modal.Body>
        <Modal.Footer>
          <Button   className="btn btn-warning" variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
       </Row>
    );
};

export default Yourlist;