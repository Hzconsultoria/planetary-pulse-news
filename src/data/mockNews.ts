export interface NewsArticle {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  categoryColor: string;
  image: string;
  author: string;
  date: string;
  readTime: string;
  content: string;
  tags: string[];
  featured?: boolean;
  trending?: boolean;
}

export const categories = [
  { name: "Política", slug: "politica", color: "bg-primary" },
  { name: "Economia", slug: "economia", color: "bg-info" },
  { name: "Tecnologia", slug: "tecnologia", color: "bg-accent" },
  { name: "Saúde", slug: "saude", color: "bg-success" },
  { name: "Esportes", slug: "esportes", color: "bg-secondary" },
  { name: "Entretenimento", slug: "entretenimento", color: "bg-breaking" },
  { name: "Mundo", slug: "mundo", color: "bg-info" },
  { name: "Região", slug: "regiao", color: "bg-accent" },
];

export const mockNews: NewsArticle[] = [
  {
    id: "1",
    title: "Governo anuncia novo pacote de investimentos em infraestrutura para o Nordeste",
    subtitle: "Programa prevê R$ 50 bilhões em obras de rodovias, saneamento e energia renovável nos próximos cinco anos",
    category: "Política",
    categoryColor: "bg-primary",
    image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&q=80",
    author: "Raimundo Teixeira",
    date: "04 Abr 2026",
    readTime: "5 min",
    content: "O governo federal anunciou nesta quinta-feira um ambicioso pacote de investimentos voltado para a região Nordeste...",
    tags: ["governo", "infraestrutura", "nordeste"],
    featured: true,
  },
  {
    id: "2",
    title: "Bolsa de valores atinge recorde histórico com otimismo do mercado",
    subtitle: "Ibovespa fecha acima dos 160 mil pontos pela primeira vez na história",
    category: "Economia",
    categoryColor: "bg-info",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
    author: "Ana Cristina",
    date: "04 Abr 2026",
    readTime: "4 min",
    content: "A bolsa de valores brasileira registrou um marco histórico nesta sexta-feira...",
    tags: ["economia", "bolsa", "mercado"],
    trending: true,
  },
  {
    id: "3",
    title: "Nova inteligência artificial brasileira revoluciona diagnóstico médico",
    subtitle: "Sistema desenvolvido por universidade maranhense detecta doenças com 98% de precisão",
    category: "Tecnologia",
    categoryColor: "bg-accent",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
    author: "Carlos Lima",
    date: "03 Abr 2026",
    readTime: "6 min",
    content: "Pesquisadores da Universidade Federal do Maranhão apresentaram uma nova ferramenta de IA...",
    tags: ["tecnologia", "ia", "saude"],
    trending: true,
  },
  {
    id: "4",
    title: "Campanha de vacinação contra dengue supera meta em 120%",
    subtitle: "Mais de 30 milhões de brasileiros já foram imunizados em todo o país",
    category: "Saúde",
    categoryColor: "bg-success",
    image: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&q=80",
    author: "Maria Santos",
    date: "03 Abr 2026",
    readTime: "3 min",
    content: "A campanha nacional de vacinação contra a dengue alcançou resultados expressivos...",
    tags: ["saude", "vacinacao", "dengue"],
  },
  {
    id: "5",
    title: "Seleção brasileira convoca novos talentos para eliminatórias da Copa",
    subtitle: "Jovens promessas do futebol nacional ganham oportunidade na seleção principal",
    category: "Esportes",
    categoryColor: "bg-secondary",
    image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&q=80",
    author: "Pedro Souza",
    date: "02 Abr 2026",
    readTime: "4 min",
    content: "O técnico da seleção brasileira surpreendeu ao convocar três jovens jogadores...",
    tags: ["esportes", "futebol", "selecao"],
    trending: true,
  },
  {
    id: "6",
    title: "Festival de cinema maranhense ganha projeção internacional",
    subtitle: "Evento atrai diretores e produtores de mais de 20 países para São Luís",
    category: "Entretenimento",
    categoryColor: "bg-breaking",
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&q=80",
    author: "Juliana Pereira",
    date: "02 Abr 2026",
    readTime: "5 min",
    content: "O Festival Internacional de Cinema do Maranhão encerrou sua quinta edição...",
    tags: ["entretenimento", "cinema", "maranhao"],
  },
  {
    id: "7",
    title: "Acordo climático global define novas metas para redução de emissões",
    subtitle: "Países se comprometem com neutralidade de carbono até 2040",
    category: "Mundo",
    categoryColor: "bg-info",
    image: "https://images.unsplash.com/photo-1569163139394-de4e4f43e4e3?w=800&q=80",
    author: "Roberto Campos",
    date: "01 Abr 2026",
    readTime: "7 min",
    content: "Líderes mundiais chegaram a um acordo histórico sobre mudanças climáticas...",
    tags: ["mundo", "clima", "meio-ambiente"],
  },
  {
    id: "8",
    title: "São Luís recebe investimento bilionário em mobilidade urbana",
    subtitle: "Projeto inclui BRT, ciclovias e modernização do transporte público",
    category: "Região",
    categoryColor: "bg-accent",
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&q=80",
    author: "Raimundo Teixeira",
    date: "01 Abr 2026",
    readTime: "5 min",
    content: "A prefeitura de São Luís apresentou um plano de mobilidade urbana...",
    tags: ["regiao", "sao-luis", "mobilidade"],
  },
];

export const breakingNews = [
  "🔴 URGENTE: Governo anuncia pacote de R$ 50 bilhões para infraestrutura do Nordeste",
  "🔴 Bolsa atinge recorde histórico acima dos 160 mil pontos",
  "🔴 Nova IA brasileira revoluciona diagnósticos médicos com 98% de precisão",
];
