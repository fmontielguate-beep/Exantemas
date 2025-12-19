
import React from 'react';

const FloatingUI: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
      {/* Fondo Base Vibrante */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-900 to-emerald-900 opacity-90"></div>
      
      {/* Patrón de Mosaico (Trencadis) */}
      <div 
        className="absolute inset-0 opacity-20" 
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18 L30 5 L50 15 L70 5 L90 20 L95 50 L80 85 L50 95 L20 85 L5 50 Z' fill='none' stroke='white' stroke-width='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: '150px 150px'
        }}
      ></div>

      {/* Blobs de Color Saturado */}
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-blue-400/30 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-orange-500/20 rounded-full blur-[120px]"></div>
      <div className="absolute top-[20%] right-[10%] w-[40%] h-[40%] bg-pink-500/20 rounded-full blur-[100px]"></div>
      
      {/* Elementos Flotantes "Teselas" */}
      {[...Array(15)].map((_, i) => (
        <div 
          key={i}
          className="absolute bg-white/10 backdrop-blur-sm"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${10 + Math.random() * 30}px`,
            height: `${10 + Math.random() * 30}px`,
            clipPath: 'polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)',
            transform: `rotate(${Math.random() * 360}deg)`,
            animation: `floatMosaic ${15 + Math.random() * 15}s infinite linear`
          }}
        ></div>
      ))}

      <style>{`
        @keyframes floatMosaic {
          0% { transform: translate(0, 0) rotate(0deg); opacity: 0.1; }
          50% { transform: translate(20px, -30px) rotate(180deg); opacity: 0.3; }
          100% { transform: translate(0, 0) rotate(360deg); opacity: 0.1; }
        }
      `}</style>
    </div>
  );
};

export default FloatingUI;
