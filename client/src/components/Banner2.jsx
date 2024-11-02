import React, { useEffect, useState } from 'react'
import './Banner.css';
import NewCollections from './NewCollections';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaInstagramSquare } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareWhatsapp } from "react-icons/fa6";

const Banner2 = () => {
const [product, setProduct] = useState([]);
  
useEffect(()=> {
  axios.get('http://localhost:4000/adminproduct').then(response=>{
    setProduct(response.data);
    
  })
},[])  

  return (
    <>
      <div className='second-banner'>
      <div className='banner2-1'>
      <div className='text-banner2'>
      <h2 className='heading-1'>Exclusive <br/> Offers For You</h2>
      <h2 className='heading-2'>ONLY IN BEST SELLER PRODUCTS</h2>
      <Link to='/checknow'><button className='seller-button'>Check now</button></Link>
     </div>
     </div>
     <div className='third-banner'>
     <h2>NEW COLLECTIONS</h2>
    
     <div className='newcollections-card'>
      <div className='card-overall1'>
     { product.length > 0 && product.map(eachproduct=> (
         <NewCollections {...eachproduct}/>
      ))}
      </div>
      </div>
     
     </div>
     </div>
     <div className='fourth-banner'>
      <div className='fourth-first'>
       
      </div>
      <div className='fourth-second'>
       <h1>SHOPPER</h1>
       <div className='about-contact'>
       <p>Company</p>
       <p>Products</p>
       <p>Offices</p>
       <p>About</p>
       <p>Contact</p>
       </div>
       <div className='whatsapp-facebook-icons'>
       <FaInstagramSquare />
       <FaFacebookSquare />
       <FaSquareWhatsapp />
       </div>
       <p>Copyright @ 2023-All Right Reserved</p>
       </div>
       </div>
     </>
    )
}

export default Banner2
