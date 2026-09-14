"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const stats = [
  {
    label: "Total Students",
    value: "2,486",
    change: "+12.8%",
    detail: "vs last month",
    icon: "ST",
  },
  {
    label: "Active Teachers",
    value: "184",
    change: "+8.4%",
    detail: "verified teachers",
    icon: "TR",
  },
  {
    label: "Active Batches",
    value: "326",
    change: "+14.2%",
    detail: "running batches",
    icon: "BA",
  },
  {
    label: "Monthly Revenue",
    value: "₹8.42L",
    change: "+18.6%",
    detail: "vs last month",
    icon: "₹",
  },
];

const recentEnrollments = [
  {
    student: "Aarav Kumar",
    className: "Class 10",
    board: "AP State Board",
    subject: "Mathematics",
    tutor: "Rahul Varma",
    time: "8 min ago",
  },
  {
    student: "Ananya Reddy",
    className: "Class 9",
    board: "CBSE",
    subject: "Science",
    tutor: "Priya Sharma",
    time: "24 min ago",
  },
  {
    student: "Sai Teja",
    className: "Class 8",
    board: "AP State Board",
    subject: "English",
    tutor: "Sneha Rao",
    time: "41 min ago",
  },
  {
    student: "Keerthi Rao",
    className: "Class 10",
    board: "CBSE",
    subject: "Mathematics",
    tutor: "Vikram Shah",
    time: "1 hr ago",
  },
];

const teachersPending = [
  {
    name: "Kiran Reddy",
    subject: "Mathematics",
    experience: "6 years",
    location: "Vijayawada",
    initials: "KR",
  },
  {
    name: "Meghana Rao",
    subject: "Biology",
    experience: "4 years",
    location: "Guntur",
    initials: "MR",
  },
  {
    name: "Suresh Kumar",
    subject: "Physics",
    experience: "8 years",
    location: "Visakhapatnam",
    initials: "SK",
  },
];

const revenueData = [
  { month: "Apr", revenue: 4.8 },
  { month: "May", revenue: 5.7 },
  { month: "Jun", revenue: 6.4 },
  { month: "Jul", revenue: 7.1 },
  { month: "Aug", revenue: 7.8 },
  { month: "Sep", revenue: 8.42 },
];

const activity = [
  {
    title: "Teacher verification completed",
    detail: "12 teacher applications approved today",
    type: "Teacher",
    time: "32 min ago",
  },
  {
    title: "New batch created",
    detail: "TQ-10-MATH-04 • Class 10 Mathematics",
    type: "Batch",
    time: "1 hr ago",
  },
  {
    title: "Weekly payouts processed",
    detail: "₹2.84L transferred to 126 teachers",
    type: "Payout",
    time: "2 hrs ago",
  },
  {
    title: "New school partnership",
    detail: "School partnership added to the platform",
    type: "School",
    time: "4 hrs ago",
  },
];

const quickActions = [
  {
    href: "/admin/students",
    title: "Manage Students",
    description: "View enrollments and student activity",
    icon: "01",
  },
  {
    href: "/admin/teachers",
    title: "Manage Teachers",
    description: "Verify teachers and manage assignments",
    icon: "02",
  },
  {
    href: "/admin/batches",
    title: "Manage Batches",
    description: "Monitor classes and schedules",
    icon: "03",
  },
  {
    href: "/admin/payments",
    title: "Payments & Payouts",
    description: "Track revenue and teacher payouts",
    icon: "04",
  },
];

function activityClasses(type: string) {
  if (type === "Teacher") {
    return "bg-[#42d4bc]/10 text-[#0b9079]";
  }

  if (type === "Batch") {
    return "bg-blue-500/10 text-blue-700";
  }

  if (type === "Payout") {
    return "bg-purple-500/10 text-purple-700";
  }

  return "bg-yellow-500/10 text-yellow-700";
}

