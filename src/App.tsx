import { useState } from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import {
  Activity, ArrowDownRight, ArrowRight, ArrowUpRight, Bell, CalendarClock,
  ChevronDown, CircleHelp, Dumbbell, LayoutDashboard, Menu, Plus, Search,
  Settings, Users, X, Zap,
} from "lucide-react";
import { formatINR } from "./lib/utils";

const navItems = [
  { label: "Overview", to: "/", icon: LayoutDashboard },
  { label: "Leads", to: "/leads", icon: Users },
  { label: "Follow-ups", to: "/follow-ups", icon: CalendarClock },
  { label: "Activities", to: "/activities", icon: Activity },
  { label: "Reports", to: "/reports", icon: ArrowUpRight },
  { label: "Staff", to: "/staff", icon: Dumbbell },
  { label: "Settings", to: "/settings", icon: Settings },
];

const stats = [
  { label: "Total leads", value: "248", change: "+12.8%", positive: true, note: "vs last month", icon: Users, tint: "blue" },
  { label: "New this month", value: "36", change: "+8.2%", positive: true, note: "vs last month", icon: Zap, tint: "violet" },
  { label: "Trials scheduled", value: "18", change: "+4.1%", positive: true, note: "vs last month", icon: CalendarClock, tint: "amber" },
  { label: "Members converted", value: "12", change: "-2.4%", positive: false, note: "vs last month", icon: Dumbbell, tint: "green" },
];

const pipeline = [
  { name: "New", count: 42, color: "bg-sky-500", percent: 100 },
  { name: "Contacted", count: 68, color: "bg-violet-500", percent: 78 },
  { name: "Interested", count: 54, color: "bg-amber-500", percent: 64 },
  { name: "Trial booked", count: 32, color: "bg-orange-500", percent: 45 },
  { name: "Joined", count: 38, color: "bg-emerald-500", percent: 55 },
];

const recentLeads = [
  { name: "Aarav Sharma", phone: "+91 98765 43210", source: "Instagram", status: "Interested", date: "Today, 10:42 AM", initials: "AS", tone: "blue" },
  { name: "Priya Verma", phone: "+91 91234 56780", source: "Walk-in", status: "Trial booked", date: "Today, 9:18 AM", initials: "PV", tone: "pink" },
  { name: "Rohan Kumar", phone: "+91 99887 76655", source: "Website", status: "Contacted", date: "Yesterday", initials: "RK", tone: "amber" },
  { name: "Ananya Singh", phone: "+91 90909 80808", source: "Referral", status: "New", date: "Yesterday", initials: "AS", tone: "green" },
];

