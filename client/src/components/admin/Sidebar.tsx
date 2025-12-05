'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Receipt, 
  RotateCcw, 
  DollarSign, 
  TrendingUp,
  Users,
  Loader2,
  Search,
  Clock,
  LogOut,
  ArrowLeftRight
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import adminService from '@/services/admin';

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState(adminService.getCurrentUser());

  const navItems = [
    {
      name: 'Dashboard',
      href: '/admin/dashboard',
      icon: LayoutDashboard
    },
    {
      name: 'Transactions',
      href: '/admin/transactions',
      icon: Receipt
    },
    {
      name: 'Pending Transactions',
      href: '/admin/pending-transactions',
      icon: Clock
    },
    {
      name: 'Search',
      href: '/admin/search-txn',
      icon: Search
    },
    {
      name: 'Refunds',
      href: '/admin/refunds',
      icon: RotateCcw
    },
    {
      name: 'Swaps',
      href: '/admin/swaps',
      icon: ArrowLeftRight
    }
  ];

  const handleLogout = () => {
    adminService.logout();
    toast.success('Signed out successfully');
    router.push('/admin/login');
  };

  return (
    <div className="flex h-screen">
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col shadow-lg">
        {/* Logo/Brand */}
        <div className="h-16 flex items-center justify-center border-b border-gray-200 bg-gradient-to-r from-primary to-primary2">
          <h1 className="text-xl font-bold text-white">StarkPay Admin</h1>
        </div>

        {/* User Info */}
        {currentUser && (
          <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
            <div className="text-sm text-gray-600">Welcome back,</div>
            <div className="text-sm font-medium text-gray-900 truncate">{currentUser.email}</div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 px-4 py-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? 'bg-purple-50 text-primary border-r-2 border-primary'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700 rounded-lg transition-colors"
          >
            <LogOut className="mr-3 h-5 w-5" />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
} 