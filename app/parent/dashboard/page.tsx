"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const upcomingClasses = [
  {
    id: 1,
    day: "Today",
    date: "Sep 06",
    time: "6:00 PM",
    subject: "Mathematics",
    topic: "Quadratic Equations",
    tutor: "Rahul Varma",
    initials: "RV",
    type: "Live Class",
  },
  {
    id: 2,
    day: "Tomorrow",
    date: "Sep 07",
    time: "6:00 PM",
    subject: "Science",
    topic: "Chemical Reactions",
    tutor: "Priya Sharma",
    initials: "PS",
    type: "Live Class",
  },
  {
    id: 3,
    day: "Wednesday",
    date: "Sep 08",
    time: "5:30 PM",
    subject: "English",
    topic: "Reading & Grammar",
    tutor: "Sneha Rao",
    initials: "SR",
    type: "Live Class",
  },
];

const subjectProgress = [
  {
    subject: "Mathematics",
    teacher: "Rahul Varma",
    progress: 86,
    score: 85,
    status: "Strong",
  },
  {
    subject: "Science",
    teacher: "Priya Sharma",
    progress: 78,
    score: 80,
    status: "Good",
  },
  {
    subject: "English",
    teacher: "Sneha Rao",
    progress: 81,
    score: 80,
    status: "Good",
  },
  {
    subject: "Social Studies",
    teacher: "Arjun Reddy",
    progress: 72,
    score: 76,
    status: "Improving",
  },
];

const homework = [
  {
    title: "Quadratic Equations Practice",
    subject: "Mathematics",
    due: "Due in 2 days",
    progress: 40,
  },
  {
    title: "Chemical Reactions Worksheet",
    subject: "Science",
    due: "Due in 3 days",
    progress: 20,
  },
  {
    title: "Reading Comprehension",
    subject: "English",
    due: "Due today",
    progress: 70,
  },
];

const notifications = [
  {
    title: "Mathematics class starts soon",
    detail: "Today at 6:00 PM with Rahul Varma",
    type: "Class",
    unread: true,
  },
  {
    title: "New homework assigned",
    detail: "Quadratic Equations Practice",
    type: "Homework",
    unread: true,
  },
  {
    title: "Test result published",
    detail: "Mathematics • 34/40",
    type: "Result",
    unread: false,
  },
];

const quickLinks = [
  {
    href: "/parent/child",
    title: "Child Progress",
    description: "Academic performance and learning progress",
    icon: "01",
  },
  {
    href: "/student/schedule",
    title: "Class Schedule",
    description: "View upcoming classes and sessions",
    icon: "02",
  },
  {
    href: "/student/homework",
    title: "Homework",
    description: "Assignments and completion status",
    icon: "03",
  },
  {
    href: "/student/payments",
    title: "Payments",
    description: "Tuition plan and billing history",
    icon: "04",
  },
];

function typeClasses(type: string) {
  if (type === "Class") {
    return "bg-[#42d4bc]/10 text-[#0b9079]";
  }

  if (type === "Homework") {
    return "bg-yellow-500/10 text-yellow-700";
  }

  return "bg-blue-500/10 text-blue-700";
}