function StatusPill({ status }: { status: string }) {
  const styles: Record<string, string> = {
    Interested: "bg-amber-50 text-amber-700",
    "Trial booked": "bg-violet-50 text-violet-700",
    Contacted: "bg-sky-50 text-sky-700",
    New: "bg-slate-100 text-slate-600",
    Joined: "bg-emerald-50 text-emerald-700",
  };
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${styles[status] ?? "bg-slate-100 text-slate-600"}`}>{status}</span>;
}

function Dashboard() {
  return (
    <div className="space-y-7">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-medium text-slate-500">Friday, 30 October 2026</p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Good evening 👋</h1>
          <p className="mt-1 text-sm text-slate-500">Here’s what’s happening at your gym today.</p>
        </div>
        <button className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700">
          <Plus size={17} /> Add new lead
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;
          return <div key={item.label} className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm shadow-slate-100/70">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-500">{item.label}</span>
              <span className={`grid size-9 place-items-center rounded-xl ${item.tint === "blue" ? "bg-blue-50 text-blue-600" : item.tint === "violet" ? "bg-violet-50 text-violet-600" : item.tint === "amber" ? "bg-amber-50 text-amber-600" : "bg-emerald-50 text-emerald-600"}`}><Icon size={18} /></span>
            </div>
            <div className="mt-4 flex items-end justify-between gap-2">
              <p className="text-3xl font-bold tracking-tight text-slate-900">{item.value}</p>
              <span className={`mb-1 inline-flex items-center gap-1 text-xs font-semibold ${item.positive ? "text-emerald-600" : "text-rose-600"}`}>{item.positive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}{item.change}</span>
            </div>
            <p className="mt-1 text-xs text-slate-400">{item.note}</p>
          </div>;
        })}
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.45fr_1fr]">
        <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm shadow-slate-100/70 sm:p-6">
          <div className="flex items-center justify-between">
            <div><h2 className="font-bold text-slate-900">Lead pipeline</h2><p className="mt-1 text-xs text-slate-500">A snapshot of your lead journey</p></div>
            <button className="text-xs font-semibold text-blue-600 hover:text-blue-700">View leads <ArrowRight className="ml-1 inline" size={13} /></button>
          </div>
          <div className="mt-7 space-y-5">
            {pipeline.map((stage) => <div key={stage.name}>
              <div className="mb-2 flex items-center justify-between text-sm"><span className="font-medium text-slate-600">{stage.name}</span><span className="font-semibold tabular-nums text-slate-800">{stage.count}</span></div>
              <div className="h-2 overflow-hidden rounded-full bg-slate-100"><div className={`h-full rounded-full ${stage.color}`} style={{ width: `${stage.percent}%` }} /></div>
            </div>)}
          </div>
          <p className="mt-6 border-t border-slate-100 pt-4 text-xs text-slate-400">Sample preview data — live metrics will appear after database setup.</p>
        </section>

        <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm shadow-slate-100/70 sm:p-6">
          <div className="flex items-center justify-between"><div><h2 className="font-bold text-slate-900">Follow-up overview</h2><p className="mt-1 text-xs text-slate-500">Keep every conversation moving</p></div><CalendarClock size={18} className="text-slate-400" /></div>
          <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-rose-50 p-4"><p className="text-xs font-medium text-rose-600">Overdue</p><p className="mt-2 text-2xl font-bold text-rose-700">07</p><p className="mt-1 text-[11px] text-rose-500">Needs attention</p></div>
            <div className="rounded-xl bg-blue-50 p-4"><p className="text-xs font-medium text-blue-600">Due today</p><p className="mt-2 text-2xl font-bold text-blue-700">12</p><p className="mt-1 text-[11px] text-blue-500">Scheduled follow-ups</p></div>
          </div>
          <div className="mt-5 space-y-3">
            <div className="flex items-center justify-between text-sm"><span className="text-slate-500">Completed this week</span><span className="font-semibold text-slate-800">34 / 42</span></div>
            <div className="h-2 rounded-full bg-slate-100"><div className="h-full w-[81%] rounded-full bg-blue-500" /></div>
            <p className="text-xs text-slate-400">81% completion rate</p>
          </div>
        </section>
      </div>

      <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm shadow-slate-100/70">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-5 sm:px-6">
          <div><h2 className="font-bold text-slate-900">Recently added leads</h2><p className="mt-1 text-xs text-slate-500">Your latest prospects</p></div>
          <button className="text-xs font-semibold text-blue-600 hover:text-blue-700">See all</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[650px] text-left text-sm">
            <thead className="bg-slate-50/80 text-xs uppercase tracking-wide text-slate-400"><tr><th className="px-6 py-3 font-semibold">Lead</th><th className="px-4 py-3 font-semibold">Source</th><th className="px-4 py-3 font-semibold">Status</th><th className="px-4 py-3 font-semibold">Added</th></tr></thead>
            <tbody className="divide-y divide-slate-100">
              {recentLeads.map((lead) => <tr key={lead.phone} className="transition hover:bg-slate-50/70">
                <td className="px-6 py-3.5"><div className="flex items-center gap-3"><span className={`grid size-9 place-items-center rounded-full text-xs font-bold ${lead.tone === "blue" ? "bg-blue-100 text-blue-700" : lead.tone === "pink" ? "bg-pink-100 text-pink-700" : lead.tone === "amber" ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"}`}>{lead.initials}</span><div><p className="font-semibold text-slate-800">{lead.name}</p><p className="mt-0.5 text-xs text-slate-400">{lead.phone}</p></div></div></td>
                <td className="px-4 py-3.5 text-slate-500">{lead.source}</td><td className="px-4 py-3.5"><StatusPill status={lead.status} /></td><td className="px-4 py-3.5 text-xs text-slate-400">{lead.date}</td>
              </tr>)}
            </tbody>
          </table>
        </div>
        <div className="border-t border-slate-100 px-6 py-3 text-xs text-slate-400">Sample data shown for layout preview only.</div>
      </section>
      <p className="text-center text-xs text-slate-400">GymFlow CRM · Built for focused follow-ups and better member conversions</p>
    </div>
  );
}

