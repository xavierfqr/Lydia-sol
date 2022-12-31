import { ethers } from 'hardhat';
import dotenv from 'dotenv';

dotenv.config();

async function main() {
  const privateKey = process.env.PRIVATE_KEY as string;
  const provider = new ethers.providers.JsonRpcProvider(process.env.GOERLI_NODE_URL);

  const wallet = new ethers.Wallet(privateKey, provider);

  const lydiaFactory = await ethers.getContractFactory('Lydia', wallet);
  const lydia = await lydiaFactory.deploy();
  console.log('contract address:', lydia.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
