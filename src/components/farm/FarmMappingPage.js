import { useState, useEffect } from 'react';
import { saveFarm, getCurrentUser, updateUser, cropTypes } from './../../data/dataStore';

const FarmMappingPage = ({ onComplete, isFromDashboard = false }) => {
  const [step, setStep] = useState(1);
  const [farmData, setFarmData] = useState({
    area: '',
    cropType: '',
    location: { lat: 21.1458, lng: 79.0882 }, // Nagpur coordinates
    boundaries: []
  });
  const [mapPoints, setMapPoints] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);

  const currentUser = getCurrentUser();

  const handleInputChange = (field, value) => {
    setFarmData({ ...farmData, [field]: value });
  };

  const handleMapClick = (lat, lng) => {
    if (isDrawing && mapPoints.length < 10) {
      const newPoints = [...mapPoints, { lat, lng }];
      setMapPoints(newPoints);
      setFarmData({ ...farmData, boundaries: newPoints });
    }
  };

  const startDrawing = () => {
    setIsDrawing(true);
    setMapPoints([]);
  };

  const finishDrawing = () => {
    if (mapPoints.length >= 3) {
      setIsDrawing(false);
      setStep(3);
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setFarmData({ ...farmData, location });
        },
        (error) => {
          console.error('Error getting location:', error);
          // Use default Nagpur location
        }
      );
    }
  };

  const handleSaveFarm = () => {
    // Calculate approximate area based on boundaries
    const calculatedArea = farmData.area || Math.round(mapPoints.length * 0.5 * 10) / 10;
    
    const farmToSave = {
      ...farmData,
      area: parseFloat(calculatedArea)
    };
    
    saveFarm(farmToSave);
    
    // Mark user as fully onboarded
    updateUser(currentUser.id, { isOnboarded: true });
    
    onComplete();
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getTranslation = (key) => {
    const lang = currentUser?.language || 'hi';
    const translations = {
      en: {
        title: 'Farm Mapping',
        step1Title: 'Farm Details',
        step2Title: 'Mark Your Farm',
        step3Title: 'Confirm Details',
        landSize: 'Land Size (Acres)',
        cropType: 'Crop Type',
        selectCrop: 'Select crop',
        next: 'Next',
        previous: 'Previous',
        startDrawing: 'Start Drawing',
        finishDrawing: 'Finish Drawing',
        saveFarm: 'Save Farm',
        instructions: 'Click on the map to mark your farm boundaries',
        points: 'points marked',
        location: 'Farm Location'
      },
      hi: {
        title: 'खेत की मैपिंग',
        step1Title: 'खेत का विवरण',
        step2Title: 'अपना खेत चिह्नित करें',
        step3Title: 'विवरण की पुष्टि करें',
        landSize: 'भूमि का आकार (एकड़)',
        cropType: 'फसल का प्रकार',
        selectCrop: 'फसल चुनें',
        next: 'आगे बढ़ें',
        previous: 'पिछला',
        startDrawing: 'ड्रॉइंग शुरू करें',
        finishDrawing: 'ड्रॉइंग समाप्त करें',
        saveFarm: 'खेत सहेजें',
        instructions: 'अपने खेत की सीमाओं को चिह्नित करने के लिए मानचित्र पर क्लिक करें',
        points: 'बिंदु चिह्नित',
        location: 'खेत का स्थान'
      },
      mr: {
        title: 'शेत मॅपिंग',
        step1Title: 'शेत तपशील',
        step2Title: 'तुमचे शेत चिन्हांकित करा',
        step3Title: 'तपशील पुष्टी करा',
        landSize: 'जमीन आकार (एकर)',
        cropType: 'पीक प्रकार',
        selectCrop: 'पीक निवडा',
        next: 'पुढे जा',
        previous: 'मागील',
        startDrawing: 'रेखांकन सुरू करा',
        finishDrawing: 'रेखांकन समाप्त करा',
        saveFarm: 'शेत जतन करा',
        instructions: 'तुमच्या शेताच्या सीमा चिन्हांकित करण्यासाठी नकाशावर क्लिक करा',
        points: 'बिंदू चिन्हांकित',
        location: 'शेत स्थान'
      }
    };
    return translations[lang][key];
  };

  const getCropName = (crop) => {
    const lang = currentUser?.language || 'hi';
    if (lang === 'hi') return crop.nameHi;
    if (lang === 'mr') return crop.nameMr;
    return crop.name;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4">
      <div className="max-w-4xl mx-auto py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block bg-white rounded-full p-4 shadow-lg mb-4">
            <span className="text-5xl">🗺️</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {getTranslation('title')}
          </h1>
          <div className="flex justify-center items-center gap-2">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-2 w-16 rounded-full ${
                  s <= step ? 'bg-green-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                {getTranslation('step1Title')}
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {getTranslation('landSize')}
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={farmData.area}
                    onChange={(e) => handleInputChange('area', e.target.value)}
                    placeholder="5.5"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {getTranslation('cropType')}
                  </label>
                  <select
                    value={farmData.cropType}
                    onChange={(e) => handleInputChange('cropType', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">{getTranslation('selectCrop')}</option>
                    {cropTypes.map((crop) => (
                      <option key={crop.id} value={crop.id}>
                        {getCropName(crop)}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={() => setStep(2)}
                  disabled={!farmData.area || !farmData.cropType}
                  className="w-full px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition duration-200 shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {getTranslation('next')}
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                {getTranslation('step2Title')}
              </h2>

              {/* Simple Map Visualization */}
              <div className="mb-6">
                <div 
                  className="w-full h-96 bg-gradient-to-br from-green-100 to-green-200 rounded-lg relative border-2 border-green-300 overflow-hidden cursor-crosshair"
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const lat = farmData.location.lat + (0.01 * (y - rect.height / 2) / rect.height);
                    const lng = farmData.location.lng + (0.01 * (x - rect.width / 2) / rect.width);
                    handleMapClick(lat, lng);
                  }}
                >
                  {/* Grid lines */}
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div key={`h${i}`} className="absolute w-full h-px bg-green-300 opacity-20" style={{ top: `${i * 10}%` }} />
                  ))}
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div key={`v${i}`} className="absolute h-full w-px bg-green-300 opacity-20" style={{ left: `${i * 10}%` }} />
                  ))}
                  
                  {/* Center marker */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-lg" />
                  </div>

                  {/* Plot points */}
                  {mapPoints.map((point, idx) => (
                    <div key={idx}>
                      <div 
                        className="absolute w-3 h-3 bg-blue-600 rounded-full border-2 border-white shadow-lg"
                        style={{
                          left: `${50 + (point.lng - farmData.location.lng) * 5000}%`,
                          top: `${50 - (point.lat - farmData.location.lat) * 5000}%`,
                          transform: 'translate(-50%, -50%)'
                        }}
                      />
                      {idx > 0 && (
                        <svg className="absolute inset-0 pointer-events-none" style={{ width: '100%', height: '100%' }}>
                          <line
                            x1={`${50 + (mapPoints[idx-1].lng - farmData.location.lng) * 5000}%`}
                            y1={`${50 - (mapPoints[idx-1].lat - farmData.location.lat) * 5000}%`}
                            x2={`${50 + (point.lng - farmData.location.lng) * 5000}%`}
                            y2={`${50 - (point.lat - farmData.location.lat) * 5000}%`}
                            stroke="#2563eb"
                            strokeWidth="2"
                          />
                        </svg>
                      )}
                    </div>
                  ))}
                  
                  {!isDrawing && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-10">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          startDrawing();
                        }}
                        className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-lg"
                      >
                        {getTranslation('startDrawing')}
                      </button>
                    </div>
                  )}
                </div>

                {isDrawing && (
                  <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-blue-800 font-medium">
                      {getTranslation('instructions')}
                    </p>
                    <p className="text-blue-600 mt-2">
                      {mapPoints.length} {getTranslation('points')}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition duration-200"
                >
                  {getTranslation('previous')}
                </button>
                {isDrawing && mapPoints.length >= 3 && (
                  <button
                    onClick={finishDrawing}
                    className="flex-1 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition duration-200 shadow-md"
                  >
                    {getTranslation('finishDrawing')}
                  </button>
                )}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                {getTranslation('step3Title')}
              </h2>

              <div className="space-y-4 mb-8">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">{getTranslation('landSize')}</span>
                    <span className="text-green-800 font-bold">{farmData.area} acres</span>
                  </div>
                </div>

                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">{getTranslation('cropType')}</span>
                    <span className="text-green-800 font-bold">
                      {getCropName(cropTypes.find(c => c.id === farmData.cropType))}
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">{getTranslation('location')}</span>
                    <span className="text-green-800 font-mono text-sm">
                      {farmData.location.lat.toFixed(4)}, {farmData.location.lng.toFixed(4)}
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">Boundary Points</span>
                    <span className="text-green-800 font-bold">{mapPoints.length} points</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition duration-200"
                >
                  {getTranslation('previous')}
                </button>
                <button
                  onClick={handleSaveFarm}
                  className="flex-1 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition duration-200 shadow-md"
                >
                  {getTranslation('saveFarm')}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FarmMappingPage;