import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Utensils,
  ShoppingBag,
  Users,
  Settings,
  LogOut,
  UtensilsCrossed,
  X,
  ExternalLink,
  ChefHat
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Sidebar = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const navItems = [
    {
      name: 'Overview',
      path: '/admin',
      icon: LayoutDashboard,
      exact: true,
    },
    {
      name: 'Dishes & Products',
      path: '/admin/dishes',
      icon: Utensils,
      badge: 'Active',
    },
    {
      name: 'Orders Management',
      path: '/admin/orders',
      icon: ShoppingBag,
      badge: 'Student 2',
      disabled: true,
    },
    {
      name: 'Customers & Staff',
      path: '/admin/users',
      icon: Users,
      badge: 'Student 2',
      disabled: true,
    },
    {
      name: 'Restaurant Settings',
      path: '/admin/settings',
      icon: Settings,
      badge: 'Student 2',
      disabled: true,
    },
  ];

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Drawer */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-stone-900 text-stone-300 flex flex-col justify-between border-r border-stone-800 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Top Header */}
        <div>
          <div className="p-6 flex items-center justify-between border-b border-stone-800">
            <Link to="/" className="flex items-center space-x-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white shadow-md shadow-brand-500/20">
                <UtensilsCrossed className="w-5 h-5" />
              </div>
              <div>
                <span className="font-serif font-bold text-xl text-white tracking-tight">
                  Savory<span className="text-brand-500">Admin</span>
                </span>
                <p className="text-[10px] text-stone-400 font-semibold tracking-wider uppercase">
                  Management Portal
                </p>
              </div>
            </Link>

            <button
              type="button"
              onClick={onClose}
              className="lg:hidden p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800"
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="px-4 py-6 space-y-1.5">
            <p className="px-3 text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-2">
              Navigation
            </p>

            {navItems.map((item) => {
              const Icon = item.icon;

              if (item.disabled) {
                return (
                  <div
                    key={item.name}
                    className="flex items-center justify-between px-3.5 py-3 rounded-xl text-stone-500 cursor-not-allowed text-sm group opacity-60"
                    title="Will be implemented by Student 2"
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className="w-4 h-4 text-stone-600" />
                      <span>{item.name}</span>
                    </div>
                    <span className="text-[10px] bg-stone-800 text-stone-400 px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  </div>
                );
              }

              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  end={item.exact}
                  onClick={() => onClose && onClose()}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-brand-600 text-white shadow-sm'
                        : 'text-stone-300 hover:bg-stone-800/80 hover:text-white'
                    }`
                  }
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </div>
                  {item.badge && item.badge !== 'Active' && (
                    <span className="text-[10px] bg-brand-700/80 text-brand-100 px-2 py-0.5 rounded-full font-semibold">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </div>
        </div>

        {/* Bottom Section: User Profile & Public Site Link */}
        <div className="p-4 border-t border-stone-800 space-y-3">
          {/* Quick link back to customer site */}
          <Link
            to="/"
            className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
          >
            <span className="flex items-center space-x-2">
              <ExternalLink className="w-3.5 h-3.5" />
              <span>View Live Restaurant</span>
            </span>
          </Link>

          {/* User Profile Card */}
          <div className="bg-stone-850 p-3 rounded-2xl border border-stone-800/80 flex items-center justify-between">
            <div className="flex items-center space-x-3 overflow-hidden">
              <img
                src={user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'Chef')}&background=ea580c&color=fff`}
                alt={user?.name}
                className="w-9 h-9 rounded-xl object-cover ring-1 ring-brand-500/40"
              />
              <div className="overflow-hidden">
                <p className="text-xs font-semibold text-white truncate">{user?.name}</p>
                <p className="text-[10px] text-stone-400 capitalize truncate">{user?.role || 'Admin'}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="p-2 rounded-xl text-stone-400 hover:text-red-400 hover:bg-stone-800 transition-colors shrink-0"
              title="Log out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
