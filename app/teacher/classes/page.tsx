"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

type ClassItem = {
  id: number;
  subject: string;
  className: string;
  board: string;
  students: number;
  schedule: string;
  nextClass: string;
  time: string;
  progress: number;
  chapter: string;
  status: "Upcoming" | "Live" | "Completed";
  earnings: number;
  accent: string;
};

const classes: ClassItem[] = [
  {
    id: 1,
    subject: "Mathematics",
    className: "10th Class",
    board: "AP State Board",
    students: 18,
    schedule: "Mon · Wed · Fri",
    nextClass: "Today",
    time: "4:30 PM",
    progress: 78,
    chapter: "Quadratic Equations",
    status: "Upcoming",
    earnings: 450,
    accent: "from-cyan-300 to-emerald-300",
  },
  {
    id: 2,
    subject: "Mathematics",
    className: "9th Class",
    board: "CBSE",
    students: 15,
    schedule: "Tue · Thu · Sat",
    nextClass: "Today",
    time: "6:00 PM",
    progress: 64,
    chapter: "Polynomials",
    status: "Live",
    earnings: 450,
    accent: "from-violet-300 to-sky-200",
  },
  {
    id: 3,
    subject: "Science",
    className: "10th Class",
    board: "AP State Board",
    students: 20,
    schedule: "Mon · Thu · Sat",
    nextClass: "Today",
    time: "7:30 PM",
    progress: 58,
    chapter: "Light & Reflection",
    status: "Upcoming",
    earnings: 500,
    accent: "from-sky-300 to-cyan-200",
  },
  {
    id: 4,
    subject: "Mathematics",
    className: "8th Class",
    board: "CBSE",
    students: 12,
    schedule: "Mon · Wed",
    nextClass: "Tomorrow",
    time: "5:30 PM",
    progress: 71,
    chapter: "Linear Equations",
    status: "Upcoming",
    earnings: 400,
    accent: "from-emerald-200 to-teal-200",
  },
  {
    id: 5,
    subject: "Science",
    className: "9th Class",
    board: "CBSE",
    students: 14,
    schedule: "Tue · Fri",
    nextClass: "Tomorrow",
    time: "7:00 PM",
    progress: 52,
    chapter: "Matter Around Us",
    status: "Upcoming",
    earnings: 450,
    accent: "from-orange-200 to-amber-200",
  },
  {
    id: 6,
    subject: "Mathematics",
    className: "10th Class",
    board: "CBSE",
    students: 17,
    schedule: "Mon · Thu",
    nextClass: "Yesterday",
    time: "6:30 PM",
    progress: 84,
    chapter: "Statistics",
    status: "Completed",
    earnings: 450,
    accent: "from-indigo-300 to-sky-200",
  },
];

function ArrowIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5 12H19M13 6L19 12L13 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="4"
        y="5"
        width="16"
        height="15"
        rx="2.5"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M8 3.5V7M16 3.5V7M4 9h16"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="9"
        cy="8"
        r="3"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M3.5 19c.7-3.1 2.5-5 5.5-5s4.8 1.9 5.5 5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M15.5 5.5a3 3 0 010 5.8M17 14c2.2.6 3.4 2.2 3.9 5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5 12.5L9.2 16.5L19 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="12"
        cy="12"
        r="8.5"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M12 7v5l3 2"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function FilterIcon() {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 6h16M7 12h10M10 18h4"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function TeacherClassesPage() {
  const [statusFilter, setStatusFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filteredClasses = classes.filter((item) => {
    const matchesStatus =
      statusFilter === "All" || item.status === statusFilter;

    const term = search.toLowerCase().trim();

    const matchesSearch =
      !term ||
      item.subject.toLowerCase().includes(term) ||
      item.className.toLowerCase().includes(term) ||
      item.board.toLowerCase().includes(term) ||
      item.chapter.toLowerCase().includes(term);

    return matchesStatus && matchesSearch;
  });

  return (
    <main className="min-h-screen overflow-hidden bg-[#f4f8f7] text-[#111111]">
      {/* Background atmosphere */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-[-180px] top-[100px] h-[440px] w-[440px] rounded-full bg-[#42d4bc]/10 blur-[110px]"
        />

        <motion.div
          animate={{ x: [0, -25, 0], y: [0, 25, 0] }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute right-[-150px] top-[220px] h-[430px] w-[430px] rounded-full bg-cyan-200/20 blur-[110px]"
        />

        <div className="absolute bottom-[-180px] left-[30%] h-[430px] w-[430px] rounded-full bg-emerald-100/20 blur-[120px]" />
      </div>

      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-black/[0.06] bg-white/75 backdrop-blur-2xl">
        <div className="mx-auto flex h-[76px] max-w-[1480px] items-center justify-between px-5 sm:px-8 lg:px-12">
          <Link
            href="/"
            className="flex items-center gap-2"
            aria-label="TutorsQue home"
          >
            <div className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-[10px] bg-black">
              <div className="absolute left-[7px] top-[8px] h-[18px] w-[18px] rounded-[5px] border-[2px] border-white" />
              <div className="absolute left-[12px] top-[13px] h-[7px] w-[7px] rounded-full bg-[#42d4bc]" />
            </div>

            <span className="text-[25px] font-semibold tracking-[-0.055em]">
              Tutors<span className="text-[#37cdb3]">Que</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            <Link
              href="/teacher/dashboard"
              className="text-sm font-medium text-black/60 transition hover:text-[#159b87]"
            >
              Dashboard
            </Link>

            <Link
              href="/teacher/classes"
              className="text-sm font-semibold text-[#159b87]"
            >
              Classes
            </Link>

            <Link
              href="/teacher/earnings"
              className="text-sm font-medium text-black/60 transition hover:text-[#159b87]"
            >
              Earnings
            </Link>

            <Link
              href="/teacher/profile"
              className="text-sm font-medium text-black/60 transition hover:text-[#159b87]"
            >
              Profile
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden rounded-full border border-[#42d4bc]/20 bg-[#42d4bc]/10 px-3 py-2 text-[10px] font-semibold text-[#148d7a] sm:block">
              Teacher · Available
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#42d4bc] to-cyan-200 text-xs font-bold">
              PS
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <section>
        <div className="mx-auto max-w-[1480px] px-5 py-8 sm:px-8 lg:px-12 lg:py-12">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <div className="max-w-[780px]">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/65 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-black/45 shadow-sm backdrop-blur-xl">
                  <span className="h-2 w-2 rounded-full bg-[#42d4bc]" />
                  Teacher classes
                </div>

                <h1 className="mt-5 text-[44px] font-semibold leading-[0.98] tracking-[-0.065em] sm:text-[58px] lg:text-[66px]">
                  Your classes.
                  <span className="block text-[#159b87]">
                    Your students.
                  </span>
                </h1>

                <p className="mt-5 max-w-[680px] text-[16px] leading-7 text-black/50">
                  Manage your assigned batches, review syllabus progress and
                  open live sessions from one place.
                </p>
              </div>

              <div className="tq-glass rounded-[23px] p-5">
                <div className="grid grid-cols-3 gap-5">
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.1em] text-black/30">
                      Batches
                    </p>
                    <p className="mt-1 text-xl font-semibold">6</p>
                  </div>

                  <div>
                    <p className="text-[9px] uppercase tracking-[0.1em] text-black/30">
                      Students
                    </p>
                    <p className="mt-1 text-xl font-semibold">96</p>
                  </div>

                  <div>
                    <p className="text-[9px] uppercase tracking-[0.1em] text-black/30">
                      Today
                    </p>
                    <p className="mt-1 text-xl font-semibold">3</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Search + filters */}
          <div className="mt-10 flex flex-col gap-4 lg:flex-row">
            <div className="tq-glass flex h-13 flex-1 items-center gap-3 rounded-[17px] px-4">
              <span className="text-black/30">
                <FilterIcon />
              </span>

              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search class, subject, board or chapter..."
                className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-black/30"
              />
            </div>

            <div className="flex gap-2 overflow-x-auto pb-1">
              {["All", "Upcoming", "Live", "Completed"].map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setStatusFilter(filter)}
                  className={`whitespace-nowrap rounded-full px-5 py-3 text-xs font-semibold transition ${
                    statusFilter === filter
                      ? "bg-black text-white"
                      : "border border-black/8 bg-white/55 text-black/50 hover:bg-white"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Quick stats */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[
              {
                label: "Upcoming",
                value: "4",
                detail: "Classes scheduled",
                icon: <CalendarIcon />,
              },
              {
                label: "Live now",
                value: "1",
                detail: "Session in progress",
                icon: <ClockIcon />,
              },
              {
                label: "Students",
                value: "96",
                detail: "Across active classes",
                icon: <UsersIcon />,
              },
              {
                label: "Verified earnings",
                value: "₹2,650",
                detail: "From listed sessions",
                icon: <CheckIcon />,
              },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="tq-hover tq-glass rounded-[22px] p-5"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-[#42d4bc]/15 text-[#159b87]">
                  {item.icon}
                </div>

                <p className="mt-5 text-[9px] font-semibold uppercase tracking-[0.12em] text-black/30">
                  {item.label}
                </p>

                <p className="mt-1 text-[27px] font-semibold tracking-[-0.045em]">
                  {item.value}
                </p>

                <p className="mt-1 text-[10px] text-black/35">
                  {item.detail}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Class list */}
          <div className="mt-10">
            <div className="flex items-end justify-between gap-5">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-black/30">
                  Assigned teaching groups
                </p>

                <h2 className="mt-2 text-[31px] font-semibold tracking-[-0.045em]">
                  All classes
                </h2>
              </div>

              <p className="text-xs text-black/35">
                {filteredClasses.length} result
                {filteredClasses.length === 1 ? "" : "s"}
              </p>
            </div>

            {filteredClasses.length > 0 ? (
              <div className="mt-6 grid gap-5 lg:grid-cols-2">
                {filteredClasses.map((item, index) => (
                  <motion.article
                    key={item.id}
                    initial={{ opacity: 0, y: 22 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.45,
                      delay: index * 0.04,
                    }}
                    className="tq-hover tq-glass rounded-[28px] p-4"
                  >
                    <div className="relative overflow-hidden rounded-[23px] bg-white/45 p-5">
                      <div
                        className={`absolute right-[-55px] top-[-55px] h-48 w-48 rounded-full bg-gradient-to-br ${item.accent} opacity-20 blur-3xl`}
                      />

                      <div className="relative flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
                        <div className="flex items-start gap-4">
                          <div
                            className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-[20px] bg-gradient-to-br ${item.accent} text-[15px] font-bold shadow-lg`}
                          >
                            {item.subject === "Mathematics"
                              ? "M"
                              : "S"}
                          </div>

                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <h3 className="text-[21px] font-semibold tracking-[-0.035em]">
                                {item.subject}
                              </h3>

                              <span
                                className={`rounded-full px-2.5 py-1 text-[9px] font-semibold ${
                                  item.status === "Live"
                                    ? "bg-[#42d4bc] text-black"
                                    : item.status === "Completed"
                                      ? "bg-black/5 text-black/35"
                                      : "bg-[#42d4bc]/10 text-[#138d79]"
                                }`}
                              >
                                {item.status}
                              </span>
                            </div>

                            <p className="mt-1 text-sm text-black/45">
                              {item.className} · {item.board}
                            </p>
                          </div>
                        </div>

                        <div className="rounded-[16px] border border-black/7 bg-white/55 px-3 py-2 text-left sm:text-right">
                          <p className="text-[9px] uppercase tracking-[0.1em] text-black/30">
                            Next session
                          </p>

                          <p className="mt-1 text-xs font-semibold">
                            {item.nextClass}
                          </p>

                          <p className="mt-1 text-[10px] text-black/35">
                            {item.time}
                          </p>
                        </div>
                      </div>

                      <div className="relative mt-6 grid gap-3 sm:grid-cols-3">
                        <div className="rounded-[17px] bg-white/55 p-4">
                          <p className="text-[9px] uppercase tracking-[0.1em] text-black/30">
                            Students
                          </p>

                          <p className="mt-1 text-sm font-semibold">
                            {item.students}
                          </p>
                        </div>

                        <div className="rounded-[17px] bg-white/55 p-4">
                          <p className="text-[9px] uppercase tracking-[0.1em] text-black/30">
                            Schedule
                          </p>

                          <p className="mt-1 text-xs font-semibold">
                            {item.schedule}
                          </p>
                        </div>

                        <div className="rounded-[17px] bg-white/55 p-4">
                          <p className="text-[9px] uppercase tracking-[0.1em] text-black/30">
                            Class earning
                          </p>

                          <p className="mt-1 text-sm font-semibold">
                            ₹{item.earnings}
                          </p>
                        </div>
                      </div>

                      <div className="relative mt-5">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-[9px] uppercase tracking-[0.1em] text-black/30">
                              Syllabus progress
                            </p>

                            <p className="mt-1 text-xs font-semibold">
                              {item.chapter}
                            </p>
                          </div>

                          <span className="text-xs font-semibold text-[#159b87]">
                            {item.progress}%
                          </span>
                        </div>

                        <div className="mt-3 h-2 overflow-hidden rounded-full bg-black/5">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{
                              width: `${item.progress}%`,
                            }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="h-full rounded-full bg-[#42d4bc]"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-2 px-1 pb-1 pt-4 sm:grid-cols-2">
                      {item.status === "Live" ? (
                        <button
                          type="button"
                          className="flex h-11 items-center justify-center gap-2 rounded-[14px] bg-[#42d4bc] text-xs font-semibold text-black"
                        >
                          Continue live class
                          <ArrowIcon />
                        </button>
                      ) : item.status === "Upcoming" ? (
                        <button
                          type="button"
                          className="flex h-11 items-center justify-center gap-2 rounded-[14px] bg-black text-xs font-semibold text-white"
                        >
                          Open class
                          <ArrowIcon />
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="flex h-11 items-center justify-center rounded-[14px] border border-black/8 bg-white/55 text-xs font-semibold"
                        >
                          View completed class
                        </button>
                      )}

                      <button
                        type="button"
                        className="flex h-11 items-center justify-center rounded-[14px] border border-black/8 bg-white/55 text-xs font-semibold text-black/60"
                      >
                        View students
                      </button>
                    </div>
                  </motion.article>
                ))}
              </div>
            ) : (
              <div className="tq-glass mt-6 rounded-[28px] p-12 text-center">
                <h3 className="text-xl font-semibold">
                  No classes found
                </h3>

                <p className="mt-2 text-sm text-black/40">
                  Try another search term or status filter.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setStatusFilter("All");
                  }}
                  className="mt-6 rounded-full bg-black px-6 py-3 text-xs font-semibold text-white"
                >
                  Reset filters
                </button>
              </div>
            )}
          </div>

          {/* Today's teaching timeline */}
          <section className="mt-10">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-black/30">
                  Today
                </p>

                <h2 className="mt-2 text-[31px] font-semibold tracking-[-0.045em]">
                  Teaching timeline
                </h2>
              </div>
            </div>

            <div className="mt-6 tq-glass rounded-[28px] p-5 sm:p-7">
              <div className="space-y-5">
                {classes.slice(0, 3).map((item, index) => (
                  <div
                    key={`${item.id}-timeline`}
                    className="relative flex gap-4"
                  >
                    {index < 2 && (
                      <div className="absolute left-[17px] top-[38px] h-[70px] w-px bg-black/8" />
                    )}

                    <div
                      className={`relative z-10 flex h-[35px] w-[35px] shrink-0 items-center justify-center rounded-full ${
                        item.status === "Completed"
                          ? "bg-black text-white"
                          : item.status === "Live"
                            ? "bg-[#42d4bc] text-black"
                            : "bg-black/5 text-black/45"
                      }`}
                    >
                      {item.status === "Completed" ? (
                        <CheckIcon />
                      ) : (
                        <ClockIcon />
                      )}
                    </div>

                    <div className="flex-1 rounded-[19px] border border-black/[0.06] bg-white/50 p-4">
                      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                        <div>
                          <p className="text-xs font-semibold">
                            {item.time} · {item.subject}
                          </p>

                          <p className="mt-1 text-[10px] text-black/40">
                            {item.className} · {item.board} ·{" "}
                            {item.students} students
                          </p>
                        </div>

                        <span
                          className={`rounded-full px-3 py-1.5 text-[9px] font-semibold ${
                            item.status === "Completed"
                              ? "bg-black/5 text-black/35"
                              : item.status === "Live"
                                ? "bg-[#42d4bc] text-black"
                                : "bg-[#42d4bc]/10 text-[#138d79]"
                          }`}
                        >
                          {item.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Bottom callout */}
          <section className="mt-10">
            <div className="relative overflow-hidden rounded-[31px] bg-black p-6 text-white sm:p-8">
              <div className="absolute right-[-100px] top-[-120px] h-72 w-72 rounded-full bg-[#42d4bc]/20 blur-3xl" />

              <div className="relative flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#42d4bc]">
                    Next step
                  </p>

                  <h2 className="mt-3 text-[31px] font-semibold tracking-[-0.045em] sm:text-[38px]">
                    Ready to start your
                    <span className="block">next live class?</span>
                  </h2>

                  <p className="mt-3 max-w-[620px] text-sm leading-6 text-white/45">
                    Open the scheduled session, connect with your students,
                    mark attendance and complete the class to create a
                    verified earnings record.
                  </p>
                </div>

                <button
                  type="button"
                  className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-[15px] bg-[#42d4bc] px-6 text-sm font-semibold text-black transition hover:-translate-y-0.5"
                >
                  Open next class
                  <ArrowIcon />
                </button>
              </div>
            </div>
          </section>
        </div>
      </section>

      <footer className="border-t border-black/[0.06] px-5 py-8 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1480px] flex-col justify-between gap-4 text-sm text-black/40 sm:flex-row">
          <p>© {new Date().getFullYear()} TutorsQue</p>
          <p>Teacher classes</p>
        </div>
      </footer>
    </main>
  );
}