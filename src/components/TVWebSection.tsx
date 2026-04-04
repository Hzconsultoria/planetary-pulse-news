import { Tv, Play } from "lucide-react";

const TVWebSection = () => {
  return (
    <section className="container py-8">
      <h2 className="section-title mb-6">TV Web</h2>
      <div className="bg-card rounded-lg overflow-hidden max-w-md mx-auto">
        <div className="aspect-video bg-muted flex items-center justify-center relative">
          <div className="text-center">
            <Tv size={32} className="mx-auto text-muted-foreground mb-2" />
            <p className="font-display text-sm text-muted-foreground uppercase">Transmissão ao Vivo</p>
          </div>
          <a
            href="https://www.multbiortv.com.br/page-tv-1"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0 flex items-center justify-center bg-background/50 opacity-0 hover:opacity-100 transition-opacity"
          >
            <div className="flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-lg font-display uppercase tracking-wider text-xs font-bold">
              <Play size={14} /> Assistir ao Vivo
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default TVWebSection;
