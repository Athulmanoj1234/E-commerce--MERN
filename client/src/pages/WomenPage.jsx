import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './MenPage.css';
import WomenImg from '../assets/women 2 image new.webp';
import { Link } from 'react-router-dom';

const WomenPage = () => {

  const [ womenProducts, setWomenproducts ] = useState([]);


  useEffect(()=> {
       axios.get('http://localhost:4000/womencategory').then(response=> {
         
         setWomenproducts(response.data);
       })
  }, [])

  console.log(womenProducts);



  return (
    <div>
      <div className='header-men'>
        <div className='text-part'>
        <h2>FLAT 50% OFF</h2>
        <h4>12 Hours 20 Mins</h4>
        <button>Explore now</button>
        </div>
        <div className='image-part'>
         <img src={WomenImg} alt='men image'/>
        </div>
      </div>
      <div className='banner-men'>
        <p><span>Showing 1-12</span> out of 54 products</p>
        <div className='men-overall' style={{ display: 'flex', gap: '14rem',
        height: '69rem', flexWrap: 'wrap', justifyContent: 'space-between'
         }}>
          { womenProducts.length > 0 && (
            womenProducts.map(product=> ( 
        <div className='men-card' style={{width: '18rem'}}>
       
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

export default WomenPage
