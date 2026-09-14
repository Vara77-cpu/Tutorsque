"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

type Subject = {
  name: string;
  short: string;
  description: string;
  category: string;
  accent: string;
};

const subject = (
  name: string,
  short: string,
  description: string,
  category: string,
  accent: string,
): Subject => ({
  name,
  short,
  description,
  category,
  accent,
});

/*
 * TutorsQue curriculum structure
 *
 * AP State Board
 * ---------------
 * Classes 1–5:
 *   Telugu, English, Mathematics, EVS
 *
 * Classes 6–8:
 *   Telugu, English, Hindi,
 *   Mathematics, General Science, Social Studies
 *
 * Classes 9–10:
 *   Telugu, English, Hindi,
 *   Mathematics, Physical Science,
 *   Biological Science, Social Studies
 *
 * CBSE
 * ----
 * Classes 1–5:
 *   English, Hindi/Regional Language,
 *   Mathematics, EVS
 *
 * Classes 6–8:
 *   English, Hindi/Regional Language,
 *   Mathematics, Science, Social Science
 *   + applicable additional language choices
 *
 * Classes 9–10:
 *   Two Languages,
 *   Mathematics, Science, Social Science
 */

const apPrimarySubjects: Subject[] = [
  subject(
    "Telugu",
    "తె",
    "Reading, writing, grammar and foundational Telugu language skills.",
    "Language",
    "from-orange-200 to-amber-200",
  ),
  subject(
    "English",
    "E",
    "Reading, writing, grammar, vocabulary and communication.",
    "Language",
    "from-violet-300 to-sky-200",
  ),
  subject(
    "Mathematics",
    "M",
    "Numbers, operations, shapes, patterns and foundational problem solving.",
    "Core",
    "from-cyan-300 to-emerald-300",
  ),
  subject(
    "EVS",
    "EVS",
    "Environment, people, nature and everyday life.",
    "Environmental Studies",
    "from-emerald-200 to-lime-200",
  ),
];

const apMiddleSubjects: Subject[] = [
  subject(
    "Telugu",
    "తె",
    "Language, grammar, reading, writing and literature.",
    "Language",
    "from-orange-200 to-amber-200",
  ),
  subject(
    "English",
    "E",
    "Grammar, reading, writing, literature and communication.",
    "Language",
    "from-violet-300 to-sky-200",
  ),
  subject(
    "Hindi",
    "हि",
    "Hindi language, reading, writing and grammar.",
    "Language",
    "from-rose-200 to-orange-200",
  ),
  subject(
    "Mathematics",
    "M",
    "Arithmetic, algebra, geometry and mathematical reasoning.",
    "Core",
    "from-cyan-300 to-emerald-300",
  ),
  subject(
    "General Science",
    "GS",
    "Scientific concepts, observation, experiments and applications.",
    "Science",
    "from-sky-300 to-cyan-200",
  ),
  subject(
    "Social Studies",
    "SS",
    "History, geography, society and civics-oriented learning.",
    "Social Studies",
    "from-indigo-300 to-sky-200",
  ),
];

const apSecondarySubjects: Subject[] = [
  subject(
    "Telugu",
    "తె",
    "Advanced language, grammar, literature, reading and composition.",
    "Language",
    "from-orange-200 to-amber-200",
  ),
  subject(
    "English",
    "E",
    "Language, literature, grammar, comprehension and writing.",
    "Language",
    "from-violet-300 to-sky-200",
  ),
  subject(
    "Hindi",
    "हि",
    "Hindi language, grammar, literature and comprehension.",
    "Language",
    "from-rose-200 to-orange-200",
  ),
  subject(
    "Mathematics",
    "M",
    "Algebra, geometry, arithmetic and advanced problem solving.",
    "Core",
    "from-cyan-300 to-emerald-300",
  ),
  subject(
    "Physical Science",
    "PS",
    "Physics and chemistry-oriented concepts and applications.",
    "Science",
    "from-sky-300 to-cyan-200",
  ),
  subject(
    "Biological Science",
    "BS",
    "Biology, living systems, health and biological concepts.",
    "Science",
    "from-emerald-200 to-teal-200",
  ),
  subject(
    "Social Studies",
    "SS",
    "History, geography, civics, society and economics-oriented learning.",
    "Social Studies",
    "from-indigo-300 to-sky-200",
  ),
];

