import ContactHero from '@/components/pages/contact/ContactHero';
import ContactCards from '@/components/pages/contact/ContactCards';
import ContactSocialMedia from '@/components/pages/contact/ContactSocialMedia';
import TransformingSection from '@/components/shared/TransformingSection';

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <ContactHero />

      {/* Contact Cards Section */}
      <ContactCards />

      {/* Social Media Section */}
      <ContactSocialMedia />

      {/* Transforming Section */}
      <TransformingSection />
    </div>
  )
}
