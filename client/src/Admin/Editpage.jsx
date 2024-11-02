import React, { useEffect, useState } from 'react';
import {  useParams } from 'react-router-dom';
import axios from 'axios';
import './AdminPage.css'

const Editpage = () => {


    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [offerPrice, setOfferPrice] = useState('');
    const [categoryselect, setCategoryselect] = useState('Men');
    const [description, setDescription] = useState('');
    const [files, setFiles] = useState('');


    const { id } = useParams();
    

    useEffect(()=> {
        axios.get(`http://localhost:4000/editproduct/${id}`).then(response=> {
           console.log(response.data);
           const prevEdit = response.data;
           


           setTitle(prevEdit.title);
           setPrice(prevEdit.price);
           setOfferPrice(prevEdit.offerprice);
           setCategoryselect(prevEdit.setCategoryselect);
           setFiles(prevEdit.productCover);


    }).catch(err=> {
        console.error("error fetching data");
    })
    }, [])

       
     
 
  async function editUpload(e) {
    
   e.preventDefault();
     
    const data = new FormData();
      data.set('title', title);
      data.set('price', price);
      data.set('offerprice', offerPrice);
      data.set('description', description);
      data.set('id', id);
      data.set('file', files[0]);

      const response = await axios.put('http://localhost:4000/producttoedited', data, { withCredentials: true });
      console.log(response);
  }

  return (
    <div>
     <div className='fulladmin-page'>
       
         <div className='main-banner'>
          <form onSubmit={editUpload}>
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
            <button>upload</button>
            
            </div>
           </div>
           </form>
          </div>
          </div>
        </div>
            
    
  )
}

export default Editpage;
