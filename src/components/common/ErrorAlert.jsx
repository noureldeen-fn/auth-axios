import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

/**
 * Error Alert with optional Retry callback
 */
export const ErrorAlert = ({
  title = 'Something went wrong',
  message = 'An unexpected error occurred while fetching data. Please check your connection and try again.',
  onRetry,
  className = '',
}) => {
  return (
    <div
      className={`bg-red-50 border border-red-200 text-red-800 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm ${className}`}
      role="alert"
    >
      <div className="flex items-start space-x-3.5">
        <div className="p-2 bg-red-100 rounded-xl text-red-600 shrink-0 mt-0.5 sm:mt-0">
          <AlertCircle className="w-5 h-5" />
        </div>
        <div>
          <h4 className="font-semibold text-red-900 text-sm sm:text-base">{title}</h4>
          <p className="text-red-700 text-xs sm:text-sm mt-0.5 leading-relaxed">{message}</p>
        </div>
      </div>

      {onRetry && (
        <button
          onClick={onRetry}
          type="button"
          className="inline-flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-medium text-xs sm:text-sm rounded-xl transition-all duration-200 shadow-sm shrink-0 self-end sm:self-center focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Retry</span>
        </button>
      )}
    </div>
  );
};

export default ErrorAlert;
