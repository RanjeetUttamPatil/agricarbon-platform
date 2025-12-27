import { useState, useEffect } from 'react';
import { 
  getCurrentUser, 
  getAllMarketListings,
  createMarketListing,
  calculateCarbonCredits
} from './../../data/dataStore';

const MarketplacePage = ({ onBack }) => {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('buy'); // 'buy' or 'sell'
  const [listings, setListings] = useState([]);
  const [availableCredits, setAvailableCredits] = useState(0);
  const [sellForm, setSellForm] = useState({
    credits: '',
    pricePerCredit: 1000
  });
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
    
    if (currentUser) {
      const credits = calculateCarbonCredits(currentUser.id);
      setAvailableCredits(credits);
      
      const allListings = getAllMarketListings();
      setListings(allListings);
    }
  }, [success]);

  const handleSellSubmit = () => {
    if (!sellForm.credits || parseFloat(sellForm.credits) <= 0) {
      return;
    }

    createMarketListing({
      credits: parseFloat(sellForm.credits),
      pricePerCredit: sellForm.pricePerCredit,
      totalValue: parseFloat(sellForm.credits) * sellForm.pricePerCredit,
      sellerName: user.name,
      location: user.district || 'Maharashtra'
    });

    setSuccess(true);
    setSellForm({ credits: '', pricePerCredit: 1000 });
    
    setTimeout(() => {
      setSuccess(false);
    }, 2000);
  };

  const getTranslation = (key) => {
    const lang = user?.language || 'hi';
    const translations = {
      en: {
        title: 'Carbon Credit Marketplace',
        subtitle: 'Buy and sell carbon credits',
        buy: 'Buy Credits',
        sell: 'Sell Credits',
        available: 'Available Credits',
        seller: 'Seller',
        location: 'Location',
        credits: 'Credits',
        price: 'Price per Credit',
        total: 'Total Value',
        buyNow: 'Buy Now',
        listForSale: 'List for Sale',
        yourCredits: 'Your Available Credits',
        creditsToSell: 'Credits to Sell',
        setPrice: 'Set Price per Credit',
        estimatedEarnings: 'Estimated Earnings',
        submit: 'List on Marketplace',
        success: 'Listed successfully!',
        noListings: 'No credits available',
        tons: 'tons CO₂'
      },
      hi: {
        title: 'कार्बन क्रेडिट मार्केटप्लेस',
        subtitle: 'कार्बन क्रेडिट खरीदें और बेचें',
        buy: 'क्रेडिट खरीदें',
        sell: 'क्रेडिट बेचें',
        available: 'उपलब्ध क्रेडिट',
        seller: 'विक्रेता',
        location: 'स्थान',
        credits: 'क्रेडिट',
        price: 'प्रति क्रेडिट मूल्य',
        total: 'कुल मूल्य',
        buyNow: 'अभी खरीदें',
        listForSale: 'बिक्री के लिए सूचीबद्ध करें',
        yourCredits: 'आपके उपलब्ध क्रेडिट',
        creditsToSell: 'बेचने के लिए क्रेडिट',
        setPrice: 'प्रति क्रेडिट मूल्य सेट करें',
        estimatedEarnings: 'अनुमानित कमाई',
        submit: 'मार्केटप्लेस पर सूचीबद्ध करें',
        success: 'सफलतापूर्वक सूचीबद्ध!',
        noListings: 'कोई क्रेडिट उपलब्ध नहीं',
        tons: 'टन CO₂'
      },
      mr: {
        title: 'कार्बन क्रेडिट मार्केटप्लेस',
        subtitle: 'कार्बन क्रेडिट्स खरेदी आणि विक्री करा',
        buy: 'क्रेडिट्स खरेदी करा',
        sell: 'क्रेडिट्स विकणे',
        available: 'उपलब्ध क्रेडिट्स',
        seller: 'विक्रेता',
        location: 'स्थान',
        credits: 'क्रेडिट्स',
        price: 'प्रति क्रेडिट किंमत',
        total: 'एकूण मूल्य',
        buyNow: 'आता खरेदी करा',
        listForSale: 'विक्रीसाठी यादी करा',
        yourCredits: 'तुमची उपलब्ध क्रेडिट्स',
        creditsToSell: 'विकण्यासाठी क्रेडिट्स',
        setPrice: 'प्रति क्रेडिट किंमत सेट करा',
        estimatedEarnings: 'अंदाजित कमाई',
        submit: 'मार्केटप्लेसवर यादी करा',
        success: 'यशस्वीरित्या यादी केली!',
        noListings: 'कोणतेही क्रेडिट्स उपलब्ध नाहीत',
        tons: 'टन CO₂'
      }
    };
    return translations[lang][key];
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg">
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="flex items-center gap-3">
            <span className="text-3xl">🏪</span>
            <div>
              <h1 className="text-xl font-bold text-gray-800">{getTranslation('title')}</h1>
              <p className="text-sm text-gray-600">{getTranslation('subtitle')}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
            <span className="text-2xl">✅</span>
            <span className="text-green-800 font-medium">{getTranslation('success')}</span>
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab('buy')}
            className={`flex-1 py-3 px-6 font-semibold rounded-xl transition-all ${
              activeTab === 'buy'
                ? 'bg-white text-green-600 shadow-lg'
                : 'bg-white bg-opacity-50 text-gray-600 hover:bg-white'
            }`}
          >
            🛒 {getTranslation('buy')}
          </button>
          <button
            onClick={() => setActiveTab('sell')}
            className={`flex-1 py-3 px-6 font-semibold rounded-xl transition-all ${
              activeTab === 'sell'
                ? 'bg-white text-green-600 shadow-lg'
                : 'bg-white bg-opacity-50 text-gray-600 hover:bg-white'
            }`}
          >
            💰 {getTranslation('sell')}
          </button>
        </div>

        {activeTab === 'buy' ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.length > 0 ? (
              listings.map((listing) => (
                <div key={listing.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-2xl">👨‍🌾</span>
                        <h3 className="font-bold text-gray-800">{listing.sellerName || 'Farmer'}</h3>
                      </div>
                      <p className="text-sm text-gray-600">📍 {listing.location || 'India'}</p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-2xl">💚</span>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <span className="text-sm text-gray-700">{getTranslation('credits')}</span>
                      <span className="font-bold text-green-700">{listing.credits} {getTranslation('tons')}</span>
                    </div>

                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span className="text-sm text-gray-700">{getTranslation('price')}</span>
                      <span className="font-bold text-blue-700">₹{listing.pricePerCredit}</span>
                    </div>

                    <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                      <span className="text-sm text-gray-700">{getTranslation('total')}</span>
                      <span className="font-bold text-yellow-700">₹{listing.totalValue.toLocaleString()}</span>
                    </div>
                  </div>

                  <button className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition duration-200">
                    {getTranslation('buyNow')}
                  </button>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-16">
                <span className="text-6xl mb-4 block">🏪</span>
                <p className="text-gray-500 text-lg">{getTranslation('noListings')}</p>
              </div>
            )}
          </div>
        ) : (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              {/* Available Credits Display */}
              <div className="mb-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{getTranslation('yourCredits')}</p>
                    <p className="text-3xl font-bold text-green-700">{availableCredits} {getTranslation('tons')}</p>
                  </div>
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                    <span className="text-4xl">💚</span>
                  </div>
                </div>
              </div>

              {/* Sell Form */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {getTranslation('creditsToSell')}
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    max={availableCredits}
                    value={sellForm.credits}
                    onChange={(e) => setSellForm({ ...sellForm, credits: e.target.value })}
                    placeholder="10.0"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <p className="mt-2 text-sm text-gray-500">
                    Max: {availableCredits} {getTranslation('tons')}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {getTranslation('setPrice')}
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min="500"
                      max="2000"
                      step="50"
                      value={sellForm.pricePerCredit}
                      onChange={(e) => setSellForm({ ...sellForm, pricePerCredit: parseInt(e.target.value) })}
                      className="flex-1"
                    />
                    <div className="w-32 px-4 py-2 bg-gray-100 rounded-lg text-center font-bold text-gray-800">
                      ₹{sellForm.pricePerCredit}
                    </div>
                  </div>
                  <div className="mt-2 flex justify-between text-xs text-gray-500">
                    <span>₹500</span>
                    <span>₹2000</span>
                  </div>
                </div>

                {/* Earnings Preview */}
                {sellForm.credits && (
                  <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-xl">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 font-medium">{getTranslation('estimatedEarnings')}</span>
                      <span className="text-2xl font-bold text-yellow-700">
                        ₹{(parseFloat(sellForm.credits || 0) * sellForm.pricePerCredit).toLocaleString()}
                      </span>
                    </div>
                  </div>
                )}

                <button
                  onClick={handleSellSubmit}
                  disabled={!sellForm.credits || parseFloat(sellForm.credits) <= 0 || parseFloat(sellForm.credits) > availableCredits}
                  className="w-full py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition duration-200 shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {getTranslation('submit')}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketplacePage;