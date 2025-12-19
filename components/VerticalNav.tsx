
import React from 'react';

const NAV_ITEMS = [
  { id: "Epidemiología", label: "Epidemiología", icon: "fa-globe-americas", color: "text-cyan-400", bgColor: "bg-cyan-900/40" },
  { id: "Incubación", label: "Incubación", icon: "fa-hourglass-start", color: "text-blue-400", bgColor: "bg-blue-900/40" },
  { id: "Pródromo", label: "Pródromo", icon: "fa-stethoscope", color: "text-amber-400", bgColor: "bg-amber-900/40" },
  { id: "Exantema", label: "Exantema", icon: "fa-biohazard", color: "text-rose-400", bgColor: "bg-rose-900/40" },
  { id: "Recuperación", label: "Recuperación", icon: "fa-shield-virus", color: "text-emerald-400", bgColor: "bg-emerald-900/40" },
  { id: "Complicaciones", label: "Complicaciones", icon: "fa-exclamation-triangle", color: "text-orange-400", bgColor: "bg-orange-900/40" },
  { id: "Diagnóstico", label: "Diagnóstico", icon: "fa-vial", color: "text-fuchsia-400", bgColor: "bg-fuchsia-900/40" },
  { id: "Tratamiento", label: "Tratamiento", icon: "fa-pills", color: "text-violet-400", bgColor: "bg-violet-900/40" },
  { id: "Prevención", label: "Prevención", icon: "fa-syringe", color: "text-teal-400", bgColor: "bg-teal-900/40" }
];

interface NavProps {
  onSelect: (id: string) => void;
  selectedId: string | null;
  activeColor: string; // Recibimos el color de acento actual
}

const VerticalNav: React.FC<NavProps> = ({ onSelect, selectedId, activeColor }) => {
  return (
    <div className="flex flex-col h-full w-64 py-6 overflow-y-auto custom-scrollbar">
      <div className="px-6 mb-8">
        <h3 className={`text-[10px] font-black uppercase tracking-[0.3em] border-b-2 transition-all duration-700 pb-3 ${selectedId ? activeColor : 'text-yellow-500'} ${selectedId ? activeColor.replace('text', 'border').replace('400', '500/30') : 'border-yellow-500/30'}`}>
          Teselas del Universo
        </h3>
      </div>
      {NAV_ITEMS.map((item) => {
        const active = selectedId === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onSelect(item.id)}
            className={`flex items-center gap-4 px-6 py-4 text-left transition-all relative group ${
              active ? `${item.bgColor} border-r-4 border-white shadow-xl scale-105 z-10` : 'hover:bg-white/5 opacity-60 hover:opacity-100'
            }`}
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${active ? item.bgColor : 'bg-white/5 group-hover:bg-white/10'}`}>
               <i className={`fas ${item.icon} text-sm ${active ? item.color : 'text-white/40'}`}></i>
            </div>
            <span className={`text-[10px] font-black uppercase tracking-tight transition-colors ${active ? 'text-white' : 'text-slate-400'}`}>
              {item.label}
            </span>
            {active && (
              <div className="absolute left-0 w-1 h-6 bg-white rounded-r-full animate-pulse shadow-[0_0_10px_white]"></div>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default VerticalNav;
