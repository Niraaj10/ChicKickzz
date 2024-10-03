import React from 'react';
import Navbar from './components/Navbar';
import Home from './components/home';
import Products from './components/Products/products';
import Cart from './components/Cart/cart';
import Login from './components/Login/loginn';
import Signup from './components/Login/signup';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { DataProvider } from './GlobalState';
import ProductDetails from './components/Products/ProductDetails';
import CreatePro from './components/Products/CreatePro';
import Footer from './components/footerr/Footer';
import Success from './components/payment/Success';
import Failed from './components/payment/Failed';


function App() {
  return (
    <>
      <DataProvider>

        <Router>
          <div className="App mx-5  lg:mx-14">

            <Navbar />

            <Routes>

              <Route path='/' element={<Home />} />
              <Route path='/products' element={<Products />} />
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<Signup />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/cart/success/:paymentId' element={<Success />} />
              <Route path='/cart/failed' element={<Failed />} />
              <Route path='/products/:id' element={<ProductDetails />} />
              <Route path='/products/create' element={<CreatePro />} />

            </Routes>

            {/* helloooo   */}
            <Footer />
          </div>
        </Router>

      </DataProvider>
      
        
    </>
  );
}

export default App;



