"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const subjects = [
  {
    name: "Mathematics",
    short: "M",
    description:
      "Build strong problem-solving skills, understand concepts deeply and gain confidence with numbers.",
    classes: "Classes 1–10",
    tutors: "120+ tutors",
    accent: "from-cyan-300 to-emerald-300",
  },
  {
    name: "Science",
    short: "S",
    description:
      "Learn science through clear explanations, real examples and structured concept practice.",
    classes: "Classes 1–10",
    tutors: "95+ tutors",
    accent: "from-sky-300 to-cyan-200",
  },
  {
    name: "English",
    short: "E",
    description:
      "Improve grammar, vocabulary, reading, writing and communication with experienced teachers.",
    classes: "Classes 1–10",
    tutors: "82+ tutors",
    accent: "from-violet-300 to-sky-200",
  },
  {
    name: "Telugu",
    short: "తె",
    description:
      "Strengthen Telugu language skills through reading, writing, grammar and literature.",
    classes: "Classes 1–10",
    tutors: "68+ tutors",
    accent: "from-orange-200 to-amber-200",
  },
  {
    name: "Hindi",
    short: "हि",
    description:
      "Develop stronger Hindi language fundamentals with guided lessons and regular practice.",
    classes: "Classes 1–10",
    tutors: "54+ tutors",
    accent: "from-rose-200 to-orange-200",
  },
  {
    name: "Social Studies",
    short: "SS",
    description:
      "Understand history, geography, civics and society through structured board-focused learning.",
    classes: "Classes 6–10",
    tutors: "61+ tutors",
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

function BookIcon() {
  return (
    <svg
      width="23"
      height="23"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5 4.5h9.5A3.5 3.5 0 0118 8v11.5H8.5A3.5 3.5 0 015 16V4.5z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M5 16V8a3.5 3.5 0 013.5-3.5H12"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function SubjectsPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f5f8f7] text-[#111111]">
      {/* Background atmosphere */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[-180px] top-[100px] h-[450px] w-[450px] rounded-full bg-[#42d4bc]/10 blur-[110px]" />
        <div className="absolute right-[-140px] top-[220px] h-[420px] w-[420px] rounded-full bg-cyan-200/20 blur-[110px]" />
        <div className="absolute bottom-[-180px] left-[35%] h-[400px] w-[400px] rounded-full bg-emerald-100/20 blur-[110px]" />
      </div>

      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-black/[0.06] bg-white/70 backdrop-blur-2xl">
        <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
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
              href="/find-tutors"
              className="text-[15px] font-medium text-black/70 transition hover:text-[#25b59e]"
            >
              Find tutors
            </Link>

            <Link
              href="/classes"
              className="text-[15px] font-medium text-black/70 transition hover:text-[#25b59e]"
            >
              Classes
            </Link>

            <Link
              href="/subjects"
              className="text-[15px] font-semibold text-[#25b59e]"
            >
              Subjects
            </Link>

            <Link
              href="/#how-it-works"
              className="text-[15px] font-medium text-black/70 transition hover:text-[#25b59e]"
            >
              How it works
            </Link>

            <Link
              href="/teacher/signup"
              className="text-[15px] font-medium text-black/70 transition hover:text-[#25b59e]"
            >
              Become a tutor
            </Link>
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Link
              href="/login"
              className="rounded-full border border-black/15 px-5 py-2.5 text-[14px] font-semibold transition hover:bg-black hover:text-white"
            >
              Log in
            </Link>

            <Link
              href="/signup"
              className="rounded-full bg-[#42d4bc] px-5 py-2.5 text-[14px] font-semibold text-black shadow-[0_8px_25px_rgba(66,212,188,0.18)] transition hover:-translate-y-0.5 hover:bg-[#32c8af]"
            >
              Get started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section>
        <div className="mx-auto max-w-[1440px] px-5 pb-16 pt-16 sm:px-8 sm:pt-20 lg:px-12 lg:pb-20 lg:pt-24">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-[760px]"
            >
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/65 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-black/55 shadow-sm backdrop-blur-xl">
                <span className="h-2 w-2 rounded-full bg-[#42d4bc] shadow-[0_0_14px_rgba(66,212,188,0.75)]" />
                Core subjects
              </div>

              <h1 className="text-[52px] font-semibold leading-[0.97] tracking-[-0.07em] sm:text-[68px] lg:text-[80px]">
                Master every
                <span className="block">important subject.</span>
              </h1>

              <p className="mt-7 max-w-[650px] text-[18px] leading-8 text-black/55 sm:text-[20px]">
                Learn every core subject with teachers matched to your class,
                board and curriculum.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/find-tutors"
                  className="inline-flex h-14 items-center justify-center gap-3 rounded-[16px] bg-black px-7 text-[15px] font-semibold text-white transition hover:-translate-y-0.5"
                >
                  Find a subject tutor
                  <ArrowIcon />
                </Link>

                <Link
                  href="/classes"
                  className="inline-flex h-14 items-center justify-center rounded-[16px] border border-black/10 bg-white/65 px-7 text-[15px] font-semibold backdrop-blur-xl transition hover:bg-white"
                >
                  Browse classes
                </Link>
              </div>
            </motion.div>

            {/* 3D visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.08 }}
              className="relative mx-auto w-full max-w-[550px]"
            >
              <div className="absolute right-[-20px] top-[-10px] h-52 w-52 rounded-full bg-[#42d4bc]/20 blur-3xl" />
              <div className="absolute bottom-[-40px] left-[-20px] h-52 w-52 rounded-full bg-cyan-200/25 blur-3xl" />

              <div className="tq-depth relative overflow-hidden rounded-[36px] border border-white/80 bg-white/45 p-3 backdrop-blur-2xl">
                <div className="relative min-h-[470px] overflow-hidden rounded-[28px] bg-[radial-gradient(circle_at_70%_18%,rgba(255,255,255,0.9),transparent_25%),linear-gradient(145deg,#dffaf4,#eef7f5_48%,#d6ece8)]">
                  <motion.div
                    animate={{ y: [0, -14, 0], rotate: [0, 4, 0] }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute left-[12%] top-[10%] flex h-24 w-24 items-center justify-center rounded-[28px] border border-white/80 bg-white/45 text-2xl font-bold shadow-xl backdrop-blur-xl"
                  >
                    M
                  </motion.div>

                  <motion.div
                    animate={{ y: [0, 12, 0], rotate: [0, -4, 0] }}
                    transition={{
                      duration: 7,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute right-[11%] top-[14%] flex h-20 w-20 items-center justify-center rounded-full border border-white/80 bg-[#42d4bc]/25 text-black/70 shadow-lg backdrop-blur-xl"
                  >
                    <BookIcon />
                  </motion.div>

                  <div className="absolute left-[9%] right-[9%] top-[24%]">
                    <div className="tq-glass rounded-[28px] p-6 shadow-2xl">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-black/40">
                        Subject library
                      </p>

                      <div className="mt-5 grid grid-cols-2 gap-3">
                        {["Maths", "Science", "English", "Telugu"].map(
                          (subject, index) => (
                            <div
                              key={subject}
                              className={`rounded-[17px] border border-white/75 px-4 py-4 ${
                                index === 0
                                  ? "bg-[#42d4bc]/25"
                                  : "bg-white/50"
                              }`}
                            >
                              <p className="text-sm font-semibold">
                                {subject}
                              </p>
                              <p className="mt-1 text-[10px] text-black/40">
                                Live tutors
                              </p>
                            </div>
                          ),
                        )}
                      </div>

                      <div className="mt-4 rounded-[17px] bg-black px-4 py-3 text-white">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium">
                            Tutor match
                          </span>
                          <span className="text-xs text-[#42d4bc]">
                            98% match
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="absolute bottom-[8%] left-[10%] rounded-[20px] bg-black px-4 py-3 text-white shadow-xl">
                    <p className="text-[10px] uppercase tracking-[0.13em] text-white/45">
                      Learn live
                    </p>
                    <p className="mt-1 text-sm font-semibold">
                      Subject-focused tuition
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Subject cards */}
      <section className="border-t border-black/[0.05] bg-white/55">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-black/40">
                Explore subjects
              </p>

              <h2 className="mt-3 text-[40px] font-semibold tracking-[-0.06em] sm:text-[54px]">
                Learn what matters.
              </h2>
            </div>

            <p className="max-w-[430px] text-sm leading-6 text-black/45">
              Pick a subject, explore matched tutors and build a learning path
              around your class and board.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {subjects.map((subject, index) => (
              <motion.article
                key={subject.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.05,
                }}
                className="tq-hover tq-glass rounded-[30px] p-4"
              >
                <div className="relative overflow-hidden rounded-[24px] bg-white/45 p-5">
                  <div
                    className={`absolute right-[-45px] top-[-45px] h-36 w-36 rounded-full bg-gradient-to-br ${subject.accent} opacity-35 blur-2xl`}
                  />

                  <div className="relative flex items-start justify-between">
                    <div
                      className={`flex h-16 w-16 items-center justify-center rounded-[21px] bg-gradient-to-br ${subject.accent} text-lg font-bold shadow-lg`}
                    >
                      {subject.short}
                    </div>

                    <span className="rounded-full border border-black/5 bg-white/60 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-black/45">
                      {subject.classes}
                    </span>
                  </div>

                  <h3 className="relative mt-7 text-[25px] font-semibold tracking-[-0.045em]">
                    {subject.name}
                  </h3>

                  <p className="relative mt-3 min-h-[72px] text-sm leading-6 text-black/50">
                    {subject.description}
                  </p>

                  <div className="relative mt-5 flex items-center justify-between border-t border-black/[0.06] pt-4">
                    <span className="text-xs font-medium text-black/45">
                      {subject.tutors}
                    </span>

                    <span className="rounded-full bg-[#edfaf7] px-3 py-1.5 text-[10px] font-semibold text-[#169b86]">
                      Verified
                    </span>
                  </div>
                </div>

                <Link
                  href={`/find-tutors?subject=${encodeURIComponent(
                    subject.name,
                  )}`}
                  className="mt-4 flex h-12 items-center justify-center gap-2 rounded-[15px] bg-black text-sm font-semibold text-white transition hover:bg-[#42d4bc] hover:text-black"
                >
                  Find {subject.name} tutors
                  <ArrowIcon />
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Learning system */}
      <section className="px-5 pb-20 sm:px-8 lg:px-12 lg:pb-28">
        <div className="mx-auto max-w-[1440px]">
          <div className="relative overflow-hidden rounded-[34px] bg-black px-6 py-12 text-white sm:px-10 lg:px-14 lg:py-16">
            <div className="absolute right-[-100px] top-[-120px] h-80 w-80 rounded-full bg-[#42d4bc]/20 blur-3xl" />
            <div className="absolute bottom-[-150px] left-[30%] h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />

            <div className="relative max-w-[900px]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#42d4bc]">
                More than tuition
              </p>

              <h2 className="mt-4 text-[40px] font-semibold leading-[1.02] tracking-[-0.055em] sm:text-[56px]">
                Every subject becomes
                <span className="block">a measurable journey.</span>
              </h2>

              <p className="mt-5 max-w-[690px] text-[16px] leading-7 text-white/50">
                Live classes, attendance, homework, tests and weekly progress
                help students understand where they are and what to improve.
              </p>

              <div className="mt-9 grid gap-3 sm:grid-cols-3">
                <div className="rounded-[20px] border border-white/10 bg-white/[0.06] p-5">
                  <p className="text-sm font-semibold">Live classes</p>
                  <p className="mt-2 text-xs leading-5 text-white/45">
                    Learn directly from real teachers.
                  </p>
                </div>

                <div className="rounded-[20px] border border-white/10 bg-white/[0.06] p-5">
                  <p className="text-sm font-semibold">Practice</p>
                  <p className="mt-2 text-xs leading-5 text-white/45">
                    Homework and tests reinforce concepts.
                  </p>
                </div>

                <div className="rounded-[20px] border border-white/10 bg-white/[0.06] p-5">
                  <p className="text-sm font-semibold">Progress</p>
                  <p className="mt-2 text-xs leading-5 text-white/45">
                    Follow performance every week.
                  </p>
                </div>
              </div>

              <Link
                href="/find-tutors"
                className="mt-8 inline-flex h-13 items-center gap-3 rounded-[15px] bg-[#42d4bc] px-6 text-sm font-semibold text-black transition hover:-translate-y-0.5"
              >
                Start learning
                <ArrowIcon />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-black/[0.06] px-5 py-8 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-4 text-sm text-black/45 sm:flex-row">
          <p>© {new Date().getFullYear()} TutorsQue</p>
          <p>Live online tuition for Classes 1–10.</p>
        </div>
      </footer>
    </main>
  );
}