import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "./AdminLayout";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const COLORS = ["hsl(0,85%,50%)", "hsl(210,85%,50%)", "hsl(145,70%,40%)", "hsl(30,100%,50%)", "hsl(280,70%,50%)", "hsl(180,70%,40%)"];

const AdminAnalytics = () => {
  const [dailyData, setDailyData] = useState<{ date: string; views: number }[]>([]);
  const [topPages, setTopPages] = useState<{ page: string; views: number }[]>([]);
  const [topArticles, setTopArticles] = useState<{ title: string; views: number }[]>([]);
  const [totalViews, setTotalViews] = useState(0);

  useEffect(() => {
    const fetch = async () => {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const { data: views } = await supabase
        .from("page_views")
        .select("page_path, article_id, created_at")
        .gte("created_at", thirtyDaysAgo.toISOString());

      if (!views) return;
      setTotalViews(views.length);

      // Daily chart
      const daily: Record<string, number> = {};
      for (let i = 29; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        daily[d.toISOString().split("T")[0]] = 0;
      }
      views.forEach((v) => {
        const date = v.created_at?.split("T")[0];
        if (date && daily[date] !== undefined) daily[date]++;
      });
      setDailyData(Object.entries(daily).map(([date, views]) => ({
        date: new Date(date).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" }),
        views,
      })));

      // Top pages
      const pageCounts: Record<string, number> = {};
      views.forEach((v) => { pageCounts[v.page_path] = (pageCounts[v.page_path] || 0) + 1; });
      setTopPages(
        Object.entries(pageCounts)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 10)
          .map(([page, views]) => ({ page, views }))
      );

      // Top articles
      const articleIds = views.filter((v) => v.article_id).map((v) => v.article_id!);
      if (articleIds.length > 0) {
        const uniqueIds = [...new Set(articleIds)];
        const { data: articles } = await supabase
          .from("articles")
          .select("id, title")
          .in("id", uniqueIds);

        const articleCounts: Record<string, number> = {};
        articleIds.forEach((id) => { articleCounts[id] = (articleCounts[id] || 0) + 1; });

        if (articles) {
          setTopArticles(
            articles
              .map((a) => ({ title: a.title, views: articleCounts[a.id] || 0 }))
              .sort((a, b) => b.views - a.views)
              .slice(0, 5)
          );
        }
      }
    };
    fetch();
  }, []);

  return (
    <AdminLayout>
      <h1 className="font-display text-2xl font-bold mb-6">Analytics</h1>

      <div className="bg-card rounded-xl border border-border p-5 mb-6">
        <p className="text-sm text-muted-foreground font-body">Total de visitas (30 dias)</p>
        <p className="font-display text-4xl font-bold text-primary">{totalViews}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-card rounded-xl border border-border p-5">
          <h2 className="font-display text-lg font-bold mb-4">Visitas Diárias</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={10} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={10} />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} />
                <Bar dataKey="views" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border p-5">
          <h2 className="font-display text-lg font-bold mb-4">Páginas Mais Visitadas</h2>
          {topPages.length > 0 ? (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={topPages.slice(0, 6)} dataKey="views" nameKey="page" cx="50%" cy="50%" outerRadius={80} label={({ page }) => page.length > 15 ? page.slice(0, 15) + "…" : page}>
                    {topPages.slice(0, 6).map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground font-body">Sem dados ainda</p>
          )}
        </div>
      </div>

      {topArticles.length > 0 && (
        <div className="bg-card rounded-xl border border-border p-5">
          <h2 className="font-display text-lg font-bold mb-4">Artigos Mais Lidos</h2>
          <div className="space-y-3">
            {topArticles.map((a, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <span className="font-body text-sm truncate mr-4">{a.title}</span>
                <span className="font-display text-sm font-bold text-primary shrink-0">{a.views} views</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminAnalytics;
