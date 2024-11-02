import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MenPage.css';
import { Link } from 'react-router-dom';


const Electronicappliances = () => {

    const [ electronicProducts, setElectronicproducts ] = useState([]);


    useEffect(()=> {
         axios.get('http://localhost:4000/electronicscategory').then(response=> {
           
           setElectronicproducts(response.data);
         })
    }, [])
 
    console.log(electronicProducts);

  return (
    <div>
      <div className='header-men'>
        <div className='text-part'>
        <h2>FLAT 30% OFF</h2>
        <h4>16 Hours 20 Mins</h4>
        <button>Explore now</button>
        </div>
        
      </div>
      <div className='banner-men'>
        <p><span>Showing 1-12</span> out of 54 products</p>
        
       <div className='men-overall' style={{ display: 'flex', gap: '14rem',
        height: '69rem', flexWrap: 'wrap', justifyContent: 'space-between'
         }}>
       { electronicProducts.length > 0 && (  
          electronicProducts.map(product=> (   
        <div className='men-card'>
        
          <Link to={`/product/${product._id}`}><img src={`http://localhost:4000/${product.productCover}`} alt='men-image' style={{ height: '12rem', width: '12rem' }}/></Link>
          <Link to={`/product/${product._id}`} style={{textDecoration: 'none', color: 'black'}}><h4>{product.title}</h4></Link>
          <Link to={`/product/${product._id}`} style={{textDecoration: 'none', color: 'black'}}><p>{product.offerprice}</p></Link>
    
        </div>
            ) ) ) }
        </div>
        
      </div>  
    </div>
  )
}

export default Electronicappliances
