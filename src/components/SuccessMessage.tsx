import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface SuccessMessageProps {
  onReset: () => void;
}

export function SuccessMessage({ onReset }: SuccessMessageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 w-full max-w-md text-center shadow-xl">
        <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Registration Submitted!</h2>
        <p className="text-gray-600 mb-6">
          Thank you for volunteering. If selected, you will receive an email within 3 days with further instructions for grading packages.
        </p>
        <button
          onClick={onReset}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Register Another Member
        </button>
      </div>
    </div>
  );
}