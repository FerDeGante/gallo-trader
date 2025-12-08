import BootcampHeroSection from '@/components/bootcamp/BootcampHeroSection';
import BootcampValueSection from '@/components/bootcamp/BootcampValueSection';
import BootcampContentSection from '@/components/bootcamp/BootcampContentSection';
import BootcampCalendarSection from '@/components/bootcamp/BootcampCalendarSection';
import BootcampBonusSection from '@/components/bootcamp/BootcampBonusSection';
import BootcampPricingSection from '@/components/bootcamp/BootcampPricingSection';

export default function BootcampPage() {
  return (
    <>
      <BootcampHeroSection />
      <BootcampValueSection />
      <BootcampContentSection />
      <BootcampCalendarSection />
      <BootcampBonusSection />
      <BootcampPricingSection />
    </>
  );
}
