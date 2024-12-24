import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import { UserContext } from '../userContext';
import { useParams } from 'react-router-dom';



const Maincart = () => {
  const { id } = useParams();
  const { userInfo } = useContext(UserContext); 

  
  const [cartProducts, setCartProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [total, setTotal] = useState('');
  const [email, setEmail] = useState('');
  const [mobilenumber, setMobilenumber] = useState('');

  useEffect(() => {
    if (userInfo) {
      axios.get('http://localhost:4000/add-to-cart', { withCredentials: true })
        .then(response => {
          setCartProducts(response.data.products);
        })
        .catch(error => {
          console.error("Error fetching cart data:", error);
        });
    }
  }, [userInfo]);


  const handleAddToCart = (productId) => {
    axios.post(`http://localhost:4000/add-to-cart/${productId}`, {}, { withCredentials: true })
      .then(response => {
        // Update cart products
        setCartProducts(response.data.products);
      })
      .catch(error => {
        console.error("Error adding to cart:", error);
      });
  };

  const handleDeleteFromCart = async (productId) => {
    await axios.post('http://localhost:4000/cartDelete', { productId }, { withCredentials: true });
    // Refresh cart products
    setCartProducts(prev => prev.filter(product => product._id !== productId));
  };

  useEffect(()=> {
    axios.get('http://localhost:4000/finalcart').then(response=> {
        const cartDetails = response.data;
        setTotal(cartDetails.total);
        
    })
  }, [])

  console.log(total);
   

      const paymentSubmit = async (e)=> {
         e.preventDefault();
 
         const amount = total * 100; //convert .cents to full amount
         const currency = 'INR';
         const receipt = 'djkf34343';
         
        const response = await axios.post(`http://localhost:4000/order`, { amount, currency, receipt });
        
        console.log(response.data);
        const order = response.data;
        console.log(order.id);
        
         
        var options = {
          "key": "rzp_test_8R3WHpR2dyeLyY", // Enter the Key ID generated from the Dashboard
          "amount": amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
          "currency": currency,
          "name": "Athul websollutions", //your business name
          "description": "Test Transaction",
          "image": "https://example.com/your_logo",
          "order_id": order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
          "handler": async function (response){
              const body = {...response};
                const paymentResponse = await axios.post('http://localhost:4000/ordersignature', {body} );
                const isPaymentDone = paymentResponse.data; 

                  if(paymentResponse.status == 200){
                    alert(isPaymentDone.messege);
                    await axios.post('http://localhost:4000/sendmail', {email});
                  }else{
                    alert('payment was unsuccessful or invalid signature')
                  }

                     },
          "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
              "name": "Athul Manoj", //your customer's name
              "email": "athulmanoj3442gmail.com", 
              "contact": "9000090000"  //Provide the customer's phone number for better conversion rates 
          },
          "notes": {
              "address": "Razorpay Corporate Office"
          },
          "theme": {
              "color": "#3399cc"
          }  
      };
      var rzp1 = new window.Razorpay(options);
      rzp1.open();
      rzp1.on('payment.failed', function (response){
              alert(response.error.code);
              alert(response.error.description);
              alert(response.error.source);
              alert(response.error.step);
              alert(response.error.reason);
              alert(response.error.metadata.order_id);
              alert(response.error.metadata.payment_id);
      });  
      }

  // Inline styles
  const styles = {
    cartContainer: {
      padding: '20px',
      maxWidth: '800px',
      margin: '0 auto',
      border: '1px solid #ddd',
      borderRadius: '5px',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#fff',
    },
    productItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '15px',
      borderBottom: '1px solid #eee',
    },
    productTitle: {
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#333',
    },
    removeButton: {
      padding: '10px 15px',
      backgroundColor: '#ff4d4d',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
    removeButtonHover: {
      backgroundColor: '#e60000',
    },
    totalContainer: {
      marginTop: '20px',
      padding: '15px',
      borderTop: '2px solid #333',
      fontSize: '20px',
      fontWeight: 'bold',
      textAlign: 'right',
    },
    loginMessage: {
      textAlign: 'center',
      fontSize: '24px',
      color: '#ff4d4d',
    },
  };

  return ( 
    <div style={styles.cartContainer}>
      {userInfo ? (
        <div>
          {cartProducts.map(product => (
            <div key={product._id} style={styles.productItem}>
              <span style={styles.productTitle}>{product.title}</span>
              <button 
                style={styles.removeButton} 
                onClick={() => handleDeleteFromCart(product._id)}
              >
                Remove
              </button>
            </div>
          ))}
          <div style={styles.totalContainer}>
            Total: ${total}
           
          </div>
          <input type='text' placeholder='enter your full address' required value={email} onChange={e=> setEmail(e.target.value)}/>

          
          { email && (
          <button style={{marginTop: '1rem', marginLeft: '19rem', marginTop: '-2rem', backgroundColor: 'blue', border: 'none',
                       padding: '10px 18px', borderRadius: '10px', color: 'white'}} onClick={paymentSubmit}>Pay Now</button>
            ) }
            { !email && (
                <p style={{color: 'brown'}}>pay option will be only displayed if you enter mobile number</p>
             ) }
          </div>
        
      ) : (
        <h1 style={styles.loginMessage}>You need to log in to view your cart.</h1>
      )}
    </div>
  );
};

export default Maincart;
