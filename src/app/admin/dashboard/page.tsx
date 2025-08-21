'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { Loader2, Receipt, DollarSign, TrendingUp, Users, Clock, AlertCircle, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import Sidebar from '@/components/admin/Sidebar';
import adminService, { Analytics, RecentActivity } from '@/services/admin';

export default function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const router = useRouter();

  useEffect(() => {
    const checkAdminAndLoadData = async () => {
      if (!adminService.isAuthenticated()) {
        router.push('/admin/login');
        return;
      }

      try {
        const [analyticsData, activityData] = await Promise.all([
          adminService.getAnalytics(),
          adminService.getRecentActivity()
        ]);
        setAnalytics(analyticsData);
        setRecentActivity(activityData);
        setIsLoading(false);
      } catch (error: any) {
        console.error('Error loading dashboard:', error);
        if (error.response?.status === 401) {
          adminService.logout();
          router.push('/admin/login');
        } else {
          toast.error('Failed to load dashboard data');
        }
      }
    };

    checkAdminAndLoadData();
  }, [router]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'NGN'
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const getActivityIcon = (activity: RecentActivity) => {
    switch (activity.status?.toLowerCase()) {
      case 'success':
      case 'completed':
        return 'bg-green-500';
      case 'pending':
      case 'processing':
        return 'bg-yellow-500';
      case 'failed':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getActivityTitle = (activity: RecentActivity) => {
    switch (activity.type) {
      case 'transaction':
        return activity.status === 'success' ? 'Transaction completed' : 'Transaction failed';
      case 'pending_transaction':
        return activity.status === 'pending' ? 'Pending transaction' : 'Transaction processing';
      case 'refund':
        return activity.status === 'completed' ? 'Refund processed' : 'Refund pending';
      default:
        return 'Activity';
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) {
      return `${diffInSeconds}s ago`;
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes}m ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours}h ago`;
    } else {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days}d ago`;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-50">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-purple-50 to-indigo-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-sm text-gray-600">Welcome back, {adminService.getCurrentUser()?.email}</p>
              </div>
              <button
                onClick={() => {
                  adminService.logout();
                  toast.success('Signed out successfully');
                  router.push('/admin/login');
                }}
                className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
              >
                Sign out
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {/* Analytics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Transactions</p>
                    <p className="mt-2 text-3xl font-bold text-gray-900">
                      {analytics ? formatNumber(analytics.totalTransactions) : '-'}
                    </p>
                  </div>
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <Receipt className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-green-600 font-medium">+12%</span>
                  <span className="text-gray-500 ml-1">from last month</span>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                    <p className="mt-2 text-3xl font-bold text-gray-900">
                      {analytics ? formatCurrency(analytics.totalAmount) : '-'}
                    </p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-lg">
                    <DollarSign className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-green-600 font-medium">+8%</span>
                  <span className="text-gray-500 ml-1">from last month</span>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Profit</p>
                    <p className="mt-2 text-3xl font-bold text-gray-900">
                      {analytics ? formatCurrency(analytics.totalProfit) : '-'}
                    </p>
                  </div>
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <TrendingUp className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-green-600 font-medium">+15%</span>
                  <span className="text-gray-500 ml-1">from last month</span>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Success Rate</p>
                    <p className="mt-2 text-3xl font-bold text-gray-900">
                      {analytics ? `${analytics.successRate.toFixed(1)}%` : '-'}
                    </p>
                  </div>
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-green-600 font-medium">+2%</span>
                  <span className="text-gray-500 ml-1">from last month</span>
                </div>
              </div>
            </div>

            {/* Additional Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-yellow-100 rounded-lg mr-4">
                    <Clock className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Pending Transactions</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {analytics ? formatNumber(analytics.pendingTransactions) : '-'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-red-100 rounded-lg mr-4">
                    <AlertCircle className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Refunds</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {analytics ? formatNumber(analytics.totalRefunds) : '-'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-purple-100 rounded-lg mr-4">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Unique Users</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {analytics ? formatNumber(analytics.totalUsers) : '-'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {recentActivity.length > 0 ? (
                  recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <div className={`w-2 h-2 ${getActivityIcon(activity)} rounded-full mr-3`}></div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{getActivityTitle(activity)}</p>
                          <p className="text-xs text-gray-500">{activity.description}</p>
                          {activity.refcode && (
                            <p className="text-xs text-gray-400">Ref: {activity.refcode}</p>
                          )}
                        </div>
                      </div>
                      <span className="text-xs text-gray-500">{formatTimeAgo(activity.created_at)}</span>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Clock className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No recent activity</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Recent transactions and activities will appear here.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
} 