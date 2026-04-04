import Header from "@/components/Header";
import BreakingNewsTicker from "@/components/BreakingNewsTicker";
import HeroBanner from "@/components/HeroBanner";
import MediaButtons from "@/components/MediaButtons";
import FeaturedNews from "@/components/FeaturedNews";
import LatestNews from "@/components/LatestNews";
import TrendingSidebar from "@/components/TrendingSidebar";
import TVWebSection from "@/components/TVWebSection";
import NewsletterSection from "@/components/NewsletterSection";
import RadioPlayer from "@/components/RadioPlayer";
import Footer from "@/components/Footer";
import AdSpace from "@/components/AdSpace";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <BreakingNewsTicker />
      <HeroBanner />
      <MediaButtons />
      <main className="flex-1">
        <FeaturedNews />
        
        <div className="container py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <LatestNews />
            </div>
            <div>
              <TrendingSidebar />
              <AdSpace className="mt-6" />
            </div>
          </div>
        </div>

        <TVWebSection />
        <AdSpace className="container mb-8" />
        <NewsletterSection />
      </main>
      <Footer />
      <RadioPlayer />
    </div>
  );
};

export default Index;
