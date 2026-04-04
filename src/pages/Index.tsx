import Header from "@/components/Header";
import BreakingNewsTicker from "@/components/BreakingNewsTicker";
import HeroBanner from "@/components/HeroBanner";
import FeaturedNews from "@/components/FeaturedNews";
import LatestNews from "@/components/LatestNews";
import TrendingSidebar from "@/components/TrendingSidebar";
import TVWebSection from "@/components/TVWebSection";
import NewsletterSection from "@/components/NewsletterSection";
import RadioPlayer from "@/components/RadioPlayer";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <BreakingNewsTicker />
      <HeroBanner />
      <main className="flex-1">
        <FeaturedNews />
        
        <div className="container py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <LatestNews />
            </div>
            <div>
              <TrendingSidebar />
              
              {/* Ad space */}
              <div className="mt-6 bg-card rounded-lg p-6 text-center border border-dashed border-border">
                <p className="text-xs text-muted-foreground font-display uppercase tracking-wider">Espaço Publicitário</p>
              </div>
            </div>
          </div>
        </div>

        <TVWebSection />
        <NewsletterSection />
      </main>
      <Footer />
      <RadioPlayer />
    </div>
  );
};

export default Index;
