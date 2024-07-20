import React from 'react';
import Picture from './Picture';

const Gallery = ({ pictures, setPictures, setCart, cart, marketplaceContract}) => {
  return (
    <div className="flex flex-wrap gap-0.5 justify-center">
      {pictures.map((picture) => (
        <Picture 
        key={picture.tokenId} 
        picture={picture} 
        pictures={pictures}
        setPictures={setPictures}
        setCart={setCart}
        cart={cart} 
        marketplaceContract = {marketplaceContract} />
      ))}
    </div>
  );
  
};

export default Gallery;


