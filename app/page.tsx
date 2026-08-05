"use client";

import { useState } from "react";
import {
  Activity, Bell, Bot, ChartNoAxesCombined, CheckCircle2, ChevronDown,
  CircleHelp, ContactRound, FileText, Headphones, LayoutDashboard, LockKeyhole,
  LogOut, Menu, MessageCircle, MessagesSquare, MoreHorizontal, Plus, Search,
  Send, Settings, ShieldCheck, Sparkles, Users, WandSparkles, X
} from "lucide-react";

type Role = "user" | "admin";
type PageKey = "overview" | "conversations" | "bots" | "campaigns" | "contacts" | "reports" | "support" | "admin" | "settings";

const userNavigation = [
  ["overview", "Visão geral", LayoutDashboard], ["conversations", "Conversas", MessagesSquare],
  ["bots", "Bots e fluxos", Bot], ["campaigns", "Campanhas", Send],
  ["contacts", "Contatos", ContactRound], ["reports", "Relatórios", ChartNoAxesCombined],
] as const;
const adminNavigation = [
  ["overview", "Visão geral", LayoutDashboard], ["admin", "Clientes e equipe", Users],
  ["bots", "Monitoramento", Activity], ["support", "Central de suporte", Headphones],
  ["reports", "Relatórios", ChartNoAxesCombined], ["settings", "Configurações", Settings],
] as const;

const pageCopy: Record<PageKey, [string, string]> = {
  overview: ["Visão geral", "Acompanhe os resultados e a saúde da sua operação."],
  conversations: ["Conversas", "Atenda clientes e acompanhe o trabalho dos bots."],
  bots: ["Bots e fluxos", "Crie, organize e monitore suas automações."],
  campaigns: ["Campanhas", "Planeje e acompanhe seus envios pelo WhatsApp."],
  contacts: ["Contatos", "Organize seus contatos, listas e segmentos."],
  reports: ["Relatórios", "Entenda o desempenho da sua operação."],
  support: ["Central de suporte", "Acompanhe solicitações e ajude seus clientes."],
  admin: ["Clientes e equipe", "Gerencie contas, acessos e permissões."],
  settings: ["Configurações", "Gerencie canais, integrações e preferências."],
};

const bots = [
  { name: "Atendimento inicial", icon: MessageCircle, channel: "+55 11 99999-9080", volume: "638", status: "Ativo", time: "há 12 min" },
  { name: "Recuperação de vendas", icon: Sparkles, channel: "+55 11 99999-9080", volume: "402", status: "Ativo", time: "ontem" },
  { name: "Confirmação de agenda", icon: CheckCircle2, channel: "+55 21 98888-1042", volume: "244", status: "Pausado", time: "há 3 dias" },
];

