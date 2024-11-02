import React, { useEffect, useState } from 'react';
import axios from 'axios';
import productimg from '../assets/MensTshirt.jpg';
import './ProductPage.css';
import { Link, useParams } from 'react-router-dom';

const ProductPage = () => {
  
  const [displayProduct, setDisplayproduct] = useState('');

  const {id} = useParams();
  console.log(id);  

  useEffect(()=>{
    axios.get(`http://localhost:4000/product/${id}`).then(response=> {
       console.log(response.data);
       setDisplayproduct(response.data);
       }).catch(error=> {
      console.error("error");
    })
  },[id]);
    
  

  return (
    <div>
      <div className='whole-page'>
        <div className='image-part2'>
         <div className='small-images'>   
          <img src={`http://localhost:4000/${displayProduct.productCover}`} alt='productimg' className='small-img'/>
          <img src={`http://localhost:4000/${displayProduct.productCover}`} alt='productimg' className='small-img'/>
          <img src={`http://localhost:4000/${displayProduct.productCover}`} alt='productimg' className='small-img'/>
          <img src={`http://localhost:4000/${displayProduct.productCover}`} alt='productimg' className='small-img'/>
          </div>
         <div className='mainproduct-img'>
          <img src={`http://localhost:4000/${displayProduct.productCover}`} alt='productimg' className='main-img'/>
         </div>  
        </div>
        <div className='text-part2'>
          <h2>{displayProduct.title}</h2>
          <div className='price'>
          <p className='original-price'>{displayProduct.price}</p>
          <p className='discounted-price'>{displayProduct.offerprice}</p>
          </div>
          <p>{displayProduct.description}.</p>
         {/* { displayProduct.category === Men || displayProduct.category===Women || displayProduct.category === Kids && (
            <>
          <h4>Select Size</h4>
          <div className='size-buttons'>
            <button className='s'>S</button>
            <button className='m'>M</button>
            <button className='l'>L</button>
            <button className='xl'>XL</button>
            <button className='xxl'>XXL</button>
          </div>
            </>
         ) } */}
          <div className='button-category'>
          <div className='button'>  
          <Link to={`/cart/${id}`}><button>Add To Cart</button></Link>
          </div>
          <div className='para'>
          <p><span>Category: </span>Men T-Shirt, Crop Top</p>
          <p><span>Tags: </span>Modern,Latest</p>
          </div>
          </div>
        </div>
      </div>
    </div>
  )
}   
export default ProductPage;