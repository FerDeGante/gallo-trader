import BootcampHeroSection from '@/components/bootcamp/BootcampHeroSection';
import BootcampValueSection from '@/components/bootcamp/BootcampValueSection';
import BootcampContentSection from '@/components/bootcamp/BootcampContentSection';
import BootcampBonusSection from '@/components/bootcamp/BootcampBonusSection';
import BootcampFAQSection from '@/components/bootcamp/BootcampFAQSection';
import BootcampPricingSection from '@/components/bootcamp/BootcampPricingSection';
import BootcampVideoSection from '@/components/bootcamp/BootcampVideoSection';

export default function Home() {
  return (
    <>
      <BootcampHeroSection />
      <BootcampVideoSection />
      <BootcampValueSection />
      <BootcampContentSection />
      <BootcampBonusSection />
      <BootcampFAQSection />
      <BootcampPricingSection />
    </>
  );
}
