import { ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { LayoutDashboard, FileText, Megaphone, BarChart3, LogOut, ArrowLeft } from "lucide-react";
import logo from "@/assets/logo.png";

const navItems = [
  { to: "/admin", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/admin/artigos", icon: FileText, label: "Artigos" },
  { to: "/admin/anuncios", icon: Megaphone, label: "Anúncios" },
  { to: "/admin/analytics", icon: BarChart3, label: "Analytics" },
];

const AdminLayout = ({ children }: { children: ReactNode }) => {
  const { signOut, user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border flex flex-col shrink-0 hidden md:flex">
        <div className="p-4 border-b border-border">
          <img src={logo} alt="Planetary News" className="h-12" />
          <p className="text-xs text-muted-foreground font-body mt-1">Painel Administrativo</p>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => {
            const active = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-body transition-colors ${
                  active ? "bg-primary text-primary-foreground" : "hover:bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                <item.icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-3 border-t border-border space-y-1">
          <Link to="/" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-body text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
            <ArrowLeft size={18} /> Voltar ao Site
          </Link>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-body text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors w-full"
          >
            <LogOut size={18} /> Sair
          </button>
        </div>
        <div className="p-3 border-t border-border">
          <p className="text-xs text-muted-foreground font-body truncate">{user?.email}</p>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-card border-b border-border p-3 flex items-center justify-between">
        <img src={logo} alt="Planetary News" className="h-8" />
        <div className="flex items-center gap-2">
          {navItems.map((item) => {
            const active = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`p-2 rounded ${active ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
              >
                <item.icon size={18} />
              </Link>
            );
          })}
          <button onClick={handleSignOut} className="p-2 text-muted-foreground">
            <LogOut size={18} />
          </button>
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 p-6 md:p-8 overflow-auto md:mt-0 mt-14">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
