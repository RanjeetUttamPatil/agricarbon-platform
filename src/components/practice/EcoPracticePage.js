import { useState } from 'react';
import { getCurrentUser, ecoPractices } from '../../data/dataStore';

const EcoPracticePage = ({ onBack, onNavigate }) => {
  const [user, setUser] = useState(getCurrentUser());
  const [selectedPractice, setSelectedPractice] = useState(null);
  const [language, setLanguage] = useState(user?.language || 'hi');

  const getTranslation = (key) => {
    const translations = {
      en: {
        title: 'Sustainable Farming Practices',
        subtitle: 'Learn how eco-friendly practices improve soil, yield & income',
        whatIsIt: 'What is it?',
        whyItHelps: 'Why it helps?',
        howToDo: 'How to do it?',
        whenToDo: 'When to do it?',
        commonMistakes: 'Common Mistakes to Avoid',
        tips: 'Important Tip',
        tipText: 'Upload photos only after actual implementation',
        estimatedBenefit: 'Estimated Benefit',
        perAcre: 'per acre',
        learnMore: 'Learn More',
        backToPractices: '← Back to Practices',
        improvesSoil: '🌱 Improves soil health',
        increasesIncome: '💰 Increases long-term income',
        reducesCarbon: '🌍 Reduces carbon emissions',
        guidance: 'After implementing any practice, go to the Proof Upload page to submit evidence and earn carbon credits.',
        goToProofUpload: 'Go to Proof Upload',
        goToDashboard: 'Go to Dashboard',
        season: 'Best Season',
        duration: 'Implementation Time'
      },
      hi: {
        title: 'टिकाऊ कृषि प्रथाएं',
        subtitle: 'जानें कि कैसे पर्यावरण-अनुकूल प्रथाएं मिट्टी, उपज और आय में सुधार करती हैं',
        whatIsIt: 'यह क्या है?',
        whyItHelps: 'यह क्यों मदद करता है?',
        howToDo: 'इसे कैसे करें?',
        whenToDo: 'इसे कब करें?',
        commonMistakes: 'बचने योग्य सामान्य गलतियाँ',
        tips: 'महत्वपूर्ण सुझाव',
        tipText: 'केवल वास्तविक कार्यान्वयन के बाद ही फोटो अपलोड करें',
        estimatedBenefit: 'अनुमानित लाभ',
        perAcre: 'प्रति एकड़',
        learnMore: 'और जानें',
        backToPractices: '← प्रथाओं पर वापस जाएं',
        improvesSoil: '🌱 मिट्टी के स्वास्थ्य में सुधार',
        increasesIncome: '💰 दीर्घकालिक आय बढ़ाता है',
        reducesCarbon: '🌍 कार्बन उत्सर्जन कम करता है',
        guidance: 'किसी भी प्रथा को लागू करने के बाद, प्रमाण जमा करने और कार्बन क्रेडिट अर्जित करने के लिए प्रमाण अपलोड पेज पर जाएं।',
        goToProofUpload: 'प्रमाण अपलोड पर जाएं',
        goToDashboard: 'डैशबोर्ड पर जाएं',
        season: 'सर्वोत्तम मौसम',
        duration: 'कार्यान्वयन समय'
      },
      mr: {
        title: 'शाश्वत शेती पद्धती',
        subtitle: 'जाणून घ्या की पर्यावरण-अनुकूल पद्धती माती, उत्पादन आणि उत्पन्न कशा सुधारतात',
        whatIsIt: 'हे काय आहे?',
        whyItHelps: 'हे का मदत करते?',
        howToDo: 'हे कसे करावे?',
        whenToDo: 'हे केव्हा करावे?',
        commonMistakes: 'टाळण्यासाठी सामान्य चुका',
        tips: 'महत्त्वाची टीप',
        tipText: 'केवळ वास्तविक अंमलबजावणीनंतरच फोटो अपलोड करा',
        estimatedBenefit: 'अंदाजे फायदा',
        perAcre: 'प्रति एकर',
        learnMore: 'अधिक जाणून घ्या',
        backToPractices: '← पद्धतींकडे परत जा',
        improvesSoil: '🌱 मातीचे आरोग्य सुधारते',
        increasesIncome: '💰 दीर्घकालीन उत्पन्न वाढवते',
        reducesCarbon: '🌍 कार्बन उत्सर्जन कमी करते',
        guidance: 'कोणतीही पद्धत अंमलात आणल्यानंतर, पुरावा सबमिट करण्यासाठी आणि कार्बन क्रेडिट्स मिळविण्यासाठी पुरावा अपलोड पृष्ठावर जा.',
        goToProofUpload: 'पुरावा अपलोड करा',
        goToDashboard: 'डॅशबोर्डवर जा',
        season: 'सर्वोत्तम हंगाम',
        duration: 'अंमलबजावणी वेळ'
      }
    };
    return translations[language][key];
  };

  const getPracticeName = (practice) => {
    if (language === 'hi') return practice.nameHi;
    if (language === 'mr') return practice.nameMr;
    return practice.name;
  };

  // Practice details with how-to steps
  const practiceDetails = {
    organic: {
      whatIsIt: {
        en: 'Farming without chemical fertilizers, pesticides, or GMO seeds',
        hi: 'रासायनिक उर्वरकों, कीटनाशकों या जीएमओ बीजों के बिना खेती',
        mr: 'रासायनिक खते, कीटकनाशके किंवा जीएमओ बियाण्यांशिवाय शेती'
      },
      howToDo: [
        { en: '1. Use organic compost and cow dung manure', hi: '1. जैविक खाद और गोबर की खाद का उपयोग करें', mr: '1. सेंद्रिय खत आणि शेणाचा वापर करा' },
        { en: '2. Plant neem trees around farm boundaries', hi: '2. खेत की सीमाओं के चारों ओर नीम के पेड़ लगाएं', mr: '2. शेताच्या सीमेभोवती कडुलिंब लावा' },
        { en: '3. Use natural pest control (neem oil spray)', hi: '3. प्राकृतिक कीट नियंत्रण का उपयोग करें (नीम तेल स्प्रे)', mr: '3. नैसर्गिक किडे नियंत्रण (कडुलिंब तेल फवारणी)' },
        { en: '4. Rotate crops every season', hi: '4. हर मौसम में फसलें बदलें', mr: '4. प्रत्येक हंगामात पिके बदला' }
      ],
      whenToDo: {
        en: 'Start 3-6 months before main crop season. Soil preparation takes time.',
        hi: 'मुख्य फसल के मौसम से 3-6 महीने पहले शुरू करें। मिट्टी की तैयारी में समय लगता है।',
        mr: 'मुख्य पीक हंगामाच्या 3-6 महिने आधी सुरुवात करा. मातीच्या तयारीला वेळ लागतो.'
      },
      season: {
        en: 'All year (preparation starts before planting)',
        hi: 'पूरे साल (बुवाई से पहले तैयारी शुरू होती है)',
        mr: 'वर्षभर (लागवडीपूर्वी तयारी सुरू होते)'
      },
      mistakes: [
        { en: '❌ Using chemical fertilizers alongside organic', hi: '❌ जैविक के साथ रासायनिक उर्वरकों का उपयोग', mr: '❌ सेंद्रियासोबत रासायनिक खतांचा वापर' },
        { en: '❌ Not testing soil before starting', hi: '❌ शुरू करने से पहले मिट्टी की जांच न करना', mr: '❌ सुरुवात करण्यापूर्वी मातीची चाचणी न करणे' },
        { en: '❌ Expecting immediate results (takes 1-2 seasons)', hi: '❌ तत्काल परिणामों की अपेक्षा (1-2 मौसम लगते हैं)', mr: '❌ तात्काळ परिणामांची अपेक्षा (1-2 हंगाम लागतात)' }
      ]
    },
    agroforestry: {
      whatIsIt: {
        en: 'Growing trees alongside crops for shade, soil health, and extra income',
        hi: 'छाया, मिट्टी के स्वास्थ्य और अतिरिक्त आय के लिए फसलों के साथ पेड़ लगाना',
        mr: 'सावली, माती आरोग्य आणि अतिरिक्त उत्पन्नासाठी पिकांसोबत झाडे लावणे'
      },
      howToDo: [
        { en: '1. Select native trees (neem, mango, teak)', hi: '1. देशी पेड़ चुनें (नीम, आम, सागौन)', mr: '1. मूळ झाडे निवडा (कडुलिंब, आंबा, साग)' },
        { en: '2. Plant trees on farm boundaries first', hi: '2. पहले खेत की सीमाओं पर पेड़ लगाएं', mr: '2. प्रथम शेताच्या सीमेवर झाडे लावा' },
        { en: '3. Maintain 30-40 feet spacing between trees', hi: '3. पेड़ों के बीच 30-40 फीट की दूरी बनाए रखें', mr: '3. झाडांमध्ये 30-40 फूट अंतर ठेवा' },
        { en: '4. Water saplings regularly for 2 years', hi: '4. 2 साल तक नियमित रूप से पौधों को पानी दें', mr: '4. 2 वर्षे नियमितपणे रोपांना पाणी द्या' }
      ],
      whenToDo: {
        en: 'Plant during monsoon (June-August) for better survival rate.',
        hi: 'बेहतर जीवित रहने की दर के लिए मानसून (जून-अगस्त) के दौरान रोपें।',
        mr: 'चांगल्या जगण्याच्या दरासाठी पावसाळ्यात (जून-ऑगस्ट) लावा.'
      },
      season: {
        en: 'Monsoon season (June-August)',
        hi: 'मानसून का मौसम (जून-अगस्त)',
        mr: 'पावसाळा (जून-ऑगस्ट)'
      },
      mistakes: [
        { en: '❌ Planting trees too close to crops', hi: '❌ फसलों के बहुत करीब पेड़ लगाना', mr: '❌ पिकांच्या अगदी जवळ झाडे लावणे' },
        { en: '❌ Choosing non-native species', hi: '❌ गैर-देशी प्रजातियों का चयन', mr: '❌ परदेशी प्रजाती निवडणे' },
        { en: '❌ Not protecting young plants from cattle', hi: '❌ पशुओं से युवा पौधों की रक्षा न करना', mr: '❌ गुरांपासून तरुण रोपांचे संरक्षण न करणे' }
      ]
    },
    reduced_tillage: {
      whatIsIt: {
        en: 'Minimal soil disturbance to preserve soil structure and reduce erosion',
        hi: 'मिट्टी की संरचना को संरक्षित करने और कटाव को कम करने के लिए न्यूनतम मिट्टी गड़बड़ी',
        mr: 'माती रचना जतन करण्यासाठी आणि धूप कमी करण्यासाठी किमान माती विस्कळीत करणे'
      },
      howToDo: [
        { en: '1. Use seed drills instead of plowing entire field', hi: '1. पूरे खेत को जोतने के बजाय सीड ड्रिल का उपयोग करें', mr: '1. संपूर्ण शेत नांगरण्याऐवजी बियाणे ड्रिल वापरा' },
        { en: '2. Leave crop residue on field as mulch', hi: '2. फसल अवशेष को गीली घास के रूप में खेत पर छोड़ दें', mr: '2. पीक अवशेष शेतात आच्छादन म्हणून सोडा' },
        { en: '3. Use hand tools for weeding instead of tilling', hi: '3. जुताई के बजाय निराई के लिए हाथ के औजारों का उपयोग करें', mr: '3. नांगरणीऐवजी तण काढण्यासाठी हाताची साधने वापरा' },
        { en: '4. Gradually transition over 2-3 seasons', hi: '4. धीरे-धीरे 2-3 मौसमों में परिवर्तन करें', mr: '4. 2-3 हंगामांमध्ये हळूहळू बदला' }
      ],
      whenToDo: {
        en: 'Start transitioning during rabi season when soil is moist.',
        hi: 'जब मिट्टी नम हो तो रबी सीजन के दौरान परिवर्तन शुरू करें।',
        mr: 'माती ओलसर असताना रब्बी हंगामात बदलण्यास सुरुवात करा.'
      },
      season: {
        en: 'Transition during Rabi season',
        hi: 'रबी सीजन के दौरान परिवर्तन',
        mr: 'रब्बी हंगामात बदल'
      },
      mistakes: [
        { en: '❌ Stopping tillage suddenly without preparation', hi: '❌ तैयारी के बिना अचानक जुताई बंद करना', mr: '❌ तयारीशिवाय अचानक नांगरणी थांबवणे' },
        { en: '❌ Not managing weeds properly', hi: '❌ खरपतवार का ठीक से प्रबंधन न करना', mr: '❌ तणांचे व्यवस्थापन नीट न करणे' },
        { en: '❌ Using heavy machinery initially', hi: '❌ शुरू में भारी मशीनरी का उपयोग', mr: '❌ सुरुवातीला जड यंत्रसामग्रीचा वापर' }
      ]
    },
    residue_management: {
      whatIsIt: {
        en: 'Using leftover crop parts as compost instead of burning them',
        hi: 'फसल अवशेषों को जलाने के बजाय खाद के रूप में उपयोग करना',
        mr: 'पीक अवशेष जाळण्याऐवजी खत म्हणून वापरणे'
      },
      howToDo: [
        { en: '1. Chop crop residue into small pieces (6-8 inches)', hi: '1. फसल अवशेष को छोटे टुकड़ों में काटें (6-8 इंच)', mr: '1. पीक अवशेष लहान तुकड्यांमध्ये कापा (6-8 इंच)' },
        { en: '2. Mix with cow dung and water', hi: '2. गोबर और पानी के साथ मिलाएं', mr: '2. शेण आणि पाण्यात मिसळा' },
        { en: '3. Cover with soil and let decompose for 45-60 days', hi: '3. मिट्टी से ढकें और 45-60 दिनों तक सड़ने दें', mr: '3. मातीने झाकून 45-60 दिवस विघटित होऊ द्या' },
        { en: '4. Spread as fertilizer before next crop', hi: '4. अगली फसल से पहले खाद के रूप में फैलाएं', mr: '4. पुढील पिकापूर्वी खत म्हणून पसरवा' }
      ],
      whenToDo: {
        en: "Immediately after harvest. Don't burn crop stubble.",
        hi: 'कटाई के तुरंत बाद। फसल के ठूंठ न जलाएं।',
        mr: 'कापणीनंतर लगेच. पीक बुंधे जाळू नका.',
      },
      season: {
        en: 'After every harvest',
        hi: 'हर कटाई के बाद',
        mr: 'प्रत्येक कापणीनंतर'
      },
      mistakes: [
        { en: '❌ Burning crop residue (causes pollution)', hi: '❌ फसल अवशेष जलाना (प्रदूषण का कारण)', mr: '❌ पीक अवशेष जाळणे (प्रदूषण कारणीभूत)' },
        { en: '❌ Leaving large pieces (slow decomposition)', hi: '❌ बड़े टुकड़े छोड़ना (धीमी सड़न)', mr: '❌ मोठे तुकडे सोडणे (मंद विघटन)' },
        { en: '❌ Not mixing with decomposers', hi: '❌ डीकंपोजर के साथ न मिलाना', mr: '❌ विघटनकर्त्यांसह मिश्रित न करणे' }
      ]
    },
    efficient_irrigation: {
      whatIsIt: {
        en: 'Using drip or sprinkler systems to save water and improve crop health',
        hi: 'पानी बचाने और फसल स्वास्थ्य में सुधार के लिए ड्रिप या स्प्रिंकलर सिस्टम का उपयोग',
        mr: 'पाणी वाचवण्यासाठी आणि पीक आरोग्य सुधारण्यासाठी ठिबक किंवा फवारणी प्रणाली वापरणे'
      },
      howToDo: [
        { en: '1. Install drip irrigation pipes along crop rows', hi: '1. फसल की पंक्तियों के साथ ड्रिप सिंचाई पाइप स्थापित करें', mr: '1. पीक ओळींसोबत ठिबक सिंचन पाईप बसवा' },
        { en: '2. Set timer for early morning watering (5-7 AM)', hi: '2. सुबह जल्दी पानी देने के लिए टाइमर सेट करें (5-7 AM)', mr: '2. पहाटे पाणी देण्यासाठी टाइमर सेट करा (5-7 AM)' },
        { en: '3. Check for leaks weekly', hi: '3. साप्ताहिक रूप से रिसाव की जांच करें', mr: '3. साप्ताहिक गळतीची तपासणी करा' },
        { en: '4. Clean filters every 15 days', hi: '4. हर 15 दिनों में फ़िल्टर साफ करें', mr: '4. दर 15 दिवसांनी फिल्टर स्वच्छ करा' }
      ],
      whenToDo: {
        en: 'Install before crop season. Saves 40-60% water compared to flood irrigation.',
        hi: 'फसल के मौसम से पहले स्थापित करें। बाढ़ सिंचाई की तुलना में 40-60% पानी बचाता है।',
        mr: 'पीक हंगामापूर्वी बसवा. पूर सिंचनाच्या तुलनेत 40-60% पाणी वाचवते.'
      },
      season: {
        en: 'Install before crop season',
        hi: 'फसल के मौसम से पहले स्थापित करें',
        mr: 'पीक हंगामापूर्वी बसवा'
      },
      mistakes: [
        { en: '❌ Over-watering (causes root rot)', hi: '❌ अधिक पानी देना (जड़ सड़न का कारण)', mr: '❌ जास्त पाणी देणे (मूळ कुजण्यास कारणीभूत)' },
        { en: '❌ Not maintaining the system', hi: '❌ सिस्टम की देखभाल न करना', mr: '❌ प्रणालीची देखभाल न करणे' },
        { en: '❌ Watering during hot afternoons', hi: '❌ गर्म दोपहर के दौरान पानी देना', mr: '❌ गरम दुपारी पाणी देणे' }
      ]
    }
  };

  if (selectedPractice) {
    const practice = ecoPractices.find(p => p.id === selectedPractice);
    const details = practiceDetails[selectedPractice];

    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-5xl mx-auto px-4 py-4">
            <button
              onClick={() => setSelectedPractice(null)}
              className="flex items-center gap-2 text-gray-600 hover:text-green-600 font-medium transition mb-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              {getTranslation('backToPractices')}
            </button>
          </div>
        </div>

        {/* Practice Detail */}
        <div className="max-w-5xl mx-auto px-4 py-8">
          {/* Practice Header */}
          <div className="bg-white rounded-3xl shadow-xl p-8 mb-6">
            <div className="flex items-start gap-6">
              <div className="w-24 h-24 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center text-6xl flex-shrink-0">
                {practice.icon}
              </div>
              <div className="flex-1">
                <h1 className="text-4xl font-bold text-gray-900 mb-3">{getPracticeName(practice)}</h1>
                <p className="text-xl text-gray-600 mb-4">{details.whatIsIt[language]}</p>
                <div className="flex flex-wrap gap-3">
                  <span className="px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-medium">
                    {getTranslation('improvesSoil')}
                  </span>
                  <span className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                    {getTranslation('increasesIncome')}
                  </span>
                  <span className="px-4 py-2 bg-purple-50 text-purple-700 rounded-full text-sm font-medium">
                    {getTranslation('reducesCarbon')}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Estimated Benefit */}
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-3xl shadow-xl p-8 mb-6 border-2 border-yellow-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{getTranslation('estimatedBenefit')}</h3>
                <p className="text-gray-600 text-sm">Based on average 5-acre farm implementation</p>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold text-yellow-700">₹{practice.incomeIncrease.toLocaleString()}</div>
                <div className="text-sm text-gray-600">{getTranslation('perAcre')} / year</div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* How to Do It */}
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="text-3xl">🛠️</span>
                {getTranslation('howToDo')}
              </h2>
              <div className="space-y-4">
                {details.howToDo.map((step, idx) => (
                  <div key={idx} className="flex gap-4 items-start">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-green-700">
                      {idx + 1}
                    </div>
                    <p className="text-gray-700 pt-1">{step[language]}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* When to Do It */}
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="text-3xl">📆</span>
                {getTranslation('whenToDo')}
              </h2>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-xl">
                  <div className="font-semibold text-blue-900 mb-2">{getTranslation('season')}</div>
                  <div className="text-blue-700">{details.season[language]}</div>
                </div>
                <div className="p-4 bg-purple-50 rounded-xl">
                  <div className="font-semibold text-purple-900 mb-2">{getTranslation('duration')}</div>
                  <div className="text-purple-700">{details.whenToDo[language]}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Common Mistakes */}
          <div className="bg-white rounded-3xl shadow-xl p-8 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <span className="text-3xl">⚠️</span>
              {getTranslation('commonMistakes')}
            </h2>
            <div className="space-y-3">
              {details.mistakes.map((mistake, idx) => (
                <div key={idx} className="flex gap-4 items-start p-4 bg-red-50 rounded-xl border-l-4 border-red-400">
                  <p className="text-gray-700">{mistake[language]}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Important Tip */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-3xl shadow-xl p-8 mb-8 border-2 border-purple-200">
            <div className="flex gap-4 items-start">
              <span className="text-5xl">💡</span>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{getTranslation('tips')}</h3>
                <p className="text-lg text-gray-700">{getTranslation('tipText')}</p>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <p className="text-lg text-gray-700 mb-6 text-center">{getTranslation('guidance')}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => onNavigate('proof-upload')}
                className="flex-1 py-4 px-6 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-bold text-lg hover:shadow-xl transition transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <span>📸</span>
                {getTranslation('goToProofUpload')}
              </button>
              <button
                onClick={() => onNavigate('dashboard')}
                className="flex-1 py-4 px-6 border-2 border-gray-300 text-gray-700 rounded-xl font-bold text-lg hover:bg-gray-50 transition flex items-center justify-center gap-2"
              >
                <span>🏠</span>
                {getTranslation('goToDashboard')}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main Practice List View
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={onBack}
              className="p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Language Toggle */}
            <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
              {['en', 'hi', 'mr'].map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    language === lang
                      ? 'bg-white text-green-600 shadow'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {lang === 'en' ? '🌐 English' : lang === 'hi' ? 'हिन्दी' : 'मराठी'}
                </button>
              ))}
            </div>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-2">{getTranslation('title')}</h1>
          <p className="text-xl text-gray-600">{getTranslation('subtitle')}</p>
        </div>
      </div>

      {/* Practice Cards Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ecoPractices.map((practice) => (
            <div
              key={practice.id}
              className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 overflow-hidden"
            >
              {/* Top Section - Icon & Name */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 text-center">
                <div className="w-24 h-24 bg-white rounded-2xl shadow-lg mx-auto mb-4 flex items-center justify-center text-6xl">
                  {practice.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{getPracticeName(practice)}</h3>
              </div>

              {/* Middle Section - Benefits */}
              <div className="p-6">
                <div className="mb-4">
                  <p className="text-gray-600 text-sm mb-3">{practice.description}</p>
                </div>

                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-sm">
                    <span>🌱</span>
                    <span className="text-gray-700">{getTranslation('improvesSoil').substring(2)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span>💰</span>
                    <span className="text-gray-700">{getTranslation('increasesIncome').substring(2)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span>🌍</span>
                    <span className="text-gray-700">{getTranslation('reducesCarbon').substring(2)}</span>
                  </div>
                </div>

                {/* Estimated Benefit */}
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-4 mb-6 border border-yellow-200">
                  <div className="text-xs text-gray-600 mb-1">{getTranslation('estimatedBenefit')}</div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl font-bold text-yellow-700">₹{(practice.incomeIncrease / 5).toLocaleString()}</span>
                    <span className="text-xs text-gray-600">{getTranslation('perAcre')}</span>
                  </div>
                </div>

                {/* Learn More Button */}
                <button
                  onClick={() => setSelectedPractice(practice.id)}
                  className="w-full py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-lg transition transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  {getTranslation('learnMore')}
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Guidance */}
        <div className="mt-12 bg-white rounded-3xl shadow-xl p-8 text-center">
          <div className="text-5xl mb-4">📸</div>
          <p className="text-xl text-gray-700 mb-6">{getTranslation('guidance')}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto">
            <button
              onClick={() => onNavigate('proof-upload')}
              className="py-4 px-8 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-bold text-lg hover:shadow-xl transition transform hover:scale-105"
            >
              👉 {getTranslation('goToProofUpload')}
            </button>
            <button
              onClick={() => onNavigate('dashboard')}
              className="py-4 px-8 border-2 border-gray-300 text-gray-700 rounded-xl font-bold text-lg hover:bg-gray-50 transition"
            >
              {getTranslation('goToDashboard')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EcoPracticePage;