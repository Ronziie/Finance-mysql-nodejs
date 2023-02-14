import React from 'react';
//import styled from 'styled-components';
//import Sidebar from './components/Sidebar'
//import RightSidebar from './components/RightSidebar'
//import Dashboard from './components/Dashboard'
//import Daashboard from './components/Daashboard';
import BudgetContainer from './components/BudgetContainer.js';
import { Container, Row, Col } from 'react-bootstrap';




function App() {
  return (
    <Container fluid>
      <BudgetContainer />
    </Container>

  )
}
export default (App);
/*const Div = styled.div `
position: relative;
`;      <Row>
        <Col><Sidebar /></Col>
        <Col xs={12}> <Dashboard /></Col>
        <Col><RightSidebar /></Col>
      </Row>*/