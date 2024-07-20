import React, { createContext, useEffect, useState } from 'react';
import Header from './Components/Header';
import Gallery from './Components/Gallery';
import Cart from './Components/Cart';
import useFetchImages from './utils/useFetchImages';

const App = () => {
  const [connected, setConnected] = useState(false);
  const [pictures, setPictures] = useState([]);
  const [cart, setCart] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [state, setState] = useState({selectedAccount:null, provider:null, marketplaceContract:null});
  let images;
  useEffect(()=>{
    const fetchImages = async() => {
      if(connected){
        images = await useFetchImages(state.marketplaceContract, state.provider);
        setPictures(images);
      }
    }
    fetchImages();
  },[images, state, cart, connected])
  return (
    <div className="w-screen mx-auto text-left ">
      <Header 
        connected={connected} 
        setConnected={setConnected} 
        cart={cart} 
        setIsModalOpen={setIsModalOpen} 
        state={state} 
        setState={setState} 
        setPictures={setPictures} 
      />
      <Gallery 
        pictures={pictures} 
        setPictures={setPictures}
        cart={cart} 
        setCart={setCart} 
        marketplaceContract={state.marketplaceContract}
      />
      {isModalOpen && (
        <Cart 
          setCart={setCart} 
          cart={cart} 
          setIsModalOpen={setIsModalOpen} 
          pictures={pictures} 
          setPictures={setPictures} 
        />
      )}
    </div>
  );
  
};

export default App;


