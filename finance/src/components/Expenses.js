
import React, { useEffect } from 'react'
import { useState } from 'react'
import '../styles/BudgetContainer.css'
import Task from './Task'
import {Row, Col} from 'react-bootstrap';
import Axios from 'axios';

export default function Expenses() {
    //task ==== expense-title-input

    const [taskName, setTaskName] = useState('')

    const [taskList, setTaskList] = useState(()=>{
      return JSON.parse(localStorage.getItem('expenseList')) || []
    })

    const [expenseAmount, setExpenseAmount] = useState()

    useEffect(()=> {
      if (taskList.length > 0 ) {
        return window.localStorage.setItem('expenseList', JSON.stringify(taskList))
      }
    }, [taskList])

    const expenseData = () => {
      Axios.post("http://localhost:3001/expenseData", {
        expenseName: taskName,
        expenseAmount: expenseAmount, 
      }).then((response => {
        console.log(response)
      }));
    };
    
    const addTask = () => { //onClick function everytime you click on addTask these functions run
      setTaskList([...taskList, {id: Math.floor(Math.random() * 1000), task: taskName, amount: expenseAmount}]) //LOOK INTO OBJECT/ARRAY DESTRUCTURING  ...is to add a new old array then new array/object 
      setTaskName(''); //everytime you click on button it will clear input with empty string ''
      setExpenseAmount(0) // everytime click on addtask set expense amount back to empty string
      console.log(taskList)
      expenseData();
    }

    const handleSubmit = (e) => {
      e.preventDefault();
    }

  

    console.log(taskList)
  return (
    <div id='expense'> 
      <Row className='expense-header'>
        <Col><div className="expense-header-name">Expense: {taskName}</div></Col>
        <Col><div className='expense-header-amount'>£{expenseAmount}</div></Col>
      </Row>

        <div className='expense-list' style={{overflowY: "scroll"}}>
          <ul>
            {taskList.map((expense)=> {
              return <Task 
              keyid={expense.id}
              key={expense.id} 
              taskName={expense.task} 
              expenseAmount={expense.amount}
              taskList={taskList}
              expense={expense} //this is the object name within the array!
              setTaskList={setTaskList}/> 
            })}
          </ul>

        </div>


      <form className='input' onSubmit={handleSubmit}>
          <input type="text" id="expense-title-input" name='text' value={taskName} placeholder='Expense' onChange={(e)=> {setTaskName(e.target.value)}}></input>
          <input type="number" id="expense-amount-input" name='amount' value={expenseAmount} placeholder='£' onChange={(e) => {setExpenseAmount(parseInt(e.target.value))}}></input>
          <button id='addBtn' class='btn btn-outline-dark' type='submit' onClick={addTask} >add</button>
      </form> 
    </div>
 )
}

//------explanation---//
// 3 useStates Name of expense amount of expense and list of expense
//