import React from 'react';
import './Banner.css';
import { Link } from 'react-router-dom';

const NewCollections = ({author, businessname, category, offerprice, price, productCover, title, _id}) => {
    
  return (
     <div>
     <div class='card-image1'>
    <Link to={`/product/${_id}`}><img src={`http://localhost:4000/${productCover}`} alt='men1'/></Link>
     <div className='card-info1'>
      <Link to={`/product/${_id}`} style={{textDecoration: 'none', color: 'black'}}><h4>{title}</h4></Link>
      <Link to={`/product/${_id}`} style={{textDecoration: 'none', color: 'black'}}><p>Rs.{offerprice}</p></Link>
     </div> 
      </div>
      </div>
     )
}

export default NewCollections;
