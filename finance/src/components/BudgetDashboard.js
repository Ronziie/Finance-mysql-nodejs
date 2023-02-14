import React from 'react'
import Expenses from './Expenses'
import Income from './Income'
import All from './All'
import { Col, Row } from 'react-bootstrap'
import { useState } from 'react'



export default function BudgetDashboard() {

    const [active, setActive] = useState("");
    const styles = {
      row: {
        marginRight: 0,
        marginLeft: 0,
      }
    }

   
  return (
    <div className='budget-dashboard'>
        <div className='dash-title'>Dashboard</div>

    <Row style={styles.row}>
        <Col><button class='btn btn-outline-primary' onClick={() => setActive("Expenses")}>Expenses</button></Col>
        <Col><button class='btn btn-outline-primary' onClick={() => setActive("Income")}>Income</button></Col>
        <Col>
          <button class='btn btn-outline-primary' onClick={() => setActive("All")}>  All  </button>
        </Col>
    </Row>

    <div>
        {active === "Expenses" && <Expenses />}
        {active === "Income" && <Income />}
        {active === "All" && <All  />}
    </div>


    </div>
  )
}
