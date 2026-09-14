"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";

type TestStatus = "Upcoming" | "Available" | "Completed";

type Test = {
  id: number;
  subject: string;
  title: string;
  description: string;
  tutor: string;
  duration: string;
  questions: number;
  marks: number;
  date: string;
  status: TestStatus;
  score?: number;
  total?: number;
  grade?: string;
  chapter: string;
  difficulty: "Easy" | "Medium" | "Hard";
};

const tests: Test[] = [
  {
    id: 1,
    subject: "Mathematics",
    title: "Quadratic Equations Test",
    description:
      "Evaluate your understanding of quadratic equations, roots and graph-based problems.",
    tutor: "Rahul Varma",
    duration: "45 min",
    questions: 20,
    marks: 40,
    date: "Sep 07, 2026 • 6:00 PM",
    status: "Upcoming",
    chapter: "Quadratic Equations",
    difficulty: "Medium",
  },
  {
    id: 2,
    subject: "Science",
    title: "Chemical Reactions & Equations",
    description:
      "Test covering reaction types, balancing equations and basic applications.",
    tutor: "Priya Sharma",
    duration: "40 min",
    questions: 18,
    marks: 35,
    date: "Available now",
    status: "Available",
    chapter: "Chemical Reactions",
    difficulty: "Medium",
  },
  {
    id: 3,
    subject: "English",
    title: "Reading & Grammar Assessment",
    description:
      "Check your reading comprehension, grammar and language application skills.",
    tutor: "Sneha Rao",
    duration: "35 min",
    questions: 25,
    marks: 40,
    date: "Available now",
    status: "Available",
    chapter: "Reading & Grammar",
    difficulty: "Easy",
  },
  {
    id: 4,
    subject: "Social Studies",
    title: "Indian National Movement",
    description:
      "Assessment covering major events, leaders and developments in the freedom movement.",
    tutor: "Arjun Reddy",
    duration: "30 min",
    questions: 20,
    marks: 30,
    date: "Sep 10, 2026 • 5:30 PM",
    status: "Upcoming",
    chapter: "National Movement",
    difficulty: "Medium",
  },
  {
    id: 5,
    subject: "Mathematics",
    title: "Arithmetic Progressions",
    description:
      "Completed assessment with detailed performance information and teacher feedback.",
    tutor: "Rahul Varma",
    duration: "45 min",
    questions: 20,
    marks: 40,
    date: "Completed Sep 03, 2026",
    status: "Completed",
    score: 34,
    total: 40,
    grade: "A",
    chapter: "Arithmetic Progressions",
    difficulty: "Hard",
  },
  {
    id: 6,
    subject: "Science",
    title: "Light: Reflection & Refraction",
    description:
      "Completed assessment covering concepts, diagrams and application-based questions.",
    tutor: "Priya Sharma",
    duration: "40 min",
    questions: 20,
    marks: 40,
    date: "Completed Aug 30, 2026",
    status: "Completed",
    score: 32,
    total: 40,
    grade: "A",
    chapter: "Light",
    difficulty: "Medium",
  },
  {
    id: 7,
    subject: "English",
    title: "Writing Skills Assessment",
    description:
      "Completed assessment focused on formal writing, structure and language accuracy.",
    tutor: "Sneha Rao",
    duration: "30 min",
    questions: 15,
    marks: 30,
    date: "Completed Aug 27, 2026",
    status: "Completed",
    score: 24,
    total: 30,
    grade: "B+",
    chapter: "Writing Skills",
    difficulty: "Medium",
  },
];

const subjectFilters = [
  "All",
  "Mathematics",
  "Science",
  "English",
  "Social Studies",
];

const statusFilters = ["All", "Upcoming", "Available", "Completed"];

const performanceSubjects = [
  {
    subject: "Mathematics",
    score: 85,
    tests: 4,
  },
  {
    subject: "Science",
    score: 80,
    tests: 3,
  },
  {
    subject: "English",
    score: 80,
    tests: 3,
  },
  {
    subject: "Social Studies",
    score: 76,
    tests: 2,
  },
];

function statusClasses(status: TestStatus) {
  if (status === "Upcoming") {
    return "bg-blue-500/10 text-blue-700";
  }

  if (status === "Available") {
    return "bg-[#42d4bc]/10 text-[#0b9079]";
  }

  return "bg-black/[0.05] text-black/55";
}

