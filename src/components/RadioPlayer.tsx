import { Radio, ExternalLink } from "lucide-react";

const RadioPlayer = () => {
  return (
    <div className="radio-player-floating border-t border-border">
      <div className="container py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="w-3 h-3 rounded-full bg-primary animate-pulse-dot" />
          <Radio size={20} className="text-primary" />
          <div className="hidden sm:block">
            <p className="font-display text-sm font-bold uppercase">Rádio Planetary News</p>
            <p className="text-xs text-muted-foreground font-body">Ao vivo agora</p>
          </div>
        </div>
        <a
          href="https://www.multbiortv.com.br/radio"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded font-display text-xs uppercase tracking-wider font-bold hover:bg-primary/90 transition-colors"
        >
          <Radio size={14} />
          Ouvir Rádio ao Vivo <ExternalLink size={14} />
        </a>
      </div>
    </div>
  );
};

export default RadioPlayer;
