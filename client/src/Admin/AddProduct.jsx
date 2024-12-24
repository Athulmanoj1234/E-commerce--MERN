import React, {useEffect, useState} from 'react';
import accountImg from '../assets/Men1 image new.jpg';
import { FaCartShopping } from "react-icons/fa6";
import { SiBitbucket } from "react-icons/si";
import { Scrollbar } from 'react-scrollbars-custom';
import { Form, Link } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import { UserContext } from '../userContext';

const AddProduct = () => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [offerPrice, setOfferPrice] = useState('');
  const [categoryselect, setCategoryselect] = useState('Men');
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState('');

  console.log(title);
  console.log(files);
  console.log(categoryselect);

  const {businessInfo, setBusinessInfo} = useContext(UserContext);
  console.log(businessInfo); 
  

  useEffect(()=> {
    axios.get('http://localhost:4000/adminprofile', {withCredentials: true}).then(response=> {
      console.log(response.data);

      if(response.status == 200){
        const businessInfo = response.data;
        setBusinessInfo(businessInfo);
      }else{
        alert("there is some problem in grabbing profile credentials");
      }
    }).catch(error => {
      console.error('Error fetching profile:');
    });
 }, []);
 console.log(businessInfo);

 async function adminLogout(ev){
  ev.preventDefault();
  const response = await axios.post('http://localhost:4000/adminlogout', {}, {withCredentials: true});
  if(response.status == 200){
    setBusinessInfo(null);
  }
 }

   const adminCover = businessInfo?.adminCover;
   const businessname = businessInfo?.businessname;

   console.log(title, price, offerPrice, description, categoryselect, files[0]);

  
const productUpload = async (ev) => {
  try{
  ev.preventDefault();
  console.log("new upload");

  const data = new FormData();
  data.set('title', title);
  data.set('price', price);
  data.set('offerprice', offerPrice);
  data.set('description', description);
  data.set('category', categoryselect);
  data.set('files', files[0]);
 
  
  // data ? console.log(data) : console.log("product data cannot be found");

  const response = await axios.post('http://localhost:4000/productupload', data, {withCredentials: true});

  console.log(response.data);

}catch(err){
  console.log("the product is not uploaded", err);
 }
}


  return (
    <div>
      <div className='fulladmin-page'>
       <div className='header-admin'>
        <div className='heading-part'>
        <h2>SHOPPER</h2>
        </div>
        { businessname && (
        <div className='loginregister-admin'>
         <button onClick={adminLogout}>Business logout</button>
        </div>
        )}
        { !businessname && (
         <div className='loginregister-admin'>
          <Link to='/business-login'><button>Business login</button></Link>
        </div>
        ) }
        { adminCover && (
        <div className='accounts-part'>
         <img src={`http://localhost:4000/${adminCover}`} alt='img-admin' />
        </div>
        )}
            
       </div>
       { businessname && (
       <div className='admin-banner'>
        <div className='side-banner'>
        <div className='addproduct-admin'>
         <div className='cartadmin-icon'>   
         <FaCartShopping />
         </div>
         
         <div className='cartadmin-para'>
         <p>Add product</p>
         </div>
         </div>
         <div className='productlist-admin'>
        
        
         </div>
         </div>
         <div className='main-banner'>
          <form onSubmit={productUpload}>
           <div className='productadd-form'>
           <div className='producttitle-add'> 
           <p>Product Title</p>
           <input type='text' placeholder='Type here' value={title} onChange={ev => {setTitle(ev.target.value)}}/>
           </div>
           <div className='priceoffer-add'>
           <div className='price-add'>
           <p>Price</p>
           <input type='text' placeholder='Type here' value={price} onChange={ev => {setPrice(ev.target.value)}}/>
           </div>
           <div className='offer-add'>
           <p>Offer Price</p>
           <input type='text' placeholder='Type here' value={offerPrice} onChange={ev => {setOfferPrice(ev.target.value)}}/>
           </div>
           </div>
           <div className='product-description'>
            <input type='textarea' placeholder='enter product description here' value={description} onChange={ev=> {setDescription(ev.target.value)}}/>
           </div>
           <div className='productcategory-add'>
           <p>Product Category</p>
           <select  onChange={ev => {setCategoryselect(ev.target.value)}}>
            <option value='Men' >Men</option>
            <option value='Women'>Women</option>
            <option value='Kids'>Kids</option>
            <option value='Phones'>Phones</option>
            <option value='Electronic appliancces'>Electronic appliances</option>
           </select>      
           </div>
           <div className='upload'>
            <p>upload</p>
            <input type='file' onChange={ev => {setFiles(ev.target.files)}}/>
            </div>
            <div className='upload-button'>
            <button style={{ marginRight: '2rem', marginBottom: '1rem' }} type="submit">upload</button>
            <Link to='/allproducts'><button>your product List</button></Link>
            </div>
           </div>
           </form>
          </div>
          </div>
           )}
           { !businessname && (
                <h1 style={{color: 'brown', textAlign: 'center'}}>hey admin..please login with your neccessary credentials...</h1> 
                         ) }
        </div>
          
          </div>
        )
}

export default AddProduct;
