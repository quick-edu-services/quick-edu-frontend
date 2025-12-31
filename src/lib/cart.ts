/**
 * Shopping Cart Management
 * Handles adding/removing courses to cart for multi-course enrollment
 */

export interface CartItem {
  courseId: string;
  courseTitle: string;
  price: number;
  originalPrice: number;
  image: string;
  slug: string;
}

const CART_STORAGE_KEY = 'quickedu_cart';

/**
 * Get all items in the cart
 */
export const getCartItems = (): CartItem[] => {
  const cart = localStorage.getItem(CART_STORAGE_KEY);
  return cart ? JSON.parse(cart) : [];
};

/**
 * Add a course to the cart
 */
export const addToCart = (item: CartItem): boolean => {
  const cart = getCartItems();
  
  // Check if course already in cart
  if (cart.some(c => c.courseId === item.courseId)) {
    return false; // Already in cart
  }
  
  cart.push(item);
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  window.dispatchEvent(new Event('cartUpdated'));
  return true;
};

/**
 * Remove a course from the cart
 */
export const removeFromCart = (courseId: string): void => {
  const cart = getCartItems();
  const updatedCart = cart.filter(c => c.courseId !== courseId);
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updatedCart));
  window.dispatchEvent(new Event('cartUpdated'));
};

/**
 * Check if a course is in the cart
 */
export const isInCart = (courseId: string): boolean => {
  const cart = getCartItems();
  return cart.some(c => c.courseId === courseId);
};

/**
 * Get cart total
 */
export const getCartTotal = (): { total: number; originalTotal: number; savings: number } => {
  const cart = getCartItems();
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  const originalTotal = cart.reduce((sum, item) => sum + item.originalPrice, 0);
  const savings = originalTotal - total;
  
  return { total, originalTotal, savings };
};

/**
 * Get cart count
 */
export const getCartCount = (): number => {
  return getCartItems().length;
};

/**
 * Clear the cart
 */
export const clearCart = (): void => {
  localStorage.removeItem(CART_STORAGE_KEY);
  window.dispatchEvent(new Event('cartUpdated'));
};
