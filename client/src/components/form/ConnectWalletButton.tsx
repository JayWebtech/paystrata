'use client';
import React, { useEffect } from 'react';
import Button from './Button';
import { Connector, useAccount, useConnect, useDisconnect } from '@starknet-react/core';
import { StarknetkitConnector, useStarknetkitConnectModal } from 'starknetkit';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Wallet, LogOut, Copy, Check } from 'lucide-react';

interface ConnectWalletButtonProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

/**
 * ConnectWalletButton Component
 * Handles wallet connection flow with Starknet
 * Shows connected state with truncated address and disconnect option
 */
const ConnectWalletButton: React.FC<ConnectWalletButtonProps> = ({
  size = 'md',
  className = '',
}) => {
  const router = useRouter();
  const { disconnect } = useDisconnect();
  const { connect, connectors, isSuccess } = useConnect();
  const { account, address } = useAccount();
  const [copied, setCopied] = React.useState(false);

  const { starknetkitConnectModal } = useStarknetkitConnectModal({
    connectors: connectors as StarknetkitConnector[],
  });

  // Connect wallet handler
  async function connectWallet() {
    const { connector } = await starknetkitConnectModal();
    try {
      if (connector) {
        connect({ connector: connector as Connector });
      } else {
        toast.error('No wallet connectors found. Please make sure Argent or Braavos is installed.');
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to connect wallet. Try again.');
    }
  }

  // Copy address to clipboard
  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      setCopied(true);
      toast.success('Address copied!');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Redirect to pay-bill on successful connection
  useEffect(() => {
    if (isSuccess && address && account) {
      router.push('/pay-bill');
    }
  }, [isSuccess, address, account, router]);

  // Not connected state
  if (!address) {
    return (
      <Button 
        size={size} 
        variant="primary" 
        onClick={connectWallet} 
        className={`flex items-center gap-2 ${className}`}
      >
        <Wallet className="w-4 h-4" />
        <span>Connect</span>
      </Button>
    );
  }

  // Connected state
  return (
    <div className="flex items-center gap-2">
      {/* Address Display */}
      <button
        onClick={copyAddress}
        className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-surface-border hover:border-primary/30 transition-all duration-200 group"
      >
        {/* Avatar */}
        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-[#00A8E8] flex items-center justify-center">
          <span className="text-xs font-bold text-dark">
            {address.slice(2, 4).toUpperCase()}
          </span>
        </div>
        
        {/* Address */}
        <span className="text-xs text-text-secondary group-hover:text-white transition-colors">
          {address.slice(0, 2)}...{address.slice(-3)}
        </span>
        
        {/* Copy Icon */}
        {copied ? (
          <Check className="w-3.5 h-3.5 text-primary" />
        ) : (
          <Copy className="w-3.5 h-3.5 text-text-muted group-hover:text-text-secondary transition-colors" />
        )}
      </button>

      {/* Disconnect Button */}
      <Button 
        onClick={() => disconnect()} 
        variant="ghost"
        size="sm"
        className="!p-2.5 rounded-xl hover:bg-error/10 hover:text-error"
      >
        <LogOut className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default ConnectWalletButton;
