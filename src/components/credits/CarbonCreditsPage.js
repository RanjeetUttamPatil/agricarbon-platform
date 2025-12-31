import { useState, useEffect } from 'react';
import {
  getCurrentUser,
  calculateCarbonCredits,
  calculateCarbonScore,
  getFarmsByUser,
  getPracticesByUser,
  ecoPractices
} from './../../data/dataStore';

const CarbonCreditsPage = ({ onBack }) => {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    totalCredits: 0,
    carbonScore: 0,
    farmsCount: 0,
    practicesBreakdown: []
  });

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);

    if (currentUser) {
      const credits = calculateCarbonCredits(currentUser.id);
      const score = calculateCarbonScore(currentUser.id);
      const farms = getFarmsByUser(currentUser.id);
      const practices = getPracticesByUser(currentUser.id);

      // Calculate breakdown by practice type
      const breakdown = {};
      practices.forEach(p => {
        const practiceInfo = ecoPractices.find(ep => ep.id === p.practiceId);
        if (practiceInfo) {
          if (!breakdown[p.practiceId]) {
            breakdown[p.practiceId] = {
              name: practiceInfo.name,
              nameHi: practiceInfo.nameHi,
              nameMr: practiceInfo.nameMr,
              icon: practiceInfo.icon,
              count: 0,
              impact: practiceInfo.carbonImpact
            };
          }
          breakdown[p.practiceId].count++;
        }
      });

      setStats({
        totalCredits: credits,
        carbonScore: score,
        farmsCount: farms.length,
        practicesBreakdown: Object.values(breakdown)
      });
    }
  }, []);

  const getTranslation = (key) => {
    const lang = user?.language || 'hi';
    const translations = {
      en: {
        title: 'Carbon Credits & Green Score',
        subtitle: 'Track your environmental impact',
        totalCredits: 'Total Carbon Credits',
        greenScore: 'Green Score',
        equivalentTo: 'Equivalent To',
        trees: 'trees planted',
        cars: 'cars off road for a year',
        breakdown: 'Impact Breakdown by Practice',
        noData: 'No data available yet',
        farms: 'Active Farms',
        howCalculated: 'How Credits are Calculated',
        calculation: 'Carbon credits are calculated based on your farm area, crop type, eco-practices adopted, and verification proofs. Each practice has different carbon sequestration potential.',
        improve: 'Ways to Improve Your Score',
        tip1: 'Upload regular proof photos',
        tip2: 'Adopt multiple eco-practices',
        tip3: 'Maintain consistent practice logs',
        tip4: 'Increase farm coverage area'
      },
      hi: {
        title: 'कार्बन क्रेडिट और ग्रीन स्कोर',
        subtitle: 'अपने पर्यावरणीय प्रभाव को ट्रैक करें',
        totalCredits: 'कुल कार्बन क्रेडिट',
        greenScore: 'ग्रीन स्कोर',
        equivalentTo: 'के बराबर',
        trees: 'पेड़ लगाए',
        cars: 'एक साल के लिए सड़क से कारें',
        breakdown: 'प्रथा के अनुसार प्रभाव विभाजन',
        noData: 'अभी तक कोई डेटा उपलब्ध नहीं',
        farms: 'सक्रिय खेत',
        howCalculated: 'क्रेडिट की गणना कैसे की जाती है',
        calculation: 'कार्बन क्रेडिट की गणना आपके खेत के क्षेत्र, फसल के प्रकार, अपनाई गई इको-प्रथाओं और सत्यापन प्रमाणों के आधार पर की जाती है। प्रत्येक प्रथा में अलग-अलग कार्बन संग्रहण क्षमता होती है।',
        improve: 'अपना स्कोर बेहतर बनाने के तरीके',
        tip1: 'नियमित प्रमाण फोटो अपलोड करें',
        tip2: 'कई इको-प्रथाओं को अपनाएं',
        tip3: 'लगातार प्रथा लॉग बनाए रखें',
        tip4: 'खेत कवरेज क्षेत्र बढ़ाएं'
      },
      mr: {
        title: 'कार्बन क्रेडिट आणि ग्रीन स्कोअर',
        subtitle: 'तुमचा पर्यावरणीय प्रभाव ट्रॅक करा',
        totalCredits: 'एकूण कार्बन क्रेडिट',
        greenScore: 'ग्रीन स्कोअर',
        equivalentTo: 'च्या बरोबर',
        trees: 'झाडे लावली',
        cars: 'एका वर्षासाठी रस्त्यावरून गाड्या',
        breakdown: 'पद्धतीनुसार प्रभाव विभाजन',
        noData: 'अद्याप कोणताही डेटा उपलब्ध नाही',
        farms: 'सक्रिय शेत',
        howCalculated: 'क्रेडिट्सची गणना कशी केली जाते',
        calculation: 'कार्बन क्रेडिट्सची गणना तुमच्या शेत क्षेत्र, पीक प्रकार, स्वीकारलेल्या इको-पद्धती आणि सत्यापन पुराव्यांवर आधारित केली जाते। प्रत्येक पद्धतीमध्ये भिन्न कार्बन संचय क्षमता असते।',
        improve: 'तुमचा स्कोअर सुधारण्याचे मार्ग',
        tip1: 'नियमित पुरावा फोटो अपलोड करा',
        tip2: 'अनेक इको-पद्धती अंगीकार करा',
        tip3: 'सातत्यपूर्ण पद्धत लॉग राखा',
        tip4: 'शेत कव्हरेज क्षेत्र वाढवा'
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
            <span className="text-3xl">💚</span>
            <div>
              <h1 className="text-xl font-bold text-gray-800">{getTranslation('title')}</h1>
              <p className="text-sm text-gray-600">{getTranslation('subtitle')}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Main Stats */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Total Credits */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-gray-600 mb-2">{getTranslation('totalCredits')}</p>
                <p className="text-5xl font-bold text-green-600">{stats.totalCredits}</p>
                <p className="text-gray-500 mt-1">tons CO₂</p>
              </div>
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-5xl">💚</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">{getTranslation('equivalentTo')}</p>
                <p className="font-bold text-green-700">
                  🌳 {Math.round(stats.totalCredits * 45)} {getTranslation('trees')}
                </p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">{getTranslation('equivalentTo')}</p>
                <p className="font-bold text-blue-700">
                  🚗 {Math.round(stats.totalCredits * 2)} {getTranslation('cars')}
                </p>
              </div>
            </div>
          </div>

          {/* Green Score */}
          <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-xl">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-gray-800 mb-2 text-lg">Carbon Credit Lifecycle</p>
                {/* <p className="text-2xl font-bold text-gray-800">
                  Current Stage: <span className="text-green-600">{stats.currentStage}</span>
                </p> */}
              </div>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-4xl">📘</span>
              </div>
            </div>

            {/* Horizontal Stepper */}
            <div className="relative flex justify-between items-center mb-16">
              {/* Background line */}
              <div className="absolute top-5 left-5 right-5 h-1 bg-gray-300 z-0"></div>
              {/* Completed line */}
              <div
                className="absolute top-5 left-5 h-1 bg-green-600 z-0"
                style={{
                  width: `${(['Generated', 'Submitted', 'Verified', 'Market Ready'].indexOf(stats.currentStage)) * 33.33}%`,
                }}
              ></div>

              {['Generated', 'Submitted', 'Verified', 'Market Ready'].map((stage, idx, arr) => {
                const isCompleted =
                  arr.indexOf(stage) <= arr.indexOf(stats.currentStage);

                return (
                  <div key={stage} className="flex-1 flex flex-col items-center relative z-10">
                    {/* Step circle */}
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 ${isCompleted ? 'bg-green-600 text-white font-bold' : 'bg-gray-300 text-gray-700'
                        }`}
                    >
                      {idx + 1}
                    </div>
                    {/* Step label */}
                    <p
                      className={`text-sm text-center ${isCompleted ? 'text-green-600 font-semibold' : 'text-gray-500'
                        }`}
                    >
                      {stage}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Bottom stats */}
            <div className="grid grid-cols-3 gap-4 text-center text-sm mt-6">
              <div className="bg-gray-50 rounded-xl shadow-sm py-4 px-2">
                <div className="font-bold text-gray-800 text-lg">{stats.farmsCount}</div>
                <div className="text-gray-500">Farms</div>
              </div>
              <div className="bg-gray-50 rounded-xl shadow-sm py-4 px-2">
                <div className="font-bold text-gray-800 text-lg">{stats.practicesBreakdown.length}</div>
                <div className="text-gray-500">Practices</div>
              </div>
              <div className="bg-gray-50 rounded-xl shadow-sm py-4 px-2">
                <div className="font-bold text-gray-800 text-lg">{Math.round(stats.totalCredits)}</div>
                <div className="text-gray-500">Credits</div>
              </div>
            </div>

          </div>




        </div>

        {/* Impact Breakdown */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">{getTranslation('breakdown')}</h2>

          {stats.practicesBreakdown.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-4">
              {stats.practicesBreakdown.map((practice, idx) => (
                <div key={idx} className="p-5 border-2 border-gray-200 rounded-xl hover:border-green-300 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{practice.icon}</span>
                      <div>
                        <h3 className="font-bold text-gray-800">{getPracticeName(practice)}</h3>
                        <p className="text-sm text-gray-500">{practice.count} implementations</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600">{practice.impact}×</p>
                      <p className="text-xs text-gray-500">impact</p>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${(practice.impact / 2.5) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <span className="text-6xl mb-4 block">📊</span>
              <p>{getTranslation('noData')}</p>
            </div>
          )}
        </div>

        {/* Information Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* How It's Calculated */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">🔬</span>
              <h3 className="text-xl font-bold text-gray-800">{getTranslation('howCalculated')}</h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              {getTranslation('calculation')}
            </p>
          </div>

          {/* Improvement Tips */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">💡</span>
              <h3 className="text-xl font-bold text-gray-800">{getTranslation('improve')}</h3>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-green-600 mt-1">✓</span>
                <span className="text-gray-600">{getTranslation('tip1')}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 mt-1">✓</span>
                <span className="text-gray-600">{getTranslation('tip2')}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 mt-1">✓</span>
                <span className="text-gray-600">{getTranslation('tip3')}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 mt-1">✓</span>
                <span className="text-gray-600">{getTranslation('tip4')}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarbonCreditsPage;