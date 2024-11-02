import React, { useEffect, useState } from 'react';
import './Admin.css';
import './AdminPage.css'
import accountImg from '../assets/Men1 image new.jpg';
import AdminCartImg from '../assets/kids 2 image new.jpg';
import { FaCartShopping } from "react-icons/fa6";
import { SiBitbucket } from "react-icons/si";
import { FaSearch } from 'react-icons/fa';
import { Scrollbar } from 'react-scrollbars-custom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { CiSearch } from "react-icons/ci";



const AdminPanel = () => {

  const [ productList, setProductlist ] = useState([]);
  const [ searchCategory, setSearchcategory ] = useState('');
  const [ listOrsearch, setListOrsearch ] = useState(false);

 
  useEffect(()=> {
     axios.get('http://localhost:4000/businessproduct', { withCredentials: true }).then(response=> {
       console.log(response.data);
       setProductlist(response.data)
  })
  }, [])

   
  
  

  const deleteList = async (productId)=> {
     
     await axios.post('http://localhost:4000/deletelist', {productId}, { withCredentials: true });
     
    setProductlist(prev=> prev.filter(product=> product._id !== productId));

  }
  const getByCategory =  ()=> {
     
    try{
        const filteredList = setProductlist(prev=> prev.filter(product=> product.category === searchCategory));
        setListOrsearch(true); 
        return filteredList;

    }catch(error) {
        alert('search items cannot be found')
          } 
   }
      if(listOrsearch == true){
        
        return (
          <>
          
                <div className='table-part'>
            <table className='table mt-5' style={{ width: '100%', borderCollapse: 'collapse' }}>
      
      <thead>
        <tr style={{ borderBottom: '1pt solid black' }}>
          <th scope='col' style={{ padding: '1rem'}}>Products</th>
          <th scope='col' style={{ padding: '1rem'}}>Title</th>
          <th scope='col' style={{ padding: '1rem'}}>old price</th>
          <th scope='col' style={{ padding: '1rem'}}>new price</th>
          <th scope='col' style={{ padding: '1rem'}}>category</th>
          <th scope='col' style={{ padding: '1rem'}}>Remove</th>
        </tr>
      </thead>
      <tbody> 
     { productList.length > 0 && listOrsearch == true && ( 
        productList.map(product=> ( 
         <tr style = {{ borderBottom: '1pt solid silver' }}>
          <th>
            <img src={`http://localhost:4000/${product.productCover}`} style={{ height: '50px', width: '50px'}}  alt="Product" />
          </th>
          <th>{product.title}</th>
          <th>{product.price}</th>
          <th>{product.offerprice}</th>
          <th>{product.category}</th>    
          <th style={{}}>
            
            <Link to={ `/editproduct/${product._id}` }><button style={{ marginLeft: '0.5 rem', padding: '7px 20px',border: 'none',
               borderRadius: '13px', color: 'white', backgroundColor: 'red' }} >edit</button></Link>
            <button style={{ marginLeft: '0.5 rem', padding: '7px 20px',border: 'none',
               borderRadius: '13px', color: 'white', backgroundColor: 'red' }} 
               onClick={ ()=> deleteList(product._id) }>X</button></th>
        
        </tr>
        ) ) ) }

      
    
       </tbody>
    
     </table>
          </div>
          </>
        )

      }

  return (
    <div>
      <div className='fulladmin-page'>
       <div className='header-admin'>
        <div className='heading-part'>
        <h2>SHOPPER</h2>
        </div>
        <div className='accounts-part'>
         <img src={accountImg} alt='img-admin' />
         {/*
         <select>
            <option value="item1">item1</option>
            <option value='item2'>item2</option>
            <option value='item3'>item3</option>
         </select> 
         */}
        </div>
       </div>
       <div className='admin-banner'>
        <div className='side-banner'>
        <div className='addproduct-admin'>
         <div className='cartadmin-icon'>   
         <FaCartShopping />
         </div>
         
         <div className='cartadmin-para'>
         <Link to='/addproduct' style={{ textDecoration: 'none', color: 'black' }}><p>Add product</p></Link>
         </div>
         </div>
         <div className='productlist-admin'>
         
         </div>
         </div>
         <div className='main-banner'>
            <div  className='heading-part'>
            <h3>All Products List</h3>
            
            <div style={{ position: 'relative',height: '100px', width: '200px', left: '13rem' }}>
              <input type='text' placeholder='Search Category' value={ searchCategory } onChange= {e=> setSearchcategory(e.target.value)} 
                 style={{width: '70%', height: '25px', paddingRight: '60px'}}  />
              <button style={{ position: 'absolute', left: '10rem', top: '12px', background: 'none', border: 'none'}} onClick={ getByCategory }>
                  <CiSearch style={{ height: '1rem', width: '10rem' }} />
              </button> 
            </div>

            </div> 
            <div className='table-part'>
            <table className='table mt-5' style={{ width: '100%', borderCollapse: 'collapse' }}>
      
      <thead>
        <tr style={{ borderBottom: '1pt solid black' }}>
          <th scope='col' style={{ padding: '1rem'}}>Products</th>
          <th scope='col' style={{ padding: '1rem'}}>Title</th>
          <th scope='col' style={{ padding: '1rem'}}>old price</th>
          <th scope='col' style={{ padding: '1rem'}}>new price</th>
          <th scope='col' style={{ padding: '1rem'}}>category</th>
          <th scope='col' style={{ padding: '1rem'}}>Remove</th>
        </tr>
      </thead>
      <tbody> 
     { productList.length > 0 && listOrsearch == false && ( 
        productList.map(product=> ( 
         <tr style = {{ borderBottom: '1pt solid silver' }}>
          <th>
            <img src={`http://localhost:4000/${product.productCover}`} style={{ height: '50px', width: '50px'}}  alt="Product" />
          </th>
          <th>{product.title}</th>
          <th>{product.price}</th>
          <th>{product.offerprice}</th>
          <th>{product.category}</th>    
          <th style={{}}>
            
            <Link to={ `/editproduct/${product._id}` }><button style={{ marginLeft: '0.5 rem', padding: '7px 20px',border: 'none',
               borderRadius: '13px', color: 'white', backgroundColor: 'red' }} >edit</button></Link>
            <button style={{ marginLeft: '0.5 rem', padding: '7px 20px',border: 'none',
               borderRadius: '13px', color: 'white', backgroundColor: 'red' }} 
               onClick={ ()=> deleteList(product._id) }>X</button></th>
        
        </tr>
        ) ) ) }

      
    
       </tbody>
    
     </table>
          </div>
           </div>
            </div>
            </div>
          
          </div>
        )
}

export default AdminPanel;