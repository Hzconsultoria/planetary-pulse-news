import { useState, useEffect } from "react";
import { Search, Menu, X, Radio, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";
import { categories } from "@/data/mockNews";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedDate = currentTime.toLocaleDateString("pt-BR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedTime = currentTime.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
      {/* Top bar */}
      <div className="bg-muted py-1.5 border-b border-border">
        <div className="container flex items-center justify-between text-xs text-muted-foreground font-body">
          <div className="flex items-center gap-1">
            <span className="capitalize">{formattedDate}</span>
            <span className="mx-2 hidden sm:inline">|</span>
            <span className="hidden sm:inline font-semibold text-foreground">{formattedTime}</span>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <a href="tel:+5598981963260" className="flex items-center gap-1 hover:text-primary transition-colors">
              <Phone size={11} /> (98) 98196-3260
            </a>
            <a href="mailto:biortv36@gmail.com" className="flex items-center gap-1 hover:text-primary transition-colors">
              <Mail size={11} /> biortv36@gmail.com
            </a>
            <a href="https://wa.me/5598981963260" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container py-3 flex items-center justify-between gap-4">
        <Link to="/" className="flex-shrink-0">
          <img src={logo} alt="Planetary News" className="h-16 md:h-24 w-auto" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-0.5 font-display text-sm uppercase tracking-wider">
          <Link to="/" className="px-3 py-2 hover:text-primary transition-colors rounded hover:bg-muted">Início</Link>
          {categories.slice(0, 6).map((cat) => (
            <Link key={cat.slug} to={`/categoria/${cat.slug}`} className="px-3 py-2 hover:text-primary transition-colors rounded hover:bg-muted">
              {cat.name}
            </Link>
          ))}
          <Link to="/sobre" className="px-3 py-2 hover:text-primary transition-colors rounded hover:bg-muted">Sobre</Link>
          <Link to="/contato" className="px-3 py-2 hover:text-primary transition-colors rounded hover:bg-muted">Contato</Link>
        </nav>

        <div className="flex items-center gap-2">
          <button onClick={() => setSearchOpen(!searchOpen)} className="p-2 hover:text-primary transition-colors" aria-label="Buscar">
            <Search size={20} />
          </button>

          <a
            href="https://www.multbiortv.com.br/radio"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 bg-primary px-4 py-2 rounded font-display text-sm uppercase tracking-wider text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <span className="w-2 h-2 rounded-full bg-primary-foreground animate-pulse-dot" />
            <Radio size={16} />
            Rádio Ao Vivo
          </a>

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
            <div className="border-t border-border mt-2 pt-3 px-3 text-xs normal-case tracking-normal text-muted-foreground font-body space-y-2">
              <a href="tel:+5598981963260" className="flex items-center gap-2">
                <Phone size={12} /> (98) 98196-3260
              </a>
              <a href="mailto:biortv36@gmail.com" className="flex items-center gap-2">
                <Mail size={12} /> biortv36@gmail.com
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
