import { useState } from 'react';

const FloatingChatButton = ({ onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-full shadow-2xl hover:shadow-3xl transition transform hover:scale-110 z-50 flex items-center justify-center"
    >
      <span className="text-3xl">🧑‍🌾</span>
      
      {isHovered && (
        <div className="absolute bottom-20 right-0 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm whitespace-nowrap">
          AI Farm Assistant
        </div>
      )}
    </button>
  );
};

export default FloatingChatButton;