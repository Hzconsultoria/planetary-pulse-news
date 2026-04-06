import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Lock, Mail, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";
import { toast } from "sonner";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      toast.error("Preencha todos os campos");
      return;
    }
    setLoading(true);
    try {
      if (isSignUp) {
        const { error } = await signUp(email, password);
        if (error) {
          toast.error(error.message);
        } else {
          toast.success("Conta criada! Verifique seu email para confirmar.");
        }
      } else {
        const { error } = await signIn(email, password);
        if (error) {
          toast.error("Email ou senha incorretos");
        } else {
          toast.success("Login realizado com sucesso!");
          navigate("/admin");
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/">
            <img src={logo} alt="Planetary News" className="h-20 mx-auto mb-4" />
          </Link>
          <h1 className="font-display text-2xl font-bold">Painel Administrativo</h1>
          <p className="text-muted-foreground font-body text-sm mt-1">
            {isSignUp ? "Crie sua conta" : "Faça login para acessar"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-card rounded-xl p-6 border border-border space-y-4">
          <div>
            <label className="block text-sm font-body font-medium mb-1.5">Email</label>
            <div className="relative">
              <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-muted rounded-lg pl-10 pr-4 py-2.5 text-sm font-body outline-none focus:ring-2 focus:ring-primary"
                placeholder="seu@email.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-body font-medium mb-1.5">Senha</label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-muted rounded-lg pl-10 pr-4 py-2.5 text-sm font-body outline-none focus:ring-2 focus:ring-primary"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-primary-foreground font-display text-sm uppercase tracking-wider py-3 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {loading ? "Carregando..." : isSignUp ? "Criar Conta" : "Entrar"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors font-body">
            <ArrowLeft size={14} /> Voltar ao Portal
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
