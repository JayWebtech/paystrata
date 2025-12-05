'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Wifi, Tv, Lightbulb } from 'lucide-react';

/**
 * Tab configuration
 */
interface Tab {
  name: string;
  id: string;
  icon: React.ReactNode;
}

interface TabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  setIsLoading: (loading: boolean) => void;
  isLoading: boolean;
  setPhoneNumber?: (number: string) => void;
  setNetworkLogo?: (logo: string | null) => void;
  setDataPlans?: (plans: any) => void;
  setFormState?: (state: any) => void;
}

/**
 * Available tabs
 */
const tabs: Tab[] = [
  { name: 'Airtime', id: 'buy-airtime', icon: <Smartphone className="w-4 h-4 sm:w-5 sm:h-5" /> },
  { name: 'Data', id: 'buy-data', icon: <Wifi className="w-4 h-4 sm:w-5 sm:h-5" /> },
  { name: 'Cable', id: 'pay-cable', icon: <Tv className="w-4 h-4 sm:w-5 sm:h-5" /> },
  { name: 'Utility', id: 'pay-utility', icon: <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5" /> },
];

/**
 * Tabs Component
 * Navigation tabs for different payment types
 * Features animated underline indicator and hover effects
 */
const Tabs: React.FC<TabsProps> = ({
  activeTab,
  setActiveTab,
  setIsLoading,
  isLoading,
  setPhoneNumber,
  setNetworkLogo,
  setDataPlans,
  setFormState,
}) => {
  // Handle tab change
  const handleTabChange = (tabId: string) => {
    setIsLoading(false);
    setActiveTab(tabId);
    
    // Reset form state
    if (setPhoneNumber) setPhoneNumber('');
    if (setNetworkLogo) setNetworkLogo(null);
    if (setDataPlans) setDataPlans(null);
    if (setFormState) {
      setFormState({
        phoneNumber: '',
        amount: '',
        IUCNumber: '',
        meterNumber: '',
      });
    }
  };

  return (
    <div className={`
      glass-card p-2 
      ${isLoading ? 'rounded-t-2xl' : 'rounded-2xl'}
    `}>
      <div className="flex justify-between">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`
                relative flex-1 flex items-center justify-center gap-2
                py-3 px-2 sm:px-4
                text-xs sm:text-sm font-medium
                rounded-xl
                transition-all duration-200
                ${isActive 
                  ? 'text-primary bg-primary/10' 
                  : 'text-text-secondary hover:text-white hover:bg-white/5'
                }
              `}
            >
              {/* Icon and Label */}
              <span className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2">
                <span className={`transition-colors ${isActive ? 'text-primary' : ''}`}>
                  {tab.icon}
                </span>
                <span>{tab.name}</span>
              </span>

              {/* Active Indicator */}
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-primary to-[#00A8E8] rounded-full"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Tabs;
