"use client";

import Link from "next/link";
import { motion } from "framer-motion";

type EarningRow = {
  id: string;
  date: string;
  className: string;
  subject: string;
  batch: string;
  duration: string;
  amount: number;
  status: "Verified" | "Processing";
};

const earnings: EarningRow[] = [
  {
    id: "ER-1008",
    date: "Sep 05, 2026",
    className: "Class 10",
    subject: "Mathematics",
    batch: "TQ-10-MATH-01",
    duration: "45 min",
    amount: 420,
    status: "Verified",
  },
  {
    id: "ER-1007",
    date: "Sep 04, 2026",
    className: "Class 10",
    subject: "Mathematics",
    batch: "TQ-10-MATH-01",
    duration: "45 min",
    amount: 420,
    status: "Verified",
  },
  {
    id: "ER-1006",
    date: "Sep 03, 2026",
    className: "Class 9",
    subject: "Physics",
    batch: "TQ-09-PHY-02",
    duration: "60 min",
    amount: 560,
    status: "Verified",
  },
  {
    id: "ER-1005",
    date: "Sep 02, 2026",
    className: "Class 10",
    subject: "Mathematics",
    batch: "TQ-10-MATH-01",
    duration: "45 min",
    amount: 420,
    status: "Verified",
  },
  {
    id: "ER-1004",
    date: "Sep 01, 2026",
    className: "Class 9",
    subject: "Physics",
    batch: "TQ-09-PHY-02",
    duration: "60 min",
    amount: 560,
    status: "Processing",
  },
  {
    id: "ER-1003",
    date: "Aug 31, 2026",
    className: "Class 10",
    subject: "Mathematics",
    batch: "TQ-10-MATH-01",
    duration: "45 min",
    amount: 420,
    status: "Verified",
  },
];

const weeklyData = [
  { day: "Mon", amount: 420 },
  { day: "Tue", amount: 560 },
  { day: "Wed", amount: 420 },
  { day: "Thu", amount: 840 },
  { day: "Fri", amount: 980 },
  { day: "Sat", amount: 420 },
  { day: "Sun", amount: 0 },
];

const monthlyData = [
  { month: "May", amount: 14200 },
  { month: "Jun", amount: 18600 },
  { month: "Jul", amount: 22400 },
  { month: "Aug", amount: 26840 },
  { month: "Sep", amount: 7360 },
];

function formatCurrency(value: number) {
  return `₹${value.toLocaleString("en-IN")}`;
}

