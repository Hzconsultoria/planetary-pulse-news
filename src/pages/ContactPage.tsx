import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RadioPlayer from "@/components/RadioPlayer";
import { Mail, Phone, Send } from "lucide-react";

const ContactPage = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="bg-muted py-12">
          <div className="container text-center">
            <h1 className="font-display text-4xl font-bold uppercase">Contato</h1>
            <p className="text-muted-foreground font-body mt-2">Fale conosco</p>
          </div>
        </div>

        <div className="container py-12 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="font-display text-xl font-bold uppercase mb-6">Envie sua mensagem</h2>
            {sent ? (
              <div className="bg-card rounded-lg p-8 text-center">
                <p className="text-accent font-display text-lg">✓ Mensagem enviada com sucesso!</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  required
                  placeholder="Seu nome"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-card border border-border rounded-lg px-4 py-3 font-body text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary"
                />
                <input
                  type="email"
                  required
                  placeholder="Seu e-mail"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-card border border-border rounded-lg px-4 py-3 font-body text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary"
                />
                <textarea
                  required
                  placeholder="Sua mensagem"
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full bg-card border border-border rounded-lg px-4 py-3 font-body text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary resize-none"
                />
                <button
                  type="submit"
                  className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-display uppercase tracking-wider text-sm font-bold hover:bg-primary/90 transition-colors"
                >
                  <Send size={16} /> Enviar
                </button>
              </form>
            )}
          </div>

          <div className="space-y-6">
            <h2 className="font-display text-xl font-bold uppercase mb-6">Informações</h2>
            <a
              href="https://wa.me/5598981963260"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 bg-card rounded-lg p-4 hover:bg-surface-elevated transition-colors"
            >
              <Phone className="text-accent" size={24} />
              <div>
                <p className="font-display text-sm font-bold">WhatsApp</p>
                <p className="text-muted-foreground font-body text-sm">(98) 98196-3260</p>
              </div>
            </a>
            <a
              href="mailto:biortv36@gmail.com"
              className="flex items-center gap-4 bg-card rounded-lg p-4 hover:bg-surface-elevated transition-colors"
            >
              <Mail className="text-info" size={24} />
              <div>
                <p className="font-display text-sm font-bold">E-mail</p>
                <p className="text-muted-foreground font-body text-sm">biortv36@gmail.com</p>
              </div>
            </a>
          </div>
        </div>
      </main>
      <Footer />
      <RadioPlayer />
    </div>
  );
};

export default ContactPage;
