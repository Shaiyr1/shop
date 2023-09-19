import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Cart from './Components/Cart/Cart';
import Categories from './Components/Categories/Categories';
import Detailed from './Components/Detailed/Detailed';
import Header from './Components/Header/Header';
import Main from './Components/Main/Main';

function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([])
  const [detailed, setDetailed] = useState([]);
  const [cart, setCart] = useState([]);

  return (
    <>
      <div className="App">
        <BrowserRouter>
        <Header cart={cart} setCart={setCart}/>
          <Routes>
            <Route path='/' element={<Main products={products} setProducts={setProducts} 
            categories={categories} setCategories={setCategories}  
            detailed={detailed} setDetailed={setDetailed} cart={cart} setCart={setCart}/>}/>
            <Route path='/categories/:name' element={<Categories products={products} setProducts={setProducts} cart={cart} setCart={setCart} categories={categories} setCategories={setCategories} />}/>
            <Route path='/detailed/:id' element={<Detailed cart={cart} setCart={setCart}/>}/>
            <Route path='/cart' element={<Cart cart={cart} setCart={setCart}/>}/>
          </Routes>

        </BrowserRouter>
      </div>
    </>

  );
}

export default App;
