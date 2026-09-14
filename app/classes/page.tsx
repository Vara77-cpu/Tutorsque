"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const classData = [
  {
    className: "1st Class",
    number: "01",
    description:
      "Build strong foundations through playful, structured live learning.",
    subjects: ["Mathematics", "English", "Telugu", "EVS"],
    level: "Foundation",
  },
  {
    className: "2nd Class",
    number: "02",
    description:
      "Strengthen reading, writing, numbers and core classroom concepts.",
    subjects: ["Mathematics", "English", "Telugu", "EVS"],
    level: "Foundation",
  },
  {
    className: "3rd Class",
    number: "03",
    description:
      "Develop confidence with concepts, problem solving and communication.",
    subjects: ["Mathematics", "English", "Science", "Telugu"],
    level: "Foundation",
  },
  {
    className: "4th Class",
    number: "04",
    description:
      "Move from basics into deeper understanding across important subjects.",
    subjects: ["Mathematics", "English", "Science", "Social Studies"],
    level: "Primary",
  },
  {
    className: "5th Class",
    number: "05",
    description:
      "Prepare students for the transition into middle-school learning.",
    subjects: ["Mathematics", "English", "Science", "Social Studies"],
    level: "Primary",
  },
  {
    className: "6th Class",
    number: "06",
    description:
      "Create a strong academic base with subject-focused live tuition.",
    subjects: ["Mathematics", "Science", "English", "Social Studies"],
    level: "Middle School",
  },
  {
    className: "7th Class",
    number: "07",
    description:
      "Build stronger reasoning, subject knowledge and independent learning.",
    subjects: ["Mathematics", "Science", "English", "Social Studies"],
    level: "Middle School",
  },
  {
    className: "8th Class",
    number: "08",
    description:
      "Get ready for advanced concepts with consistent guided practice.",
    subjects: ["Mathematics", "Science", "English", "Social Studies"],
    level: "Middle School",
  },
  {
    className: "9th Class",
    number: "09",
    description:
      "Focus on academic depth, exam preparation and concept mastery.",
    subjects: ["Mathematics", "Science", "English", "Social Studies"],
    level: "Secondary",
  },
  {
    className: "10th Class",
    number: "10",
    description:
      "Structured board-focused preparation with live teachers and progress tracking.",
    subjects: ["Mathematics", "Science", "English", "Social Studies"],
    level: "Board Preparation",
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
      width="22"
      height="22"
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

export default function ClassesPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f5f8f7] text-[#111111]">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[-160px] top-[120px] h-[420px] w-[420px] rounded-full bg-[#42d4bc]/10 blur-[100px]" />
        <div className="absolute right-[-120px] top-[250px] h-[380px] w-[380px] rounded-full bg-cyan-200/20 blur-[100px]" />
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
              className="text-[15px] font-semibold text-[#25b59e]"
            >
              Classes
            </Link>

            <Link
              href="/subjects"
              className="text-[15px] font-medium text-black/70 transition hover:text-[#25b59e]"
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
              className="rounded-full bg-[#42d4bc] px-5 py-2.5 text-[14px] font-semibold text-black transition hover:-translate-y-0.5"
            >
              Get started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section>
        <div className="mx-auto max-w-[1440px] px-5 pb-16 pt-16 sm:px-8 sm:pt-20 lg:px-12 lg:pb-20 lg:pt-24">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.8fr]">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-[760px]"
            >
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white bg-white/65 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-black/55 shadow-sm backdrop-blur-xl">
                <span className="h-2 w-2 rounded-full bg-[#42d4bc]" />
                Classes 1–10
              </div>

              <h1 className="text-[52px] font-semibold leading-[0.97] tracking-[-0.07em] sm:text-[68px] lg:text-[80px]">
                Learning designed
                <span className="block">for every class.</span>
              </h1>

              <p className="mt-7 max-w-[650px] text-[18px] leading-8 text-black/55 sm:text-[20px]">
                Choose a class and explore structured live tuition aligned to
                the Andhra Pradesh State Board and CBSE learning journey.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/find-tutors"
                  className="inline-flex h-14 items-center justify-center gap-3 rounded-[16px] bg-black px-7 text-[15px] font-semibold text-white transition hover:-translate-y-0.5"
                >
                  Find a tutor
                  <ArrowIcon />
                </Link>

                <Link
                  href="/signup"
                  className="inline-flex h-14 items-center justify-center rounded-[16px] border border-black/10 bg-white/65 px-7 text-[15px] font-semibold backdrop-blur-xl transition hover:bg-white"
                >
                  Start learning
                </Link>
              </div>
            </motion.div>

            {/* 3D visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative mx-auto w-full max-w-[520px]"
            >
              <div className="absolute right-0 top-0 h-52 w-52 rounded-full bg-[#42d4bc]/20 blur-3xl" />

              <div className="tq-depth relative overflow-hidden rounded-[36px] border border-white/80 bg-white/45 p-3 backdrop-blur-2xl">
                <div className="relative min-h-[450px] overflow-hidden rounded-[28px] bg-[linear-gradient(145deg,#dffaf4,#eff8f6_50%,#d6ebe7)]">
                  <motion.div
                    animate={{ y: [0, -14, 0], rotate: [0, 3, 0] }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute left-[12%] top-[10%] flex h-24 w-24 items-center justify-center rounded-[28px] border border-white/80 bg-white/40 shadow-xl backdrop-blur-xl"
                  >
                    <span className="text-2xl font-bold">A</span>
                  </motion.div>

                  <motion.div
                    animate={{ y: [0, 12, 0], rotate: [0, -3, 0] }}
                    transition={{
                      duration: 7,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute right-[12%] top-[15%] flex h-20 w-20 items-center justify-center rounded-full bg-[#42d4bc]/20 shadow-lg backdrop-blur-xl"
                  >
                    <BookIcon />
                  </motion.div>

                  <div className="absolute left-[10%] right-[10%] top-[24%]">
                    <div className="tq-glass rounded-[28px] p-6 shadow-2xl">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-black/40">
                        Choose your class
                      </p>

                      <div className="mt-5 space-y-3">
                        {["5th Class", "8th Class", "10th Class"].map(
                          (item, index) => (
                            <div
                              key={item}
                              className={`flex items-center justify-between rounded-[17px] border border-white/70 px-4 py-3 ${
                                index === 2
                                  ? "bg-[#42d4bc]/25"
                                  : "bg-white/45"
                              }`}
                            >
                              <span className="font-semibold">{item}</span>

                              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-xs text-white">
                                →
                              </span>
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="absolute bottom-[8%] left-[10%] rounded-[20px] bg-black px-4 py-3 text-white shadow-xl">
                    <p className="text-[10px] uppercase tracking-[0.13em] text-white/45">
                      Live learning
                    </p>
                    <p className="mt-1 text-sm font-semibold">
                      Class-specific tutors
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Classes */}
      <section className="border-t border-black/[0.05] bg-white/55">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-black/40">
                Explore classes
              </p>

              <h2 className="mt-3 text-[40px] font-semibold tracking-[-0.06em] sm:text-[54px]">
                Pick your class.
              </h2>
            </div>

            <p className="max-w-[430px] text-sm leading-6 text-black/45">
              Every class has a clear academic path, subject coverage and
              teacher matching designed for the student&apos;s stage.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {classData.map((item, index) => (
              <motion.article
                key={item.number}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.04,
                }}
                className="tq-hover tq-glass rounded-[28px] p-5"
              >
                <div className="rounded-[22px] bg-white/45 p-5">
                  <div className="flex items-start justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-black text-xs font-semibold text-white">
                      {item.number}
                    </span>

                    <span className="rounded-full border border-black/5 bg-white/60 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-black/45">
                      {item.level}
                    </span>
                  </div>

                  <h3 className="mt-7 text-[25px] font-semibold tracking-[-0.045em]">
                    {item.className}
                  </h3>

                  <p className="mt-3 min-h-[72px] text-sm leading-6 text-black/50">
                    {item.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {item.subjects.map((subject) => (
                      <span
                        key={subject}
                        className="rounded-full border border-white/70 bg-white/55 px-3 py-1.5 text-[10px] font-medium"
                      >
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>

                <Link
                  href={`/find-tutors?class=${encodeURIComponent(
                    item.className,
                  )}`}
                  className="mt-4 flex h-12 items-center justify-center gap-2 rounded-[15px] bg-black text-sm font-semibold text-white transition hover:bg-[#42d4bc] hover:text-black"
                >
                  Explore tutors
                  <ArrowIcon />
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Board section */}
      <section className="px-5 pb-20 sm:px-8 lg:px-12 lg:pb-28">
        <div className="mx-auto max-w-[1440px]">
          <div className="relative overflow-hidden rounded-[34px] bg-black px-6 py-12 text-white sm:px-10 lg:px-14 lg:py-16">
            <div className="absolute right-[-100px] top-[-120px] h-80 w-80 rounded-full bg-[#42d4bc]/20 blur-3xl" />
            <div className="absolute bottom-[-150px] left-[32%] h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />

            <div className="relative max-w-[850px]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#42d4bc]">
                Board-specific learning
              </p>

              <h2 className="mt-4 text-[40px] font-semibold leading-[1.02] tracking-[-0.055em] sm:text-[55px]">
                One platform.
                <span className="block">Two learning paths.</span>
              </h2>

              <p className="mt-5 max-w-[680px] text-[16px] leading-7 text-white/50">
                TutorsQue is designed around the Andhra Pradesh State Board
                and CBSE syllabus so students can learn with teachers who
                understand their exact curriculum.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <div className="rounded-[20px] border border-white/10 bg-white/[0.06] p-5">
                  <p className="text-sm font-semibold">AP State Board</p>
                  <p className="mt-2 text-xs leading-5 text-white/45">
                    Curriculum-focused learning for Andhra Pradesh students.
                  </p>
                </div>

                <div className="rounded-[20px] border border-white/10 bg-white/[0.06] p-5">
                  <p className="text-sm font-semibold">CBSE</p>
                  <p className="mt-2 text-xs leading-5 text-white/45">
                    Structured learning aligned with the CBSE academic path.
                  </p>
                </div>
              </div>

              <Link
                href="/find-tutors"
                className="mt-8 inline-flex h-13 items-center gap-3 rounded-[15px] bg-[#42d4bc] px-6 text-sm font-semibold text-black transition hover:-translate-y-0.5"
              >
                Find a matching tutor
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