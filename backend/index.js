import express from 'express';
import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';
import userModel from './users/users.js';
import adminModel from './admin/admin.js';
import cors from 'cors';
import bcrypt, { compareSync } from 'bcrypt';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import fs from 'file-system';
import { fileURLToPath } from 'url';
import path from 'path'; 
import productModel from './product/product.js';
import cartModel from './cart/cart.js';
import { error } from 'console';
import Razorpay from 'razorpay'; 
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import 'dotenv/config'
import dotenv from 'dotenv';
import {razorKey, razorSecret} from './constants/constants.js'
  
    
//import cartModel from './cart/cart.js';
 
const app = express(); 
const port = process.env.PORT || 4000;
//const corsOptions = { origin: ['http://localhost:3000'], credentials: true};
const salt = bcrypt.genSaltSync(10);  
const secret = "jbfhj56hgkfhgklhnlkh56565";
const adminSecret = "fhsdjfhodsihgo454234"; 
const upload = multer({ dest: 'uploads/' });
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
   
const razorApiKey = razorKey;
const razorApiSecret = razorSecret; 
 


app.use(cors({ credentials: true, origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002'] }));
app.use(express.json()); 
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));  

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Database is connected'); 
  })
  .catch((err) => {
    console.error('Database connection error:', err.message);
  });

 
app.post('/register', async(req, res) =>{
    const {username, email, password} = req.body;
    const hashedPassword = bcrypt.hashSync(password, salt);
    const userDoc = await userModel.insertMany({username,email,password: hashedPassword});
    res.json(userDoc);
})
app.post('/login', async(req, res) =>{
    const {email, password} = req.body;
    const userDoc = await userModel.findOne({email});
    
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if(passOk){
        jwt.sign({email,id: userDoc.id}, secret,{},(err, token)=>{ 
            if(err){
                throw err;
            }else{ 
                res.cookie('userToken', token).json(
                    {
                    id:userDoc.id,
                    email
                })
            } 
        }) 
    }else{
        res.json("you have entered wrong login credentials");
    }
})

app.get('/profile', (req, res)=>{
    const userToken = req.cookies.userToken;
    if(!userToken){
        res.status(401).json({messege: "token is missing login"});
    }
    jwt.verify(userToken, secret, {}, (err, info) => {
        if (err) {
            return res.status(403).json({ message: "Token is invalid or expired." });
        }
        res.json(info);
    });
})  
app.post('/logout', (req, res)=>{
    res.clearCookie('userToken', {path: '/'});
    res.json({
        messege: "logged out successfully"
    });
})
app.post('/adminregister', upload.single('files'), async (req, res, next)=>{
    const {originalname, path} = req.file;
    const parts = originalname.split('.');
    const dotParts = parts[parts.length - 1];
    const partsToLinked = path + '.' + dotParts;
    fs.renameSync(path, partsToLinked);
  
    const {businessname, password} = req.body;
    console.log(password);
    const saltRounds = 10;
    
    const salt = bcrypt.genSaltSync(saltRounds)
    const hashedPassword = bcrypt.hashSync(password, salt)
    const adminDoc = await adminModel.insertMany({businessname,
            adminCover: partsToLinked,
            password: hashedPassword
        })
        if(adminDoc){
            res.json({messege: "the user is registered"});
        }else{
            res.json({messege: "failed to get registered"});
        }

}) 
app.post('/adminlogin', async (req, res) => {
    const { businessname, businessPassword } = req.body;

    try {
      // Retrieve the admin document
      const adminDoc = await adminModel.findOne({ businessname });
  
      // If admin not found
      if (!adminDoc) {
        return res.status(400).json({ message: "Admin not found" });
      } 
  
      // Compare passwords
      const passOk = bcrypt.compareSync(businessPassword, adminDoc.password);
      if (!passOk) {
        return res.status(400).json({ message: "Wrong credentials" });
      }
  
      // Generate token if password matches
      jwt.sign(
        { businessname, id: adminDoc.id, adminCover: adminDoc.adminCover }, // Payload
        adminSecret, // Secret key
        {}, // Options
        (err, token) => {
          if (err) {
            throw err;
          } else {
            // Set the token in a cookie and respond with admin details
            res.cookie('adminToken', token).json({ id: adminDoc.id, businessname, adminCover:adminDoc.adminCover });
          }
        }
      ); 
    } catch (error) {
      // General error handling
      res.status(500).json({ message: "An error occurred", error: error.message });
    }
      });
