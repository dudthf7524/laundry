import { Outlet } from 'react-router-dom';
import Header from '../components copy/Header';

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-6">
        <Outlet />
      </main>
      <footer className="bg-white p-4 border-t border-gray-200 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} 직원관리시스템. All rights reserved.
      </footer>
    </div>
  );
};

export default MainLayout;
