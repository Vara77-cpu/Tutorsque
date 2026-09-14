"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";

type HomeworkStatus = "Pending" | "Submitted" | "Reviewed";

type Homework = {
  id: number;
  subject: string;
  title: string;
  description: string;
  tutor: string;
  dueDate: string;
  dueLabel: string;
  status: HomeworkStatus;
  progress: number;
  questions: number;
  difficulty: "Easy" | "Medium" | "Hard";
};

const homeworkData: Homework[] = [
  {
    id: 1,
    subject: "Mathematics",
    title: "Quadratic Equations Practice",
    description:
      "Solve the assigned problems and show all important steps clearly.",
    tutor: "Rahul Varma",
    dueDate: "Sep 08, 2026",
    dueLabel: "Due in 2 days",
    status: "Pending",
    progress: 40,
    questions: 15,
    difficulty: "Medium",
  },
  {
    id: 2,
    subject: "Science",
    title: "Chemical Reactions Worksheet",
    description:
      "Complete the worksheet on chemical reactions and balancing equations.",
    tutor: "Priya Sharma",
    dueDate: "Sep 09, 2026",
    dueLabel: "Due in 3 days",
    status: "Pending",
    progress: 20,
    questions: 12,
    difficulty: "Medium",
  },
  {
    id: 3,
    subject: "English",
    title: "Reading Comprehension",
    description:
      "Read the given passage and answer the comprehension questions.",
    tutor: "Sneha Rao",
    dueDate: "Sep 06, 2026",
    dueLabel: "Due today",
    status: "Pending",
    progress: 70,
    questions: 10,
    difficulty: "Easy",
  },
  {
    id: 4,
    subject: "Social Studies",
    title: "Indian Constitution Notes",
    description:
      "Prepare concise revision notes covering the key constitutional features.",
    tutor: "Arjun Reddy",
    dueDate: "Sep 04, 2026",
    dueLabel: "Submitted Sep 04",
    status: "Submitted",
    progress: 100,
    questions: 8,
    difficulty: "Easy",
  },
  {
    id: 5,
    subject: "Mathematics",
    title: "Arithmetic Progressions",
    description:
      "Complete the revision set focused on AP formulas and applications.",
    tutor: "Rahul Varma",
    dueDate: "Sep 02, 2026",
    dueLabel: "Reviewed Sep 03",
    status: "Reviewed",
    progress: 100,
    questions: 20,
    difficulty: "Hard",
  },
  {
    id: 6,
    subject: "Science",
    title: "Light Reflection Practice",
    description:
      "Answer the conceptual questions and complete the ray-diagram section.",
    tutor: "Priya Sharma",
    dueDate: "Aug 30, 2026",
    dueLabel: "Reviewed Aug 31",
    status: "Reviewed",
    progress: 100,
    questions: 14,
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

const statusFilters = ["All", "Pending", "Submitted", "Reviewed"];

function statusClasses(status: HomeworkStatus) {
  if (status === "Pending") {
    return "bg-yellow-500/10 text-yellow-700";
  }

  if (status === "Submitted") {
    return "bg-blue-500/10 text-blue-700";
  }

  return "bg-[#42d4bc]/10 text-[#0b9079]";
}

function difficultyClasses(difficulty: Homework["difficulty"]) {
  if (difficulty === "Hard") {
    return "bg-red-500/10 text-red-600";
  }

  if (difficulty === "Medium") {
    return "bg-yellow-500/10 text-yellow-700";
  }

  return "bg-[#42d4bc]/10 text-[#0b9079]";
}

export default function StudentHomeworkPage() {
  const [subjectFilter, setSubjectFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filteredHomework = useMemo(() => {
    return homeworkData.filter((item) => {
      const matchesSubject =
        subjectFilter === "All" || item.subject === subjectFilter;

      const matchesStatus =
        statusFilter === "All" || item.status === statusFilter;

      const searchText = `${item.title} ${item.subject} ${item.tutor}`.toLowerCase();

      const matchesSearch = searchText.includes(search.toLowerCase());

      return matchesSubject && matchesStatus && matchesSearch;
    });
  }, [subjectFilter, statusFilter, search]);

  const pendingCount = homeworkData.filter(
    (item) => item.status === "Pending"
  ).length;

  const submittedCount = homeworkData.filter(
    (item) => item.status === "Submitted"
  ).length;

  const reviewedCount = homeworkData.filter(
    (item) => item.status === "Reviewed"
  ).length;

  const completedRate = Math.round(
    ((submittedCount + reviewedCount) / homeworkData.length) * 100
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
            x: [0, -28, 0],
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
                Homework & Assignments
              </p>
              <p className="mt-0.5 text-xs text-black/45">
                Complete, submit and review your learning tasks
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
                Learning tasks
              </div>

              <h1 className="mt-5 max-w-2xl text-4xl font-black leading-[1.03] tracking-[-0.05em] sm:text-5xl">
                Keep your learning
                <span className="text-[#42d4bc]"> moving.</span>
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-6 text-white/50 sm:text-base">
                Stay on top of homework, assignments and teacher feedback from
                one place.
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                  <p className="text-xs text-white/35">Pending</p>
                  <p className="mt-1.5 text-2xl font-black">
                    {pendingCount}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                  <p className="text-xs text-white/35">Submitted</p>
                  <p className="mt-1.5 text-2xl font-black">
                    {submittedCount}
                  </p>
                </div>

                <div className="rounded-2xl border border-[#42d4bc]/20 bg-[#42d4bc]/10 p-4">
                  <p className="text-xs text-[#42d4bc]/65">Completed</p>
                  <p className="mt-1.5 text-2xl font-black text-[#42d4bc]">
                    {completedRate}%
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Progress card */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="tq-glass rounded-[30px] p-6 shadow-xl shadow-black/[0.03] sm:p-7"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-black/30">
                  Assignment progress
                </p>

                <h2 className="mt-2 text-3xl font-black tracking-[-0.04em]">
                  {completedRate}%
                </h2>
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
                    d="M5 12.5 9.2 17 19 7"
                  />
                </svg>
              </div>
            </div>

            <div className="mt-7 h-3 overflow-hidden rounded-full bg-black/[0.06]">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${completedRate}%` }}
                transition={{ duration: 1 }}
                className="h-full rounded-full bg-[#42d4bc]"
              />
            </div>

            <div className="mt-3 flex items-center justify-between text-xs">
              <span className="font-bold text-black/35">
                {reviewedCount} reviewed
              </span>
              <span className="font-black text-[#0b9079]">
                Keep going
              </span>
            </div>

            <div className="mt-7 rounded-2xl bg-black/[0.03] p-4">
              <p className="text-xs font-black">Next priority</p>
              <p className="mt-1 text-sm font-black">
                English Reading Comprehension
              </p>
              <p className="mt-1 text-[11px] text-black/40">
                Due today
              </p>
            </div>
          </motion.div>
        </section>

        {/* Filters */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
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
                  placeholder="Search assignments..."
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

        {/* Assignment list */}
        <section className="mt-4 grid gap-4 lg:grid-cols-2">
          {filteredHomework.map((item, index) => (
            <motion.article
              key={item.id}
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
                      {item.subject}
                    </span>

                    <span
                      className={`rounded-full px-3 py-1.5 text-[10px] font-black ${statusClasses(
                        item.status
                      )}`}
                    >
                      {item.status}
                    </span>
                  </div>

                  <h2 className="mt-4 text-xl font-black tracking-[-0.03em]">
                    {item.title}
                  </h2>

                  <p className="mt-2 text-xs leading-5 text-black/45">
                    {item.description}
                  </p>
                </div>

                <div
                  className={`hidden shrink-0 rounded-xl px-3 py-2 text-[10px] font-black sm:block ${difficultyClasses(
                    item.difficulty
                  )}`}
                >
                  {item.difficulty}
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                <div className="rounded-xl bg-black/[0.035] px-3 py-2 text-[10px] font-bold text-black/50">
                  {item.questions} questions
                </div>

                <div className="rounded-xl bg-black/[0.035] px-3 py-2 text-[10px] font-bold text-black/50">
                  {item.dueLabel}
                </div>

                <div className="rounded-xl bg-black/[0.035] px-3 py-2 text-[10px] font-bold text-black/50">
                  {item.tutor}
                </div>
              </div>

              <div className="mt-5">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-black/30">
                    Progress
                  </span>

                  <span className="text-xs font-black">
                    {item.progress}%
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-black/[0.06]">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.progress}%` }}
                    transition={{
                      delay: 0.2 + index * 0.04,
                      duration: 0.7,
                    }}
                    className="h-full rounded-full bg-[#42d4bc]"
                  />
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3 border-t border-black/5 pt-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-black/30">
                    Due
                  </p>
                  <p className="mt-1 text-xs font-black">{item.dueDate}</p>
                </div>

                <button
                  className={`rounded-2xl px-5 py-3 text-xs font-black transition ${
                    item.status === "Pending"
                      ? "bg-black text-white hover:-translate-y-0.5 hover:bg-black/85"
                      : "bg-black/[0.05] text-black/60 hover:bg-black/[0.08]"
                  }`}
                >
                  {item.status === "Pending"
                    ? "Open Assignment"
                    : item.status === "Submitted"
                      ? "View Submission"
                      : "View Feedback"}
                </button>
              </div>
            </motion.article>
          ))}
        </section>

        {filteredHomework.length === 0 && (
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
                <path
                  strokeLinecap="round"
                  d="m16 16 4 4"
                />
              </svg>
            </div>

            <h2 className="mt-5 text-xl font-black">
              No assignments found
            </h2>

            <p className="mt-2 text-sm text-black/40">
              Try changing your search or filters.
            </p>
          </motion.div>
        )}

        {/* Learning note */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
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
                  d="M12 20h9"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4 11.5-11.5Z"
                />
              </svg>
            </div>

            <div>
              <p className="text-sm font-black">
                Stay consistent
              </p>

              <p className="mt-1 text-xs leading-5 text-black/50">
                Completing assignments on time helps your tutors identify
                concepts that need more practice and keeps your learning plan
                on track.
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