import { useState } from 'react';
import { saveUser, getCurrentUser, updateUser } from './../../data/dataStore';

const OnboardingPage = ({ userData, onComplete }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    language: 'hi',
    village: '',
    district: '',
    state: 'Maharashtra'
  });

  const languages = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
    { code: 'mr', name: 'Marathi', nativeName: 'मराठी' }
  ];

  const handleLanguageSelect = (langCode) => {
    setFormData({ ...formData, language: langCode });
    setStep(2);
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleComplete = () => {
    // Save user data
    const newUser = saveUser({
      ...userData,
      ...formData,
      isOnboarded: false // Will be set to true after farm mapping
    });
    
    onComplete(newUser);
  };

  const getTranslation = (key) => {
    const translations = {
      en: {
        welcome: 'Welcome to AgriCarbon',
        selectLanguage: 'Select Your Language',
        personalInfo: 'Personal Information',
        fullName: 'Full Name',
        namePlaceholder: 'Enter your name',
        village: 'Village',
        villagePlaceholder: 'Enter village name',
        district: 'District',
        districtPlaceholder: 'Enter district',
        state: 'State',
        next: 'Next',
        complete: 'Complete Onboarding',
        step: 'Step'
      },
      hi: {
        welcome: 'AgriCarbon में आपका स्वागत है',
        selectLanguage: 'अपनी भाषा चुनें',
        personalInfo: 'व्यक्तिगत जानकारी',
        fullName: 'पूरा नाम',
        namePlaceholder: 'अपना नाम दर्ज करें',
        village: 'गाँव',
        villagePlaceholder: 'गाँव का नाम दर्ज करें',
        district: 'जिला',
        districtPlaceholder: 'जिला दर्ज करें',
        state: 'राज्य',
        next: 'आगे बढ़ें',
        complete: 'ऑनबोर्डिंग पूरी करें',
        step: 'चरण'
      },
      mr: {
        welcome: 'AgriCarbon मध्ये आपले स्वागत आहे',
        selectLanguage: 'तुमची भाषा निवडा',
        personalInfo: 'वैयक्तिक माहिती',
        fullName: 'पूर्ण नाव',
        namePlaceholder: 'तुमचे नाव प्रविष्ट करा',
        village: 'गाव',
        villagePlaceholder: 'गावाचे नाव प्रविष्ट करा',
        district: 'जिल्हा',
        districtPlaceholder: 'जिल्हा प्रविष्ट करा',
        state: 'राज्य',
        next: 'पुढे जा',
        complete: 'ऑनबोर्डिंग पूर्ण करा',
        step: 'पायरी'
      }
    };
    return translations[formData.language][key];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">
              {getTranslation('step')} {step} / 2
            </span>
            <span className="text-sm text-gray-600">{step === 1 ? '50%' : '100%'}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 2) * 100}%` }}
            />
          </div>
        </div>

        {/* Onboarding Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {step === 1 ? (
            <div>
              <div className="text-center mb-8">
                <div className="inline-block bg-green-100 rounded-full p-4 mb-4">
                  <span className="text-5xl">🌾</span>
                </div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  Welcome to AgriCarbon
                </h1>
                <p className="text-gray-600">
                  Select Your Language / अपनी भाषा चुनें / तुमची भाषा निवडा
                </p>
              </div>

              <div className="grid gap-4">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageSelect(lang.code)}
                    className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-xl hover:border-green-500 hover:bg-green-50 transition duration-200"
                  >
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                        <span className="text-2xl">
                          {lang.code === 'en' ? '🇬🇧' : lang.code === 'hi' ? '🇮🇳' : '🇮🇳'}
                        </span>
                      </div>
                      <div className="text-left">
                        <div className="font-semibold text-gray-800">{lang.name}</div>
                        <div className="text-gray-600">{lang.nativeName}</div>
                      </div>
                    </div>
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <div className="text-center mb-8">
                <div className="inline-block bg-green-100 rounded-full p-4 mb-4">
                  <span className="text-5xl">👨‍🌾</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {getTranslation('personalInfo')}
                </h2>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {getTranslation('fullName')}
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder={getTranslation('namePlaceholder')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {getTranslation('village')}
                  </label>
                  <input
                    type="text"
                    value={formData.village}
                    onChange={(e) => handleInputChange('village', e.target.value)}
                    placeholder={getTranslation('villagePlaceholder')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {getTranslation('district')}
                    </label>
                    <input
                      type="text"
                      value={formData.district}
                      onChange={(e) => handleInputChange('district', e.target.value)}
                      placeholder={getTranslation('districtPlaceholder')}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {getTranslation('state')}
                    </label>
                    <select
                      value={formData.state}
                      onChange={(e) => handleInputChange('state', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option>Maharashtra</option>
                      <option>Punjab</option>
                      <option>Haryana</option>
                      <option>Uttar Pradesh</option>
                      <option>Madhya Pradesh</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition duration-200"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={handleComplete}
                    disabled={!formData.name || !formData.village}
                    className="flex-1 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition duration-200 shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    {getTranslation('complete')}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;