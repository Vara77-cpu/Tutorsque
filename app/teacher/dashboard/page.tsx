"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const todayClasses = [
  {
    time: "4:30 PM",
    duration: "60 min",
    subject: "Mathematics",
    className: "10th Class",
    board: "AP State Board",
    students: 18,
    status: "Completed",
  },
  {
    time: "6:00 PM",
    duration: "60 min",
    subject: "Mathematics",
    className: "9th Class",
    board: "CBSE",
    students: 15,
    status: "Upcoming",
  },
  {
    time: "7:30 PM",
    duration: "60 min",
    subject: "Science",
    className: "10th Class",
    board: "AP State Board",
    students: 20,
    status: "Upcoming",
  },
];

const batches = [
  {
    name: "10th Maths · AP State",
    className: "10th Class",
    board: "AP State Board",
    students: 18,
    schedule: "Mon · Wed · Fri",
    nextClass: "Today · 7:30 PM",
    progress: 72,
  },
  {
    name: "9th Maths · CBSE",
    className: "9th Class",
    board: "CBSE",
    students: 15,
    schedule: "Tue · Thu · Sat",
    nextClass: "Today · 6:00 PM",
    progress: 64,
  },
  {
    name: "10th Science · AP State",
    className: "10th Class",
    board: "AP State Board",
    students: 20,
    schedule: "Mon · Thu · Sat",
    nextClass: "Today · 7:30 PM",
    progress: 58,
  },
];