app.get('/adminprofile', (req, res)=> {
    const adminToken = req.cookies.adminToken;
    
      // Check if the token exists
      if (!adminToken) { 
        return res.status(401).json({ message: "Token is missing. Please log in." });
    }

    // Verify the token if present
    jwt.verify(adminToken, adminSecret, {}, (err, info) => {
        if (err) {
            return res.status(403).json({ message: "Token is invalid or expired." });
            }

        // If token is valid, send user info
        console.log(info);
          res.json(info);
        
    }); 
   
})
app.post('/adminlogout', (req, res) =>{
    res.clearCookie('adminToken', {path: '/'}); 
    res.json({messege: "logged out successfully"}); 
})
app.post('/productupload', upload.single('files'), async (req, res)=> {
    const{originalname, path} = req.file;
    const parts = originalname.split('.');
    const dotParts = parts[parts.length - 1];
    const partsToLinked = path + '.' + dotParts;
    fs.renameSync(path, partsToLinked);

    const {adminToken} = req.cookies;
    console.log(adminToken);

    jwt.verify(adminToken, adminSecret, {}, async (err, info) =>{
      if(err){
        throw err;
    }else{
        console.log(info);
    }

    req.body ? console.log(req.body) : console.log("not received req body");
    
    const {title, price, offerprice,description, category} = req.body;
   
    const productDoc = await productModel.insertMany({
        title,
        price,
        offerprice,
        productCover: partsToLinked,
        description,
        category,
        author: info.id,
    }); 
      if(!productDoc){
        res.json({messege: "failed to upload post..some database error"});
      }else{ 
        res.json(productDoc);
      } 
        })  
});

app.get('/adminproduct', async (req,  res)=> {
    const productDoc = await productModel.find().populate('author', ['businessname']).limit(9).sort(-1);
    console.log(productDoc);
    res.json(productDoc);
})

app.get('/businessproduct', async (req, res)=> {
     
    const {adminToken} = req.cookies;
    if(adminToken){
       jwt.verify( adminToken, adminSecret, {}, async (err, info)=> {
          if(err){
              throw error;
          }
              console.log(info.id);
              const businessId = info.id;
              const adminProducts = await productModel.find({ author: businessId }); 
              console.log(adminProducts)
              res.json(adminProducts);
          
        })
    }else{
        res.json({ messege: 'business||adminToken ismissing....' })
    }

})

app.get('/product/:id', async (req, res)=> {
    const {id} = req.params; 
    const productDoc = await productModel.findById(id).populate('author', ['businessname']);
    res.json(productDoc);
})

app.get('/mencategory', async (req, res)=> {
    
    
    const menDoc = await productModel.find({category: 'Men'}).limit(14);

  if(menDoc){
    console.log(menDoc);
    res.json(menDoc);
  }else{
    res.json({ messege: 'the men category products is not available' });
  }
}) 

app.get('/womencategory', async (req, res)=> {

    const womenDoc = await productModel.find({ category: 'Women' });

    if(womenDoc){
        console.log(womenDoc);
        res.json(womenDoc);
    }else{
        res.json({ messege: "the women category products is not available" });
    }
})

app.get('/kidscategory', async (req, res)=> {

    const kidsDoc = await productModel.find({ category: 'Kids' });

    if(kidsDoc){
        console.log(kidsDoc);
        res.json(kidsDoc);
    }else{
        res.json({ messege: "the kids category products are not available" });
    }

})