export default function Home() {
  const [signedIn, setSignedIn] = useState(false);
  const [role, setRole] = useState<Role>("user");
  const [page, setPage] = useState<PageKey>("overview");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [toast, setToast] = useState("");

  function action(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(""), 2600);
  }

  if (!signedIn) return <Login onLogin={() => setSignedIn(true)} />;

  const navigation = role === "admin" ? adminNavigation : userNavigation;
  const [title, subtitle] = pageCopy[page];

  function navigate(next: PageKey) {
    setPage(next); setMobileMenu(false);
  }

  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileMenu ? "sidebar-open" : ""}`}>
        <div className="brand"><span className="brand-mark"><MessageCircle /></span><span>ConversaFlow</span><button className="icon-button mobile-close" onClick={() => setMobileMenu(false)} aria-label="Fechar menu"><X /></button></div>
        <div className="workspace"><span className="workspace-avatar">ES</span><div><strong>Estúdio Solar</strong><small>Plano crescimento</small></div><ChevronDown /></div>
        <nav className="primary-nav" aria-label="Navegação principal">
          <span className="nav-eyebrow">{role === "admin" ? "Administração" : "Operação"}</span>
          {navigation.map(([key, label, Icon]) => <button key={key} onClick={() => navigate(key)} className={page === key ? "active" : ""}><Icon /><span>{label}</span>{key === "conversations" && <em>8</em>}</button>)}
        </nav>
        <nav className="secondary-nav">
          {role === "user" && <button onClick={() => navigate("support")}><CircleHelp /><span>Ajuda e suporte</span></button>}
          {role === "user" && <button onClick={() => navigate("settings")}><Settings /><span>Configurações</span></button>}
        </nav>
        <div className="profile-card">
          <span className="avatar">MR</span><div><strong>Maurício Reis</strong><small>{role === "admin" ? "Administrador" : "Gestor da conta"}</small></div>
          <button className="icon-button" aria-label="Sair" onClick={() => setSignedIn(false)}><LogOut /></button>
        </div>
      </aside>

      {mobileMenu && <button className="backdrop" aria-label="Fechar menu" onClick={() => setMobileMenu(false)} />}

      <div className="main-area">
        <header className="topbar">
          <button className="icon-button mobile-menu" onClick={() => setMobileMenu(true)} aria-label="Abrir menu"><Menu /></button>
          <div className="mobile-brand"><span className="brand-mark"><MessageCircle /></span>ConversaFlow</div>
          <label className="search-field"><Search /><input aria-label="Buscar" placeholder="Buscar conversas, contatos ou bots" /><kbd>⌘ K</kbd></label>
          <div className="top-actions">
            <button className="icon-button notification" aria-label="Notificações"><Bell /><i /></button>
            <button className="role-switch" onClick={() => { setRole(role === "user" ? "admin" : "user"); setPage("overview"); }}><ShieldCheck /><span>{role === "user" ? "Modo usuário" : "Modo admin"}</span><ChevronDown /></button>
          </div>
        </header>

        <main className="content">
          <div className="page-heading">
            <div><span className="mobile-eyebrow">{role === "admin" ? "Administração" : "Operação"}</span><h1>{title}</h1><p>{subtitle}</p></div>
            {page === "overview" && <button className="primary-button" onClick={() => action("Nova campanha iniciada")}><Plus />Criar campanha</button>}
          </div>
          {page === "overview" ? <Overview role={role} onNavigate={navigate} onAction={action} /> : <FeaturePage page={page} onAction={action} />}
        </main>

        <nav className="bottom-nav" aria-label="Navegação mobile">
          {(role === "user" ? userNavigation.slice(0, 4) : adminNavigation.slice(0, 4)).map(([key, label, Icon]) => <button key={key} onClick={() => navigate(key)} className={page === key ? "active" : ""}><Icon /><span>{label.split(" ")[0]}</span></button>)}
          <button onClick={() => setMobileMenu(true)}><Menu /><span>Mais</span></button>
        </nav>
      </div>
      {toast && <div className="toast"><CheckCircle2 />{toast}</div>}
    </div>
  );
}

function Login({ onLogin }: { onLogin: () => void }) {
  const [showPassword, setShowPassword] = useState(false);
  return <main className="login-page">
    <section className="login-showcase">
      <div className="login-brand"><span className="brand-mark"><MessageCircle /></span>ConversaFlow</div>
      <div className="showcase-copy"><span className="pill"><Sparkles />Atendimento inteligente</span><h1>Transforme conversas em resultados.</h1><p>Gerencie bots, campanhas e atendimentos do WhatsApp em uma plataforma simples e completa.</p><div className="quote"><p>“Nossa equipe ganhou agilidade e nunca mais perdeu uma conversa importante.”</p><span><strong>Ana Martins</strong> · Operações na Solar</span></div></div>
      <small>© 2026 ConversaFlow</small>
    </section>
    <section className="login-form-wrap">
      <form className="login-form" onSubmit={(event) => { event.preventDefault(); onLogin(); }}>
        <div className="login-mobile-brand"><span className="brand-mark"><MessageCircle /></span>ConversaFlow</div>
        <span className="login-icon"><LockKeyhole /></span><h2>Bem-vindo de volta</h2><p>Entre para acessar sua central de atendimento.</p>
        <label>E-mail<input type="email" defaultValue="demo@conversaflow.com" required /></label>
        <label>Senha<span className="password-wrap"><input type={showPassword ? "text" : "password"} defaultValue="conversaflow" required /><button type="button" onClick={() => setShowPassword(!showPassword)}>{showPassword ? "Ocultar" : "Mostrar"}</button></span></label>
        <div className="login-options"><label><input type="checkbox" defaultChecked />Lembrar de mim</label><button type="button">Esqueci minha senha</button></div>
        <button className="login-submit" type="submit">Entrar na plataforma</button>
        <small>Este é um protótipo. Use os dados preenchidos para entrar.</small>
      </form>
    </section>
  </main>;
}

function Overview({ role, onNavigate, onAction }: { role: Role; onNavigate: (page: PageKey) => void; onAction: (message: string) => void }) {
  if (role === "admin") return <AdminOverview onNavigate={onNavigate} />;
  return <>
    <section className="metrics-grid">
      <Metric label="Conversas" value="1.284" change="12%" detail="vs. período anterior" positive icon={MessagesSquare} />
      <Metric label="Taxa de resposta" value="92%" change="3,1%" detail="vs. período anterior" positive icon={Activity} />
      <Metric label="Contatos ativos" value="8.420" change="346 novos" detail="neste período" positive icon={Users} />
      <Metric label="Bots ativos" value="4 de 5" change="1 pausado" detail="requer atenção" icon={Bot} />
    </section>
    <section className="dashboard-grid">
      <div className="panel performance-panel"><div className="panel-heading"><div><h2>Desempenho das conversas</h2><p>Volume diário nos últimos 7 dias</p></div><button>Últimos 7 dias <ChevronDown /></button></div><div className="chart" aria-label="Gráfico de volume de conversas"><div className="chart-labels"><span>600</span><span>450</span><span>300</span><span>150</span><span>0</span></div><div className="bars">{[45,62,50,76,61,88,70].map((height, index) => <div key={index} className="bar-slot"><span style={{height:`${height}%`}}/><small>{["Seg","Ter","Qua","Qui","Sex","Sáb","Dom"][index]}</small></div>)}</div></div></div>
      <div className="panel quick-panel"><div className="panel-heading"><div><h2>Ações rápidas</h2><p>Comece uma nova tarefa</p></div></div><div className="quick-actions"><button onClick={() => onAction("Editor de bot aberto")}><span><WandSparkles /></span><div><strong>Criar novo bot</strong><small>Configure um fluxo automático</small></div></button><button onClick={() => onAction("Importação de contatos iniciada")}><span><Users /></span><div><strong>Importar contatos</strong><small>Adicione sua base de clientes</small></div></button><button onClick={() => onAction("Novo template iniciado")}><span><FileText /></span><div><strong>Novo template</strong><small>Crie uma mensagem aprovada</small></div></button></div><div className="connection-status"><span><CheckCircle2 /></span><div><strong>WhatsApp conectado</strong><small>Sincronizado há 2 minutos</small></div></div></div>
    </section>
    <section className="panel bots-panel"><div className="panel-heading"><div><h2>Bots recentes</h2><p>Acompanhe suas automações mais utilizadas</p></div><button className="text-button" onClick={() => onNavigate("bots")}>Ver todos</button></div><div className="data-table"><div className="table-head"><span>Bot</span><span>Número conectado</span><span>Interações</span><span>Status</span><span>Atualização</span><span /></div>{bots.map(({name, icon: Icon, channel, volume, status, time}) => <div className="table-row" key={name}><span className="bot-name"><i><Icon /></i><strong>{name}</strong></span><span>{channel}</span><span><strong>{volume}</strong></span><span><em className={status === "Ativo" ? "status active" : "status paused"}>{status}</em></span><span className="muted">{time}</span><button className="icon-button" aria-label={`Mais opções para ${name}`}><MoreHorizontal /></button></div>)}</div></section>
  </>;
}

function Metric({ label, value, change, detail, positive, icon: Icon }: { label: string; value: string; change: string; detail: string; positive?: boolean; icon: typeof Bot }) {
  return <article className="metric-card"><div className="metric-top"><span>{label}</span><i><Icon /></i></div><strong>{value}</strong><p className={positive ? "positive" : "attention"}>{change} <span>{detail}</span></p></article>;
}

function AdminOverview({ onNavigate }: { onNavigate: (page: PageKey) => void }) {
  return <><section className="metrics-grid"><Metric label="Contas ativas" value="126" change="8 novas" detail="neste mês" positive icon={Users}/><Metric label="Bots operando" value="318" change="99,4%" detail="de disponibilidade" positive icon={Bot}/><Metric label="Tickets abertos" value="14" change="3 urgentes" detail="aguardando equipe" icon={Headphones}/><Metric label="Mensagens processadas" value="2,4 mi" change="18%" detail="vs. mês anterior" positive icon={Send}/></section><section className="dashboard-grid admin-grid"><div className="panel"><div className="panel-heading"><div><h2>Saúde da plataforma</h2><p>Serviços monitorados em tempo real</p></div><em className="status active">Operacional</em></div>{["API principal","Processamento de webhooks","Fila de mensagens","Banco de dados"].map((item, i)=><div className="health-row" key={item}><span><CheckCircle2 />{item}</span><strong>{["99,99%","99,97%","99,95%","100%"][i]}</strong></div>)}</div><div className="panel quick-panel"><div className="panel-heading"><div><h2>Administração</h2><p>Acessos mais utilizados</p></div></div><div className="quick-actions"><button onClick={()=>onNavigate("admin")}><span><Users/></span><div><strong>Gerenciar clientes</strong><small>Contas, planos e permissões</small></div></button><button onClick={()=>onNavigate("support")}><span><Headphones/></span><div><strong>Ver tickets</strong><small>14 solicitações abertas</small></div></button><button onClick={()=>onNavigate("reports")}><span><ChartNoAxesCombined/></span><div><strong>Relatório global</strong><small>Uso e desempenho</small></div></button></div></div></section></>;
}

function FeaturePage({ page, onAction }: { page: PageKey; onAction: (message: string) => void }) {
  const [title, subtitle] = pageCopy[page];
  return <section className="feature-panel panel"><div className="feature-hero"><span><Bot /></span><div><h2>{title}</h2><p>{subtitle}</p></div><button className="primary-button" onClick={() => onAction(`Nova ação em ${title}`)}><Plus />Nova ação</button></div><div className="feature-toolbar"><label><Search/><input placeholder={`Buscar em ${title.toLowerCase()}`} /></label><button>Todos os status <ChevronDown/></button></div><div className="feature-list">{["Item principal","Automação de boas-vindas","Fluxo de acompanhamento","Configuração padrão"].map((item,index)=><article key={item}><span className="list-icon">{index+1}</span><div><strong>{item}</strong><small>Atualizado {index === 0 ? "há poucos minutos" : `há ${index + 1} dias`}</small></div><em className={index === 2 ? "status paused" : "status active"}>{index === 2 ? "Pausado" : "Ativo"}</em><button className="icon-button"><MoreHorizontal/></button></article>)}</div></section>;
}
