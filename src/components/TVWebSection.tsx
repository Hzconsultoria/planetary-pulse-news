import { Tv, Play } from "lucide-react";

const TVWebSection = () => {
  return (
    <section className="container py-8">
      <h2 className="section-title mb-6">TV Web</h2>
      <div className="bg-card rounded-lg overflow-hidden">
        <div className="aspect-video bg-muted flex items-center justify-center relative">
          <div className="text-center">
            <Tv size={48} className="mx-auto text-muted-foreground mb-3" />
            <p className="font-display text-lg text-muted-foreground uppercase">Transmissão ao Vivo</p>
          </div>
          <a
            href="https://www.multbiortv.com.br/page-tv-1"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0 flex items-center justify-center bg-background/50 opacity-0 hover:opacity-100 transition-opacity"
          >
            <div className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-display uppercase tracking-wider text-sm font-bold">
              <Play size={18} /> Assistir ao Vivo
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default TVWebSection;
