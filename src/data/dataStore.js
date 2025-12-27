// Enhanced Data storage system with AI recommendations and alerts
const AppData = {
  users: [],
  farms: [],
  practices: [],
  proofs: [],
  carbonCredits: [],
  marketListings: [],
  alerts: [],
  aiRecommendations: [],
  currentUser: null
};

// Eco-practices definitions
export const ecoPractices = [
  {
    id: 'organic',
    name: 'Organic Farming',
    nameHi: 'जैविक खेती',
    nameMr: 'सेंद्रिय शेती',
    icon: '🌱',
    carbonImpact: 1.2,
    description: 'No chemical fertilizers or pesticides',
    incomeIncrease: 15000
  },
  {
    id: 'agroforestry',
    name: 'Tree Plantation / Agroforestry',
    nameHi: 'वृक्षारोपण / कृषि वानिकी',
    nameMr: 'वृक्षारोपण / कृषी वनीकरण',
    icon: '🌳',
    carbonImpact: 2.5,
    description: 'Growing trees alongside crops',
    incomeIncrease: 35000
  },
  {
    id: 'reduced_tillage',
    name: 'Reduced Tillage',
    nameHi: 'कम जुताई',
    nameMr: 'कमी नांगरणी',
    icon: '🚜',
    carbonImpact: 1.5,
    description: 'Minimal soil disturbance',
    incomeIncrease: 12000
  },
  {
    id: 'residue_management',
    name: 'Crop Residue Management',
    nameHi: 'फसल अवशेष प्रबंधन',
    nameMr: 'पीक अवशेष व्यवस्थापन',
    icon: '♻️',
    carbonImpact: 1.3,
    description: 'Using crop waste effectively',
    incomeIncrease: 8000
  },
  {
    id: 'efficient_irrigation',
    name: 'Efficient Irrigation',
    nameHi: 'कुशल सिंचाई',
    nameMr: 'कार्यक्षम सिंचन',
    icon: '💧',
    carbonImpact: 1.1,
    description: 'Drip or sprinkler irrigation',
    incomeIncrease: 18000
  }
];

// Crop types
export const cropTypes = [
  { id: 'wheat', name: 'Wheat', nameHi: 'गेहूं', nameMr: 'गहू', carbonFactor: 1.0 },
  { id: 'rice', name: 'Rice', nameHi: 'धान', nameMr: 'तांदूळ', carbonFactor: 0.9 },
  { id: 'cotton', name: 'Cotton', nameHi: 'कपास', nameMr: 'कापूस', carbonFactor: 1.1 },
  { id: 'sugarcane', name: 'Sugarcane', nameHi: 'गन्ना', nameMr: 'ऊस', carbonFactor: 1.3 },
  { id: 'vegetables', name: 'Vegetables', nameHi: 'सब्जियां', nameMr: 'भाज्या', carbonFactor: 0.8 },
  { id: 'pulses', name: 'Pulses', nameHi: 'दालें', nameMr: 'डाळी', carbonFactor: 1.2 }
];

// Alert types
export const alertTypes = {
  PROOF_UPLOAD: 'proof_upload',
  PRACTICE_SUGGESTION: 'practice_suggestion',
  VERIFICATION_PENDING: 'verification_pending',
  CREDIT_MILESTONE: 'credit_milestone',
  MARKET_OPPORTUNITY: 'market_opportunity'
};

// User management functions
export const saveUser = (userData) => {
  const user = {
    id: `user_${Date.now()}`,
    ...userData,
    createdAt: new Date().toISOString(),
    isOnboarded: false
  };
  AppData.users.push(user);
  AppData.currentUser = user;
  return user;
};

export const updateUser = (userId, updates) => {
  const userIndex = AppData.users.findIndex(u => u.id === userId);
  if (userIndex !== -1) {
    AppData.users[userIndex] = { ...AppData.users[userIndex], ...updates };
    if (AppData.currentUser?.id === userId) {
      AppData.currentUser = AppData.users[userIndex];
    }
    return AppData.users[userIndex];
  }
  return null;
};

export const getCurrentUser = () => AppData.currentUser;

export const setCurrentUser = (user) => {
  AppData.currentUser = user;
};

