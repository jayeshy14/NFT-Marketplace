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
       const marketplaceContractAddress = "0x482035207606Dccd3C12074869B86152d4867f93";

       marketplaceContract= new Contract(marketplaceContractAddress, marketplaceABI, signer);
       console.log('connected')
       
       return {selectedAccount, provider,  marketplaceContract};

    }catch(error){
        console.error(error);
        throw error
    }
    
}

export default connectWallet;

//polygon zkEvm :0x482035207606Dccd3C12074869B86152d4867f93
//ethereum sepolia: 0xEb15419946e7E5F2496B575d4e55CD854766c92C
//new rpc: 0xD0f6026c0A40Dd583ed1658e99aaD2CAA4326f32
//polygon amoy: 0x482035207606Dccd3C12074869B86152d4867f93