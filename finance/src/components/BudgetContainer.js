import React, { useState, useEffect } from 'react'
import BudgetDashboard from './BudgetDashboard'
import '../styles/BudgetContainer.css'
import {Row, Col} from 'react-bootstrap'
import Chart from './Chart'


export default function BudgetContainer() {
    const expenseList = JSON.parse(localStorage.getItem("expenseList"));
    const incomeList = JSON.parse(localStorage.getItem("incomeList"));
    const revenue = incomeList.map(item => item.amount).reduce((prev, next) => prev + next);
    const costs = expenseList.map(item => item.amount).reduce((prev, next) => prev + next);
    const balance = (revenue - costs)
    

    const [totalRevenue, setTotalRevenue] = useState();
    
    useEffect(() => {
        setTotalRevenue(revenue);
    })

  return (
    <div className='budget-container'>
        <div className='app-title'>Finance App</div>
        <div className='budget-header'>
            <div className='title'>Balance</div>
            <div className='value'>£{balance}</div>
        </div>
        <div className='account' >
            <Row>
                <Col>  
                    <div className='income'>
                        <div className='Income'>Income</div>
                        <div className='income-total' style={{color: "green"}}>{totalRevenue}</div>
                    </div>
                </Col>

                <Col xs={5}><div className='chart'><Chart /></div></Col>

                <Col>
                    <div className='outcome'>
                        <div classname='title'>Outcome</div>
                        < div className='outcome-total' style={{color: "red"}}>{costs}</div>
                    </div>
                </Col>

            </Row>
        </div>
        <BudgetDashboard />
    </div>
    
  )
}