export default function ParentDashboardPage() {
  const averageScore = Math.round(
    subjectProgress.reduce((sum, subject) => sum + subject.score, 0) /
      subjectProgress.length
  );

  const averageProgress = Math.round(
    subjectProgress.reduce(
      (sum, subject) => sum + subject.progress,
      0
    ) / subjectProgress.length
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

      <div className="relative mx-auto max-w-[1550px] px-4 py-5 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="tq-glass mb-6 flex flex-col gap-4 rounded-[26px] px-5 py-4 shadow-lg shadow-black/[0.03] sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex min-w-0 items-center gap-3">
            <Link
              href="/"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-black text-white transition hover:-translate-y-0.5"
              aria-label="Go to home"
            >
              TQ
            </Link>

            <div className="min-w-0">
              <p className="truncate text-lg font-black tracking-[-0.02em]">
                Parent Dashboard
              </p>

              <p className="mt-0.5 text-xs text-black/45">
                Stay connected with your child's learning journey
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/student/notifications"
              className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-black/[0.04] text-black/55 transition hover:bg-black/[0.07]"
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
                <path
                  strokeLinecap="round"
                  d="M10 21h4"
                />
              </svg>

              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#42d4bc]" />
            </Link>

            <Link
              href="/student/profile"
              className="flex items-center gap-3 rounded-2xl bg-black/[0.04] px-3 py-2 transition hover:bg-black/[0.07]"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#42d4bc] text-xs font-black">
                RK
              </div>

              <div className="hidden text-left sm:block">
                <p className="text-xs font-black">
                  Rajesh Kumar
                </p>
                <p className="mt-0.5 text-[10px] text-black/35">
                  Parent
                </p>
              </div>
            </Link>
          </div>
        </motion.header>

        {/* Hero */}
        <section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden rounded-[30px] bg-black p-7 text-white shadow-2xl shadow-black/10 sm:p-9"
          >
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#42d4bc]/20 blur-3xl" />

            <div className="absolute bottom-[-130px] left-[28%] h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />

            <div className="relative">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-white/55">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#42d4bc]" />
                    Parent overview
                  </div>

                  <h1 className="mt-5 max-w-2xl text-4xl font-black leading-[1.03] tracking-[-0.05em] sm:text-5xl">
                    Good evening,
                    <span className="text-[#42d4bc]">
                      {" "}
                      Rajesh.
                    </span>
                  </h1>

                  <p className="mt-4 max-w-2xl text-sm leading-6 text-white/50 sm:text-base">
                    Here is a quick view of Aarav&apos;s learning progress,
                    upcoming classes, assignments and academic performance.
                  </p>
                </div>

                <div className="hidden h-20 w-20 shrink-0 items-center justify-center rounded-[26px] border border-white/10 bg-white/[0.06] text-2xl font-black backdrop-blur-xl sm:flex">
                  AK
                </div>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-4">
                <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                  <p className="text-xs text-white/35">
                    Average score
                  </p>

                  <p className="mt-1.5 text-2xl font-black">
                    {averageScore}%
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                  <p className="text-xs text-white/35">
                    Learning progress
                  </p>

                  <p className="mt-1.5 text-2xl font-black">
                    {averageProgress}%
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                  <p className="text-xs text-white/35">
                    Classes this week
                  </p>

                  <p className="mt-1.5 text-2xl font-black">
                    6
                  </p>
                </div>

                <div className="rounded-2xl border border-[#42d4bc]/20 bg-[#42d4bc]/10 p-4">
                  <p className="text-xs text-[#42d4bc]/65">
                    Homework
                  </p>

                  <p className="mt-1.5 text-2xl font-black text-[#42d4bc]">
                    3 active
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Child summary */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="tq-glass rounded-[30px] p-6 shadow-xl shadow-black/[0.03] sm:p-7"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-black text-lg font-black text-white">
                  AK
                </div>

                <div>
                  <p className="text-lg font-black">
                    Aarav Kumar
                  </p>

                  <p className="mt-1 text-xs text-black/40">
                    Class 10 • AP State Board
                  </p>
                </div>
              </div>

              <span className="rounded-full bg-[#42d4bc]/10 px-3 py-1.5 text-[10px] font-black text-[#0b9079]">
                Active
              </span>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-black/[0.035] p-4">
                <p className="text-[10px] font-bold uppercase tracking-wider text-black/30">
                  Medium
                </p>

                <p className="mt-1.5 text-xs font-black">
                  English
                </p>
              </div>

              <div className="rounded-2xl bg-black/[0.035] p-4">
                <p className="text-[10px] font-bold uppercase tracking-wider text-black/30">
                  School
                </p>

                <p className="mt-1.5 truncate text-xs font-black">
                  Sri Chaitanya School
                </p>
              </div>

              <div className="rounded-2xl bg-black/[0.035] p-4">
                <p className="text-[10px] font-bold uppercase tracking-wider text-black/30">
                  Tuition plan
                </p>

                <p className="mt-1.5 text-xs font-black">
                  Regular
                </p>
              </div>

              <div className="rounded-2xl bg-black/[0.035] p-4">
                <p className="text-[10px] font-bold uppercase tracking-wider text-black/30">
                  Tutor
                </p>

                <p className="mt-1.5 text-xs font-black">
                  Rahul Varma
                </p>
              </div>
            </div>

            <Link
              href="/parent/child"
              className="mt-5 flex w-full items-center justify-center rounded-2xl bg-black px-5 py-3.5 text-xs font-black text-white transition hover:-translate-y-0.5 hover:bg-black/85"
            >
              View Child Progress
            </Link>
          </motion.div>
        </section>

        {/* Stats */}
        <section className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              label: "Average score",
              value: `${averageScore}%`,
              detail: "+4.5% this month",
              icon: "↗",
            },
            {
              label: "Learning progress",
              value: `${averageProgress}%`,
              detail: "Across active subjects",
              icon: "◎",
            },
            {
              label: "Homework completion",
              value: "88%",
              detail: "On-time completion",
              icon: "✓",
            },
            {
              label: "Classes completed",
              value: "42",
              detail: "This academic year",
              icon: "◷",
            },
          ].map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
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

              <p className="mt-1 text-[11px] text-black/40">
                {item.detail}
              </p>
            </motion.div>
          ))}
        </section>

        {/* Main dashboard grid */}
        <section className="mt-4 grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
          {/* Upcoming classes */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16 }}
            className="tq-glass rounded-[28px] p-6 shadow-xl shadow-black/[0.03]"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-black/30">
                  Schedule
                </p>

                <h2 className="mt-1.5 text-2xl font-black tracking-[-0.03em]">
                  Upcoming classes
                </h2>
              </div>

              <Link
                href="/student/schedule"
                className="rounded-xl bg-black/[0.04] px-3.5 py-2.5 text-[10px] font-black text-black/55 transition hover:bg-black/[0.07]"
              >
                View schedule
              </Link>
            </div>

            <div className="mt-6 space-y-3">
              {upcomingClasses.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.06 }}
                  className="rounded-2xl bg-black/[0.025] p-4"
                >
                  <div className="grid gap-4 sm:grid-cols-[80px_minmax(0,1fr)_auto] sm:items-center">
                    <div className="rounded-2xl bg-black p-3 text-center text-white">
                      <p className="text-[9px] font-bold uppercase tracking-wider text-white/35">
                        {item.day}
                      </p>

                      <p className="mt-1 text-xl font-black">
                        {item.date.replace("Sep ", "")}
                      </p>
                    </div>

                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#42d4bc] text-xs font-black">
                        {item.initials}
                      </div>

                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="text-sm font-black">
                            {item.subject}
                          </p>

                          <span className="rounded-full bg-[#42d4bc]/10 px-2.5 py-1 text-[9px] font-black text-[#0b9079]">
                            {item.type}
                          </span>
                        </div>

                        <p className="mt-1 truncate text-xs text-black/45">
                          {item.topic}
                        </p>

                        <p className="mt-1 text-[10px] text-black/30">
                          {item.time} • {item.tutor}
                        </p>
                      </div>
                    </div>

                    <Link
                      href="/student/live-class"
                      className="rounded-xl bg-black px-4 py-2.5 text-center text-[10px] font-black text-white transition hover:-translate-y-0.5"
                    >
                      View
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Parent notifications */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="tq-glass rounded-[28px] p-6 shadow-xl shadow-black/[0.03]"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-black/30">
                  Updates
                </p>

                <h2 className="mt-1.5 text-2xl font-black tracking-[-0.03em]">
                  Recent activity
                </h2>
              </div>

              <Link
                href="/student/notifications"
                className="rounded-xl bg-black/[0.04] px-3.5 py-2.5 text-[10px] font-black text-black/55 transition hover:bg-black/[0.07]"
              >
                All
              </Link>
            </div>

            <div className="mt-6 space-y-3">
              {notifications.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.22 + index * 0.06 }}
                  className="rounded-2xl bg-black/[0.025] p-4"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-[10px] font-black ${typeClasses(
                        item.type
                      )}`}
                    >
                      {item.type === "Class"
                        ? "◷"
                        : item.type === "Homework"
                          ? "✓"
                          : "↑"}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <p
                          className={`text-xs ${
                            item.unread ? "font-black" : "font-bold"
                          }`}
                        >
                          {item.title}
                        </p>

                        {item.unread && (
                          <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#42d4bc]" />
                        )}
                      </div>

                      <p className="mt-1 text-[11px] leading-5 text-black/40">
                        {item.detail}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Performance + Homework */}
        <section className="mt-4 grid gap-4 xl:grid-cols-[1fr_1fr]">
          {/* Performance */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.24 }}
            className="tq-glass rounded-[28px] p-6 shadow-xl shadow-black/[0.03]"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-black/30">
                  Academics
                </p>

                <h2 className="mt-1.5 text-2xl font-black tracking-[-0.03em]">
                  Subject performance
                </h2>
              </div>

              <Link
                href="/parent/child"
                className="rounded-xl bg-black/[0.04] px-3.5 py-2.5 text-[10px] font-black text-black/55"
              >
                Details
              </Link>
            </div>

            <div className="mt-6 space-y-5">
              {subjectProgress.map((item, index) => (
                <div key={item.subject}>
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-black">
                        {item.subject}
                      </p>

                      <p className="mt-1 text-[10px] text-black/35">
                        {item.teacher}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-sm font-black">
                        {item.score}%
                      </p>

                      <p className="mt-0.5 text-[9px] font-bold text-[#0b9079]">
                        {item.status}
                      </p>
                    </div>
                  </div>

                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-black/[0.06]">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.progress}%` }}
                      transition={{
                        delay: 0.3 + index * 0.06,
                        duration: 0.7,
                      }}
                      className="h-full rounded-full bg-[#42d4bc]"
                    />
                  </div>

                  <div className="mt-1.5 flex justify-between text-[9px] font-bold text-black/25">
                    <span>Learning progress</span>
                    <span>{item.progress}%</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Homework */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.29 }}
            className="tq-glass rounded-[28px] p-6 shadow-xl shadow-black/[0.03]"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-black/30">
                  Assignments
                </p>

                <h2 className="mt-1.5 text-2xl font-black tracking-[-0.03em]">
                  Homework progress
                </h2>
              </div>

              <Link
                href="/student/homework"
                className="rounded-xl bg-black/[0.04] px-3.5 py-2.5 text-[10px] font-black text-black/55"
              >
                View all
              </Link>
            </div>

            <div className="mt-6 space-y-4">
              {homework.map((item, index) => (
                <div key={item.title}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="truncate text-xs font-black">
                        {item.title}
                      </p>

                      <p className="mt-1 text-[10px] text-black/35">
                        {item.subject}
                      </p>
                    </div>

                    <span
                      className={`shrink-0 rounded-full px-2.5 py-1 text-[9px] font-black ${
                        item.due === "Due today"
                          ? "bg-red-500/10 text-red-600"
                          : "bg-yellow-500/10 text-yellow-700"
                      }`}
                    >
                      {item.due}
                    </span>
                  </div>

                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-black/[0.06]">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.progress}%` }}
                      transition={{
                        delay: 0.35 + index * 0.06,
                        duration: 0.7,
                      }}
                      className="h-full rounded-full bg-[#42d4bc]"
                    />
                  </div>

                  <div className="mt-1.5 text-right text-[9px] font-bold text-black/25">
                    {item.progress}% complete
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-[#42d4bc]/15 bg-[#42d4bc]/6 p-4">
              <p className="text-xs font-black">
                Parent insight
              </p>

              <p className="mt-1.5 text-[11px] leading-5 text-black/45">
                Aarav is progressing well overall. Mathematics is currently
                the strongest subject, while Social Studies has the most room
                for improvement.
              </p>
            </div>
          </motion.div>
        </section>

        {/* Quick access */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.34 }}
          className="mt-4"
        >
          <div className="mb-3">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-black/30">
              Quick access
            </p>

            <h2 className="mt-1 text-2xl font-black tracking-[-0.03em]">
              Manage learning
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {quickLinks.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.38 + index * 0.05 }}
                whileHover={{ y: -4 }}
              >
                <Link
                  href={item.href}
                  className="tq-glass group block rounded-[24px] p-5 shadow-lg shadow-black/[0.025]"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black text-[10px] font-black text-white">
                      {item.icon}
                    </div>

                    <span className="text-black/20 transition group-hover:translate-x-1 group-hover:text-black/50">
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
        </motion.section>

        {/* Footer info */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
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
                <circle cx="12" cy="12" r="9" />
                <path
                  strokeLinecap="round"
                  d="M12 10v5M12 7h.01"
                />
              </svg>
            </div>

            <div>
              <p className="text-sm font-black">
                Built for parent visibility
              </p>

              <p className="mt-1 text-xs leading-5 text-black/50">
                TutorsQue gives parents a clear view of classes, assignments,
                academic performance and payments without interrupting the
                student&apos;s learning experience.
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