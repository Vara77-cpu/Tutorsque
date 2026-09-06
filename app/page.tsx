"use client";

import { useState } from "react";

const navItems = [
  { label: "Find tutors", href: "#find-tutors" },
  { label: "Classes", href: "#classes" },
  { label: "Subjects", href: "#subjects" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Become a tutor", href: "#become-a-tutor" },
];

const classes = [
  "1st Class",
  "2nd Class",
  "3rd Class",
  "4th Class",
  "5th Class",
  "6th Class",
  "7th Class",
  "8th Class",
  "9th Class",
  "10th Class",
];

const subjects = [
  "Mathematics",
  "Science",
  "English",
  "Telugu",
  "Hindi",
  "Social Studies",
];

function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
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

function ChevronDownIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M6 9L12 15L18 9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M4 7H20M4 12H20M4 17H20"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M6 6L18 18M18 6L6 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#fbfbfa] text-[#111111]">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-black/[0.07] bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
          {/* Logo */}
          <a
            href="#"
            className="group flex items-center gap-2"
            aria-label="TutorsQue home"
          >
            <div className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-[10px] bg-black">
              <div className="absolute left-[7px] top-[8px] h-[18px] w-[18px] rounded-[5px] border-[2px] border-white" />
              <div className="absolute left-[12px] top-[13px] h-[7px] w-[7px] rounded-full bg-[#44d7bd]" />
            </div>

            <span className="text-[25px] font-semibold tracking-[-0.055em]">
              Tutors<span className="text-[#37cdb3]">Que</span>
            </span>
          </a>

          {/* Desktop navigation */}
          <nav className="hidden items-center gap-7 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-[15px] font-medium tracking-[-0.01em] text-black/85 transition-colors hover:text-[#28b9a1]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Desktop actions */}
          <div className="hidden items-center gap-3 lg:flex">
            <button
              type="button"
              className="rounded-full px-4 py-2.5 text-[14px] font-medium text-black/80 transition hover:bg-black/[0.04]"
            >
              English, INR
              <ChevronDownIcon className="ml-1.5 inline-block align-middle" />
            </button>

            <a
              href="/login"
              className="rounded-full border border-black px-5 py-2.5 text-[14px] font-semibold transition hover:bg-black hover:text-white"
            >
              Log in
            </a>

            <a
              href="#find-tutors"
              className="rounded-full bg-[#42d4bc] px-5 py-2.5 text-[14px] font-semibold text-black transition hover:bg-[#34c7af]"
            >
              Get started
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((current) => !current)}
            className="rounded-xl border border-black/10 p-2.5 lg:hidden"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="border-t border-black/[0.07] bg-white px-5 pb-6 pt-4 lg:hidden">
            <nav className="flex flex-col">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="border-b border-black/[0.06] py-4 text-[16px] font-medium"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <a
                href="/login"
                className="flex items-center justify-center rounded-full border border-black px-5 py-3 text-sm font-semibold"
              >
                Log in
              </a>

              <a
                href="#find-tutors"
                className="flex items-center justify-center rounded-full bg-[#42d4bc] px-5 py-3 text-sm font-semibold"
              >
                Get started
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="overflow-hidden bg-white">
        <div className="mx-auto grid max-w-[1440px] gap-10 px-5 pb-16 pt-16 sm:px-8 sm:pt-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-12 lg:pb-20 lg:pt-24">
          {/* Hero content */}
          <div className="max-w-[730px]">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-black/10 bg-[#f5fffc] px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-black/70">
              <span className="h-2 w-2 rounded-full bg-[#42d4bc]" />
              Live online tuition for Classes 1–10
            </div>

            <h1 className="max-w-[760px] text-[52px] font-semibold leading-[0.99] tracking-[-0.065em] sm:text-[66px] lg:text-[76px]">
              Learn from teachers
              <span className="block">you can trust.</span>
            </h1>

            <p className="mt-7 max-w-[620px] text-[18px] leading-8 tracking-[-0.015em] text-black/60 sm:text-[20px]">
              Live online tuition for students from 1st to 10th class, built
              around the Andhra Pradesh State Board and CBSE syllabus.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="#find-tutors"
                className="inline-flex h-14 items-center justify-center gap-3 rounded-[15px] bg-[#111111] px-7 text-[15px] font-semibold text-white transition hover:-translate-y-0.5"
              >
                Find your tutor
                <ArrowIcon />
              </a>

              <a
                href="#become-a-tutor"
                className="inline-flex h-14 items-center justify-center rounded-[15px] border border-black/15 bg-white px-7 text-[15px] font-semibold transition hover:border-black/30 hover:bg-black/[0.02]"
              >
                Become a tutor
              </a>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-[13px] font-medium text-black/50">
              <span>✓ Verified teachers</span>
              <span>✓ Live classes</span>
              <span>✓ Board-specific learning</span>
              <span>✓ Weekly progress</span>
            </div>
          </div>

          {/* Hero visual */}
          <div className="relative mx-auto w-full max-w-[590px]">
            <div className="absolute -right-5 top-8 hidden h-48 w-48 rounded-full bg-[#dffbf5] blur-2xl sm:block" />
            <div className="absolute -bottom-7 left-2 hidden h-40 w-40 rounded-full bg-[#f3e6d9] blur-2xl sm:block" />

            <div className="relative overflow-hidden rounded-[30px] bg-[#f0f0ee] p-3 shadow-[0_25px_80px_rgba(0,0,0,0.10)]">
              <div
                className="min-h-[500px] rounded-[23px] bg-cover bg-center"
                style={{
                  backgroundImage:
                    "linear-gradient(180deg, rgba(0,0,0,0.03), rgba(0,0,0,0.08)), url('https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=1200&q=85')",
                }}
              >
                <div className="flex min-h-[500px] items-end bg-gradient-to-t from-black/55 via-transparent to-transparent p-5 sm:p-7">
                  <div className="max-w-[360px] rounded-[20px] border border-white/30 bg-white/90 p-5 backdrop-blur-xl">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.13em] text-black/45">
                      TutorsQue Live
                    </p>

                    <p className="mt-2 text-[23px] font-semibold leading-tight tracking-[-0.04em]">
                      The right teacher can change everything.
                    </p>

                    <p className="mt-2 text-sm leading-6 text-black/55">
                      Structured live learning with real teachers and a clear
                      path from lesson to progress.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating card */}
            <div className="absolute -left-3 top-12 hidden rounded-[18px] border border-black/10 bg-white p-4 shadow-xl sm:block">
              <div className="text-[11px] font-semibold uppercase tracking-[0.13em] text-black/40">
                Today
              </div>
              <div className="mt-1 text-[17px] font-semibold">
                10th Maths
              </div>
              <div className="mt-1 text-xs text-black/50">
                6:00 PM · Live class
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Intro ticker */}
      <section className="border-y border-black/[0.06] bg-[#aeeadd]">
        <div className="mx-auto flex max-w-[1440px] items-center justify-center px-5 py-5 text-center sm:px-8 lg:px-12">
          <p className="text-[14px] font-medium leading-6 text-black/85 sm:text-[15px]">
            <span className="font-bold">One platform.</span> Teachers,
            students, parents, live classes, tests and progress — all in one
            place.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="bg-white">
        <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
          <div className="max-w-[680px]">
            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-black/40">
              How TutorsQue works
            </p>

            <h2 className="mt-4 text-[40px] font-semibold leading-[1.04] tracking-[-0.055em] sm:text-[54px]">
              A simple path from
              <span className="block">joining to progress.</span>
            </h2>
          </div>

          <div className="mt-14 grid gap-10 lg:grid-cols-3 lg:gap-7">
            {[
              {
                number: "01",
                title: "Choose your learning path",
                description:
                  "Select your board, class, medium and the subjects your child wants to learn.",
              },
              {
                number: "02",
                title: "Learn with the right teacher",
                description:
                  "Get connected with qualified teachers who match the subject and syllabus.",
              },
              {
                number: "03",
                title: "Track real progress",
                description:
                  "Attend live classes, complete homework, take tests and follow progress every week.",
              },
            ].map((item) => (
              <div
                key={item.number}
                className="border-t border-black/15 pt-5 transition hover:-translate-y-1"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-black text-sm font-semibold text-white">
                  {item.number}
                </div>

                <h3 className="mt-7 text-[24px] font-semibold tracking-[-0.035em]">
                  {item.title}
                </h3>

                <p className="mt-3 max-w-[360px] text-[15px] leading-7 text-black/55">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Find tutor */}
      <section id="find-tutors" className="bg-[#f3f3f1]">
        <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div className="max-w-[700px]">
              <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-black/40">
                Find your learning path
              </p>

              <h2 className="mt-4 text-[40px] font-semibold leading-[1.05] tracking-[-0.055em] sm:text-[54px]">
                Start with the class
                <span className="block">you need help with.</span>
              </h2>
            </div>

            <a
              href="#classes"
              className="inline-flex items-center gap-2 text-sm font-semibold"
            >
              Explore all classes
              <ArrowIcon />
            </a>
          </div>

          <div
            id="classes"
            className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5"
          >
            {classes.map((className, index) => (
              <a
                href="#subjects"
                key={className}
                className="group rounded-[18px] border border-black/10 bg-white p-5 transition duration-300 hover:-translate-y-1 hover:border-black/20 hover:shadow-[0_16px_35px_rgba(0,0,0,0.07)]"
              >
                <div className="text-xs font-semibold uppercase tracking-[0.12em] text-black/35">
                  0{Math.min(index + 1, 9)}
                  {index >= 9 ? "" : ""}
                </div>

                <div className="mt-8 flex items-center justify-between">
                  <span className="text-[17px] font-semibold tracking-[-0.02em]">
                    {className}
                  </span>

                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#eefcf8] text-black transition group-hover:bg-[#42d4bc]">
                    <ArrowIcon className="h-4 w-4" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Subjects */}
      <section id="subjects" className="bg-white">
        <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-black/40">
                Core subjects
              </p>

              <h2 className="mt-4 max-w-[560px] text-[40px] font-semibold leading-[1.05] tracking-[-0.055em] sm:text-[54px]">
                Learn the subjects
                <span className="block">that matter most.</span>
              </h2>

              <p className="mt-6 max-w-[530px] text-[16px] leading-7 text-black/55">
                TutorsQue organizes tuition around the student&apos;s actual
                board, class, medium and curriculum.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {subjects.map((subject, index) => (
                <div
                  key={subject}
                  className="flex min-h-[150px] flex-col justify-between rounded-[22px] border border-black/10 bg-[#fafaf8] p-6 transition hover:border-black/20 hover:bg-white hover:shadow-[0_16px_35px_rgba(0,0,0,0.05)]"
                >
                  <div className="flex items-start justify-between">
                    <span className="text-xs font-semibold uppercase tracking-[0.12em] text-black/35">
                      0{index + 1}
                    </span>

                    <span className="h-3 w-3 rounded-full bg-[#42d4bc]" />
                  </div>

                  <div className="text-[23px] font-semibold tracking-[-0.04em]">
                    {subject}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Board section */}
      <section className="bg-black text-white">
        <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-white/40">
                Curriculum-first learning
              </p>

              <h2 className="mt-4 text-[40px] font-semibold leading-[1.03] tracking-[-0.055em] sm:text-[56px]">
                Built for
                <span className="block text-[#42d4bc]">your syllabus.</span>
              </h2>

              <p className="mt-6 max-w-[520px] text-[16px] leading-7 text-white/55">
                Start with the Andhra Pradesh State Board or CBSE. TutorsQue
                keeps the teaching path aligned with the student&apos;s actual
                curriculum.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[24px] border border-white/10 bg-white/[0.05] p-7">
                <div className="text-xs font-semibold uppercase tracking-[0.14em] text-white/40">
                  State Board
                </div>

                <h3 className="mt-8 text-[28px] font-semibold tracking-[-0.04em]">
                  Andhra Pradesh
                </h3>

                <p className="mt-3 text-sm leading-6 text-white/50">
                  Classes 1–10 with relevant mediums and subjects.
                </p>
              </div>

              <div className="rounded-[24px] border border-white/10 bg-white/[0.05] p-7">
                <div className="text-xs font-semibold uppercase tracking-[0.14em] text-white/40">
                  National Board
                </div>

                <h3 className="mt-8 text-[28px] font-semibold tracking-[-0.04em]">
                  CBSE
                </h3>

                <p className="mt-3 text-sm leading-6 text-white/50">
                  Classes 1–10 with structured subject-based learning.
                </p>
              </div>

              <div className="rounded-[24px] border border-white/10 bg-[#42d4bc] p-7 text-black sm:col-span-2">
                <div className="text-xs font-semibold uppercase tracking-[0.14em] text-black/50">
                  Coming through the platform
                </div>

                <div className="mt-6 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                  <h3 className="max-w-[560px] text-[28px] font-semibold leading-tight tracking-[-0.04em]">
                    Lesson plans, assignments, tests and progress — connected
                    to every learning journey.
                  </h3>

                  <ArrowIcon className="h-7 w-7 shrink-0" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Become a tutor */}
      <section id="become-a-tutor" className="bg-white">
        <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
          <div className="overflow-hidden rounded-[30px] bg-[#eefbf8]">
            <div className="grid gap-10 p-7 sm:p-10 lg:grid-cols-[1fr_0.85fr] lg:items-center lg:p-14">
              <div>
                <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-black/40">
                  For teachers
                </p>

                <h2 className="mt-4 max-w-[700px] text-[40px] font-semibold leading-[1.03] tracking-[-0.055em] sm:text-[56px]">
                  Teach after school.
                  <span className="block">Earn every week.</span>
                </h2>

                <p className="mt-6 max-w-[570px] text-[16px] leading-7 text-black/55">
                  Join the TutorsQue teacher network, choose your availability,
                  take online classes and get paid for completed sessions.
                </p>

                <div className="mt-8">
                  <a
                    href="/become-a-tutor"
                    className="inline-flex h-14 items-center justify-center gap-3 rounded-[15px] bg-black px-7 text-[15px] font-semibold text-white transition hover:-translate-y-0.5"
                  >
                    Become a tutor
                    <ArrowIcon />
                  </a>
                </div>
              </div>

              <div className="grid gap-3">
                {[
                  "Create your teacher profile",
                  "Get verified by TutorsQue",
                  "Choose your classes & subjects",
                  "Teach online and earn weekly",
                ].map((step, index) => (
                  <div
                    key={step}
                    className="flex items-center gap-4 rounded-[18px] border border-black/10 bg-white p-4"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black text-sm font-semibold text-white">
                      {index + 1}
                    </div>

                    <span className="text-[15px] font-semibold">
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-black/[0.07] bg-white">
        <div className="mx-auto max-w-[1440px] px-5 py-20 text-center sm:px-8 lg:px-12 lg:py-28">
          <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-black/40">
            TutorsQue
          </p>

          <h2 className="mx-auto mt-5 max-w-[820px] text-[43px] font-semibold leading-[1.03] tracking-[-0.06em] sm:text-[64px]">
            Better teachers.
            <span className="block">Better learning.</span>
          </h2>

          <p className="mx-auto mt-6 max-w-[560px] text-[16px] leading-7 text-black/55">
            Give your child a structured way to learn online with trusted
            teachers and a curriculum built around them.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href="#find-tutors"
              className="inline-flex h-14 items-center justify-center gap-3 rounded-[15px] bg-black px-7 text-[15px] font-semibold text-white"
            >
              Find your tutor
              <ArrowIcon />
            </a>

            <a
              href="/login"
              className="inline-flex h-14 items-center justify-center rounded-[15px] border border-black/15 px-7 text-[15px] font-semibold"
            >
              Log in
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white">
        <div className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 lg:px-12">
          <div className="grid gap-10 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
            <div>
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-[9px] bg-white text-black">
                  <span className="text-sm font-bold">T</span>
                </div>

                <span className="text-[23px] font-semibold tracking-[-0.05em]">
                  Tutors<span className="text-[#42d4bc]">Que</span>
                </span>
              </div>

              <p className="mt-5 max-w-[320px] text-sm leading-6 text-white/45">
                Live online tuition for Classes 1–10 with trusted teachers and
                structured learning.
              </p>
            </div>

            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.13em] text-white/35">
                Learn
              </div>

              <div className="mt-4 flex flex-col gap-3 text-sm text-white/65">
                <a href="#classes" className="transition hover:text-white">
                  Classes
                </a>
                <a href="#subjects" className="transition hover:text-white">
                  Subjects
                </a>
                <a href="#find-tutors" className="transition hover:text-white">
                  Find tutors
                </a>
              </div>
            </div>

            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.13em] text-white/35">
                Teachers
              </div>

              <div className="mt-4 flex flex-col gap-3 text-sm text-white/65">
                <a
                  href="/become-a-tutor"
                  className="transition hover:text-white"
                >
                  Become a tutor
                </a>
                <a
                  href="/teacher-login"
                  className="transition hover:text-white"
                >
                  Teacher login
                </a>
              </div>
            </div>

            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.13em] text-white/35">
                Company
              </div>

              <div className="mt-4 flex flex-col gap-3 text-sm text-white/65">
                <a href="/about" className="transition hover:text-white">
                  About
                </a>
                <a href="/contact" className="transition hover:text-white">
                  Contact
                </a>
                <a href="/privacy" className="transition hover:text-white">
                  Privacy
                </a>
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-col justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/35 sm:flex-row">
            <p>© 2026 TutorsQue. All rights reserved.</p>
            <p>Built for the future of learning.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}