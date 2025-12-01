import React from 'react';
import Navbar from '@/components/layouts/Navbar';
import PayBillForm from '@/components/purchase/PayBillForm';

/**
 * Pay Bill Page
 * Main payment interface for utility bills
 */
const Page: React.FC = () => {
  return (
    <div className="page-wrapper2 flex flex-col min-h-screen w-full overflow-hidden">
      <Navbar />
      <main className="flex-1">
        <PayBillForm />
      </main>
    </div>
  );
};

export default Page;
