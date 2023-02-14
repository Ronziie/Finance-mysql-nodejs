import React from 'react';
import { useState }  from 'react';
import "./index.css";
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Col, Row } from 'react-bootstrap';
import logo from './assets/login.svg'

//UseState OnChange grab the event (e) from the input and setting as useState --storing the input into usernameReg-- 
export default function Login() {

const [usernameReg, setUsernameReg] = useState("");
const [passwordReg, setPasswordReg] = useState("");



const [RegistrationStatus, setRegistrationStatus] = useState(""); //registration message/status useState Hook




const RegisteredSuccess = () => {
  if (passwordReg.length === 0) {  // if passwordReg (where password is stored) === equals 0 meaning nothings been typed return Input else success!
    setRegistrationStatus("Input Required!")
  } else {
    setRegistrationStatus("registered successfully!")
  }
  //setRegistrationStatus("registered successfully!");
} //useState function to display message upon successful registration


//function to call 2 onClick functions at once, both register to send data --> backend as well as to display message after registration
const reg = () => {
  RegisteredSuccess();
  register();
}

let navigate = useNavigate(); // let navigate = useNavigate in return navigate to fornt page

const LogMeIn = () => {
  return navigate("/Loggedin");
};



/*const RH = () => {
  const [show, setShow] = useState(false); //ShowRegistration Hook to show the registration

  const [showRegistration, setShowRegistration] = useState(false);
  setShowRegistration(true)
  if (showRegistration === true) {
    return "show"
  } else {
    return "hide"
  } one way to hide a component and show it */
//when you call the redirect function you return function navigate("/App")
//embedded in onClick function = when you Click on login these functions will run



//We now want to send username and Password from FrontEnd to BackEnd using Axios, by creating a function to handle this
//this function "register" uses Axios to post the username inputted from input into an object and sends to BackEnd
//the ".then promise takes the response and using console.log we will see the response if theres any error anything otherwise."
  const register = () => {
    Axios.post("http://localhost:3001/register", {
      username: usernameReg,
      password: passwordReg,
    }).then((response) => {
      console.log(response)
    });
  };

  return (
    <Container>
      <Row>
        <Col></Col>

        <Col xs={6}>
          <div className='App'>
              <h1>Welcome</h1>
              <span className='logo'>
                <img src={logo} alt="Logo" />
              </span>
              <Row>

                <Col></Col>

                <Col xs={5}>
                  <div className='registration'>
                    <h1>Registration</h1>
                      <label>Username</label>

                      <input 
                      type="text"
                      r
                      onChange={(e) => {
                        setUsernameReg(e.target.value);
                      }} 
                      required/>

                      <label>Password</label>
                      <input 
                      type="text"
                      onChange={(e) => {
                        setPasswordReg(e.target.value);
                      }} 
                      required/> 
                  </div>
                  
                      <div className="btn-reg">
                        <button type="button" class="btn btn-outline-pruma" onClick={reg}>Register</button>
                        <button type="button" class="btn btn-outline-primary" onClick={LogMeIn}>Log In</button> 
                      </div>

                      <h5>{RegistrationStatus}</h5>
                  </Col>

                  <Col>

                  </Col>
              
                </Row>


                  



            </div>
        </Col>

        <Col></Col>
      </Row>
    </Container>


  )
}
