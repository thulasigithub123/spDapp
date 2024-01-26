import Web3 from "web3";
import abi from './artifacts/contracts/SoftwareMarketPlace.sol/SoftwareMarketPlace.json'

const contractAddress='0x5FbDB2315678afecb367f032d93F642f64180aa3'
const deployedContractAbi = abi.abi;
// const provider="http://127.0.0.1:8545"



const web3 = new Web3(window.ethereum);
const ContractInstance = new web3.eth.Contract(deployedContractAbi,contractAddress );
const ContractConnection = {
    web3: web3,
    ContractInstance: ContractInstance,
    contractAddress
  };

export default ContractConnection