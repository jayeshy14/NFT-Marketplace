import {ethers,Contract} from "ethers";
import marketplaceABI from "../ABI/marketplaceABI.json";


 const connectWallet = async()=>{
    try{
       let signer,provider, marketplaceContract;
       if(window.ethereum===null){
          throw new Error("Metamsk is not installed");
       }
       const accounts = await window.ethereum.request({
        method:'eth_requestAccounts'
       })

       let selectedAccount =accounts[0];
       if(!selectedAccount){
        throw new Error("No ethereum accounts available")
       } 

       provider = new ethers.BrowserProvider(window.ethereum);
       signer = await provider.getSigner();
       const marketplaceContractAddress = "0xAD891c5517B149aEf262DF344451a82FE4d23a01";

       marketplaceContract= new Contract(marketplaceContractAddress, marketplaceABI, signer);
       
       return {selectedAccount, provider,  marketplaceContract};

    }catch(error){
        console.error(error);
        throw error
    }
    
}

export default connectWallet;