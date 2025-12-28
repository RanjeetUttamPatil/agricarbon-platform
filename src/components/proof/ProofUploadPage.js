import { useState, useEffect } from 'react';
import { 
  getCurrentUser, 
  getFarmsByUser, 
  saveProof,
  getProofsByUser,
  savePractice,
  ecoPractices
} from '../../data/dataStore';

const ProofUploadPage = ({ onBack }) => {
  const [user, setUser] = useState(null);
  const [farms, setFarms] = useState([]);
  const [proofs, setProofs] = useState([]);
  const [step, setStep] = useState(1); // 1: Select Farm, 2: Select Practice, 3: Upload Proof
  const [selectedFarm, setSelectedFarm] = useState('');
  const [selectedPractice, setSelectedPractice] = useState('');
  const [description, setDescription] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [implementationDate, setImplementationDate] = useState('');
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

      const userProofs = getProofsByUser(currentUser.id);
      setProofs(userProofs);
    }
  }, [success]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setUploadedFiles([...uploadedFiles, ...files]);
    }
  };

  const removeFile = (index) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (!selectedFarm || !selectedPractice || uploadedFiles.length === 0) {
      return;
    }

    // Save practice declaration
    savePractice({
      farmId: selectedFarm,
      practiceId: selectedPractice,
      startDate: implementationDate || new Date().toISOString()
    });

    // Save proof
    uploadedFiles.forEach((file) => {
      saveProof({
        farmId: selectedFarm,
        practiceId: selectedPractice,
        type: 'photo',
        description: description || `${selectedPractice} implementation`,
        fileName: file.name,
        fileSize: file.size,
        implementationDate: implementationDate
      });
    });

    setSuccess(true);
    setStep(1);
    setSelectedPractice('');
    setDescription('');
    setUploadedFiles([]);
    setImplementationDate('');
    
    setTimeout(() => {
      setSuccess(false);
    }, 3000);
  };

  const getTranslation = (key) => {
    const lang = user?.language || 'hi';
    const translations = {
      en: {
        title: 'Submit Proof & Earn Credits',
        subtitle: 'Upload evidence of your implemented eco-practices',
        step1: 'Select Your Farm',
        step2: 'Which Practice Did You Implement?',
        step3: 'Upload Proof',
        selectFarm: 'Select Farm',
        selectPractice: 'Select Practice',
        implementationDate: 'When did you start?',
        uploadPhotos: 'Upload Geo-Tagged Photos',
        description: 'Additional Details (Optional)',
        descPlaceholder: 'Describe what you did...',
        submit: 'Submit Proof',
        success: 'Proof submitted successfully! ✓',
        myProofs: 'My Submitted Proofs',
        pending: 'Under Review',
        verified: 'Verified ✓',
        rejected: 'Need More Info',
        noProofs: 'No proofs submitted yet',
        next: 'Next',
        back: 'Back',
        addMore: 'Add More Photos',
        guidelines: 'Photo Guidelines',
        guideline1: '✓ Take clear, well-lit photos',
        guideline2: '✓ Show the entire practice area',
        guideline3: '✓ Include date/location if possible',
        guideline4: '✓ Multiple angles help verification',
        photoCount: 'photos selected',
        earnCredits: 'Earn Carbon Credits',
        whyProof: 'Why we need proof?',
        proofReason: 'Proofs help us verify your sustainable practices and calculate accurate carbon credits. Better documentation = faster verification!'
      },
      hi: {
        title: 'प्रमाण जमा करें और क्रेडिट अर्जित करें',
        subtitle: 'अपनी लागू की गई इको-प्रथाओं का प्रमाण अपलोड करें',
        step1: 'अपना खेत चुनें',
        step2: 'आपने कौन सी प्रथा लागू की?',
        step3: 'प्रमाण अपलोड करें',
        selectFarm: 'खेत चुनें',
        selectPractice: 'प्रथा चुनें',
        implementationDate: 'आपने कब शुरू किया?',
        uploadPhotos: 'जियो-टैग फोटो अपलोड करें',
        description: 'अतिरिक्त विवरण (वैकल्पिक)',
        descPlaceholder: 'बताएं कि आपने क्या किया...',
        submit: 'प्रमाण जमा करें',
        success: 'प्रमाण सफलतापूर्वक जमा किया गया! ✓',
        myProofs: 'मेरे जमा किए गए प्रमाण',
        pending: 'समीक्षाधीन',
        verified: 'सत्यापित ✓',
        rejected: 'अधिक जानकारी चाहिए',
        noProofs: 'अभी तक कोई प्रमाण जमा नहीं किया गया',
        next: 'आगे बढ़ें',
        back: 'पीछे',
        addMore: 'और फोटो जोड़ें',
        guidelines: 'फोटो दिशानिर्देश',
        guideline1: '✓ स्पष्ट, अच्छी रोशनी वाली फोटो लें',
        guideline2: '✓ पूरे प्रथा क्षेत्र को दिखाएं',
        guideline3: '✓ यदि संभव हो तो तारीख/स्थान शामिल करें',
        guideline4: '✓ कई कोणों से सत्यापन में मदद मिलती है',
        photoCount: 'फोटो चयनित',
        earnCredits: 'कार्बन क्रेडिट अर्जित करें',
        whyProof: 'हमें प्रमाण की आवश्यकता क्यों है?',
        proofReason: 'प्रमाण हमें आपकी टिकाऊ प्रथाओं को सत्यापित करने और सटीक कार्बन क्रेडिट की गणना करने में मदद करते हैं। बेहतर दस्तावेज़ीकरण = तेज़ सत्यापन!'
      },
      mr: {
        title: 'पुरावा सबमिट करा आणि क्रेडिट्स मिळवा',
        subtitle: 'तुमच्या अंमलात आणलेल्या इको-पद्धतींचा पुरावा अपलोड करा',
        step1: 'तुमचे शेत निवडा',
        step2: 'तुम्ही कोणती पद्धत अंमलात आणली?',
        step3: 'पुरावा अपलोड करा',
        selectFarm: 'शेत निवडा',
        selectPractice: 'पद्धत निवडा',
        implementationDate: 'तुम्ही केव्हा सुरुवात केली?',
        uploadPhotos: 'जिओ-टॅग केलेले फोटो अपलोड करा',
        description: 'अतिरिक्त तपशील (ऐच्छिक)',
        descPlaceholder: 'तुम्ही काय केले ते सांगा...',
        submit: 'पुरावा सबमिट करा',
        success: 'पुरावा यशस्वीरित्या सबमिट केला! ✓',
        myProofs: 'माझे सबमिट केलेले पुरावे',
        pending: 'पुनरावलोकनाधीन',
        verified: 'सत्यापित ✓',
        rejected: 'अधिक माहिती आवश्यक',
        noProofs: 'अद्याप कोणताही पुरावा सबमिट केलेला नाही',
        next: 'पुढे',
        back: 'मागे',
        addMore: 'अधिक फोटो जोडा',
        guidelines: 'फोटो मार्गदर्शक तत्त्वे',
        guideline1: '✓ स्पष्ट, चांगल्या प्रकाशातील फोटो घ्या',
        guideline2: '✓ संपूर्ण पद्धत क्षेत्र दाखवा',
        guideline3: '✓ शक्य असल्यास तारीख/स्थान समाविष्ट करा',
        guideline4: '✓ अनेक कोनातून सत्यापनात मदत होते',
        photoCount: 'फोटो निवडले',
        earnCredits: 'कार्बन क्रेडिट्स मिळवा',
        whyProof: 'आम्हाला पुराव्याची गरज का आहे?',
        proofReason: 'पुरावे आम्हाला तुमच्या शाश्वत पद्धतींचे सत्यापन करण्यात आणि अचूक कार्बन क्रेडिट्सची गणना करण्यात मदत करतात. चांगले दस्तऐवजीकरण = जलद सत्यापन!'
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

  const getStatusBadge = (status) => {
    const badges = {
      pending: { text: getTranslation('pending'), class: 'bg-yellow-100 text-yellow-700 border-yellow-300' },
      verified: { text: getTranslation('verified'), class: 'bg-green-100 text-green-700 border-green-300' },
      rejected: { text: getTranslation('rejected'), class: 'bg-red-100 text-red-700 border-red-300' }
    };
    return badges[status] || badges.pending;
  };

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
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900">{getTranslation('title')}</h1>
            <p className="text-sm text-gray-600">{getTranslation('subtitle')}</p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Success Message */}
        {success && (
          <div className="mb-6 p-6 bg-green-50 border-2 border-green-200 rounded-2xl flex items-center gap-4 animate-bounce">
            <span className="text-5xl">✅</span>
            <div>
              <h3 className="text-xl font-bold text-green-800">{getTranslation('success')}</h3>
              <p className="text-green-700">Our team will verify and update your credits soon</p>
            </div>
          </div>
        )}

        <div className="mb-8">
  {/* Progress bar */}
  <div className="relative flex items-center justify-between mb-4">
    {/* Background line */}
    <div className="absolute left-0 right-0 top-1/2 h-1 bg-gray-200 -translate-y-1/2" />

    {/* Active line */}
    <div
      className="absolute left-0 top-1/2 h-1 bg-green-600 -translate-y-1/2 transition-all"
      style={{ width: `${((step - 1) / 2) * 100}%` }}
    />

    {[1, 2, 3].map((s) => (
      <div
        key={s}
        className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center font-bold ${
          step >= s
            ? 'bg-green-600 text-white'
            : 'bg-gray-200 text-gray-500'
        }`}
      >
        {s}
      </div>
    ))}
  </div>

  {/* Labels */}
  <div className="flex justify-between text-sm">
    <span className={step >= 1 ? 'text-green-600 font-medium' : 'text-gray-500'}>
      {getTranslation('step1')}
    </span>
    <span className={step >= 2 ? 'text-green-600 font-medium' : 'text-gray-500'}>
      {getTranslation('step2')}
    </span>
    <span className={step >= 3 ? 'text-green-600 font-medium' : 'text-gray-500'}>
      {getTranslation('step3')}
    </span>
  </div>
</div>


        {/* Step 1: Select Farm */}
        {step === 1 && (
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{getTranslation('step1')}</h2>
            
            {farms.length > 0 ? (
              <div className="space-y-4 mb-8">
                {farms.map((farm, idx) => (
                  <button
                    key={farm.id}
                    onClick={() => setSelectedFarm(farm.id)}
                    className={`w-full p-6 border-2 rounded-2xl text-left transition ${
                      selectedFarm === farm.id
                        ? 'border-green-500 bg-green-50 shadow-lg'
                        : 'border-gray-200 hover:border-green-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center text-3xl">
                          🗺️
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">Farm {idx + 1}</h3>
                          <p className="text-gray-600">{farm.area} acres • {farm.cropType}</p>
                        </div>
                      </div>
                      {selectedFarm === farm.id && (
                        <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <span className="text-6xl block mb-4">🗺️</span>
                <p className="text-gray-600">No farms registered yet. Please add a farm first.</p>
              </div>
            )}

            <button
              onClick={() => setStep(2)}
              disabled={!selectedFarm}
              className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-bold text-lg hover:shadow-xl transition transform hover:scale-105 disabled:bg-gray-400 disabled:transform-none"
            >
              {getTranslation('next')} →
            </button>
          </div>
        )}

        {/* Step 2: Select Practice */}
        {step === 2 && (
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{getTranslation('step2')}</h2>
            
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {ecoPractices.map((practice) => (
                <button
                  key={practice.id}
                  onClick={() => setSelectedPractice(practice.id)}
                  className={`p-6 border-2 rounded-2xl text-left transition ${
                    selectedPractice === practice.id
                      ? 'border-green-500 bg-green-50 shadow-lg'
                      : 'border-gray-200 hover:border-green-300'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-white rounded-xl border-2 border-gray-200 flex items-center justify-center text-3xl flex-shrink-0">
                      {practice.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{getPracticeName(practice)}</h3>
                      <p className="text-sm text-gray-600">{practice.description}</p>
                      {selectedPractice === practice.id && (
                        <div className="mt-3 flex items-center gap-2 text-green-600">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-sm font-medium">Selected</span>
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Implementation Date */}
            {selectedPractice && (
              <div className="mb-8">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  {getTranslation('implementationDate')}
                </label>
                <input
                  type="date"
                  value={implementationDate}
                  onChange={(e) => setImplementationDate(e.target.value)}
                  max={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            )}

            <div className="flex gap-4">
              <button
                onClick={() => setStep(1)}
                className="flex-1 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-bold text-lg hover:bg-gray-50 transition"
              >
                ← {getTranslation('back')}
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={!selectedPractice}
                className="flex-1 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-bold text-lg hover:shadow-xl transition transform hover:scale-105 disabled:bg-gray-400 disabled:transform-none"
              >
                {getTranslation('next')} →
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Upload Proof */}
        {step === 3 && (
          <div>
            <div className="bg-white rounded-3xl shadow-xl p-8 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{getTranslation('step3')}</h2>
              
              {/* File Upload Area */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  📸 {getTranslation('uploadPhotos')}
                </label>
                <div className="border-3 border-dashed border-green-300 rounded-2xl p-8 text-center bg-gradient-to-br from-green-50 to-emerald-50 hover:border-green-500 transition">
                  <input
                    type="file"
                    accept="image/*"
                    capture="environment"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <div className="text-6xl mb-4">📷</div>
                    <div className="text-gray-700 font-semibold mb-2">
                      {uploadedFiles.length > 0 
                        ? `${uploadedFiles.length} ${getTranslation('photoCount')}`
                        : 'Click to upload photos'}
                    </div>
                    <div className="text-sm text-gray-600">
                      Photos will be automatically geo-tagged with location
                    </div>
                  </label>
                </div>
              </div>

              {/* Uploaded Files Preview */}
              {uploadedFiles.length > 0 && (
                <div className="mb-6">
                  <div className="grid grid-cols-3 gap-4">
                    {uploadedFiles.map((file, idx) => (
                      <div key={idx} className="relative group">
                        <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden border-2 border-gray-200">
                          <img
                            src={URL.createObjectURL(file)}
                            alt={`Preview ${idx + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <button
                          onClick={() => removeFile(idx)}
                          className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition flex items-center justify-center"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => document.getElementById('file-upload').click()}
                    className="mt-4 px-6 py-2 border-2 border-green-600 text-green-600 rounded-lg font-medium hover:bg-green-50 transition"
                  >
                    + {getTranslation('addMore')}
                  </button>
                </div>
              )}

              {/* Description */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  {getTranslation('description')}
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={getTranslation('descPlaceholder')}
                  rows="4"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-bold text-lg hover:bg-gray-50 transition"
                >
                  ← {getTranslation('back')}
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={uploadedFiles.length === 0}
                  className="flex-1 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-bold text-lg hover:shadow-xl transition transform hover:scale-105 disabled:bg-gray-400 disabled:transform-none flex items-center justify-center gap-2"
                >
                  <span>{getTranslation('submit')}</span>
                  <span>🚀</span>
                </button>
              </div>
            </div>

            {/* Guidelines Box */}
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-3xl shadow-xl p-8 border-2 border-blue-200">
              <div className="flex gap-4">
                <div className="text-5xl">💡</div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{getTranslation('guidelines')}</h3>
                  <ul className="space-y-2">
                    <li className="text-gray-700">{getTranslation('guideline1')}</li>
                    <li className="text-gray-700">{getTranslation('guideline2')}</li>
                    <li className="text-gray-700">{getTranslation('guideline3')}</li>
                    <li className="text-gray-700">{getTranslation('guideline4')}</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Why Proof Box */}
            <div className="mt-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-3xl shadow-xl p-8 border-2 border-purple-200">
              <div className="flex gap-4">
                <div className="text-5xl">🔍</div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{getTranslation('whyProof')}</h3>
                  <p className="text-gray-700">{getTranslation('proofReason')}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Submitted Proofs History */}
        {step === 1 && proofs.length > 0 && (
          <div className="mt-8 bg-white rounded-3xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{getTranslation('myProofs')}</h2>
            <div className="space-y-4">
              {proofs.slice(0, 5).map((proof) => {
                const badge = getStatusBadge(proof.status);
                const practice = ecoPractices.find(p => p.id === proof.practiceId);
                return (
                  <div key={proof.id} className="p-6 border-2 border-gray-200 rounded-2xl hover:shadow-lg transition">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-4">
                        <div className="text-4xl">{practice ? practice.icon : '📸'}</div>
                        <div>
                          <h3 className="font-bold text-gray-900">{proof.description}</h3>
                          <p className="text-sm text-gray-600">
                            {new Date(proof.timestamp).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <span className={`px-4 py-2 rounded-full text-sm font-bold border-2 ${badge.class}`}>
                        {badge.text}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProofUploadPage;