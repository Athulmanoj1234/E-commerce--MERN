import React, { useContext, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import {FaShoppingCart} from 'react-icons/fa';
import './App.css';
import { UserContext } from './userContext';
import axios from 'axios';
import Cookies from 'js-cookie';


const Header = () => {
  
  const {userInfo, setUserInfo} = useContext(UserContext); 

  useEffect(() => {
    axios.get('http://localhost:4000/profile', {withCredentials: true})
       .then(response =>{
        const userInfo = response.data;
        setUserInfo(userInfo);
        console.log(userInfo);
        console.log(userInfo.email);
       })
      .catch(error => {
        console.error('Error fetching profile:');
      });
  },[]);

async function logout() {
    try {
        const response = await axios.post('http://localhost:4000/logout',{}, { withCredentials: true });
        console.log(response.data.message); // Log the success message from the server
        setUserInfo(null); // Clear the user info in the context
    } catch (error) {
        console.error("Error logging out:", error); 
    }
}

{/*if(userInfo == null){
  return <Navigate to={'/'}/>
}else{
  alert("you cannot logout now there is some internal error");
}*/}
     const email = userInfo?.email;   
     console.log(email);
return (
    <div>
      <header className='header-container'>
      <Link to='/' className='logo'>SHOPPER</Link>
      <nav>
        <Link to='/shop' className='nav-items'>Shop</Link>
        <Link to='/phones' className='nav-items'>Phones</Link>
        <Link to='/eletronics' className='nav-items'>Electronic appliances</Link>
        <Link to='/men' className='nav-items'>Men</Link>
        <Link to='/women' className='nav-items'>Women</Link>
        <Link to='/kids' className='nav-items'>Kids</Link>
        { email && (
        <div className='email-logout'>
        <p>{email}</p>
        <a onClick={logout}>Logout</a>
        </div>
        )}
        { !email && (
        <>
        <Link to='/login' className='nav-items'>login</Link>
        </>
        )}  
        <Link to='/cart' className='nav-items'><FaShoppingCart/></Link>
      </nav>
      </header>
    </div>
  )
}

export default Header;
