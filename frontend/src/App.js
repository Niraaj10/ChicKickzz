import React from 'react';
import Navbar from './components/Navbar';
import Home from './components/home';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <>
    <div className="App mx-5 lg:mx-14">      
      <Router>
        
        {/* <Navbar /> */}
        <Home />
      </Router>

      {/* helloooo   */}
    </div>
    </>
  );
}

export default App;
