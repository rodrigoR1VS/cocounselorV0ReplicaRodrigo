import Hero from '@/components/pages/home/Hero'
import Features from '@/components/pages/home/Features'
import CallToActionBanner from '@/components/shared/CallToActionBanner'
import WhySection from '@/components/pages/home/WhySection'
import IntegrationsSection from '@/components/shared/IntegrationsSection'
import HomeTransformingSection from '@/components/shared/HomeTransformingSection'
import TestimonialSection from '@/components/pages/home/TestimonialSection'
import WhyCoCounselor from '@/components/pages/home/WhyCoCounselor'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Features />
      <CallToActionBanner />
      <WhySection />
      <IntegrationsSection />
      <HomeTransformingSection />
      <TestimonialSection />
    
    </div>
  )
}