
import React, { useState, useCallback } from 'react';
import FloatingUI from './components/FloatingUI';
import InteractiveExplorer from './components/InteractiveExplorer';
import Quiz from './components/Quiz';
import AIAssistant from './components/AIAssistant';
import VerticalNav from './components/VerticalNav';
import { MEASLES_DATA } from './constants';

const NAV_ORDER = ["Epidemiología", "Incubación", "Pródromo", "Exantema", "Recuperación", "Complicaciones", "Diagnóstico", "Tratamiento", "Prevención"];

const App: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showLabels, setShowLabels] = useState(true);
  const selectedData = selectedId ? MEASLES_DATA[selectedId] : null;

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
    <div className="relative w-full h-screen flex flex-col text-white overflow-hidden font-sans">
      <FloatingUI />
      
      {/* Header Estilo Mosaico */}
      <div className="absolute top-4 left-6 z-40 flex flex-col gap-1 pointer-events-none">
        <h1 className="text-3xl md:text-4xl font-black tracking-tighter flex items-center gap-4">
          <div className="bg-gradient-to-br from-yellow-400 to-orange-600 p-2.5 rounded-2xl shadow-2xl border-2 border-white/40 rotate-3">
            <i className="fas fa-virus-covid text-xl text-white"></i>
          </div>
          <span className="drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)] bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200 uppercase">
            Guía Médica Trencadís
          </span>
        </h1>
        <p className="text-yellow-400 font-black text-[10px] tracking-[0.3em] uppercase mt-1 drop-shadow-md">
          Especialidad: Infectología Viral Avanzada
        </p>
      </div>

      <div className="flex-1 flex overflow-hidden pt-24">
        {/* Nav Lateral con Colores Vivos */}
        <div className="bg-blue-900/60 backdrop-blur-xl border-r-4 border-yellow-500/50 shadow-2xl z-20">
          <VerticalNav onSelect={setSelectedId} selectedId={selectedId} />
        </div>

        <div className="flex-1 flex flex-col md:flex-row min-w-0">
          {/* Canvas - Área del Explorer */}
          <div className="flex-[0.55] relative min-h-0 bg-black/10">
            <InteractiveExplorer 
              onSelectItem={setSelectedId} 
              onNavigate={handleNavigate}
              showLabels={showLabels} 
            />
          </div>

          {/* Panel de Contenido con Colores Tierra/Fuego */}
          <div className="flex-[0.45] flex flex-col bg-gradient-to-b from-orange-900/80 to-red-950/90 backdrop-blur-2xl overflow-y-auto border-l-4 border-orange-500/50 shadow-inner z-10">
            {!selectedData ? (
              <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
                <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6 border border-white/10">
                  <i className="fas fa-hand-pointer text-4xl text-yellow-500 animate-bounce"></i>
                </div>
                <h3 className="text-xl font-black text-white uppercase tracking-widest">Inicia la Exploración</h3>
                <p className="text-orange-200 text-xs mt-4 font-bold max-w-xs mx-auto">Pulsa un fragmento del universo clínico para diagnosticar.</p>
              </div>
            ) : (
              <div className="p-8 md:p-10 space-y-8 animate-in zoom-in-95 duration-500">
                <header className="space-y-4">
                  <span className="px-4 py-1.5 rounded-full bg-yellow-400 text-orange-900 text-[10px] font-black uppercase tracking-widest shadow-lg">
                    {selectedData.type.toUpperCase()}
                  </span>
                  <h2 className="text-4xl md:text-5xl font-black text-white leading-tight drop-shadow-lg">{selectedData.title}</h2>
                  <div className="h-1.5 w-24 bg-gradient-to-r from-yellow-400 to-red-500 rounded-full"></div>
                </header>

                <div className="prose prose-invert max-w-none">
                  <p className="text-lg md:text-xl text-orange-50 leading-relaxed font-medium text-justify">
                    {selectedData.content}
                  </p>
                </div>

                <div className="p-6 bg-white/10 rounded-3xl border-2 border-yellow-500/30 flex items-center gap-4">
                  <i className="fas fa-circle-info text-2xl text-yellow-400"></i>
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-widest text-yellow-500">Nota del Especialista</h4>
                    <p className="text-sm text-white font-bold italic">Protocolo vigente bajo estándares internacionales 2024.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quiz Ajustado - Más altura y scrollable */}
      <div className="h-[32vh] border-t-4 border-emerald-400/50 bg-emerald-900/80 backdrop-blur-3xl relative z-30 shadow-[0_-15px_30px_rgba(0,0,0,0.5)] overflow-hidden">
        <Quiz />
      </div>

      <AIAssistant />
    </div>
  );
};

export default App;