const earnings = [
  {
    date: "Sep 05",
    batch: "10th Maths · AP State",
    classes: 3,
    amount: 1350,
  },
  {
    date: "Sep 04",
    batch: "9th Maths · CBSE",
    classes: 2,
    amount: 900,
  },
  {
    date: "Sep 03",
    batch: "10th Science · AP State",
    classes: 2,
    amount: 1000,
  },
  {
    date: "Sep 02",
    batch: "10th Maths · AP State",
    classes: 2,
    amount: 900,
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

function CheckIcon() {
  return (
    <svg
      width="17"
      height="17"
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

function CalendarIcon() {
  return (
    <svg
      width="21"
      height="21"
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
      width="21"
      height="21"
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

function WalletIcon() {
  return (
    <svg
      width="21"
      height="21"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 6.5A2.5 2.5 0 016.5 4H19v16H6.5A2.5 2.5 0 014 17.5v-11z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M4 7h13.5A2.5 2.5 0 0120 9.5v5A2.5 2.5 0 0117.5 17H15a2.5 2.5 0 010-5h5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <circle cx="15.5" cy="14.5" r="1" fill="currentColor" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      width="21"
      height="21"
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

function TrendIcon() {
  return (
    <svg
      width="21"
      height="21"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 17l5-5 3 3 7-8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15 7h4v4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function TeacherDashboardPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f4f8f7] text-[#111111]">
      {/* Background */}
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

      {/* Navigation */}
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
              className="text-sm font-semibold text-[#159b87]"
            >
              Dashboard
            </Link>

            <Link
              href="/teacher/classes"
              className="text-sm font-medium text-black/60 transition hover:text-[#159b87]"
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

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="hidden h-11 w-11 items-center justify-center rounded-full border border-black/8 bg-white/55 text-black/55 transition hover:bg-white sm:flex"
              aria-label="Notifications"
            >
              <CalendarIcon />
            </button>

            <div className="flex items-center gap-3 rounded-full border border-black/8 bg-white/65 py-1.5 pl-1.5 pr-4 backdrop-blur-xl">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#42d4bc] to-cyan-200 text-xs font-bold">
                PS
              </div>

              <div className="hidden sm:block">
                <p className="text-xs font-semibold">Priya Sharma</p>
                <p className="text-[10px] text-black/35">Teacher</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <section>
        <div className="mx-auto max-w-[1480px] px-5 py-8 sm:px-8 lg:px-12 lg:py-12">
          {/* Welcome */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/65 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-black/45 shadow-sm backdrop-blur-xl">
                  <span className="h-2 w-2 rounded-full bg-[#42d4bc]" />
                  Teacher dashboard
                </div>

                <h1 className="mt-5 text-[43px] font-semibold leading-[1] tracking-[-0.065em] sm:text-[58px] lg:text-[66px]">
                  Good afternoon,
                  <span className="block text-[#159b87]">
                    Priya.
                  </span>
                </h1>

                <p className="mt-5 max-w-[680px] text-[16px] leading-7 text-black/50">
                  Manage your classes, track attendance and see your verified
                  earnings from one place.
                </p>
              </div>

              <div className="tq-glass rounded-[23px] p-5 lg:min-w-[330px]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.13em] text-black/30">
                      Teaching status
                    </p>

                    <p className="mt-2 text-lg font-semibold">
                      Available
                    </p>
                  </div>

                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#42d4bc]/15 text-[#159b87]">
                    <CheckIcon />
                  </span>
                </div>

                <div className="mt-4 h-2 overflow-hidden rounded-full bg-black/5">
                  <div className="h-full w-[92%] rounded-full bg-[#42d4bc]" />
                </div>

                <p className="mt-2 text-[10px] text-black/35">
                  Profile completion · 92%
                </p>
              </div>
            </div>
          </motion.div>

          {/* Stats */}
          <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[
              {
                label: "Today’s classes",
                value: "3",
                detail: "1 completed · 2 upcoming",
                icon: <CalendarIcon />,
              },
              {
                label: "Active students",
                value: "53",
                detail: "Across 3 batches",
                icon: <UsersIcon />,
              },
              {
                label: "This week",
                value: "₹4,150",
                detail: "Verified class earnings",
                icon: <WalletIcon />,
              },
              {
                label: "Teaching hours",
                value: "18h",
                detail: "This month",
                icon: <ClockIcon />,
              },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="tq-hover tq-glass rounded-[24px] p-5"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-[15px] bg-[#42d4bc]/15 text-[#159b87]">
                    {item.icon}
                  </div>

                  <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-black/25">
                    Live
                  </span>
                </div>

                <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.12em] text-black/30">
                  {item.label}
                </p>

                <p className="mt-1 text-[30px] font-semibold tracking-[-0.05em]">
                  {item.value}
                </p>

                <p className="mt-1 text-[11px] text-black/40">
                  {item.detail}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Main grid */}
          <div className="mt-8 grid gap-8 xl:grid-cols-[1.35fr_0.65fr]">
            <div className="space-y-8">
              {/* Next class */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="tq-depth overflow-hidden rounded-[31px] bg-black text-white"
              >
                <div className="relative p-6 sm:p-8">
                  <div className="absolute right-[-80px] top-[-100px] h-64 w-64 rounded-full bg-[#42d4bc]/20 blur-3xl" />

                  <div className="relative">
                    <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#42d4bc]">
                          Next live class
                        </p>

                        <h2 className="mt-3 text-[31px] font-semibold tracking-[-0.045em]">
                          9th Class Mathematics
                        </h2>

                        <p className="mt-1 text-sm text-white/45">
                          CBSE · 15 students
                        </p>
                      </div>

                      <span className="rounded-full border border-[#42d4bc]/20 bg-[#42d4bc]/10 px-3 py-1.5 text-[10px] font-semibold text-[#42d4bc]">
                        Today · 6:00 PM
                      </span>
                    </div>

                    <div className="mt-7 grid gap-3 sm:grid-cols-3">
                      <div className="rounded-[18px] border border-white/10 bg-white/[0.06] p-4">
                        <p className="text-[10px] uppercase tracking-[0.11em] text-white/30">
                          Duration
                        </p>

                        <p className="mt-1 text-sm font-semibold">
                          60 minutes
                        </p>
                      </div>

                      <div className="rounded-[18px] border border-white/10 bg-white/[0.06] p-4">
                        <p className="text-[10px] uppercase tracking-[0.11em] text-white/30">
                          Chapter
                        </p>

                        <p className="mt-1 text-sm font-semibold">
                          Quadratic Equations
                        </p>
                      </div>

                      <div className="rounded-[18px] border border-white/10 bg-white/[0.06] p-4">
                        <p className="text-[10px] uppercase tracking-[0.11em] text-white/30">
                          Attendance
                        </p>

                        <p className="mt-1 text-sm font-semibold">
                          Ready
                        </p>
                      </div>
                    </div>

                    <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                      <button
                        type="button"
                        className="inline-flex h-12 items-center justify-center gap-2 rounded-[15px] bg-[#42d4bc] px-6 text-sm font-semibold text-black transition hover:-translate-y-0.5"
                      >
                        Start live class
                        <ArrowIcon />
                      </button>

                      <button
                        type="button"
                        className="inline-flex h-12 items-center justify-center rounded-[15px] border border-white/10 bg-white/[0.06] px-6 text-sm font-semibold text-white/75"
                      >
                        View students
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Today classes */}
              <div>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-black/30">
                      Schedule
                    </p>

                    <h2 className="mt-2 text-[30px] font-semibold tracking-[-0.045em]">
                      Today&apos;s classes
                    </h2>
                  </div>

                  <button
                    type="button"
                    className="text-xs font-semibold text-[#159b87]"
                  >
                    Full calendar
                  </button>
                </div>

                <div className="mt-5 space-y-3">
                  {todayClasses.map((item, index) => (
                    <motion.div
                      key={`${item.time}-${item.subject}`}
                      initial={{ opacity: 0, x: -15 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.04 }}
                      className="tq-glass rounded-[22px] p-4"
                    >
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                        <div className="min-w-[100px]">
                          <p className="text-sm font-semibold">
                            {item.time}
                          </p>

                          <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.1em] text-black/30">
                            {item.duration}
                          </p>
                        </div>

                        <div className="h-px bg-black/6 sm:h-10 sm:w-px" />

                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <p className="text-sm font-semibold">
                              {item.subject}
                            </p>

                            <span
                              className={`rounded-full px-2.5 py-1 text-[9px] font-semibold ${
                                item.status === "Completed"
                                  ? "bg-black/5 text-black/35"
                                  : "bg-[#42d4bc]/10 text-[#138d79]"
                              }`}
                            >
                              {item.status}
                            </span>
                          </div>

                          <p className="mt-1 text-xs text-black/40">
                            {item.className} · {item.board} ·{" "}
                            {item.students} students
                          </p>
                        </div>

                        {item.status === "Completed" ? (
                          <button
                            type="button"
                            className="flex h-10 items-center justify-center rounded-[13px] border border-black/8 bg-white/50 px-4 text-xs font-semibold"
                          >
                            Attendance
                          </button>
                        ) : (
                          <button
                            type="button"
                            className="flex h-10 items-center justify-center rounded-[13px] bg-black px-4 text-xs font-semibold text-white"
                          >
                            Start
                          </button>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Batches */}
              <div>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-black/30">
                      Teaching groups
                    </p>

                    <h2 className="mt-2 text-[30px] font-semibold tracking-[-0.045em]">
                      Your batches
                    </h2>
                  </div>

                  <button
                    type="button"
                    className="text-xs font-semibold text-[#159b87]"
                  >
                    View all
                  </button>
                </div>

                <div className="mt-5 grid gap-4 md:grid-cols-3">
                  {batches.map((batch) => (
                    <div
                      key={batch.name}
                      className="tq-hover tq-glass rounded-[23px] p-4"
                    >
                      <div className="flex items-center justify-between">
                        <span className="rounded-full bg-[#42d4bc]/10 px-2.5 py-1.5 text-[9px] font-semibold text-[#138d79]">
                          Active
                        </span>

                        <span className="text-[10px] text-black/35">
                          {batch.students} students
                        </span>
                      </div>

                      <h3 className="mt-5 text-[18px] font-semibold tracking-[-0.03em]">
                        {batch.name}
                      </h3>

                      <p className="mt-2 text-xs leading-5 text-black/40">
                        {batch.board} · {batch.className}
                      </p>

                      <div className="mt-5">
                        <div className="flex justify-between text-[10px] text-black/35">
                          <span>Syllabus progress</span>
                          <span>{batch.progress}%</span>
                        </div>

                        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-black/5">
                          <div
                            className="h-full rounded-full bg-[#42d4bc]"
                            style={{
                              width: `${batch.progress}%`,
                            }}
                          />
                        </div>
                      </div>

                      <div className="mt-5 border-t border-black/[0.06] pt-4">
                        <p className="text-[10px] uppercase tracking-[0.1em] text-black/25">
                          Next class
                        </p>

                        <p className="mt-1 text-xs font-semibold">
                          {batch.nextClass}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right column */}
            <div className="space-y-8">
              {/* Weekly earnings */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 }}
                className="tq-glass rounded-[28px] p-5"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-black/30">
                      This week
                    </p>

                    <h2 className="mt-2 text-[33px] font-semibold tracking-[-0.05em]">
                      ₹4,150
                    </h2>

                    <div className="mt-2 flex items-center gap-2 text-xs text-[#159b87]">
                      <TrendIcon />
                      +12.5% from last week
                    </div>
                  </div>

                  <div className="flex h-12 w-12 items-center justify-center rounded-[15px] bg-[#42d4bc]/15 text-[#159b87]">
                    <WalletIcon />
                  </div>
                </div>

                <div className="mt-7 h-24">
                  <div className="flex h-full items-end gap-2">
                    {[42, 58, 47, 70, 62, 82, 72].map((height, index) => (
                      <div
                        key={index}
                        className="flex flex-1 items-end"
                      >
                        <div
                          className="w-full rounded-t-[8px] bg-[#42d4bc]/70"
                          style={{ height: `${height}%` }}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-3 flex justify-between text-[9px] text-black/25">
                  <span>Mon</span>
                  <span>Tue</span>
                  <span>Wed</span>
                  <span>Thu</span>
                  <span>Fri</span>
                  <span>Sat</span>
                  <span>Sun</span>
                </div>

                <Link
                  href="/teacher/earnings"
                  className="mt-5 flex h-11 items-center justify-center gap-2 rounded-[14px] border border-black/8 bg-white/55 text-xs font-semibold"
                >
                  View earnings
                  <ArrowIcon />
                </Link>
              </motion.div>

              {/* Payout */}
              <div className="tq-glass rounded-[26px] p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-black/30">
                      Next payout
                    </p>

                    <p className="mt-2 text-[27px] font-semibold tracking-[-0.045em]">
                      ₹4,150
                    </p>

                    <p className="mt-1 text-xs text-black/40">
                      Friday · Sep 11
                    </p>
                  </div>

                  <span className="rounded-full bg-[#42d4bc]/10 px-3 py-1.5 text-[9px] font-semibold text-[#138d79]">
                    Processing
                  </span>
                </div>

                <div className="mt-6 rounded-[18px] bg-black/[0.04] p-4">
                  <div className="flex justify-between text-xs">
                    <span className="text-black/40">
                      Verified classes
                    </span>

                    <span className="font-semibold">
                      14
                    </span>
                  </div>

                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-black/5">
                    <div className="h-full w-[78%] rounded-full bg-[#42d4bc]" />
                  </div>

                  <p className="mt-2 text-[10px] text-black/30">
                    Earnings are calculated from verified completed sessions.
                  </p>
                </div>
              </div>

              {/* Attendance */}
              <div className="tq-glass rounded-[26px] p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-black/30">
                      Student attendance
                    </p>

                    <h2 className="mt-2 text-[27px] font-semibold tracking-[-0.045em]">
                      93%
                    </h2>
                  </div>

                  <div className="flex h-12 w-12 items-center justify-center rounded-[15px] bg-[#42d4bc]/15 text-[#159b87]">
                    <UsersIcon />
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-3 gap-2">
                  <div className="rounded-[15px] bg-white/55 p-3 text-center">
                    <p className="text-lg font-semibold">49</p>
                    <p className="mt-1 text-[9px] text-black/35">
                      Present
                    </p>
                  </div>

                  <div className="rounded-[15px] bg-white/55 p-3 text-center">
                    <p className="text-lg font-semibold">4</p>
                    <p className="mt-1 text-[9px] text-black/35">
                      Absent
                    </p>
                  </div>

                  <div className="rounded-[15px] bg-white/55 p-3 text-center">
                    <p className="text-lg font-semibold">53</p>
                    <p className="mt-1 text-[9px] text-black/35">
                      Students
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  className="mt-4 flex h-11 w-full items-center justify-center rounded-[14px] border border-black/8 bg-white/55 text-xs font-semibold"
                >
                  Manage attendance
                </button>
              </div>

              {/* Profile */}
              <div className="tq-glass rounded-[26px] p-5">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-[18px] bg-gradient-to-br from-[#42d4bc] to-cyan-200 text-sm font-bold">
                    PS
                  </div>

                  <div>
                    <p className="text-[17px] font-semibold">
                      Priya Sharma
                    </p>

                    <p className="mt-1 text-xs text-black/40">
                      Mathematics · 8 years experience
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {[
                    "Mathematics",
                    "Science",
                    "CBSE",
                    "AP State Board",
                    "Classes 6–10",
                  ].map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-black/8 bg-white/55 px-3 py-1.5 text-[10px] font-medium text-black/45"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <Link
                  href="/teacher/profile"
                  className="mt-5 flex h-11 items-center justify-center gap-2 rounded-[14px] bg-black text-xs font-semibold text-white transition hover:bg-[#42d4bc] hover:text-black"
                >
                  Manage profile
                  <ArrowIcon />
                </Link>
              </div>
            </div>
          </div>

          {/* Earnings ledger */}
          <section className="mt-8">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-black/30">
                  Earnings ledger
                </p>

                <h2 className="mt-2 text-[30px] font-semibold tracking-[-0.045em]">
                  Recent verified classes
                </h2>

                <p className="mt-1 text-xs text-black/40">
                  Earnings below are tied to completed and verified teaching
                  sessions.
                </p>
              </div>

              <Link
                href="/teacher/earnings"
                className="text-xs font-semibold text-[#159b87]"
              >
                View full ledger →
              </Link>
            </div>

            <div className="tq-glass mt-5 overflow-hidden rounded-[25px]">
              <div className="hidden grid-cols-[0.7fr_1.4fr_0.6fr_0.8fr] gap-4 border-b border-black/[0.06] px-5 py-4 text-[9px] font-semibold uppercase tracking-[0.12em] text-black/30 sm:grid">
                <span>Date</span>
                <span>Batch</span>
                <span>Classes</span>
                <span className="text-right">Earnings</span>
              </div>

              <div>
                {earnings.map((item, index) => (
                  <div
                    key={`${item.date}-${item.batch}`}
                    className={`grid gap-3 px-5 py-4 sm:grid-cols-[0.7fr_1.4fr_0.6fr_0.8fr] sm:items-center sm:gap-4 ${
                      index !== earnings.length - 1
                        ? "border-b border-black/[0.05]"
                        : ""
                    }`}
                  >
                    <div>
                      <p className="text-xs font-semibold">
                        {item.date}
                      </p>

                      <p className="mt-1 text-[10px] text-black/35 sm:hidden">
                        Verified class
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-semibold">
                        {item.batch}
                      </p>

                      <p className="mt-1 text-[10px] text-black/35">
                        Completed · Verified
                      </p>
                    </div>

                    <div>
                      <span className="rounded-full bg-[#42d4bc]/10 px-3 py-1.5 text-[10px] font-semibold text-[#138d79]">
                        {item.classes} classes
                      </span>
                    </div>

                    <div className="text-left sm:text-right">
                      <p className="text-sm font-semibold">
                        ₹{item.amount.toLocaleString("en-IN")}
                      </p>

                      <p className="mt-1 text-[10px] text-black/30">
                        Ledger entry
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Bottom CTA */}
          <section className="mt-8">
            <div className="relative overflow-hidden rounded-[31px] bg-[#42d4bc] p-6 sm:p-8">
              <div className="absolute right-[-100px] top-[-120px] h-72 w-72 rounded-full bg-white/25 blur-3xl" />

              <div className="relative flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-black/45">
                    Keep teaching
                  </p>

                  <h2 className="mt-3 text-[31px] font-semibold tracking-[-0.045em] sm:text-[38px]">
                    Great classes create
                    <span className="block">great learning outcomes.</span>
                  </h2>

                  <p className="mt-3 max-w-[610px] text-sm leading-6 text-black/50">
                    Complete every scheduled class, mark attendance accurately
                    and keep your students moving through the syllabus.
                  </p>
                </div>

                <button
                  type="button"
                  className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-[15px] bg-black px-6 text-sm font-semibold text-white transition hover:-translate-y-0.5"
                >
                  View today&apos;s schedule
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
          <p>Teacher dashboard</p>
        </div>
      </footer>
    </main>
  );
}