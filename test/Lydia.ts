import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('Lydia', function () {
  async function deployLydiaFixture() {
    const [owner, receiver] = await ethers.getSigners();

    const lydiaFactory = await ethers.getContractFactory('Lydia');
    const lydia = await lydiaFactory.deploy();

    return { lydia, owner, receiver };
  }

  it('should update transactionCount', async function () {
    const { lydia, receiver } = await loadFixture(deployLydiaFixture);

    await lydia.transfer(receiver.address, 'test', { value: 1 });
    expect(await lydia.transactionCount()).to.equal(1);
  });

  it('should increase receiver balance from 1 ether', async function () {
    const { lydia, receiver } = await loadFixture(deployLydiaFixture);
    const receiverBalance = await lydia.provider.getBalance(receiver.address);

    await lydia.transfer(receiver.address, 'sending 1 ether', { value: ethers.utils.parseEther('1') });

    expect(await lydia.provider.getBalance(receiver.address)).to.equal(
      receiverBalance.add(ethers.utils.parseEther('1'))
    );
    const eventsEmitted = await lydia.provider.getLogs({ fromBlock: 0, toBlock: 'latest' });
    console.log(eventsEmitted);
  });

  it('should emit transfer event', async function () {
    const { lydia, owner, receiver } = await loadFixture(deployLydiaFixture);
    const latestBlock = await ethers.provider.getBlock('latest');

    await expect(lydia.transfer(receiver.address, 'emitting event', { value: ethers.utils.parseEther('1') }))
      .to.emit(lydia, 'Transfer')
      .withArgs(
        owner.address,
        receiver.address,
        ethers.utils.parseEther('1'),
        'emitting event',
        latestBlock.timestamp + 1
      );
  });
});
