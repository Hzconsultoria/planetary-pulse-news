import { breakingNews } from "@/data/mockNews";

const BreakingNewsTicker = () => {
  return (
    <div className="breaking-bar py-2 overflow-hidden">
      <div className="container flex items-center gap-4">
        <span className="font-display text-xs uppercase tracking-widest font-bold whitespace-nowrap bg-primary-foreground text-primary px-3 py-1 rounded text-[10px]">
          Urgente
        </span>
        <div className="overflow-hidden flex-1">
          <div className="animate-ticker whitespace-nowrap font-body text-sm">
            {breakingNews.map((news, i) => (
              <span key={i} className="mx-12">{news}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreakingNewsTicker;
