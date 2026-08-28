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
    </div>
  );
}
