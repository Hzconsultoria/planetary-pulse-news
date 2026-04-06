import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "./AdminLayout";
import { FileText, Megaphone, Eye, TrendingUp } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const AdminDashboard = () => {
  const [stats, setStats] = useState({ articles: 0, ads: 0, views: 0, todayViews: 0 });
  const [chartData, setChartData] = useState<{ date: string; views: number }[]>([]);

  useEffect(() => {
    const fetchStats = async () => {
      const [articlesRes, adsRes, viewsRes, todayRes] = await Promise.all([
        supabase.from("articles").select("id", { count: "exact", head: true }),
        supabase.from("ads").select("id", { count: "exact", head: true }),
        supabase.from("page_views").select("id", { count: "exact", head: true }),
        supabase.from("page_views").select("id", { count: "exact", head: true }).gte("created_at", new Date().toISOString().split("T")[0]),
      ]);
      setStats({
        articles: articlesRes.count || 0,
        ads: adsRes.count || 0,
        views: viewsRes.count || 0,
        todayViews: todayRes.count || 0,
      });
    };

    const fetchChart = async () => {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      const { data } = await supabase
        .from("page_views")
        .select("created_at")
        .gte("created_at", sevenDaysAgo.toISOString());

      if (data) {
        const grouped: Record<string, number> = {};
        for (let i = 6; i >= 0; i--) {
          const d = new Date();
          d.setDate(d.getDate() - i);
          grouped[d.toISOString().split("T")[0]] = 0;
        }
        data.forEach((v) => {
          const date = v.created_at?.split("T")[0];
          if (date && grouped[date] !== undefined) grouped[date]++;
        });
        setChartData(Object.entries(grouped).map(([date, views]) => ({
          date: new Date(date).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" }),
          views,
        })));
      }
    };

    fetchStats();
    fetchChart();
  }, []);

  const cards = [
    { label: "Artigos", value: stats.articles, icon: FileText, color: "text-primary" },
    { label: "Anúncios", value: stats.ads, icon: Megaphone, color: "text-accent" },
    { label: "Total de Visitas", value: stats.views, icon: Eye, color: "text-info" },
    { label: "Visitas Hoje", value: stats.todayViews, icon: TrendingUp, color: "text-success" },
  ];

  return (
    <AdminLayout>
      <h1 className="font-display text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cards.map((card) => (
          <div key={card.label} className="bg-card rounded-xl border border-border p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground font-body">{card.label}</span>
              <card.icon size={20} className={card.color} />
            </div>
            <p className="font-display text-3xl font-bold">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-card rounded-xl border border-border p-5">
        <h2 className="font-display text-lg font-bold mb-4">Visitas - Últimos 7 dias</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip
                contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }}
                labelStyle={{ color: "hsl(var(--foreground))" }}
              />
              <Bar dataKey="views" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
