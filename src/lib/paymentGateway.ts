/**
 * Cashfree Payment Gateway Integration Module
 */

const CASHFREE_BASE_URL = import.meta.env.VITE_CASHFREE_ENV === 'production'
  ? 'https://api.cashfree.com/pg'
  : 'https://sandbox.cashfree.com/pg';

export interface PaymentDetails {
  courseId: string;
  courseTitle: string;
  amount: number;
  currency: string;
  userId: string;
  userName: string;
  userEmail: string;
  courses?: {
    courseId: string;
    title: string;
    price: number;
  }[];
}

export interface PaymentResult {
  success: boolean;
  transactionId?: string;
  message: string;
  orderId?: string;
}

export interface CashfreeOrderRequest {
  order_amount: number;
  order_currency: string;
  order_id: string;
  customer_details: {
    customer_id: string;
    customer_name: string;
    customer_email: string;
    customer_phone: string;
  };
  order_meta?: {
    return_url?: string;
    notify_url?: string;
  };
}

export interface CashfreeOrderResponse {
  cf_order_id: string;
  order_id: string;
  payment_session_id: string;
  order_status: string;
}

/**
 * Create Cashfree order
 */
export const createCashfreeOrder = async (orderRequest: CashfreeOrderRequest): Promise<CashfreeOrderResponse> => {
  try {
    console.log('🔵 Creating Cashfree Order via Backend...');
    console.log('Order Request:', orderRequest);

    const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
    const response = await fetch(`${apiUrl}/api/create-order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderRequest)
    });

    console.log('Response Status:', response.status);

    if (!response.ok) {
      const errorData = await response.json();
      console.error('❌ Order Creation Failed:', errorData);
      throw new Error('Failed to create Cashfree order');
    }

    const data = await response.json();
    console.log('✅ Order Created Successfully:', data);
    return data;
  } catch (error) {
    console.error('❌ Cashfree order creation error:', error);
    throw error;
  }
};

/**
 * Initialize payment process with Cashfree
 */
export const initiatePayment = async (
  paymentDetails: PaymentDetails,
  customerPhone: string = '9999999999'
): Promise<PaymentResult> => {
  try {
    const orderId = `ORDER_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const orderRequest: CashfreeOrderRequest = {
      order_amount: paymentDetails.amount,
      order_currency: paymentDetails.currency,
      order_id: orderId,
      customer_details: {
        customer_id: paymentDetails.userId,
        customer_name: paymentDetails.userName,
        customer_email: paymentDetails.userEmail,
        customer_phone: customerPhone
      },
      order_meta: {
        return_url: `${window.location.origin}/payment/success`,
        notify_url: `${window.location.origin}/api/payment/webhook`
      }
    };

    const orderResponse = await createCashfreeOrder(orderRequest);

    if (orderResponse.payment_session_id) {
      console.log('🔵 Payment Session ID:', orderResponse.payment_session_id);
      console.log('🔵 Order ID:', orderId);

      // Load Cashfree SDK and open checkout
      const cashfree = await loadCashfreeSDK();
      console.log('✅ Cashfree SDK Loaded');

      const checkoutOptions = {
        paymentSessionId: orderResponse.payment_session_id,
        returnUrl: `${window.location.origin}/payment/success?order_id=${orderId}`,
      };

      console.log('🔵 Opening Cashfree Checkout with options:', checkoutOptions);

      cashfree.checkout(checkoutOptions).then(() => {
        console.log('✅ Payment modal opened successfully');
      }).catch((err: any) => {
        console.error('❌ Checkout error:', err);
      });

      // Store purchase in localStorage (pending status)
      const purchases = JSON.parse(localStorage.getItem('purchases') || '[]');
      purchases.push({
        ...paymentDetails,
        transactionId: orderResponse.cf_order_id,
        orderId: orderId,
        purchaseDate: new Date().toISOString(),
        status: 'pending'
      });
      localStorage.setItem('purchases', JSON.stringify(purchases));

      return {
        success: true,
        transactionId: orderResponse.cf_order_id,
        orderId: orderId,
        message: 'Payment initiated successfully!'
      };
    } else {
      return {
        success: false,
        message: 'Failed to initiate payment'
      };
    }
  } catch (error) {
    console.error('Payment initiation error:', error);
    return {
      success: false,
      message: 'Payment failed. Please try again.'
    };
  }
};

/**
 * Load Cashfree SDK dynamically
 */
const loadCashfreeSDK = (): Promise<any> => {
  return new Promise((resolve, reject) => {
    if ((window as any).Cashfree) {
      console.log('✅ Cashfree SDK already loaded');
      const mode = import.meta.env.VITE_CASHFREE_ENV === 'production' ? 'production' : 'sandbox';
      resolve((window as any).Cashfree({ mode }));
      return;
    }

    console.log('🔵 Loading Cashfree SDK...');
    const script = document.createElement('script');
    script.src = 'https://sdk.cashfree.com/js/v3/cashfree.js';
    script.onload = () => {
      const mode = import.meta.env.VITE_CASHFREE_ENV === 'production' ? 'production' : 'sandbox';
      console.log('✅ Cashfree SDK loaded, Mode:', mode);
      const cashfree = (window as any).Cashfree({ mode });
      resolve(cashfree);
    };
    script.onerror = () => {
      console.error('❌ Failed to load Cashfree SDK');
      reject(new Error('Failed to load Cashfree SDK'));
    };
    document.head.appendChild(script);
  });
};

/**
 * Verify payment status with Cashfree
 */
export const verifyPayment = async (orderId: string): Promise<boolean> => {
  try {
    const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
    const response = await fetch(`${apiUrl}/api/verify-payment/${orderId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      return false;
    }

    const result = await response.json();
    return result.order_status === 'PAID';
  } catch (error) {
    console.error('Payment verification error:', error);
    return false;
  }
};

/**
 * Get user's purchase history
 * 
 * INTEGRATION POINT: Replace with API call to your backend
 */
export const getUserPurchases = (userId: string) => {
  const purchases = JSON.parse(localStorage.getItem('purchases') || '[]');
  return purchases.filter((p: any) => p.userId === userId);
};

/**
 * Check if user has purchased a specific course
 */
export const hasPurchasedCourse = (userId: string, courseId: string): boolean => {
  const purchases = getUserPurchases(userId);
  return purchases.some((p: any) => p.courseId === courseId && p.status === 'completed');
};

/**
 * Update user's enrolled courses
 * This should be called after successful payment
 */
export const updateUserCourses = (courseId: string) => {
  // This function is imported from auth module
  // Just a placeholder here for payment gateway module
  return true;
};
