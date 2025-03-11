import React from "react";
import Navbar from "@/components/layouts/Navbar";
import PurchaseForm from "@/components/purchase/PurchaseForm";

const Page = () => {
  return (
    <div className="page-wrapper2 flex flex-col justify-start items-center w-full overflow-hidden h-screen">
      <Navbar />
      <PurchaseForm />
    </div>
  );
};

export default Page;
