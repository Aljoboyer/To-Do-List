import React, {useState, useEffect} from 'react';
import { Card, Col, InputGroup, Row } from 'react-bootstrap';
import Swal from 'sweetalert2';

const Completelist = () => {
    const [lists, setLists] = useState([]);
    const [demo, setDemo] = useState([])

    useEffect(() => {
        fetch('http://localhost:5000/alltodo')
        .then(res => res.json())
        .then(data => setLists(data))
    },[demo])
    const newlist = lists.filter(list => list.isDone === 'done')
    
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

    const ClearHanlder = () => {
        fetch('http://localhost:5000/deletealldone',{
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(data => {
            Swal.fire(
                'Deleted!',
                'All Completed Task is Cleared.',
                'success'
              )
              setDemo(lists)
        })
    }

 
    return (
        <Row className="justify-content-center gy-3 ">
        <h2 className="text-center my-4 fw-bold">Your Completed Task list</h2>
        <button onClick={ClearHanlder} className='btn btn-dark fw-bold text-warning'>Clear All</button>
            
             {
                  newlist?.map(list =>
                   <Col  key={list._id} lg={4} md={6} sm={12}>
                  <Card className='taskcolam' border="dark" style={{ width: '18rem' }}>
                  <Card.Header className="d-flex justify-content-between">  <h4><i onClick={() => DeleteHandler(list._id)}  className="far fa-calendar-times"></i></h4> </Card.Header>
                  <Card.Body>
                  <h6> <i className="far fa-check-circle fa-2x az me-2"></i>Task Completed</h6>
                    <Card.Title className="d-flex">{list.title}</Card.Title>
                    <Card.Text>
                      {list.description}
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer className="text-muted d-flex justify-content-between"><p>Creadted At: {list.createdAt}</p>{list.updatedAt && <p>Updated At: {list.updatedAt}</p>}</Card.Footer>
                </Card>
                </Col>
                )
              }
            
          </Row>
    );
};

export default Completelist;