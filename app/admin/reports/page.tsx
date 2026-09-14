"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  CircleDollarSign,
  Download,
  GraduationCap,
  IndianRupee,
  LineChart,
  PieChart,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
  WalletCards,
} from "lucide-react";

type Period = "7D" | "30D" | "90D" | "1Y";

const revenueData: Record<
  Period,
  { label: string; value: number }[]
> = {
  "7D": [
    { label: "Mon", value: 28 },
    { label: "Tue", value: 41 },
    { label: "Wed", value: 37 },
    { label: "Thu", value: 54 },
    { label: "Fri", value: 49 },
    { label: "Sat", value: 68 },
    { label: "Sun", value: 74 },
  ],
  "30D": [
    { label: "W1", value: 42 },
    { label: "W2", value: 57 },
    { label: "W3", value: 68 },
    { label: "W4", value: 81 },
  ],
  "90D": [
    { label: "Jun", value: 46 },
    { label: "Jul", value: 59 },
    { label: "Aug", value: 74 },
    { label: "Sep", value: 87 },
  ],
  "1Y": [
    { label: "Q1", value: 38 },
    { label: "Q2", value: 51 },
    { label: "Q3", value: 72 },
    { label: "Q4", value: 91 },
  ],
};

const subjectData = [
  { name: "Mathematics", value: 34 },
  { name: "Science", value: 24 },
  { name: "English", value: 17 },
  { name: "Social Science", value: 14 },
  { name: "Languages", value: 11 },
];

const performanceData = [
  {
    className: "Class 10",
    students: 126,
    completion: "91%",
    score: "84%",
  },
  {
    className: "Class 9",
    students: 114,
    completion: "88%",
    score: "81%",
  },
  {
    className: "Class 8",
    students: 97,
    completion: "86%",
    score: "78%",
  },
  {
    className: "Class 7",
    students: 89,
    completion: "84%",
    score: "76%",
  },
  {
    className: "Class 6",
    students: 82,
    completion: "82%",
    score: "74%",
  },
];

