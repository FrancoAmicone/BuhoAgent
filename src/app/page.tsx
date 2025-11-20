import Link from "next/link";
import { Header } from "./components/Header";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <Header theme="dark" />

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Entiende tu blockchain
          <br />
          como nunca antes
        </h1>
        
        <p className="text-lg md:text-xl text-neutral-400 mb-12 max-w-2xl">
          Pregúntale a Buho sobre transacciones, balances y más.
        </p>

        <Link
          href="/app"
          className="px-8 py-4 bg-gradient-to-br from-amber-200 via-amber-100 to-blue-100 text-black font-semibold rounded-lg hover:opacity-90 transition-opacity text-lg"
        >
          Start Now
        </Link>
      </main>
    </div>
  );
}
