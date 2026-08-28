import Booking from "./components/Booking";
import Equipment from "./components/Equipment";
import Faq from "./components/Faq";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Nav from "./components/Nav";
import Pricing from "./components/Pricing";
import Values from "./components/Values";

export default function App() {
  return (
    <div className="min-h-screen bg-ink font-sans">
      <Nav />
      <main>
        <Hero />
        <Values />
        <Pricing />
        <Equipment />
        <Faq />
        <Booking />
      </main>
      <Footer />

      {/* 手機版固定預約列 */}
      <a
        href="#booking"
        className="fixed inset-x-4 bottom-4 z-40 flex items-center justify-center gap-2 rounded-full bg-brand py-3.5 text-sm font-black text-white shadow-2xl shadow-black/40 lg:hidden"
      >
        立即預約時段 <span aria-hidden>→</span>
      </a>
    </div>
  );
}
