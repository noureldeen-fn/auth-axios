import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, ArrowLeft, Home } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const UnauthorizedPage = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-stone-900 flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md w-full bg-stone-850 p-8 rounded-3xl border border-stone-800 shadow-2xl space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-red-500/10 text-red-500 flex items-center justify-center mx-auto">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h1 className="font-serif text-2xl font-bold text-white">Access Denied (403)</h1>
          <p className="text-stone-400 text-sm leading-relaxed">
            Your account ({user?.email || 'Logged In User'}) has the role <strong className="text-brand-400 capitalize font-medium">{user?.role || 'Guest'}</strong> and does not have administrative privileges to access this area.
          </p>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center space-x-2 px-5 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-sm font-semibold transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>
          <Link
            to="/login"
            className="inline-flex items-center justify-center space-x-2 px-5 py-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-sm font-semibold transition-colors border border-stone-700"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Switch Account</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