export default function TeacherEarningsPage() {
  const totalEarned = 26840;
  const currentWeek = 3640;
  const processing = 560;
  const nextPayout = 3080;
  const averagePerClass = 456;

  const maxWeeklyAmount = Math.max(...weeklyData.map((item) => item.amount));

  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f8f7] text-[#111]">
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 25, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-[8%] top-[7%] h-72 w-72 rounded-full bg-[#42d4bc]/10 blur-[90px]"
        />

        <motion.div
          animate={{
            x: [0, -30, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-[4%] right-[3%] h-96 w-96 rounded-full bg-cyan-100/50 blur-[110px]"
        />
      </div>

      <div className="relative mx-auto max-w-[1500px] px-4 py-5 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="tq-glass mb-6 flex flex-col gap-4 rounded-[26px] px-5 py-4 shadow-lg shadow-black/[0.03] sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex items-center gap-3">
            <Link
              href="/teacher/dashboard"
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-black text-white transition hover:-translate-y-0.5"
              aria-label="Back to dashboard"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 12H5"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m11 18-6-6 6-6"
                />
              </svg>
            </Link>

            <div>
              <p className="text-lg font-black tracking-[-0.02em]">
                Teacher Earnings
              </p>
              <p className="mt-0.5 text-xs text-black/45">
                Verified classes, earnings and weekly payouts
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-2xl bg-[#42d4bc]/10 px-4 py-3">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#42d4bc]" />
            <span className="text-xs font-black text-[#0b8f79]">
              Weekly payouts enabled
            </span>
          </div>
        </motion.header>

        {/* Hero earnings */}
        <section className="grid gap-4 lg:grid-cols-[1.35fr_0.65fr]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden rounded-[30px] bg-black p-7 text-white shadow-2xl shadow-black/10 sm:p-9"
          >
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#42d4bc]/20 blur-3xl" />
            <div className="absolute bottom-[-120px] left-[32%] h-60 w-60 rounded-full bg-cyan-400/10 blur-3xl" />

            <div className="relative">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/40">
                    Total verified earnings
                  </p>

                  <h1 className="mt-3 text-5xl font-black tracking-[-0.05em] sm:text-6xl">
                    {formatCurrency(totalEarned)}
                  </h1>

                  <p className="mt-3 text-sm text-white/45">
                    Since joining TutorsQue
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 backdrop-blur-xl">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-white/35">
                    Avg / class
                  </p>
                  <p className="mt-1 text-xl font-black">
                    {formatCurrency(averagePerClass)}
                  </p>
                </div>
              </div>

              <div className="mt-9 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-4">
                  <p className="text-xs text-white/35">This week</p>
                  <p className="mt-1.5 text-xl font-black">
                    {formatCurrency(currentWeek)}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-4">
                  <p className="text-xs text-white/35">Processing</p>
                  <p className="mt-1.5 text-xl font-black">
                    {formatCurrency(processing)}
                  </p>
                </div>

                <div className="rounded-2xl border border-[#42d4bc]/20 bg-[#42d4bc]/10 p-4">
                  <p className="text-xs text-[#42d4bc]/65">Next payout</p>
                  <p className="mt-1.5 text-xl font-black text-[#42d4bc]">
                    {formatCurrency(nextPayout)}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Payout card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="tq-glass rounded-[30px] p-6 shadow-xl shadow-black/[0.03] sm:p-7"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-black/35">
                  Next weekly payout
                </p>

                <p className="mt-3 text-4xl font-black tracking-[-0.04em]">
                  {formatCurrency(nextPayout)}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#42d4bc]/12 text-[#0b9f87]">
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3v18M17 7H9.5a3 3 0 1 0 0 6H14a3 3 0 1 1 0 6H7"
                  />
                </svg>
              </div>
            </div>

            <div className="mt-7 rounded-2xl bg-black/[0.035] p-4">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium text-black/45">
                  Payout date
                </p>
                <p className="text-xs font-black">Monday, Sep 07</p>
              </div>

              <div className="mt-4 h-2 overflow-hidden rounded-full bg-black/[0.06]">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "78%" }}
                  transition={{ duration: 1 }}
                  className="h-full rounded-full bg-[#42d4bc]"
                />
              </div>

              <div className="mt-2 flex justify-between text-[10px] font-bold text-black/35">
                <span>Current period</span>
                <span>78%</span>
              </div>
            </div>

            <div className="mt-5 rounded-2xl border border-[#42d4bc]/15 bg-[#42d4bc]/6 p-4">
              <p className="text-xs font-black">How payouts work</p>
              <p className="mt-1.5 text-xs leading-5 text-black/50">
                Completed classes are verified and added to your earnings
                ledger. Eligible earnings are included in the weekly payout.
              </p>
            </div>
          </motion.div>
        </section>

        {/* KPI cards */}
        <section className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              label: "Verified classes",
              value: "58",
              detail: "completed sessions",
              icon: "✓",
            },
            {
              label: "This month",
              value: "₹7,360",
              detail: "+18.4% vs last month",
              icon: "↗",
            },
            {
              label: "Processing",
              value: "₹560",
              detail: "1 class awaiting verification",
              icon: "◷",
            },
            {
              label: "Payout success",
              value: "100%",
              detail: "on-time payouts",
              icon: "₹",
            },
          ].map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06 }}
              whileHover={{ y: -3 }}
              className="tq-glass rounded-[24px] p-5 shadow-lg shadow-black/[0.025]"
            >
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold text-black/40">
                  {item.label}
                </p>

                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-black/[0.04] text-xs font-black">
                  {item.icon}
                </div>
              </div>

              <p className="mt-4 text-2xl font-black tracking-[-0.03em]">
                {item.value}
              </p>

              <p className="mt-1 text-[11px] text-black/40">{item.detail}</p>
            </motion.div>
          ))}
        </section>

        {/* Charts */}
        <section className="mt-4 grid gap-4 lg:grid-cols-[1.3fr_0.7fr]">
          {/* Weekly chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="tq-glass rounded-[28px] p-6 shadow-xl shadow-black/[0.03]"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-sm font-black">This week's earnings</p>
                <p className="mt-1 text-xs text-black/40">
                  Verified earnings by day
                </p>
              </div>

              <div className="rounded-xl bg-[#42d4bc]/10 px-3 py-2 text-xs font-black text-[#0b9079]">
                ₹3,640
              </div>
            </div>

            <div className="mt-8 flex h-[260px] items-end gap-3 sm:gap-5">
              {weeklyData.map((item, index) => {
                const height =
                  item.amount === 0
                    ? 4
                    : Math.max((item.amount / maxWeeklyAmount) * 185, 16);

                return (
                  <div
                    key={item.day}
                    className="flex h-full flex-1 flex-col items-center justify-end"
                  >
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height }}
                      transition={{
                        delay: 0.15 + index * 0.06,
                        duration: 0.7,
                        ease: "easeOut",
                      }}
                      className={`group relative w-full max-w-14 rounded-t-[14px] ${
                        item.amount === 0
                          ? "bg-black/[0.05]"
                          : "bg-[#42d4bc]"
                      }`}
                    >
                      {item.amount > 0 && (
                        <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-lg bg-black px-2 py-1 text-[9px] font-black text-white opacity-0 transition group-hover:opacity-100">
                          {formatCurrency(item.amount)}
                        </div>
                      )}
                    </motion.div>

                    <p className="mt-3 text-[10px] font-bold text-black/35">
                      {item.day}
                    </p>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Monthly performance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="tq-glass rounded-[28px] p-6 shadow-xl shadow-black/[0.03]"
          >
            <div>
              <p className="text-sm font-black">Monthly performance</p>
              <p className="mt-1 text-xs text-black/40">
                Verified earnings trend
              </p>
            </div>

            <div className="mt-7 space-y-5">
              {monthlyData.map((item, index) => {
                const percent = Math.round(
                  (item.amount /
                    Math.max(...monthlyData.map((month) => month.amount))) *
                    100
                );

                return (
                  <div key={item.month}>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-xs font-bold text-black/55">
                        {item.month}
                      </span>
                      <span className="text-xs font-black">
                        {formatCurrency(item.amount)}
                      </span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-black/[0.05]">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percent}%` }}
                        transition={{
                          delay: 0.25 + index * 0.08,
                          duration: 0.65,
                        }}
                        className="h-full rounded-full bg-[#42d4bc]"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </section>

        {/* Earnings ledger */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="tq-glass mt-4 overflow-hidden rounded-[28px] shadow-xl shadow-black/[0.03]"
        >
          <div className="flex flex-col gap-4 border-b border-black/5 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-base font-black">Earnings ledger</p>
              <p className="mt-1 text-xs text-black/40">
                Every completed class that contributes to your earnings
              </p>
            </div>

            <button className="rounded-xl bg-black/[0.04] px-4 py-2.5 text-xs font-black transition hover:bg-black/[0.07]">
              Export
            </button>
          </div>

          <div className="hidden overflow-x-auto md:block">
            <table className="w-full min-w-[850px] border-collapse">
              <thead>
                <tr className="border-b border-black/5 text-left">
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-wider text-black/30">
                    Class
                  </th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-wider text-black/30">
                    Batch
                  </th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-wider text-black/30">
                    Date
                  </th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-wider text-black/30">
                    Duration
                  </th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-wider text-black/30">
                    Amount
                  </th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-wider text-black/30">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {earnings.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b border-black/[0.04] transition hover:bg-black/[0.015]"
                  >
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-black">
                          {row.className}
                        </p>
                        <p className="mt-0.5 text-[11px] text-black/40">
                          {row.subject}
                        </p>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-xs font-bold text-black/55">
                      {row.batch}
                    </td>

                    <td className="px-6 py-4 text-xs font-medium text-black/50">
                      {row.date}
                    </td>

                    <td className="px-6 py-4 text-xs font-bold">
                      {row.duration}
                    </td>

                    <td className="px-6 py-4 text-sm font-black">
                      {formatCurrency(row.amount)}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1.5 text-[10px] font-black ${
                          row.status === "Verified"
                            ? "bg-[#42d4bc]/10 text-[#0b9079]"
                            : "bg-yellow-500/10 text-yellow-700"
                        }`}
                      >
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="space-y-3 p-4 md:hidden">
            {earnings.map((row) => (
              <div
                key={row.id}
                className="rounded-2xl bg-black/[0.025] p-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-black">{row.className}</p>
                    <p className="mt-1 text-xs text-black/45">
                      {row.subject}
                    </p>
                  </div>

                  <span className="text-base font-black">
                    {formatCurrency(row.amount)}
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-black/30">
                      Batch
                    </p>
                    <p className="mt-1 text-xs font-bold">{row.batch}</p>
                  </div>

                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-black/30">
                      Date
                    </p>
                    <p className="mt-1 text-xs font-bold">{row.date}</p>
                  </div>

                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-black/30">
                      Duration
                    </p>
                    <p className="mt-1 text-xs font-bold">{row.duration}</p>
                  </div>

                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-black/30">
                      Status
                    </p>
                    <p className="mt-1">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-[9px] font-black ${
                          row.status === "Verified"
                            ? "bg-[#42d4bc]/10 text-[#0b9079]"
                            : "bg-yellow-500/10 text-yellow-700"
                        }`}
                      >
                        {row.status}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Bottom info */}
        <section className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="tq-glass rounded-[24px] p-5">
            <div className="flex gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#42d4bc]/10 text-[#0b9079]">
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3v18M17 7H9.5a3 3 0 1 0 0 6H14a3 3 0 1 1 0 6H7"
                  />
                </svg>
              </div>

              <div>
                <p className="text-sm font-black">
                  Earnings are class-based
                </p>
                <p className="mt-1 text-xs leading-5 text-black/45">
                  Each verified completed session creates an auditable ledger
                  entry based on your configured teaching rate.
                </p>
              </div>
            </div>
          </div>

          <div className="tq-glass rounded-[24px] p-5">
            <div className="flex gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-black/[0.04] text-black/70">
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3 5 6v5c0 4.8 2.9 8.2 7 10 4.1-1.8 7-5.2 7-10V6l-7-3Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m9.2 12 1.8 1.8 3.8-4"
                  />
                </svg>
              </div>

              <div>
                <p className="text-sm font-black">
                  Transparent payout tracking
                </p>
                <p className="mt-1 text-xs leading-5 text-black/45">
                  Your completed sessions, verification status and payout
                  history stay visible in one place.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <style jsx>{`
        ::-webkit-scrollbar {
          width: 7px;
          height: 7px;
        }

        ::-webkit-scrollbar-track {
          background: transparent;
        }

        ::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.08);
          border-radius: 999px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 0, 0, 0.14);
        }
      `}</style>
    </main>
  );
}