import React, { useEffect, useState} from 'react';
import { ethers } from 'ethers';
import useFetchImages from '../utils/useFetchImages';

const MintNFT = ({ selectedAccount, marketplaceContract, pictures, setPictures, provider }) => {
  const [uri, setUri] = useState('');
  const [price, setPrice] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const mint = async () => {
    try {
      if (isNaN(price) || parseFloat(price) <= 0) {
        throw new Error('Invalid price. Please enter a positive number.');
      }
      const totalSupply = await marketplaceContract.nextTokenId();
      const priceInWei = ethers.parseEther(price);
      setIsModalOpen(false);
      const transaction =await marketplaceContract.mint(selectedAccount, uri, priceInWei);
      console.log(transaction);
      if(transaction){
           const picture = {tokenId:Number(totalSupply), price:price, url:`https://gold-quick-antelope-719.mypinata.cloud/ipfs/${uri}`, isForSale:true}
            setPictures([...pictures, picture])   
      }

    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  };
  return (
    <div>
      <button 
        className="bg-gradient-to-r from-teal-700 to-blue-400 text-white py-2 px-4 rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
        onClick={() => setIsModalOpen(true)}
      >
        Mint NFT
      </button>

      {isModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-5 rounded-lg shadow-lg w-4/5 max-w-lg">
            <span 
              className="text-gray-400 float-right text-2xl font-bold cursor-pointer hover:text-black" 
              onClick={() => setIsModalOpen(false)}
            >
              &times;
            </span>
            <h2 className="text-2xl mb-4">Enter Token Details</h2>
            <input
              type="text"
              placeholder="Token URI"
              value={uri}
              onChange={(e) => setUri(e.target.value)}
              className="w-full p-2 mb-4 border text-black border-gray-300 rounded"
            />
            <input
              type="text"
              placeholder="Price in ETH"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full p-2 mb-4 border text-black border-gray-300 rounded"
            />
            <button 
              className="bg-green-500 text-white py-3 px-5 my-2.5 border-none rounded cursor-pointer hover:bg-green-600"
              onClick={mint}
            >
              Mint
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MintNFT;
