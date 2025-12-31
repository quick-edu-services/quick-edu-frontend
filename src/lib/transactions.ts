/**
 * Transaction Management
 * Handles order/transaction data for admin panel
 */

export interface Transaction {
  id: string;
  orderId: string;
  userId: string;
  userName: string;
  userEmail: string;
  courses: {
    courseId: string;
    courseTitle: string;
    price: number;
  }[];
  totalAmount: number;
  currency: string;
  status: 'completed' | 'pending' | 'failed' | 'refunded';
  paymentMethod: string;
  transactionDate: string;
  timestamp: number;
}

/**
 * Get all transactions from localStorage
 */
export const getAllTransactions = (): Transaction[] => {
  const purchases = localStorage.getItem('purchases');
  if (!purchases) return [];
  
  try {
    const parsedPurchases = JSON.parse(purchases);
    return parsedPurchases.map((purchase: any) => ({
      id: purchase.transactionId || purchase.orderId,
      orderId: purchase.orderId,
      userId: purchase.userId,
      userName: purchase.userName || 'Unknown User',
      userEmail: purchase.userEmail || 'N/A',
      courses: [{
        courseId: purchase.courseId,
        courseTitle: purchase.courseTitle,
        price: purchase.amount
      }],
      totalAmount: purchase.amount,
      currency: purchase.currency || 'INR',
      status: purchase.status || 'completed',
      paymentMethod: 'Online Payment',
      transactionDate: purchase.purchaseDate || new Date().toISOString(),
      timestamp: new Date(purchase.purchaseDate || Date.now()).getTime()
    }));
  } catch (error) {
    console.error('Error parsing transactions:', error);
    return [];
  }
};

/**
 * Get transaction statistics
 */
export const getTransactionStats = () => {
  const transactions = getAllTransactions();
  
  const totalTransactions = transactions.length;
  const completedTransactions = transactions.filter(t => t.status === 'completed').length;
  const totalRevenue = transactions
    .filter(t => t.status === 'completed')
    .reduce((sum, t) => sum + t.totalAmount, 0);
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayTransactions = transactions.filter(t => 
    new Date(t.transactionDate).getTime() >= today.getTime()
  ).length;
  
  return {
    totalTransactions,
    completedTransactions,
    totalRevenue,
    todayTransactions,
    averageOrderValue: totalTransactions > 0 ? totalRevenue / completedTransactions : 0
  };
};

/**
 * Filter transactions by date range
 */
export const filterTransactionsByDateRange = (
  transactions: Transaction[],
  startDate: Date,
  endDate: Date
): Transaction[] => {
  return transactions.filter(t => {
    const transactionDate = new Date(t.transactionDate);
    return transactionDate >= startDate && transactionDate <= endDate;
  });
};

/**
 * Search transactions
 */
export const searchTransactions = (
  transactions: Transaction[],
  searchTerm: string
): Transaction[] => {
  const term = searchTerm.toLowerCase();
  return transactions.filter(t => 
    t.orderId.toLowerCase().includes(term) ||
    t.userName.toLowerCase().includes(term) ||
    t.userEmail.toLowerCase().includes(term) ||
    t.courses.some(c => c.courseTitle.toLowerCase().includes(term))
  );
};
