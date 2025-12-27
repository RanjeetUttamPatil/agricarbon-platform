import { useState, useEffect } from 'react';
import { 
  getCurrentUser, 
  getFarmsByUser, 
  saveProof,
  getProofsByUser
} from './../../data/dataStore';

const ProofUploadPage = ({ onBack }) => {
  const [user, setUser] = useState(null);
  const [farms, setFarms] = useState([]);
  const [proofs, setProofs] = useState([]);
  const [selectedFarm, setSelectedFarm] = useState('');
  const [proofType, setProofType] = useState('photo');
  const [description, setDescription] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);
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
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleSubmit = () => {
    if (!selectedFarm || !description || (proofType === 'photo' && !uploadedFile)) {
      return;
    }

    saveProof({
      farmId: selectedFarm,
      type: proofType,
      description: description,
      fileName: uploadedFile?.name || 'satellite_data.jpg',
      fileSize: uploadedFile?.size || 0
    });

    setSuccess(true);
    setDescription('');
    setUploadedFile(null);
    
    setTimeout(() => {
      setSuccess(false);
    }, 2000);
  };

  const getTranslation = (key) => {
    const lang = user?.language || 'hi';
    const translations = {
      en: {
        title: 'Upload Proof',
        subtitle: 'Submit evidence of your sustainable farming practices',
        selectFarm: 'Select Farm',
        proofType: 'Proof Type',
        geoTaggedPhoto: 'Geo-tagged Photo',
        satelliteData: 'Satellite Data',
        activityLog: 'Activity Log',
        description: 'Description',
        descPlaceholder: 'Describe your eco-practice (e.g., Organic compost preparation)',
        uploadPhoto: 'Upload Photo',
        chooseFile: 'Choose File',
        submit: 'Submit Proof',
        success: 'Proof uploaded successfully!',
        myProofs: 'My Submitted Proofs',
        pending: 'Pending',
        verified: 'Verified',
        rejected: 'Rejected',
        noProofs: 'No proofs submitted yet'
      },
      hi: {
        title: 'प्रमाण अपलोड करें',
        subtitle: 'अपनी टिकाऊ कृषि प्रथाओं का प्रमाण जमा करें',
        selectFarm: 'खेत चुनें',
        proofType: 'प्रमाण का प्रकार',
        geoTaggedPhoto: 'जियो-टैग्ड फोटो',
        satelliteData: 'सैटेलाइट डेटा',
        activityLog: 'गतिविधि लॉग',
        description: 'विवरण',
        descPlaceholder: 'अपनी इको-प्रैक्टिस का वर्णन करें (जैसे, जैविक खाद तैयारी)',
        uploadPhoto: 'फोटो अपलोड करें',
        chooseFile: 'फाइल चुनें',
        submit: 'प्रमाण जमा करें',
        success: 'प्रमाण सफलतापूर्वक अपलोड किया गया!',
        myProofs: 'मेरे जमा किए गए प्रमाण',
        pending: 'लंबित',
        verified: 'सत्यापित',
        rejected: 'अस्वीकृत',
        noProofs: 'अभी तक कोई प्रमाण जमा नहीं किया गया'
      },
      mr: {
        title: 'पुरावा अपलोड करा',
        subtitle: 'तुमच्या शाश्वत शेती पद्धतींचा पुरावा सबमिट करा',
        selectFarm: 'शेत निवडा',
        proofType: 'पुराव्याचा प्रकार',
        geoTaggedPhoto: 'जिओ-टॅग्ड फोटो',
        satelliteData: 'सॅटेलाइट डेटा',
        activityLog: 'क्रियाकलाप लॉग',
        description: 'वर्णन',
        descPlaceholder: 'तुमच्या इको-प्रॅक्टिसचे वर्णन करा (उदा., सेंद्रिय खत तयारी)',
        uploadPhoto: 'फोटो अपलोड करा',
        chooseFile: 'फाइल निवडा',
        submit: 'पुरावा सबमिट करा',
        success: 'पुरावा यशस्वीरित्या अपलोड केला!',
        myProofs: 'माझे सबमिट केलेले पुरावे',
        pending: 'प्रलंबित',
        verified: 'सत्यापित',
        rejected: 'नाकारले',
        noProofs: 'अद्याप कोणताही पुरावा सबमिट केलेला नाही'
      }
    };
    return translations[lang][key];
  };

  const getStatusBadge = (status) => {
    const badges = {
      pending: { text: getTranslation('pending'), class: 'bg-yellow-100 text-yellow-700' },
      verified: { text: getTranslation('verified'), class: 'bg-green-100 text-green-700' },
      rejected: { text: getTranslation('rejected'), class: 'bg-red-100 text-red-700' }
    };
    return badges[status] || badges.pending;
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
            <span className="text-3xl">📸</span>
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

        {/* Upload Form */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="space-y-6">
            {/* Farm Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {getTranslation('selectFarm')}
              </label>
              <select
                value={selectedFarm}
                onChange={(e) => setSelectedFarm(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                {farms.map((farm, idx) => (
                  <option key={farm.id} value={farm.id}>
                    Farm {idx + 1} - {farm.area} acres
                  </option>
                ))}
              </select>
            </div>

            {/* Proof Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                {getTranslation('proofType')}
              </label>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { id: 'photo', icon: '📸', label: getTranslation('geoTaggedPhoto') },
                  { id: 'satellite', icon: '🛰️', label: getTranslation('satelliteData') },
                  { id: 'log', icon: '📆', label: getTranslation('activityLog') }
                ].map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setProofType(type.id)}
                    className={`p-4 border-2 rounded-xl transition-all ${
                      proofType === type.id
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 hover:border-green-300'
                    }`}
                  >
                    <div className="text-3xl mb-2">{type.icon}</div>
                    <div className="text-sm font-medium text-gray-700">{type.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {getTranslation('description')}
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={getTranslation('descPlaceholder')}
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* File Upload */}
            {proofType === 'photo' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {getTranslation('uploadPhoto')}
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-green-500 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    capture="environment"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <div className="text-5xl mb-3">📷</div>
                    <div className="text-gray-600 mb-2">
                      {uploadedFile ? uploadedFile.name : getTranslation('chooseFile')}
                    </div>
                    <div className="text-sm text-gray-500">
                      Photos will be automatically geo-tagged
                    </div>
                  </label>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={!selectedFarm || !description || (proofType === 'photo' && !uploadedFile)}
              className="w-full px-6 py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition duration-200 shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {getTranslation('submit')}
            </button>
          </div>
        </div>

        {/* Submitted Proofs */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            {getTranslation('myProofs')}
          </h2>

          {proofs.length > 0 ? (
            <div className="space-y-4">
              {proofs.map((proof) => {
                const badge = getStatusBadge(proof.status);
                return (
                  <div key={proof.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="text-3xl">
                          {proof.type === 'photo' ? '📸' : proof.type === 'satellite' ? '🛰️' : '📆'}
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-800">{proof.description}</h3>
                          <p className="text-sm text-gray-500">
                            {new Date(proof.timestamp).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${badge.class}`}>
                        {badge.text}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <span className="text-5xl mb-4 block">📋</span>
              <p>{getTranslation('noProofs')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProofUploadPage;