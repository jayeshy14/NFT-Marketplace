import React from 'react';
import buyNow from '../utils/buy';
import useFetchImages from '../utils/useFetchImages';
const Picture = ({cart, picture, pictures, setPictures, setCart, marketplaceContract }) => {
  const addToCart = (picture) => {
    if(cart.some(item => item.tokenId === picture.tokenId)){
      alert("This NFT is already there in your cart!")
    }else{
      setCart([...cart, picture]);
    }
  }
  const handleAddToCart = () => {
    addToCart(picture);
  };

  const handleBuyNow = async() => {
    try{
          const transaction = await buy(marketplaceContract, picture.tokenId, picture.price);
      if(transaction){
        const remainingPictures= pictures.filter(temp =>temp.tokenId!==picture.tokenId);
        setPictures(remainingPictures);
      }
      }catch(error){
        console.log(error);
      }

  }
  return (
    <div className="flex flex-col justify-between items-center p-2.5 border border-gray-300 rounded-lg h-100">
    <img src={picture.url} className="w-full max-w-xs h-70 object-contain rounded-lg mb-2.5" />
    <div className="text-center mt-auto">
      <p className="my-1.5 text-lg">{picture.price} eth</p>
      <div className="flex flex-col gap-2">
        <button className="py-2 px-4 bg-blue-500 text-white border-none rounded cursor-pointer hover:bg-blue-700" onClick={handleAddToCart}>
          Add to cart
        </button>
        <button className="py-2 px-4 bg-blue-500 text-white border-none rounded cursor-pointer hover:bg-blue-700" onClick = {handleBuyNow}>
          Buy Now
        </button>
      </div>
    </div>
  </div>
  );
};

export default Picture;
