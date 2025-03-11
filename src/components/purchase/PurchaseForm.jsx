"use client";
import React, { useState } from "react";
import InputField from "../form/InputField";
import Tabs from "./Tabs";
import Button from "../form/Button";

const providers = [
  { name: "MTN", logo: "/logos/mtn.jpg", prefixes: ["0803", "0703", "0903", "0806", "0706", "0813", "0810", "0814", "0816", "0906", "0913"] },
  { name: "Glo", logo: "/logos/glo.svg", prefixes: ["0805", "0807", "0705", "0811", "0815", "0905", "0915"] },
  { name: "Airtel", logo: "/logos/airtel.jpg", prefixes: ["0802", "0808", "0708", "0701", "0812", "0901", "0902", "0904", "0907", "0912"] },
  { name: "9Mobile", logo: "/logos/9mobile.jpg", prefixes: ["0809", "0817", "0818", "0908", "0909"] },
];

const PurchaseForm = () => {
  const [activeTab, setActiveTab] = useState("buy-data");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [networkLogo, setNetworkLogo] = useState(null);

  // Function to detect network provider
  const detectProvider = (number) => {
    if (number.length >= 4) {
      const prefix = number.slice(0, 4);
      const provider = providers.find((p) => p.prefixes.includes(prefix));

      if (provider) {
        setNetworkLogo(provider.logo);
      } else {
        setNetworkLogo(null);
      }
    } else {
      setNetworkLogo(null);
    }
  };

  const handlePhoneNumberChange = (e) => {
    const value = e.target.value;
    setPhoneNumber(value);
    detectProvider(value);
  };

  return (
    <div className="container mx-auto px-4 sm:px-10 md:px-8 lg:px-16 pt-10">
      <div className="max-w-2xl mx-auto">
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="hero-card border-[1px] border-stroke rounded-lg flex flex-col gap-3 p-8 backdrop-blur-xl mt-5">
          {activeTab === "buy-data" && (
            <>
              <InputField
                label="Phone Number"
                placeholder="Enter phone number"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                networkLogo={networkLogo}
                type="numeric"
                max={11}
              />
              <InputField label="Data Plan" placeholder="Select data plan" />
            </>
          )}

          {activeTab === "buy-airtime" && (
            <>
              <InputField
                label="Phone Number"
                placeholder="Enter phone number"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                networkLogo={networkLogo}
              />
              <InputField
                label="Amount"
                type="number"
                placeholder="Enter amount"
              />
            </>
          )}

          {activeTab === "pay-cable" && (
            <>
              <InputField label="Cable Provider" placeholder="Enter provider" />
              <InputField
                label="Smart Card Number"
                placeholder="Enter smart card number"
              />
            </>
          )}

          {activeTab === "pay-utility" && (
            <>
              <InputField
                label="Utility Type"
                placeholder="Enter utility type"
              />
              <InputField
                label="Account Number"
                placeholder="Enter account number"
              />
            </>
          )}

          {activeTab === "pay-tax" && (
            <>
              <InputField
                label="Utility Type"
                placeholder="Enter utility type"
              />
              <InputField
                label="Account Number"
                placeholder="Enter account number"
              />
            </>
          )}
        </div>

        <Button className="mt-5 py-5 w-full">Pay now</Button>
      </div>
    </div>
  );
};

export default PurchaseForm;
