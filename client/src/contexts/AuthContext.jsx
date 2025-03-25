import { createContext, useContext, useState } from 'react';
import { employees, permissionLevels } from '../data/mockData';

// Create the authentication context
const AuthContext = createContext({
  currentUser: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  canViewData: () => {},
  canEditData: () => {},
  isFieldHidden: () => {},
});

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Authentication provider component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Login function
  const login = (employeeId) => {
    const user = employees.find(emp => emp.id === parseInt(employeeId));
    if (user) {
      setCurrentUser({
        ...user,
        permissionDetails: permissionLevels[user.permission] || permissionLevels.employee,
      });
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  // Logout function
  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  // Check if the user can view specific data
  const canViewData = (data) => {
    if (!currentUser) return false;

    const { permissionDetails } = currentUser;

    if (permissionDetails.canView === 'all') {
      return true;
    }

    if (permissionDetails.canView === 'partemployee') {
      return data.employeeId === currentUser.id ||
             (employees.find(emp => emp.id === data.employeeId)?.role === '알바');
    }

    if (permissionDetails.canView === 'self') {
      return data.employeeId === currentUser.id;
    }

    return false;
  };

  // Check if the user can edit specific data
  const canEditData = (data) => {
    if (!currentUser) return false;

    const { permissionDetails } = currentUser;
    return permissionDetails.canEdit;
  };

  // Check if a field should be hidden from the user
  const isFieldHidden = (fieldName) => {
    if (!currentUser) return true;

    const { permissionDetails } = currentUser;
    return permissionDetails.hiddenFields?.includes(fieldName) || false;
  };

  // Value to be provided by the context
  const value = {
    currentUser,
    isAuthenticated,
    login,
    logout,
    canViewData,
    canEditData,
    isFieldHidden,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;