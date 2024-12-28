import React, { useState, useEffect, useContext } from 'react';
import './CartPage.css';
import CartImg from '../assets/Men1 image new.jpg';
import CartItems from './Maincart';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { UserContext } from '../userContext';
import { Link } from 'react-router-dom';
import { SiVelog } from 'react-icons/si';



 const CartPage =  ()  => {

  const {id} = useParams();
  console.log(id);

  const [ add, setAdd ] = useState(1);
  const {userInfo} = useContext(UserContext);
  
  const [cartProduct, setCartproduct] = useState([]);
  const [ quantities, setQuantities ] = useState({});
  //subproducts


  useEffect(() => {
    axios.get(`http://localhost:4000/add-to-cart/${id}`, { withCredentials: true })
      .then(response => {
        console.log(response.data);
        
          setCartproduct(response.data.products);
        });
  }, [id]);

  console.log(cartProduct);
  
 const quantityOperation = (productId, operation, offerprice) =>{
     if(operation === 'increament'){
  setQuantities(( prevQuantities ) => ({   //get prev state i eresult may by from increment or decreament 
     ...prevQuantities,  //destructured it to get each product qiantities
     [productId] : Math.max(1,( prevQuantities[productId] || 1 ) + 1),   //if productId exists previos state will increament by 0ne
       }));
     }
     if(operation === 'decreament'){
     setQuantities((prevQuantities) => ({
     ...prevQuantities,
     [productId] : (prevQuantities[productId] || 1) - 1,
      }))
    }
  }
  const calculateTotal =  () => {
          
        const total =  cartProduct.reduce((price, product) => {
        const quantity = quantities[product._id] || 1;
        return price + (product.offerprice * quantity);
      
      }, 0);
      
     try{
          axios.post('http://localhost:4000/total', {total}, {withCredentials: true}).then( response=> {
               console.log(response.data);
          })
     }catch{
      console.error();
     };
     return total;
};
  


 async function cartDelete(productId){
      console.log(productId);
      const response = await axios.post('http://localhost:4000/cartdelete', { productId }, {withCredentials: true});
      setCartproduct((prev=> prev.filter(product => product._id !== productId ))); //if productId does not matches it will bw true and array will not change if productId isequal ie product id matches that product will be excluded
      
  }

  console.log(cartProduct);


  return (
    <div>
   { userInfo && (
    <div>
     
      <table className='table mt-5' style={{ width: '100%', borderCollapse: 'collapse' }}>
      
        <thead>
          <tr style={{ borderBottom: '1pt solid black' }}>
            <th scope='col' style={{ padding: '1rem'}}>Products</th>
            <th scope='col' style={{ padding: '1rem'}}>Title</th>
            <th scope='col' style={{ padding: '1rem'}}>Price</th>
            <th scope='col' style={{ padding: '1rem'}}>Quantity</th>
            <th scope='col' style={{ padding: '1rem'}}>Total</th>
            <th scope='col' style={{ padding: '1rem'}}>Remove</th>
          </tr>
        </thead>
        
        <tbody> 
        { cartProduct && ( cartProduct.map( headers=> {
            const allProductsquantity =  quantities[headers._id] || 1;
           
            return (
            <>
          <tr style = {{ borderBottom: '1pt solid silver' }}>
            <th>
              <img src={`http://localhost:4000/${headers.productCover}`} style={{ height: '50px', width: '50px'}}  alt="Product" />
            </th>
            <th>{headers.title}</th>
            <th>{headers.offerprice}</th>
            <th style={{ padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                { (
                <button onClick={ () => quantityOperation(headers._id, 'decreament', headers.offerprice)} style={{ marginRight: '10px' }}>-</button>
                  ) }
               <span style={{ margin: '0 10px' }}>{quantities[headers._id] || 1}</span>
               <button onClick={ () => quantityOperation(headers._id, 'increament', headers.offerprice)}  style={{ marginLeft: '10px' }}>+</button>
            </th>
             <th>{headers.offerprice * quantities[headers._id] || headers.offerprice}</th> {/* if quantity or headers or quantieis go null then offerrice will return */}
            <th style={{}}><button onClick={ () => cartDelete(headers._id) }>X</button></th>
          </tr>
          </>
           )
        } ) ) }
         </tbody>
      
       </table>
      <div className='secondcart-banner'>
        <div className='cart-totals'>
            <h2>Cart Totals</h2>
            <table>
                <tr>
                <div className='cart1'>
                    <div  className='Subtotal'>
                    <td><p>Subtotal</p></td>
                    </div>
                    <div className='subtotal-rate'>
                    <td><p>Rs.{cartProduct ? calculateTotal(): ''}</p></td>
                    </div>
                </div>    
                </tr>
                <tr>
                <div className='cart2'>
                    <div className='shopping fee'>
                    <td><p>Shopping fee</p></td>
                    </div>
                    <div className='shopppingfee-rate'>
                    <td>Free</td>
                    </div>
                </div>    
                </tr>
                <tr>
                <div className='cart3'>    
                    <div className='total'>
                    <td><p>Total</p></td>
                    </div>
                    <div className='total-rate'>
                    <td><p>Rs.{cartProduct ? calculateTotal(): ''}</p></td>
                    <Link to='/cart'><button style={{marginTop: '1rem', marginLeft: '-4rem', backgroundColor: 'blue', border: 'none',
                       padding: '10px 18px', borderRadius: '10px', color: 'white'}}>Pay</button></Link>
                    </div>
                    
                </div>    
                </tr>
                </table>
              
        </div>
        <div className='cart-input'>
            <p>If you have a promo code enter it here</p>
            <div className='cart-inputbutton'>
            <input type='text' placeholder='promo code'/>
            <button>Submit</button>
            </div>
            </div>
      </div> 
       </div>  
          ) }
          { !userInfo && (
            <h1>you need to logged in or register for a product to add to cart.... </h1>
          ) }
    </div>
  );
}

export default CartPage;