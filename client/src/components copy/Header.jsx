import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Header = () => {
  const { currentUser, logout } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navLinks = [
    { name: '근태관리', path: '/admin/attendance', requiredPermission: null },
    { name: '업무통계', path: '/admin/tasks', requiredPermission: null },
    { name: '직원관리', path: '/admin/employees', requiredPermission: null },
    { name: '설정', path: '/admin/settings', requiredPermission: ['master'] },
    { name: '권한관리', path: '/admin/auth', requiredPermission: null },

  ];

  // Filter nav links based on user permissions
  const filteredNavLinks = navLinks.filter(link => {
    if (!link.requiredPermission) return true;
    if (!currentUser) return false;

    return link.requiredPermission.includes(currentUser.permission);
  });

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-3">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold">
            직원관리시스템
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            {filteredNavLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`py-2 ${
                  isActive(link.path)
                    ? 'font-bold border-b-2 border-white'
                    : 'hover:text-blue-200'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* User Info and Logout */}
          <div className="hidden md:flex items-center space-x-4">
            {currentUser ? (
              <>
                <span className="text-sm">
                  <span className="font-medium">{currentUser.name}</span> ({currentUser.permissionDetails?.name || '일반'})
                </span>
                <button
                  onClick={logout}
                  className="bg-blue-700 hover:bg-blue-800 px-3 py-1 rounded text-sm"
                >
                  로그아웃
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-blue-700 hover:bg-blue-800 px-3 py-1 rounded text-sm"
              >
                로그인
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={toggleMobileMenu}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-2 pb-4">
            {filteredNavLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block py-2 ${
                  isActive(link.path)
                    ? 'font-bold bg-blue-700 pl-2'
                    : 'hover:bg-blue-700 pl-2'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="border-t border-blue-500 mt-2 pt-2">
              {currentUser ? (
                <>
                  <div className="px-2 py-1 text-sm">
                    <span className="font-medium">{currentUser.name}</span> ({currentUser.permissionDetails?.name || '일반'})
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="block w-full text-left px-2 py-2 text-sm hover:bg-blue-700"
                  >
                    로그아웃
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="block px-2 py-2 hover:bg-blue-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  로그인
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
