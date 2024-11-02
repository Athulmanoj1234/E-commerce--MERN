import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Banner.css';
import MensShoppingImage from '../assets/mens shopping 2.png'
import MensPopular from '../assets/MensTshirt.jpg'
import { Link } from 'react-router-dom';
import Banner2 from './Banner2';

const Banner = () => {
   
  const [menProducts, setMenproducts] = useState([]);

   useEffect(()=> {

         axios.get('http://localhost:4000/mencategory').then(response=> {
            setMenproducts(response.data);
               })
           },[])
    
  return (
   <div className='full-banner'>
    <div className='banners'>
     <div className='text-banner'>   
      <h3 className='new-arrive'>NEW ARRIVALS ONLY</h3>
      <h2 className='collections'>new <br/> collections <br/> for everyone</h2>
      <Link to='/latest'><button className="collections-button">Latest Collections 
        <span className='button-arrow'></span>→</button></Link>
     </div>
     <div className='img-banner'>
       <img src={MensShoppingImage} alt='' className='image'/>
      </div>
    </div>
    <div className='banner-2'>
    <div className='popular-men'>
      <h1>POPULAR IN MEN</h1>
    </div>
    <div className='popular-men-card'>
   
    <div className='card-overall'>
     { menProducts && (
         menProducts.map(eachProduct=> (
       <div className='card-image'>
          <Link to={`/product/${eachProduct._id}`} style={{textDecoration: 'none', color: 'black'}}><img src={`http://localhost:4000/${eachProduct.productCover}`} alt='Avatar'/></Link>
          <div className='card-info'>
          <Link to={`/product/${eachProduct._id}`} style={{textDecoration: 'none', color: 'black'}}><h4>{eachProduct.title}</h4></Link>
          <Link to={`/product/${eachProduct._id}`} style={{textDecoration: 'none', color: 'black'}}><p>${eachProduct.offerprice}</p></Link>
        </div> 
       </div>
       ) )  ) }
    </div>
    </div>
    </div>
    <Banner2 />
   </div>
   

      )
}

export default Banner
