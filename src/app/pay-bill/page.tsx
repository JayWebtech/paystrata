import React from 'react';
import Navbar from '@/components/layouts/Navbar';
import PayBillForm from '@/components/purchase/PayBillForm';

const Page: React.FC = () => {
  return (
    <div className="page-wrapper2 flex flex-col justify-start items-center w-full overflow-hidden h-screen">
      <Navbar />
      <PayBillForm />
    </div>
  );
};

export default Page;
