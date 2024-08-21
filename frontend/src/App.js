import React from 'react';
import Navbar from './components/Navbar';
import Home from './components/home';
import Products from './components/Products/products';
import Cart from './components/Cart/cart';
import Login from './components/Login/loginn';
import Signup from './components/Login/signup';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { DataProvider } from './GlobalState';


function App() {
  return (
    <>
      <DataProvider>

        <Router>
          <div className="App mx-5 lg:mx-14">

            <Navbar />

            <Routes>

              <Route path='/' element={<Home />} />
              <Route path='/products' element={<Products />} />
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<Signup />} />
              <Route path='/cart' element={<Cart />} />

            </Routes>

            {/* helloooo   */}
          </div>
        </Router>

      </DataProvider>
      
        
    </>
  );
}

export default App;



