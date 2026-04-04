const AdSpace = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`bg-card rounded-lg border border-dashed border-border p-4 text-center ${className}`}>
      <p className="text-[10px] text-muted-foreground font-display uppercase tracking-widest mb-1">Publicidade</p>
      <div className="bg-muted rounded h-20 flex items-center justify-center">
        <span className="text-xs text-muted-foreground font-body">Espaço Publicitário</span>
      </div>
    </div>
  );
};

export default AdSpace;
