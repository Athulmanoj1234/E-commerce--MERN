import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import './RegisterPage.css';
import { useState } from 'react';
import axios from 'axios';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState('');

  async function registerSubmit(e){
    e.preventDefault();
      const response = await axios.post('http://localhost:4000/register', {username, email, password})
      if(response.status==200) {
        alert("you have successfully registered..and you should login to and create a session");
        setRedirect(true);
      }if(username < 4 && password < 4){
        alert("please enter atleast four characters of username and password");
      }
    }
      if(redirect == true){
        return <Navigate to = {'/login'}/>
      }{/*else{
        alert("cannot back to main page page because you have entered wrong crediantials");
      }*/}   
    return (
    <div>
    <div className='register-banner'>
      <form action='/' className='register' onSubmit={registerSubmit}>
      <div className='register-form'>
        <h2>Register</h2>
        <input type='text' placeholder='Your Name' value={username} onChange={(ev) =>{ setUsername(ev.target.value)}} /><br/>
        <input type='email' placeholder='Email Address' value={email} onChange={(ev) =>{ setEmail(ev.target.value)}}/><br/>
        <input type='text' placeholder='Password' value={password} onChange={(ev) =>{ setPassword(ev.target.value)}}/><br/>
        <button type='submit'>continue</button>
        <p>Create an account? <span><Link to='/register'>click Here</Link></span></p>
        <div  className='check-para2'>
        <input type='checkbox'/>
        <p>By continuing i agree to the terms of use & privacy policy</p>
        </div>
      </div>
      </form>
    </div>
    </div>
  )
}

export default RegisterPage
