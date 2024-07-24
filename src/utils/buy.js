import { ethers } from 'ethers';
import React, { useEffect } from 'react'

const buy = async(marketplaceContract, tokenId, price) => {
    let transaction;
        try{
            const priceInWei = ethers.parseEther(price.toString());
         transaction = await marketplaceContract.purchaseToken(tokenId, {value: priceInWei, gas:4000000});
          alert('transaction successfull!');
          return transaction;
        }
        catch(error){
            console.error(error);
     
        }
}
 

export default buy
