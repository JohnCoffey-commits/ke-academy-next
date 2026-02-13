import { Hero } from "@/components/home/Hero";
import { CoursesSection } from "@/components/home/CoursesSection";
import { StatsSection } from "@/components/home/StatsSection";
import { CarouselSection } from "@/components/home/CarouselSection";

export default function Home() {
  return (
    <>
      <Hero />
      <CoursesSection />
      <StatsSection />
      <CarouselSection />
    </>
  );
}
