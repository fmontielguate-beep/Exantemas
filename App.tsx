
import React, { useState, useCallback, useMemo } from 'react';
import FloatingUI from './components/FloatingUI';
import InteractiveExplorer, { TOPIC_COLORS } from './components/InteractiveExplorer';
import Quiz from './components/Quiz';
import AIAssistant from './components/AIAssistant';
import VerticalNav from './components/VerticalNav';
import { MEASLES_DATA } from './constants';

const NAV_ORDER = ["Epidemiología", "Incubación", "Pródromo", "Exantema", "Recuperación", "Complicaciones", "Diagnóstico", "Tratamiento", "Prevención"];

const App: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showLabels, setShowLabels] = useState(true);
  const selectedData = selectedId ? MEASLES_DATA[selectedId] : null;

  // Generamos dinámicamente el estilo del panel basado en el color del planeta
  const currentTheme = useMemo(() => {
    if (!selectedId) return { 
      gradient: "from-slate-900 via-slate-950 to-black", 
      accent: "text-yellow-500", 
      bgAccent: "bg-yellow-500",
      borderAccent: "border-yellow-500/50",
      text: "text-orange-200" 
    };

    const themeMap: Record<string, any> = {
      "Epidemiología": { gradient: "from-cyan-950 via-slate-950 to-black", accent: "text-cyan-400", bgAccent: "bg-cyan-500", borderAccent: "border-cyan-500/50", text: "text-cyan-50" },
      "Incubación": { gradient: "from-blue-950 via-slate-950 to-black", accent: "text-blue-400", bgAccent: "bg-blue-500", borderAccent: "border-blue-500/50", text: "text-blue-50" },
      "Pródromo": { gradient: "from-amber-950 via-slate-950 to-black", accent: "text-amber-400", bgAccent: "bg-amber-500", borderAccent: "border-amber-500/50", text: "text-amber-50" },
      "Exantema": { gradient: "from-rose-950 via-slate-950 to-black", accent: "text-rose-400", bgAccent: "bg-rose-500", borderAccent: "border-rose-500/50", text: "text-rose-50" },
      "Recuperación": { gradient: "from-emerald-950 via-slate-950 to-black", accent: "text-emerald-400", bgAccent: "bg-emerald-500", borderAccent: "border-emerald-500/50", text: "text-emerald-50" },
      "Complicaciones": { gradient: "from-orange-950 via-slate-950 to-black", accent: "text-orange-400", bgAccent: "bg-orange-500", borderAccent: "border-orange-500/50", text: "text-orange-50" },
      "Diagnóstico": { gradient: "from-fuchsia-950 via-slate-950 to-black", accent: "text-fuchsia-400", bgAccent: "bg-fuchsia-500", borderAccent: "border-fuchsia-500/50", text: "text-fuchsia-50" },
      "Tratamiento": { gradient: "from-violet-950 via-slate-950 to-black", accent: "text-violet-400", bgAccent: "bg-violet-500", borderAccent: "border-violet-500/50", text: "text-violet-50" },
      "Prevención": { gradient: "from-teal-950 via-slate-950 to-black", accent: "text-teal-400", bgAccent: "bg-teal-500", borderAccent: "border-teal-500/50", text: "text-teal-50" }
    };

    return themeMap[selectedId] || themeMap["Epidemiología"];
  }, [selectedId]);

  const handleNavigate = useCallback((direction: 'prev' | 'next' | 'reset') => {
    if (direction === 'reset') { setSelectedId(null); return; }
    const currentIndex = selectedId ? NAV_ORDER.indexOf(selectedId) : -1;
    if (direction === 'next') {
      setSelectedId(NAV_ORDER[(currentIndex + 1) % NAV_ORDER.length]);
    } else if (direction === 'prev') {
      setSelectedId(NAV_ORDER[currentIndex <= 0 ? NAV_ORDER.length - 1 : currentIndex - 1]);
    }
  }, [selectedId]);

  return (
    <div className="relative w-full h-screen grid grid-rows-[80px_1fr_32vh] overflow-hidden bg-slate-950 font-sans">
      <FloatingUI />
      
      {/* HEADER: Fila 1 */}
      <header className="z-40 flex items-center justify-between px-8 bg-blue-900/40 backdrop-blur-md border-b-4 border-yellow-500/50 shadow-2xl">
        <div className="flex items-center gap-5">
          <div className="bg-gradient-to-br from-yellow-400 via-orange-500 to-red-600 p-2.5 rounded-xl shadow-[0_0_20px_rgba(245,158,11,0.5)] border-2 border-white/30 rotate-3 transform hover:rotate-0 transition-transform cursor-pointer">
            <i className="fas fa-virus-covid text-2xl text-white"></i>
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-black tracking-tighter text-white drop-shadow-lg uppercase italic">
              Universo <span className="text-yellow-400">Trencadís</span> Médico
            </h1>
            <p className="text-[9px] text-cyan-300 font-black tracking-[0.4em] uppercase opacity-80">Morbillivirus Specialized Explorer</p>
          </div>
        </div>
        
        <button 
          onClick={() => setShowLabels(!showLabels)}
          className={`px-6 py-2 rounded-full border-2 text-[10px] font-black tracking-widest uppercase transition-all shadow-lg ${
            showLabels 
            ? 'bg-yellow-400 border-yellow-200 text-orange-900' 
            : 'bg-white/10 border-white/20 text-white'
          }`}
        >
          Etiquetas: {showLabels ? 'ON' : 'OFF'}
        </button>
      </header>

      {/* WORKSPACE: Fila 2 */}
      <main className="flex overflow-hidden relative">
        {/* Nav Lateral con Borde Dinámico */}
        <aside className={`w-64 bg-slate-950/80 backdrop-blur-xl border-r-4 ${currentTheme.borderAccent} shadow-2xl overflow-y-auto custom-scrollbar transition-all duration-700`}>
          <VerticalNav onSelect={setSelectedId} selectedId={selectedId} activeColor={currentTheme.accent} />
        </aside>

        <div className="flex-1 flex min-w-0">
          {/* Explorer Central */}
          <section className="flex-[0.45] relative bg-black/20 border-r border-white/5 overflow-hidden">
            <InteractiveExplorer 
              onSelectItem={setSelectedId} 
              onNavigate={handleNavigate}
              showLabels={showLabels} 
            />
          </section>

          {/* Panel Info (Nodo de Diagnóstico) - Color Dinámico */}
          <article className={`flex-[0.55] bg-gradient-to-br ${currentTheme.gradient} backdrop-blur-3xl border-l-4 border-yellow-600/50 shadow-[-20px_0_40px_rgba(0,0,0,0.5)] overflow-y-auto custom-scrollbar relative z-10 transition-all duration-700`}>
            {!selectedData ? (
              <div className="h-full flex flex-col items-center justify-center p-16 text-center space-y-8 animate-in fade-in duration-1000">
                <div className="relative">
                  <div className="absolute inset-0 bg-yellow-500/20 blur-[50px] rounded-full"></div>
                  <div className="w-28 h-28 rounded-3xl bg-white/5 border-2 border-dashed border-white/20 flex items-center justify-center animate-pulse relative z-10">
                    <i className="fas fa-microscope text-6xl text-yellow-500/40"></i>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-3xl font-black text-white uppercase tracking-tighter">Nodo de Diagnóstico</h3>
                  <p className="text-orange-200 text-base font-bold leading-relaxed max-w-sm italic opacity-80">
                    "Seleccione una tesela para sincronizar la atmósfera visual de toda la estación de análisis."
                  </p>
                </div>
              </div>
            ) : (
              <div key={selectedId} className="p-12 space-y-12 animate-in slide-in-from-right-16 fade-in duration-500">
                <header className="relative space-y-4">
                  <div className="flex items-center gap-4">
                    <span className={`px-4 py-1.5 rounded-lg bg-white text-slate-900 text-[10px] font-black uppercase tracking-widest shadow-xl`}>
                      {selectedData.type.toUpperCase()}
                    </span>
                    <span className={`${currentTheme.accent} font-black text-[10px] uppercase tracking-widest border-b border-current opacity-70`}>TESELA ID: {selectedData.id}</span>
                  </div>
                  <h2 className="text-6xl font-black text-white leading-[0.85] drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)] uppercase tracking-tighter">
                    {selectedData.title}
                  </h2>
                  <div className={`h-2.5 w-40 ${currentTheme.bgAccent} opacity-40 rounded-full mt-8 shadow-[0_0_20px_rgba(255,255,255,0.3)]`}></div>
                </header>

                <div className="space-y-8">
                  <div className="relative">
                    <div className={`absolute -left-6 top-0 bottom-0 w-1.5 ${currentTheme.bgAccent} rounded-full opacity-60 shadow-[0_0_20px_currentColor]`}></div>
                    <p className={`text-2xl ${currentTheme.text} leading-relaxed font-bold text-justify tracking-tight italic transition-colors duration-500`}>
                      {selectedData.content}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div className={`p-6 bg-black/40 rounded-3xl border border-white/10 group hover:border-white/30 transition-all shadow-xl`}>
                      <div className={`w-10 h-10 rounded-xl ${currentTheme.bgAccent}/20 flex items-center justify-center mb-4 transition-all duration-500`}>
                        <i className={`fas fa-fingerprint ${currentTheme.accent}`}></i>
                      </div>
                      <h5 className="text-xs font-black uppercase text-slate-400 tracking-widest mb-1">Atmósfera</h5>
                      <p className="text-lg font-black text-white uppercase tracking-tighter italic">Sincronizada</p>
                    </div>
                    <div className={`p-6 bg-black/40 rounded-3xl border border-white/10 group hover:border-white/30 transition-all shadow-xl`}>
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center mb-4">
                        <i className="fas fa-check-double text-emerald-400"></i>
                      </div>
                      <h5 className="text-xs font-black uppercase text-slate-400 tracking-widest mb-1">Evidencia</h5>
                      <p className="text-lg font-black text-white">OMS/CDC 2024</p>
                    </div>
                  </div>
                </div>

                <footer className="pt-12 border-t border-white/10 flex flex-col gap-4">
                  <div className={`p-6 bg-white/5 rounded-2xl border border-white/5 flex items-start gap-4`}>
                    <i className={`fas fa-circle-info ${currentTheme.accent} mt-1`}></i>
                    <p className="text-sm text-white/60 font-medium italic">
                      La interfaz ha adaptado su esquema de color para que coincida con la firma espectral del planeta seleccionado.
                    </p>
                  </div>
                  <button 
                    onClick={() => setSelectedId(null)}
                    className="w-full py-5 rounded-2xl bg-white/5 border-2 border-white/10 text-white font-black uppercase tracking-[0.4em] hover:bg-white/10 hover:border-white/30 transition-all text-xs group"
                  >
                    <i className="fas fa-chevron-left mr-3 transition-transform group-hover:-translate-x-1"></i> Desacoplar Datos
                  </button>
                </footer>
              </div>
            )}
          </article>
        </div>
      </main>

      {/* QUIZ: Fila 3 */}
      <section className="z-30 bg-emerald-950/95 backdrop-blur-3xl border-t-4 border-emerald-400/60 shadow-[0_-10px_50px_rgba(0,0,0,0.9)] overflow-hidden">
        <Quiz />
      </section>

      <AIAssistant />
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(0,0,0,0.3); }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; border: 3px solid transparent; background-clip: content-box; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.25); }
      `}</style>
    </div>
  );
};

export default App;
