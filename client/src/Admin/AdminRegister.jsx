import React, { useState } from 'react';
import './Admin.css';
import axios from 'axios';
import { Navigate } from 'react-router-dom';


const AdminRegister = () => {
  const [businessname, setBusinessname] = useState('');
  const [files, setFiles] =useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
   
async function registerSubmit(e){
 
    e.preventDefault();
   
    const data = new FormData();
    data.set('businessname', businessname);
    data.set('files', files[0]);
    data.set('password', password);

    const response = await axios.post('http://localhost:4000/adminregister', data);
    console.log(response.data); 

    if(response.status == 200){
        setRedirect(true);
    }else{
        alert('failed to register you dont enter correct credentials');
    }
}
    if(redirect == true){
      alert('you have successfully registered..and login to continue with new business session');
       return <Navigate to = '/business-login'  />
    }
  
  return ( 

    <div>
      <form action="" className="register" onSubmit={registerSubmit} >
            <h1>register</h1>
             <input type="text" placeholder="business name" value={businessname} onChange={ev=> {setBusinessname(ev.target.value)}} />
             <label for="upload-file">Upload File</label>
             <input id="upload-file" type="file" onChange={ev=> setFiles(ev.target.files)}/>
             <input className='register-password' type="text" placeholder='password' value={password} onChange={ev=> {setPassword(ev.target.value)}}/>
             <button className='register-button'>Register</button>
         </form>
    </div>
  )
}

export default AdminRegister