app.get('/electronicscategory', async (req, res)=> {

    const electronicsDoc = await productModel.find({ category: 'Electronic appliancces' });

    if(electronicsDoc){
        console.log(electronicsDoc);
        res.json(electronicsDoc);
    }else{
        res.json({ messege: "the kids category products are not available" });
    }

})

app.get('/phonescategory', async (req, res)=> {

    const phonesDoc = await productModel.find({ category: 'Phones' })
    if(phonesDoc){
        res.json(phonesDoc);
    }else{
        res.json({ messege: 'cannot retrive phones document' });
    }
       
})
    
app.get('/editproduct/:id', async (req, res)=> {

   const { id } = req.params;

      if(id){
        const docToEdited = await productModel.findById( id );
        res.json(docToEdited);
      }else{
        res.json({ messege: "doc is edited cant be foud in database" });      
      }

})

app.put('/producttoedited', upload.single('file'), async (req, res)=> {
     
     let partsToLinked = null; 
     
     
   
   if(req.file){  
     const{originalname, path} = req.file;
     const parts = originalname.split('.');
     const dotParts = parts[parts.length - 1];
     partsToLinked = path + '.' + dotParts;
     fs.renameSync(path, partsToLinked);
   }
     
     const {adminToken} = req.cookies;
     const { title, price, offerprice, description, id } = req.body;

     jwt.verify(adminToken, adminSecret,{}, async (err, info) =>{
        
       if(err){
         throw err;
       }else{ 
        const productDoc = await productModel.findById(id);
        const adminOk = JSON.stringify(productDoc.author) === JSON.stringify(info.id); //if we dont use stringy the adminOk will return as false because these two bjects are stored inside different memory by using stringify two comparable thing got converted to string so will return true 
        
        if(adminOk) {
          
             productDoc.title = title, 
             productDoc.price = price,
             productDoc.offerprice = offerprice,
             productDoc.description = description,
             productDoc.productCover = partsToLinked

             await productDoc.save();
             res.json({ messege: "the conted is edited in the database succesfully" });
            }
       }
    

     } )

})

app.get('/add-to-cart/:id', async (req, res) => {
    const productId = req.params.id;
    console.log(productId);
    
    const { userToken } = req.cookies;

    // Verify the user token to extract the userId
    jwt.verify(userToken, secret, {}, async (err, info) => {
        if (err) {
            return res.status(401).json({ message: "token is unauthorised" });
        } 
        const userId = info.id;

        // Validate if the productId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ message: "Invalid product ID" });
        }

        // Check if a cart exists for the user
        const userCart = await cartModel.findOne({ user: userId });
        
        if(userCart){
            const productExists = userCart.products.some(product => 
                product.equals(new mongoose.Types.ObjectId(productId))
            );

            if (!productExists) { 
                const updatedDocument = await cartModel.updateOne(
                    { user: userId },
                    { $push: { products: productId } }
                );
            }
            const cartProducts = await cartModel.findOne({ user: userId }).populate('products');
            return res.json(cartProducts); 

        } else {
            // If no cart exists, create a new cart for the user
            const cartDoc = await cartModel.create({
                user: userId,
                products: [productId],
                 
            });
        } 
        
        const cartItems = await cartModel.find();
        console.log(cartItems);
        res.json({ 'cart before aggregate': cartItems });
    });
});

app.get('/add-to-cart', async (req, res) => { 
     
    const {userToken} = req.cookies;
    // Verify the user token
    jwt.verify(userToken, secret, {}, async (err, info) => {
        if (err) {
            return res.status(401).json({ message: "Unauthorized" }); 
        }

        const userId = info.id;

        // Fetch the user's cart
        const userCart = await cartModel.findOne({ user: userId }).populate('products');
        if (userCart) {
            return res.json(userCart);
        } else {
            return res.status(404).json({ message: "Cart not found" });
        }
    });
});

