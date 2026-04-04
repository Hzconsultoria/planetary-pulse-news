import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";
import { categories } from "@/data/mockNews";
import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-muted border-t border-border pb-20">
      <div className="container py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <img src={logo} alt="Planetary News" className="h-20 mb-4" />
          <p className="text-muted-foreground font-body text-sm leading-relaxed">
            Informação confiável, atualizada e de qualidade. Conectando você ao mundo.
          </p>
        </div>

        {/* Categorias */}
        <div>
          <h4 className="font-display text-sm font-bold uppercase tracking-wider mb-4 text-primary">Categorias</h4>
          <ul className="space-y-2 font-body text-sm">
            {categories.map((cat) => (
              <li key={cat.slug}>
                <Link to={`/categoria/${cat.slug}`} className="text-muted-foreground hover:text-foreground transition-colors">
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Links */}
        <div>
          <h4 className="font-display text-sm font-bold uppercase tracking-wider mb-4 text-primary">Institucional</h4>
          <ul className="space-y-2 font-body text-sm">
            <li><Link to="/sobre" className="text-muted-foreground hover:text-foreground transition-colors">Sobre Nós</Link></li>
            <li><Link to="/contato" className="text-muted-foreground hover:text-foreground transition-colors">Contato</Link></li>
            <li><a href="https://www.multbiortv.com.br/radio" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">Rádio Web</a></li>
            <li><a href="https://www.multbiortv.com.br/page-tv-1" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">TV Web</a></li>
          </ul>
        </div>

        {/* Contato */}
        <div>
          <h4 className="font-display text-sm font-bold uppercase tracking-wider mb-4 text-primary">Contato</h4>
          <ul className="space-y-3 font-body text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <Phone size={14} className="text-primary" />
              <a href="https://wa.me/5598981963260" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
                (98) 98196-3260
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={14} className="text-primary" />
              <a href="mailto:biortv36@gmail.com" className="hover:text-foreground transition-colors">
                biortv36@gmail.com
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin size={14} className="text-primary mt-0.5" />
              <span>São Luís - Maranhão, Brasil</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container py-4 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-muted-foreground font-body">
          <span>© {new Date().getFullYear()} Planetary News. Todos os direitos reservados.</span>
          <span>Responsável: Raimundo Inacio Teixeira</span>
        </div>
        <div className="container pb-4 text-center text-xs font-body text-muted-foreground">
          Desenvolvido e Gerenciado pela{" "}
          <a
            href="https://benksdigital.com.br/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold hover:underline"
            style={{ color: "hsl(30, 100%, 50%)" }}
          >
            Benks
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
