import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { StatsSection } from "@/components/home/StatsSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { ScholarshipTypesSection } from "@/components/home/ScholarshipTypesSection";
import { CTASection } from "@/components/home/CTASection";

export default function Index() {
  return (
    <Layout>
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <ScholarshipTypesSection />
      <CTASection />
    </Layout>
  );
}
