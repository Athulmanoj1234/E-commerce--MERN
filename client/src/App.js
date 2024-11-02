import './App.css';
import {Routes, Route} from 'react-router-dom';
import Header from './Header';
import Layout from './Layout.js';
import Banner from './components/Banner.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import MenPage from './pages/MenPage.jsx';
import WomenPage from './pages/WomenPage.jsx';
import KidsPage from './pages/KidsPage.jsx';
import ProductPage from './pages/ProductPage.jsx';
import AdminPanel from './Admin/AdminPanel.jsx';
import CartPage from './pages/CartPage.jsx';
import AddProduct from './Admin/AddProduct.jsx';
import { UserContext, UserContextProvider } from './userContext.js';
import AdminLogin from './Admin/AdminLogin.jsx';
import AdminRegister from './Admin/AdminRegister.jsx';
import { useContext } from 'react';
import Maincart from './pages/Maincart.jsx';
import Phonepage from './pages/Phonepage.jsx';
import Electronicappliances from './pages/Electronicappliances.jsx';
import Editpage from './Admin/Editpage.jsx';

function App() {
  
  
  return(
    <div>
      <UserContextProvider>
        <Routes>
        <Route path='/' element={<Layout />}>
        <Route index element={<Banner />}/>
        <Route path='/login' element={<LoginPage />}/>
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/men' element={<MenPage />} />
        <Route path='/women' element={<WomenPage/>}/>
        <Route path='/kids' element={<KidsPage />}/>
        <Route path='/phones' element={<Phonepage />} />
        <Route path='/eletronics' element={<Electronicappliances />} />
        <Route path='/product' element={<ProductPage />}/>
        <Route path='/cart/:id' element={<CartPage/>} />
        <Route path='/cart' element={<Maincart />} />
        </Route>
        <Route path='/admin' element={<AddProduct />}/>
        <Route path='/allproducts' element={<AdminPanel />} />
        <Route path='/addproduct' element={<AddProduct />}/>
        <Route path='/business-login' element={<AdminLogin />}/>
        <Route path='/business-register' element={<AdminRegister />}/>
        <Route path='/product/:id' element={<ProductPage />}/>
        <Route path='/editproduct/:id' element={<Editpage />} />
        </Routes>
    </UserContextProvider>
    </div>
  )
}

export default App;
