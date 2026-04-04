import { Link } from "react-router-dom";
import { mockNews } from "@/data/mockNews";
import { Clock, User } from "lucide-react";

const FeaturedNews = () => {
  const featured = mockNews[0];
  const secondary = mockNews.slice(1, 4);

  return (
    <section className="container py-8">
      <h2 className="section-title mb-6">Destaques</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main featured */}
        <div className="lg:col-span-2">
          <Link to={`/noticia/${featured.id}`} className="group block news-card-hover rounded-lg overflow-hidden bg-card">
            <div className="relative overflow-hidden">
              <img
                src={featured.image}
                alt={featured.title}
                className="w-full h-[300px] md:h-[400px] object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <span className={`category-badge ${featured.categoryColor} text-primary-foreground absolute top-4 left-4`}>
                {featured.category}
              </span>
            </div>
            <div className="p-5">
              <h3 className="font-display text-xl md:text-2xl font-bold leading-tight group-hover:text-primary transition-colors">
                {featured.title}
              </h3>
              <p className="text-muted-foreground mt-2 font-body line-clamp-2">{featured.subtitle}</p>
              <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground font-body">
                <span className="flex items-center gap-1"><User size={12} /> {featured.author}</span>
                <span className="flex items-center gap-1"><Clock size={12} /> {featured.readTime}</span>
                <span>{featured.date}</span>
              </div>
            </div>
          </Link>
        </div>

        {/* Secondary */}
        <div className="flex flex-col gap-4">
          {secondary.map((news) => (
            <Link key={news.id} to={`/noticia/${news.id}`} className="group flex gap-4 bg-card rounded-lg p-3 news-card-hover">
              <img
                src={news.image}
                alt={news.title}
                className="w-28 h-20 object-cover rounded flex-shrink-0"
                loading="lazy"
              />
              <div className="flex flex-col justify-between min-w-0">
                <span className={`category-badge ${news.categoryColor} text-primary-foreground self-start text-[10px] mb-1`}>
                  {news.category}
                </span>
                <h4 className="font-display text-sm font-semibold leading-tight group-hover:text-primary transition-colors line-clamp-2">
                  {news.title}
                </h4>
                <span className="text-xs text-muted-foreground font-body mt-1">{news.date}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedNews;
