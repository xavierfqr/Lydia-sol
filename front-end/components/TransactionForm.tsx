import { Input, InputGroup, InputLeftElement, Textarea, InputRightAddon } from '@chakra-ui/react';
import { ethers } from 'ethers';
import Image from 'next/image';
import React from 'react';
import { useErrorNotification, useSuccessNotification } from '../hooks/notifications';
import { getLydiaContract } from '../utils/contract';

function TransactionForm() {
  const [form, setForm] = React.useState({
    to: '',
    message: '',
    amount: '0',
  });

  const errorNotification = useErrorNotification();
  const successNotification = useSuccessNotification();

  const handleInputChange = (e: React.ChangeEvent<any>) => {
    const name = e.target.name;
    const value = e.target.value;
    setForm({ ...form, [name]: value });
  };

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const lydiaContract = getLydiaContract();
      await lydiaContract.transfer(form.to, form.message, { value: ethers.utils.parseEther(form.amount) });
      successNotification('Transaction sent !');
    } catch (e) {
      errorNotification('Something went wrong');
    }
  };

  return (
    <form
      onSubmit={handleSubmitForm}
      className="p-3 border-4 text-white bg-gray-900 border-gray-700 w-full mt-8 ml-8 border-opacity-50 rounded-lg h-full"
    >
      <h3 className="font-medium pb-4 border-b-2 border-gray-400">Send Payment</h3>
      <div>
        <div className="flex mt-4">
          <Image src="/swap.png" alt="swap" width="22" height="22" className="mr-2" />
          <span className="text-red font-medium">Swap to</span>
        </div>
        <div className="mt-4 p-2">
          <div className="flex mb-4">
            <InputGroup>
              <InputLeftElement pointerEvents="none" children={<div>To</div>} />
              <Input
                placeholder="0xA4BC09..."
                name="to"
                value={form.to}
                style={{ outline: 'none', borderRadius: 0, color: 'white' }}
                onChange={handleInputChange}
              ></Input>
            </InputGroup>
          </div>
          <div className="flex">
            <Textarea
              className="flex-grow outline-none resize-none border-2 border-gray-400 bg-transparent p-2 h-24 rounded-2xl placeholder-gray-500"
              placeholder="Send a cute message"
              name="message"
              value={form.message}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>

      <div className="mt-6">
        <div className="font-semibold">AMOUNT</div>
        <div className="flex">
          <InputGroup>
            <Input
              name="amount"
              value={form.amount}
              style={{ outline: 'none', borderRadius: 0 }}
              onChange={handleInputChange}
            ></Input>
            <InputRightAddon pointerEvents="none" children={<div>ETH</div>} background="transparent" />
          </InputGroup>

          <button className="hover:bg-gray-700 text-white bg-gray-800 p-2 rounded ml-4" type="submit">
            Send
          </button>
        </div>
      </div>
    </form>
  );
}

export default TransactionForm;
