import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useDispatch, useSelector } from 'react-redux';
import { LOGOUT_REQUEST } from '../reducers/logout';

const Header = () => {
  const { currentUser } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState(null);
  const { user } = useSelector((state) => state.user);
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  const navigate = useNavigate();
  const toggleCategory = (category) => {
    setOpenCategory(openCategory === category ? null : category);
  };


  const navLinks = [
    {
      category: '공지',
      links: [
        { name: '공지사항', path: '/admin/notice' },

      ],

    },
    {
      category: '통계',
      links: [
        { name: '근태', path: '/admin/attendance' },
        { name: '업무', path: '/admin/tasks' },
      ],
    },
    {
      category: '차트',
      links: [
        { name: '총 근무시간', path: '/admin/chart' },
        { name: '지각', path: '/admin/chart/late' },

      ],

    },
    {
      category: '관리',
      links: [
        { name: '직원관리', path: '/admin/employees' },
        { name: '설정', path: '/admin/settings', requiredPermission: ['master'] },
        { name: '휴가관리', path: '/admin/vacation' },
        { name: '시간관리', path: '/admin/time' },
        { name: '업무관리', path: '/admin/task' },
        { name: '권한관리', path: '/admin/auth' },
      ],
    },

    {
      category: '설정',
      links: [
        { name: '시스템 설정', path: '/admin/settings' },
        { name: '설정', path: '/admin/settings', requiredPermission: ['master'] },
      ],
    },

  ];

  const filteredNavLinks = navLinks
    .filter(category => {
      // "관리" or "설정" 카테고리는 user.user_code가 "A1"일 때만 표시
      if ((category.category === '관리' || category.category === '설정') && user?.auth_code !== 'A1') {
        return false;
      }
      return true;
    })
    .map(category => ({
      ...category,
      links: category.links.filter(link =>
        !link.requiredPermission || (currentUser && link.requiredPermission.includes(currentUser.permission))
      ),
    }));

  const isActive = (path) => location.pathname === path;

  const dispatch = useDispatch();
  const logout = () => {
    dispatch({
      type: LOGOUT_REQUEST,
    });
  }
  const client = () => {
    navigate("/attendance")
  }

  return (
    <header className="bg-blue-600 text-white shadow-md relative">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-3">
          {/* 로고 */}
          <Link to="/admin/dashboard" className="text-xl font-bold">
            직원관리시스템
          </Link>

          {/* 데스크탑 네비게이션 */}
          <nav className="hidden md:flex space-x-6 relative">
            {filteredNavLinks.map((category) => (
              <div key={category.category} className="relative">
                <button
                  onClick={() => toggleCategory(category.category)}
                  className="py-2 font-bold hover:text-blue-200"
                >
                  {category.category}
                </button>

                {/* 하위 메뉴 */}
                {openCategory === category.category && (
                  <div className="absolute left-0 w-48 bg-white text-black rounded shadow-lg mt-2 z-50">
                    {category.links.map((link) => (
                      <Link
                        key={link.path}
                        to={link.path}
                        className={`block px-4 py-2 text-sm hover:bg-blue-100 ${isActive(link.path) ? 'font-bold bg-blue-200' : ''
                          }`}
                        onClick={() => setOpenCategory(null)} // 클릭 시 닫기
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* 유저 정보 및 로그아웃 */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-sm">
                  <span className="font-medium">{user.user_name}</span>
                </span>
                <button
                  onClick={client}
                  className="bg-blue-700 hover:bg-blue-800 px-3 py-2 rounded text-sm"
                >
                  근로자
                </button>
                <button
                  onClick={logout}
                  className="bg-blue-700 hover:bg-blue-800 px-3 py-2 rounded text-sm"
                >
                  로그아웃
                </button>
              </>
            ) : (
              <Link
                to="/"
                className="bg-blue-700 hover:bg-blue-800 px-3 py-2 rounded text-sm"
              >
                로그인
              </Link>
            )}
          </div>

          {/* 모바일 메뉴 버튼 */}
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={toggleMobileMenu}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* 모바일 네비게이션 */}
        {mobileMenuOpen && (
          <div className="md:hidden py-2 pb-4">
            {filteredNavLinks.map((category) => (
              <div key={category.category}>
                <button
                  onClick={() => toggleCategory(category.category)}
                  className="block w-full text-left px-4 py-2 font-bold bg-blue-700 text-white"
                >
                  {category.category}
                </button>

                {openCategory === category.category && (
                  <div className="bg-white text-black">
                    {category.links.map((link) => (
                      <Link
                        key={link.path}
                        to={link.path}
                        className={`block px-4 py-2 text-sm hover:bg-blue-100 ${isActive(link.path) ? 'font-bold bg-blue-200' : ''
                          }`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <div className="border-t border-blue-500 mt-2 pt-2">
              {user ? (
                <>
                  <div className="px-4 py-2 text-sm">
                    <span className="font-medium">{user.user_name}</span>
                  </div>
                  <button
                    onClick={() => {
                      client();
                      setMobileMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-blue-700"
                  >
                    근로자
                  </button>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-blue-700"
                  >
                    로그아웃
                  </button>
                </>
              ) : (
                <Link
                  to="/"
                  className="block px-4 py-2 hover:bg-blue-700"
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



// import { useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';

// const Header = () => {
//   const { currentUser, logout } = useAuth();
//   const location = useLocation();
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   const toggleMobileMenu = () => {
//     setMobileMenuOpen(!mobileMenuOpen);
//   };

//   const navLinks = [
//     { name: '근태관리', path: '/admin/attendance', requiredPermission: null },
//     { name: '업무통계', path: '/admin/tasks', requiredPermission: null },
//     { name: '직원관리', path: '/admin/employees', requiredPermission: null },
//     { name: '설정', path: '/admin/settings', requiredPermission: ['master'] },
//     { name: '휴가관리', path: '/admin/vacation', requiredPermission: null },
//     { name: '권한관리', path: '/admin/auth', requiredPermission: null },
//     { name: '시간관리', path: '/admin/time', requiredPermission: null },
//     { name: '업무관리', path: '/admin/task', requiredPermission: null },
//   ];

//   // Filter nav links based on user permissions
//   const filteredNavLinks = navLinks.filter(link => {
//     if (!link.requiredPermission) return true;
//     if (!currentUser) return false;

//     return link.requiredPermission.includes(currentUser.permission);
//   });

//   const isActive = (path) => {
//     return location.pathname === path;
//   };

//   return (
//     <header className="bg-blue-600 text-white shadow-md">
//       <div className="container mx-auto px-4">
//         <div className="flex justify-between items-center py-3">
//           {/* Logo */}
//           <Link to="/" className="text-xl font-bold">
//             직원관리시스템
//           </Link>

//           {/* Desktop Navigation */}
//           <nav className="hidden md:flex space-x-6">
//             {filteredNavLinks.map((link) => (
//               <Link
//                 key={link.path}
//                 to={link.path}
//                 className={`py-2 ${isActive(link.path)
//                     ? 'font-bold border-b-2 border-white'
//                     : 'hover:text-blue-200'
//                   }`}
//               >
//                 {link.name}
//               </Link>
//             ))}
//           </nav>

//           {/* User Info and Logout */}
//           <div className="hidden md:flex items-center space-x-4">
//             {currentUser ? (
//               <>
//                 <span className="text-sm">
//                   <span className="font-medium">{currentUser.name}</span> ({currentUser.permissionDetails?.name || '일반'})
//                 </span>
//                 <button
//                   onClick={logout}
//                   className="bg-blue-700 hover:bg-blue-800 px-3 py-1 rounded text-sm"
//                 >
//                   로그아웃
//                 </button>
//               </>
//             ) : (
//               <Link
//                 to="/login"
//                 className="bg-blue-700 hover:bg-blue-800 px-3 py-1 rounded text-sm"
//               >
//                 로그인
//               </Link>
//             )}
//           </div>

//           {/* Mobile menu button */}
//           <button
//             className="md:hidden text-white focus:outline-none"
//             onClick={toggleMobileMenu}
//           >
//             <svg
//               className="h-6 w-6"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               {mobileMenuOpen ? (
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M6 18L18 6M6 6l12 12"
//                 />
//               ) : (
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M4 6h16M4 12h16M4 18h16"
//                 />
//               )}
//             </svg>
//           </button>
//         </div>

//         {/* Mobile Navigation */}
//         {mobileMenuOpen && (
//           <div className="md:hidden py-2 pb-4">
//             {filteredNavLinks.map((link) => (
//               <Link
//                 key={link.path}
//                 to={link.path}
//                 className={`block py-2 ${isActive(link.path)
//                     ? 'font-bold bg-blue-700 pl-2'
//                     : 'hover:bg-blue-700 pl-2'
//                   }`}
//                 onClick={() => setMobileMenuOpen(false)}
//               >
//                 {link.name}
//               </Link>
//             ))}
//             <div className="border-t border-blue-500 mt-2 pt-2">
//               {currentUser ? (
//                 <>
//                   <div className="px-2 py-1 text-sm">
//                     <span className="font-medium">{currentUser.name}</span> ({currentUser.permissionDetails?.name || '일반'})
//                   </div>
//                   <button
//                     onClick={() => {
//                       logout();
//                       setMobileMenuOpen(false);
//                     }}
//                     className="block w-full text-left px-2 py-2 text-sm hover:bg-blue-700"
//                   >
//                     로그아웃
//                   </button>
//                 </>
//               ) : (
//                 <Link
//                   to="/login"
//                   className="block px-2 py-2 hover:bg-blue-700"
//                   onClick={() => setMobileMenuOpen(false)}
//                 >
//                   로그인
//                 </Link>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </header>
//   );
// };

// export default Header;
