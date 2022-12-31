import Navbar from '../components/Navbar';
import TransactionForm from '../components/TransactionForm';
import Transactions from '../components/Transactions';

export default function Home() {
  return (
    <div className="bg-gradient-to-r from-gray-700 via-gray-900 to-black h-screen">
      <Navbar></Navbar>
      <div className="flex">
        <TransactionForm />
        <Transactions />
      </div>
    </div>
  );
}
