import React, { useEffect } from 'react'
import {useState} from 'react';
import '../styles/BudgetContainer.css';
import Axios from 'axios';



export default function Income() {
  
  const [incomeName, setIncomeName] = useState('')
  const [incomeAmount, setIncomeAmount] = useState()

  const [incomeList, setIncomeList] = useState(() => { // set usestate as information in local storage otherwise set as empty array
    return JSON.parse(localStorage.getItem('incomeList')) || [] 
  })

  const [dbIncomeList, setdbIncomeList] = useState([])

  const [isEditing, setIsEditing] = useState(false) //boolean value for editing
  const [currentObject, setCurrentObject] = useState({}) //value for current object selected


  useEffect(()=> {
    if (incomeList.length > 0) {
      localStorage.setItem('incomeList', JSON.stringify(incomeList))
    }
  }, [incomeList])

//AXIOS POST SENDS INFORATION TO SERVER
  const incomeData = () => {
    Axios.post("http://localhost:3001/incomeData", {
      incomeName: incomeName,
      incomeAmount: incomeAmount, 
    }).then((response) => {
      console.log(response)
    });
  };

//AXIOS GET RECIEVES INFORMATION FROM SERVER
  const getSqlIncomeList = () => {
    Axios.get('http://localhost:3001/getIncome').then((response) => {
      console.log(response)
      setdbIncomeList(response.data.incomeName, response.data.incomeAmount)
      
    })
  }
  

  const submitHandler = (e) => {
    e.preventDefault(); //prevent default refresh behaviour
    
    setIncomeName('');
    setIncomeAmount('');
  }
  const addIncome = () => {
    //onclick addIncome we add the income  and income amount into income list
      setIncomeList([...incomeList, {id: Math.floor(Math.random() * 1000), name: incomeName, amount: incomeAmount}])
      incomeData();
    console.log(incomeList)
    
  }

  //function to get value of edit input and set new state


  const editHandler = (object) => { //by adding the entire object (object) to the function we can access it
    //When set to true the edit form is shown
    setIsEditing(true);
    //set current object to the item that was just clicked
    setCurrentObject({ ...object });
    console.log(currentObject)
  }

  const onChangeEditHandler = (e) => {
    setCurrentObject({...currentObject, name: e.target.value});
    console.log(currentObject)
  }

  const deleteHandler = (object) => { // we pass entire "object" as an arguement
    //we set "setCurrentObject" to the current object clicked
    setCurrentObject({ ...object });
    //we set "setIncomeList" to the incomeList filtered to remove where filter id is not equal to object id
   setIncomeList(incomeList.filter((i)=> i.id !== object.id))

  }

  
  const updateObject = (id, updatedObject) => {
    //here we map over the incomeList array of objects - check if object.id matches id we pass into function
    //if the id's match pass into updatedObject otherwise use old object //use of (s) for easy read in english
    const updatedItem = incomeList.map((objects) => {
      return objects.id === id ? updatedObject : objects;
    })
    console.log(updatedItem)

    //setEditing to false because we have submitted the data and no longer editing
    setIsEditing(false);
    
    //onsubmit update the list state with updated object information
    setIncomeList(updatedItem)
  }

  const editSubmit = (e) => {
    e.preventDefault();

    //call the updateObject function passing the currentObject.id and currentObject as arguements
    updateObject(currentObject.id, currentObject);
    console.log(updateObject)
  }


  const click = () => {
    getSqlIncomeList();
    console.log(dbIncomeList)
    
  }
  

  

  return (

    <div id='income'>

      <div className='income-list' style={{overflowY: "scroll"}}>
        list BudgetContainer
        <button onClick={click}>button</button>


          {incomeList.map((object) => (
          
          <div className='task-success' key={object.id}>
             {object.name} £{object.amount} 
            <button id='ListBtn' class='btn btn-outline-dark' onClick={() => {deleteHandler(object)}} >Delete</button>
            {/* when clicked we are passing the entire incomeList object named {object} as an arguement*/}
            <button id='ListBtn' class='btn btn-outline-success' onClick={() => {editHandler(object)}}>Edit</button>
          </div> 
          
          ))}

         
          

      </div>


    { isEditing ? (
          <div className='edit-form'>
            <form className='input-edit' onSubmit={editSubmit}>
              <input type='text' id='income-title-input' placeholder='Edit income' value={currentObject.name || ''} onChange={onChangeEditHandler}></input>
              <input type='number' id='income-amount-input' placeholder='Edit £' value={incomeAmount || ''} onChange={(e)=> {incomeAmount(parseInt(e.target.value))}}></input>
              <button type='submit 'id='addBtn' class='btn btn-outline-dark' onClick={updateObject}> Update </button>
              <button type='button' id='CancelBtn'  class='btn btn-outline-primary' onClick={()=> {setIsEditing(false)}}> Cancel</button>
            </form> 
          </div>
    ) : (

      <form className='input' onSubmit={submitHandler}>
        <input type='text' id='income-title-input' placeholder='income' value={incomeName} onChange={(e) => {setIncomeName(e.target.value)}}></input>
        <input type='number' id='income-amount-input' placeholder='£' value={incomeAmount || ''} onChange={(e) => {setIncomeAmount(parseInt(e.target.value))}}></input>
        <button type='submit' id='addBtn'   class='btn btn-outline-dark' onClick={addIncome}> add </button>
      </form>
    )}
         
    </div>

    )
}
