import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';
import dotenv from 'dotenv';

dotenv.config();

const config: HardhatUserConfig = {
  solidity: '0.8.17',
  networks: {
    goerli: {
      url: process.env.GOERLI_NODE_URL,
      accounts: [process.env.PRIVATE_KEY as string],
    },
  },
};

export default config;
