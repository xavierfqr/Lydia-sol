import { ethers } from 'ethers';
import { contractAbi, contractAddress } from '../constants/constants';

export const getLydiaContract = () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  return new ethers.Contract(contractAddress, contractAbi, provider.getSigner());
};

export const shortenAddress = (account: string) => {
  return `${account.substring(0, 5)}...${account.substring(account.length - 4, account.length)}`;
};
