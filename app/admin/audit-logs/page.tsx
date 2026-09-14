"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Activity,
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Database,
  Eye,
  Filter,
  LockKeyhole,
  MoreHorizontal,
  Search,
  ShieldCheck,
  UserCog,
  Users,
  X,
} from "lucide-react";

type LogType =
  | "Authentication"
  | "Student"
  | "Teacher"
  | "Payment"
  | "Batch"
  | "System";

type LogStatus = "Success" | "Warning" | "Failed";

type AuditLog = {
  id: string;
  actor: string;
  role: string;
  action: string;
  description: string;
  type: LogType;
  status: LogStatus;
  date: string;
  time: string;
  ip: string;
  entity: string;
  entityId: string;
};

const initialLogs: AuditLog[] = [
  {
    id: "LOG-9821",
    actor: "Admin",
    role: "Super Admin",
    action: "Teacher approved",
    description: "Teacher application was approved after document verification.",
    type: "Teacher",
    status: "Success",
    date: "14 Sep 2026",
    time: "06:21 AM",
    ip: "192.168.1.24",
    entity: "Teacher",
    entityId: "TCH-2084",
  },
  {
    id: "LOG-9820",
    actor: "Admin",
    role: "Super Admin",
    action: "Payment refunded",
    description: "Student payment was marked for refund from the payment workspace.",
    type: "Payment",
    status: "Success",
    date: "14 Sep 2026",
    time: "06:04 AM",
    ip: "192.168.1.24",
    entity: "Payment",
    entityId: "PAY-10477",
  },
  {
    id: "LOG-9819",
    actor: "Admin",
    role: "Finance Admin",
    action: "Payout processing",
    description: "Teacher payout moved from pending to processing.",
    type: "Payment",
    status: "Success",
    date: "14 Sep 2026",
    time: "05:48 AM",
    ip: "192.168.1.18",
    entity: "Payout",
    entityId: "PO-5819",
  },
  {
    id: "LOG-9818",
    actor: "System",
    role: "Automation",
    action: "Weekly payout cycle",
    description: "Weekly teacher earnings were generated from verified completed classes.",
    type: "System",
    status: "Success",
    date: "14 Sep 2026",
    time: "05:00 AM",
    ip: "SYSTEM",
    entity: "Payout Cycle",
    entityId: "WEEK-37",
  },
  {
    id: "LOG-9817",
    actor: "Admin",
    role: "Operations Admin",
    action: "Batch updated",
    description: "Batch timetable and subject configuration were updated.",
    type: "Batch",
    status: "Success",
    date: "13 Sep 2026",
    time: "11:42 PM",
    ip: "192.168.1.18",
    entity: "Batch",
    entityId: "BAT-1108",
  },
  {
    id: "LOG-9816",
    actor: "Rahul Admin",
    role: "Support Admin",
    action: "Student profile viewed",
    description: "Student profile and enrollment information were accessed.",
    type: "Student",
    status: "Success",
    date: "13 Sep 2026",
    time: "10:38 PM",
    ip: "192.168.1.31",
    entity: "Student",
    entityId: "STD-4412",
  },
  {
    id: "LOG-9815",
    actor: "Unknown",
    role: "Unknown",
    action: "Login attempt failed",
    description: "Administrator login attempt failed because of invalid credentials.",
    type: "Authentication",
    status: "Failed",
    date: "13 Sep 2026",
    time: "09:52 PM",
    ip: "103.45.91.18",
    entity: "Admin Login",
    entityId: "AUTH-7741",
  },
  {
    id: "LOG-9814",
    actor: "Admin",
    role: "Super Admin",
    action: "Settings updated",
    description: "Platform notification settings were changed.",
    type: "System",
    status: "Warning",
    date: "13 Sep 2026",
    time: "08:33 PM",
    ip: "192.168.1.24",
    entity: "Settings",
    entityId: "SET-01",
  },
  {
    id: "LOG-9813",
    actor: "Admin",
    role: "Teacher Admin",
    action: "Teacher profile updated",
    description: "Teacher subject mapping and availability were updated.",
    type: "Teacher",
    status: "Success",
    date: "13 Sep 2026",
    time: "07:26 PM",
    ip: "192.168.1.18",
    entity: "Teacher",
    entityId: "TCH-2072",
  },
  {
    id: "LOG-9812",
    actor: "Admin",
    role: "Operations Admin",
    action: "New batch created",
    description: "A new Class 8 Mathematics batch was created.",
    type: "Batch",
    status: "Success",
    date: "13 Sep 2026",
    time: "06:17 PM",
    ip: "192.168.1.31",
    entity: "Batch",
    entityId: "BAT-1107",
  },
];

