import { useParams, Link } from "react-router-dom";
import { mockNews } from "@/data/mockNews";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RadioPlayer from "@/components/RadioPlayer";
import TrendingSidebar from "@/components/TrendingSidebar";
import AdSpace from "@/components/AdSpace";
import { Clock, User, Share2, ArrowLeft } from "lucide-react";

const ArticlePage = () => {
  const { id } = useParams();
  const article = mockNews.find((n) => n.id === id);

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container py-16 text-center">
          <h1 className="font-display text-3xl font-bold mb-4">Notícia não encontrada</h1>
          <Link to="/" className="text-primary hover:underline font-body">Voltar para a Home</Link>
        </main>
        <Footer />
      </div>
    );
  }

  const related = mockNews.filter((n) => n.id !== article.id && n.category === article.category).slice(0, 3);
  const shareUrl = encodeURIComponent(window.location.href);
  const shareTitle = encodeURIComponent(article.title);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container py-8">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-body text-sm mb-6">
            <ArrowLeft size={16} /> Voltar
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <article className="lg:col-span-2">
              <span className={`category-badge ${article.categoryColor} text-primary-foreground mb-4 inline-block`}>
                {article.category}
              </span>
              <h1 className="font-display text-2xl md:text-4xl font-bold leading-tight mb-3">
                {article.title}
              </h1>
              <p className="text-lg text-muted-foreground font-body mb-4">{article.subtitle}</p>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground font-body mb-6 pb-6 border-b border-border">
                <span className="flex items-center gap-1"><User size={14} /> {article.author}</span>
                <span>{article.date}</span>
                <span className="flex items-center gap-1"><Clock size={14} /> {article.readTime} de leitura</span>
              </div>

              <img src={article.image} alt={article.title} className="w-full rounded-lg mb-6" loading="lazy" />

              <div className="prose prose-invert max-w-none font-body text-foreground leading-relaxed text-lg">
                <p>{article.content}</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc.</p>
                <p>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
              </div>

              {/* Ad space below article content */}
              <AdSpace className="my-8" />

              {/* Share */}
              <div className="flex items-center gap-3 pt-6 border-t border-border">
                <Share2 size={16} className="text-muted-foreground" />
                <span className="text-sm text-muted-foreground font-body">Compartilhar:</span>
                <a href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`} target="_blank" rel="noopener noreferrer" className="p-2 bg-muted rounded hover:bg-info transition-colors font-body text-xs font-bold">
                  FB
                </a>
                <a href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`} target="_blank" rel="noopener noreferrer" className="p-2 bg-muted rounded hover:bg-info transition-colors font-body text-xs font-bold">
                  X
                </a>
                <a href={`https://wa.me/?text=${shareTitle}%20${shareUrl}`} target="_blank" rel="noopener noreferrer" className="p-2 bg-muted rounded hover:bg-accent transition-colors font-body text-xs font-bold">
                  WA
                </a>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-6">
                {article.tags.map((tag) => (
                  <span key={tag} className="bg-muted text-muted-foreground px-3 py-1 rounded text-xs font-body">
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Related */}
              {related.length > 0 && (
                <div className="mt-10">
                  <h3 className="section-title mb-4">Notícias Relacionadas</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {related.map((n) => (
                      <Link key={n.id} to={`/noticia/${n.id}`} className="group bg-card rounded-lg overflow-hidden news-card-hover">
                        <img src={n.image} alt={n.title} className="w-full h-32 object-cover" loading="lazy" />
                        <div className="p-3">
                          <h4 className="font-display text-sm font-bold leading-tight group-hover:text-primary transition-colors line-clamp-2">
                            {n.title}
                          </h4>
                        </div>
                      </Link>
                    ))}
                  </div>
                  {/* Ad space below related news */}
                  <AdSpace className="mt-6" />
                </div>
              )}
            </article>

            <aside>
              <TrendingSidebar />
              <AdSpace className="mt-6" />
            </aside>
          </div>
        </div>
      </main>
      <Footer />
      <RadioPlayer />
    </div>
  );
};

export default ArticlePage;
