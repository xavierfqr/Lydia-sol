import Image from 'next/image';
import React from 'react';

function TransactionForm() {
  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmitForm} className="p-3 border-4 border-gray-700 w-96">
      <h3 className="font-medium pb-4 border-b-2 border-gray-400">Send Payment</h3>
      <div>
        <div className="flex mt-2">
          <Image src="/swap.png" alt="swap" width="22" height="22" className="mr-1" />
          <span className="text-purple-600 font-medium">Swap to</span>
        </div>
        <div className="border-2 border-gray-400 mt-4 p-2">
          <div className="flex mb-1">
            <div className="mr-2">To</div>
            <input className="flex-grow outline-none border-b-2 border-b-gray-200" />
          </div>
          <div className="flex">
            <div className="mr-2">Message</div>
            <textarea className="flex-grow outline-none resize-none border-2 border-b-gray-200" />
          </div>
        </div>
      </div>

      <div className="mt-6">
        <div className="font-semibold">AMOUNT</div>
        <div className="flex">
          <input className="outline-none border-b-2 border-b-gray-200 mr-2" />
          <button className="hover:bg-purple-300 bg-purple-100 p-2 rounded" type="submit">
            Send
          </button>
        </div>
      </div>
    </form>
  );
}

export default TransactionForm;
