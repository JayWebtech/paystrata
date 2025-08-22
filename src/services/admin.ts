import axiosInstance from './config';

export interface AdminUser {
  id: string;
  email: string;
  role: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  token: string;
  user: AdminUser;
}

export interface Transaction {
  id: string;
  amount: number;
  txn_type: string;
  wallet_address: string;
  status: string;
  timestamp: string;
  refunded: boolean;
  hash?: string;
  refcode?: string;
  phone_number?: string;
  iuc_number?: string;
  meter_number?: string;
  network?: string;
  stark_amount?: number;
  created_at: string;
  updated_at: string;
}

export interface PendingTransaction {
  id: string;
  amount: number;
  txn_type: string;
  wallet_address: string;
  status: string;
  timestamp: string;
  hash?: string;
  refcode?: string;
  phone_number?: string;
  iuc_number?: string;
  meter_number?: string;
  network?: string;
  stark_amount?: number;
  created_at: string;
  updated_at: string;
}

export interface Refund {
  id: string;
  transaction_id: string;
  amount: number;
  reason?: string;
  status: string;
  processed_at?: string;
  created_at: string;
  updated_at: string;
}

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export interface TransactionsResponse {
  transactions: Transaction[];
  pagination: PaginationInfo;
}

export interface PendingTransactionsResponse {
  pendingTransactions: PendingTransaction[];
  pagination: PaginationInfo;
}

export interface RefundsResponse {
  refunds: Refund[];
  pagination: PaginationInfo;
}

export interface SearchTransactionsResponse {
  data: Transaction[];
  success: boolean;
}

export interface Analytics {
  totalTransactions: number;
  totalAmount: number;
  totalProfit: number;
  averageTransactionAmount: number;
  successRate: number;
  totalUsers: number;
  pendingTransactions: number;
  totalRefunds: number;
}

export interface RecentActivity {
  id: string;
  type: 'transaction' | 'pending_transaction' | 'refund';
  status: string;
  amount: number;
  description: string;
  txn_type?: string;
  network?: string;
  phone_number?: string;
  created_at: string;
  refcode?: string;
}

export interface Swap {
  id: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  amount: string;
  from_token: string;
  to_token: string;
  user_address: string;
  refcode?: string;
  result?: any;
  error?: string;
  created_at: string;
  updated_at: string;
}

export interface SwapsResponse {
  swaps: Swap[];
  pagination: PaginationInfo;
}

class AdminService {
  private isBrowser(): boolean {
    return typeof window !== 'undefined';
  }

  private getAuthHeaders() {
    if (!this.isBrowser()) return {};
    const token = localStorage.getItem('adminToken');
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  // Admin Authentication
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await axiosInstance.post('/admin/login', credentials) as LoginResponse;
    if (response.success && response.token && this.isBrowser()) {
      localStorage.setItem('adminToken', response.token);
      localStorage.setItem('adminUser', JSON.stringify(response.user));
    }
    return response;
  }

  logout(): void {
    if (!this.isBrowser()) return;
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
  }

  getCurrentUser(): AdminUser | null {
    if (!this.isBrowser()) return null;
    const userStr = localStorage.getItem('adminUser');
    return userStr ? JSON.parse(userStr) : null;
  }

  isAuthenticated(): boolean {
    if (!this.isBrowser()) return false;
    return !!localStorage.getItem('adminToken');
  }

  // Transactions
  async getTransactions(page: number = 1, limit: number = 10): Promise<TransactionsResponse> {
    return await axiosInstance.get('/admin/transactions', {
      headers: this.getAuthHeaders(),
      params: { page, limit }
    }) as TransactionsResponse;
  }

  async searchTransactions(reference?: string, walletAddress?: string): Promise<SearchTransactionsResponse> {
    const params: any = {};
    if (reference) params.reference = reference;
    if (walletAddress) params.wallet_address = walletAddress;

    return await axiosInstance.get('/admin/search-txn', {
      headers: this.getAuthHeaders(),
      params
    }) as SearchTransactionsResponse;
  }

  // Pending Transactions
  async getPendingTransactions(page: number = 1, limit: number = 10): Promise<PendingTransactionsResponse> {
    return await axiosInstance.get('/admin/pending-transactions', {
      headers: this.getAuthHeaders(),
      params: { page, limit }
    }) as PendingTransactionsResponse;
  }

  // Refunds
  async getRefunds(page: number = 1, limit: number = 10): Promise<RefundsResponse> {
    return await axiosInstance.get('/refunds', {
      headers: this.getAuthHeaders(),
      params: { page, limit }
    }) as RefundsResponse;
  }

  async createRefund(transactionId: string, amount: number, reason?: string): Promise<any> {
    return await axiosInstance.post('/refunds', {
      transaction_id: transactionId,
      amount,
      reason
    }, {
      headers: this.getAuthHeaders()
    }) as any;
  }

  async processRefund(refundId: string): Promise<any> {
    return await axiosInstance.put(`/refunds/${refundId}/process`, {}, {
      headers: this.getAuthHeaders()
    }) as any;
  }

  // Swaps
  async getSwaps(page: number = 1, limit: number = 10): Promise<SwapsResponse> {
      return await axiosInstance.get('/admin/swaps', {
      headers: this.getAuthHeaders(),
      params: { page, limit }
    }) as SwapsResponse;
  }

