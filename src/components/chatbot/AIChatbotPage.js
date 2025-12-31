import { useState, useEffect, useRef } from 'react';
import { getCurrentUser } from '../../data/dataStore';

const AIChatbotPage = ({ onBack, onNavigate }) => {
    const [user, setUser] = useState(null);
    const [language, setLanguage] = useState('en');
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        const currentUser = getCurrentUser();
        setUser(currentUser);
        setLanguage(currentUser?.language || 'en');

        // Initial welcome message
        setTimeout(() => {
            addBotMessage('welcome');
        }, 500);
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const getTranslation = (key) => {
        const translations = {
            en: {
                title: 'AI Farm Assistant',
                subtitle: 'Get help on farming, carbon credits & platform usage',
                welcomeMsg: `Hello! 👋 I'm your farm assistant. I can help you with:
• Eco-friendly farming practices
• Farm mapping & boundaries
• Proof upload process
• Carbon credits & income
• Certificates & buyers
• Platform navigation

How can I help you today?`,
                quickActions: 'Quick Actions',
                ecoPractices: '🌱 Eco-friendly practices',
                farmMapping: '🗺️ How to map my farm',
                proofUpload: '📸 How to upload proof',
                carbonCredits: '💰 Carbon credits & income',
                certificate: '🧾 Certificate & buyers',
                platformHelp: '⚙️ Platform help',
                typePlaceholder: 'Type your question here...',
                send: 'Send',
                disclaimer: 'This assistant provides guidance. Final verification is system-based.',
                humanSupport: 'Talk to human support',
                typing: 'AI is typing...',
                // Bot responses
                ecoPracticesResp: `🌱 **Eco-Friendly Farming Practices**

We support 5 main practices:

1. **Organic Farming** 🌾
   - No chemical fertilizers
   - Natural pest control
   - Earn up to ₹15,000/acre extra

2. **Agroforestry** 🌳
   - Plant trees with crops
   - Improves soil + extra income
   - Highest carbon impact

3. **Reduced Tillage** 🚜
   - Minimal soil disturbance
   - Saves fuel & labor

4. **Crop Residue Management** ♻️
   - Don't burn crop waste
   - Use as compost

5. **Efficient Irrigation** 💧
   - Drip/sprinkler systems
   - Save 40-60% water

Would you like details on any specific practice?`,
                farmMappingResp: `🗺️ **How to Map Your Farm**

Step-by-step guide:

1. **Go to Farm Mapping** page
   - From dashboard → Farm Mapping

2. **Enter farm details**
   - Land size (acres)
   - Crop type
   - Village/District

3. **Draw your boundary**
   - Tap "Draw Boundary"
   - Click around your farm edges
   - Mark all corners
   - Tap "Complete Mapping"

4. **Verify & Save**
   - Check the boundary
   - System calculates area
   - Save your farm

📍 Tip: Use satellite view for better accuracy!

Would you like me to guide you to the mapping page?`,
                proofUploadResp: `📸 **How to Upload Proof**

3-Step Process:

**Step 1: Select Your Farm**
- Choose which farm

**Step 2: Select Practice**
- What did you implement?
- When did you start?

**Step 3: Upload Photos**
- Take clear, well-lit photos
- Show entire practice area
- Multiple angles help
- Photos auto geo-tagged

✅ **Photo Guidelines:**
- Clear visibility
- Good lighting
- Show full area
- Include date if possible

After upload, our team verifies within 3-5 days!

Ready to upload proof?`,
                carbonCreditsResp: `💰 **Carbon Credits & Income**

How it works:

**1. Earn Credits**
- Adopt eco-practices
- Upload proof
- Get verified
- Earn carbon credits

**2. Credit Value**
- 1 credit = 1 ton CO₂ reduced
- Worth ₹800-1,500 per credit
- Depends on buyer demand

**3. Your Potential**
- 5 acres + organic farming
- Can earn 10-25 credits/year
- ₹10,000 - ₹25,000 extra income

**4. How to Check**
- Dashboard → Carbon Credits
- See your score
- View verified credits

Want to see your current credits?`,
                certificateResp: `🧾 **Certificate & Buyers**

**Your Certificate Includes:**
✓ Farmer ID
✓ Total verified credits
✓ Verification status
✓ Unique certificate ID
✓ QR code for verification

**Interested Buyers:**
- Tata Motors
- Infosys
- Hindustan Unilever
- Reliance Industries

**How to Connect:**
1. Go to Marketplace
2. View buyer requirements
3. Click "Request to Connect"
4. Our team facilitates introduction

📄 You can download & share your certificate!

Want to view your certificate?`,
                platformHelpResp: `⚙️ **Platform Help**

**Main Features:**

📊 **Dashboard**
- View your stats
- Quick actions
- Notifications

🗺️ **Farm Mapping**
- Register your farm
- Draw boundaries
- GPS tracking

🌱 **Eco-Practices**
- Learn about practices
- View benefits
- Get guidance

📸 **Proof Upload**
- Submit evidence
- Track verification
- Earn credits

💰 **Marketplace**
- View certificate
- See buyers
- Connect for sales

**Need Specific Help?**
- Farm mapping issue?
- Upload problem?
- Certificate question?

Just ask! I'm here to help.`
            },
            hi: {
                title: 'AI फार्म सहायक',
                subtitle: 'खेती, कार्बन क्रेडिट और प्लेटफ़ॉर्म उपयोग में सहायता प्राप्त करें',
                welcomeMsg: `नमस्ते! 👋 मैं आपका फार्म सहायक हूं। मैं आपकी मदद कर सकता हूं:
• पर्यावरण-अनुकूल कृषि प्रथाएं
• खेत मैपिंग और सीमाएं
• प्रमाण अपलोड प्रक्रिया
• कार्बन क्रेडिट और आय
• प्रमाणपत्र और खरीदार
• प्लेटफ़ॉर्म नेविगेशन

आज मैं आपकी कैसे मदद कर सकता हूं?`,
                quickActions: 'त्वरित क्रियाएं',
                ecoPractices: '🌱 पर्यावरण-अनुकूल प्रथाएं',
                farmMapping: '🗺️ मेरे खेत का नक्शा कैसे बनाएं',
                proofUpload: '📸 प्रमाण कैसे अपलोड करें',
                carbonCredits: '💰 कार्बन क्रेडिट और आय',
                certificate: '🧾 प्रमाणपत्र और खरीदार',
                platformHelp: '⚙️ प्लेटफ़ॉर्म सहायता',
                typePlaceholder: 'अपना प्रश्न यहां टाइप करें...',
                send: 'भेजें',
                disclaimer: 'यह सहायक मार्गदर्शन प्रदान करता है। अंतिम सत्यापन सिस्टम-आधारित है।',
                humanSupport: 'मानव सहायता से बात करें',
                typing: 'AI टाइप कर रहा है...',
                ecoPracticesResp: `🌱 **पर्यावरण-अनुकूल कृषि प्रथाएं**

हम 5 मुख्य प्रथाओं का समर्थन करते हैं:

1. **जैविक खेती** 🌾
   - रासायनिक उर्वरक नहीं
   - प्राकृतिक कीट नियंत्रण
   - ₹15,000/एकड़ तक अतिरिक्त कमाएं

2. **कृषि वानिकी** 🌳
   - फसलों के साथ पेड़ लगाएं
   - मिट्टी में सुधार + अतिरिक्त आय
   - सर्वोच्च कार्बन प्रभाव

3. **कम जुताई** 🚜
   - न्यूनतम मिट्टी गड़बड़ी
   - ईंधन और श्रम बचत

4. **फसल अवशेष प्रबंधन** ♻️
   - फसल अवशेष न जलाएं
   - खाद के रूप में उपयोग करें

5. **कुशल सिंचाई** 💧
   - ड्रिप/स्प्रिंकलर सिस्टम
   - 40-60% पानी बचाएं

क्या आप किसी विशिष्ट प्रथा पर विवरण चाहते हैं?`,
                farmMappingResp: `🗺️ **अपने खेत का नक्शा कैसे बनाएं**

चरण-दर-चरण गाइड:

1. **फार्म मैपिंग पेज पर जाएं**
   - डैशबोर्ड से → फार्म मैपिंग

2. **खेत का विवरण दर्ज करें**
   - भूमि का आकार (एकड़)
   - फसल का प्रकार
   - गाँव/जिला

3. **अपनी सीमा खींचें**
   - "सीमा खींचें" टैप करें
   - अपने खेत के किनारों के चारों ओर क्लिक करें
   - सभी कोनों को चिह्नित करें
   - "मैपिंग पूर्ण करें" टैप करें

4. **सत्यापित करें और सहेजें**
   - सीमा की जांच करें
   - सिस्टम क्षेत्र की गणना करता है
   - अपना खेत सहेजें

📍 टिप: बेहतर सटीकता के लिए सैटेलाइट व्यू का उपयोग करें!

क्या आप चाहते हैं कि मैं आपको मैपिंग पेज पर ले जाऊं?`,
                proofUploadResp: `📸 **प्रमाण कैसे अपलोड करें**

3-चरणीय प्रक्रिया:

**चरण 1: अपना खेत चुनें**
- कौन सा खेत चुनें

**चरण 2: प्रथा चुनें**
- आपने क्या लागू किया?
- आपने कब शुरू किया?

**चरण 3: फोटो अपलोड करें**
- स्पष्ट, अच्छी रोशनी वाली फोटो लें
- पूरे प्रथा क्षेत्र को दिखाएं
- कई कोणों से मदद मिलती है
- फोटो ऑटो जियो-टैग

✅ **फोटो दिशानिर्देश:**
- स्पष्ट दृश्यता
- अच्छी रोशनी
- पूरा क्षेत्र दिखाएं
- यदि संभव हो तो तारीख शामिल करें

अपलोड के बाद, हमारी टीम 3-5 दिनों में सत्यापित करती है!

प्रमाण अपलोड करने के लिए तैयार हैं?`,
                carbonCreditsResp: `💰 **कार्बन क्रेडिट और आय**

यह कैसे काम करता है:

**1. क्रेडिट अर्जित करें**
- इको-प्रथाओं को अपनाएं
- प्रमाण अपलोड करें
- सत्यापित हों
- कार्बन क्रेडिट अर्जित करें

**2. क्रेडिट मूल्य**
- 1 क्रेडिट = 1 टन CO₂ कम
- ₹800-1,500 प्रति क्रेडिट
- खरीदार मांग पर निर्भर

**3. आपकी क्षमता**
- 5 एकड़ + जैविक खेती
- 10-25 क्रेडिट/वर्ष कमा सकते हैं
- ₹10,000 - ₹25,000 अतिरिक्त आय

**4. कैसे जांचें**
- डैशबोर्ड → कार्बन क्रेडिट
- अपना स्कोर देखें
- सत्यापित क्रेडिट देखें

अपने वर्तमान क्रेडिट देखना चाहते हैं?`,
                certificateResp: `🧾 **प्रमाणपत्र और खरीदार**

**आपके प्रमाणपत्र में शामिल है:**
✓ किसान आईडी
✓ कुल सत्यापित क्रेडिट
✓ सत्यापन स्थिति
✓ अद्वितीय प्रमाणपत्र आईडी
✓ सत्यापन के लिए QR कोड

**इच्छुक खरीदार:**
- टाटा मोटर्स
- इंफोसिस
- हिंदुस्तान यूनिलीवर
- रिलायंस इंडस्ट्रीज

**कैसे जुड़ें:**
1. मार्केटप्लेस पर जाएं
2. खरीदार आवश्यकताएं देखें
3. "कनेक्ट का अनुरोध करें" क्लिक करें
4. हमारी टीम परिचय की सुविधा देती है

📄 आप अपना प्रमाणपत्र डाउनलोड और साझा कर सकते हैं!

अपना प्रमाणपत्र देखना चाहते हैं?`,
                platformHelpResp: `⚙️ **प्लेटफ़ॉर्म सहायता**

**मुख्य सुविधाएं:**

📊 **डैशबोर्ड**
- अपने आंकड़े देखें
- त्वरित क्रियाएं
- सूचनाएं

🗺️ **फार्म मैपिंग**
- अपना खेत पंजीकृत करें
- सीमाएं खींचें
- GPS ट्रैकिंग

🌱 **इको-प्रथाएं**
- प्रथाओं के बारे में जानें
- लाभ देखें
- मार्गदर्शन प्राप्त करें

📸 **प्रमाण अपलोड**
- साक्ष्य जमा करें
- सत्यापन ट्रैक करें
- क्रेडिट अर्जित करें

💰 **मार्केटप्लेस**
- प्रमाणपत्र देखें
- खरीदार देखें
- बिक्री के लिए जुड़ें

**विशिष्ट सहायता चाहिए?**
- फार्म मैपिंग समस्या?
- अपलोड समस्या?
- प्रमाणपत्र प्रश्न?

बस पूछें! मैं मदद के लिए यहां हूं।`
            },
            mr: {
                title: 'AI फार्म सहाय्यक',
                subtitle: 'शेती, कार्बन क्रेडिट आणि प्लॅटफॉर्म वापरामध्ये मदत मिळवा',
                welcomeMsg: `नमस्कार! 👋 मी तुमचा फार्म सहाय्यक आहे. मी तुम्हाला मदत करू शकतो:
• पर्यावरण-अनुकूल शेती पद्धती
• शेत मॅपिंग आणि सीमा
• पुरावा अपलोड प्रक्रिया
• कार्बन क्रेडिट आणि उत्पन्न
• प्रमाणपत्र आणि खरेदीदार
• प्लॅटफॉर्म नेव्हिगेशन

आज मी तुम्हाला कशी मदत करू शकतो?`,
                quickActions: 'जलद क्रिया',
                ecoPractices: '🌱 पर्यावरण-अनुकूल पद्धती',
                farmMapping: '🗺️ माझ्या शेताचा नकाशा कसा तयार करावा',
                proofUpload: '📸 पुरावा कसा अपलोड करावा',
                carbonCredits: '💰 कार्बन क्रेडिट आणि उत्पन्न',
                certificate: '🧾 प्रमाणपत्र आणि खरेदीदार',
                platformHelp: '⚙️ प्लॅटफॉर्म मदत',
                typePlaceholder: 'तुमचा प्रश्न येथे टाइप करा...',
                send: 'पाठवा',
                disclaimer: 'हा सहाय्यक मार्गदर्शन प्रदान करतो. अंतिम सत्यापन प्रणाली-आधारित आहे.',
                humanSupport: 'मानवी सहाय्याशी बोला',
                typing: 'AI टाइप करत आहे...'
            }
        };
        return translations[language][key];
    };

    const quickActionButtons = [
        { id: 'ecoPractices', icon: '🌱', label: getTranslation('ecoPractices') },
        { id: 'farmMapping', icon: '🗺️', label: getTranslation('farmMapping') },
        { id: 'proofUpload', icon: '📸', label: getTranslation('proofUpload') },
        { id: 'carbonCredits', icon: '💰', label: getTranslation('carbonCredits') },
        { id: 'certificate', icon: '🧾', label: getTranslation('certificate') },
        { id: 'platformHelp', icon: '⚙️', label: getTranslation('platformHelp') }
    ];

    const addBotMessage = (type, customText = '') => {
        const text = customText || getTranslation(`${type}Msg`) || getTranslation(`${type}Resp`);
        const newMessage = {
            id: Date.now(),
            type: 'bot',
            text,
            timestamp: new Date()
        };
        setMessages(prev => [...prev, newMessage]);
    };

    const addUserMessage = (text) => {
        const newMessage = {
            id: Date.now(),
            type: 'user',
            text,
            timestamp: new Date()
        };
        setMessages(prev => [...prev, newMessage]);
    };

    const handleQuickAction = (actionId) => {
        const action = quickActionButtons.find(a => a.id === actionId);
        addUserMessage(action.label);

        setIsTyping(true);
        setTimeout(() => {
            setIsTyping(false);
            addBotMessage(actionId);
        }, 1500);
    };

    const handleSendMessage = () => {
        if (!inputText.trim()) return;

        addUserMessage(inputText);
        const userQuestion = inputText.toLowerCase();
        setInputText('');

        setIsTyping(true);
        setTimeout(() => {
            setIsTyping(false);

            // Simple keyword matching for demo
            if (userQuestion.includes('eco') || userQuestion.includes('practice') || userQuestion.includes('organic')) {
                addBotMessage('ecoPractices');
            } else if (userQuestion.includes('map') || userQuestion.includes('boundary') || userQuestion.includes('farm')) {
                addBotMessage('farmMapping');
            } else if (userQuestion.includes('proof') || userQuestion.includes('photo') || userQuestion.includes('upload')) {
                addBotMessage('proofUpload');
            } else if (userQuestion.includes('credit') || userQuestion.includes('income') || userQuestion.includes('money')) {
                addBotMessage('carbonCredits');
            } else if (userQuestion.includes('certificate') || userQuestion.includes('buyer')) {
                addBotMessage('certificate');
            } else if (userQuestion.includes('help') || userQuestion.includes('how')) {
                addBotMessage('platformHelp');
            } else {
                addBotMessage('', `I understand you're asking about "${inputText}". Let me help you with that! Please choose from the quick actions below, or ask me specifically about:
        
🌱 Eco-friendly practices
🗺️ Farm mapping
📸 Proof upload
💰 Carbon credits
🧾 Certificates

What would you like to know more about?`);
            }
        }, 1500);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    if (!user) return null;

    return (
        <div className="h-screen flex flex-col bg-gradient-to-br from-green-50 to-emerald-50">
            {/* Header */}
            <div className="bg-white shadow-md border-b border-gray-200">
                <div className="max-w-5xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                            <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg">
                                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                                <span className="text-2xl">🤖</span>
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-gray-900">{getTranslation('title')}</h1>
                                <p className="text-sm text-gray-600">{getTranslation('subtitle')}</p>
                            </div>
                        </div>

                        {/* Language Selector */}
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

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto">
                <div className="max-w-5xl mx-auto px-4 py-6">
                    {/* Messages */}
                    <div className="space-y-4">
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div className={`max-w-3xl ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                                    {message.type === 'bot' && (
                                        <div className="flex items-end gap-2 mb-2">
                                            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center flex-shrink-0">
                                                <span className="text-lg">🤖</span>
                                            </div>
                                            <span className="text-xs text-gray-500">AI Assistant</span>
                                        </div>
                                    )}

                                    <div
                                        className={`rounded-2xl px-6 py-4 ${message.type === 'bot'
                                                ? 'bg-white shadow-md border border-green-200'
                                                : 'bg-green-600 text-white shadow-lg'
                                            }`}
                                    >
                                        <p className="whitespace-pre-wrap text-sm leading-relaxed">{message.text}</p>
                                        <p className="text-xs mt-2 opacity-70">
                                            {message.timestamp.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Typing Indicator */}
                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="max-w-3xl">
                                    <div className="flex items-end gap-2 mb-2">
                                        <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                                            <span className="text-lg">🤖</span>
                                        </div>
                                        <span className="text-xs text-gray-500">{getTranslation('typing')}</span>
                                    </div>
                                    <div className="bg-white shadow-md border border-green-200 rounded-2xl px-6 py-4">
                                        <div className="flex gap-2">
                                            <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce"></div>
                                            <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                            <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Quick Actions (shown after welcome) */}
                        {messages.length === 1 && (
                            <div className="bg-white rounded-3xl shadow-xl p-6 border-2 border-green-200">
                                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <span>⚡</span>
                                    {getTranslation('quickActions')}
                                </h3>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    {quickActionButtons.map((action) => (
                                        <button
                                            key={action.id}
                                            onClick={() => handleQuickAction(action.id)}
                                            className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl hover:shadow-lg transition border-2 border-transparent hover:border-green-300 text-left"
                                        >
                                            <div className="text-3xl mb-2">{action.icon}</div>
                                            <div className="text-sm font-medium text-gray-800">{action.label}</div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>
                </div>
            </div>

            {/* Input Area */}
            <div className="bg-white border-t border-gray-200 shadow-lg">
                <div className="max-w-5xl mx-auto px-4 py-4">
                    <div className="flex items-end gap-3">
                        <div className="flex-1">
                            <textarea
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder={getTranslation('typePlaceholder')}
                                rows="1"
                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                                style={{ minHeight: '48px', maxHeight: '120px' }}
                            />
                        </div>

                        <button
                            onClick={handleSendMessage}
                            disabled={!inputText.trim()}
                            className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-bold hover:shadow-xl transition transform hover:scale-105 disabled:bg-gray-400 disabled:transform-none flex items-center gap-2"
                        >
                            <span>{getTranslation('send')}</span>
                            <span>➡️</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AIChatbotPage;