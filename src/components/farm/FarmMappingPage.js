import { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Polygon, useMapEvents, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { saveFarm, getCurrentUser, updateUser, cropTypes } from '../../data/dataStore';

// Fix Leaflet default icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom marker icon for boundary points
const boundaryIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" fill="#10b981" stroke="white" stroke-width="2"/>
      <circle cx="12" cy="12" r="4" fill="white"/>
    </svg>
  `),
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

// Map click handler component
const MapClickHandler = ({ isDrawing, onMapClick }) => {
  useMapEvents({
    click: (e) => {
      if (isDrawing) {
        onMapClick(e.latlng);
      }
    },
  });
  return null;
};

// Component to recenter map
const RecenterMap = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center, map.getZoom());
    }
  }, [center, map]);
  return null;
};

const FarmMappingPage = ({ onComplete, isFromDashboard = false }) => {
  const [user, setUser] = useState(null);
  const [language, setLanguage] = useState('hi');
  const [step, setStep] = useState(1); // 1: Farm details, 2: Map drawing, 3: Summary
  const [farmData, setFarmData] = useState({
    area: '',
    cropType: '',
    village: '',
    district: ''
  });

  // Map states
  const [mapCenter, setMapCenter] = useState([21.1458, 79.0882]); // Nagpur default
  const [mapPoints, setMapPoints] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [showSatellite, setShowSatellite] = useState(true);
  const [calculatedArea, setCalculatedArea] = useState(0);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
    setLanguage(currentUser?.language || 'hi');

    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setMapCenter([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  }, []);

  const getTranslation = (key) => {
    const translations = {
      en: {
        title: 'Map Your Farm',
        subtitle: 'Tap on the map to mark your farm boundary',
        farmDetails: 'Farm Details',
        landSize: 'Land Size (Acres)',
        cropType: 'Crop Type',
        village: 'Village',
        district: 'District',
        selectCrop: 'Select crop type',
        startMapping: 'Start Mapping',
        howToMap: 'How to Map',
        step1: '1. Tap around your farm boundary',
        step2: '2. Mark all corners',
        step3: '3. Tap "Complete Mapping"',
        drawBoundary: 'Draw Boundary',
        reset: 'Reset',
        completeMapping: 'Complete Mapping',
        autoMap: 'Auto Map (Demo)',
        satellite: 'Satellite',
        street: 'Street',
        farmSummary: 'Farm Summary',
        area: 'Area',
        acres: 'acres',
        location: 'Location',
        boundary: 'Boundary',
        mapped: 'Mapped Successfully',
        saveFarm: 'Save Farm',
        editMap: 'Edit Map',
        continueToProof: 'Continue to Proof Upload',
        goToDashboard: 'Go to Dashboard',
        confirmTitle: 'Confirm Farm Boundary',
        confirmMessage: 'Is this farm boundary correct?',
        yes: 'Yes, Save',
        no: 'No, Edit',
        errorMinPoints: 'Please mark at least 3 points',
        errorArea: 'Area seems too small. Please check boundary',
        pointsMarked: 'points marked',
        tapToStart: 'Tap "Draw Boundary" to start marking your farm'
      },
      hi: {
        title: 'अपने खेत का नक्शा बनाएं',
        subtitle: 'अपने खेत की सीमा को चिह्नित करने के लिए मानचित्र पर टैप करें',
        farmDetails: 'खेत का विवरण',
        landSize: 'भूमि का आकार (एकड़)',
        cropType: 'फसल का प्रकार',
        village: 'गाँव',
        district: 'जिला',
        selectCrop: 'फसल का प्रकार चुनें',
        startMapping: 'मैपिंग शुरू करें',
        howToMap: 'मैपिंग कैसे करें',
        step1: '1. अपने खेत की सीमा के चारों ओर टैप करें',
        step2: '2. सभी कोनों को चिह्नित करें',
        step3: '3. "मैपिंग पूर्ण करें" पर टैप करें',
        drawBoundary: 'सीमा खींचें',
        reset: 'रीसेट',
        completeMapping: 'मैपिंग पूर्ण करें',
        autoMap: 'ऑटो मैप (डेमो)',
        satellite: 'सैटेलाइट',
        street: 'स्ट्रीट',
        farmSummary: 'खेत का सारांश',
        area: 'क्षेत्रफल',
        acres: 'एकड़',
        location: 'स्थान',
        boundary: 'सीमा',
        mapped: 'सफलतापूर्वक मैप किया गया',
        saveFarm: 'खेत सहेजें',
        editMap: 'मानचित्र संपादित करें',
        continueToProof: 'प्रमाण अपलोड पर जारी रखें',
        goToDashboard: 'डैशबोर्ड पर जाएं',
        confirmTitle: 'खेत की सीमा की पुष्टि करें',
        confirmMessage: 'क्या यह खेत की सीमा सही है?',
        yes: 'हाँ, सहेजें',
        no: 'नहीं, संपादित करें',
        errorMinPoints: 'कृपया कम से कम 3 बिंदु चिह्नित करें',
        errorArea: 'क्षेत्र बहुत छोटा लगता है। कृपया सीमा जांचें',
        pointsMarked: 'बिंदु चिह्नित',
        tapToStart: 'अपने खेत को चिह्नित करना शुरू करने के लिए "सीमा खींचें" पर टैप करें'
      },
      mr: {
        title: 'तुमच्या शेताचा नकाशा तयार करा',
        subtitle: 'तुमच्या शेताची सीमा चिन्हांकित करण्यासाठी नकाशावर टॅप करा',
        farmDetails: 'शेत तपशील',
        landSize: 'जमीन आकार (एकर)',
        cropType: 'पीक प्रकार',
        village: 'गाव',
        district: 'जिल्हा',
        selectCrop: 'पीक प्रकार निवडा',
        startMapping: 'मॅपिंग सुरू करा',
        howToMap: 'मॅपिंग कसे करावे',
        step1: '1. तुमच्या शेताच्या सीमेभोवती टॅप करा',
        step2: '2. सर्व कोपरे चिन्हांकित करा',
        step3: '3. "मॅपिंग पूर्ण करा" वर टॅप करा',
        drawBoundary: 'सीमा काढा',
        reset: 'रीसेट',
        completeMapping: 'मॅपिंग पूर्ण करा',
        autoMap: 'ऑटो मॅप (डेमो)',
        satellite: 'सॅटेलाइट',
        street: 'रस्ता',
        farmSummary: 'शेत सारांश',
        area: 'क्षेत्रफळ',
        acres: 'एकर',
        location: 'स्थान',
        boundary: 'सीमा',
        mapped: 'यशस्वीरित्या मॅप केले',
        saveFarm: 'शेत जतन करा',
        editMap: 'नकाशा संपादित करा',
        continueToProof: 'पुरावा अपलोड वर सुरू ठेवा',
        goToDashboard: 'डॅशबोर्डवर जा',
        confirmTitle: 'शेताच्या सीमेची पुष्टी करा',
        confirmMessage: 'ही शेताची सीमा बरोबर आहे का?',
        yes: 'होय, जतन करा',
        no: 'नाही, संपादित करा',
        errorMinPoints: 'कृपया किमान 3 बिंदू चिन्हांकित करा',
        errorArea: 'क्षेत्र खूप लहान दिसते. कृपया सीमा तपासा',
        pointsMarked: 'बिंदू चिन्हांकित',
        tapToStart: 'तुमचे शेत चिन्हांकित करण्यासाठी "सीमा काढा" वर टॅप करा'
      }
    };
    return translations[language][key];
  };

  const getCropName = (crop) => {
    if (language === 'hi') return crop.nameHi;
    if (language === 'mr') return crop.nameMr;
    return crop.name;
  };

  const handleMapClick = (latlng) => {
    if (isDrawing) {
      setMapPoints([...mapPoints, latlng]);
      setError('');
    }
  };

  const handleReset = () => {
    setMapPoints([]);
    setCalculatedArea(0);
    setError('');
  };

  const handleAutoMap = () => {
    // Demo: Create a sample square boundary around current center
    const offset = 0.002; // ~200 meters
    const demoPoints = [
      { lat: mapCenter[0] + offset, lng: mapCenter[1] - offset },
      { lat: mapCenter[0] + offset, lng: mapCenter[1] + offset },
      { lat: mapCenter[0] - offset, lng: mapCenter[1] + offset },
      { lat: mapCenter[0] - offset, lng: mapCenter[1] - offset },
    ];
    setMapPoints(demoPoints);
    setIsDrawing(false);
  };

  // Calculate area using Shoelace formula
  const calculateArea = (points) => {
    if (points.length < 3) return 0;

    let area = 0;
    for (let i = 0; i < points.length; i++) {
      const j = (i + 1) % points.length;
      area += points[i].lat * points[j].lng;
      area -= points[j].lat * points[i].lng;
    }
    area = Math.abs(area) / 2;

    // Convert to acres (very rough approximation)
    const areaInAcres = area * 24710.5; // 1 sq degree ≈ 24710.5 acres
    return Math.round(areaInAcres * 10) / 10;
  };

  const handleCompleteMapping = () => {
    if (mapPoints.length < 3) {
      setError(getTranslation('errorMinPoints'));
      return;
    }

    const area = calculateArea(mapPoints);
    if (area < 0.1) {
      setError(getTranslation('errorArea'));
      return;
    }

    setCalculatedArea(area);
    setIsDrawing(false);
    setStep(3);
  };

  const handleSaveFarm = () => {
    setShowConfirmModal(true);
  };

  const confirmSave = () => {
    const farmToSave = {
      ...farmData,
      area: calculatedArea || parseFloat(farmData.area),
      location: { lat: mapCenter[0], lng: mapCenter[1] },
      boundaries: mapPoints.map(p => ({ lat: p.lat, lng: p.lng }))
    };

    saveFarm(farmToSave);

    if (user && !user.isOnboarded) {
      updateUser(user.id, { isOnboarded: true });
    }

    setShowConfirmModal(false);
    onComplete();
  };

  if (!user) return null;

  // Step 1: Farm Details
  if (step === 1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900">{getTranslation('farmDetails')}</h1>
              <div className="flex gap-2">
                {['en', 'hi', 'mr'].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition ${language === lang ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'
                      }`}
                  >
                    {lang.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {getTranslation('landSize')}
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={farmData.area}
                    onChange={(e) => setFarmData({ ...farmData, area: e.target.value })}
                    placeholder="5.5"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {getTranslation('cropType')}
                  </label>
                  <select
                    value={farmData.cropType}
                    onChange={(e) => setFarmData({ ...farmData, cropType: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">{getTranslation('selectCrop')}</option>
                    {cropTypes.map((crop) => (
                      <option key={crop.id} value={crop.id}>
                        {getCropName(crop)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {getTranslation('village')}
                  </label>
                  <input
                    type="text"
                    value={farmData.village}
                    onChange={(e) => setFarmData({ ...farmData, village: e.target.value })}
                    placeholder="Village name"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {getTranslation('district')}
                  </label>
                  <input
                    type="text"
                    value={farmData.district}
                    onChange={(e) => setFarmData({ ...farmData, district: e.target.value })}
                    placeholder="District name"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>

              <button
                onClick={() => setStep(2)}
                disabled={!farmData.cropType}
                className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-bold text-lg hover:shadow-xl transition transform hover:scale-105 disabled:bg-gray-400 disabled:transform-none"
              >
                {getTranslation('startMapping')} 🗺️
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Step 2 & 3: Map Drawing and Summary
  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-md border-b border-gray-200 z-10">
        <div className="px-4 py-3">
          <div className="relative flex items-center mb-2">
            <div className="absolute left-1/2 transform -translate-x-1/2 text-center">
              <h1 className="text-xl font-bold text-gray-900">
                {getTranslation('title')}
              </h1>
              <p className="text-sm text-gray-600">
                {getTranslation('subtitle')}
              </p>
            </div>

            <div className="ml-auto flex gap-2">
              {['en', 'hi', 'mr'].map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition ${language === lang ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'
                    }`}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Map Type Toggle */}
          <div className="flex mt-4 gap-2">
            <button
              onClick={() => setShowSatellite(true)}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition ${showSatellite ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'
                }`}
            >
              🛰️ {getTranslation('satellite')}
            </button>
            <button
              onClick={() => setShowSatellite(false)}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition ${!showSatellite ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'
                }`}
            >
              🗺️ {getTranslation('street')}
            </button>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="flex-1 relative">
        <MapContainer
          center={mapCenter}
          zoom={16}
          style={{ height: '100%', width: '100%' }}
          zoomControl={false}
        >
          <TileLayer
            url={showSatellite
              ? "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            }
            attribution={showSatellite
              ? '&copy; Esri'
              : '&copy; OpenStreetMap contributors'
            }
          />

          <RecenterMap center={mapCenter} />
          <MapClickHandler isDrawing={isDrawing} onMapClick={handleMapClick} />

          {/* Markers for boundary points */}
          {mapPoints.map((point, idx) => (
            <Marker key={idx} position={[point.lat, point.lng]} icon={boundaryIcon} />
          ))}

          {/* Polygon for completed boundary */}
          {mapPoints.length >= 3 && (
            <Polygon
              positions={mapPoints.map(p => [p.lat, p.lng])}
              pathOptions={{
                color: '#10b981',
                fillColor: '#10b981',
                fillOpacity: 0.3,
                weight: 3
              }}
            />
          )}
        </MapContainer>

        {/* Guidance Overlay */}
        {step === 2 && (
          <div className="absolute top-4 left-4 bg-white rounded-2xl shadow-2xl p-4 max-w-xs z-[1000]">
            <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span className="text-xl">🧭</span>
              {getTranslation('howToMap')}
            </h3>
            <div className="space-y-2 text-sm text-gray-700">
              <div className="flex items-start gap-2">
                <span>👆</span>
                <span>{getTranslation('step1')}</span>
              </div>
              <div className="flex items-start gap-2">
                <span>📍</span>
                <span>{getTranslation('step2')}</span>
              </div>
              <div className="flex items-start gap-2">
                <span>✔️</span>
                <span>{getTranslation('step3')}</span>
              </div>
            </div>
            {mapPoints.length > 0 && (
              <div className="mt-3 p-2 bg-green-50 rounded-lg text-center">
                <span className="font-bold text-green-700">{mapPoints.length}</span>
                <span className="text-sm text-green-600 ml-1">{getTranslation('pointsMarked')}</span>
              </div>
            )}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="absolute top-4 right-4 bg-red-50 border-2 border-red-500 rounded-xl p-4 max-w-sm z-[1000]">
            <p className="text-red-800 font-medium">{error}</p>
          </div>
        )}

        {/* Farm Summary Card */}
        {step === 3 && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white rounded-3xl shadow-2xl p-6 w-96 z-[1000]">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span>📐</span>
              {getTranslation('farmSummary')}
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-xl">
                <span className="text-gray-700 font-medium">📏 {getTranslation('area')}</span>
                <span className="text-2xl font-bold text-green-700">{calculatedArea} {getTranslation('acres')}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-xl">
                <span className="text-gray-700 font-medium">📍 {getTranslation('location')}</span>
                <span className="text-blue-700 font-semibold">{farmData.village}, {farmData.district}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-purple-50 rounded-xl">
                <span className="text-gray-700 font-medium">🗺️ {getTranslation('boundary')}</span>
                <span className="text-purple-700 font-semibold">{getTranslation('mapped')}</span>
              </div>
            </div>
            <div className="mt-6 space-y-3">
              <button
                onClick={handleSaveFarm}
                className="w-full py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-bold hover:shadow-xl transition transform hover:scale-105"
              >
                💾 {getTranslation('saveFarm')}
              </button>
              <button
                onClick={() => setStep(2)}
                className="w-full py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition"
              >
                ✏️ {getTranslation('editMap')}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Action Button Panel */}
      {step === 2 && (
        <div className="bg-white border-t border-gray-200 p-4 shadow-lg">
          <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3">
            <button
              onClick={() => setIsDrawing(!isDrawing)}
              className={`py-3 px-4 rounded-xl font-bold transition transform hover:scale-105 ${isDrawing
                ? 'bg-green-600 text-white shadow-lg'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
            >
              ✏️ {getTranslation('drawBoundary')}
            </button>

            <button
              onClick={handleReset}
              className="py-3 px-4 bg-red-100 text-red-700 rounded-xl font-bold hover:bg-red-200 transition transform hover:scale-105"
            >
              🔄 {getTranslation('reset')}
            </button>

            <button
              onClick={handleCompleteMapping}
              disabled={mapPoints.length < 3}
              className="py-3 px-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition transform hover:scale-105 disabled:bg-gray-400 disabled:transform-none"
            >
              ✅ {getTranslation('completeMapping')}
            </button>

            <button
              onClick={handleAutoMap}
              className="py-3 px-4 bg-purple-100 text-purple-700 rounded-xl font-bold hover:bg-purple-200 transition transform hover:scale-105"
            >
              📍 {getTranslation('autoMap')}
            </button>
          </div>

          {!isDrawing && mapPoints.length === 0 && (
            <div className="mt-3 text-center text-sm text-gray-600">
              {getTranslation('tapToStart')}
            </div>
          )}
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[2000] p-4">
          <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {getTranslation('confirmTitle')}
            </h3>
            <p className="text-gray-700 mb-6">
              {getTranslation('confirmMessage')}
            </p>

            <div className="flex gap-4">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition"
              >
                ❌ {getTranslation('no')}
              </button>

              <button
                onClick={confirmSave}
                className="flex-1 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-bold hover:shadow-xl transition transform hover:scale-105"
              >
                ✅ {getTranslation('yes')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FarmMappingPage;
