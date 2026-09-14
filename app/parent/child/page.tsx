"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";

type Subject = {
  name: string;
  tutor: string;
  progress: number;
  score: number;
  completedChapters: number;
  totalChapters: number;
  trend: "up" | "stable" | "down";
  status: "Strong" | "Good" | "Improving" | "Needs Focus";
};

const subjects: Subject[] = [
  {
    name: "Mathematics",
    tutor: "Rahul Varma",
    progress: 86,
    score: 85,
    completedChapters: 12,
    totalChapters: 14,
    trend: "up",
    status: "Strong",
  },
  {
    name: "Science",
    tutor: "Priya Sharma",
    progress: 78,
    score: 80,
    completedChapters: 10,
    totalChapters: 13,
    trend: "up",
    status: "Good",
  },
  {
    name: "English",
    tutor: "Sneha Rao",
    progress: 81,
    score: 80,
    completedChapters: 9,
    totalChapters: 11,
    trend: "stable",
    status: "Good",
  },
  {
    name: "Social Studies",
    tutor: "Arjun Reddy",
    progress: 72,
    score: 76,
    completedChapters: 8,
    totalChapters: 12,
    trend: "up",
    status: "Improving",
  },
];

const recentResults = [
  {
    subject: "Mathematics",
    test: "Arithmetic Progressions",
    score: 34,
    total: 40,
    date: "Sep 03, 2026",
    grade: "A",
  },
  {
    subject: "Science",
    test: "Light: Reflection & Refraction",
    score: 32,
    total: 40,
    date: "Aug 30, 2026",
    grade: "A",
  },
  {
    subject: "English",
    test: "Writing Skills Assessment",
    score: 24,
    total: 30,
    date: "Aug 27, 2026",
    grade: "B+",
  },
  {
    subject: "Social Studies",
    test: "National Movement",
    score: 23,
    total: 30,
    date: "Aug 24, 2026",
    grade: "B+",
  },
];

const weeklyActivity = [
  { day: "Mon", minutes: 85 },
  { day: "Tue", minutes: 110 },
  { day: "Wed", minutes: 70 },
  { day: "Thu", minutes: 125 },
  { day: "Fri", minutes: 95 },
  { day: "Sat", minutes: 80 },
  { day: "Sun", minutes: 45 },
];

const milestones = [
  {
    title: "Strong Mathematics performance",
    description:
      "Aarav is consistently performing above 80% in Mathematics assessments.",
    date: "This month",
    icon: "↗",
  },
  {
    title: "Homework consistency",
    description:
      "88% of assignments have been completed on time.",
    date: "This month",
    icon: "✓",
  },
  {
    title: "Chapter progress",
    description:
      "39 chapters have been completed across the current subjects.",
    date: "Academic year",
    icon: "◎",
  },
];

const tabs = ["Overview", "Subjects", "Results", "Activity"] as const;
type Tab = (typeof tabs)[number];

