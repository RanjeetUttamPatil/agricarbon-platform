import { useState } from 'react';
import { findUserByMobile, setCurrentUser } from '../../data/dataStore';

const LoginPage = ({ onLogin, onBack }) => {
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState('mobile');
  const [error, setError] = useState('');

  const handleSendOTP = () => {
    setError('');
    
    if (!mobile || mobile.length !== 10) {
      setError('Please Enter 10 -digit Mobile Number');
      return;
    }
    
    setStep('otp');
  };

  const handleVerifyOTP = () => {
    setError('');
    
    if (!otp || otp.length !== 4) {
      setError('Please Enter 4-digit OTP');
      return;
    }
    
    const existingUser = findUserByMobile(mobile);
    
    if (existingUser) {
      setCurrentUser(existingUser);
      onLogin(existingUser, false);
    } else {
      onLogin({ mobile }, true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4 relative">
      {/* Back Button */}
      {onBack && (
        <button
          onClick={onBack}
          className="absolute top-6 left-6 p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition"
        >
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="inline-block bg-white rounded-full p-6 shadow-xl mb-6 animate-bounce">
            <span className="text-6xl">🌾</span>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-3">
            AgriCarbon
          </h1>
          <p className="text-xl text-gray-600 mb-2">किसान कार्बन क्रेडिट प्लेटफॉर्म</p>
          <p className="text-sm text-gray-500">Empowering Farmers Through Sustainability</p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8 backdrop-blur-sm bg-opacity-95">
          {step === 'mobile' ? (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Login</h2>
              <p className="text-gray-600 mb-6">Start With Your Mobile Number</p>
              
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  📱 Mobile Number
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-4 bg-gradient-to-r from-gray-100 to-gray-200 border border-r-0 border-gray-300 rounded-l-xl text-gray-700 font-semibold">
                    +91
                  </span>
                  <input
                    type="tel"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    placeholder="9876543210"
                    className="flex-1 px-4 py-4 border border-gray-300 rounded-r-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
                  />
                </div>
              </div>

              {error && (
                <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-lg text-sm flex items-center gap-2">
                  <span>⚠️</span>
                  <span>{error}</span>
                </div>
              )}

              <button
                onClick={handleSendOTP}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-4 rounded-xl transition duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Send OTP →
              </button>

              {/* <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
                <p className="text-sm font-semibold text-blue-900 mb-2">🎯 डेमो के लिए:</p>
                <div className="space-y-1 text-sm">
                  <p className="text-blue-700">✅ <span className="font-mono font-bold">9876543210</span> - मौजूदा यूज़र</p>
                  <p className="text-blue-700">✨ या कोई भी नया नंबर</p>
                </div>
              </div> */}
            </div>
          ) : (
            <div>
              <button
                onClick={() => setStep('mobile')}
                className="mb-4 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span className="text-sm">Change Number?</span>
              </button>

              <h2 className="text-2xl font-bold text-gray-800 mb-2">OTP Verification</h2>
              <p className="text-gray-600 mb-6">
                <span className="font-semibold">Enetr the OTP sent on +91 {mobile}</span> 
              </p>
              
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  🔐 Enter OTP 
                </label>
                <input
                  type="tel"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 4))}
                  placeholder="1234"
                  className="w-full px-6 py-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-center text-4xl tracking-widest font-bold"
                  maxLength="4"
                  autoFocus
                />
              </div>

              {error && (
                <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-lg text-sm flex items-center gap-2">
                  <span>⚠️</span>
                  <span>{error}</span>
                </div>
              )}

              <button
                onClick={handleVerifyOTP}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-4 rounded-xl transition duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 mb-3"
              >
                Verify ✓
              </button>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-500 mb-2">Didn't receive OTP?</p>
                <button className="text-green-600 font-semibold text-sm hover:underline">
                  Resend OTP?
                </button>
              </div>

              {/* <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                <p className="text-xs text-gray-600 text-center">
                  💡 डेमो के लिए कोई भी 4 अंकों का OTP उपयोग करें (जैसे: 1234)
                </p>
              </div> */}
            </div>
          )}
        </div>

        {/* Trust Indicators */}
        <div className="mt-8 grid grid-cols-3 gap-4">
          {[
            { icon: '🔒', text: 'Secure' },
            { icon: '⚡', text: 'Fast' },
            { icon: '🌟', text: 'Trusted' }
          ].map((item, idx) => (
            <div key={idx} className="bg-white bg-opacity-80 backdrop-blur rounded-xl p-4 text-center shadow-lg">
              <div className="text-3xl mb-2">{item.icon}</div>
              <div className="text-xs font-semibold text-gray-700">{item.text}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;