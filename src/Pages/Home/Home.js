import React from 'react';
import { Col, Row } from 'react-bootstrap';
import Navbars from './Navbars/Navbars';

import {
    Outlet
  } from "react-router-dom";
import Homesidebar from './Homesidebar/Homesidebar';
const Home = () => {

    return (
        <div className="container-fluid">
            <Navbars></Navbars>
    
            <Row className="justify-content-center">
               <Col lg={2}>
                   <Homesidebar></Homesidebar>
               </Col>
               <Col lg={10} md={10} sm={12}>
                    <Outlet/>
                </Col>
            </Row>
        </div>
    );
};

export default Home;