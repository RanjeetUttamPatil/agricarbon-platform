import { useState } from 'react';

const LandingPage = ({ onGetStarted }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const features = [
    {
      icon: '🗺️',
      title: 'Smart Farm Mapping',
      titleHi: 'स्मार्ट फार्म मैपिंग',
      description: 'GPS-enabled boundary marking with satellite integration',
      descriptionHi: 'सैटेलाइट एकीकरण के साथ GPS-सक्षम सीमा अंकन'
    },
    {
      icon: '💚',
      title: 'Carbon Credit Earning',
      titleHi: 'कार्बन क्रेडिट कमाई',
      description: 'Turn sustainable practices into verified carbon credits',
      descriptionHi: 'टिकाऊ प्रथाओं को सत्यापित कार्बन क्रेडिट में बदलें'
    },
    {
      icon: '🤖',
      title: 'AI Recommendations',
      titleHi: 'AI सिफारिशें',
      description: 'Get personalized suggestions to increase your income',
      descriptionHi: 'अपनी आय बढ़ाने के लिए व्यक्तिगत सुझाव प्राप्त करें'
    },
    {
      icon: '📸',
      title: 'Easy Proof Upload',
      titleHi: 'आसान प्रमाण अपलोड',
      description: 'Geo-tagged photo verification without costly audits',
      descriptionHi: 'महंगे ऑडिट के बिना जियो-टैग फोटो सत्यापन'
    },
    {
      icon: '🏪',
      title: 'Open Marketplace',
      titleHi: 'खुला बाजार',
      description: 'Sell your credits directly to companies & buyers',
      descriptionHi: 'अपने क्रेडिट सीधे कंपनियों और खरीदारों को बेचें'
    },
    {
      icon: '🔔',
      title: 'Smart Alerts',
      titleHi: 'स्मार्ट अलर्ट',
      description: 'Timely reminders for proof uploads and best practices',
      descriptionHi: 'प्रमाण अपलोड और सर्वोत्तम प्रथाओं के लिए समय पर अनुस्मारक'
    }
  ];

  const stats = [
    { value: '10,000+', label: 'Farmers Registered', labelHi: 'पंजीकृत किसान' },
    { value: '50,000+', label: 'Tons CO₂ Reduced', labelHi: 'टन CO₂ कम किया' },
    { value: '₹2Cr+', label: 'Credits Traded', labelHi: 'क्रेडिट का व्यापार' },
    { value: '15+', label: 'States Covered', labelHi: 'राज्य कवर किए गए' }
  ];

  const testimonials = [
    {
      name: 'राम प्रसाद',
      location: 'पंजाब',
      image: '👨‍🌾',
      text: 'मैंने 6 महीने में ₹45,000 अतिरिक्त कमाए। बहुत आसान प्रक्रिया!',
      textEn: 'I earned ₹45,000 extra in 6 months. Very easy process!',
      rating: 5
    },
    {
      name: 'सुनीता देवी',
      location: 'महाराष्ट्र',
      image: '👩‍🌾',
      text: 'AI सिफारिशों ने मेरी फसल उत्पादकता 30% बढ़ा दी।',
      textEn: 'AI recommendations increased my crop productivity by 30%.',
      rating: 5
    },
    {
      name: 'अरविंद कुमार',
      location: 'हरियाणा',
      image: '👨‍🌾',
      text: 'मेरा ग्रीन स्कोर 85 है। गर्व महसूस होता है!',
      textEn: 'My green score is 85. Feel so proud!',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🌾</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                AgriCarbon
              </span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-gray-700 hover:text-green-600 font-medium transition">Features</a>
              <a href="#how-it-works" className="text-gray-700 hover:text-green-600 font-medium transition">How It Works</a>
              <a href="#testimonials" className="text-gray-700 hover:text-green-600 font-medium transition">Testimonials</a>
              <button
                onClick={onGetStarted}
                className="px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-semibold hover:shadow-lg transition transform hover:scale-105"
              >
                Get Started
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t">
              <div className="flex flex-col gap-4">
                <a href="#features" className="text-gray-700 hover:text-green-600 font-medium">Features</a>
                <a href="#how-it-works" className="text-gray-700 hover:text-green-600 font-medium">How It Works</a>
                <a href="#testimonials" className="text-gray-700 hover:text-green-600 font-medium">Testimonials</a>
                <button
                  onClick={onGetStarted}
                  className="px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-semibold"
                >
                  Get Started
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-20 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold mb-6">
                🌱 India's First Carbon Credit Platform for Farmers
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Turn Your <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Green Farming</span> Into Income
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Earn carbon credits by adopting sustainable farming practices. Get AI-powered recommendations, easy verification, and direct access to buyers.
              </p>
              <p className="text-lg text-gray-600 mb-8 font-hindi">
                टिकाऊ कृषि प्रथाओं को अपनाकर कार्बन क्रेडिट अर्जित करें। AI-संचालित सिफारिशें, आसान सत्यापन, और खरीदारों तक सीधी पहुंच प्राप्त करें।
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={onGetStarted}
                  className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-bold text-lg hover:shadow-2xl transition transform hover:scale-105"
                >
                  Start Earning Now →
                </button>
                {/* <button className="px-8 py-4 border-2 border-green-600 text-green-600 rounded-xl font-bold text-lg hover:bg-green-50 transition">
                  Watch Demo
                </button> */}
              </div>
            </div>
            <div className="relative">
              <div className="relative z-10 bg-white rounded-3xl shadow-2xl p-8 transform rotate-2 hover:rotate-0 transition duration-300">
                <div className="text-6xl mb-4 text-center">🌾</div>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-green-50 rounded-xl p-4 text-center">
                    <div className="text-3xl font-bold text-green-600">85</div>
                    <div className="text-sm text-gray-600">Green Score</div>
                  </div>
                  <div className="bg-blue-50 rounded-xl p-4 text-center">
                    <div className="text-3xl font-bold text-blue-600">24.5</div>
                    <div className="text-sm text-gray-600">Credits Earned</div>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-4">
                  <div className="text-sm text-gray-600 mb-1">Total Earnings</div>
                  <div className="text-4xl font-bold text-yellow-700">₹45,000</div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-full h-full bg-gradient-to-br from-green-200 to-emerald-300 rounded-3xl -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-green-600 mb-2">{stat.value}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
                <div className="text-gray-500 text-sm font-hindi">{stat.labelHi}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gradient-to-br from-gray-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Powerful Features for Modern Farmers
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to earn carbon credits and increase your farm income
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center text-4xl mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 mb-2">{feature.description}</p>
                <p className="text-gray-500 text-sm font-hindi">{feature.descriptionHi}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">Simple 4-step process to start earning</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '1', icon: '📱', title: 'Register', titleHi: 'पंजीकरण करें', desc: 'Sign up with mobile number' },
              { step: '2', icon: '🗺️', title: 'Map Farm', titleHi: 'खेत की मैपिंग', desc: 'Mark your farm boundaries' },
              { step: '3', icon: '🌱', title: 'Adopt Practices', titleHi: 'प्रथाएं अपनाएं', desc: 'Follow eco-friendly farming' },
              { step: '4', icon: '💰', title: 'Earn Credits', titleHi: 'क्रेडिट कमाएं', desc: 'Get verified and sell credits' }
            ].map((item, idx) => (
              <div key={idx} className="relative">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 text-center hover:shadow-xl transition">
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {item.step}
                  </div>
                  <div className="text-6xl mb-4 mt-4">{item.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm mb-1">{item.desc}</p>
                  <p className="text-gray-500 text-xs font-hindi">{item.titleHi}</p>
                </div>
                {idx < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-green-300 text-3xl">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              What Farmers Say
            </h2>
            <p className="text-xl text-gray-600">Real success stories from our community</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-xl">★</span>
                  ))}
                </div>
                <p className="text-gray-700 mb-4 font-hindi leading-relaxed">{testimonial.text}</p>
                <p className="text-gray-600 text-sm mb-6 italic">{testimonial.textEn}</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-2xl">
                    {testimonial.image}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{testimonial.name}</div>
                    <div className="text-gray-600 text-sm">📍 {testimonial.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-emerald-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Start Your Green Journey?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Join 10,000+ farmers already earning from sustainable practices
          </p>
          <button
            onClick={onGetStarted}
            className="px-12 py-4 bg-white text-green-600 rounded-xl font-bold text-xl hover:shadow-2xl transition transform hover:scale-105"
          >
            Get Started Free →
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-3xl">🌾</span>
                <span className="text-xl font-bold">AgriCarbon</span>
              </div>
              <p className="text-gray-400">Empowering farmers through carbon credits</p>
            </div>
            <div>
              <h3 className="font-bold mb-4">Quick Links</h3>
              <div className="space-y-2 text-gray-400">
                <div>About Us</div>
                <div>How It Works</div>
                <div>Contact</div>
              </div>
            </div>
            <div>
              <h3 className="font-bold mb-4">Resources</h3>
              <div className="space-y-2 text-gray-400">
                <div>Help Center</div>
                <div>FAQs</div>
                <div>Blog</div>
              </div>
            </div>
            <div>
              <h3 className="font-bold mb-4">Legal</h3>
              <div className="space-y-2 text-gray-400">
                <div>Privacy Policy</div>
                <div>Terms of Service</div>
                <div>Cookie Policy</div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>© 2025 AgriCarbon. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;