import banner from "@/assets/banner.png";

const HeroBanner = () => {
  return (
    <section className="w-full bg-card">
      <img
        src={banner}
        alt="Planetary News - Seu portal de notícias"
        className="w-full h-auto object-contain"
        loading="eager"
      />
    </section>
  );
};

export default HeroBanner;
