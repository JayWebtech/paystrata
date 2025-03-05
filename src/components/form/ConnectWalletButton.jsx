"use client";
import React from "react";
import Button from "./Button";

const ConnectWalletButton = ({ size = "sm", className = "" }) => {
  return (
    <div>
      <Button
        size={size}
        type="default"
        onClick={() => {}}
        className={className}
      >
        Connect wallet
      </Button>
    </div>
  );
};

export default ConnectWalletButton;
