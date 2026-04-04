import { useParams, Link } from "react-router-dom";
import { categories, mockNews } from "@/data/mockNews";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RadioPlayer from "@/components/RadioPlayer";
import { Clock, User } from "lucide-react";

const CategoryPage = () => {
  const { slug } = useParams();
  const category = categories.find((c) => c.slug === slug);
  const news = mockNews.filter(
    (n) => n.category.toLowerCase() === (category?.name.toLowerCase() || "")
  );

  if (!category) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container py-16 text-center">
          <h1 className="font-display text-3xl font-bold mb-4">Categoria não encontrada</h1>
          <Link to="/" className="text-primary hover:underline font-body">Voltar para a Home</Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="bg-muted py-12">
          <div className="container">
            <span className={`category-badge ${category.color} text-primary-foreground mb-3 inline-block`}>
              {category.name}
            </span>
            <h1 className="font-display text-4xl font-bold uppercase">{category.name}</h1>
          </div>
        </div>

        <div className="container py-8">
          {news.length === 0 ? (
            <p className="text-muted-foreground font-body text-center py-12">Nenhuma notícia nesta categoria ainda.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {news.map((n) => (
                <Link key={n.id} to={`/noticia/${n.id}`} className="group bg-card rounded-lg overflow-hidden news-card-hover">
                  <img src={n.image} alt={n.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  <div className="p-4">
                    <h3 className="font-display text-base font-bold leading-tight group-hover:text-primary transition-colors line-clamp-2">{n.title}</h3>
                    <p className="text-muted-foreground font-body text-sm mt-2 line-clamp-2">{n.subtitle}</p>
                    <div className="flex items-center gap-3 mt-3 text-xs text-muted-foreground font-body">
                      <span className="flex items-center gap-1"><User size={11} />{n.author}</span>
                      <span className="flex items-center gap-1"><Clock size={11} />{n.readTime}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
      <RadioPlayer />
    </div>
  );
};

export default CategoryPage;
