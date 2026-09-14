"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const boards = ["AP State Board", "CBSE"];

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

const mediums = ["English", "Telugu"];

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
        d="M5 12.5L9.2 16.5L19 7"
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

export default function ClassSelectionPage() {
  const router = useRouter();

  const [board, setBoard] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [medium, setMedium] = useState("");

  const canContinue = Boolean(board && studentClass && medium);

  function handleContinue() {
    if (!canContinue) return;

    const params = new URLSearchParams({
      board,
      class: studentClass,
      medium,
    });

    router.push(`/student/subjects?${params.toString()}`);
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#f4f8f7] text-[#111111]">
      {/* Background atmosphere */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 25, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-[-150px] top-[90px] h-[430px] w-[430px] rounded-full bg-[#42d4bc]/12 blur-[110px]"
        />

        <motion.div
          animate={{
            x: [0, -25, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute right-[-150px] top-[240px] h-[420px] w-[420px] rounded-full bg-cyan-200/20 blur-[110px]"
        />

        <div className="absolute bottom-[-180px] left-[30%] h-[430px] w-[430px] rounded-full bg-emerald-100/25 blur-[120px]" />
      </div>

      {/* Header */}
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

          <div className="hidden items-center gap-3 sm:flex">
            <div className="rounded-full border border-black/5 bg-white/55 px-4 py-2 text-xs font-semibold text-black/45 backdrop-blur-xl">
              Step 1 of 5
            </div>
          </div>
        </div>
      </header>

      {/* Progress */}
      <div className="border-b border-black/[0.05] bg-white/45">
        <div className="mx-auto max-w-[1440px] px-5 py-4 sm:px-8 lg:px-12">
          <div className="flex items-center gap-2">
            <div className="h-1.5 flex-1 rounded-full bg-[#42d4bc]" />
            <div className="h-1.5 flex-1 rounded-full bg-black/8" />
            <div className="h-1.5 flex-1 rounded-full bg-black/8" />
            <div className="h-1.5 flex-1 rounded-full bg-black/8" />
            <div className="h-1.5 flex-1 rounded-full bg-black/8" />
          </div>
        </div>
      </div>

      {/* Main */}
      <section>
        <div className="mx-auto max-w-[1200px] px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
            {/* Intro panel */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="lg:sticky lg:top-[110px]"
            >
              <div className="tq-depth relative overflow-hidden rounded-[34px] bg-black p-7 text-white sm:p-9">
                <div className="absolute right-[-90px] top-[-80px] h-64 w-64 rounded-full bg-[#42d4bc]/20 blur-3xl" />
                <div className="absolute bottom-[-100px] left-[20%] h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl" />

                <div className="relative">
                  <div className="flex h-14 w-14 items-center justify-center rounded-[18px] bg-[#42d4bc]/15 text-[#42d4bc]">
                    <BookIcon />
                  </div>

                  <p className="mt-8 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/35">
                    Your learning journey
                  </p>

                  <h1 className="mt-4 text-[42px] font-semibold leading-[1.02] tracking-[-0.065em] sm:text-[52px]">
                    Let&apos;s start with
                    <span className="block text-[#42d4bc]">
                      the basics.
                    </span>
                  </h1>

                  <p className="mt-5 text-sm leading-6 text-white/45">
                    Tell us which curriculum and class the student belongs to.
                    We&apos;ll use this to show the right subjects and tutors.
                  </p>

                  <div className="mt-8 space-y-3">
                    {[
                      "Choose your board",
                      "Select your class",
                      "Choose your medium",
                      "Discover matching subjects",
                    ].map((item, index) => (
                      <div
                        key={item}
                        className="flex items-center gap-3 rounded-[16px] border border-white/8 bg-white/[0.05] px-4 py-3.5"
                      >
                        <span
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                            index === 0
                              ? "bg-[#42d4bc] text-black"
                              : "bg-white/[0.08] text-white/50"
                          }`}
                        >
                          {index === 0 ? <CheckIcon /> : index + 1}
                        </span>

                        <span className="text-sm text-white/65">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 rounded-[21px] border border-white/10 bg-white/[0.06] p-5">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/30">
                      Why we ask
                    </p>

                    <p className="mt-3 text-xs leading-5 text-white/40">
                      TutorsQue matches students to teachers based on the
                      actual board, class, subject and learning path.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Selection panel */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.05 }}
              className="tq-glass rounded-[34px] p-5 sm:p-8 lg:p-10"
            >
              <div className="border-b border-black/[0.06] pb-7">
                <p className="text-[11px] font-semibold uppercase tracking-[0.17em] text-black/40">
                  Step 1
                </p>

                <h2 className="mt-3 text-[36px] font-semibold tracking-[-0.055em] sm:text-[46px]">
                  Tell us about the student.
                </h2>

                <p className="mt-3 max-w-[620px] text-sm leading-6 text-black/50">
                  Select the curriculum, class and medium. These choices shape
                  the tutors and subjects we show next.
                </p>
              </div>

              {/* Board */}
              <div className="mt-8">
                <div className="mb-4">
                  <p className="text-sm font-semibold">1. Select board</p>
                  <p className="mt-1 text-xs text-black/40">
                    Choose the student&apos;s current curriculum.
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {boards.map((item) => {
                    const active = board === item;

                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setBoard(item)}
                        className={`rounded-[20px] border p-5 text-left transition ${
                          active
                            ? "border-[#42d4bc] bg-[#42d4bc]/12 shadow-[0_12px_30px_rgba(66,212,188,0.12)]"
                            : "border-black/8 bg-white/45 hover:border-black/15 hover:bg-white"
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div
                            className={`flex h-11 w-11 items-center justify-center rounded-[14px] text-sm font-bold ${
                              active
                                ? "bg-[#42d4bc] text-black"
                                : "bg-black text-white"
                            }`}
                          >
                            {item === "CBSE" ? "C" : "AP"}
                          </div>

                          {active && (
                            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#42d4bc] text-black">
                              <CheckIcon />
                            </span>
                          )}
                        </div>

                        <p className="mt-6 text-[17px] font-semibold">
                          {item}
                        </p>

                        <p className="mt-1 text-xs text-black/40">
                          Classes 1–10
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Class */}
              <div className="mt-9 border-t border-black/[0.06] pt-8">
                <div className="mb-4">
                  <p className="text-sm font-semibold">2. Select class</p>
                  <p className="mt-1 text-xs text-black/40">
                    Pick the student&apos;s current class.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-5">
                  {classes.map((item) => {
                    const active = studentClass === item;

                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setStudentClass(item)}
                        className={`rounded-[16px] border px-3 py-4 text-center transition ${
                          active
                            ? "border-[#42d4bc] bg-[#42d4bc]/15 text-[#138c79]"
                            : "border-black/8 bg-white/45 text-black/60 hover:border-black/15 hover:bg-white"
                        }`}
                      >
                        <span className="block text-xs font-medium text-black/35">
                          Class
                        </span>

                        <span className="mt-1 block text-sm font-semibold">
                          {item.replace(" Class", "")}
                        </span>

                        {active && (
                          <span className="mx-auto mt-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#42d4bc] text-black">
                            <CheckIcon />
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Medium */}
              <div className="mt-9 border-t border-black/[0.06] pt-8">
                <div className="mb-4">
                  <p className="text-sm font-semibold">3. Select medium</p>
                  <p className="mt-1 text-xs text-black/40">
                    Choose the language used for learning.
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {mediums.map((item) => {
                    const active = medium === item;

                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setMedium(item)}
                        className={`flex items-center justify-between rounded-[18px] border px-5 py-4 text-left transition ${
                          active
                            ? "border-[#42d4bc] bg-[#42d4bc]/12"
                            : "border-black/8 bg-white/45 hover:border-black/15 hover:bg-white"
                        }`}
                      >
                        <div>
                          <p className="text-sm font-semibold">{item}</p>

                          <p className="mt-1 text-xs text-black/40">
                            {item === "English"
                              ? "English-medium learning"
                              : "Telugu-medium learning"}
                          </p>
                        </div>

                        <span
                          className={`flex h-8 w-8 items-center justify-center rounded-full ${
                            active
                              ? "bg-[#42d4bc] text-black"
                              : "bg-black/5 text-transparent"
                          }`}
                        >
                          {active ? <CheckIcon /> : "✓"}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Summary */}
              <div className="mt-9 border-t border-black/[0.06] pt-8">
                <div className="rounded-[22px] border border-black/[0.06] bg-white/50 p-5">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-black/35">
                      Your selection
                    </p>

                    {canContinue && (
                      <span className="rounded-full bg-[#42d4bc]/15 px-3 py-1 text-[10px] font-semibold text-[#138c79]">
                        Ready
                      </span>
                    )}
                  </div>

                  <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.1em] text-black/30">
                        Board
                      </p>

                      <p className="mt-1 text-sm font-semibold">
                        {board || "Not selected"}
                      </p>
                    </div>

                    <div>
                      <p className="text-[10px] uppercase tracking-[0.1em] text-black/30">
                        Class
                      </p>

                      <p className="mt-1 text-sm font-semibold">
                        {studentClass || "Not selected"}
                      </p>
                    </div>

                    <div>
                      <p className="text-[10px] uppercase tracking-[0.1em] text-black/30">
                        Medium
                      </p>

                      <p className="mt-1 text-sm font-semibold">
                        {medium || "Not selected"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Continue */}
              <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
                <Link
                  href="/signup"
                  className="inline-flex h-13 items-center justify-center rounded-[15px] border border-black/10 bg-white/50 px-6 text-sm font-semibold transition hover:bg-white"
                >
                  Back
                </Link>

                <button
                  type="button"
                  onClick={handleContinue}
                  disabled={!canContinue}
                  className={`inline-flex h-13 flex-1 items-center justify-center gap-3 rounded-[15px] px-6 text-sm font-semibold transition sm:flex-none ${
                    canContinue
                      ? "bg-black text-white hover:-translate-y-0.5"
                      : "cursor-not-allowed bg-black/10 text-black/30"
                  }`}
                >
                  Continue to subjects
                  <ArrowIcon />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <footer className="border-t border-black/[0.06] px-5 py-8 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-4 text-sm text-black/40 sm:flex-row">
          <p>© {new Date().getFullYear()} TutorsQue</p>
          <p>Step 1 · Learning setup</p>
        </div>
      </footer>
    </main>
  );
}