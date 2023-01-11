import dynamic from 'next/dynamic';

const Navbar = dynamic(() => import('../components/Navbar'), { ssr: false });
import TransactionForm from '../components/TransactionForm';
import Transactions from '../components/Transactions';

export default function Home() {
  return (
    <div className="bg-gradient-to-r from-gray-700 via-gray-900 to-black md:h-screen h-full">
      <Navbar></Navbar>
      <div className="flex flex-col md:flex-row">
        <TransactionForm />
        <Transactions />
      </div>
    </div>
  );
}
