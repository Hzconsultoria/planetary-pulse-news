import banner from "@/assets/banner.png";
import bannerDesktop from "@/assets/banner-desktop.png";
import { useIsMobile } from "@/hooks/use-mobile";

const HeroBanner = () => {
  const isMobile = useIsMobile();

  return (
    <section className="w-full bg-card">
      <img
        src={isMobile ? banner : bannerDesktop}
        alt="Planetary News - Seu portal de notícias"
        className="w-full h-auto object-contain"
        loading="eager"
      />
    </section>
  );
};

export default HeroBanner;