function difficultyClasses(difficulty: Test["difficulty"]) {
  if (difficulty === "Hard") {
    return "bg-red-500/10 text-red-600";
  }

  if (difficulty === "Medium") {
    return "bg-yellow-500/10 text-yellow-700";
  }

  return "bg-[#42d4bc]/10 text-[#0b9079]";
}

export default function StudentTestsPage() {
  const [subjectFilter, setSubjectFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filteredTests = useMemo(() => {
    return tests.filter((test) => {
      const matchesSubject =
        subjectFilter === "All" || test.subject === subjectFilter;

      const matchesStatus =
        statusFilter === "All" || test.status === statusFilter;

      const searchableText =
        `${test.title} ${test.subject} ${test.tutor} ${test.chapter}`.toLowerCase();

      const matchesSearch = searchableText.includes(search.toLowerCase());

      return matchesSubject && matchesStatus && matchesSearch;
    });
  }, [subjectFilter, statusFilter, search]);

  const completedTests = tests.filter(
    (test) => test.status === "Completed"
  );

  const upcomingTests = tests.filter(
    (test) => test.status === "Upcoming"
  );

  const availableTests = tests.filter(
    (test) => test.status === "Available"
  );

  const averageScore = Math.round(
    completedTests.reduce((sum, test) => {
      if (!test.score || !test.total) return sum;

      return sum + (test.score / test.total) * 100;
    }, 0) / completedTests.length
  );

  const bestScore = Math.max(
    ...completedTests.map((test) =>
      test.score && test.total ? Math.round((test.score / test.total) * 100) : 0
    )
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
              href="/student/dashboard"
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-black text-white transition hover:-translate-y-0.5"
              aria-label="Back to student dashboard"
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
                Tests & Results
              </p>

              <p className="mt-0.5 text-xs text-black/45">
                Assess your progress and track your academic performance
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-full bg-[#42d4bc]/10 px-4 py-2.5 text-xs font-black text-[#0b9079]">
            <span className="h-2 w-2 rounded-full bg-[#42d4bc]" />
            Class 10 • AP State Board
          </div>
        </motion.header>

        {/* Hero */}
        <section className="grid gap-4 lg:grid-cols-[1.25fr_0.75fr]">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden rounded-[30px] bg-black p-7 text-white shadow-2xl shadow-black/10 sm:p-9"
          >
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#42d4bc]/20 blur-3xl" />

            <div className="absolute bottom-[-120px] left-[28%] h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl" />

            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-white/55">
                <span className="h-1.5 w-1.5 rounded-full bg-[#42d4bc]" />
                Assessments
              </div>

              <h1 className="mt-5 max-w-2xl text-4xl font-black leading-[1.03] tracking-[-0.05em] sm:text-5xl">
                See what you
                <span className="text-[#42d4bc]"> know.</span>
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-6 text-white/50 sm:text-base">
                Take upcoming tests, complete available assessments and
                understand exactly where your performance is improving.
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                  <p className="text-xs text-white/35">Available</p>

                  <p className="mt-1.5 text-2xl font-black">
                    {availableTests.length}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                  <p className="text-xs text-white/35">Upcoming</p>

                  <p className="mt-1.5 text-2xl font-black">
                    {upcomingTests.length}
                  </p>
                </div>

                <div className="rounded-2xl border border-[#42d4bc]/20 bg-[#42d4bc]/10 p-4">
                  <p className="text-xs text-[#42d4bc]/65">
                    Average score
                  </p>

                  <p className="mt-1.5 text-2xl font-black text-[#42d4bc]">
                    {averageScore}%
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Result summary */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="tq-glass rounded-[30px] p-6 shadow-xl shadow-black/[0.03] sm:p-7"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-black/30">
                  Performance
                </p>

                <h2 className="mt-2 text-3xl font-black tracking-[-0.04em]">
                  {averageScore}%
                </h2>

                <p className="mt-1 text-xs text-black/40">
                  Average across completed tests
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#42d4bc]/10 text-[#0b9079]">
                <svg
                  viewBox="0 0 24 24"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 17 9 13l3 3 7-8"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 8h4v4"
                  />
                </svg>
              </div>
            </div>

            <div className="mt-7 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-black/[0.035] p-4">
                <p className="text-xs text-black/35">Best score</p>

                <p className="mt-1.5 text-xl font-black">
                  {bestScore}%
                </p>
              </div>

              <div className="rounded-2xl bg-black/[0.035] p-4">
                <p className="text-xs text-black/35">Completed</p>

                <p className="mt-1.5 text-xl font-black">
                  {completedTests.length}
                </p>
              </div>
            </div>

            <div className="mt-5 rounded-2xl border border-[#42d4bc]/15 bg-[#42d4bc]/6 p-4">
              <p className="text-xs font-black">
                Keep improving
              </p>

              <p className="mt-1.5 text-xs leading-5 text-black/45">
                Review mistakes from previous tests before starting a new
                assessment.
              </p>
            </div>
          </motion.div>
        </section>

        {/* Performance by subject */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
          className="tq-glass mt-4 rounded-[28px] p-6 shadow-xl shadow-black/[0.03]"
        >
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm font-black">
                Subject performance
              </p>

              <p className="mt-1 text-xs text-black/40">
                Average score from your completed assessments
              </p>
            </div>

            <span className="rounded-full bg-black/[0.04] px-3 py-1.5 text-[10px] font-black text-black/45">
              {completedTests.length} tests completed
            </span>
          </div>

          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {performanceSubjects.map((item, index) => (
              <motion.div
                key={item.subject}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + index * 0.06 }}
                className="rounded-2xl bg-black/[0.025] p-4"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs font-black">
                    {item.subject}
                  </p>

                  <span className="text-xs font-black">
                    {item.score}%
                  </span>
                </div>

                <div className="mt-4 h-2 overflow-hidden rounded-full bg-black/[0.06]">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.score}%` }}
                    transition={{
                      delay: 0.3 + index * 0.06,
                      duration: 0.7,
                    }}
                    className="h-full rounded-full bg-[#42d4bc]"
                  />
                </div>

                <p className="mt-2 text-[10px] text-black/35">
                  {item.tests} assessments
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Filters */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.16 }}
          className="tq-glass mt-4 rounded-[26px] p-4 shadow-xl shadow-black/[0.03]"
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2">
              {subjectFilters.map((subject) => (
                <button
                  key={subject}
                  onClick={() => setSubjectFilter(subject)}
                  className={`rounded-xl px-3.5 py-2.5 text-xs font-black transition ${
                    subjectFilter === subject
                      ? "bg-black text-white"
                      : "bg-black/[0.04] text-black/45 hover:bg-black/[0.07]"
                  }`}
                >
                  {subject}
                </button>
              ))}
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="relative">
                <svg
                  viewBox="0 0 24 24"
                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-black/30"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <circle cx="11" cy="11" r="6.5" />
                  <path
                    strokeLinecap="round"
                    d="m16 16 4 4"
                  />
                </svg>

                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search tests..."
                  className="h-11 w-full rounded-xl border border-black/[0.06] bg-white/60 pl-10 pr-4 text-xs font-semibold outline-none transition focus:border-[#42d4bc]/50 focus:bg-white sm:w-60"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
                className="h-11 rounded-xl border border-black/[0.06] bg-white/60 px-4 text-xs font-black outline-none focus:border-[#42d4bc]/50"
              >
                {statusFilters.map((status) => (
                  <option key={status}>{status}</option>
                ))}
              </select>
            </div>
          </div>
        </motion.section>

        {/* Tests */}
        <section className="mt-4 grid gap-4 lg:grid-cols-2">
          {filteredTests.map((test, index) => (
            <motion.article
              key={test.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * index }}
              whileHover={{ y: -3 }}
              className="tq-glass rounded-[28px] p-5 shadow-xl shadow-black/[0.03] sm:p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-black/[0.04] px-3 py-1.5 text-[10px] font-black text-black/50">
                      {test.subject}
                    </span>

                    <span
                      className={`rounded-full px-3 py-1.5 text-[10px] font-black ${statusClasses(
                        test.status
                      )}`}
                    >
                      {test.status}
                    </span>
                  </div>

                  <h2 className="mt-4 text-xl font-black tracking-[-0.03em]">
                    {test.title}
                  </h2>

                  <p className="mt-2 text-xs leading-5 text-black/45">
                    {test.description}
                  </p>
                </div>

                <span
                  className={`hidden shrink-0 rounded-xl px-3 py-2 text-[10px] font-black sm:block ${difficultyClasses(
                    test.difficulty
                  )}`}
                >
                  {test.difficulty}
                </span>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
                <div className="rounded-xl bg-black/[0.035] p-3">
                  <p className="text-[9px] font-bold uppercase tracking-wider text-black/30">
                    Duration
                  </p>

                  <p className="mt-1 text-xs font-black">
                    {test.duration}
                  </p>
                </div>

                <div className="rounded-xl bg-black/[0.035] p-3">
                  <p className="text-[9px] font-bold uppercase tracking-wider text-black/30">
                    Questions
                  </p>

                  <p className="mt-1 text-xs font-black">
                    {test.questions}
                  </p>
                </div>

                <div className="rounded-xl bg-black/[0.035] p-3">
                  <p className="text-[9px] font-bold uppercase tracking-wider text-black/30">
                    Marks
                  </p>

                  <p className="mt-1 text-xs font-black">
                    {test.marks}
                  </p>
                </div>

                <div className="rounded-xl bg-black/[0.035] p-3">
                  <p className="text-[9px] font-bold uppercase tracking-wider text-black/30">
                    Chapter
                  </p>

                  <p className="mt-1 truncate text-xs font-black">
                    {test.chapter}
                  </p>
                </div>
              </div>

              {test.status === "Completed" &&
                test.score !== undefined &&
                test.total !== undefined && (
                  <div className="mt-5 rounded-2xl border border-[#42d4bc]/15 bg-[#42d4bc]/6 p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-black/35">
                          Your result
                        </p>

                        <p className="mt-1 text-xl font-black">
                          {test.score}/{test.total}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-black/35">
                          Grade
                        </p>

                        <p className="mt-1 text-xl font-black text-[#0b9079]">
                          {test.grade}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 h-2 overflow-hidden rounded-full bg-black/[0.06]">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{
                          width: `${Math.round(
                            (test.score / test.total) * 100
                          )}%`,
                        }}
                        transition={{ duration: 0.7 }}
                        className="h-full rounded-full bg-[#42d4bc]"
                      />
                    </div>
                  </div>
                )}

              <div className="mt-6 border-t border-black/5 pt-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-black/30">
                      {test.status === "Completed"
                        ? "Result date"
                        : "Schedule"}
                    </p>

                    <p className="mt-1 text-xs font-black">
                      {test.date}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    {test.status === "Available" && (
                      <button className="rounded-2xl bg-black px-5 py-3 text-xs font-black text-white transition hover:-translate-y-0.5 hover:bg-black/85">
                        Start Test
                      </button>
                    )}

                    {test.status === "Upcoming" && (
                      <button className="rounded-2xl bg-black/[0.05] px-5 py-3 text-xs font-black text-black/55 transition hover:bg-black/[0.08]">
                        View Details
                      </button>
                    )}

                    {test.status === "Completed" && (
                      <button className="rounded-2xl bg-black/[0.05] px-5 py-3 text-xs font-black text-black/60 transition hover:bg-black/[0.08]">
                        View Result
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </section>

        {filteredTests.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="tq-glass mt-4 rounded-[28px] p-12 text-center shadow-xl shadow-black/[0.03]"
          >
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-black/[0.04] text-black/40">
              <svg
                viewBox="0 0 24 24"
                className="h-7 w-7"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
              >
                <circle cx="11" cy="11" r="6.5" />
                <path strokeLinecap="round" d="m16 16 4 4" />
              </svg>
            </div>

            <h2 className="mt-5 text-xl font-black">
              No tests found
            </h2>

            <p className="mt-2 text-sm text-black/40">
              Try changing your search or filters.
            </p>
          </motion.div>
        )}

        {/* Exam strategy card */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22 }}
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
                Your results guide your learning
              </p>

              <p className="mt-1 text-xs leading-5 text-black/50">
                Test results can help identify strong concepts and topics that
                need more practice. Your tutors can use this information to
                personalize future classes.
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