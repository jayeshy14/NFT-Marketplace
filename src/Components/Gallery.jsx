import React from 'react';
import useFetchImages from '../utils/useFetchImages';
import buyNow from '../utils/buy';
import Picture from './Picture';
const Gallery = ({ pictures, setPictures, setCart, cart, marketplaceContract}) => {
  return (
    <div className="flex flex-wrap gap-0.5 justify-center">
      {pictures.map((picture) => (
       <Picture key ={picture.tokenId} cart={cart} setCart={setCart} picture ={picture} setPictures = {setPictures} pictures={pictures} marketplaceContract={marketplaceContract}/>
      ))}
    </div>
  );
  
}
export default Gallery;


