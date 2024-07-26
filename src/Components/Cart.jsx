import React from 'react';
import buy from '../utils/buy';


const Cart = ({ cart, setCart, pictures, setPictures, setIsModalOpen, marketplaceContract, selecedAccount }) => {
  const closeCart = () => {
    setIsModalOpen(false);
  };

  const handleRemove = (tokenId) => {
    setCart(cart.filter(item => item.tokenId !== tokenId));
  };

  const handleBuy = async(item) => {
    try{
      const seller = await marketplaceContract.ownerOf(item.tokenId);
      if(selecedAccount===seller){
        throw new Error("You already own the NFT");
      }

      const transaction = await buy(marketplaceContract, item.tokenId, item.price);
      if(transaction){
        const remainingItems = cart.filter(cartItem => cartItem.tokenId !== item.tokenId);
        setCart(remainingItems);
        const remainingPictures = pictures.filter(picture => picture.tokenId !== item.tokenId);
        setPictures(remainingPictures);
      }

    }catch(error){
      console.error(error);
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center border-b pb-4">
          <h2 className="text-xl font-semibold">Shopping Cart</h2>
          <button className="text-2xl font-bold text-gray-600 hover:text-gray-800" onClick={closeCart}>
            &times;
          </button>
        </div>
        {cart.length === 0 ? (
          <div className="mt-6 text-center">
            <p className="text-lg font-medium text-gray-700">Your cart is empty!</p>
          </div>
        ) : (
          <>
            <div className="mt-4 overflow-y-auto max-h-60">
              <ul className="space-y-4">
                {cart.map(item => (
                  <li key={item.tokenId} className="flex items-center space-x-4">
                    <img src={item.url} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                    <div className="flex flex-col flex-grow">
                      <h3 className="text-lg font-medium">{item.name}</h3>
                      <p className="text-gray-600">{item.price} eth</p>
                    </div>
                    <button
                      className="text-xl bg-green-600  text-white rounded-lg px-2 py-1  hover:text-white"
                      onClick={() => handleBuy(item)}
                    >
                      Buy
                    </button>
                    <button
                      className="text-xl bg-red-600 rounded-lg px-2 py-1  text-white hover:text-gray-800"
                      onClick={() =>  handleRemove(item.tokenId)}
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