export default function ParentChildPage() {
  const [activeTab, setActiveTab] = useState<Tab>("Overview");
  const [subjectFilter, setSubjectFilter] = useState("All");

  const averageScore = useMemo(() => {
    return Math.round(
      subjects.reduce((sum, subject) => sum + subject.score, 0) /
        subjects.length
    );
  }, []);

  const averageProgress = useMemo(() => {
    return Math.round(
      subjects.reduce((sum, subject) => sum + subject.progress, 0) /
        subjects.length
    );
  }, []);

  const totalChapters = subjects.reduce(
    (sum, subject) => sum + subject.totalChapters,
    0
  );

  const completedChapters = subjects.reduce(
    (sum, subject) => sum + subject.completedChapters,
    0
  );

  const totalMinutes = weeklyActivity.reduce(
    (sum, item) => sum + item.minutes,
    0
  );

  const filteredSubjects =
    subjectFilter === "All"
      ? subjects
      : subjects.filter((subject) => subject.name === subjectFilter);

  const maxActivity = Math.max(
    ...weeklyActivity.map((item) => item.minutes)
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

      <div className="relative mx-auto max-w-[1500px] px-4 py-5 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="tq-glass mb-6 flex flex-col gap-4 rounded-[26px] px-5 py-4 shadow-lg shadow-black/[0.03] sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex items-center gap-3">
            <Link
              href="/parent/dashboard"
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-black text-white transition hover:-translate-y-0.5"
              aria-label="Back to parent dashboard"
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
                Child Progress
              </p>

              <p className="mt-0.5 text-xs text-black/45">
                Detailed academic performance for Aarav Kumar
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-full bg-[#42d4bc]/10 px-4 py-2.5 text-xs font-black text-[#0b9079]">
            <span className="h-2 w-2 rounded-full bg-[#42d4bc]" />
            Class 10 • AP State Board
          </div>
        </motion.header>

        {/* Student hero */}
        <section className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden rounded-[30px] bg-black p-7 text-white shadow-2xl shadow-black/10 sm:p-9"
          >
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#42d4bc]/20 blur-3xl" />

            <div className="absolute bottom-[-120px] left-[25%] h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl" />

            <div className="relative">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-white/55">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#42d4bc]" />
                    Student profile
                  </div>

                  <h1 className="mt-5 text-4xl font-black leading-[1.03] tracking-[-0.05em] sm:text-5xl">
                    Aarav&apos;s learning
                    <span className="text-[#42d4bc]">
                      {" "}
                      journey.
                    </span>
                  </h1>

                  <p className="mt-4 max-w-2xl text-sm leading-6 text-white/50 sm:text-base">
                    A clear view of academic progress, subject performance,
                    test results and learning activity.
                  </p>
                </div>

                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-[26px] border border-white/10 bg-white/[0.06] text-2xl font-black backdrop-blur-xl">
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
                    Progress
                  </p>

                  <p className="mt-1.5 text-2xl font-black">
                    {averageProgress}%
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                  <p className="text-xs text-white/35">
                    Chapters
                  </p>

                  <p className="mt-1.5 text-2xl font-black">
                    {completedChapters}/{totalChapters}
                  </p>
                </div>

                <div className="rounded-2xl border border-[#42d4bc]/20 bg-[#42d4bc]/10 p-4">
                  <p className="text-xs text-[#42d4bc]/65">
                    Weekly learning
                  </p>

                  <p className="mt-1.5 text-2xl font-black text-[#42d4bc]">
                    {totalMinutes}m
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Student profile card */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="tq-glass rounded-[30px] p-6 shadow-xl shadow-black/[0.03] sm:p-7"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#42d4bc] text-lg font-black">
                  AK
                </div>

                <div>
                  <p className="text-lg font-black">
                    Aarav Kumar
                  </p>

                  <p className="mt-1 text-xs text-black/40">
                    Student ID • TQ-STU-01482
                  </p>
                </div>
              </div>

              <span className="rounded-full bg-[#42d4bc]/10 px-3 py-1.5 text-[10px] font-black text-[#0b9079]">
                Active
              </span>
            </div>

            <div className="mt-6 space-y-3">
              {[
                ["School", "Sri Chaitanya School"],
                ["Board", "AP State Board"],
                ["Class", "10"],
                ["Medium", "English"],
                ["Academic year", "2026–27"],
                ["Tuition plan", "Regular"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex items-center justify-between gap-4 rounded-xl bg-black/[0.025] px-4 py-3"
                >
                  <span className="text-xs text-black/40">
                    {label}
                  </span>

                  <span className="text-right text-xs font-black">
                    {value}
                  </span>
                </div>
              ))}
            </div>

            <Link
              href="/student/profile"
              className="mt-5 flex w-full items-center justify-center rounded-2xl bg-black px-5 py-3.5 text-xs font-black text-white transition hover:-translate-y-0.5"
            >
              View Student Profile
            </Link>
          </motion.div>
        </section>

        {/* Tabs */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
          className="tq-glass mt-4 rounded-[26px] p-2 shadow-xl shadow-black/[0.03]"
        >
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`rounded-2xl px-4 py-3 text-xs font-black transition ${
                  activeTab === tab
                    ? "bg-black text-white"
                    : "text-black/45 hover:bg-black/[0.04]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </motion.section>

        {/* OVERVIEW */}
        {activeTab === "Overview" && (
          <>
            <section className="mt-4 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
              {/* Overall progress */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="tq-glass rounded-[28px] p-6 shadow-xl shadow-black/[0.03]"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-black/30">
                      Overall academics
                    </p>

                    <h2 className="mt-2 text-2xl font-black tracking-[-0.03em]">
                      Progress overview
                    </h2>

                    <p className="mt-1 text-xs text-black/40">
                      Current progress across active subjects
                    </p>
                  </div>

                  <div className="rounded-2xl bg-[#42d4bc]/10 px-4 py-3 text-center">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#0b9079]/55">
                      Overall
                    </p>

                    <p className="mt-1 text-xl font-black text-[#0b9079]">
                      {averageProgress}%
                    </p>
                  </div>
                </div>

                <div className="mt-7 space-y-5">
                  {subjects.map((subject, index) => (
                    <div key={subject.name}>
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="text-xs font-black">
                            {subject.name}
                          </p>

                          <p className="mt-1 text-[10px] text-black/35">
                            {subject.tutor}
                          </p>
                        </div>

                        <div className="text-right">
                          <p className="text-xs font-black">
                            {subject.progress}%
                          </p>

                          <p className="mt-1 text-[9px] font-bold text-[#0b9079]">
                            {subject.status}
                          </p>
                        </div>
                      </div>

                      <div className="mt-2 h-2 overflow-hidden rounded-full bg-black/[0.06]">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${subject.progress}%` }}
                          transition={{
                            delay: 0.2 + index * 0.06,
                            duration: 0.7,
                          }}
                          className="h-full rounded-full bg-[#42d4bc]"
                        />
                      </div>

                      <div className="mt-1.5 flex justify-between text-[9px] font-bold text-black/25">
                        <span>
                          {subject.completedChapters} of{" "}
                          {subject.totalChapters} chapters
                        </span>

                        <span>
                          Avg score {subject.score}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Insights */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 }}
                className="tq-glass rounded-[28px] p-6 shadow-xl shadow-black/[0.03]"
              >
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-black/30">
                  Parent insights
                </p>

                <h2 className="mt-2 text-2xl font-black tracking-[-0.03em]">
                  What is going well?
                </h2>

                <div className="mt-6 space-y-3">
                  {milestones.map((item, index) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.18 + index * 0.05 }}
                      className="rounded-2xl bg-black/[0.025] p-4"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#42d4bc]/10 text-xs font-black text-[#0b9079]">
                          {item.icon}
                        </div>

                        <div>
                          <div className="flex items-center justify-between gap-3">
                            <p className="text-xs font-black">
                              {item.title}
                            </p>

                            <span className="text-[9px] font-bold text-black/25">
                              {item.date}
                            </span>
                          </div>

                          <p className="mt-1.5 text-[11px] leading-5 text-black/45">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </section>

            {/* Activity chart + results */}
            <section className="mt-4 grid gap-4 xl:grid-cols-[1fr_1fr]">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.14 }}
                className="tq-glass rounded-[28px] p-6 shadow-xl shadow-black/[0.03]"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-black/30">
                      Learning activity
                    </p>

                    <h2 className="mt-2 text-2xl font-black tracking-[-0.03em]">
                      This week
                    </h2>
                  </div>

                  <span className="rounded-xl bg-black/[0.04] px-3 py-2 text-[10px] font-black">
                    {totalMinutes} min
                  </span>
                </div>

                <div className="mt-8 flex h-[230px] items-end gap-3 sm:gap-5">
                  {weeklyActivity.map((item, index) => {
                    const height =
                      item.minutes === 0
                        ? 4
                        : Math.max(
                            (item.minutes / maxActivity) * 170,
                            18
                          );

                    return (
                      <div
                        key={item.day}
                        className="flex h-full flex-1 flex-col items-center justify-end"
                      >
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height }}
                          transition={{
                            delay: 0.2 + index * 0.05,
                            duration: 0.65,
                            ease: "easeOut",
                          }}
                          className="group relative w-full max-w-12 rounded-t-[14px] bg-[#42d4bc]"
                        >
                          <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-lg bg-black px-2 py-1 text-[9px] font-black text-white opacity-0 transition group-hover:opacity-100">
                            {item.minutes} min
                          </div>
                        </motion.div>

                        <p className="mt-3 text-[10px] font-bold text-black/35">
                          {item.day}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.19 }}
                className="tq-glass rounded-[28px] p-6 shadow-xl shadow-black/[0.03]"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-black/30">
                      Assessments
                    </p>

                    <h2 className="mt-2 text-2xl font-black tracking-[-0.03em]">
                      Recent results
                    </h2>
                  </div>

                  <Link
                    href="/student/tests"
                    className="rounded-xl bg-black/[0.04] px-3 py-2.5 text-[10px] font-black text-black/50"
                  >
                    All results
                  </Link>
                </div>

                <div className="mt-6 space-y-3">
                  {recentResults.slice(0, 3).map((result) => (
                    <div
                      key={result.test}
                      className="flex items-center justify-between gap-4 rounded-2xl bg-black/[0.025] p-4"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-xs font-black">
                          {result.test}
                        </p>

                        <p className="mt-1 text-[10px] text-black/35">
                          {result.subject} • {result.date}
                        </p>
                      </div>

                      <div className="shrink-0 text-right">
                        <p className="text-sm font-black">
                          {result.score}/{result.total}
                        </p>

                        <p className="mt-1 text-[10px] font-black text-[#0b9079]">
                          Grade {result.grade}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </section>
          </>
        )}

        {/* SUBJECTS */}
        {activeTab === "Subjects" && (
          <section className="mt-4">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="tq-glass rounded-[28px] p-6 shadow-xl shadow-black/[0.03]"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-black/30">
                    Subject analysis
                  </p>

                  <h2 className="mt-2 text-3xl font-black tracking-[-0.04em]">
                    Every subject at a glance
                  </h2>

                  <p className="mt-1 text-xs text-black/40">
                    Progress, scores and chapter completion
                  </p>
                </div>

                <select
                  value={subjectFilter}
                  onChange={(event) =>
                    setSubjectFilter(event.target.value)
                  }
                  className="h-11 rounded-xl border border-black/[0.06] bg-white/60 px-4 text-xs font-black outline-none focus:border-[#42d4bc]/50"
                >
                  <option>All</option>

                  {subjects.map((subject) => (
                    <option key={subject.name}>
                      {subject.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-7 grid gap-4 md:grid-cols-2">
                {filteredSubjects.map((subject, index) => (
                  <motion.div
                    key={subject.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.06 }}
                    whileHover={{ y: -3 }}
                    className="rounded-[24px] bg-black/[0.025] p-5"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-lg font-black">
                          {subject.name}
                        </p>

                        <p className="mt-1 text-xs text-black/40">
                          {subject.tutor}
                        </p>
                      </div>

                      <span className="rounded-full bg-[#42d4bc]/10 px-3 py-1.5 text-[10px] font-black text-[#0b9079]">
                        {subject.status}
                      </span>
                    </div>

                    <div className="mt-6 flex items-center justify-between">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-black/30">
                          Learning progress
                        </p>

                        <p className="mt-1 text-3xl font-black">
                          {subject.progress}%
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-black/30">
                          Average score
                        </p>

                        <p className="mt-1 text-3xl font-black">
                          {subject.score}%
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 h-3 overflow-hidden rounded-full bg-black/[0.06]">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{
                          width: `${subject.progress}%`,
                        }}
                        transition={{
                          delay: 0.2 + index * 0.06,
                          duration: 0.7,
                        }}
                        className="h-full rounded-full bg-[#42d4bc]"
                      />
                    </div>

                    <div className="mt-5 grid grid-cols-2 gap-3">
                      <div className="rounded-xl bg-white/60 p-3">
                        <p className="text-[9px] font-bold uppercase tracking-wider text-black/30">
                          Chapters
                        </p>

                        <p className="mt-1 text-xs font-black">
                          {subject.completedChapters}/
                          {subject.totalChapters}
                        </p>
                      </div>

                      <div className="rounded-xl bg-white/60 p-3">
                        <p className="text-[9px] font-bold uppercase tracking-wider text-black/30">
                          Trend
                        </p>

                        <p
                          className={`mt-1 text-xs font-black ${
                            subject.trend === "up"
                              ? "text-[#0b9079]"
                              : subject.trend === "down"
                                ? "text-red-600"
                                : "text-black/50"
                          }`}
                        >
                          {subject.trend === "up"
                            ? "Improving ↑"
                            : subject.trend === "down"
                              ? "Needs attention ↓"
                              : "Stable →"}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </section>
        )}

        {/* RESULTS */}
        {activeTab === "Results" && (
          <section className="mt-4">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="tq-glass overflow-hidden rounded-[28px] shadow-xl shadow-black/[0.03]"
            >
              <div className="border-b border-black/5 px-6 py-5">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-black/30">
                  Assessment results
                </p>

                <h2 className="mt-2 text-2xl font-black tracking-[-0.03em]">
                  Test performance
                </h2>

                <p className="mt-1 text-xs text-black/40">
                  Recent completed assessments and grades
                </p>
              </div>

              <div className="hidden overflow-x-auto md:block">
                <table className="w-full min-w-[700px] border-collapse">
                  <thead>
                    <tr className="border-b border-black/5 text-left">
                      <th className="px-6 py-4 text-[10px] font-black uppercase tracking-wider text-black/30">
                        Assessment
                      </th>

                      <th className="px-6 py-4 text-[10px] font-black uppercase tracking-wider text-black/30">
                        Subject
                      </th>

                      <th className="px-6 py-4 text-[10px] font-black uppercase tracking-wider text-black/30">
                        Date
                      </th>

                      <th className="px-6 py-4 text-[10px] font-black uppercase tracking-wider text-black/30">
                        Score
                      </th>

                      <th className="px-6 py-4 text-[10px] font-black uppercase tracking-wider text-black/30">
                        Grade
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {recentResults.map((result) => (
                      <tr
                        key={result.test}
                        className="border-b border-black/[0.04] transition hover:bg-black/[0.015]"
                      >
                        <td className="px-6 py-4">
                          <p className="text-sm font-black">
                            {result.test}
                          </p>
                        </td>

                        <td className="px-6 py-4 text-xs font-bold text-black/55">
                          {result.subject}
                        </td>

                        <td className="px-6 py-4 text-xs text-black/45">
                          {result.date}
                        </td>

                        <td className="px-6 py-4 text-sm font-black">
                          {result.score}/{result.total}
                        </td>

                        <td className="px-6 py-4">
                          <span className="rounded-full bg-[#42d4bc]/10 px-3 py-1.5 text-[10px] font-black text-[#0b9079]">
                            {result.grade}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="space-y-3 p-4 md:hidden">
                {recentResults.map((result) => (
                  <div
                    key={result.test}
                    className="rounded-2xl bg-black/[0.025] p-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm font-black">
                          {result.test}
                        </p>

                        <p className="mt-1 text-[10px] text-black/35">
                          {result.subject} • {result.date}
                        </p>
                      </div>

                      <span className="rounded-full bg-[#42d4bc]/10 px-3 py-1.5 text-[10px] font-black text-[#0b9079]">
                        {result.grade}
                      </span>
                    </div>

                    <div className="mt-4">
                      <p className="text-2xl font-black">
                        {result.score}/{result.total}
                      </p>

                      <div className="mt-2 h-2 overflow-hidden rounded-full bg-black/[0.06]">
                        <div
                          className="h-full rounded-full bg-[#42d4bc]"
                          style={{
                            width: `${Math.round(
                              (result.score / result.total) * 100
                            )}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </section>
        )}

        {/* ACTIVITY */}
        {activeTab === "Activity" && (
          <section className="mt-4 grid gap-4 lg:grid-cols-[1fr_0.8fr]">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="tq-glass rounded-[28px] p-6 shadow-xl shadow-black/[0.03]"
            >
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-black/30">
                Learning activity
              </p>

              <h2 className="mt-2 text-2xl font-black tracking-[-0.03em]">
                Weekly activity
              </h2>

              <p className="mt-1 text-xs text-black/40">
                Approximate learning time across the current week
              </p>

              <div className="mt-8 flex h-[280px] items-end gap-3 sm:gap-5">
                {weeklyActivity.map((item, index) => {
                  const height =
                    Math.max(
                      (item.minutes / maxActivity) * 205,
                      18
                    );

                  return (
                    <div
                      key={item.day}
                      className="flex h-full flex-1 flex-col items-center justify-end"
                    >
                      <p className="mb-2 text-[9px] font-black text-black/35">
                        {item.minutes}m
                      </p>

                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height }}
                        transition={{
                          delay: index * 0.06,
                          duration: 0.65,
                        }}
                        className="w-full max-w-14 rounded-t-[14px] bg-[#42d4bc]"
                      />

                      <p className="mt-3 text-[10px] font-bold text-black/35">
                        {item.day}
                      </p>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 }}
              className="tq-glass rounded-[28px] p-6 shadow-xl shadow-black/[0.03]"
            >
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-black/30">
                Activity summary
              </p>

              <h2 className="mt-2 text-2xl font-black tracking-[-0.03em]">
                Learning habits
              </h2>

              <div className="mt-6 space-y-3">
                <div className="rounded-2xl bg-black/[0.025] p-4">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-black/30">
                    Weekly learning time
                  </p>

                  <p className="mt-1.5 text-2xl font-black">
                    {Math.floor(totalMinutes / 60)}h{" "}
                    {totalMinutes % 60}m
                  </p>
                </div>

                <div className="rounded-2xl bg-black/[0.025] p-4">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-black/30">
                    Most active day
                  </p>

                  <p className="mt-1.5 text-lg font-black">
                    Thursday
                  </p>

                  <p className="mt-1 text-[10px] text-black/35">
                    125 minutes
                  </p>
                </div>

                <div className="rounded-2xl bg-[#42d4bc]/7 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#0b9079]/60">
                    Consistency
                  </p>

                  <p className="mt-1.5 text-lg font-black text-[#0b9079]">
                    7 day activity
                  </p>

                  <p className="mt-1 text-[10px] text-black/35">
                    Learning activity recorded every day this week.
                  </p>
                </div>
              </div>

              <Link
                href="/student/schedule"
                className="mt-5 flex w-full items-center justify-center rounded-2xl bg-black px-5 py-3.5 text-xs font-black text-white transition hover:-translate-y-0.5"
              >
                View Class Schedule
              </Link>
            </motion.div>
          </section>
        )}

        {/* Parent note */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
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
                Parent visibility
              </p>

              <p className="mt-1 text-xs leading-5 text-black/50">
                This dashboard is designed to give parents a clear academic
                overview while keeping the student&apos;s actual learning
                workflow inside the student account.
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