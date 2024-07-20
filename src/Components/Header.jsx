import React, { useState } from 'react';
import connectWallet from '../utils/connectWallet';
import MintNFT from "./MintNFT"
 const Header = ({ connected, setConnected, state, setState, cart, setIsModalOpen, setPictures }) => {
  const totalItems = cart.length;
  const handleConnect = async() => {
    const {selectedAccount, provider, marketplaceContract} = await connectWallet();
    setConnected(true);
    setState({selectedAccount, provider, marketplaceContract});
  }  

  const openCart = () => {
    setIsModalOpen(true);
  };

  return (
    <header className="flex justify-evenly items-center w-full p-4  bg-blue-700 text-white shadow-lg">
    <MintNFT 
      selectedAccount={state.selectedAccount} 
      marketplaceContract={state.marketplaceContract} 
      setPictures={setPictures} 
      provider={state.provider}
    />
    <button 
      className={`bg-green-600 text-white py-2 px-4 rounded-lg shadow-md transition-transform duration-300 'hover:scale-105'}`} 
      onClick={handleConnect} 
      disabled={connected} 
      type="button"
    >
      {connected ? "Connected" : "Connect Metamask"}
    </button>
    <div 
      className="flex items-center bg-green-600 py-2 px-4 rounded-lg shadow-md cursor-pointer transition-transform duration-300 hover:scale-105" 
      onClick={openCart}
    >
      <span className="text-lg font-semibold">Cart ({totalItems})</span>
    </div>
  </header>
  
  );
  
};

export default Header;

