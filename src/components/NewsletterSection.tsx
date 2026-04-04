import { useState } from "react";
import { Mail } from "lucide-react";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <section className="bg-muted py-12">
      <div className="container text-center max-w-xl mx-auto">
        <Mail className="mx-auto text-primary mb-3" size={36} />
        <h2 className="font-display text-2xl font-bold uppercase mb-2">Newsletter</h2>
        <p className="text-muted-foreground font-body mb-6">
          Receba as principais notícias direto no seu e-mail.
        </p>
        {submitted ? (
          <p className="text-accent font-display text-lg">✓ Inscrição realizada com sucesso!</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="email"
              required
              placeholder="Seu melhor e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-card border border-border rounded-lg px-4 py-3 font-body text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              type="submit"
              className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-display uppercase tracking-wider text-sm font-bold hover:bg-primary/90 transition-colors"
            >
              Inscrever
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default NewsletterSection;
