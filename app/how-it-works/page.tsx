"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Choose your learning path",
    description:
      "Select your board, class, medium and the subjects you want to learn.",
  },
  {
    number: "02",
    title: "Discover the right tutor",
    description:
      "Explore verified teachers matched to your class, subject and syllabus.",
  },
  {
    number: "03",
    title: "Choose your tuition plan",
    description:
      "Select a learning plan that fits your preferred schedule and learning needs.",
  },
  {
    number: "04",
    title: "Join live classes",
    description:
      "Learn directly from your teacher through structured online live classes.",
  },
  {
    number: "05",
    title: "Practice and improve",
    description:
      "Complete homework, assignments and tests to strengthen understanding.",
  },
  {
    number: "06",
    title: "Track your progress",
    description:
      "Students and parents can follow attendance, results and weekly progress.",
  },
];

const benefits = [
  {
    title: "Verified teachers",
    text: "Teacher profiles are reviewed before they can teach on TutorsQue.",
  },
  {
    title: "Board-specific learning",
    text: "Learning is organized around the Andhra Pradesh State Board and CBSE.",
  },
  {
    title: "Live online classes",
    text: "Students learn directly with real teachers instead of watching only recorded lessons.",
  },
  {
    title: "One learning dashboard",
    text: "Classes, attendance, homework, tests and progress are brought together.",
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
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5 12.5l4.2 4.2L19 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M10 8.5L16 12L10 15.5V8.5z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f5f8f7] text-[#111111]">
      {/* Background atmosphere */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[-180px] top-[100px] h-[450px] w-[450px] rounded-full bg-[#42d4bc]/10 blur-[110px]" />
        <div className="absolute right-[-150px] top-[240px] h-[420px] w-[420px] rounded-full bg-cyan-200/20 blur-[110px]" />
        <div className="absolute bottom-[-180px] left-[32%] h-[400px] w-[400px] rounded-full bg-emerald-100/20 blur-[110px]" />
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
              className="text-[15px] font-medium text-black/70 transition hover:text-[#25b59e]"
            >
              Subjects
            </Link>

            <Link
              href="/how-it-works"
              className="text-[15px] font-semibold text-[#25b59e]"
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
        <div className="mx-auto max-w-[1440px] px-5 pb-16 pt-16 sm:px-8 sm:pt-20 lg:px-12 lg:pb-24 lg:pt-24">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.9fr]">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-[760px]"
            >
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/65 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-black/55 shadow-sm backdrop-blur-xl">
                <span className="h-2 w-2 rounded-full bg-[#42d4bc] shadow-[0_0_14px_rgba(66,212,188,0.8)]" />
                How TutorsQue works
              </div>

              <h1 className="text-[52px] font-semibold leading-[0.97] tracking-[-0.07em] sm:text-[68px] lg:text-[80px]">
                From finding a tutor
                <span className="block">to seeing progress.</span>
              </h1>

              <p className="mt-7 max-w-[650px] text-[18px] leading-8 text-black/55 sm:text-[20px]">
                TutorsQue brings teachers, live classes, learning activities
                and progress tracking together in one simple journey.
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
                  className="inline-flex h-14 items-center justify-center gap-3 rounded-[16px] border border-black/10 bg-white/65 px-7 text-[15px] font-semibold backdrop-blur-xl transition hover:bg-white"
                >
                  Start learning
                  <PlayIcon />
                </Link>
              </div>
            </motion.div>

            {/* 3D journey visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.08 }}
              className="relative mx-auto w-full max-w-[560px]"
            >
              <div className="absolute right-[-20px] top-[-30px] h-56 w-56 rounded-full bg-[#42d4bc]/20 blur-3xl" />
              <div className="absolute bottom-[-40px] left-[-30px] h-52 w-52 rounded-full bg-cyan-200/20 blur-3xl" />

              <div className="tq-depth relative overflow-hidden rounded-[38px] border border-white/80 bg-white/45 p-3 backdrop-blur-2xl">
                <div className="relative min-h-[500px] overflow-hidden rounded-[30px] bg-[radial-gradient(circle_at_75%_15%,rgba(255,255,255,0.9),transparent_24%),linear-gradient(145deg,#dffaf4,#eef8f5_50%,#d5ebe6)]">
                  {/* Floating objects */}
                  <motion.div
                    animate={{ y: [0, -14, 0], rotate: [0, 4, 0] }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute left-[10%] top-[9%] flex h-24 w-24 items-center justify-center rounded-[28px] border border-white/80 bg-white/45 text-2xl font-bold shadow-xl backdrop-blur-xl"
                  >
                    01
                  </motion.div>

                  <motion.div
                    animate={{ y: [0, 12, 0], rotate: [0, -4, 0] }}
                    transition={{
                      duration: 7,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute right-[11%] top-[13%] flex h-20 w-20 items-center justify-center rounded-full border border-white/80 bg-[#42d4bc]/25 text-black/60 shadow-lg backdrop-blur-xl"
                  >
                    ✓
                  </motion.div>

                  <div className="absolute left-[8%] right-[8%] top-[23%]">
                    <div className="tq-glass rounded-[28px] p-6 shadow-2xl">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-black/40">
                        Your learning journey
                      </p>

                      <div className="relative mt-6 space-y-4">
                        {[
                          "Choose class & subject",
                          "Match with a tutor",
                          "Attend live classes",
                          "Track your progress",
                        ].map((item, index) => (
                          <div
                            key={item}
                            className="relative flex items-center gap-4"
                          >
                            {index < 3 && (
                              <div className="absolute left-[17px] top-[36px] h-[27px] w-px bg-black/10" />
                            )}

                            <div
                              className={`relative z-10 flex h-[35px] w-[35px] shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${
                                index === 3
                                  ? "bg-[#42d4bc]"
                                  : "bg-black text-white"
                              }`}
                            >
                              {index + 1}
                            </div>

                            <div className="flex-1 rounded-[15px] border border-white/70 bg-white/55 px-4 py-3">
                              <p className="text-sm font-semibold">{item}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="absolute bottom-[8%] left-[8%] rounded-[20px] bg-black px-4 py-3 text-white shadow-xl">
                    <p className="text-[10px] uppercase tracking-[0.13em] text-white/45">
                      One platform
                    </p>

                    <p className="mt-1 text-sm font-semibold">
                      Learn → Practice → Progress
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="border-t border-black/[0.05] bg-white/60">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
          <div className="max-w-[720px]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-black/40">
              The TutorsQue journey
            </p>

            <h2 className="mt-3 text-[40px] font-semibold leading-[1.03] tracking-[-0.06em] sm:text-[54px]">
              Six simple steps.
              <span className="block">One clear learning path.</span>
            </h2>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {steps.map((step, index) => (
              <motion.article
                key={step.number}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.05,
                }}
                className="tq-hover tq-glass rounded-[29px] p-5"
              >
                <div className="rounded-[23px] bg-white/45 p-5">
                  <div className="flex items-start justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-[15px] bg-black text-xs font-semibold text-white">
                      {step.number}
                    </span>

                    <span className="text-[30px] font-semibold tracking-[-0.06em] text-black/10">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="mt-7 text-[23px] font-semibold tracking-[-0.04em]">
                    {step.title}
                  </h3>

                  <p className="mt-3 min-h-[72px] text-sm leading-6 text-black/50">
                    {step.description}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Why TutorsQue */}
      <section>
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">
            <div className="max-w-[520px]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-black/40">
                Why TutorsQue
              </p>

              <h2 className="mt-3 text-[40px] font-semibold leading-[1.02] tracking-[-0.06em] sm:text-[54px]">
                Tuition should feel
                <span className="block">simple and clear.</span>
              </h2>

              <p className="mt-6 text-[16px] leading-7 text-black/50">
                The goal is not just to add another online class. TutorsQue is
                designed to make the complete learning journey easier for
                students, parents and teachers.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.45,
                    delay: index * 0.06,
                  }}
                  className="tq-hover tq-glass rounded-[26px] p-5"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-[#42d4bc]/20 text-[#159b87]">
                    <CheckIcon />
                  </div>

                  <h3 className="mt-6 text-[20px] font-semibold tracking-[-0.035em]">
                    {benefit.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-black/50">
                    {benefit.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Parents / students */}
      <section className="px-5 pb-20 sm:px-8 lg:px-12 lg:pb-28">
        <div className="mx-auto max-w-[1440px]">
          <div className="relative overflow-hidden rounded-[36px] bg-black px-6 py-12 text-white sm:px-10 lg:px-14 lg:py-16">
            <div className="absolute right-[-100px] top-[-120px] h-80 w-80 rounded-full bg-[#42d4bc]/20 blur-3xl" />
            <div className="absolute bottom-[-150px] left-[30%] h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />

            <div className="relative grid gap-10 lg:grid-cols-[1fr_0.7fr] lg:items-end">
              <div className="max-w-[800px]">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#42d4bc]">
                  Ready to begin?
                </p>

                <h2 className="mt-4 text-[40px] font-semibold leading-[1.02] tracking-[-0.055em] sm:text-[56px]">
                  Find the teacher
                  <span className="block">who fits your journey.</span>
                </h2>

                <p className="mt-5 max-w-[650px] text-[16px] leading-7 text-white/50">
                  Start with your class and subject. TutorsQue helps you move
                  from discovery to learning without unnecessary complexity.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/find-tutors"
                    className="inline-flex h-13 items-center justify-center gap-3 rounded-[15px] bg-[#42d4bc] px-6 text-sm font-semibold text-black transition hover:-translate-y-0.5"
                  >
                    Find a tutor
                    <ArrowIcon />
                  </Link>

                  <Link
                    href="/signup"
                    className="inline-flex h-13 items-center justify-center rounded-[15px] border border-white/15 bg-white/[0.06] px-6 text-sm font-semibold text-white transition hover:bg-white/10"
                  >
                    Create account
                  </Link>
                </div>
              </div>

              <div className="tq-glass rounded-[25px] border-white/10 bg-white/[0.06] p-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/35">
                  TutorsQue in one line
                </p>

                <p className="mt-4 text-[22px] font-semibold leading-tight tracking-[-0.04em]">
                  Choose.
                  <br />
                  Learn.
                  <br />
                  Practice.
                  <br />
                  Progress.
                </p>

                <div className="mt-5 h-px bg-white/10" />

                <p className="mt-4 text-xs leading-5 text-white/40">
                  A complete online tuition experience for Classes 1–10.
                </p>
              </div>
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