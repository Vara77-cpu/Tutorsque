"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  Cloud,
  Database,
  Globe2,
  HardDrive,
  LockKeyhole,
  RefreshCcw,
  Server,
  Settings2,
  ShieldCheck,
  Wifi,
  Zap,
} from "lucide-react";

type ServiceStatus = "Operational" | "Warning" | "Offline";

type Service = {
  id: string;
  name: string;
  description: string;
  status: ServiceStatus;
  uptime: string;
  latency: string;
  icon: React.ReactNode;
};

type ActivityItem = {
  id: string;
  title: string;
  description: string;
  time: string;
  status: "Success" | "Warning";
};

const initialServices: Service[] = [
  {
    id: "svc-api",
    name: "Application API",
    description: "Core TutorsQue backend services",
    status: "Operational",
    uptime: "99.99%",
    latency: "82 ms",
    icon: <Server size={19} />,
  },
  {
    id: "svc-db",
    name: "PostgreSQL Database",
    description: "Primary transactional database",
    status: "Operational",
    uptime: "99.98%",
    latency: "18 ms",
    icon: <Database size={19} />,
  },
  {
    id: "svc-live",
    name: "Live Classroom",
    description: "Live video classroom infrastructure",
    status: "Operational",
    uptime: "99.95%",
    latency: "64 ms",
    icon: <Wifi size={19} />,
  },
  {
    id: "svc-storage",
    name: "File Storage",
    description: "Documents and educational assets",
    status: "Operational",
    uptime: "99.97%",
    latency: "31 ms",
    icon: <HardDrive size={19} />,
  },
  {
    id: "svc-payment",
    name: "Payment Gateway",
    description: "Student payment processing layer",
    status: "Operational",
    uptime: "99.96%",
    latency: "124 ms",
    icon: <Zap size={19} />,
  },
  {
    id: "svc-cache",
    name: "Redis / Queue",
    description: "Cache and background job processing",
    status: "Warning",
    uptime: "99.72%",
    latency: "186 ms",
    icon: <Cloud size={19} />,
  },
];

const initialActivities: ActivityItem[] = [
  {
    id: "ACT-01",
    title: "Database health check completed",
    description: "PostgreSQL responded within the expected threshold.",
    time: "2 min ago",
    status: "Success",
  },
  {
    id: "ACT-02",
    title: "Redis latency increased",
    description: "Background queue response time crossed the warning threshold.",
    time: "7 min ago",
    status: "Warning",
  },
  {
    id: "ACT-03",
    title: "Payment gateway health check completed",
    description: "Payment provider is responding normally.",
    time: "11 min ago",
    status: "Success",
  },
  {
    id: "ACT-04",
    title: "Live classroom service checked",
    description: "Live session infrastructure is operational.",
    time: "18 min ago",
    status: "Success",
  },
  {
    id: "ACT-05",
    title: "Storage service checked",
    description: "File storage read and write health checks passed.",
    time: "24 min ago",
    status: "Success",
  },
];

const statusStyles: Record<ServiceStatus, string> = {
  Operational:
    "border-emerald-200 bg-emerald-500/10 text-emerald-700",
  Warning:
    "border-amber-200 bg-amber-500/10 text-amber-700",
  Offline:
    "border-red-200 bg-red-500/10 text-red-700",
};