export const findUserByMobile = (mobile) => {
  return AppData.users.find(u => u.mobile === mobile);
};

// Farm management functions
export const saveFarm = (farmData) => {
  const farm = {
    id: `farm_${Date.now()}`,
    userId: AppData.currentUser.id,
    ...farmData,
    createdAt: new Date().toISOString()
  };
  AppData.farms.push(farm);
  
  // Generate AI recommendations for new farm
  generateAIRecommendations(farm.id);
  
  return farm;
};

export const getFarmsByUser = (userId) => {
  return AppData.farms.filter(f => f.userId === userId);
};

// Practice management functions
export const savePractice = (practiceData) => {
  const practice = {
    id: `practice_${Date.now()}`,
    userId: AppData.currentUser.id,
    ...practiceData,
    createdAt: new Date().toISOString()
  };
  AppData.practices.push(practice);
  return practice;
};

export const getPracticesByUser = (userId) => {
  return AppData.practices.filter(p => p.userId === userId);
};

// Proof management functions
export const saveProof = (proofData) => {
  const proof = {
    id: `proof_${Date.now()}`,
    userId: AppData.currentUser.id,
    ...proofData,
    timestamp: new Date().toISOString(),
    status: 'pending'
  };
  AppData.proofs.push(proof);
  
  // Clear proof upload alert
  clearAlertByType(AppData.currentUser.id, alertTypes.PROOF_UPLOAD);
  
  return proof;
};

export const getProofsByUser = (userId) => {
  return AppData.proofs.filter(p => p.userId === userId);
};

// Carbon credit management functions
export const saveCarbonCredit = (creditData) => {
  const credit = {
    id: `credit_${Date.now()}`,
    userId: AppData.currentUser.id,
    ...creditData,
    createdAt: new Date().toISOString(),
    status: 'verified'
  };
  AppData.carbonCredits.push(credit);
  return credit;
};

export const getCarbonCreditsByUser = (userId) => {
  return AppData.carbonCredits.filter(c => c.userId === userId);
};

// Marketplace functions
export const createMarketListing = (listingData) => {
  const listing = {
    id: `listing_${Date.now()}`,
    userId: AppData.currentUser.id,
    ...listingData,
    createdAt: new Date().toISOString(),
    status: 'active'
  };
  AppData.marketListings.push(listing);
  return listing;
};

export const getAllMarketListings = () => {
  return AppData.marketListings.filter(l => l.status === 'active');
};

// Smart Alerts System
export const createAlert = (userId, alertData) => {
  const alert = {
    id: `alert_${Date.now()}`,
    userId,
    ...alertData,
    createdAt: new Date().toISOString(),
    isRead: false
  };
  AppData.alerts.push(alert);
  return alert;
};

export const getAlertsByUser = (userId) => {
  return AppData.alerts.filter(a => a.userId === userId && !a.isRead).sort((a, b) => 
    new Date(b.createdAt) - new Date(a.createdAt)
  );
};

export const markAlertAsRead = (alertId) => {
  const alert = AppData.alerts.find(a => a.id === alertId);
  if (alert) {
    alert.isRead = true;
  }
};

export const clearAlertByType = (userId, type) => {
  AppData.alerts.forEach(alert => {
    if (alert.userId === userId && alert.type === type) {
      alert.isRead = true;
    }
  });
};

// AI Recommendations System
export const generateAIRecommendations = (farmId) => {
  const farm = AppData.farms.find(f => f.id === farmId);
  if (!farm) return;
  
  const userId = farm.userId;
  const currentPractices = getPracticesByUser(userId).filter(p => p.farmId === farmId);
  const practiceIds = currentPractices.map(p => p.practiceId);
  
  // Recommend practices not yet adopted
  const recommendations = [];
  
  ecoPractices.forEach(practice => {
    if (!practiceIds.includes(practice.id)) {
      const potentialIncome = Math.round((farm.area * practice.incomeIncrease) / 5); // Normalized per acre
      const potentialCredits = (farm.area * practice.carbonImpact * 0.5).toFixed(1);
      
      recommendations.push({
        id: `rec_${Date.now()}_${practice.id}`,
        userId,
        farmId,
        practiceId: practice.id,
        title: practice.name,
        titleHi: practice.nameHi,
        titleMr: practice.nameMr,
        icon: practice.icon,
        potentialIncome,
        potentialCredits,
        priority: practice.carbonImpact > 2 ? 'high' : practice.carbonImpact > 1.3 ? 'medium' : 'low',
        createdAt: new Date().toISOString()
      });
    }
  });
  
  // Sort by potential income
  recommendations.sort((a, b) => b.potentialIncome - a.potentialIncome);
  
  // Save top 3 recommendations
  AppData.aiRecommendations.push(...recommendations.slice(0, 3));
};

