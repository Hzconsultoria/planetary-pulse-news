import { Link } from "react-router-dom";
import { mockNews } from "@/data/mockNews";
import { TrendingUp } from "lucide-react";

const TrendingSidebar = () => {
  const trending = mockNews.filter((n) => n.trending);

  return (
    <aside className="bg-card rounded-lg p-5">
      <h3 className="font-display text-lg font-bold uppercase tracking-wide flex items-center gap-2 mb-5 text-primary">
        <TrendingUp size={20} /> Mais Lidas
      </h3>
      <div className="flex flex-col gap-4">
        {trending.map((news, i) => (
          <Link key={news.id} to={`/noticia/${news.id}`} className="group flex gap-3 items-start">
            <span className="font-display text-3xl font-bold text-primary/30 leading-none">{String(i + 1).padStart(2, "0")}</span>
            <div>
              <h4 className="font-display text-sm font-semibold leading-tight group-hover:text-primary transition-colors line-clamp-2">
                {news.title}
              </h4>
              <span className="text-xs text-muted-foreground font-body">{news.date}</span>
            </div>
          </Link>
        ))}
      </div>
    </aside>
  );
};

export default TrendingSidebar;