function money(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

function MetricCard({
  title,
  value,
  change,
  description,
  icon,
  dark = false,
}: {
  title: string;
  value: string;
  change: string;
  description: string;
  icon: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className={`relative overflow-hidden rounded-[28px] border p-5 shadow-sm ${
        dark
          ? "border-black bg-black !text-white shadow-xl shadow-black/10"
          : "border-black/5 bg-white/80"
      } tq-glass`}
    >
      <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-[#42d4bc]/10 blur-3xl" />

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

          <span
            className={`inline-flex items-center gap-1 text-xs font-bold ${
              dark ? "text-[#42d4bc]" : "text-emerald-600"
            }`}
          >
            <ArrowUpRight size={13} />
            {change}
          </span>
        </div>

        <p
          className={`mt-6 text-sm font-semibold ${
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

function SectionHeader({
  eyebrow,
  title,
  icon,
}: {
  eyebrow: string;
  title: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className="text-[11px] font-black uppercase tracking-[0.16em] text-black/35">
          {eyebrow}
        </p>

        <h3 className="mt-1 text-xl font-black">{title}</h3>
      </div>

      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#42d4bc]/10 text-[#159e8b]">
        {icon}
      </div>
    </div>
  );
}

export default function AdminReportsPage() {
  const [period, setPeriod] = useState<Period>("30D");
  const [classFilter, setClassFilter] = useState("All Classes");

  const currentRevenue = useMemo(() => {
    const base = {
      "7D": 58240,
      "30D": 214800,
      "90D": 603400,
      "1Y": 1849200,
    };

    return base[period];
  }, [period]);

  const currentStudents = useMemo(() => {
    const base = {
      "7D": 428,
      "30D": 512,
      "90D": 637,
      "1Y": 842,
    };

    return base[period];
  }, [period]);

  const currentTeachers = useMemo(() => {
    const base = {
      "7D": 74,
      "30D": 86,
      "90D": 112,
      "1Y": 164,
    };

    return base[period];
  }, [period]);

  const completionRate = useMemo(() => {
    const base = {
      "7D": 88,
      "30D": 86,
      "90D": 84,
      "1Y": 81,
    };

    return base[period];
  }, [period]);

  const chartData = revenueData[period];

  const maxChartValue = Math.max(
    ...chartData.map((item) => item.value)
  );

  const visiblePerformance = useMemo(() => {
    if (classFilter === "All Classes") {
      return performanceData;
    }

    return performanceData.filter(
      (item) => item.className === classFilter
    );
  }, [classFilter]);

  return (
    <main className="min-h-screen bg-[#f7f8f7] text-[#111]">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[6%] top-[8%] h-80 w-80 rounded-full bg-[#42d4bc]/10 blur-[110px]" />
        <div className="absolute right-[3%] top-[28%] h-96 w-96 rounded-full bg-cyan-300/10 blur-[120px]" />
        <div className="absolute bottom-[5%] left-[38%] h-80 w-80 rounded-full bg-emerald-200/10 blur-[115px]" />
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
                Reports & Analytics
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
              href="/admin/audit-logs"
              className="rounded-xl px-3 py-2 text-sm font-semibold text-black/50 transition hover:bg-black/5 hover:text-black"
            >
              Audit
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
              <BarChart3 size={13} />
              BUSINESS INTELLIGENCE
            </div>

            <h2 className="max-w-4xl text-3xl font-black leading-[1.04] tracking-[-0.045em] sm:text-4xl lg:text-5xl">
              See where
              <span className="text-[#159e8b]"> TutorsQue </span>
              is growing.
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-black/50">
              Understand revenue, enrollments, teacher activity, class
              completion and academic performance in one executive dashboard.
            </p>
          </div>

          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-black px-5 py-3 text-sm font-bold !text-white shadow-xl shadow-black/10 transition hover:-translate-y-0.5"
          >
            <Download size={16} />
            Export Analytics
          </button>
        </motion.section>

        {/* RANGE */}
        <section className="mb-6 flex flex-col justify-between gap-4 rounded-[26px] border border-black/5 bg-white/75 p-4 shadow-sm tq-glass sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#42d4bc]/10 text-[#159e8b]">
              <CalendarDays size={18} />
            </div>

            <div>
              <p className="text-sm font-black">Analytics period</p>
              <p className="text-xs text-black/40">
                Compare platform performance over time.
              </p>
            </div>
          </div>

          <div className="flex gap-1.5 rounded-2xl bg-black/[0.035] p-1.5">
            {(["7D", "30D", "90D", "1Y"] as Period[]).map(
              (item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setPeriod(item)}
                  className={`rounded-xl px-4 py-2.5 text-sm font-bold transition ${
                    period === item
                      ? "bg-black !text-white shadow-lg"
                      : "text-black/45 hover:text-black"
                  }`}
                >
                  {item}
                </button>
              )
            )}
          </div>
        </section>

        {/* METRICS */}
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            title="Revenue"
            value={money(currentRevenue)}
            change="+14.8%"
            description="Total collected"
            icon={<CircleDollarSign size={21} />}
            dark
          />

          <MetricCard
            title="Students"
            value={currentStudents.toLocaleString("en-IN")}
            change="+11.4%"
            description="Active learners"
            icon={<GraduationCap size={21} />}
          />

          <MetricCard
            title="Teachers"
            value={currentTeachers.toLocaleString("en-IN")}
            change="+8.9%"
            description="Active tutors"
            icon={<Users size={21} />}
          />

          <MetricCard
            title="Class Completion"
            value={`${completionRate}%`}
            change="+5.2%"
            description="Completed sessions"
            icon={<CheckCircle2 size={21} />}
          />
        </section>

        {/* MAIN CHARTS */}
        <section className="mt-6 grid gap-5 xl:grid-cols-[1.5fr_.85fr]">
          {/* REVENUE CHART */}
          <div className="rounded-[30px] border border-black/5 bg-white/80 p-6 shadow-sm tq-glass">
            <SectionHeader
              eyebrow="Revenue Trend"
              title="Platform revenue"
              icon={<LineChart size={19} />}
            />

            <div className="mt-8 flex h-[280px] items-end gap-3 sm:gap-5">
              {chartData.map((item, index) => {
                const height =
                  (item.value / maxChartValue) * 100;

                return (
                  <div
                    key={item.label}
                    className="flex h-full flex-1 flex-col justify-end"
                  >
                    <div className="mb-2 text-center text-[10px] font-bold text-black/45">
                      {item.value}k
                    </div>

                    <div className="relative flex h-full items-end">
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${height}%` }}
                        transition={{
                          duration: 0.7,
                          delay: index * 0.07,
                          ease: "easeOut",
                        }}
                        className="w-full rounded-t-[14px] bg-black"
                      >
                        <div className="absolute inset-x-0 top-2 mx-auto h-1.5 w-8 rounded-full bg-[#42d4bc]" />
                      </motion.div>
                    </div>

                    <p className="mt-3 text-center text-xs font-bold text-black/40">
                      {item.label}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-black/5 pt-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-black/45">
                <span className="h-2 w-2 rounded-full bg-[#42d4bc]" />
                Revenue activity
              </div>

              <div className="flex items-center gap-1 text-xs font-bold text-emerald-600">
                <ArrowUpRight size={13} />
                14.8% growth
              </div>
            </div>
          </div>

          {/* SUBJECT MIX */}
          <div className="rounded-[30px] border border-black/5 bg-white/80 p-6 shadow-sm tq-glass">
            <SectionHeader
              eyebrow="Enrollment Mix"
              title="Popular subjects"
              icon={<PieChart size={19} />}
            />

            <div className="mt-7 flex items-center justify-center">
              <div
                className="relative flex h-48 w-48 items-center justify-center rounded-full"
                style={{
                  background:
                    "conic-gradient(#111 0deg 122deg, #42d4bc 122deg 208deg, #8b8b8b 208deg 269deg, #c5c5c5 269deg 319deg, #e4e4e4 319deg 360deg)",
                }}
              >
                <div className="flex h-32 w-32 flex-col items-center justify-center rounded-full bg-white">
                  <p className="text-2xl font-black">100%</p>
                  <p className="text-xs font-semibold text-black/40">
                    enrollment mix
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-7 space-y-3">
              {subjectData.map((subject, index) => (
                <div
                  key={subject.name}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`h-2.5 w-2.5 rounded-full ${
                        index === 0
                          ? "bg-black"
                          : index === 1
                          ? "bg-[#42d4bc]"
                          : index === 2
                          ? "bg-[#8b8b8b]"
                          : index === 3
                          ? "bg-[#c5c5c5]"
                          : "bg-[#e4e4e4]"
                      }`}
                    />

                    <span className="text-sm font-semibold">
                      {subject.name}
                    </span>
                  </div>

                  <span className="text-sm font-black">
                    {subject.value}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BUSINESS + ACADEMIC */}
        <section className="mt-5 grid gap-5 lg:grid-cols-2">
          {/* FINANCE */}
          <div className="rounded-[30px] border border-black/5 bg-black p-6 !text-white shadow-xl">
            <SectionHeader
              eyebrow="Finance Health"
              title="Unit economics snapshot"
              icon={<WalletCards size={19} />}
            />

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <FinanceItem
                label="Student collections"
                value={money(currentRevenue)}
              />

              <FinanceItem
                label="Teacher payouts"
                value={money(currentRevenue * 0.52)}
              />

              <FinanceItem
                label="Platform contribution"
                value={money(currentRevenue * 0.32)}
              />

              <FinanceItem
                label="Variable costs"
                value={money(currentRevenue * 0.16)}
              />
            </div>

            <div className="mt-5 rounded-2xl bg-white/6 p-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-bold !text-white/40">
                    Contribution margin
                  </p>

                  <p className="mt-1 text-3xl font-black !text-white">
                    32%
                  </p>
                </div>

                <div className="flex items-center gap-1 text-xs font-bold text-[#42d4bc]">
                  <ArrowUpRight size={14} />
                  +4.6%
                </div>
              </div>

              <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "32%" }}
                  transition={{ duration: 0.8 }}
                  className="h-full rounded-full bg-[#42d4bc]"
                />
              </div>
            </div>
          </div>

          {/* ACADEMIC */}
          <div className="rounded-[30px] border border-black/5 bg-white/80 p-6 shadow-sm tq-glass">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.16em] text-black/35">
                  Academic Health
                </p>

                <h3 className="mt-1 text-xl font-black">
                  Class performance
                </h3>
              </div>

              <select
                value={classFilter}
                onChange={(event) => setClassFilter(event.target.value)}
                className="rounded-xl border border-black/8 bg-white px-3 py-2 text-xs font-bold outline-none"
              >
                <option>All Classes</option>
                {performanceData.map((item) => (
                  <option key={item.className}>
                    {item.className}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-6 space-y-4">
              {visiblePerformance.map((item) => (
                <div key={item.className}>
                  <div className="mb-2 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-black">
                        {item.className}
                      </p>

                      <p className="text-xs text-black/40">
                        {item.students} students
                      </p>
                    </div>

                    <span className="text-sm font-black">
                      {item.score}
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-black/5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: item.score }}
                      transition={{ duration: 0.65 }}
                      className="h-full rounded-full bg-black"
                    />
                  </div>

                  <div className="mt-1 flex justify-between text-[10px] font-semibold text-black/35">
                    <span>Academic score</span>
                    <span>
                      Completion {item.completion}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* OPERATIONAL INSIGHTS */}
        <section className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <InsightCard
            icon={<Users size={18} />}
            title="Student growth"
            value="+11.4%"
            description="New learners this period"
            positive
          />

          <InsightCard
            icon={<GraduationCap size={18} />}
            title="Teacher supply"
            value="+8.9%"
            description="Active tutors added"
            positive
          />

          <InsightCard
            icon={<Activity size={18} />}
            title="Class activity"
            value="+13.7%"
            description="Completed sessions"
            positive
          />

          <InsightCard
            icon={<CircleDollarSign size={18} />}
            title="Refund rate"
            value="2.1%"
            description="Of collected payments"
            positive={false}
          />
        </section>

        {/* EXECUTIVE NOTE */}
        <section className="mt-6 rounded-[30px] border border-black/5 bg-white/80 p-6 shadow-sm tq-glass">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#42d4bc]/10 text-[#159e8b]">
                <Sparkles size={21} />
              </div>

              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.16em] text-black/35">
                  Executive View
                </p>

                <h3 className="mt-1 text-xl font-black">
                  Growth is strongest where demand and teacher supply overlap.
                </h3>

                <p className="mt-1 max-w-3xl text-sm leading-6 text-black/45">
                  Use these analytics alongside the batch, teacher and payment
                  workspaces to identify high-demand subjects, improve teacher
                  utilization and protect platform contribution.
                </p>
              </div>
            </div>

            <Link
              href="/admin/payments"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl bg-black px-5 py-3 text-sm font-bold !text-white shadow-lg transition hover:-translate-y-0.5"
            >
              <IndianRupee size={16} />
              Finance Details
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

function FinanceItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl bg-white/6 p-4">
      <p className="text-xs font-semibold !text-white/40">{label}</p>

      <p className="mt-2 text-lg font-black !text-white">{value}</p>
    </div>
  );
}

function InsightCard({
  icon,
  title,
  value,
  description,
  positive,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  description: string;
  positive: boolean;
}) {
  return (
    <div className="rounded-[24px] border border-black/5 bg-white/75 p-5 shadow-sm tq-glass">
      <div className="flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#42d4bc]/10 text-[#159e8b]">
          {icon}
        </div>

        {positive ? (
          <ArrowUpRight size={15} className="text-emerald-600" />
        ) : (
          <ArrowDownRight size={15} className="text-red-500" />
        )}
      </div>

      <p className="mt-5 text-xs font-bold uppercase tracking-[0.11em] text-black/35">
        {title}
      </p>

      <p className="mt-1 text-2xl font-black">{value}</p>

      <p className="mt-1 text-xs text-black/40">{description}</p>
    </div>
  );
}