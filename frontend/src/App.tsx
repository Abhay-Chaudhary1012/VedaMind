import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Features } from './pages/Features';
import { HowItWorks } from './pages/HowItWorks';
import { Students } from './pages/Students';
import { Mentors } from './pages/Mentors';
import { Demo } from './pages/Demo';
import { DemoShare } from './pages/DemoShare';
import { Contact } from './pages/Contact';

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/features" element={<Features />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/students" element={<Students />} />
          <Route path="/mentors" element={<Mentors />} />
          <Route path="/demo" element={<Demo />} />
          <Route path="/demo/share" element={<DemoShare />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
