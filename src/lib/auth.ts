/**
 * Authentication Module
 * Simple localStorage-based authentication for demo purposes
 * 
 * IMPORTANT: This is NOT secure for production use!
 * Replace with proper backend authentication (JWT, OAuth, etc.)
 */

export interface User {
  id: string;
  name: string;
  email: string;
  joinedDate: string;
  enrolledCourses: string[];
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

const USERS_KEY = 'users';
const CURRENT_USER_KEY = 'user'; // Changed from 'currentUser' to 'user' to match AuthProvider

export const login = async (credentials: LoginCredentials): Promise<{ success: boolean; user?: User; message: string }> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));

  const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  const user = users.find((u: any) =>
    u.email === credentials.email && u.password === credentials.password
  );

  if (user) {
    const { password, ...userWithoutPassword } = user;
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));
    return {
      success: true,
      user: userWithoutPassword,
      message: 'Login successful!'
    };
  }

  return {
    success: false,
    message: 'Invalid email or password'
  };
};

export const register = async (data: RegisterData): Promise<{ success: boolean; user?: User; message: string }> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));

  const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');

  // Check if user already exists
  if (users.find((u: any) => u.email === data.email)) {
    return {
      success: false,
      message: 'Email already registered'
    };
  }

  // Create new user
  const newUser = {
    id: `user-${Date.now()}`,
    name: data.name,
    email: data.email,
    password: data.password, // In production, hash this!
    joinedDate: new Date().toISOString(),
    enrolledCourses: []
  };

  users.push(newUser);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));

  const { password, ...userWithoutPassword } = newUser;
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));

  return {
    success: true,
    user: userWithoutPassword,
    message: 'Registration successful!'
  };
};

export const logout = () => {
  localStorage.removeItem(CURRENT_USER_KEY);
  localStorage.removeItem('accessToken');
};

export const getCurrentUser = (): any | null => {
  const user = localStorage.getItem(CURRENT_USER_KEY);
  if (!user) return null;
  const parsed = JSON.parse(user);
  // Add compatibility layer for mock code that expects .id and .name
  return {
    ...parsed,
    id: parsed._id || parsed.id,
    name: parsed.fullName || parsed.name,
    enrolledCourses: parsed.enrolledCourses || []
  };
};

export const isAuthenticated = (): boolean => {
  return localStorage.getItem(CURRENT_USER_KEY) !== null;
};

export const updateUserCourses = (courseId: string) => {
  const user = getCurrentUser();
  if (!user) return;

  const currentCourses = user.enrolledCourses || [];
  if (!currentCourses.includes(courseId)) {
    const updatedUser = {
      ...user,
      enrolledCourses: [...new Set([...currentCourses, courseId])]
    };
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedUser));
  }

  const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  const updatedUsers = users.map((u: any) => {
    if (u.id === user.id || u._id === user._id) {
      return {
        ...u,
        enrolledCourses: [...new Set([...(u.enrolledCourses || []), courseId])]
      };
    }
    return u;
  });
  localStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));
};
