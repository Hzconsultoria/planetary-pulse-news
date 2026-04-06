import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "./AdminLayout";
import { Plus, Edit, Trash2, Eye, EyeOff, Star, TrendingUp } from "lucide-react";
import { toast } from "sonner";
import { categories } from "@/data/mockNews";
import type { Tables } from "@/integrations/supabase/types";

type Article = Tables<"articles">;

const AdminArticles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [editing, setEditing] = useState<Article | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: "", subtitle: "", category: "Política", category_color: "bg-primary",
    image_url: "", author: "Raimundo Teixeira", content: "", tags: "",
    featured: false, trending: false, published: false, read_time: "5 min",
  });

  const fetchArticles = async () => {
    const { data } = await supabase.from("articles").select("*").order("created_at", { ascending: false });
    if (data) setArticles(data);
  };

  useEffect(() => { fetchArticles(); }, []);

  const resetForm = () => {
    setForm({ title: "", subtitle: "", category: "Política", category_color: "bg-primary", image_url: "", author: "Raimundo Teixeira", content: "", tags: "", featured: false, trending: false, published: false, read_time: "5 min" });
    setEditing(null);
    setShowForm(false);
  };

  const handleEdit = (article: Article) => {
    setForm({
      title: article.title, subtitle: article.subtitle || "", category: article.category,
      category_color: article.category_color, image_url: article.image_url || "",
      author: article.author, content: article.content, tags: (article.tags || []).join(", "),
      featured: article.featured || false, trending: article.trending || false,
      published: article.published || false, read_time: article.read_time || "5 min",
    });
    setEditing(article);
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...form,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
    };

    if (editing) {
      const { error } = await supabase.from("articles").update(payload).eq("id", editing.id);
      if (error) { toast.error("Erro ao atualizar"); return; }
      toast.success("Artigo atualizado!");
    } else {
      const { error } = await supabase.from("articles").insert(payload);
      if (error) { toast.error("Erro ao criar"); return; }
      toast.success("Artigo criado!");
    }
    resetForm();
    fetchArticles();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Excluir este artigo?")) return;
    await supabase.from("articles").delete().eq("id", id);
    toast.success("Artigo excluído");
    fetchArticles();
  };

  const togglePublish = async (article: Article) => {
    await supabase.from("articles").update({ published: !article.published }).eq("id", article.id);
    fetchArticles();
  };

  const handleCategoryChange = (catName: string) => {
    const cat = categories.find((c) => c.name === catName);
    setForm((f) => ({ ...f, category: catName, category_color: cat?.color || "bg-primary" }));
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-bold">Artigos</h1>
        <button
          onClick={() => { resetForm(); setShowForm(true); }}
          className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-display uppercase tracking-wider hover:bg-primary/90 transition-colors"
        >
          <Plus size={16} /> Novo Artigo
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-card rounded-xl border border-border p-6 mb-6 space-y-4">
          <h2 className="font-display text-lg font-bold">{editing ? "Editar Artigo" : "Novo Artigo"}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-body mb-1">Título *</label>
              <input value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} className="w-full bg-muted rounded-lg px-3 py-2 text-sm font-body outline-none focus:ring-2 focus:ring-primary" required />
            </div>
            <div>
              <label className="block text-sm font-body mb-1">Subtítulo</label>
              <input value={form.subtitle} onChange={(e) => setForm((f) => ({ ...f, subtitle: e.target.value }))} className="w-full bg-muted rounded-lg px-3 py-2 text-sm font-body outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div>
              <label className="block text-sm font-body mb-1">Categoria *</label>
              <select value={form.category} onChange={(e) => handleCategoryChange(e.target.value)} className="w-full bg-muted rounded-lg px-3 py-2 text-sm font-body outline-none focus:ring-2 focus:ring-primary">
                {categories.map((cat) => <option key={cat.slug} value={cat.name}>{cat.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-body mb-1">Autor</label>
              <input value={form.author} onChange={(e) => setForm((f) => ({ ...f, author: e.target.value }))} className="w-full bg-muted rounded-lg px-3 py-2 text-sm font-body outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div>
              <label className="block text-sm font-body mb-1">URL da Imagem</label>
              <input value={form.image_url} onChange={(e) => setForm((f) => ({ ...f, image_url: e.target.value }))} className="w-full bg-muted rounded-lg px-3 py-2 text-sm font-body outline-none focus:ring-2 focus:ring-primary" placeholder="https://..." />
            </div>
            <div>
              <label className="block text-sm font-body mb-1">Tempo de Leitura</label>
              <input value={form.read_time} onChange={(e) => setForm((f) => ({ ...f, read_time: e.target.value }))} className="w-full bg-muted rounded-lg px-3 py-2 text-sm font-body outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-body mb-1">Tags (separadas por vírgula)</label>
              <input value={form.tags} onChange={(e) => setForm((f) => ({ ...f, tags: e.target.value }))} className="w-full bg-muted rounded-lg px-3 py-2 text-sm font-body outline-none focus:ring-2 focus:ring-primary" placeholder="política, governo, brasil" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-body mb-1">Conteúdo *</label>
            <textarea value={form.content} onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))} rows={8} className="w-full bg-muted rounded-lg px-3 py-2 text-sm font-body outline-none focus:ring-2 focus:ring-primary resize-y" required />
          </div>

          <div className="flex flex-wrap gap-6">
            <label className="flex items-center gap-2 text-sm font-body cursor-pointer">
              <input type="checkbox" checked={form.featured} onChange={(e) => setForm((f) => ({ ...f, featured: e.target.checked }))} className="accent-primary" /> Destaque
            </label>
            <label className="flex items-center gap-2 text-sm font-body cursor-pointer">
              <input type="checkbox" checked={form.trending} onChange={(e) => setForm((f) => ({ ...f, trending: e.target.checked }))} className="accent-primary" /> Trending
            </label>
            <label className="flex items-center gap-2 text-sm font-body cursor-pointer">
              <input type="checkbox" checked={form.published} onChange={(e) => setForm((f) => ({ ...f, published: e.target.checked }))} className="accent-primary" /> Publicado
            </label>
          </div>

          <div className="flex gap-3">
            <button type="submit" className="bg-primary text-primary-foreground px-6 py-2 rounded-lg text-sm font-display uppercase tracking-wider hover:bg-primary/90 transition-colors">
              {editing ? "Atualizar" : "Criar"}
            </button>
            <button type="button" onClick={resetForm} className="bg-muted px-6 py-2 rounded-lg text-sm font-body hover:bg-muted/80 transition-colors">
              Cancelar
            </button>
          </div>
        </form>
      )}

      <div className="space-y-3">
        {articles.length === 0 && (
          <div className="text-center py-12 text-muted-foreground font-body">
            Nenhum artigo cadastrado. Crie o primeiro!
          </div>
        )}
        {articles.map((article) => (
          <div key={article.id} className="bg-card rounded-xl border border-border p-4 flex items-start gap-4">
            {article.image_url && (
              <img src={article.image_url} alt="" className="w-20 h-14 object-cover rounded hidden sm:block" />
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className={`${article.category_color} text-primary-foreground text-[10px] px-2 py-0.5 rounded font-display uppercase`}>
                  {article.category}
                </span>
                {article.featured && <Star size={12} className="text-yellow-500" />}
                {article.trending && <TrendingUp size={12} className="text-info" />}
              </div>
              <h3 className="font-display text-sm font-bold truncate">{article.title}</h3>
              <p className="text-xs text-muted-foreground font-body">{article.author} • {new Date(article.created_at || "").toLocaleDateString("pt-BR")}</p>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <button onClick={() => togglePublish(article)} className={`p-2 rounded transition-colors ${article.published ? "text-success hover:bg-success/10" : "text-muted-foreground hover:bg-muted"}`} title={article.published ? "Despublicar" : "Publicar"}>
                {article.published ? <Eye size={16} /> : <EyeOff size={16} />}
              </button>
              <button onClick={() => handleEdit(article)} className="p-2 text-muted-foreground hover:text-info hover:bg-info/10 rounded transition-colors">
                <Edit size={16} />
              </button>
              <button onClick={() => handleDelete(article.id)} className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded transition-colors">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
};

export default AdminArticles;
