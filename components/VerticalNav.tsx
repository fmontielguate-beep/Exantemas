
import React from 'react';

const NAV_ITEMS = [
  { id: "Epidemiología", label: "Epidemiología", icon: "fa-globe-americas", color: "text-cyan-400", bgColor: "bg-cyan-900/40" },
  { id: "Incubación", label: "Incubación", icon: "fa-hourglass-start", color: "text-blue-400", bgColor: "bg-blue-900/40" },
  { id: "Pródromo", label: "Pródromo", icon: "fa-stethoscope", color: "text-yellow-400", bgColor: "bg-yellow-900/40" },
  { id: "Exantema", label: "Exantema", icon: "fa-biohazard", color: "text-red-400", bgColor: "bg-red-900/40" },
  { id: "Recuperación", label: "Recuperación", icon: "fa-shield-virus", color: "text-emerald-400", bgColor: "bg-emerald-900/40" },
  { id: "Complicaciones", label: "Complicaciones", icon: "fa-exclamation-triangle", color: "text-orange-400", bgColor: "bg-orange-900/40" },
  { id: "Diagnóstico", label: "Diagnóstico", icon: "fa-vial", color: "text-pink-400", bgColor: "bg-pink-900/40" },
  { id: "Tratamiento", label: "Tratamiento", icon: "fa-pills", color: "text-purple-400", bgColor: "bg-purple-900/40" },
  { id: "Prevención", label: "Prevención", icon: "fa-syringe", color: "text-teal-400", bgColor: "bg-teal-900/40" }
];

const VerticalNav: React.FC<{onSelect: (id: string) => void, selectedId: string | null}> = ({ onSelect, selectedId }) => {
  return (
    <div className="flex flex-col h-full w-56 py-6 overflow-y-auto custom-scrollbar">
      <div className="px-6 mb-8">
        <h3 className="text-xs font-black text-yellow-500 uppercase tracking-widest border-b-2 border-yellow-500/30 pb-2">Teselas Clínicas</h3>
      </div>
      {NAV_ITEMS.map((item) => {
        const active = selectedId === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onSelect(item.id)}
            className={`flex items-center gap-4 px-6 py-4 text-left transition-all relative ${
              active ? `${item.bgColor} border-r-4 border-white shadow-xl scale-105 z-10` : 'hover:bg-white/5 opacity-70 hover:opacity-100'
            }`}
          >
            <i className={`fas ${item.icon} text-lg ${active ? item.color : 'text-white'}`}></i>
            <span className={`text-xs font-black uppercase tracking-tight ${active ? 'text-white' : 'text-blue-100'}`}>
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default VerticalNav;
