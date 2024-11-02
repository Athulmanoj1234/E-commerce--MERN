import React, { useContext, useState } from 'react';
import './LoginPage.css';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../userContext';


const LoginPage = () => {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [redirect, setRedirect] = useState('false');
   const {setUserInfo} = useContext(UserContext);

async function loginSubmit(ev){
  ev.preventDefault();
  const response = await axios.post('http://localhost:4000/login', {email, password}, {withCredentials: true});
  console.log(response.data);

  if(response.status == 200){
    const userInfo = response.data;
    setUserInfo(userInfo);
    alert("you have logged in");
    setRedirect(true);
  }else{
    alert("you have entered incorrect email and password");
  }
}
if(redirect == true){
  return <Navigate to={'/'}/>
}
return (
    <div>
    <div className='login-banner'>
      <form action='/' onSubmit={loginSubmit}>  
      <div className='login-form'>
        <h2>Login</h2>
        <input type='email' placeholder='Email Address' value={email} onChange={(ev)=> setEmail(ev.target.value)} /><br/>
        <input type='text' placeholder='Password' value={password} onChange={(ev)=> setPassword(ev.target.value)} /><br/>
        <button type='submit'>continue</button>
        <p>Create an account? <span><Link to='/register'>click Here</Link></span></p>
        <div  className='check-para'>
        <input type='checkbox'/>
        <p>By continuing i agree to the terms of use & privacy policy</p>
        </div>
      </div>
      </form>
    </div>
    </div>
  )
}

export default LoginPage