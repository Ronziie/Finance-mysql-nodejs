import React from 'react'
import '../styles/BudgetContainer.css'
import {Row, Col} from 'react-bootstrap'

export default function Task({setTaskName, taskName, expenseAmount, taskList, setTaskList, expense, setEdit, editState }) {
  


  const deleteHandler = () => { // 4 days to figure out to use id instead of using task.
    setTaskList(taskList.filter((item) => item.task !== expense.task))    
  }
 
  const editHandler = (e) => {
        //const editList = taskList.find((i) => i.task === expense.task)
    }

     // finds the object within the array
    //TASK is to edit the name within the object
    //console.log(keyid)
    //console.log(expense.task)
    //console.log(setTaskList(editList.expense.task))
    //console.log(...taskList)
    //console.log(...taskList) // could the eclipse destructer the array into objects?



  return (
    <div>
        <div className='task-danger'>
          <Row>

            <Col>
                <div>
                  <h3>{taskName} = £{expenseAmount}</h3>
                </div>
            </Col>

            <Col><button class='btn btn-outline-success' onClick={editHandler}>Edit</button> <button class="btn btn-outline-dark" onClick={deleteHandler}>delete</button></Col>
          </Row>   
        </div>
    </div>
  )
}
