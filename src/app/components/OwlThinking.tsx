"use client";

export function OwlThinking() {
  return (
    <div className="flex justify-start">
      <div className="relative bg-gradient-to-br from-indigo-950 via-purple-900 to-indigo-900 rounded-2xl px-8 py-6 shadow-2xl border border-purple-500/30 overflow-hidden">
        {/* Fondo estrellado animado */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-2 left-4 w-1 h-1 bg-yellow-300 rounded-full animate-twinkle" style={{ animationDelay: "0s" }} />
          <div className="absolute top-8 left-12 w-0.5 h-0.5 bg-blue-200 rounded-full animate-twinkle" style={{ animationDelay: "0.3s" }} />
          <div className="absolute top-4 right-6 w-1 h-1 bg-purple-200 rounded-full animate-twinkle" style={{ animationDelay: "0.6s" }} />
          <div className="absolute bottom-6 left-8 w-0.5 h-0.5 bg-indigo-200 rounded-full animate-twinkle" style={{ animationDelay: "0.9s" }} />
          <div className="absolute top-10 right-12 w-1 h-1 bg-pink-200 rounded-full animate-twinkle" style={{ animationDelay: "1.2s" }} />
          <div className="absolute bottom-4 right-4 w-0.5 h-0.5 bg-cyan-200 rounded-full animate-twinkle" style={{ animationDelay: "1.5s" }} />
        </div>

        <div className="relative flex items-center gap-4">
          {/* Luna creciente de fondo */}
          <div className="absolute -left-2 top-1/2 -translate-y-1/2 text-4xl opacity-20 animate-moon-glow">
            🌙
          </div>

          {/* Búho con animación elaborada */}
          <div className="relative z-10">
            <div className="text-4xl animate-owl-hunt">
              🦉
            </div>
            {/* Resplandor mágico alrededor del búho */}
            <div className="absolute inset-0 -m-3 bg-gradient-radial from-purple-400/40 via-transparent to-transparent rounded-full animate-pulse-glow blur-md" />
            <div className="absolute inset-0 -m-2 bg-gradient-radial from-blue-400/30 via-transparent to-transparent rounded-full animate-pulse-glow-delayed blur-lg" />
          </div>
          
          {/* Texto pensando con efectos mejorados */}
          <div className="relative z-10 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="text-sm text-purple-100 font-semibold tracking-wide">
                Buscando en la blockchain
              </span>
              <div className="flex gap-1">
                <span 
                  className="w-1.5 h-1.5 bg-yellow-300 rounded-full animate-thinking-dot-glow"
                  style={{ animationDelay: "0ms" }}
                />
                <span 
                  className="w-1.5 h-1.5 bg-purple-300 rounded-full animate-thinking-dot-glow"
                  style={{ animationDelay: "200ms" }}
                />
                <span 
                  className="w-1.5 h-1.5 bg-blue-300 rounded-full animate-thinking-dot-glow"
                  style={{ animationDelay: "400ms" }}
                />
              </div>
            </div>
            
            {/* Barra de progreso mística */}
            <div className="w-48 h-1 bg-purple-950/50 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 animate-loading-bar rounded-full" />
            </div>
          </div>
        </div>

        {/* Partículas flotantes */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-purple-400/20 rounded-full animate-float-up" style={{ animationDelay: "0s" }} />
          <div className="absolute top-1/2 left-2/3 w-1.5 h-1.5 bg-blue-400/20 rounded-full animate-float-up" style={{ animationDelay: "0.5s" }} />
          <div className="absolute top-3/4 left-1/2 w-2 h-2 bg-pink-400/20 rounded-full animate-float-up" style={{ animationDelay: "1s" }} />
        </div>
      </div>
    </div>
  );
}

