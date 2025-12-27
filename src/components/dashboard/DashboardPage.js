import { useState, useEffect } from 'react';
import { 
  getCurrentUser, 
  calculateCarbonScore, 
  calculateCarbonCredits,
  getFarmsByUser,
  getPracticesByUser,
  getProofsByUser,
  getCarbonCreditsByUser,
  getAlertsByUser,
  getAIRecommendations,
  generateSmartAlerts,
  markAlertAsRead
} from '../../data/dataStore';

const DashboardPage = ({ onNavigate, onLogout }) => {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    carbonScore: 0,
    creditsEarned: 0,
    totalEarnings: 0,
    farmsCount: 0,
    practicesCount: 0,
    proofsCount: 0
  });
  const [alerts, setAlerts] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);

    if (currentUser) {
      // Generate smart alerts
      generateSmartAlerts(currentUser.id);
      
      const score = calculateCarbonScore(currentUser.id);
      const credits = calculateCarbonCredits(currentUser.id);
      const farms = getFarmsByUser(currentUser.id);
      const practices = getPracticesByUser(currentUser.id);
      const proofs = getProofsByUser(currentUser.id);
      const creditRecords = getCarbonCreditsByUser(currentUser.id);

      const totalEarnings = creditRecords.reduce((sum, c) => sum + c.value, 0);

      setStats({
        carbonScore: score,
        creditsEarned: credits,
        totalEarnings,
        farmsCount: farms.length,
        practicesCount: practices.length,
        proofsCount: proofs.length
      });

      // Get alerts and recommendations
      const userAlerts = getAlertsByUser(currentUser.id);
      setAlerts(userAlerts);

      const aiRecs = getAIRecommendations(currentUser.id);
      setRecommendations(aiRecs);
    }
  }, []);

  const handleAlertClick = (alert) => {
    markAlertAsRead(alert.id);
    setAlerts(alerts.filter(a => a.id !== alert.id));
    if (alert.action) {
      onNavigate(alert.action);
    }
  };

  const getTranslation = (key) => {
    const lang = user?.language || 'hi';
    const translations = {
      en: {
        dashboard: 'Dashboard',
        farmMapping: 'Farm Mapping',
        practices: 'Eco-Practices',
        proofUpload: 'Upload Proof',
        credits: 'Carbon Credits',
        marketplace: 'Marketplace',
        analytics: 'Analytics',
        settings: 'Settings',
        logout: 'Logout',
        welcome: 'Welcome',
        greenScore: 'Green Score',
        carbonCredits: 'Carbon Credits',
        earnings: 'Total Earnings',
        farms: 'Farms',
        smartAlerts: 'Smart Alerts',
        aiRecommendations: 'AI Recommendations',
        implementNow: 'Implement Now',
        potentialIncome: 'Potential Income',
        potentialCredits: 'Potential Credits',
        quickActions: 'Quick Actions',
        viewAll: 'View All',
        recentActivity: 'Recent Activity'
      },
      hi: {
        dashboard: 'डैशबोर्ड',
        farmMapping: 'खेत मैपिंग',
        practices: 'इको-प्रैक्टिस',
        proofUpload: 'प्रमाण अपलोड',
        credits: 'कार्बन क्रेडिट',
        marketplace: 'बाज़ार',
        analytics: 'विश्लेषण',
        settings: 'सेटिंग्स',
        logout: 'लॉगआउट',
        welcome: 'स्वागत है',
        greenScore: 'ग्रीन स्कोर',
        carbonCredits: 'कार्बन क्रेडिट',
        earnings: 'कुल कमाई',
        farms: 'खेत',
        smartAlerts: 'स्मार्ट अलर्ट',
        aiRecommendations: 'AI सिफारिशें',
        implementNow: 'अभी लागू करें',
        potentialIncome: 'संभावित आय',
        potentialCredits: 'संभावित क्रेडिट',
        quickActions: 'त्वरित क्रियाएं',
        viewAll: 'सभी देखें',
        recentActivity: 'हाल की गतिविधि'
      },
      mr: {
        dashboard: 'डॅशबोर्ड',
        farmMapping: 'शेत मॅपिंग',
        practices: 'इको-प्रॅक्टिस',
        proofUpload: 'पुरावा अपलोड',
        credits: 'कार्बन क्रेडिट',
        marketplace: 'बाजार',
        analytics: 'विश्लेषण',
        settings: 'सेटिंग्ज',
        logout: 'लॉगआउट',
        welcome: 'स्वागत आहे',
        greenScore: 'ग्रीन स्कोअर',
        carbonCredits: 'कार्बन क्रेडिट',
        earnings: 'एकूण कमाई',
        farms: 'शेत',
        smartAlerts: 'स्मार्ट अलर्ट',
        aiRecommendations: 'AI शिफारसी',
        implementNow: 'आता अंमलात आणा',
        potentialIncome: 'संभाव्य उत्पन्न',
        potentialCredits: 'संभाव्य क्रेडिट्स',
        quickActions: 'जलद क्रिया',
        viewAll: 'सर्व पहा',
        recentActivity: 'अलीकडील क्रियाकलाप'
      }
    };
    return translations[lang][key];
  };

  if (!user) return null;

  const menuItems = [
    { icon: '📊', label: getTranslation('dashboard'), page: 'dashboard' },
    { icon: '🗺️', label: getTranslation('farmMapping'), page: 'farm-mapping' },
    { icon: '🌱', label: getTranslation('practices'), page: 'practice' },
    { icon: '📸', label: getTranslation('proofUpload'), page: 'proof-upload' },
    { icon: '💚', label: getTranslation('credits'), page: 'credits' },
    { icon: '🏪', label: getTranslation('marketplace'), page: 'marketplace' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-white border-r border-gray-200 transition-all duration-300 fixed h-full z-40`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
            {sidebarOpen ? (
              <>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                    <span className="text-lg">🌾</span>
                  </div>
                  <span className="font-bold text-lg bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                    AgriCarbon
                  </span>
                </div>
                <button onClick={() => setSidebarOpen(false)} className="p-1 hover:bg-gray-100 rounded">
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                  </svg>
                </button>
              </>
            ) : (
              <button onClick={() => setSidebarOpen(true)} className="p-1 hover:bg-gray-100 rounded mx-auto">
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                </svg>
              </button>
            )}
          </div>

          {/* Menu Items */}
          <nav className="flex-1 py-4">
            {menuItems.map((item, idx) => (
              <button
                key={idx}
                onClick={() => item.page !== 'dashboard' && onNavigate(item.page)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 transition ${
                  item.page === 'dashboard' ? 'bg-green-50 text-green-600 border-r-4 border-green-600' : ''
                }`}
              >
                <span className="text-2xl">{item.icon}</span>
                {sidebarOpen && <span className="font-medium">{item.label}</span>}
              </button>
            ))}
          </nav>

          {/* User Profile */}
          <div className="border-t border-gray-200 p-4">
            {sidebarOpen ? (
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-xl">
                    👨‍🌾
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 text-sm">{user.name}</div>
                    <div className="text-xs text-gray-500">{user.mobile}</div>
                  </div>
                </div>
                <button
                  onClick={onLogout}
                  className="w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition flex items-center gap-2"
                >
                  <span>🚪</span>
                  <span>{getTranslation('logout')}</span>
                </button>
              </div>
            ) : (
              <button onClick={onLogout} className="w-full p-2 text-red-600 hover:bg-red-50 rounded-lg transition">
                <span className="text-xl">🚪</span>
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 ${sidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300`}>
        {/* Top Bar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{getTranslation('dashboard')}</h1>
            <p className="text-sm text-gray-500">{getTranslation('welcome')}, {user.name}!</p>
          </div>
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <span className="text-2xl">🔔</span>
                {alerts.length > 0 && (
                  <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {alerts.length}
                  </span>
                )}
              </button>

              {/* Notification Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-96 bg-white rounded-xl shadow-2xl border border-gray-200 max-h-96 overflow-y-auto z-50">
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="font-bold text-gray-900">{getTranslation('smartAlerts')}</h3>
                  </div>
                  {alerts.length > 0 ? (
                    <div className="divide-y divide-gray-100">
                      {alerts.map((alert) => (
                        <button
                          key={alert.id}
                          onClick={() => handleAlertClick(alert)}
                          className="w-full p-4 hover:bg-gray-50 transition text-left"
                        >
                          <div className="flex gap-3">
                            <span className="text-2xl">{alert.icon}</span>
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900 mb-1">
                                {user.language === 'hi' ? alert.titleHi : user.language === 'mr' ? alert.titleMr : alert.title}
                              </h4>
                              <p className="text-sm text-gray-600">
                                {user.language === 'hi' ? alert.messageHi : user.language === 'mr' ? alert.messageMr : alert.message}
                              </p>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="p-8 text-center text-gray-500">
                      <span className="text-4xl block mb-2">✅</span>
                      <p>All caught up!</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500">
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-600 text-sm font-medium">{getTranslation('greenScore')}</span>
                <span className="text-3xl">🌿</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-green-600">{stats.carbonScore}</span>
                <span className="text-gray-500 text-lg">/100</span>
              </div>
              <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full transition-all" style={{ width: `${stats.carbonScore}%` }} />
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500">
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-600 text-sm font-medium">{getTranslation('carbonCredits')}</span>
                <span className="text-3xl">💚</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-blue-600">{stats.creditsEarned}</span>
                <span className="text-gray-500 text-sm">tons</span>
              </div>
              <button onClick={() => onNavigate('credits')} className="mt-3 text-blue-600 text-sm font-medium hover:underline">
                {getTranslation('viewAll')} →
              </button>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-yellow-500">
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-600 text-sm font-medium">{getTranslation('earnings')}</span>
                <span className="text-3xl">💰</span>
              </div>
              <div className="text-4xl font-bold text-yellow-600">₹{(stats.totalEarnings / 1000).toFixed(1)}k</div>
              <button onClick={() => onNavigate('marketplace')} className="mt-3 text-yellow-600 text-sm font-medium hover:underline">
                Marketplace →
              </button>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-purple-500">
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-600 text-sm font-medium">{getTranslation('farms')}</span>
                <span className="text-3xl">🗺️</span>
              </div>
              <div className="text-4xl font-bold text-purple-600">{stats.farmsCount}</div>
              <div className="mt-3 text-sm text-gray-600">
                {stats.practicesCount} practices • {stats.proofsCount} proofs
              </div>
            </div>
          </div>

          {/* AI Recommendations */}
          {recommendations.length > 0 && (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <span>🤖</span>
                  {getTranslation('aiRecommendations')}
                </h2>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {recommendations.map((rec) => (
                  <div key={rec.id} className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200 hover:shadow-xl transition">
                    <div className="flex items-start justify-between mb-4">
                      <span className="text-5xl">{rec.icon}</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        rec.priority === 'high' ? 'bg-red-100 text-red-700' : 
                        rec.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' : 
                        'bg-green-100 text-green-700'
                      }`}>
                        {rec.priority.toUpperCase()}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {user.language === 'hi' ? rec.titleHi : user.language === 'mr' ? rec.titleMr : rec.title}
                    </h3>
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between items-center p-2 bg-white rounded-lg">
                        <span className="text-sm text-gray-600">{getTranslation('potentialIncome')}</span>
                        <span className="font-bold text-green-600">₹{rec.potentialIncome.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-white rounded-lg">
                        <span className="text-sm text-gray-600">{getTranslation('potentialCredits')}</span>
                        <span className="font-bold text-blue-600">{rec.potentialCredits} tons</span>
                      </div>
                    </div>
                    <button
                      onClick={() => onNavigate('practice')}
                      className="w-full py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition"
                    >
                      {getTranslation('implementNow')} →
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{getTranslation('quickActions')}</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: '🗺️', title: getTranslation('farmMapping'), desc: 'Add new farm', page: 'farm-mapping', color: 'green' },
                { icon: '📸', title: getTranslation('proofUpload'), desc: 'Upload evidence', page: 'proof-upload', color: 'blue' },
                { icon: '🏪', title: getTranslation('marketplace'), desc: 'Buy/Sell credits', page: 'marketplace', color: 'yellow' }
              ].map((action, idx) => (
                <button
                  key={idx}
                  onClick={() => onNavigate(action.page)}
                  className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition text-left group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-14 h-14 bg-${action.color}-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition`}>
                      <span className="text-3xl">{action.icon}</span>
                    </div>
                    <svg className="w-6 h-6 text-gray-400 group-hover:text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{action.title}</h3>
                  <p className="text-gray-600 text-sm">{action.desc}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;