const cbsePrimarySubjects: Subject[] = [
  subject(
    "English",
    "E",
    "Reading, writing, grammar and communication.",
    "Language",
    "from-violet-300 to-sky-200",
  ),
  subject(
    "Hindi / Regional Language",
    "हि",
    "Hindi or applicable regional-language learning.",
    "Language",
    "from-rose-200 to-orange-200",
  ),
  subject(
    "Mathematics",
    "M",
    "Numeracy, patterns, shapes and mathematical thinking.",
    "Core",
    "from-cyan-300 to-emerald-300",
  ),
  subject(
    "EVS",
    "EVS",
    "Environment, surroundings, people, places and everyday learning.",
    "Environmental Studies",
    "from-emerald-200 to-lime-200",
  ),
];

const cbseMiddleSubjects: Subject[] = [
  subject(
    "English",
    "E",
    "Language, literature, grammar and communication.",
    "Language",
    "from-violet-300 to-sky-200",
  ),
  subject(
    "Hindi / Regional Language",
    "हि",
    "Hindi or applicable regional-language learning.",
    "Language",
    "from-rose-200 to-orange-200",
  ),
  subject(
    "Mathematics",
    "M",
    "Arithmetic, algebra, geometry and mathematical reasoning.",
    "Core",
    "from-cyan-300 to-emerald-300",
  ),
  subject(
    "Science",
    "S",
    "Integrated science concepts across physical and life sciences.",
    "Science",
    "from-sky-300 to-cyan-200",
  ),
  subject(
    "Social Science",
    "SS",
    "History, geography, civics and social understanding.",
    "Social Science",
    "from-indigo-300 to-sky-200",
  ),
  subject(
    "Third Language",
    "3L",
    "Applicable third-language learning based on the student's school.",
    "Language",
    "from-amber-200 to-yellow-200",
  ),
];

const cbseSecondarySubjects: Subject[] = [
  subject(
    "Language 1",
    "L1",
    "First language selected by the student under the CBSE language structure.",
    "Language",
    "from-violet-300 to-sky-200",
  ),
  subject(
    "Language 2",
    "L2",
    "Second language selected by the student under the CBSE language structure.",
    "Language",
    "from-rose-200 to-orange-200",
  ),
  subject(
    "Mathematics",
    "M",
    "Mathematics with the applicable Standard or Basic pathway.",
    "Core",
    "from-cyan-300 to-emerald-300",
  ),
  subject(
    "Science",
    "S",
    "Combined science covering physics, chemistry and biology.",
    "Science",
    "from-sky-300 to-cyan-200",
  ),
  subject(
    "Social Science",
    "SS",
    "History, geography, political science and economics-oriented learning.",
    "Social Science",
    "from-indigo-300 to-sky-200",
  ),
];

const allBoards = ["AP State Board", "CBSE"];

function getClassNumber(value: string): number {
  const match = value.match(/\d+/);
  return match ? Number(match[0]) : 0;
}

function getSubjects(board: string, className: string): Subject[] {
  const classNumber = getClassNumber(className);

  if (board === "AP State Board") {
    if (classNumber >= 1 && classNumber <= 5) {
      return apPrimarySubjects;
    }

    if (classNumber >= 6 && classNumber <= 8) {
      return apMiddleSubjects;
    }

    if (classNumber >= 9 && classNumber <= 10) {
      return apSecondarySubjects;
    }

    return [];
  }

  if (board === "CBSE") {
    if (classNumber >= 1 && classNumber <= 5) {
      return cbsePrimarySubjects;
    }

    if (classNumber >= 6 && classNumber <= 8) {
      return cbseMiddleSubjects;
    }

    if (classNumber >= 9 && classNumber <= 10) {
      return cbseSecondarySubjects;
    }

    return [];
  }

  return [];
}

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

