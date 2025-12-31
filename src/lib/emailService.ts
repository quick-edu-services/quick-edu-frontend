/**
 * Email Service for Payment Notifications
 * Note: This requires a backend API to actually send emails
 */

export interface PaymentEmailData {
  userName: string;
  userEmail: string;
  courseTitle: string;
  amount: number;
  orderId: string;
  transactionId: string;
  purchaseDate: string;
}

/**
 * Send payment confirmation email
 * This is a placeholder - implement with your backend email service
 */
export const sendPaymentConfirmationEmail = async (data: PaymentEmailData): Promise<boolean> => {
  try {
    // TODO: Replace with your backend API endpoint
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: data.userEmail,
        subject: `Payment Successful - ${data.courseTitle}`,
        template: 'payment-confirmation',
        data: {
          userName: data.userName,
          courseTitle: data.courseTitle,
          amount: data.amount,
          orderId: data.orderId,
          transactionId: data.transactionId,
          purchaseDate: new Date(data.purchaseDate).toLocaleDateString('en-IN'),
        }
      })
    });

    return response.ok;
  } catch (error) {
    console.error('Email sending failed:', error);
    return false;
  }
};

/**
 * Email template for payment confirmation
 */
export const getPaymentEmailTemplate = (data: PaymentEmailData): string => {
  return `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; }
    .content { background: #f9f9f9; padding: 30px; }
    .details { background: white; padding: 20px; margin: 20px 0; border-radius: 8px; }
    .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
    .button { display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Payment Successful! 🎉</h1>
    </div>
    <div class="content">
      <p>Hi ${data.userName},</p>
      <p>Thank you for your purchase! Your payment has been successfully processed.</p>
      
      <div class="details">
        <h3>Order Details</h3>
        <p><strong>Course:</strong> ${data.courseTitle}</p>
        <p><strong>Amount Paid:</strong> ₹${data.amount.toLocaleString('en-IN')}</p>
        <p><strong>Order ID:</strong> ${data.orderId}</p>
        <p><strong>Transaction ID:</strong> ${data.transactionId}</p>
        <p><strong>Date:</strong> ${new Date(data.purchaseDate).toLocaleDateString('en-IN')}</p>
      </div>

      <p>You now have lifetime access to this course. Start learning today!</p>
      
      <center>
        <a href="${window.location.origin}/dashboard" class="button">Go to Dashboard</a>
      </center>
    </div>
    <div class="footer">
      <p>QuickEdu - Your Learning Partner</p>
      <p>If you have any questions, contact us at info@quickedu.org.in</p>
    </div>
  </div>
</body>
</html>
  `;
};
