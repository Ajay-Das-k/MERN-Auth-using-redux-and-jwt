import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col, FormGroup } from "react-bootstrap";
import FormContainer from "../components/FormContainer";

const LoginScreen = () => {
     const [email, setEmail] = useState("");
     const [password, setPassword] = useState("");
     const submitHandler= async (e) =>{
      e.preventDefault();
      console.log("submited");
     }
  return (
   <FormContainer>
   <h1>
    SignIn
   </h1>
   <Form onSubmit={submitHandler}> 
    <FormGroup className="my-3" controlId="email">
      <Form.Label>E-mail Address</Form.Label> 
      <Form.Control
      type='email' 
      placeholder="Enter your Email"
      value={email}>
      </Form.Control>
    </FormGroup>
   </Form>

   </FormContainer>
  );
};

export default LoginScreen;
