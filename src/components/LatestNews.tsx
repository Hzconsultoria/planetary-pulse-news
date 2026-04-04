import { Link } from "react-router-dom";
import { mockNews } from "@/data/mockNews";
import { Clock, User } from "lucide-react";
import AdSpace from "./AdSpace";

const LatestNews = () => {
  const newsItems = mockNews.slice(0, 8);

  return (
    <section className="container py-8">
      <h2 className="section-title mb-6">Últimas Notícias</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {newsItems.map((news, index) => (
          <>
            <Link
              key={news.id}
              to={`/noticia/${news.id}`}
              className="group bg-card rounded-lg overflow-hidden news-card-hover"
            >
              <div className="relative overflow-hidden">
                <img
                  src={news.image}
                  alt={news.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <span className={`category-badge ${news.categoryColor} text-primary-foreground absolute top-3 left-3 text-[10px]`}>
                  {news.category}
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-display text-sm font-bold leading-tight group-hover:text-primary transition-colors line-clamp-3">
                  {news.title}
                </h3>
                <div className="flex items-center gap-3 mt-3 text-xs text-muted-foreground font-body">
                  <span className="flex items-center gap-1"><User size={11} />{news.author}</span>
                  <span className="flex items-center gap-1"><Clock size={11} />{news.readTime}</span>
                </div>
              </div>
            </Link>
            {(index + 1) % 4 === 0 && index < newsItems.length - 1 && (
              <div key={`ad-${index}`} className="col-span-1 md:col-span-2 lg:col-span-4">
                <AdSpace />
              </div>
            )}
          </>
        ))}
      </div>
    </section>
  );
};

export default LatestNews;
