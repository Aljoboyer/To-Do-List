import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { Link} from 'react-router-dom';

const Homesidebar = () => {
    return (
    <ListGroup className="mt-4 all">
        <ListGroup.Item action variant="secondary" className="sidetxt fw-bold fs-5 my-2" as={Link} to="/">Add Task</ListGroup.Item>
        <ListGroup.Item className="sidetxt fw-bold fs-5 my-2" as={Link} to="/yourlist" action variant="secondary">Your List <i className="fas fa-clipboard-list"></i></ListGroup.Item>
        <ListGroup.Item className="sidetxt fw-bold fs-5 my-2" as={Link} to="/completelist" action variant="secondary">Completed List</ListGroup.Item>
    </ListGroup>
    );
};

export default Homesidebar;