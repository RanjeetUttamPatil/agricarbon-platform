import { useState, useEffect } from 'react';
import { 
  getCurrentUser, 
  getFarmsByUser, 
  ecoPractices, 
  savePractice, 
  getPracticesByUser 
} from './../../data/dataStore';

const EcoPracticePage = ({ onBack }) => {
  const [user, setUser] = useState(null);
  const [farms, setFarms] = useState([]);
  const [selectedFarm, setSelectedFarm] = useState('');
  const [selectedPractices, setSelectedPractices] = useState([]);
  const [existingPractices, setExistingPractices] = useState([]);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
    
    if (currentUser) {
      const userFarms = getFarmsByUser(currentUser.id);
      setFarms(userFarms);
      
      if (userFarms.length > 0) {
        setSelectedFarm(userFarms[0].id);
      }

      const practices = getPracticesByUser(currentUser.id);
      setExistingPractices(practices);
    }
  }, []);

  const handleTogglePractice = (practiceId) => {
    if (selectedPractices.includes(practiceId)) {
      setSelectedPractices(selectedPractices.filter(p => p !== practiceId));
    } else {
      setSelectedPractices([...selectedPractices, practiceId]);
    }
  };

  const handleSubmit = () => {
    selectedPractices.forEach(practiceId => {
      savePractice({
        farmId: selectedFarm,
        practiceId: practiceId,
        startDate: new Date().toISOString()
      });
    });
    
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setSelectedPractices([]);
    }, 2000);
  };

  const getTranslation = (key) => {
    const lang = user?.language || 'hi';
    const translations = {
      en: {
        title: 'Eco-Practice Declaration',
        subtitle: 'Select sustainable farming practices you are following',
        selectFarm: 'Select Farm',
        practices: 'Select Practices',
        impact: 'Carbon Impact',
        high: 'High',
        medium: 'Medium',
        low: 'Low',
        submit: 'Submit Practices',
        success: 'Practices saved successfully!',
        back: 'Back to Dashboard',
        noPractices: 'No practices selected',
        selectAtLeast: 'Select at least one practice'
      },
      hi: {
        title: 'इको-प्रैक्टिस घोषणा',
        subtitle: 'उन टिकाऊ कृषि प्रथाओं का चयन करें जिनका आप पालन कर रहे हैं',
        selectFarm: 'खेत चुनें',
        practices: 'प्रथाएं चुनें',
        impact: 'कार्बन प्रभाव',
        high: 'उच्च',
        medium: 'मध्यम',
        low: 'कम',
        submit: 'प्रथाएं जमा करें',
        success: 'प्रथाएं सफलतापूर्वक सहेजी गईं!',
        back: 'डैशबोर्ड पर वापस जाएं',
        noPractices: 'कोई प्रथा नहीं चुनी गई',
        selectAtLeast: 'कम से कम एक प्रथा चुनें'
      },
      mr: {
        title: 'इको-प्रॅक्टिस घोषणा',
        subtitle: 'तुम्ही अनुसरण करत असलेल्या शाश्वत शेती पद्धती निवडा',
        selectFarm: 'शेत निवडा',
        practices: 'पद्धती निवडा',
        impact: 'कार्बन प्रभाव',
        high: 'उच्च',
        medium: 'मध्यम',
        low: 'कमी',
        submit: 'पद्धती सबमिट करा',
        success: 'पद्धती यशस्वीरित्या जतन केल्या!',
        back: 'डॅशबोर्डवर परत जा',
        noPractices: 'कोणतीही पद्धत निवडलेली नाही',
        selectAtLeast: 'किमान एक पद्धत निवडा'
      }
    };
    return translations[lang][key];
  };

  const getPracticeName = (practice) => {
    const lang = user?.language || 'hi';
    if (lang === 'hi') return practice.nameHi;
    if (lang === 'mr') return practice.nameMr;
    return practice.name;
  };

  const getImpactLevel = (impact) => {
    if (impact >= 2.0) return { level: getTranslation('high'), color: 'text-green-700 bg-green-100' };
    if (impact >= 1.3) return { level: getTranslation('medium'), color: 'text-yellow-700 bg-yellow-100' };
    return { level: getTranslation('low'), color: 'text-blue-700 bg-blue-100' };
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
            <span className="text-3xl">🌱</span>
            <div>
              <h1 className="text-xl font-bold text-gray-800">{getTranslation('title')}</h1>
              <p className="text-sm text-gray-600">{getTranslation('subtitle')}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
            <span className="text-2xl">✅</span>
            <span className="text-green-800 font-medium">{getTranslation('success')}</span>
          </div>
        )}

        {/* Farm Selection */}
        {farms.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <label className="block text-lg font-semibold text-gray-800 mb-3">
              {getTranslation('selectFarm')}
            </label>
            <select
              value={selectedFarm}
              onChange={(e) => setSelectedFarm(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              {farms.map((farm, idx) => (
                <option key={farm.id} value={farm.id}>
                  Farm {idx + 1} - {farm.area} acres ({farm.cropType})
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Practices Selection */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            {getTranslation('practices')}
          </h2>

          <div className="grid gap-4">
            {ecoPractices.map((practice) => {
              const isSelected = selectedPractices.includes(practice.id);
              const isExisting = existingPractices.some(
                p => p.farmId === selectedFarm && p.practiceId === practice.id
              );
              const impact = getImpactLevel(practice.carbonImpact);

              return (
                <button
                  key={practice.id}
                  onClick={() => !isExisting && handleTogglePractice(practice.id)}
                  disabled={isExisting}
                  className={`p-6 border-2 rounded-xl text-left transition-all ${
                    isExisting
                      ? 'border-gray-300 bg-gray-50 cursor-not-allowed'
                      : isSelected
                      ? 'border-green-500 bg-green-50 shadow-md'
                      : 'border-gray-200 hover:border-green-300 hover:bg-green-50'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-16 h-16 bg-white rounded-xl border-2 border-gray-200 flex items-center justify-center text-3xl">
                      {practice.icon}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-bold text-gray-800">
                          {getPracticeName(practice)}
                        </h3>
                        <div className="flex items-center gap-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${impact.color}`}>
                            {impact.level}
                          </span>
                          {isExisting && (
                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                              Active
                            </span>
                          )}
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm mb-3">{practice.description}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span className="font-medium">{getTranslation('impact')}:</span>
                        <span className="font-mono text-green-600">
                          {practice.carbonImpact}× CO₂ reduction
                        </span>
                      </div>
                    </div>

                    {!isExisting && (
                      <div className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        isSelected ? 'bg-green-500 border-green-500' : 'border-gray-300'
                      }`}>
                        {isSelected && (
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          <button
            onClick={handleSubmit}
            disabled={selectedPractices.length === 0}
            className="w-full mt-6 px-6 py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition duration-200 shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {selectedPractices.length === 0 
              ? getTranslation('selectAtLeast')
              : `${getTranslation('submit')} (${selectedPractices.length})`
            }
          </button>
        </div>
      </div>
    </div>
  );
};

export default EcoPracticePage;