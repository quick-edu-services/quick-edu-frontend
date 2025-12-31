/**
 * Admin Authentication Management
 */

export interface AdminUser {
  id: string;
  username: string;
  email: string;
  role: 'admin';
}

const ADMIN_STORAGE_KEY = 'quickedu_admin';
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'QuickEdu@2024', // Change this in production
  email: 'admin@quickedu.org.in'
};

/**
 * Admin login
 */
export const adminLogin = (username: string, password: string): { success: boolean; message: string; admin?: AdminUser } => {
  if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
    const admin: AdminUser = {
      id: 'admin-1',
      username: ADMIN_CREDENTIALS.username,
      email: ADMIN_CREDENTIALS.email,
      role: 'admin'
    };
    
    localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(admin));
    return { success: true, message: 'Login successful', admin };
  }
  
  return { success: false, message: 'Invalid credentials' };
};

/**
 * Admin logout
 */
export const adminLogout = (): void => {
  localStorage.removeItem(ADMIN_STORAGE_KEY);
};

/**
 * Get current admin
 */
export const getCurrentAdmin = (): AdminUser | null => {
  const admin = localStorage.getItem(ADMIN_STORAGE_KEY);
  return admin ? JSON.parse(admin) : null;
};

/**
 * Check if admin is authenticated
 */
export const isAdminAuthenticated = (): boolean => {
  return getCurrentAdmin() !== null;
};
