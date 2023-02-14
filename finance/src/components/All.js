import React, { useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import { useState } from 'react'

export default function All() {
  
  const [total, setTotal] = useState()

  //set local(list) = local storage keys which are the lists
  const localExpenseList = JSON.parse(localStorage.getItem('expenseList'));
  const localIncomeList = JSON.parse(localStorage.getItem('incomeList'));
  

  //const jointList = [...localExpenseList, ...localIncomeList];
  
  // Adding the income list amount && adding the expense list amount
  const revenue = localIncomeList.map(item => item.amount).reduce((prev, next) => prev + next);
  console.log(revenue)

  const costs = localExpenseList.map(item => item.amount).reduce((prev, next) => prev + next);
  console.log(costs)

  
  //profit formula = revenue - costs
  const profit = (revenue - costs);
  
  //sets the profit of amount into a state and then displays
  useEffect(() => {
    setTotal(profit);
  }, [profit]);
  
  /*if (localStorage.getItem("expenseList") && (localStorage.getItem("incomeList")) === 0) {
    console.log("no dataaaaa")
  } else {
    console.log(" baree  dataaaa")
  } */
  

 
  return (
    <div className='All'>
    <div className='total-costs' style={{overflowY: "Scroll"}}>

    {localExpenseList.map((object) => (<div className='task-danger' key={object.id}>{object.task}={object.amount}</div>))}
    {localIncomeList.map((object) =>(<div className='task-success' key={object.id}>{object.name}={object.amount}</div>))}
    </div>
    <div className='balance'>
      <Row>
        <Col><h2 style={{color:  (profit > 0) ? "green" : "red"}}>Balance</h2></Col>
        <Col><div className='balance-amount'><h2 style={{ color: (profit > 0) ? "green" : "red"}}>£{total}</h2></div></Col>
      </Row>
    </div>



  </div>
  )
}


//TASK - app crashes when theres no lists? why 

//why can't i put ( {map over something} )
// get app not to crash when no data present
// update the sum dynamically, right now need to refresh for it to update again

  