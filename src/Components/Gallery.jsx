import React from 'react';
import buy from '../utils/buy';

const Gallery = ({ pictures, setPictures, setCart, cart, marketplaceContract, selectedAccount }) => {
  const addToCart = (picture) => {
    if (cart.some(item => item.tokenId === picture.tokenId)) {
      alert("This NFT is already there in your cart!");
    } else {
      setCart([...cart, picture]);
    }
  };

  const handleAddToCart = (picture) => {
    addToCart(picture);
  };

  const handleBuyNow = async (picture) => {
    try {
      const seller = await marketplaceContract.ownerOf(picture.tokenId);
      if (selectedAccount === seller) {
        throw new Error("You already own this NFT!");
      }
      const transaction = await buy(marketplaceContract, picture.tokenId, picture.price);
      if (transaction) {
        const remainingPictures = pictures.filter(temp => temp.tokenId !== picture.tokenId);
        setPictures(remainingPictures);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-wrap gap-0.5 justify-center">
      {pictures.map((picture) => (
        <div key={picture.tokenId} className="flex flex-col justify-between items-center p-2.5 border border-gray-300 rounded-lg h-100">
          <img src={picture.url} className="w-full max-w-xs h-70 object-contain rounded-lg mb-2.5" />
          <div className="text-center mt-auto">
            <p className="my-1.5 text-lg">{picture.price} eth</p>
            <div className="flex flex-col gap-2">
              <button
                className="py-2 px-4 bg-blue-500 text-white border-none rounded cursor-pointer hover:bg-blue-700"
                onClick={() => handleAddToCart(picture)}
              >
                Add to cart
              </button>
              <button
                className="py-2 px-4 bg-blue-500 text-white border-none rounded cursor-pointer hover:bg-blue-700"
                onClick={() => handleBuyNow(picture)}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Gallery;

  


