import React from 'react'
import { useState }  from 'react';
import "./index.css";
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Col, Row } from 'react-bootstrap';
import logo from './assets/login.svg'

export default function Loggedin() {

  const [usernameLogin, setUsernameLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");


  const [LoginStatus, setLoginStatus] = useState(""); //LoginStatus Hook to show errors retrieving details from database
  let navigate = useNavigate(); // let navigate = useNavigate in return navigate to fornt page

  const RegisterHere = () => {
    return navigate("/Register")
  }

  const Logins = () => {
    Axios.post("http://localhost:3001/login", {
      username: usernameLogin,
      password: passwordLogin,
    }).then((response) => {
      console.log(response);
      if (response.data.message) {
        setLoginStatus(response.data.message); // if response.data(which is the object).message is found return setLoginStatus as response.data.message which is an h5 string
            } else if (passwordLogin.length === 0) { //else if password inputted characters is = 0 
              return window.alert("Please input your login details")// return pop up window saying input something
            } else {
              return navigate("/App") // if all is false navigate to dashboard/APP
            }
            
    })
  }//this function Logins is sending an object called usernameLogin & passwordLogins to the backend as an object
  return (
    <Container>
    <Row>
      <Col></Col>

      <Col xs={6}>
        <div className='App'>
            <h1>Log Into Your Account</h1>
            <span className='logo'>
              <img src={logo} alt="Logo" />
            </span>
            <Row>

              <Col></Col>

              <Col xs={5}>
                  <div className='login'>
                    <h1>Login</h1>
                    <label>Username</label>
                    <input type="text" placeholder='Username' onChange={(e) => {setUsernameLogin(e.target.value)}}></input>
                    <label>Password</label>
                    <input type="text" placeholder="password" onChange={(e) => {setPasswordLogin(e.target.value)}}></input>
                    <h5>{LoginStatus}</h5>
                  </div>

                    <div className="btn-reg">
                      <button type="button" class="btn btn-outline-dark" onClick={Logins}>Login</button>
                      <button type='button' class="btn btn-outline-primary"  onClick={RegisterHere}>Register</button>
                    </div>
                </Col>

                <Col>
                <div className='Register-Here'>
                  <h1>Not Registered yet?</h1>
                 
                </div>
                
                  
                </Col>


            
              </Row>


                



          </div>
      </Col>

      <Col></Col>
    </Row>
  </Container>


  )
}
