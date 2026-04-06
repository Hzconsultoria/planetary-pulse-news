import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "./AdminLayout";
import { Plus, Edit, Trash2, ExternalLink, ToggleLeft, ToggleRight } from "lucide-react";
import { toast } from "sonner";
import type { Tables } from "@/integrations/supabase/types";

type Ad = Tables<"ads">;

const positions = [
  { value: "general", label: "Geral" },
  { value: "sidebar", label: "Sidebar" },
  { value: "article", label: "Artigo" },
  { value: "header", label: "Topo" },
];

const AdminAds = () => {
  const [ads, setAds] = useState<Ad[]>([]);
  const [editing, setEditing] = useState<Ad | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: "", image_url: "", link_url: "", position: "general", active: true,
  });

  const fetchAds = async () => {
    const { data } = await supabase.from("ads").select("*").order("created_at", { ascending: false });
    if (data) setAds(data);
  };

  useEffect(() => { fetchAds(); }, []);

  const resetForm = () => {
    setForm({ title: "", image_url: "", link_url: "", position: "general", active: true });
    setEditing(null);
    setShowForm(false);
  };

  const handleEdit = (ad: Ad) => {
    setForm({
      title: ad.title, image_url: ad.image_url || "", link_url: ad.link_url || "",
      position: ad.position, active: ad.active ?? true,
    });
    setEditing(ad);
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) {
      const { error } = await supabase.from("ads").update(form).eq("id", editing.id);
      if (error) { toast.error("Erro ao atualizar"); return; }
      toast.success("Anúncio atualizado!");
    } else {
      const { error } = await supabase.from("ads").insert(form);
      if (error) { toast.error("Erro ao criar"); return; }
      toast.success("Anúncio criado!");
    }
    resetForm();
    fetchAds();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Excluir este anúncio?")) return;
    await supabase.from("ads").delete().eq("id", id);
    toast.success("Anúncio excluído");
    fetchAds();
  };

  const toggleActive = async (ad: Ad) => {
    await supabase.from("ads").update({ active: !ad.active }).eq("id", ad.id);
    fetchAds();
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-bold">Anúncios</h1>
        <button
          onClick={() => { resetForm(); setShowForm(true); }}
          className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-display uppercase tracking-wider hover:bg-primary/90 transition-colors"
        >
          <Plus size={16} /> Novo Anúncio
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-card rounded-xl border border-border p-6 mb-6 space-y-4">
          <h2 className="font-display text-lg font-bold">{editing ? "Editar Anúncio" : "Novo Anúncio"}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-body mb-1">Título *</label>
              <input value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} className="w-full bg-muted rounded-lg px-3 py-2 text-sm font-body outline-none focus:ring-2 focus:ring-primary" required />
            </div>
            <div>
              <label className="block text-sm font-body mb-1">Posição</label>
              <select value={form.position} onChange={(e) => setForm((f) => ({ ...f, position: e.target.value }))} className="w-full bg-muted rounded-lg px-3 py-2 text-sm font-body outline-none focus:ring-2 focus:ring-primary">
                {positions.map((p) => <option key={p.value} value={p.value}>{p.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-body mb-1">URL da Imagem</label>
              <input value={form.image_url} onChange={(e) => setForm((f) => ({ ...f, image_url: e.target.value }))} className="w-full bg-muted rounded-lg px-3 py-2 text-sm font-body outline-none focus:ring-2 focus:ring-primary" placeholder="https://..." />
            </div>
            <div>
              <label className="block text-sm font-body mb-1">Link de Destino *</label>
              <input value={form.link_url} onChange={(e) => setForm((f) => ({ ...f, link_url: e.target.value }))} className="w-full bg-muted rounded-lg px-3 py-2 text-sm font-body outline-none focus:ring-2 focus:ring-primary" placeholder="https://..." required />
            </div>
          </div>

          <label className="flex items-center gap-2 text-sm font-body cursor-pointer">
            <input type="checkbox" checked={form.active} onChange={(e) => setForm((f) => ({ ...f, active: e.target.checked }))} className="accent-primary" /> Ativo
          </label>

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
        {ads.length === 0 && (
          <div className="text-center py-12 text-muted-foreground font-body">
            Nenhum anúncio cadastrado.
          </div>
        )}
        {ads.map((ad) => (
          <div key={ad.id} className="bg-card rounded-xl border border-border p-4 flex items-center gap-4">
            {ad.image_url && (
              <img src={ad.image_url} alt="" className="w-20 h-14 object-cover rounded hidden sm:block" />
            )}
            <div className="flex-1 min-w-0">
              <h3 className="font-display text-sm font-bold truncate">{ad.title}</h3>
              <div className="flex items-center gap-2 text-xs text-muted-foreground font-body">
                <span className="bg-muted px-2 py-0.5 rounded">{positions.find((p) => p.value === ad.position)?.label}</span>
                {ad.link_url && (
                  <a href={ad.link_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-primary">
                    <ExternalLink size={10} /> Link
                  </a>
                )}
              </div>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <button onClick={() => toggleActive(ad)} className={`p-2 rounded transition-colors ${ad.active ? "text-success" : "text-muted-foreground"}`}>
                {ad.active ? <ToggleRight size={20} /> : <ToggleLeft size={20} />}
              </button>
              <button onClick={() => handleEdit(ad)} className="p-2 text-muted-foreground hover:text-info hover:bg-info/10 rounded transition-colors">
                <Edit size={16} />
              </button>
              <button onClick={() => handleDelete(ad.id)} className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded transition-colors">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
};

export default AdminAds;