app.post('/total', async(req, res)=> {
    const {total} = req.body;
    const { userToken } = req.cookies;
    
    if(total){
    jwt.verify(userToken, secret, {}, async (err, info)=> {
        if(err){
            throw err;
        }else{
            const updatedCart = await cartModel.updateOne(
                {user: info.id},
                { $set: { total: total } }, //set operator is used to store latest total price 
            )
            res.json(updatedCart);
        }
    })
    }else{
        res.json({messege: 'total price is not received.. something wrong in the frontend'});
    }
})

app.get('/finalcart' , async ( req, res )=> {
    const finalCart = await cartModel.findOne();
    if(finalCart){
        res.json(finalCart);
    }else{
        res.json({ messege: "the cart document is not available" });
    }
})

app.post('/cartdelete', async (req, res) => {
    const { productId } = req.body; // Assume userId is passed to identify the cart
    const { userToken } =req.cookies;
    jwt.verify(userToken, secret, {}, async (err, info) => {
        if (err) {
            return res.status(403).json({ message: 'Token verification failed' });
        }
        
        const objectId = new mongoose.Types.ObjectId(productId);
     
        // Match the cart by userId (since the cart is linked to a user) and pull the product
        const deleteDoc = await cartModel.updateOne(
            { user: info.id }, // Match the cart by the userId (you can also use cartId if available)
            { $pull: { products: objectId } } // Pull the specific product from the array
        );
        res.json(deleteDoc);
    });
    })

app.post('/deletelist', async(req, res)=> {
    const {productId} = req.body;
    const {adminToken} = req.cookies;
    console.log(productId);
     
     if(productId){
       jwt.verify(adminToken, adminSecret, {}, async (err, info) => {
          if(err){
            throw err;
          }else{
            await productModel.deleteOne({author: info.id});
            res.json("id has been deleted");
          }
       })
     }else{
      res.json({ messege: "product is is missing" })
     }
   
})
   
app.post('/order', async (req, res) => {
    try {
        const razorPay = new Razorpay({ 
            key_id: razorApiKey,
            key_secret: razorApiSecret,
        });
        const {options} = req.body;
        const orderDetails = await razorPay.orders.create(req.body);  //creating ordr with the data received from the backend
        
        // Check if orderDetails are valid
        if (!orderDetails) {
            return res.status(400).json({ message: "Incorrect data or data does not come in correct format" });
        }
        console.log(orderDetails);
        // Success case
        res.status(200).json(orderDetails);
    } catch (error) {
        // Catch any errors and handle them
        console.error("Order creation error: ", error);
        res.status(500).json({ message: "Server error occurred", error: error.message });
    } 
});

app.post('/ordersignature', (req, res)=> {

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body.body;
    
      if(razorpay_signature){
       
           const sha = crypto.createHmac( 'sha256', razorApiSecret ); //crypto.createHmac(): This function takes two argument The hash function (sha256 in this case).A secret key (razorApiSecret in this case).
           sha.update(razorpay_order_id + '|' + razorpay_payment_id); //update(): This method is used to feed data into the HMAC computation. The string you pass here is a concatenation of the razorpay_order_id and razorpay_payment_id.
           const generatedSignature = sha.digest("hex"); //digest('hex'): This converts the output of the HMAC to a hexadecimal string.

             if(razorpay_signature == generatedSignature){
                res.status(200).json({ messege: "payment is successful",
                           order_id: razorApiKey,
                           payment_id: razorpay_payment_id,                          
                        });
             
             }else{
                res.json("received and generated signatures doesnot matches");
             }

      }else{
        res.json({ messege: "signature does not received.. in the backend" });  
             
         }
})

app.post('/sendmail', (req, res) => {
    const {email} = req.body;
    if(email){
      
       const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {
            user: 'athulmanoj344@gmail.com',
            pass: 'rynrmvpsxyggcdag'
        }
       })
       
          transporter.sendMail({
            to: email,
            sub: "Payment Confirmation For Your Product",
            html: "messege from cartify that...your order is confirmed we will contect you for collecting the delevery address",
          })
       
          res.json('notification send to your email');

    }else{
      res.json('email not received');
    }
})   


app.listen(port, (req, res) =>{
    console.log(`you are listening to the port ${port}`);
});      