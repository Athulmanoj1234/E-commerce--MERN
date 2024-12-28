import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './MenPage.css';
import KidsHeader from '../assets/kids2.1 image new.jpg'
import KidsImg from '../assets/kids 2 image new.jpeg';
import { Link } from 'react-router-dom';

const KidsPage = () => {

  const [ kidsProducts, setKidsproducts ] = useState([]);


   useEffect(()=> {
        axios.get('http://localhost:4000/kidscategory').then(response=> {
          
          setKidsproducts(response.data);
        })
   }, [])

   console.log(kidsProducts);


  return (
    <div>
      <div className='header-men'>
        <div className='text-part'>
        <h2>FLAT 50% OFF</h2>
        <h4>12 Hours 20 Mins</h4>
        <button>Explore now</button>
        </div>
        <div className='image-part'>
         <img src={KidsHeader} alt='men image'/>
        </div>
      </div>
      <div className='banner-men'>
        <p><span>Showing 1-12</span> out of 54 products</p>
        
       <div className='men-overall' style={{ display: 'flex', gap: '14rem',
        height: '69rem', flexWrap: 'wrap', justifyContent: 'space-between'
         }}>
       { kidsProducts.length > 0 && (  
          kidsProducts.map(product=> (   
        <div className='men-card' style={{width: '14rem'}}>
       
          <Link to={`/product/${product._id}`}><img src={`http://localhost:4000/${product.productCover}`} alt='men-image' style={{ height: '12rem', width: '12rem' }}/></Link>
          <Link to={`/product/${product._id}`} style={{textDecoration: 'none', color: 'black'}}><h4>{product.title}</h4></Link>
          <Link to={`/product/${product._id}`} style={{textDecoration: 'none', color: 'black'}}><p>Rs.{product.offerprice}</p></Link>
    
        </div>
            ) ) ) }
        </div>
        
      </div>  
    </div>
  )
}

export default KidsPage;
