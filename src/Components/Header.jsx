import React, { useState } from 'react';
import connectWallet from '../utils/connectWallet';
import MintNFT from "./MintNFT"
import { useEffect } from 'react';
import { handleAccountChange } from '../utils/handleAccountChange';
 const Header = ({ connected, setConnected, state, setState, cart, setIsModalOpen, pictures, setPictures }) => {
  const totalItems = cart.length;
  const handleConnect = async() => {
    const {selectedAccount, provider, marketplaceContract} = await connectWallet();
    setConnected(true);
    setState({selectedAccount, provider, marketplaceContract});
  }  
  let {selectedAccount, provider, marketplaceContract} = state;
  const openCart = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    window.ethereum.on('accountsChanged' , () => handleAccountChange(setState));

    return () => {
      window.ethereum.removeListener('accountsChanged', () => handleAccountChange(setState));
    }

  }, [])

  return (
    <header className="flex justify-evenly items-center w-full p-4  bg-blue-700 text-white shadow-lg">
    <MintNFT 
      selectedAccount={state.selectedAccount} 
      marketplaceContract={state.marketplaceContract} 
      pictures={pictures}
      setPictures={setPictures} 
      provider={state.provider}
    />

    <div 
      className="flex items-center bg-green-600 py-2 px-4 rounded-lg shadow-md cursor-pointer transition-transform duration-300 hover:scale-105" 
      onClick={openCart}
    >
      <span className="text-lg font-semibold">Cart ({totalItems})</span>
    </div>
    <button 
      className={`float-right bg-green-600 text-white py-2 px-4 rounded-lg shadow-md transition-transform duration-300 'hover:scale-105'}`} 
      onClick={handleConnect} 
      disabled={connected} 
      type="button"
    >
      {connected ?` ${(selectedAccount).substring(0,7)}...${(selectedAccount).substring(selectedAccount.length-5, selectedAccount.length)} ` : "Connect Metamask"}
    </button>

  </header>
  
  );
  
};

export default Header;

