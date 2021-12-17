import React, {useState, useEffect} from 'react';
import { Card, Col, InputGroup, Row } from 'react-bootstrap';

const Yourlist = () => {
    const [lists, setLists] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/alltodo')
        .then(res => res.json())
        .then(data => setLists(data))
    },[])
    return (
       <Row className="justify-content-center g-2">
     <h2 className="text-center my-4 fw-bold">Your Todo list</h2>
         
          {
               lists?.map(list =>
                <Col lg={4} md={6} sm={12}>
               <Card border="dark" style={{ width: '18rem' }}>
               <Card.Header className="d-flex justify-content-between"> <h4><i className="far fa-edit"></i></h4> <h4><i className="far fa-calendar-times"></i></h4> </Card.Header>
               <Card.Body>
                 <Card.Title className="d-flex"><InputGroup.Checkbox/>{list.title}</Card.Title>
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

export default Yourlist;