  async refundTransaction(refcode: string, amountInSTRK: number, isMainnet: boolean = false): Promise<any> {
    return await axiosInstance.post('/refunds/process', {
      refcode,
      amountInSTRK,
      isMainet: isMainnet
    }, {
      headers: this.getAuthHeaders()
    }) as any;
  }

  // Analytics
  async getAnalytics(): Promise<Analytics> {
    try {
      const [transactionsRes, pendingRes, refundsRes] = await Promise.all([
        this.getTransactions(1, 1000), // Get all transactions for analytics
        this.getPendingTransactions(1, 1000),
        this.getRefunds(1, 1000)
      ]);

      const transactions = transactionsRes?.transactions || [];
      const pendingTransactions = pendingRes?.pendingTransactions || [];
      const refunds = refundsRes?.refunds || [];

      const totalTransactions = transactions.length || 0;
      const successfulTransactions = transactions.filter(tx => tx.status === 'success') || [];
      
      // Ensure amounts are valid numbers
      const totalAmount = successfulTransactions.reduce((sum, tx) => {
        const amount = Number(tx.amount) || 0;
        return sum + amount;
      }, 0);
      
      const totalProfit = totalAmount * 0.05; // 5% profit margin
      const averageTransactionAmount = successfulTransactions.length > 0 ? totalAmount / successfulTransactions.length : 0;
      const successRate = totalTransactions > 0 ? (successfulTransactions.length / totalTransactions) * 100 : 0;
      const uniqueUsers = new Set(transactions.map(tx => tx.wallet_address).filter(Boolean)).size || 0;
      const totalRefundsCount = refunds.length || 0;

      return {
        totalTransactions,
        totalAmount: Math.round(totalAmount * 100) / 100, // Round to 2 decimal places
        totalProfit: Math.round(totalProfit * 100) / 100,
        averageTransactionAmount: Math.round(averageTransactionAmount * 100) / 100,
        successRate: Math.round(successRate * 10) / 10, // Round to 1 decimal place
        totalUsers: uniqueUsers,
        pendingTransactions: pendingTransactions.length || 0,
        totalRefunds: totalRefundsCount
      };
    } catch (error) {
      console.error('Error calculating analytics:', error);
      // Return default values if there's an error
      return {
        totalTransactions: 0,
        totalAmount: 0,
        totalProfit: 0,
        averageTransactionAmount: 0,
        successRate: 0,
        totalUsers: 0,
        pendingTransactions: 0,
        totalRefunds: 0
      };
    }
  }

  // Recent Activity
  async getRecentActivity(): Promise<RecentActivity[]> {
    try {
      const [transactionsRes, pendingRes, refundsRes] = await Promise.all([
        this.getTransactions(1, 5), // Get latest 5 transactions
        this.getPendingTransactions(1, 5), // Get latest 5 pending transactions
        this.getRefunds(1, 5) // Get latest 5 refunds
      ]);

      const activities: RecentActivity[] = [];

      // Add recent transactions
      if (transactionsRes?.transactions) {
        transactionsRes.transactions.forEach(tx => {
          activities.push({
            id: tx.id,
            type: 'transaction',
            status: tx.status,
            amount: tx.amount,
            description: this.getTransactionDescription(tx),
            txn_type: tx.txn_type,
            network: tx.network,
            phone_number: tx.phone_number,
            created_at: tx.created_at,
            refcode: tx.refcode
          });
        });
      }

      // Add pending transactions
      if (pendingRes?.pendingTransactions) {
        pendingRes.pendingTransactions.forEach(tx => {
          activities.push({
            id: tx.id,
            type: 'pending_transaction',
            status: tx.status,
            amount: tx.amount,
            description: this.getTransactionDescription(tx),
            txn_type: tx.txn_type,
            network: tx.network,
            phone_number: tx.phone_number,
            created_at: tx.created_at,
            refcode: tx.refcode
          });
        });
      }

      // Add refunds
      if (refundsRes?.refunds) {
        refundsRes.refunds.forEach(refund => {
          activities.push({
            id: refund.id,
            type: 'refund',
            status: refund.status,
            amount: refund.amount,
            description: `Refund ${refund.status}`,
            created_at: refund.created_at
          });
        });
      }

      // Sort by created_at descending and take the 10 most recent
      return activities
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .slice(0, 10);
    } catch (error) {
      console.error('Error fetching recent activity:', error);
      return [];
    }
  }

  private getTransactionDescription(tx: any): string {
    const amount = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'NGN'
    }).format(tx.amount);

    switch (tx.txn_type?.toLowerCase()) {
      case 'airtime_purchase':
        return `${amount} airtime purchase${tx.network ? ` (${tx.network})` : ''}`;
      case 'data_purchase':
        return `${amount} data purchase${tx.network ? ` (${tx.network})` : ''}`;
      case 'cable_payment':
        return `${amount} cable payment${tx.network ? ` (${tx.network})` : ''}`;
      case 'utility_payment':
        return `${amount} utility payment${tx.network ? ` (${tx.network})` : ''}`;
      default:
        return `${amount} ${tx.txn_type?.replace('_', ' ') || 'transaction'}`;
    }
  }
}

export const adminService = new AdminService();
export default adminService;