function StatusBadge({ status }: { status: ServiceStatus }) {
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
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-2xl ${
            dark
              ? "bg-white/10 text-[#42d4bc]"
              : "bg-[#42d4bc]/10 text-[#159e8b]"
          }`}
        >
          {icon}
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

export default function AdminSystemPage() {
  const [services, setServices] = useState<Service[]>(initialServices);
  const [activities, setActivities] =
    useState<ActivityItem[]>(initialActivities);

  const [checking, setChecking] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [apiLogs, setApiLogs] = useState(true);
  const [strictMode, setStrictMode] = useState(true);

  const operationalServices = services.filter(
    (service) => service.status === "Operational"
  ).length;

  const warningServices = services.filter(
    (service) => service.status === "Warning"
  ).length;

  const offlineServices = services.filter(
    (service) => service.status === "Offline"
  ).length;

  const healthPercentage = useMemo(() => {
    if (services.length === 0) {
      return 0;
    }

    return Math.round(
      (operationalServices / services.length) * 100
    );
  }, [operationalServices, services.length]);

  const runHealthCheck = () => {
    setChecking(true);

    window.setTimeout(() => {
      setServices((current) =>
        current.map((service) => {
          if (service.status === "Warning") {
            return {
              ...service,
              status: "Operational",
              latency:
                service.id === "svc-cache" ? "92 ms" : service.latency,
            };
          }

          return service;
        })
      );

      setActivities((current) => [
        {
          id: `ACT-${Date.now()}`,
          title: "Manual system health check completed",
          description:
            "All monitored platform services were checked successfully.",
          time: "Just now",
          status: "Success",
        },
        ...current,
      ]);

      setChecking(false);
    }, 1200);
  };

  return (
    <main className="min-h-screen bg-[#f7f8f7] text-[#111]">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[7%] top-[8%] h-80 w-80 rounded-full bg-[#42d4bc]/10 blur-[110px]" />
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
                System Operations
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
              href="/admin/payments"
              className="rounded-xl px-3 py-2 text-sm font-semibold text-black/50 transition hover:bg-black/5 hover:text-black"
            >
              Payments
            </Link>

            <Link
              href="/admin/reports"
              className="rounded-xl px-3 py-2 text-sm font-semibold text-black/50 transition hover:bg-black/5 hover:text-black"
            >
              Reports
            </Link>

            <Link
              href="/admin/audit-logs"
              className="rounded-xl px-3 py-2 text-sm font-semibold text-black/50 transition hover:bg-black/5 hover:text-black"
            >
              Audit Logs
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
              <Activity size={13} />
              PLATFORM OPERATIONS
            </div>

            <h2 className="max-w-4xl text-3xl font-black leading-[1.04] tracking-[-0.045em] sm:text-4xl lg:text-5xl">
              Keep every part of
              <span className="text-[#159e8b]"> TutorsQue </span>
              running.
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-black/50">
              Monitor critical services, platform health, background jobs,
              infrastructure and operational controls from one workspace.
            </p>
          </div>

          <button
            type="button"
            onClick={runHealthCheck}
            disabled={checking}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-black px-5 py-3 text-sm font-bold !text-white shadow-xl shadow-black/10 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <RefreshCcw
              size={16}
              className={checking ? "animate-spin" : ""}
            />
            {checking ? "Checking..." : "Run Health Check"}
          </button>
        </motion.section>

        {/* METRICS */}
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            title="System Health"
            value={`${healthPercentage}%`}
            description="Overall service health"
            icon={<ShieldCheck size={21} />}
            dark
          />

          <MetricCard
            title="Operational"
            value={String(operationalServices)}
            description="Services running normally"
            icon={<CheckCircle2 size={21} />}
          />

          <MetricCard
            title="Warnings"
            value={String(warningServices)}
            description="Services needing attention"
            icon={<AlertTriangle size={21} />}
          />

          <MetricCard
            title="Offline"
            value={String(offlineServices)}
            description="Services unavailable"
            icon={<AlertTriangle size={21} />}
          />
        </section>

        {/* HEALTH BANNER */}
        <section className="mt-6 rounded-[30px] border border-black/5 bg-black p-6 !text-white shadow-xl">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#42d4bc]/10 text-[#42d4bc]">
                <ShieldCheck size={22} />
              </div>

              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.16em] !text-white/40">
                  Platform Health
                </p>

                <h3 className="mt-1 text-2xl font-black !text-white">
                  {healthPercentage >= 90
                    ? "TutorsQue is operating normally."
                    : "Some services need attention."}
                </h3>

                <p className="mt-1 max-w-2xl text-sm leading-6 !text-white/50">
                  {warningServices > 0
                    ? `${warningServices} service${
                        warningServices === 1 ? "" : "s"
                      } currently show warning-level performance.`
                    : "All monitored services are currently within healthy thresholds."}
                </p>
              </div>
            </div>

            <div className="min-w-[180px]">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-semibold !text-white/40">
                  Health score
                </span>

                <span className="text-sm font-black text-[#42d4bc]">
                  {healthPercentage}%
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${healthPercentage}%` }}
                  transition={{ duration: 0.8 }}
                  className="h-full rounded-full bg-[#42d4bc]"
                />
              </div>
            </div>
          </div>
        </section>

        {/* SERVICE MONITOR */}
        <section className="mt-6 rounded-[30px] border border-black/5 bg-white/75 p-4 shadow-sm tq-glass sm:p-5">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.15em] text-black/35">
                Service Monitor
              </p>

              <h3 className="mt-1 text-2xl font-black">
                Infrastructure health
              </h3>

              <p className="mt-1 text-sm text-black/40">
                Monitor the core services that power the platform.
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-xl border border-black/7 bg-white px-3 py-2 text-xs font-bold text-black/50">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Live monitoring
            </div>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04 }}
                whileHover={{ y: -4 }}
                className="rounded-[25px] border border-black/5 bg-white p-5 shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#42d4bc]/10 text-[#159e8b]">
                    {service.icon}
                  </div>

                  <StatusBadge status={service.status} />
                </div>

                <p className="mt-5 text-base font-black">
                  {service.name}
                </p>

                <p className="mt-1 text-xs leading-5 text-black/40">
                  {service.description}
                </p>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-black/[0.025] p-3">
                    <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-black/35">
                      Uptime
                    </p>

                    <p className="mt-1 text-sm font-black">
                      {service.uptime}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-black/[0.025] p-3">
                    <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-black/35">
                      Latency
                    </p>

                    <p className="mt-1 text-sm font-black">
                      {service.latency}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-black/5 pt-4">
                  <span className="text-xs font-semibold text-black/35">
                    Health check
                  </span>

                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600">
                    <CheckCircle2 size={13} />
                    Verified
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* OPERATIONS */}
        <section className="mt-6 grid gap-5 lg:grid-cols-[1.1fr_.9fr]">
          <div className="rounded-[30px] border border-black/5 bg-white/80 p-6 shadow-sm tq-glass">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.16em] text-black/35">
                  Operational Controls
                </p>

                <h3 className="mt-1 text-2xl font-black">
                  Runtime controls
                </h3>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#42d4bc]/10 text-[#159e8b]">
                <Settings2 size={20} />
              </div>
            </div>

            <div className="mt-6 divide-y divide-black/5">
              <ControlRow
                title="Auto Refresh"
                description="Refresh service health automatically."
                value={autoRefresh}
                onChange={setAutoRefresh}
              />

              <ControlRow
                title="Maintenance Mode"
                description="Temporarily restrict platform access during maintenance."
                value={maintenanceMode}
                onChange={setMaintenanceMode}
                danger
              />

              <ControlRow
                title="API Request Logs"
                description="Keep API activity logging enabled for operations."
                value={apiLogs}
                onChange={setApiLogs}
              />

              <ControlRow
                title="Strict Runtime Checks"
                description="Keep critical service health checks enabled."
                value={strictMode}
                onChange={setStrictMode}
              />
            </div>
          </div>

          <div className="rounded-[30px] border border-black/5 bg-white/80 p-6 shadow-sm tq-glass">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.16em] text-black/35">
                  Environment
                </p>

                <h3 className="mt-1 text-2xl font-black">
                  Current runtime
                </h3>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#42d4bc]/10 text-[#159e8b]">
                <Globe2 size={20} />
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <SnapshotRow
                label="Environment"
                value="Development"
              />

              <SnapshotRow
                label="Region"
                value="India / Asia"
              />

              <SnapshotRow
                label="Database"
                value="PostgreSQL"
              />

              <SnapshotRow
                label="API"
                value="FastAPI"
              />

              <SnapshotRow
                label="Frontend"
                value="Next.js"
                last
              />
            </div>
          </div>
        </section>

        {/* ACTIVITY */}
        <section className="mt-6 rounded-[30px] border border-black/5 bg-white/80 p-6 shadow-sm tq-glass">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.16em] text-black/35">
                System Activity
              </p>

              <h3 className="mt-1 text-2xl font-black">
                Recent operations
              </h3>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#42d4bc]/10 text-[#159e8b]">
              <Activity size={20} />
            </div>
          </div>

          <div className="mt-6 divide-y divide-black/5">
            {activities.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04 }}
                className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                      activity.status === "Success"
                        ? "bg-emerald-500/10 text-emerald-700"
                        : "bg-amber-500/10 text-amber-700"
                    }`}
                  >
                    {activity.status === "Success" ? (
                      <CheckCircle2 size={17} />
                    ) : (
                      <AlertTriangle size={17} />
                    )}
                  </div>

                  <div>
                    <p className="text-sm font-black">
                      {activity.title}
                    </p>

                    <p className="mt-0.5 text-xs leading-5 text-black/40">
                      {activity.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 pl-[52px] sm:pl-0">
                  <span className="text-xs font-semibold text-black/35">
                    {activity.time}
                  </span>

                  <span className="rounded-full bg-black/5 px-2.5 py-1 text-[10px] font-black text-black/40">
                    {activity.id}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* INFRASTRUCTURE */}
        <section className="mt-6 grid gap-5 lg:grid-cols-3">
          <InfoCard
            icon={<LockKeyhole size={20} />}
            title="Security"
            description="Administrative runtime controls and access protection."
            href="/admin/settings"
            action="Security Settings"
          />

          <InfoCard
            icon={<Activity size={20} />}
            title="Audit Trail"
            description="Review important administrator and system activity."
            href="/admin/audit-logs"
            action="View Audit Logs"
          />

          <InfoCard
            icon={<Server size={20} />}
            title="Platform Settings"
            description="Manage operational configuration and system behaviour."
            href="/admin/settings"
            action="Open Settings"
          />
        </section>
      </div>
    </main>
  );
}

function ControlRow({
  title,
  description,
  value,
  onChange,
  danger = false,
}: {
  title: string;
  description: string;
  value: boolean;
  onChange: (value: boolean) => void;
  danger?: boolean;
}) {
  return (
    <div className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="max-w-xl">
        <p className={`text-sm font-black ${danger ? "text-red-700" : ""}`}>
          {title}
        </p>

        <p className="mt-1 text-xs leading-5 text-black/45">
          {description}
        </p>
      </div>

      <button
        type="button"
        onClick={() => onChange(!value)}
        className={`relative h-7 w-12 shrink-0 rounded-full p-1 transition ${
          value
            ? danger
              ? "bg-red-600"
              : "bg-black"
            : "bg-black/10"
        }`}
        aria-pressed={value}
      >
        <span
          className={`block h-5 w-5 rounded-full bg-white shadow transition-transform ${
            value ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}

function InfoCard({
  icon,
  title,
  description,
  href,
  action,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  action: string;
}) {
  return (
    <Link href={href}>
      <motion.div
        whileHover={{ y: -4 }}
        className="h-full rounded-[27px] border border-black/5 bg-white/80 p-5 shadow-sm tq-glass"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#42d4bc]/10 text-[#159e8b]">
            {icon}
          </div>

          <ChevronRight size={17} className="text-black/25" />
        </div>

        <p className="mt-5 text-lg font-black">{title}</p>

        <p className="mt-1 text-sm leading-6 text-black/45">
          {description}
        </p>

        <p className="mt-5 text-xs font-black text-[#159e8b]">
          {action}
        </p>
      </motion.div>
    </Link>
  );
}