const typeStyles: Record<LogType, string> = {
  Authentication: "bg-violet-500/10 text-violet-700 border-violet-200",
  Student: "bg-sky-500/10 text-sky-700 border-sky-200",
  Teacher: "bg-[#42d4bc]/10 text-[#159e8b] border-[#42d4bc]/20",
  Payment: "bg-emerald-500/10 text-emerald-700 border-emerald-200",
  Batch: "bg-amber-500/10 text-amber-700 border-amber-200",
  System: "bg-black/5 text-black/60 border-black/10",
};

const statusStyles: Record<LogStatus, string> = {
  Success: "bg-emerald-500/10 text-emerald-700 border-emerald-200",
  Warning: "bg-amber-500/10 text-amber-700 border-amber-200",
  Failed: "bg-red-500/10 text-red-700 border-red-200",
};

const typeIcons: Record<LogType, React.ReactNode> = {
  Authentication: <LockKeyhole size={17} />,
  Student: <Users size={17} />,
  Teacher: <UserCog size={17} />,
  Payment: <Database size={17} />,
  Batch: <Activity size={17} />,
  System: <ShieldCheck size={17} />,
};

function getInitials(name: string) {
  if (name === "System") return "SY";
  if (name === "Unknown") return "?";

  return name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function TypeBadge({ type }: { type: LogType }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold ${typeStyles[type]}`}
    >
      {typeIcons[type]}
      {type}
    </span>
  );
}

function StatusBadge({ status }: { status: LogStatus }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold ${statusStyles[status]}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}

function MetricCard({
  title,
  value,
  description,
  icon,
  dark = false,
}: {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={`relative overflow-hidden rounded-[26px] border p-5 shadow-sm ${
        dark
          ? "border-black bg-black !text-white shadow-xl"
          : "border-black/5 bg-white/80"
      } tq-glass`}
    >
      <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#42d4bc]/10 blur-3xl" />

      <div className="relative">
        <div className="flex items-center justify-between">
          <div
            className={`flex h-11 w-11 items-center justify-center rounded-2xl ${
              dark
                ? "bg-white/10 text-[#42d4bc]"
                : "bg-[#42d4bc]/10 text-[#159e8b]"
            }`}
          >
            {icon}
          </div>
        </div>

        <p
          className={`mt-5 text-sm font-semibold ${
            dark ? "!text-white/55" : "text-black/45"
          }`}
        >
          {title}
        </p>

        <p className="mt-1 text-2xl font-black tracking-tight">{value}</p>

        <p
          className={`mt-1 text-xs ${
            dark ? "!text-white/35" : "text-black/35"
          }`}
        >
          {description}
        </p>
      </div>
    </motion.div>
  );
}

export default function AdminAuditLogsPage() {
  const [logs] = useState<AuditLog[]>(initialLogs);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);
  const [expandedLog, setExpandedLog] = useState<string | null>(null);

  const filteredLogs = useMemo(() => {
    const query = search.trim().toLowerCase();

    return logs.filter((log) => {
      const matchesSearch =
        !query ||
        log.id.toLowerCase().includes(query) ||
        log.actor.toLowerCase().includes(query) ||
        log.role.toLowerCase().includes(query) ||
        log.action.toLowerCase().includes(query) ||
        log.description.toLowerCase().includes(query) ||
        log.entity.toLowerCase().includes(query) ||
        log.entityId.toLowerCase().includes(query) ||
        log.ip.toLowerCase().includes(query);

      const matchesType =
        typeFilter === "All" || log.type === typeFilter;

      const matchesStatus =
        statusFilter === "All" || log.status === statusFilter;

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [logs, search, typeFilter, statusFilter]);

  const successfulLogs = logs.filter(
    (log) => log.status === "Success"
  ).length;

  const warningLogs = logs.filter(
    (log) => log.status === "Warning"
  ).length;

  const failedLogs = logs.filter(
    (log) => log.status === "Failed"
  ).length;

  const authenticationEvents = logs.filter(
    (log) => log.type === "Authentication"
  ).length;

  const resetFilters = () => {
    setSearch("");
    setTypeFilter("All");
    setStatusFilter("All");
  };

  return (
    <main className="min-h-screen bg-[#f7f8f7] text-[#111]">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[7%] top-[9%] h-80 w-80 rounded-full bg-[#42d4bc]/10 blur-[110px]" />
        <div className="absolute right-[2%] top-[28%] h-96 w-96 rounded-full bg-cyan-300/10 blur-[120px]" />
        <div className="absolute bottom-[5%] left-[40%] h-80 w-80 rounded-full bg-emerald-200/10 blur-[115px]" />
      </div>

      {/* HEADER */}
      <header className="sticky top-0 z-30 border-b border-black/5 bg-[#f7f8f7]/85 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-5 py-4 lg:px-8">
          <div className="flex items-center gap-3">
            <Link href="/admin/dashboard" className="group">
              <div className="rounded-2xl bg-black px-4 py-2 text-lg font-black tracking-tight !text-white shadow-lg transition group-hover:-translate-y-0.5">
                TQ
              </div>
            </Link>

            <div className="hidden h-8 w-px bg-black/10 sm:block" />

            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-black/35">
                Admin
              </p>

              <h1 className="text-lg font-black tracking-tight">
                Audit Logs
              </h1>
            </div>
          </div>

          <nav className="hidden items-center gap-1 md:flex">
            <Link
              href="/admin/dashboard"
              className="rounded-xl px-3 py-2 text-sm font-semibold text-black/50 transition hover:bg-black/5 hover:text-black"
            >
              Overview
            </Link>

            <Link
              href="/admin/students"
              className="rounded-xl px-3 py-2 text-sm font-semibold text-black/50 transition hover:bg-black/5 hover:text-black"
            >
              Students
            </Link>

            <Link
              href="/admin/teachers"
              className="rounded-xl px-3 py-2 text-sm font-semibold text-black/50 transition hover:bg-black/5 hover:text-black"
            >
              Teachers
            </Link>

            <Link
              href="/admin/batches"
              className="rounded-xl px-3 py-2 text-sm font-semibold text-black/50 transition hover:bg-black/5 hover:text-black"
            >
              Batches
            </Link>

            <Link
              href="/admin/payments"
              className="rounded-xl px-3 py-2 text-sm font-semibold text-black/50 transition hover:bg-black/5 hover:text-black"
            >
              Payments
            </Link>

            <Link
              href="/admin/settings"
              className="rounded-xl px-3 py-2 text-sm font-semibold text-black/50 transition hover:bg-black/5 hover:text-black"
            >
              Settings
            </Link>
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-[1500px] px-5 py-8 lg:px-8">
        {/* HERO */}
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex flex-col justify-between gap-6 lg:flex-row lg:items-end"
        >
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#42d4bc]/20 bg-[#42d4bc]/10 px-3 py-1.5 text-[11px] font-black tracking-wide text-[#159e8b]">
              <ShieldCheck size={13} />
              PLATFORM ACTIVITY MONITOR
            </div>

            <h2 className="max-w-4xl text-3xl font-black leading-[1.04] tracking-[-0.045em] sm:text-4xl lg:text-5xl">
              Know
              <span className="text-[#159e8b]"> everything </span>
              that happens.
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-black/50">
              Review administrator actions, payment events, teacher changes,
              authentication activity and system operations from one audit
              trail.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-2xl border border-black/5 bg-white/75 px-4 py-3 shadow-sm tq-glass">
            <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,.55)]" />
            <span className="text-sm font-bold">System monitoring active</span>
          </div>
        </motion.section>

        {/* METRICS */}
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            title="Total Events"
            value={String(logs.length)}
            description="Recorded activity"
            icon={<Activity size={21} />}
            dark
          />

          <MetricCard
            title="Successful"
            value={String(successfulLogs)}
            description="Completed actions"
            icon={<CheckCircle2 size={21} />}
          />

          <MetricCard
            title="Warnings"
            value={String(warningLogs)}
            description="Needs review"
            icon={<AlertCircle size={21} />}
          />

          <MetricCard
            title="Failed / Security"
            value={`${failedLogs} / ${authenticationEvents}`}
            description="Failed events / auth"
            icon={<LockKeyhole size={21} />}
          />
        </section>

        {/* WORKSPACE */}
        <section className="mt-8 rounded-[30px] border border-black/5 bg-white/75 p-4 shadow-sm tq-glass sm:p-5">
          {/* CONTROLS */}
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.15em] text-black/35">
                Event Stream
              </p>

              <p className="mt-1 text-sm font-bold">
                {filteredLogs.length}{" "}
                {filteredLogs.length === 1 ? "event" : "events"} visible
              </p>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
              {/* SEARCH */}
              <div className="flex min-w-0 items-center gap-2 rounded-2xl border border-black/7 bg-white px-4 py-3 shadow-sm sm:w-[300px]">
                <Search size={17} className="shrink-0 text-black/30" />

                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search activity..."
                  className="w-full bg-transparent text-sm font-medium outline-none placeholder:text-black/30"
                />
              </div>

              {/* TYPE */}
              <div className="flex items-center gap-2 rounded-2xl border border-black/7 bg-white px-3 shadow-sm">
                <Filter size={15} className="text-black/30" />

                <select
                  value={typeFilter}
                  onChange={(event) => setTypeFilter(event.target.value)}
                  className="bg-transparent py-3 text-sm font-semibold outline-none"
                >
                  <option value="All">All Types</option>
                  <option value="Authentication">Authentication</option>
                  <option value="Student">Student</option>
                  <option value="Teacher">Teacher</option>
                  <option value="Payment">Payment</option>
                  <option value="Batch">Batch</option>
                  <option value="System">System</option>
                </select>
              </div>

              {/* STATUS */}
              <div className="flex items-center gap-2 rounded-2xl border border-black/7 bg-white px-3 shadow-sm">
                <select
                  value={statusFilter}
                  onChange={(event) => setStatusFilter(event.target.value)}
                  className="bg-transparent py-3 text-sm font-semibold outline-none"
                >
                  <option value="All">All Status</option>
                  <option value="Success">Success</option>
                  <option value="Warning">Warning</option>
                  <option value="Failed">Failed</option>
                </select>
              </div>

              {(search ||
                typeFilter !== "All" ||
                statusFilter !== "All") && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="rounded-2xl border border-black/8 bg-white px-4 py-3 text-sm font-bold text-black/55 transition hover:text-black"
                >
                  Reset
                </button>
              )}
            </div>
          </div>

          {/* TABLE */}
          <div className="mt-5 overflow-hidden rounded-[24px] border border-black/5 bg-white">
            <div className="hidden grid-cols-[1.15fr_1.5fr_.8fr_1fr_1fr_auto] gap-4 border-b border-black/5 bg-black/[0.025] px-5 py-4 text-[10px] font-black uppercase tracking-[0.14em] text-black/35 lg:grid">
              <div>Actor</div>
              <div>Activity</div>
              <div>Type</div>
              <div>Date</div>
              <div>Status</div>
              <div />
            </div>

            <div className="divide-y divide-black/5">
              {filteredLogs.map((log, index) => {
                const expanded = expandedLog === log.id;

                return (
                  <motion.div
                    key={log.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.025 }}
                  >
                    <div className="grid gap-4 px-5 py-4 lg:grid-cols-[1.15fr_1.5fr_.8fr_1fr_1fr_auto] lg:items-center">
                      {/* ACTOR */}
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-black text-sm font-black !text-white">
                          {getInitials(log.actor)}
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-sm font-black">
                            {log.actor}
                          </p>

                          <p className="truncate text-xs text-black/40">
                            {log.role}
                          </p>
                        </div>
                      </div>

                      {/* ACTIVITY */}
                      <div className="min-w-0">
                        <p className="truncate text-sm font-black">
                          {log.action}
                        </p>

                        <p className="mt-0.5 truncate text-xs text-black/40">
                          {log.description}
                        </p>
                      </div>

                      {/* TYPE */}
                      <div>
                        <TypeBadge type={log.type} />
                      </div>

                      {/* DATE */}
                      <div>
                        <p className="text-sm font-semibold">{log.date}</p>

                        <p className="mt-0.5 flex items-center gap-1 text-xs text-black/40">
                          <Clock3 size={12} />
                          {log.time}
                        </p>
                      </div>

                      {/* STATUS */}
                      <div>
                        <StatusBadge status={log.status} />
                      </div>

                      {/* ACTION */}
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            setExpandedLog(expanded ? null : log.id)
                          }
                          className="flex h-10 w-10 items-center justify-center rounded-xl bg-black/[0.035] text-black/45 transition hover:bg-black/8 hover:text-black"
                          aria-label="Expand log"
                        >
                          <ChevronDown
                            size={16}
                            className={`transition-transform ${
                              expanded ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        <button
                          type="button"
                          onClick={() => setSelectedLog(log)}
                          className="flex h-10 w-10 items-center justify-center rounded-xl bg-black !text-white transition hover:scale-105"
                          aria-label="View log"
                        >
                          <Eye size={16} />
                        </button>
                      </div>
                    </div>

                    {/* MOBILE / EXPANDED */}
                    {expanded && (
                      <div className="border-t border-black/5 bg-black/[0.018] px-5 py-4">
                        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                          <DetailBox
                            label="Event ID"
                            value={log.id}
                          />

                          <DetailBox
                            label="IP Address"
                            value={log.ip}
                          />

                          <DetailBox
                            label="Entity"
                            value={log.entity}
                          />

                          <DetailBox
                            label="Entity ID"
                            value={log.entityId}
                          />
                        </div>

                        <div className="mt-3 rounded-2xl border border-black/5 bg-white p-4">
                          <p className="text-[11px] font-black uppercase tracking-[0.12em] text-black/35">
                            Full Description
                          </p>

                          <p className="mt-2 text-sm leading-6 text-black/60">
                            {log.description}
                          </p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                );
              })}

              {filteredLogs.length === 0 && (
                <div className="px-6 py-16 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-black/5 text-black/25">
                    <Search size={22} />
                  </div>

                  <p className="mt-4 font-black">No audit events found</p>

                  <p className="mt-1 text-sm text-black/40">
                    Try another search term or filter.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* SECURITY FOOTER */}
        <section className="mt-6 grid gap-5 lg:grid-cols-[1.1fr_.9fr]">
          <div className="rounded-[30px] border border-black/5 bg-black p-6 !text-white shadow-xl shadow-black/10">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.16em] !text-white/40">
                  Audit Principle
                </p>

                <h3 className="mt-2 max-w-xl text-2xl font-black !text-white">
                  Every important admin action should leave a trace.
                </h3>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#42d4bc]/10 text-[#42d4bc]">
                <ShieldCheck size={20} />
              </div>
            </div>

            <p className="mt-4 max-w-2xl text-sm leading-6 !text-white/55">
              Production audit events should capture who performed an action,
              what changed, when it happened, the affected entity and the
              request context.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <AuditPrinciple
                title="Who"
                description="Admin or system actor"
              />

              <AuditPrinciple
                title="What"
                description="Action and entity"
              />

              <AuditPrinciple
                title="When"
                description="Timestamp and context"
              />
            </div>
          </div>

          <div className="rounded-[30px] border border-black/5 bg-white/80 p-6 shadow-sm tq-glass">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.15em] text-black/35">
                  Security Snapshot
                </p>

                <h3 className="mt-1 text-2xl font-black">
                  Current activity
                </h3>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#42d4bc]/10 text-[#159e8b]">
                <LockKeyhole size={20} />
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <SnapshotRow
                label="Successful operations"
                value={String(successfulLogs)}
              />

              <SnapshotRow
                label="Warnings requiring review"
                value={String(warningLogs)}
              />

              <SnapshotRow
                label="Failed events"
                value={String(failedLogs)}
              />

              <SnapshotRow
                label="Authentication events"
                value={String(authenticationEvents)}
                last
              />
            </div>
          </div>
        </section>

        <div className="mt-6">
          <Link
            href="/admin/dashboard"
            className="inline-flex items-center gap-2 rounded-2xl border border-black/8 bg-white/70 px-4 py-3 text-sm font-bold text-black/55 shadow-sm transition hover:bg-white hover:text-black"
          >
            <ArrowLeft size={16} />
            Back to Admin Dashboard
          </Link>
        </div>
      </div>

      {/* LOG DETAIL MODAL */}
      {selectedLog && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4 backdrop-blur-md"
          onMouseDown={(event) => {
            if (event.currentTarget === event.target) {
              setSelectedLog(null);
            }
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="w-full max-w-2xl rounded-[30px] border border-black/10 bg-white p-6 shadow-2xl"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.16em] text-black/35">
                  Audit Event
                </p>

                <h3 className="mt-1 text-2xl font-black">
                  {selectedLog.action}
                </h3>

                <p className="mt-1 text-sm text-black/40">
                  {selectedLog.id}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedLog(null)}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-black !text-white"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              <TypeBadge type={selectedLog.type} />
              <StatusBadge status={selectedLog.status} />
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <DetailBox
                label="Actor"
                value={`${selectedLog.actor} · ${selectedLog.role}`}
              />

              <DetailBox
                label="Timestamp"
                value={`${selectedLog.date} · ${selectedLog.time}`}
              />

              <DetailBox
                label="Entity"
                value={`${selectedLog.entity} · ${selectedLog.entityId}`}
              />

              <DetailBox
                label="IP Address"
                value={selectedLog.ip}
              />
            </div>

            <div className="mt-4 rounded-2xl border border-black/5 bg-black/[0.025] p-5">
              <p className="text-[11px] font-black uppercase tracking-[0.12em] text-black/35">
                Description
              </p>

              <p className="mt-2 text-sm leading-6 text-black/60">
                {selectedLog.description}
              </p>
            </div>

            <div className="mt-5 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedLog(null)}
                className="rounded-2xl bg-black px-5 py-3 text-sm font-bold !text-white"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </main>
  );
}

function DetailBox({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-black/5 bg-white p-4">
      <p className="text-[11px] font-black uppercase tracking-[0.1em] text-black/35">
        {label}
      </p>

      <p className="mt-1 break-words text-sm font-black">{value}</p>
    </div>
  );
}

function AuditPrinciple({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl bg-white/6 p-4">
      <p className="text-sm font-black !text-white">{title}</p>
      <p className="mt-1 text-xs !text-white/40">{description}</p>
    </div>
  );
}

function SnapshotRow({
  label,
  value,
  last = false,
}: {
  label: string;
  value: string;
  last?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between pb-4 ${
        last ? "" : "border-b border-black/5"
      }`}
    >
      <span className="text-sm font-medium text-black/50">{label}</span>
      <span className="text-sm font-black">{value}</span>
    </div>
  );
}