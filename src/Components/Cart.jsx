import React from 'react';
import connectWallet from '../utils/connectWallet';
import payWithMetamask from '../utils/payWithMetamask';

const Cart = ({ cart, setCart, pictures, setPictures, setIsModalOpen }) => {
  const closeCart = () => {
    setIsModalOpen(false);
  };

  const handlePay = async () => {
    try {
      await pay();
    } catch (error) {
      alert("Payment failed!");
    } finally {
      setIsModalOpen(false);
    }
  };

  const pay = async () => {
    try {
      if (cart.length !== 0) {
        await connectWallet();
        const to = '0xcC68948b4eE559Cfd58A7A9c2b4b6B244476F0F1';
        const amount = cart.reduce((total, picture) => total + picture.price, 0);
        console.log(amount);
        const transaction = await payWithMetamask(to, amount.toString());
        console.log(transaction);
        if (transaction) {
          setCart([]);
          const remainingPictures = pictures.filter(picture => !cart.includes(picture));
          setPictures(remainingPictures);
        }
        return transaction;
      } else {
        alert("Your cart is empty!");
      }
    } catch (error) {
      console.error("Payment failed:", error);
    }
  };

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
                  <li key={item.id} className="flex items-center space-x-4">
                    <img src={item.url} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                    <div className="flex flex-col">
                      <h3 className="text-lg font-medium">{item.name}</h3>
                      <p className="text-gray-600">{item.price} eth</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex justify-between mt-6">
              <button 
                className="bg-green-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-green-700 transition-transform duration-300" 
                onClick={handlePay}
              >
                Buy all
              </button>
              <button 
                className="bg-red-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-red-700 transition-transform duration-300" 
                onClick={closeCart}
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