export const getAIRecommendations = (userId) => {
  return AppData.aiRecommendations.filter(r => r.userId === userId).slice(0, 3);
};

// Generate smart alerts for user
export const generateSmartAlerts = (userId) => {
  const proofs = getProofsByUser(userId);
  const farms = getFarmsByUser(userId);
  const practices = getPracticesByUser(userId);
  
  // Alert: Upload proof if no proof in last 30 days
  const lastProof = proofs.length > 0 ? new Date(proofs[proofs.length - 1].timestamp) : null;
  const daysSinceLastProof = lastProof ? Math.floor((new Date() - lastProof) / (1000 * 60 * 60 * 24)) : 999;
  
  if (daysSinceLastProof > 30 && farms.length > 0) {
    createAlert(userId, {
      type: alertTypes.PROOF_UPLOAD,
      title: 'Upload Proof Reminder',
      titleHi: 'प्रमाण अपलोड करने का अनुस्मारक',
      titleMr: 'पुरावा अपलोड करण्याची आठवण',
      message: 'Upload recent farming activity photos to earn more credits',
      messageHi: 'अधिक क्रेडिट अर्जित करने के लिए हाल की खेती गतिविधि की तस्वीरें अपलोड करें',
      messageMr: 'अधिक क्रेडिट्स मिळविण्यासाठी अलीकडील शेती क्रियाकलापांचे फोटो अपलोड करा',
      icon: '📸',
      action: 'proof-upload'
    });
  }
  
  // Alert: Suggest best practices
  if (practices.length < 3 && farms.length > 0) {
    createAlert(userId, {
      type: alertTypes.PRACTICE_SUGGESTION,
      title: 'Increase Your Carbon Score',
      titleHi: 'अपना कार्बन स्कोर बढ़ाएं',
      titleMr: 'तुमचा कार्बन स्कोअर वाढवा',
      message: 'Adopt more eco-practices to boost your green score and earnings',
      messageHi: 'अपने हरित स्कोर और कमाई को बढ़ावा देने के लिए अधिक इको-प्रथाओं को अपनाएं',
      messageMr: 'तुमचा ग्रीन स्कोअर आणि कमाई वाढविण्यासाठी अधिक इको-पद्धती स्वीकारा',
      icon: '🌱',
      action: 'practice'
    });
  }
  
  // Alert: Verification pending
  const pendingProofs = proofs.filter(p => p.status === 'pending');
  if (pendingProofs.length > 0) {
    createAlert(userId, {
      type: alertTypes.VERIFICATION_PENDING,
      title: 'Verification in Progress',
      titleHi: 'सत्यापन प्रगति में है',
      titleMr: 'सत्यापन प्रगतीपथावर आहे',
      message: `${pendingProofs.length} proof(s) are being verified by our team`,
      messageHi: `${pendingProofs.length} प्रमाण हमारी टीम द्वारा सत्यापित किए जा रहे हैं`,
      messageMr: `${pendingProofs.length} पुरावे आमच्या टीमद्वारे सत्यापित केले जात आहेत`,
      icon: '⏳',
      action: null
    });
  }
};

// Calculate carbon score
export const calculateCarbonScore = (userId) => {
  const farms = getFarmsByUser(userId);
  const practices = getPracticesByUser(userId);
  const proofs = getProofsByUser(userId);
  
  let score = 50; // Base score
  
  // Add points for farms
  score += Math.min(farms.length * 5, 15);
  
  // Add points for practices
  practices.forEach(practice => {
    const practiceType = ecoPractices.find(p => p.id === practice.practiceId);
    if (practiceType) {
      score += practiceType.carbonImpact * 3;
    }
  });
  
  // Add points for proofs
  score += Math.min(proofs.length * 2, 20);
  
  return Math.min(Math.round(score), 100);
};

