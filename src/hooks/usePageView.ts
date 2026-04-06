import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export const usePageView = (pagePath: string, articleId?: string) => {
  useEffect(() => {
    supabase.from("page_views").insert({
      page_path: pagePath,
      article_id: articleId || null,
      user_agent: navigator.userAgent,
      referrer: document.referrer || null,
    });
  }, [pagePath, articleId]);
};
