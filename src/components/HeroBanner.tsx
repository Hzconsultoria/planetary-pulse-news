import banner from "@/assets/banner.png";

const HeroBanner = () => {
  return (
    <section className="w-full">
      <img
        src={banner}
        alt="Planetary News - Seu portal de notícias"
        className="w-full h-auto max-h-[400px] object-cover"
        loading="eager"
      />
    </section>
  );
};

export default HeroBanner;
