import React, { useContext, useState } from 'react'
import './Admin.css';
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';
import { UserContext } from '../userContext';

const AdminLogin = () => {
 const [businessname, setBusinessname] = useState('');
 const [businessPassword, setBusinesspassword] = useState('');
 const [redirect, setRedirect] = useState(false);

 const {setBusinessInfo} = useContext(UserContext);

async function adminLogin(ev){
    ev.preventDefault();
    const response = await axios.post('http://localhost:4000/adminlogin',
         {businessname, businessPassword},
         {withCredentials: true});
    
    const businessInfo = response.data;
    
    if(response.status == 200){
        setBusinessInfo(businessInfo);
        setRedirect(true);
        alert("you have logged in to the admin");
    }else{
        alert("wrong admin creadentials");
    }
}
    if(redirect == true){
      return <Navigate to = '/addproduct'/>
    }
return (
    <div>
        <form action="" className="login" onSubmit={adminLogin}>
            <h1>login</h1>
             <input type="text" placeholder="business name" value={businessname} onChange={ev=> {setBusinessname(ev.target.value)}} />
             <input type="text" placeholder="password" value={businessPassword} onChange={ev=> {setBusinesspassword(ev.target.value)}} />
             <button className='login-button'>Login</button><br/>
             <p className='parato-register'>Create an account? <Link to='/business-register'><span>Register</span></Link></p>
        </form>
    </div>
    )
}
export default AdminLogin;