function Placeholder({ title }: { title: string }) {
  return <div className="grid min-h-[55vh] place-items-center rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center"><div className="max-w-sm"><div className="mx-auto grid size-14 place-items-center rounded-2xl bg-blue-50 text-blue-600"><Dumbbell size={25} /></div><h1 className="mt-4 text-xl font-bold text-slate-900">{title}</h1><p className="mt-2 text-sm leading-6 text-slate-500">This module is part of the implementation roadmap. It will be connected to Supabase and made functional in its development phase.</p></div></div>;
}

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeClass = ({ isActive }: { isActive: boolean }) => `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${isActive ? "bg-blue-50 text-blue-700" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"}`;

  return <div className="min-h-screen bg-[#f7f8fa]">
    {mobileOpen && <button aria-label="Close menu overlay" onClick={() => setMobileOpen(false)} className="fixed inset-0 z-40 bg-slate-950/30 lg:hidden" />}
    <aside className={`fixed inset-y-0 left-0 z-50 flex w-[250px] flex-col border-r border-slate-200 bg-white px-4 py-5 transition-transform lg:translate-x-0 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}>
      <div className="flex items-center justify-between px-2"><div className="flex items-center gap-2.5"><span className="grid size-9 place-items-center rounded-xl bg-blue-600 text-white shadow-sm"><Dumbbell size={19} /></span><div><p className="text-[15px] font-extrabold tracking-tight text-slate-900">GymFlow</p><p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-400">Lead management</p></div></div><button onClick={() => setMobileOpen(false)} className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 lg:hidden"><X size={18} /></button></div>
      <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50/80 p-3"><p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Workspace</p><div className="mt-2 flex items-center justify-between"><div className="flex items-center gap-2"><span className="grid size-8 place-items-center rounded-lg bg-slate-900 text-xs font-bold text-white">FG</span><div><p className="text-xs font-bold text-slate-800">Fitness Gym</p><p className="text-[10px] text-slate-400">Owner workspace</p></div></div><ChevronDown size={15} className="text-slate-400" /></div></div>
      <nav className="mt-7 flex-1 space-y-1"><p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">Workspace</p>{navItems.map(({ label, to, icon: Icon }) => <NavLink key={to} to={to} end={to === "/"} className={activeClass} onClick={() => setMobileOpen(false)}><Icon size={17} strokeWidth={1.8} />{label}</NavLink>)}</nav>
      <div className="rounded-xl bg-slate-900 p-3.5 text-white"><div className="flex items-center gap-2"><CircleHelp size={16} className="text-blue-300" /><p className="text-xs font-semibold">Need a hand?</p></div><p className="mt-2 text-[11px] leading-5 text-slate-300">Your gym operations, organised in one place.</p><button className="mt-3 text-xs font-semibold text-blue-300 hover:text-white">Help centre <ArrowRight className="ml-1 inline" size={12} /></button></div>
      <div className="mt-4 flex items-center gap-3 border-t border-slate-100 px-2 pt-4"><span className="grid size-9 place-items-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">OW</span><div className="min-w-0 flex-1"><p className="truncate text-xs font-bold text-slate-800">Gym Owner</p><p className="text-[10px] text-slate-400">Owner account</p></div><Settings size={16} className="text-slate-400" /></div>
    </aside>

    <div className="lg:pl-[250px]">
      <header className="sticky top-0 z-30 flex h-[68px] items-center justify-between border-b border-slate-200/80 bg-white/90 px-4 backdrop-blur-xl sm:px-7">
        <div className="flex items-center gap-3"><button onClick={() => setMobileOpen(true)} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden"><Menu size={19} /></button><div className="hidden items-center gap-2 text-xs text-slate-400 sm:flex"><span>Workspace</span><span>/</span><span className="font-semibold text-slate-700">Overview</span></div><div className="relative sm:hidden"><Search className="absolute left-3 top-2.5 text-slate-400" size={15} /><input aria-label="Search" placeholder="Search..." className="h-9 w-36 rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-2 text-xs outline-none focus:border-blue-400" /></div></div>
        <div className="flex items-center gap-2 sm:gap-3"><div className="relative hidden sm:block"><Search className="absolute left-3 top-2.5 text-slate-400" size={15} /><input aria-label="Search leads" placeholder="Search anything..." className="h-9 w-52 rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-3 text-xs outline-none transition focus:border-blue-400 focus:bg-white" /></div><button aria-label="Notifications" className="relative rounded-xl p-2 text-slate-500 hover:bg-slate-100"><Bell size={18} /><span className="absolute right-2 top-2 size-1.5 rounded-full bg-rose-500 ring-2 ring-white" /></button><div className="hidden h-7 w-px bg-slate-200 sm:block" /><button className="flex items-center gap-2 rounded-xl p-1.5 hover:bg-slate-50"><span className="grid size-8 place-items-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">OW</span><span className="hidden text-left sm:block"><span className="block text-xs font-semibold text-slate-800">Gym Owner</span><span className="block text-[10px] text-slate-400">Administrator</span></span><ChevronDown size={14} className="hidden text-slate-400 sm:block" /></button></div>
      </header>
      <main className="mx-auto max-w-[1500px] p-4 sm:p-7 lg:p-8">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/leads" element={<Placeholder title="Lead management" />} />
          <Route path="/follow-ups" element={<Placeholder title="Follow-ups" />} />
          <Route path="/activities" element={<Placeholder title="Activity timeline" />} />
          <Route path="/reports" element={<Placeholder title="Reports & analytics" />} />
          <Route path="/staff" element={<Placeholder title="Staff management" />} />
          <Route path="/settings" element={<Placeholder title="Gym settings" />} />
          <Route path="*" element={<Placeholder title="Page not found" />} />
        </Routes>
      </main>
    </div>
  </div>;
}