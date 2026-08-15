import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  UtensilsCrossed,
  LogIn,
  LogOut,
  LayoutDashboard,
  User,
  Menu,
  X,
  ChevronDown,
  ShoppingBag,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";

export const Navbar = () => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { totalCount, setIsCartOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdowns on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    await logout();
    setUserDropdownOpen(false);
    navigate("/login");
  };

  const navLinks = [
    { name: "Home", href: "/#hero" },
    { name: "About Us", href: "/#about" },
    { name: "Signature Menu", href: "/#featured" },
    { name: "Hours & Location", href: "/#info" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-stone-200/60 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform duration-200">
              <UtensilsCrossed className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-xl tracking-tight text-stone-900 group-hover:text-brand-600 transition-colors">
                Savory<span className="text-brand-600">Bistro</span>
              </span>
              <span className="text-[10px] tracking-widest text-stone-500 uppercase font-semibold">
                Artisanal Cuisine
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-stone-700 hover:text-brand-600 font-medium text-sm transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action / Auth Button */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center space-x-2.5 p-1.5 pl-3 pr-2 rounded-full border border-stone-200 hover:border-brand-300 hover:bg-brand-50/50 transition-all duration-200 focus:outline-none"
                  aria-expanded={userDropdownOpen}
                >
                  <img
                    src={
                      user?.avatar ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || "User")}&background=ea580c&color=fff`
                    }
                    alt={user?.name}
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-brand-500/20"
                  />
                  <div className="text-left hidden lg:block">
                    <p className="text-xs font-semibold text-stone-800 leading-tight">
                      {user?.name?.split(" ")[0]}
                    </p>
                    <p className="text-[10px] text-stone-500 capitalize">
                      {user?.role}
                    </p>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-stone-500 transition-transform duration-200 ${userDropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-card border border-stone-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-4 py-2.5 border-b border-stone-100">
                      <p className="text-sm font-semibold text-stone-900 truncate">
                        {user?.name}
                      </p>
                      <p className="text-xs text-stone-500 truncate">
                        {user?.email}
                      </p>
                      <span className="inline-block mt-1 px-2 py-0.5 text-[10px] font-medium bg-brand-50 text-brand-700 rounded-full border border-brand-200 capitalize">
                        {user?.role} Access
                      </span>
                    </div>

                    {isAdmin && (
                      <Link
                        to="/admin"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center space-x-2.5 px-4 py-2.5 text-sm text-stone-700 hover:bg-stone-50 hover:text-brand-600 transition-colors"
                      >
                        <LayoutDashboard className="w-4 h-4 text-brand-600" />
                        <span>Admin Dashboard</span>
                      </Link>
                    )}

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-2.5 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Log Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-stone-900 hover:bg-brand-600 text-white text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-glow hover:-translate-y-0.5"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Sign In</span>
                </Link>
              </div>
            )}
            <button onClick={() => setIsCartOpen(true)} className="relative p-2">
            <ShoppingBag className="w-6 h-6 text-stone-700" />
            {totalCount > 0 && (
              <span className="absolute top-0 right-0 bg-brand-600 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                {totalCount}
              </span>
            )}
          </button>
          </div>
          

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-stone-700 hover:text-brand-600 hover:bg-stone-100 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 bg-white rounded-2xl shadow-xl border border-stone-200/80 p-5 space-y-4">
            <nav className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-stone-700 hover:text-brand-600 font-medium text-sm py-1.5 transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            <div className="pt-4 border-t border-stone-100 flex flex-col space-y-3">
              {isAuthenticated ? (
                <>
                  <div className="flex items-center space-x-3 p-2 bg-stone-50 rounded-xl">
                    <img
                      src={
                        user?.avatar ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || "User")}`
                      }
                      alt={user?.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-sm font-semibold text-stone-800">
                        {user?.name}
                      </p>
                      <p className="text-xs text-stone-500 capitalize">
                        {user?.role}
                      </p>
                    </div>
                  </div>

                  {isAdmin && (
                    <Link
                      to="/admin"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center space-x-2 w-full py-2.5 px-3 rounded-xl bg-brand-50 text-brand-700 font-medium text-sm"
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      <span>Admin Dashboard</span>
                    </Link>
                  )}

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex items-center space-x-2 w-full py-2.5 px-3 rounded-xl text-red-600 hover:bg-red-50 font-medium text-sm text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Log Out</span>
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center space-x-2 w-full py-3 rounded-xl bg-stone-900 text-white font-medium text-sm"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Sign In to Account</span>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
