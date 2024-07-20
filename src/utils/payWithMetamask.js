
import Web3 from 'web3';
const payWithMetamask = async(to, amountInEther) => {
    const web3 = new Web3(window.ethereum);
    console.log(web3);
    const accounts = await web3.eth.getAccounts();
    const from = accounts[0];
    const value = web3.utils.toWei(amountInEther, 'ether');
    try{
        const transaction = await web3.eth.sendTransaction({to: to, from: from, value: value, gas:400000});
        alert("Transaction successful!");
        return transaction;
    }catch(error){
        alert('Transaction failed!');
    }
}

export default payWithMetamask
