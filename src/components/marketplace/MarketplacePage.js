import { useState, useEffect } from 'react';
import {
  getCurrentUser,
  calculateCarbonCredits,
  getFarmsByUser,
  getPracticesByUser
} from '../../data/dataStore';

const MarketplacePage = ({ onBack }) => {
  const [user, setUser] = useState(null);
  const [credits, setCredits] = useState(0);
  const [farms, setFarms] = useState([]);
  const [practices, setPractices] = useState([]);
  const [certificateId, setCertificateId] = useState('');
  const [showCertificate, setShowCertificate] = useState(false);

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);

    if (currentUser) {
      const userCredits = calculateCarbonCredits(currentUser.id);
      setCredits(userCredits);

      const userFarms = getFarmsByUser(currentUser.id);
      setFarms(userFarms);

      const userPractices = getPracticesByUser(currentUser.id);
      setPractices(userPractices);

      // Generate unique certificate ID
      setCertificateId(`AGRI-${currentUser.id.slice(-6).toUpperCase()}-${new Date().getFullYear()}`);
    }
  }, []);

  // Dummy buyer data
  const interestedBuyers = [
    {
      id: 1,
      name: 'Tata Motors',
      logo: '🚗',
      industry: 'Automotive Manufacturing',
      requirement: '500 tCO₂e',
      priceRange: '₹800-1,200',
      status: 'Open',
      color: 'blue'
    },
    {
      id: 2,
      name: 'Infosys',
      logo: '💻',
      industry: 'Technology & Services',
      requirement: '1,000 tCO₂e',
      priceRange: '₹900-1,100',
      status: 'Open',
      color: 'purple'
    },
    {
      id: 3,
      name: 'Hindustan Unilever',
      logo: '🧴',
      industry: 'FMCG',
      requirement: '750 tCO₂e',
      priceRange: '₹850-1,000',
      status: 'In Discussion',
      color: 'green'
    },
    {
      id: 4,
      name: 'Reliance Industries',
      logo: '⚡',
      industry: 'Energy & Petrochemicals',
      requirement: '2,000 tCO₂e',
      priceRange: '₹1,000-1,500',
      status: 'Open',
      color: 'red'
    }
  ];

  const getTranslation = (key) => {
    const lang = user?.language || 'hi';
    const translations = {
      en: {
        title: 'Carbon Credit Marketplace',
        subtitle: 'Verified, traceable, and buyer-ready carbon credits',
        certificate: 'Your Carbon Credit Certificate',
        certificateDesc: 'Official verification of your environmental contribution',
        farmerId: 'Farmer ID',
        totalCredits: 'Total Verified Credits',
        verificationStatus: 'Verification Status',
        verified: 'Verified',
        methodology: 'Methodology',
        methodologyText: 'AI + Satellite + Geo-tagged Proof',
        validity: 'Validity Period',
        certificateId: 'Certificate ID',
        downloadCert: 'Download Certificate',
        shareCert: 'Share Certificate',
        viewCert: 'View Certificate',
        interestedBuyers: 'Interested Buyers',
        buyersDesc: 'Companies actively looking to purchase carbon credits',
        industry: 'Industry',
        requirement: 'Carbon Requirement',
        priceRange: 'Price Range',
        status: 'Status',
        requestConnect: 'Request to Connect',
        matching: 'Credit Matching',
        eligible: 'Your verified credits are eligible for',
        buyers: 'buyer(s)',
        matchNote: 'Final pricing & transfer occurs via partner registry or verified channels',
        trustCompliance: 'Trust & Compliance',
        verificationApproach: 'Verification Approach',
        verificationDesc: 'Multi-layer verification using AI analysis, satellite imagery, and geo-tagged photo evidence',
        dataIntegrity: 'Data Integrity',
        integrityDesc: 'Blockchain-ready for future immutable record keeping',
        thirdParty: 'Third-Party Verification',
        thirdPartyDesc: 'Roadmap includes integration with certified auditors and international registries',
        digitalCertificate: 'Digitally Generated Certificate',
        generatedOn: 'Generated on'
      },
      hi: {
        title: 'कार्बन क्रेडिट मार्केटप्लेस',
        subtitle: 'सत्यापित, ट्रेस करने योग्य और खरीदार के लिए तैयार कार्बन क्रेडिट',
        certificate: 'आपका कार्बन क्रेडिट प्रमाणपत्र',
        certificateDesc: 'आपके पर्यावरणीय योगदान का आधिकारिक सत्यापन',
        farmerId: 'किसान आईडी',
        totalCredits: 'कुल सत्यापित क्रेडिट',
        verificationStatus: 'सत्यापन स्थिति',
        verified: 'सत्यापित',
        methodology: 'पद्धति',
        methodologyText: 'AI + सैटेलाइट + जियो-टैग प्रमाण',
        validity: 'वैधता अवधि',
        certificateId: 'प्रमाणपत्र आईडी',
        downloadCert: 'प्रमाणपत्र डाउनलोड करें',
        shareCert: 'प्रमाणपत्र साझा करें',
        viewCert: 'प्रमाणपत्र देखें',
        interestedBuyers: 'इच्छुक खरीदार',
        buyersDesc: 'कार्बन क्रेडिट खरीदने के लिए सक्रिय रूप से देख रही कंपनियां',
        industry: 'उद्योग',
        requirement: 'कार्बन आवश्यकता',
        priceRange: 'मूल्य सीमा',
        status: 'स्थिति',
        requestConnect: 'कनेक्ट का अनुरोध करें',
        matching: 'क्रेडिट मिलान',
        eligible: 'आपके सत्यापित क्रेडिट के लिए पात्र हैं',
        buyers: 'खरीदार',
        matchNote: 'अंतिम मूल्य निर्धारण और हस्तांतरण साझेदार रजिस्ट्री या सत्यापित चैनलों के माध्यम से होता है',
        trustCompliance: 'विश्वास और अनुपालन',
        verificationApproach: 'सत्यापन दृष्टिकोण',
        verificationDesc: 'AI विश्लेषण, सैटेलाइट इमेजरी और जियो-टैग फोटो साक्ष्य का उपयोग करके बहु-स्तरीय सत्यापन',
        dataIntegrity: 'डेटा अखंडता',
        integrityDesc: 'भविष्य में अपरिवर्तनीय रिकॉर्ड रखने के लिए ब्लॉकचेन-तैयार',
        thirdParty: 'तृतीय-पक्ष सत्यापन',
        thirdPartyDesc: 'रोडमैप में प्रमाणित ऑडिटर और अंतर्राष्ट्रीय रजिस्ट्रियों के साथ एकीकरण शामिल है',
        digitalCertificate: 'डिजिटल रूप से उत्पन्न प्रमाणपत्र',
        generatedOn: 'पर उत्पन्न'
      },
      mr: {
        title: 'कार्बन क्रेडिट मार्केटप्लेस',
        subtitle: 'सत्यापित, ट्रेस करण्यायोग्य आणि खरेदीदारासाठी तयार कार्बन क्रेडिट्स',
        certificate: 'तुमचे कार्बन क्रेडिट प्रमाणपत्र',
        certificateDesc: 'तुमच्या पर्यावरणीय योगदानाचे अधिकृत सत्यापन',
        farmerId: 'शेतकरी आयडी',
        totalCredits: 'एकूण सत्यापित क्रेडिट्स',
        verificationStatus: 'सत्यापन स्थिती',
        verified: 'सत्यापित',
        methodology: 'पद्धत',
        methodologyText: 'AI + सॅटेलाइट + जिओ-टॅग पुरावा',
        validity: 'वैधता कालावधी',
        certificateId: 'प्रमाणपत्र आयडी',
        downloadCert: 'प्रमाणपत्र डाउनलोड करा',
        shareCert: 'प्रमाणपत्र शेअर करा',
        viewCert: 'प्रमाणपत्र पहा',
        interestedBuyers: 'इच्छुक खरेदीदार',
        buyersDesc: 'कार्बन क्रेडिट्स खरेदी करण्यासाठी सक्रियपणे शोधत असलेल्या कंपन्या',
        industry: 'उद्योग',
        requirement: 'कार्बन आवश्यकता',
        priceRange: 'किंमत श्रेणी',
        status: 'स्थिती',
        requestConnect: 'कनेक्ट करण्याची विनंती',
        matching: 'क्रेडिट जुळणी',
        eligible: 'तुमची सत्यापित क्रेडिट्स पात्र आहेत',
        buyers: 'खरेदीदार',
        matchNote: 'अंतिम किंमत आणि हस्तांतरण भागीदार नोंदणी किंवा सत्यापित चॅनेलद्वारे होते',
        trustCompliance: 'विश्वास आणि अनुपालन',
        verificationApproach: 'सत्यापन दृष्टिकोन',
        verificationDesc: 'AI विश्लेषण, सॅटेलाइट इमेजरी आणि जिओ-टॅग फोटो पुराव्याचा वापर करून बहु-स्तरीय सत्यापन',
        dataIntegrity: 'डेटा अखंडता',
        integrityDesc: 'भविष्यातील अपरिवर्तनीय रेकॉर्ड ठेवण्यासाठी ब्लॉकचेन-तयार',
        thirdParty: 'तृतीय-पक्ष सत्यापन',
        thirdPartyDesc: 'रोडमॅपमध्ये प्रमाणित ऑडिटर आणि आंतरराष्ट्रीय नोंदणींसह एकत्रीकरण समाविष्ट आहे',
        digitalCertificate: 'डिजिटली व्युत्पन्न प्रमाणपत्र',
        generatedOn: 'रोजी व्युत्पन्न'
      }
    };
    return translations[lang][key];
  };

  const handleDownloadCertificate = () => {
    // In production, this would generate a PDF
    alert('Certificate download will be implemented with PDF generation library');
  };

  const handleShareCertificate = () => {
    const shareText = `I've earned ${credits} verified carbon credits through sustainable farming! 🌱 Certificate ID: ${certificateId}`;

    if (navigator.share) {
      navigator.share({
        title: 'My Carbon Credit Certificate',
        text: shareText,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(shareText);
      alert('Certificate link copied to clipboard!');
    }
  };

  const handleRequestConnect = (buyerName) => {
    alert(`Connection request sent to ${buyerName}. Our team will facilitate the introduction.`);
  };

  const matchingBuyers = credits > 0 ? interestedBuyers.filter(b => b.status === 'Open').length : 0;

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg">
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{getTranslation('title')}</h1>
            <p className="text-sm text-gray-600">{getTranslation('subtitle')}</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Carbon Credit Certificate Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <span>📜</span>
                {getTranslation('certificate')}
              </h2>
              <p className="text-gray-600">{getTranslation('certificateDesc')}</p>
            </div>
            <button
              onClick={() => setShowCertificate(!showCertificate)}
              className="px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition"
            >
              {showCertificate ? '← Back' : getTranslation('viewCert')}
            </button>
          </div>

          {/* Certificate Preview Card */}
          {!showCertificate ? (
            <div className="bg-white rounded-3xl shadow-xl p-8 border-4 border-green-200">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center">
                    <span className="text-4xl">🌾</span>
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900">AgriCarbon</h3>
                    <p className="text-green-600 font-medium">{getTranslation('digitalCertificate')}</p>
                  </div>
                </div>
                <div className="w-24 h-24 bg-gray-200 rounded-xl flex items-center justify-center">
                  <div className="text-xs text-center text-gray-600">QR Code</div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4 flex flex-col items-center text-center">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{getTranslation('farmerId')}</p>
                    <p className="text-xl font-bold text-gray-900">{user.name}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600 mb-1">{getTranslation('totalCredits')}</p>
                    <div className="flex items-center justify-start gap-2">
                      <span className="text-4xl font-bold text-green-600">{credits}</span>
                      <span className="text-gray-600">tCO₂e</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 flex flex-col items-center text-center">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{getTranslation('verificationStatus')}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">✅</span>
                      <span className="text-xl font-bold text-green-600">{getTranslation('verified')}</span>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600 mb-1">{getTranslation('methodology')}</p>
                    <p className="text-sm font-semibold text-gray-800">{getTranslation('methodologyText')}</p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-blue-50 rounded-xl">
                  <p className="text-sm text-gray-600 mb-1">{getTranslation('validity')}</p>
                  <p className="font-bold text-gray-900">{new Date().getFullYear()} - {new Date().getFullYear() + 1}</p>
                </div>

                <div className="p-4 bg-purple-50 rounded-xl">
                  <p className="text-sm text-gray-600 mb-1">{getTranslation('certificateId')}</p>
                  <p className="font-mono font-bold text-gray-900">{certificateId}</p>
                </div>
              </div>

              <div className="border-t-2 border-dashed border-gray-300 pt-4">
                <p className="text-xs text-gray-500 text-center mb-4">
                  {getTranslation('generatedOn')} {new Date().toLocaleDateString()}
                </p>

                <div className="flex gap-4">
                  <button
                    onClick={handleDownloadCertificate}
                    className="flex-1 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-bold hover:shadow-xl transition flex items-center justify-center gap-2"
                  >
                    <span>📄</span>
                    {getTranslation('downloadCert')}
                  </button>
                  <button
                    onClick={handleShareCertificate}
                    className="flex-1 py-3 border-2 border-green-600 text-green-600 rounded-xl font-bold hover:bg-green-50 transition flex items-center justify-center gap-2"
                  >
                    <span>🔗</span>
                    {getTranslation('shareCert')}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Full Certificate View */
            <div className="bg-white rounded-3xl shadow-2xl p-12 border-8 border-double border-green-600">
              <div className="text-center mb-8">
                <div className="inline-block w-32 h-32 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mb-6">
                  <span className="text-7xl">🏆</span>
                </div>
                <h2 className="text-5xl font-bold text-gray-900 mb-4">Certificate of Achievement</h2>
                <p className="text-2xl text-green-600 font-semibold">Carbon Credit Verification</p>
              </div>

              <div className="max-w-3xl mx-auto">
                <p className="text-center text-xl text-gray-700 mb-8">
                  This certifies that <span className="font-bold text-gray-900">{user.name}</span> has successfully generated and verified
                </p>

                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 text-center mb-8">
                  <div className="text-7xl font-bold text-green-600 mb-2">{credits}</div>
                  <div className="text-2xl text-gray-700">Tons of CO₂ Equivalent</div>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">Certificate ID</p>
                    <p className="font-mono font-bold text-lg">{certificateId}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">Issue Date</p>
                    <p className="font-bold text-lg">{new Date().toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="border-t-4 border-green-600 pt-6 flex justify-between items-end">
                  <div className="text-center">
                    <div className="mb-2 text-3xl">🌾</div>
                    <div className="font-bold">AgriCarbon Platform</div>
                    <div className="text-sm text-gray-600">Digital Verification</div>
                  </div>
                  <div className="w-32 h-32 bg-gray-200 rounded-xl flex items-center justify-center">
                    <div className="text-xs text-center text-gray-600">QR Code<br />Verification</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Credit Matching Section */}
        {credits > 0 && (
          <div className="mb-8 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-3xl shadow-xl p-8 border-2 border-blue-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span>🎯</span>
              {getTranslation('matching')}
            </h3>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex-1">
                <p className="text-lg text-gray-700">
                  {getTranslation('eligible')} <span className="text-3xl font-bold text-blue-600">{matchingBuyers}</span> {getTranslation('buyers')}
                </p>
              </div>
              <div className="px-6 py-3 bg-blue-600 text-white rounded-full font-bold text-lg">
                {Math.round((matchingBuyers / interestedBuyers.length) * 100)}% Match
              </div>
            </div>
            <p className="text-sm text-gray-600 italic">
              💡 {getTranslation('matchNote')}
            </p>
          </div>
        )}

        {/* Interested Buyers Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
            <span>🏢</span>
            {getTranslation('interestedBuyers')}
          </h2>
          <p className="text-gray-600 mb-6">{getTranslation('buyersDesc')}</p>

          <div className="grid md:grid-cols-2 gap-6">
            {interestedBuyers.map((buyer) => (
              <div
                key={buyer.id}
                className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition p-8 border-2 border-gray-200 hover:border-green-300"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className={`w-16 h-16 bg-${buyer.color}-100 rounded-2xl flex items-center justify-center text-4xl`}>
                      {buyer.logo}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{buyer.name}</h3>
                      <p className="text-sm text-gray-600">{buyer.industry}</p>
                    </div>
                  </div>
                  <span className={`px-4 py-2 rounded-full text-sm font-bold ${buyer.status === 'Open'
                      ? 'bg-green-100 text-green-700 border-2 border-green-300'
                      : 'bg-yellow-100 text-yellow-700 border-2 border-yellow-300'
                    }`}>
                    {buyer.status}
                  </span>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                    <span className="text-sm text-gray-600">{getTranslation('requirement')}</span>
                    <span className="font-bold text-gray-900">{buyer.requirement}</span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                    <span className="text-sm text-gray-600">{getTranslation('priceRange')}</span>
                    <span className="font-bold text-green-600">{buyer.priceRange}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleRequestConnect(buyer.name)}
                  disabled={credits === 0 || buyer.status !== 'Open'}
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-bold hover:shadow-lg transition disabled:bg-gray-400 disabled:from-gray-400 disabled:to-gray-400"
                >
                  {getTranslation('requestConnect')} →
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Trust & Compliance Section */}
        <div className="bg-white rounded-3xl shadow-xl p-8 border-2 border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <span>🔒</span>
            {getTranslation('trustCompliance')}
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl">
              <div className="text-4xl mb-4">✔️</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{getTranslation('verificationApproach')}</h3>
              <p className="text-sm text-gray-700">{getTranslation('verificationDesc')}</p>
            </div>

            <div className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl">
              <div className="text-4xl mb-4">🔗</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{getTranslation('dataIntegrity')}</h3>
              <p className="text-sm text-gray-700">{getTranslation('integrityDesc')}</p>
            </div>

            <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl">
              <div className="text-4xl mb-4">🏅</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{getTranslation('thirdParty')}</h3>
              <p className="text-sm text-gray-700">{getTranslation('thirdPartyDesc')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketplacePage;