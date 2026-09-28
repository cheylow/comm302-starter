import React, { useState } from 'react';
import { X, Check, ShieldCheck, Zap, TrendingUp } from 'lucide-react';

interface GetStartedModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GetStartedModal: React.FC<GetStartedModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        onClose();
      }, 2500);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-[#1e222d] border border-[#e0e3eb] dark:border-[#2a2e39] rounded-2xl shadow-2xl w-full max-w-lg p-6 sm:p-8 text-[#131722] dark:text-gray-100 relative"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-full text-[#787b86] hover:text-[#131722] dark:hover:text-white hover:bg-[#f0f3fa] dark:hover:bg-[#2a2e39]"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="text-center py-8 space-y-3">
            <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-950/60 text-[#089981] rounded-full flex items-center justify-center mx-auto">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold">Welcome to TradingView!</h3>
            <p className="text-sm text-[#787b86]">
              Your $100,000 Paper Trading demo account is activated. Happy analyzing!
            </p>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div className="flex items-center space-x-3 mb-4">
              <svg className="w-8 h-8 fill-current text-[#131722] dark:text-white" viewBox="0 0 36 28">
                <path d="M8 20H0V8h8v12zm14 0h-8V0h8v20zm14 0h-8v-8h8v8z"></path>
              </svg>
              <h2 className="text-2xl font-extrabold tracking-tight">Supercharge Your Trading</h2>
            </div>
            <p className="text-sm text-[#787b86] mb-6">
              Join 60+ million traders and investors utilizing the world's most advanced financial charts and screening tools.
            </p>

            {/* Feature highlights */}
            <div className="space-y-3 mb-6 text-sm">
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-950/60 text-[#2962ff] flex items-center justify-center text-xs font-bold">
                  ✓
                </div>
                <span>Unlimited real-time charts with 100+ technical indicators</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-950/60 text-[#2962ff] flex items-center justify-center text-xs font-bold">
                  ✓
                </div>
                <span>$100,000 Paper Trading account with zero risk</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-950/60 text-[#2962ff] flex items-center justify-center text-xs font-bold">
                  ✓
                </div>
                <span>Custom watchlists, volume profiles, and market heatmaps</span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-[#787b86] mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-[#f8f9fd] dark:bg-[#131722] border border-[#e0e3eb] dark:border-[#2a2e39] rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#2962ff] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#2962ff] to-[#9c27b0] hover:from-[#1e4bd8] hover:to-[#831fa0] text-white font-bold text-sm py-3 rounded-xl shadow transition-all active:scale-[0.98]"
              >
                Start Free Trial &amp; Paper Trading
              </button>
            </form>

            <p className="text-[11px] text-[#787b86] text-center mt-3">
              No credit card required. 30-day trial with full access.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
