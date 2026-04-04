import { Tv, Radio } from "lucide-react";

const MediaButtons = () => {
  return (
    <section className="bg-card border-b border-border">
      <div className="container py-4 flex flex-col sm:flex-row items-center justify-center gap-4">
        <a
          href="https://www.multbiortv.com.br/page-tv-1"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 bg-secondary text-secondary-foreground px-8 py-3 rounded-lg font-display text-sm uppercase tracking-wider font-bold hover:bg-secondary/90 transition-colors w-full sm:w-auto justify-center"
        >
          <Tv size={20} />
          Assistir TV Web
        </a>
        <a
          href="https://www.multbiortv.com.br/radio"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 bg-primary text-primary-foreground px-8 py-3 rounded-lg font-display text-sm uppercase tracking-wider font-bold hover:bg-primary/90 transition-colors w-full sm:w-auto justify-center"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-primary-foreground animate-pulse-dot" />
          <Radio size={20} />
          Ouvir Rádio ao Vivo
        </a>
      </div>
    </section>
  );
};

export default MediaButtons;
