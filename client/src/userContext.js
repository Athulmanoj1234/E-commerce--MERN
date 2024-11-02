import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext({});

export function UserContextProvider({children}){
    const [userInfo, setUserInfo] = useState({});
    const [businessInfo, setBusinessInfo] = useState({});

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
  
  return(
        <UserContext.Provider value={{userInfo, setUserInfo, businessInfo, setBusinessInfo}}>
            {children} 
        </UserContext.Provider>
    )

} 