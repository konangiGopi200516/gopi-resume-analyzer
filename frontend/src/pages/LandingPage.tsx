import { Navbar } from '../components/layout/Navbar';
import { Hero } from '../components/landing/Hero';
import { WhyChooseUs } from '../components/landing/WhyChooseUs';
import { HowItWorks } from '../components/landing/HowItWorks';
import { AtsShowcase } from '../components/landing/AtsShowcase';
import { AiWriter } from '../components/landing/AiWriter';
import { ResumeBuilderSection } from '../components/landing/ResumeBuilderSection';
import { ScoreDashboard } from '../components/landing/ScoreDashboard';
import { SuccessStories } from '../components/landing/SuccessStories';
import { Comparison } from '../components/landing/Comparison';
import { TrustLogos } from '../components/landing/TrustLogos';
import { FAQ } from '../components/landing/FAQ';
import { CtaBanner } from '../components/landing/CtaBanner';
import { Footer } from '../components/layout/Footer';

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-emerald-200 selection:text-emerald-900">
      <Navbar />
      <main>
        {/* Section 1 */}
        <Hero />
        
        {/* Section 2 */}
        <WhyChooseUs />
        
        {/* Section 3 */}
        <HowItWorks />
        
        {/* Section 4 */}
        <AtsShowcase />
        
        {/* Section 5 */}
        <AiWriter />
        
        {/* Section 7 */}
        <ResumeBuilderSection />
        
        {/* Section 8 */}
        <ScoreDashboard />
        
        {/* Section 9 */}
        <SuccessStories />
        
        {/* Section 10 */}
        <Comparison />
        
        {/* Section 11 */}
        <TrustLogos />
        
        {/* Section 12 */}
        <FAQ />
        
        {/* Section 13 */}
        <CtaBanner />
      </main>
      <Footer />
    </div>
  );
};
