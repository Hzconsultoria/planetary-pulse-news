import { useState } from "react";
import { Search, Menu, X, Radio } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";
import { categories } from "@/data/mockNews";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
      {/* Top bar */}
      <div className="bg-muted py-1.5">
        <div className="container flex items-center justify-between text-xs text-muted-foreground">
          <span className="font-body">
            {new Date().toLocaleDateString("pt-BR", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
          </span>
          <div className="hidden md:flex items-center gap-4">
            <a href="https://wa.me/5598981963260" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
              WhatsApp
            </a>
            <a href="mailto:biortv36@gmail.com" className="hover:text-accent transition-colors">
              Contato
            </a>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container py-3 flex items-center justify-between gap-4">
        <Link to="/" className="flex-shrink-0">
          <img src={logo} alt="Planetary News" className="h-14 md:h-20 w-auto" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1 font-display text-sm uppercase tracking-wider">
          <Link to="/" className="px-3 py-2 hover:text-primary transition-colors">Início</Link>
          {categories.slice(0, 6).map((cat) => (
            <Link key={cat.slug} to={`/categoria/${cat.slug}`} className="px-3 py-2 hover:text-primary transition-colors">
              {cat.name}
            </Link>
          ))}
          <Link to="/sobre" className="px-3 py-2 hover:text-primary transition-colors">Sobre</Link>
        </nav>

        <div className="flex items-center gap-2">
          {/* Search toggle */}
          <button onClick={() => setSearchOpen(!searchOpen)} className="p-2 hover:text-primary transition-colors" aria-label="Buscar">
            <Search size={20} />
          </button>

          {/* Radio button */}
          <a
            href="https://www.multbiortv.com.br/radio"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 bg-primary px-4 py-2 rounded font-display text-sm uppercase tracking-wider text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <span className="w-2 h-2 rounded-full bg-primary-foreground animate-pulse-dot" />
            <Radio size={16} />
            Ao Vivo
          </a>

          {/* Mobile menu toggle */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden p-2" aria-label="Menu">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Search bar */}
      {searchOpen && (
        <div className="bg-muted border-t border-border py-3">
          <div className="container">
            <div className="flex items-center gap-3 bg-card rounded-lg px-4 py-2">
              <Search size={18} className="text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar notícias..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent w-full outline-none text-foreground placeholder:text-muted-foreground font-body"
                autoFocus
              />
            </div>
          </div>
        </div>
      )}

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-card border-t border-border">
          <nav className="container py-4 flex flex-col gap-1 font-display text-sm uppercase tracking-wider">
            <Link to="/" onClick={() => setMenuOpen(false)} className="px-3 py-3 hover:bg-muted rounded transition-colors">Início</Link>
            {categories.map((cat) => (
              <Link key={cat.slug} to={`/categoria/${cat.slug}`} onClick={() => setMenuOpen(false)} className="px-3 py-3 hover:bg-muted rounded transition-colors">
                {cat.name}
              </Link>
            ))}
            <Link to="/sobre" onClick={() => setMenuOpen(false)} className="px-3 py-3 hover:bg-muted rounded transition-colors">Sobre</Link>
            <Link to="/contato" onClick={() => setMenuOpen(false)} className="px-3 py-3 hover:bg-muted rounded transition-colors">Contato</Link>
            <a
              href="https://www.multbiortv.com.br/radio"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-3 text-primary"
            >
              <Radio size={16} /> Rádio ao Vivo
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
