import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface AdSpaceProps {
  className?: string;
  position?: string;
}

interface Ad {
  id: string;
  title: string;
  image_url: string | null;
  link_url: string | null;
}

const AdSpace = ({ className = "", position = "general" }: AdSpaceProps) => {
  const [ad, setAd] = useState<Ad | null>(null);

  useEffect(() => {
    const fetchAd = async () => {
      const { data } = await supabase
        .from("ads")
        .select("id, title, image_url, link_url")
        .eq("position", position)
        .eq("active", true)
        .limit(1)
        .maybeSingle();
      if (data) setAd(data);
    };
    fetchAd();
  }, [position]);

  if (ad && ad.image_url) {
    return (
      <div className={`rounded-lg overflow-hidden ${className}`}>
        <p className="text-[10px] text-muted-foreground font-display uppercase tracking-widest text-center mb-1">Publicidade</p>
        <a href={ad.link_url || "#"} target="_blank" rel="noopener noreferrer" className="block">
          <img src={ad.image_url} alt={ad.title} className="w-full h-auto rounded-lg" loading="lazy" />
        </a>
      </div>
    );
  }

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
