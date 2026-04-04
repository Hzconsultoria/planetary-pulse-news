import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RadioPlayer from "@/components/RadioPlayer";
import raimundo from "@/assets/raimundo.jpg";
import { Target, Eye, Heart } from "lucide-react";

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="bg-muted py-12">
          <div className="container text-center">
            <h1 className="font-display text-4xl font-bold uppercase">Sobre Nós</h1>
            <p className="text-muted-foreground font-body mt-2">Conheça o Planetary News</p>
          </div>
        </div>

        <div className="container py-12 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              { icon: Target, title: "Missão", text: "Informar a população com conteúdos relevantes, confiáveis e atualizados, fortalecendo a cidadania através da informação de qualidade." },
              { icon: Eye, title: "Visão", text: "Ser o portal de notícias de referência, integrando jornalismo digital com rádio e TV web de forma inovadora e acessível." },
              { icon: Heart, title: "Valores", text: "Verdade, transparência, ética jornalística, inovação, compromisso com o público e responsabilidade social." },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="bg-card rounded-lg p-6 text-center">
                <Icon className="mx-auto text-primary mb-3" size={32} />
                <h3 className="font-display text-lg font-bold uppercase mb-2">{title}</h3>
                <p className="text-muted-foreground font-body text-sm leading-relaxed">{text}</p>
              </div>
            ))}
          </div>

          <div className="bg-card rounded-lg p-8 flex flex-col md:flex-row items-center gap-8">
            <img src={raimundo} alt="Raimundo Inacio Teixeira" className="w-48 h-48 rounded-lg object-cover" />
            <div>
              <h2 className="font-display text-2xl font-bold">Raimundo Inacio Teixeira</h2>
              <p className="text-primary font-display text-sm uppercase tracking-wider mt-1">Fundador & Diretor</p>
              <p className="text-muted-foreground font-body mt-4 leading-relaxed">
                Jornalista e comunicador, Raimundo é o fundador do Planetary News, um portal dedicado a levar informação de qualidade para o público. Com experiência em comunicação digital e mídias integradas, ele lidera a equipe com paixão pela verdade e compromisso com a cidadania.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <RadioPlayer />
    </div>
  );
};

export default AboutPage;
