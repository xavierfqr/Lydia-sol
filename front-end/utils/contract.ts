import { ethers } from 'ethers';
import { contractAbi, contractAddress } from '../constants/constants';

export const getLydiaContractWithSigner = () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  return new ethers.Contract(contractAddress, contractAbi, provider.getSigner());
};

export const getLydiaContract = () => {
  const provider = new ethers.providers.JsonRpcProvider(
    'https://eth-goerli.g.alchemy.com/v2/PXaWgVGVciOz5ampB-BAT6qb1YI6GK0G'
  );
  return new ethers.Contract(contractAddress, contractAbi, provider);
};

export const shortenAddress = (account: string) => {
  return `${account.substring(0, 5)}...${account.substring(account.length - 4, account.length)}`;
};
