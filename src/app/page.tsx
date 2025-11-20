import Link from "next/link";
import { Header } from "./components/Header";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col relative overflow-hidden">
      {/* Gradient overlay top right */}
      <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-[#8B7BCF]/80 blur-[150px] rounded-full"></div>
      {/* Gradient overlay bottom left */}
      <div className="absolute bottom-0 left-0 w-1/2 h-1/3 bg-[#EF9364]/80 blur-[150px] rounded-full"></div>
      
      <div className="relative z-10 min-h-screen flex flex-col">
      {/* Header */}
      <Header theme="dark" />

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Bienvenido a
          <br />
          <span className="bg-gradient-to-r from-[#b185a7] via-[#d4a574] to-[#e8943f] bg-clip-text text-transparent">Buho</span>
        </h1>
        
        <p className="text-lg md:text-xl text-neutral-300 mb-12 max-w-2xl">
          Buho es tu asistente de blockchain, podes preguntarle sobre direcciones, transacciones, tokens, etc.
        </p>

        <Link
          href="/app"
          className="px-8 py-4 bg-transparent border-2 border-white text-white font-medium rounded-full hover:bg-white hover:text-black transition-all text-lg inline-flex items-center gap-2"
        >
          Chatea con Buho <span>→</span>
        </Link>
      </main>
      </div>
    </div>
  );
}
