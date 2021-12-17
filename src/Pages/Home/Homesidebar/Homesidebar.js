import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { Link} from 'react-router-dom';

const Homesidebar = () => {
    return (
    <ListGroup className="mt-4">
        <ListGroup.Item as={Link} to="/">Home</ListGroup.Item>
        <ListGroup.Item as={Link} to="/yourlist" action variant="secondary">Your List <i className="fas fa-clipboard-list"></i></ListGroup.Item>
        <ListGroup.Item as={Link} to="/completelist" action variant="success">Completed List</ListGroup.Item>
    </ListGroup>
    );
};

export default Homesidebar;