export default function AdminDashboardPage() {
  const maxRevenue = Math.max(
    ...revenueData.map((item) => item.revenue)
  );

  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f8f7] text-[#111]">
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 25, 0],
            y: [0, -18, 0],
          }}
          transition={{
            duration: 13,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-[7%] top-[6%] h-72 w-72 rounded-full bg-[#42d4bc]/10 blur-[100px]"
        />

        <motion.div
          animate={{
            x: [0, -30, 0],
            y: [0, 25, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-[3%] right-[4%] h-96 w-96 rounded-full bg-cyan-100/45 blur-[110px]"
        />
      </div>

      <div className="relative mx-auto max-w-[1600px] px-4 py-5 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="tq-glass mb-6 flex flex-col gap-4 rounded-[26px] px-5 py-4 shadow-lg shadow-black/[0.03] lg:flex-row lg:items-center lg:justify-between"
        >
          <div className="flex min-w-0 items-center gap-3">
            <Link
              href="/"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-black !text-white text-xs font-black transition hover:-translate-y-0.5"
            >
              TQ
            </Link>

            <div className="min-w-0">
              <p className="truncate text-lg font-black tracking-[-0.02em]">
                Admin Dashboard
              </p>

              <p className="mt-0.5 text-xs text-black/45">
                TutorsQue platform operations and business overview
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-2 rounded-full bg-[#42d4bc]/10 px-4 py-2.5 text-xs font-black text-[#0b9079]">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#42d4bc]" />
              Platform operational
            </div>

            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-black/[0.04] text-black/55 transition hover:bg-black/[0.07]"
              aria-label="Notifications"
            >
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
                  d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"
                />
                <path strokeLinecap="round" d="M10 21h4" />
              </svg>
            </button>

            <div className="flex items-center gap-3 rounded-2xl bg-black/[0.04] px-3 py-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#42d4bc] text-xs font-black">
                AD
              </div>

              <div className="hidden sm:block">
                <p className="text-xs font-black">Admin</p>
                <p className="mt-0.5 text-[10px] text-black/35">
                  Super Admin
                </p>
              </div>
            </div>
          </div>
        </motion.header>

        {/* Hero */}
        <section className="relative overflow-hidden rounded-[30px] bg-black p-7 text-white shadow-2xl shadow-black/10 sm:p-9">
          <div className="absolute -right-28 -top-28 h-80 w-80 rounded-full bg-[#42d4bc]/20 blur-3xl" />

          <div className="absolute bottom-[-140px] left-[28%] h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />

          <div className="relative">
            <div className="flex flex-col gap-7 xl:flex-row xl:items-end xl:justify-between">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-white/55">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#42d4bc]" />
                  Platform overview
                </div>

                <h1 className="mt-5 max-w-4xl text-4xl font-black leading-[1.02] tracking-[-0.055em] sm:text-5xl xl:text-6xl">
                  TutorsQue is
                  <span className="text-[#42d4bc]"> growing.</span>
                </h1>

                <p className="mt-4 max-w-3xl text-sm leading-6 text-white/50 sm:text-base">
                  Monitor students, teachers, batches, revenue and daily
                  platform activity from one operational command center.
                </p>
              </div>

              <div className="rounded-[24px] border border-white/10 bg-white/[0.05] p-5 backdrop-blur-xl">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/30">
                  Today
                </p>

                <p className="mt-2 text-3xl font-black">
                  Sep 14
                </p>

                <p className="mt-1 text-xs text-white/40">
                  Monday • 2026
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* KPI cards */}
        <section className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.06 + index * 0.05 }}
              whileHover={{ y: -3 }}
              className="tq-glass rounded-[24px] p-5 shadow-lg shadow-black/[0.025]"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs font-bold text-black/40">
                  {item.label}
                </p>

                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-black/[0.04] text-[10px] font-black">
                  {item.icon}
                </div>
              </div>

              <p className="mt-4 text-3xl font-black tracking-[-0.04em]">
                {item.value}
              </p>

              <div className="mt-2 flex items-center gap-2">
                <span className="rounded-full bg-[#42d4bc]/10 px-2.5 py-1 text-[9px] font-black text-[#0b9079]">
                  {item.change}
                </span>

                <span className="text-[10px] text-black/30">
                  {item.detail}
                </span>
              </div>
            </motion.div>
          ))}
        </section>

        {/* Revenue + operations */}
        <section className="mt-4 grid gap-4 xl:grid-cols-[1.25fr_0.75fr]">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="tq-glass rounded-[28px] p-6 shadow-xl shadow-black/[0.03]"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-black/30">
                  Revenue
                </p>

                <h2 className="mt-1.5 text-2xl font-black tracking-[-0.03em]">
                  Monthly revenue
                </h2>

                <p className="mt-1 text-xs text-black/40">
                  Platform revenue trend
                </p>
              </div>

              <div className="rounded-2xl bg-[#42d4bc]/10 px-4 py-3 text-right">
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#0b9079]/50">
                  September
                </p>

                <p className="mt-1 text-xl font-black text-[#0b9079]">
                  ₹8.42L
                </p>
              </div>
            </div>

            <div className="mt-9 flex h-[280px] items-end gap-3 sm:gap-5">
              {revenueData.map((item, index) => {
                const height = Math.max(
                  (item.revenue / maxRevenue) * 200,
                  20
                );

                return (
                  <div
                    key={item.month}
                    className="flex h-full flex-1 flex-col items-center justify-end"
                  >
                    <div className="mb-2 text-[9px] font-black text-black/35">
                      ₹{item.revenue}L
                    </div>

                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height }}
                      transition={{
                        delay: 0.3 + index * 0.06,
                        duration: 0.65,
                        ease: "easeOut",
                      }}
                      className="group relative w-full max-w-14 rounded-t-[15px] bg-[#42d4bc]"
                    >
                      <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-lg bg-black px-2 py-1 text-[9px] font-black !text-white opacity-0 transition group-hover:opacity-100">
                        ₹{item.revenue}L
                      </div>
                    </motion.div>

                    <p className="mt-3 text-[10px] font-bold text-black/35">
                      {item.month}
                    </p>
                  </div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="tq-glass rounded-[28px] p-6 shadow-xl shadow-black/[0.03]"
          >
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-black/30">
              Operations
            </p>

            <h2 className="mt-1.5 text-2xl font-black tracking-[-0.03em]">
              Platform health
            </h2>

            <div className="mt-6 space-y-4">
              {[
                {
                  label: "Live classes",
                  value: "94%",
                  status: "Healthy",
                  width: 94,
                },
                {
                  label: "Payment success",
                  value: "98.7%",
                  status: "Healthy",
                  width: 99,
                },
                {
                  label: "Teacher verification",
                  value: "91%",
                  status: "Healthy",
                  width: 91,
                },
                {
                  label: "Support resolution",
                  value: "96%",
                  status: "Healthy",
                  width: 96,
                },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-xs font-black">
                      {item.label}
                    </p>

                    <span className="text-xs font-black text-[#0b9079]">
                      {item.value}
                    </span>
                  </div>

                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-black/[0.06]">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.width}%` }}
                      transition={{ duration: 0.8 }}
                      className="h-full rounded-full bg-[#42d4bc]"
                    />
                  </div>

                  <p className="mt-1.5 text-[9px] font-bold text-black/25">
                    {item.status}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-[#42d4bc]/15 bg-[#42d4bc]/6 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#42d4bc]/15 text-[#0b9079]">
                  ✓
                </div>

                <div>
                  <p className="text-xs font-black">
                    All core systems operational
                  </p>

                  <p className="mt-1 text-[10px] text-black/40">
                    No critical operational alerts
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Recent enrollments + pending teachers */}
        <section className="mt-4 grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.34 }}
            className="tq-glass overflow-hidden rounded-[28px] shadow-xl shadow-black/[0.03]"
          >
            <div className="flex flex-col gap-3 border-b border-black/5 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-black/30">
                  Enrollments
                </p>

                <h2 className="mt-1.5 text-2xl font-black tracking-[-0.03em]">
                  Recent students
                </h2>
              </div>

              <Link
                href="/admin/students"
                className="rounded-xl bg-black/[0.04] px-4 py-2.5 text-[10px] font-black text-black/50 transition hover:bg-black/[0.07]"
              >
                View all
              </Link>
            </div>

            <div className="hidden overflow-x-auto md:block">
              <table className="w-full min-w-[750px] border-collapse">
                <thead>
                  <tr className="border-b border-black/5 text-left">
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-wider text-black/30">
                      Student
                    </th>

                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-wider text-black/30">
                      Class / Board
                    </th>

                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-wider text-black/30">
                      Subject
                    </th>

                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-wider text-black/30">
                      Tutor
                    </th>

                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-wider text-black/30">
                      Joined
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {recentEnrollments.map((item) => (
                    <tr
                      key={item.student}
                      className="border-b border-black/[0.04] transition hover:bg-black/[0.015]"
                    >
                      <td className="px-6 py-4">
                        <p className="text-xs font-black">
                          {item.student}
                        </p>
                      </td>

                      <td className="px-6 py-4">
                        <p className="text-xs font-bold">
                          {item.className}
                        </p>

                        <p className="mt-1 text-[10px] text-black/35">
                          {item.board}
                        </p>
                      </td>

                      <td className="px-6 py-4 text-xs font-bold">
                        {item.subject}
                      </td>

                      <td className="px-6 py-4 text-xs text-black/50">
                        {item.tutor}
                      </td>

                      <td className="px-6 py-4 text-[10px] font-bold text-black/35">
                        {item.time}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="space-y-3 p-4 md:hidden">
              {recentEnrollments.map((item) => (
                <div
                  key={item.student}
                  className="rounded-2xl bg-black/[0.025] p-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-black">
                        {item.student}
                      </p>

                      <p className="mt-1 text-[10px] text-black/35">
                        {item.className} • {item.board}
                      </p>
                    </div>

                    <span className="text-[10px] font-bold text-black/35">
                      {item.time}
                    </span>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="rounded-xl bg-black/[0.04] px-3 py-2 text-[10px] font-black">
                      {item.subject}
                    </span>

                    <span className="rounded-xl bg-black/[0.04] px-3 py-2 text-[10px] font-black">
                      {item.tutor}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Pending teachers */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.39 }}
            className="tq-glass rounded-[28px] p-6 shadow-xl shadow-black/[0.03]"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-black/30">
                  Verification queue
                </p>

                <h2 className="mt-1.5 text-2xl font-black tracking-[-0.03em]">
                  Teacher applications
                </h2>
              </div>

              <span className="rounded-full bg-yellow-500/10 px-3 py-1.5 text-[10px] font-black text-yellow-700">
                12 pending
              </span>
            </div>

            <div className="mt-6 space-y-3">
              {teachersPending.map((teacher, index) => (
                <motion.div
                  key={teacher.name}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.45 + index * 0.06 }}
                  className="rounded-2xl bg-black/[0.025] p-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-black !text-white text-xs font-black">
                      {teacher.initials}
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs font-black">
                        {teacher.name}
                      </p>

                      <p className="mt-1 text-[10px] text-black/35">
                        {teacher.subject} • {teacher.experience}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between gap-3">
                    <span className="text-[10px] text-black/40">
                      {teacher.location}
                    </span>

                    <Link
                      href="/admin/teachers"
                      className="rounded-xl bg-black px-3 py-2 text-[10px] font-black !text-white transition hover:bg-black/85"
                    >
                      Review
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>

            <Link
              href="/admin/teachers"
              className="mt-5 flex w-full items-center justify-center rounded-2xl bg-black/[0.04] px-4 py-3 text-xs font-black text-black/55 transition hover:bg-black/[0.07]"
            >
              View verification queue
            </Link>
          </motion.div>
        </section>

        {/* Activity + quick actions */}
        <section className="mt-4 grid gap-4 xl:grid-cols-[0.8fr_1.2fr]">
          {/* Activity */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.43 }}
            className="tq-glass rounded-[28px] p-6 shadow-xl shadow-black/[0.03]"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-black/30">
                  Operations
                </p>

                <h2 className="mt-1.5 text-2xl font-black tracking-[-0.03em]">
                  Recent activity
                </h2>
              </div>

              <span className="rounded-xl bg-[#42d4bc]/10 px-3 py-2 text-[10px] font-black text-[#0b9079]">
                Live
              </span>
            </div>

            <div className="mt-6 space-y-3">
              {activity.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.48 + index * 0.05,
                  }}
                  className="rounded-2xl bg-black/[0.025] p-4"
                >
                  <div className="flex items-start gap-3">
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-[9px] font-black ${activityClasses(
                        item.type
                      )}`}
                    >
                      {item.type === "Teacher"
                        ? "TR"
                        : item.type === "Batch"
                          ? "BA"
                          : item.type === "Payout"
                            ? "₹"
                            : "SC"}
                    </span>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <p className="text-xs font-black">
                          {item.title}
                        </p>

                        <span className="shrink-0 text-[9px] text-black/30">
                          {item.time}
                        </span>
                      </div>

                      <p className="mt-1 text-[10px] leading-5 text-black/40">
                        {item.detail}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Quick actions */}
          <div>
            <div className="mb-3">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-black/30">
                Administration
              </p>

              <h2 className="mt-1 text-2xl font-black tracking-[-0.03em]">
                Quick actions
              </h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {quickActions.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.48 + index * 0.05,
                  }}
                  whileHover={{ y: -4 }}
                >
                  <Link
                    href={item.href}
                    className="tq-glass group block rounded-[25px] p-5 shadow-lg shadow-black/[0.025]"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black !text-white text-[10px] font-black">
                        {item.icon}
                      </div>

                      <span className="text-black/20 transition group-hover:translate-x-1 group-hover:text-black/55">
                        →
                      </span>
                    </div>

                    <p className="mt-5 text-sm font-black">
                      {item.title}
                    </p>

                    <p className="mt-1.5 text-[11px] leading-5 text-black/40">
                      {item.description}
                    </p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Admin control notice */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.58 }}
          className="mt-4 rounded-[26px] border border-[#42d4bc]/15 bg-[#42d4bc]/6 p-5"
        >
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#42d4bc]/15 text-[#0b9079]">
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
                  d="M9 12.2 11 14l4-4"
                />
              </svg>
            </div>

            <div>
              <p className="text-sm font-black">
                Administrative control center
              </p>

              <p className="mt-1 text-xs leading-5 text-black/50">
                Production access will be protected by strict admin RBAC,
                audit logs and backend authorization. The current page is the
                frontend admin experience.
              </p>
            </div>
          </div>
        </motion.section>
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