export default function StudentSubjectsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const board = searchParams.get("board") || "";
  const studentClass = searchParams.get("class") || "";
  const medium = searchParams.get("medium") || "";

  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);

  const availableSubjects = useMemo(
    () => getSubjects(board, studentClass),
    [board, studentClass],
  );

  const canContinue = selectedSubjects.length > 0;

  function toggleSubject(subjectName: string) {
    setSelectedSubjects((current) =>
      current.includes(subjectName)
        ? current.filter((item) => item !== subjectName)
        : [...current, subjectName],
    );
  }

  function handleContinue() {
    if (!canContinue) return;

    const params = new URLSearchParams({
      board,
      class: studentClass,
      medium,
      subjects: selectedSubjects.join(","),
    });

    router.push(`/student/tutors?${params.toString()}`);
  }

  function handleBack() {
    router.push(
      `/student/class-selection?board=${encodeURIComponent(
        board,
      )}&class=${encodeURIComponent(
        studentClass,
      )}&medium=${encodeURIComponent(medium)}`,
    );
  }

  const levelLabel = (() => {
    const classNumber = getClassNumber(studentClass);

    if (classNumber >= 1 && classNumber <= 5) {
      return "Primary School";
    }

    if (classNumber >= 6 && classNumber <= 8) {
      return "Middle School";
    }

    if (classNumber >= 9 && classNumber <= 10) {
      return "High School";
    }

    return "School";
  })();

  return (
    <main className="min-h-screen overflow-hidden bg-[#f4f8f7] text-[#111111]">
      {/* Background */}
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

          <div className="rounded-full border border-black/5 bg-white/55 px-4 py-2 text-xs font-semibold text-black/45 backdrop-blur-xl">
            Step 2 of 5
          </div>
        </div>
      </header>

      {/* Progress */}
      <div className="border-b border-black/[0.05] bg-white/45">
        <div className="mx-auto max-w-[1440px] px-5 py-4 sm:px-8 lg:px-12">
          <div className="flex items-center gap-2">
            <div className="h-1.5 flex-1 rounded-full bg-[#42d4bc]" />
            <div className="h-1.5 flex-1 rounded-full bg-[#42d4bc]" />
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
            {/* Left panel */}
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
                    Step 2 · Subject selection
                  </p>

                  <h1 className="mt-4 text-[42px] font-semibold leading-[1.02] tracking-[-0.065em] sm:text-[52px]">
                    Build your
                    <span className="block text-[#42d4bc]">
                      learning path.
                    </span>
                  </h1>

                  <p className="mt-5 text-sm leading-6 text-white/45">
                    Select the subjects where the student needs tuition. The
                    subject list below is based on the selected board and class.
                  </p>

                  <div className="mt-8 space-y-3">
                    <div className="rounded-[17px] border border-white/8 bg-white/[0.05] p-4">
                      <p className="text-[10px] uppercase tracking-[0.13em] text-white/30">
                        Board
                      </p>

                      <p className="mt-1 text-sm font-semibold">
                        {board || "Not selected"}
                      </p>
                    </div>

                    <div className="rounded-[17px] border border-white/8 bg-white/[0.05] p-4">
                      <p className="text-[10px] uppercase tracking-[0.13em] text-white/30">
                        Level
                      </p>

                      <p className="mt-1 text-sm font-semibold">
                        {levelLabel}
                      </p>
                    </div>

                    <div className="rounded-[17px] border border-white/8 bg-white/[0.05] p-4">
                      <p className="text-[10px] uppercase tracking-[0.13em] text-white/30">
                        Class
                      </p>

                      <p className="mt-1 text-sm font-semibold">
                        {studentClass || "Not selected"}
                      </p>
                    </div>

                    <div className="rounded-[17px] border border-white/8 bg-white/[0.05] p-4">
                      <p className="text-[10px] uppercase tracking-[0.13em] text-white/30">
                        Medium
                      </p>

                      <p className="mt-1 text-sm font-semibold">
                        {medium || "Not selected"}
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 rounded-[21px] border border-white/10 bg-[#42d4bc]/10 p-5">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#42d4bc]">
                      Curriculum matched
                    </p>

                    <p className="mt-3 text-xs leading-5 text-white/45">
                      {board && studentClass
                        ? `${board} · ${studentClass} subjects are being shown.`
                        : "Choose your board and class first."}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Subject panel */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.05 }}
              className="tq-glass rounded-[34px] p-5 sm:p-8 lg:p-10"
            >
              <div className="border-b border-black/[0.06] pb-7">
                <p className="text-[11px] font-semibold uppercase tracking-[0.17em] text-black/40">
                  {board || "Board"} · {studentClass || "Class"}
                </p>

                <h2 className="mt-3 text-[36px] font-semibold tracking-[-0.055em] sm:text-[46px]">
                  Choose your subjects.
                </h2>

                <p className="mt-3 max-w-[650px] text-sm leading-6 text-black/50">
                  Select one or more subjects. These choices will be used to
                  find suitable tutors for the student.
                </p>
              </div>

              {/* Curriculum note */}
              <div className="mt-7 rounded-[20px] border border-[#42d4bc]/15 bg-[#42d4bc]/7 p-5">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#42d4bc]/15 text-[#159b87]">
                    <CheckIcon />
                  </div>

                  <div>
                    <p className="text-sm font-semibold">
                      {availableSubjects.length} subjects available
                    </p>

                    <p className="mt-1 text-xs leading-5 text-black/45">
                      Showing the TutorsQue learning subjects for{" "}
                      {board || "your board"} and {studentClass || "your class"}.
                    </p>
                  </div>
                </div>
              </div>

              {/* Subjects */}
              {availableSubjects.length > 0 ? (
                <div className="mt-7 grid gap-4 sm:grid-cols-2">
                  {availableSubjects.map((item, index) => {
                    const active = selectedSubjects.includes(item.name);

                    return (
                      <motion.button
                        key={item.name}
                        type="button"
                        whileHover={{ y: -3 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => toggleSubject(item.name)}
                        className={`relative overflow-hidden rounded-[24px] border p-5 text-left transition ${
                          active
                            ? "border-[#42d4bc] bg-[#42d4bc]/12 shadow-[0_15px_35px_rgba(66,212,188,0.12)]"
                            : "border-black/8 bg-white/45 hover:border-black/15 hover:bg-white"
                        }`}
                      >
                        <div
                          className={`absolute right-[-35px] top-[-35px] h-32 w-32 rounded-full bg-gradient-to-br ${item.accent} opacity-20 blur-2xl`}
                        />

                        <div className="relative flex items-start justify-between">
                          <div
                            className={`flex h-14 w-14 items-center justify-center rounded-[19px] bg-gradient-to-br ${item.accent} text-lg font-bold shadow-sm`}
                          >
                            {item.short}
                          </div>

                          <div
                            className={`flex h-8 w-8 items-center justify-center rounded-full ${
                              active
                                ? "bg-[#42d4bc] text-black"
                                : "border border-black/10 bg-white/55 text-transparent"
                            }`}
                          >
                            <CheckIcon />
                          </div>
                        </div>

                        <div className="relative mt-6">
                          <div className="mb-2">
                            <span className="rounded-full bg-black/[0.05] px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.1em] text-black/40">
                              {item.category}
                            </span>
                          </div>

                          <h3 className="text-[20px] font-semibold tracking-[-0.035em]">
                            {item.name}
                          </h3>

                          <p className="mt-2 text-xs leading-5 text-black/45">
                            {item.description}
                          </p>
                        </div>

                        <div className="relative mt-5 flex items-center justify-between border-t border-black/[0.06] pt-4">
                          <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-black/35">
                            {studentClass}
                          </span>

                          <span
                            className={`text-[10px] font-semibold ${
                              active ? "text-[#159b87]" : "text-black/30"
                            }`}
                          >
                            {active ? "Selected" : "Select"}
                          </span>
                        </div>

                        {index === 0 && (
                          <span className="absolute left-4 top-4 rounded-full bg-black px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.1em] text-white">
                            Core
                          </span>
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              ) : (
                <div className="mt-7 rounded-[24px] border border-black/8 bg-white/45 p-8 text-center">
                  <h3 className="text-xl font-semibold">
                    Curriculum information missing
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-black/45">
                    Please go back and select a valid board and class.
                  </p>
                </div>
              )}

              {/* Selected subjects */}
              <div className="mt-8 rounded-[22px] border border-black/[0.06] bg-white/45 p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-black/35">
                      Selected subjects
                    </p>

                    <p className="mt-1 text-[11px] text-black/40">
                      {selectedSubjects.length === 0
                        ? "Choose at least one subject"
                        : `${selectedSubjects.length} selected`}
                    </p>
                  </div>

                  <div
                    className={`flex h-9 min-w-9 items-center justify-center rounded-full px-2 text-xs font-bold ${
                      selectedSubjects.length > 0
                        ? "bg-[#42d4bc] text-black"
                        : "bg-black/5 text-black/35"
                    }`}
                  >
                    {selectedSubjects.length}
                  </div>
                </div>

                {selectedSubjects.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {selectedSubjects.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => toggleSubject(item)}
                        className="rounded-full border border-[#42d4bc]/30 bg-[#42d4bc]/10 px-3 py-2 text-xs font-semibold text-[#148c79]"
                      >
                        {item} ×
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Buttons */}
              <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
                <button
                  type="button"
                  onClick={handleBack}
                  className="inline-flex h-13 items-center justify-center rounded-[15px] border border-black/10 bg-white/50 px-6 text-sm font-semibold transition hover:bg-white"
                >
                  Back
                </button>

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
                  Find matching tutors
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
          <p>Step 2 · Subject selection</p>
        </div>
      </footer>
    </main>
  );
}