// Calculate carbon credits earned
export const calculateCarbonCredits = (userId) => {
  const farms = getFarmsByUser(userId);
  const practices = getPracticesByUser(userId);
  
  let totalCredits = 0;
  
  farms.forEach(farm => {
    const farmPractices = practices.filter(p => p.farmId === farm.id);
    let farmImpact = 0;
    
    farmPractices.forEach(practice => {
      const practiceType = ecoPractices.find(p => p.id === practice.practiceId);
      if (practiceType) {
        farmImpact += practiceType.carbonImpact;
      }
    });
    
    const crop = cropTypes.find(c => c.id === farm.cropType);
    const cropFactor = crop ? crop.carbonFactor : 1.0;
    const timeFactor = 0.5;
    
    totalCredits += farm.area * farmImpact * cropFactor * timeFactor;
  });
  
  return Math.round(totalCredits * 10) / 10;
};

// Generate dummy data for demo
export const generateDummyData = () => {
  const demoUser = {
    id: 'user_demo',
    mobile: '9876543210',
    name: 'राज पाटील',
    language: 'hi',
    isOnboarded: true,
    createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString()
  };
  AppData.users.push(demoUser);
  
  const demoFarm1 = {
    id: 'farm_demo1',
    userId: 'user_demo',
    area: 5.5,
    cropType: 'wheat',
    location: { lat: 21.1458, lng: 79.0882 },
    boundaries: [
      { lat: 21.1458, lng: 79.0882 },
      { lat: 21.1468, lng: 79.0892 },
      { lat: 21.1468, lng: 79.0872 },
      { lat: 21.1458, lng: 79.0862 }
    ],
    createdAt: new Date(Date.now() - 85 * 24 * 60 * 60 * 1000).toISOString()
  };
  AppData.farms.push(demoFarm1);
  
  const demoPractices = [
    { id: 'practice_demo1', userId: 'user_demo', farmId: 'farm_demo1', practiceId: 'organic', createdAt: new Date(Date.now() - 80 * 24 * 60 * 60 * 1000).toISOString() },
    { id: 'practice_demo2', userId: 'user_demo', farmId: 'farm_demo1', practiceId: 'agroforestry', createdAt: new Date(Date.now() - 75 * 24 * 60 * 60 * 1000).toISOString() }
  ];
  AppData.practices.push(...demoPractices);
  
  const demoProofs = [
    { id: 'proof_demo1', userId: 'user_demo', farmId: 'farm_demo1', type: 'photo', description: 'Organic farming setup', timestamp: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(), status: 'verified' },
    { id: 'proof_demo2', userId: 'user_demo', farmId: 'farm_demo1', type: 'photo', description: 'Tree plantation', timestamp: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(), status: 'verified' }
  ];
  AppData.proofs.push(...demoProofs);
  
  const demoCredits = {
    id: 'credit_demo1',
    userId: 'user_demo',
    credits: 24.5,
    value: 24500,
    period: '6 months',
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'verified'
  };
  AppData.carbonCredits.push(demoCredits);
  
  const demoListings = [
    { id: 'listing_demo1', userId: 'user_demo', credits: 10, pricePerCredit: 1000, totalValue: 10000, createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), status: 'active' },
    { id: 'listing_other1', userId: 'user_other', credits: 15, pricePerCredit: 950, totalValue: 14250, sellerName: 'अजय शर्मा', location: 'पुणे', createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(), status: 'active' },
    { id: 'listing_other2', userId: 'user_other2', credits: 20, pricePerCredit: 1050, totalValue: 21000, sellerName: 'सुनीता देवी', location: 'नागपूर', createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), status: 'active' }
  ];
  AppData.marketListings.push(...demoListings);
  
  // Generate AI recommendations
  generateAIRecommendations('farm_demo1');
  
  // Generate smart alerts
  generateSmartAlerts('user_demo');
};

generateDummyData();

export default AppData;