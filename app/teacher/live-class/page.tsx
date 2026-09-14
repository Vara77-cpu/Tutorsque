"use client";

import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Student = {
  id: number;
  name: string;
  initials: string;
  status: "online" | "away";
};

type ChatMessage = {
  id: number;
  name: string;
  message: string;
  time: string;
};

const students: Student[] = [
  { id: 1, name: "Aarav Kumar", initials: "AK", status: "online" },
  { id: 2, name: "Ananya Reddy", initials: "AR", status: "online" },
  { id: 3, name: "Sai Teja", initials: "ST", status: "online" },
  { id: 4, name: "Harsha Vardhan", initials: "HV", status: "away" },
  { id: 5, name: "Keerthi Rao", initials: "KR", status: "online" },
  { id: 6, name: "Vishal Sharma", initials: "VS", status: "online" },
  { id: 7, name: "Pavani Devi", initials: "PD", status: "away" },
  { id: 8, name: "Rohit Sai", initials: "RS", status: "online" },
  { id: 9, name: "Nikhil Reddy", initials: "NR", status: "online" },
  { id: 10, name: "Mounika Sri", initials: "MS", status: "online" },
  { id: 11, name: "Yashwanth", initials: "YW", status: "away" },
  { id: 12, name: "Bhavya Lakshmi", initials: "BL", status: "online" },
];

const initialMessages: ChatMessage[] = [
  {
    id: 1,
    name: "Ananya",
    message: "Sir, can you explain this step again?",
    time: "10:18 AM",
  },
  {
    id: 2,
    name: "Sai Teja",
    message: "Got it 👍",
    time: "10:19 AM",
  },
  {
    id: 3,
    name: "Keerthi",
    message: "I have finished question 4.",
    time: "10:20 AM",
  },
];

const subjectPalette = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "English",
  "Social Studies",
];

function formatTime(totalSeconds: number) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return [hours, minutes, seconds]
    .map((value) => String(value).padStart(2, "0"))
    .join(":");
}

function classFromQuery() {
  if (typeof window === "undefined") return "10";

  const params = new URLSearchParams(window.location.search);
  return params.get("class") || "10";
}

function subjectFromQuery() {
  if (typeof window === "undefined") return "Mathematics";

  const params = new URLSearchParams(window.location.search);
  return params.get("subject") || "Mathematics";
}

function batchFromQuery() {
  if (typeof window === "undefined") return "TQ-10-MATH-01";

  const params = new URLSearchParams(window.location.search);
  return params.get("batch") || "TQ-10-MATH-01";
}

export default function TeacherLiveClassPage() {
  const [isLive, setIsLive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [showChat, setShowChat] = useState(true);
  const [showStudents, setShowStudents] = useState(true);
  const [showEndModal, setShowEndModal] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [subject, setSubject] = useState("Mathematics");
  const [batch, setBatch] = useState("TQ-10-MATH-01");
  const [className, setClassName] = useState("10");
  const [activeStudents, setActiveStudents] = useState(
    students.filter((student) => student.status === "online").length
  );

  useEffect(() => {
    setSubject(subjectFromQuery());
    setBatch(batchFromQuery());
    setClassName(classFromQuery());
  }, []);

  useEffect(() => {
    if (!isLive || isCompleted) return;

    const interval = window.setInterval(() => {
      setElapsedSeconds((value) => value + 1);
    }, 1000);

    return () => window.clearInterval(interval);
  }, [isLive, isCompleted]);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (isLive && !isCompleted) {
        event.preventDefault();
        event.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () =>
      window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isLive, isCompleted]);

  const onlinePercentage = useMemo(() => {
    return Math.round((activeStudents / students.length) * 100);
  }, [activeStudents]);

  const startClass = () => {
    setIsLive(true);
    setElapsedSeconds(0);
    setIsCompleted(false);
  };

  const sendMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmed = chatInput.trim();

    if (!trimmed) return;

    setMessages((current) => [
      ...current,
      {
        id: Date.now(),
        name: "You",
        message: trimmed,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);

    setChatInput("");
  };

  const endClass = () => {
    setShowEndModal(false);
    setIsLive(false);
    setIsCompleted(true);
  };

  if (isCompleted) {
    return (
      <main className="min-h-screen overflow-hidden bg-[#f7f8f7] text-[#111]">
        <div className="pointer-events-none fixed inset-0 overflow-hidden">
          <div className="absolute left-[8%] top-[10%] h-72 w-72 rounded-full bg-[#42d4bc]/10 blur-[90px]" />
          <div className="absolute bottom-[5%] right-[8%] h-80 w-80 rounded-full bg-sky-200/30 blur-[100px]" />
        </div>

        <div className="relative mx-auto flex min-h-screen max-w-6xl items-center justify-center px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 25, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="tq-glass w-full max-w-2xl rounded-[34px] p-10 text-center shadow-2xl shadow-black/5 sm:p-14"
          >
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 180 }}
              className="mx-auto mb-7 flex h-24 w-24 items-center justify-center rounded-[28px] bg-[#42d4bc]/15 text-[#12a98d]"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-12 w-12"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.9"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m5 12 4 4L19 6"
                />
              </svg>
            </motion.div>

            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-[#12a98d]">
              Class completed
            </p>

            <h1 className="text-4xl font-black tracking-[-0.04em] sm:text-5xl">
              Great session.
            </h1>

            <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-black/55">
              Your {subject} class for Class {className} has been marked as
              completed.
            </p>

            <div className="mt-9 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="tq-glass rounded-2xl p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-black/40">
                  Duration
                </p>
                <p className="mt-2 text-xl font-black">
                  {formatTime(elapsedSeconds)}
                </p>
              </div>

              <div className="tq-glass rounded-2xl p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-black/40">
                  Students
                </p>
                <p className="mt-2 text-xl font-black">{activeStudents}</p>
              </div>

              <div className="tq-glass rounded-2xl p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-black/40">
                  Batch
                </p>
                <p className="mt-2 truncate text-xl font-black">{batch}</p>
              </div>
            </div>

            <div className="mt-8 rounded-2xl border border-[#42d4bc]/20 bg-[#42d4bc]/8 px-5 py-4 text-left">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#42d4bc]/15 text-[#12a98d]">
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
                      d="M12 9v3.5M12 16h.01"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.3 4.8 3.8 16a2 2 0 0 0 1.7 3h13a2 2 0 0 0 1.7-3L13.7 4.8a2 2 0 0 0-3.4 0Z"
                    />
                  </svg>
                </div>

                <div>
                  <p className="font-bold">Verification ready</p>
                  <p className="mt-1 text-sm leading-6 text-black/55">
                    In production, the backend will verify this completed
                    session and create the corresponding teacher earnings
                    ledger entry.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/teacher/classes"
                className="rounded-2xl bg-black px-6 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-black/85"
              >
                Back to classes
              </Link>

              <Link
                href="/teacher/dashboard"
                className="tq-glass rounded-2xl px-6 py-3.5 text-sm font-bold transition hover:-translate-y-0.5"
              >
                Teacher dashboard
              </Link>
            </div>
          </motion.div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f8f7] text-[#111]">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <motion.div
          animate={{ x: [0, 25, 0], y: [0, -20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-[12%] top-[7%] h-72 w-72 rounded-full bg-[#42d4bc]/10 blur-[90px]"
        />
        <motion.div
          animate={{ x: [0, -25, 0], y: [0, 20, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[10%] right-[4%] h-96 w-96 rounded-full bg-cyan-100/50 blur-[100px]"
        />
      </div>

      <div className="relative mx-auto min-h-screen max-w-[1700px] px-4 py-4 sm:px-6 lg:px-8">
        <header className="tq-glass mb-4 flex items-center justify-between rounded-[24px] px-4 py-3 shadow-lg shadow-black/[0.03] sm:px-5">
          <div className="flex min-w-0 items-center gap-3">
            <Link
              href="/teacher/classes"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-black text-white transition hover:scale-105"
              aria-label="Back to teacher classes"
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

            <div className="min-w-0">
              <p className="truncate text-sm font-black sm:text-base">
                {subject} • Class {className}
              </p>
              <div className="mt-0.5 flex items-center gap-2 text-xs text-black/45">
                <span>{batch}</span>
                <span>•</span>
                <span>Today, 10:00 AM</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <AnimatePresence>
              {isLive && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="hidden items-center gap-2 rounded-full bg-[#42d4bc]/10 px-3 py-2 text-xs font-bold text-[#0d9079] sm:flex"
                >
                  <span className="h-2 w-2 animate-pulse rounded-full bg-[#42d4bc]" />
                  LIVE
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex items-center gap-2 rounded-full bg-black/[0.04] px-3 py-2 text-xs font-bold">
              <span className="text-black/40">Time</span>
              <span className="font-mono">{formatTime(elapsedSeconds)}</span>
            </div>

            <button
              onClick={() => setShowEndModal(true)}
              disabled={!isLive}
              className="rounded-xl bg-red-500 px-4 py-2.5 text-xs font-black text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-35 sm:px-5"
            >
              End Class
            </button>
          </div>
        </header>

        {!isLive && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4"
          >
            <div className="tq-glass relative overflow-hidden rounded-[30px] p-6 shadow-xl shadow-black/[0.03] sm:p-8">
              <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#42d4bc]/10 blur-3xl" />

              <div className="relative grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-black/[0.04] px-3 py-1.5 text-xs font-bold text-black/55">
                    <span className="h-2 w-2 rounded-full bg-yellow-400" />
                    Ready to start
                  </div>

                  <h1 className="text-3xl font-black tracking-[-0.04em] sm:text-4xl">
                    Start your live class
                  </h1>

                  <p className="mt-3 max-w-2xl text-sm leading-6 text-black/50">
                    Your classroom is ready. Start the session when you are
                    ready to teach your students.
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    <span className="rounded-xl bg-black/[0.04] px-3 py-2 text-xs font-bold">
                      {subject}
                    </span>
                    <span className="rounded-xl bg-black/[0.04] px-3 py-2 text-xs font-bold">
                      Class {className}
                    </span>
                    <span className="rounded-xl bg-black/[0.04] px-3 py-2 text-xs font-bold">
                      {batch}
                    </span>
                    <span className="rounded-xl bg-black/[0.04] px-3 py-2 text-xs font-bold">
                      45 min
                    </span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ y: -3, scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={startClass}
                  className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-black px-7 py-4 text-sm font-black text-white shadow-xl shadow-black/10"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 transition group-hover:bg-[#42d4bc]/20">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4"
                      fill="currentColor"
                    >
                      <path d="M8 5.8c0-1 1.1-1.6 2-1.1l8.3 5.2c.8.5.8 1.7 0 2.2L10 17.3c-.9.6-2-.1-2-1.1V5.8Z" />
                    </svg>
                  </span>
                  Start Live Class
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}

        <div
          className={`grid gap-4 ${
            showStudents || showChat
              ? "xl:grid-cols-[minmax(0,1fr)_330px]"
              : "grid-cols-1"
          }`}
        >
          <section className="min-w-0">
            <div className="relative min-h-[570px] overflow-hidden rounded-[30px] bg-[#101515] shadow-2xl shadow-black/10 sm:min-h-[650px]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_25%,rgba(66,212,188,.15),transparent_35%),radial-gradient(circle_at_80%_80%,rgba(0,255,220,.06),transparent_30%)]" />

              <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-4 py-4 sm:px-6">
                <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-2 text-xs font-bold text-white backdrop-blur-md">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      isLive
                        ? "animate-pulse bg-red-400"
                        : "bg-yellow-400"
                    }`}
                  />
                  {isLive ? "LIVE CLASS" : "WAITING TO START"}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowStudents((value) => !value)}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-black/25 text-white backdrop-blur-md transition hover:bg-white/10"
                    aria-label="Toggle students"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"
                      />
                      <circle cx="9.5" cy="7" r="4" />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17 8a4 4 0 0 1 0 7"
                      />
                    </svg>
                  </button>

                  <button
                    onClick={() => setShowChat((value) => !value)}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-black/25 text-white backdrop-blur-md transition hover:bg-white/10"
                    aria-label="Toggle chat"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v7a2.5 2.5 0 0 1-2.5 2.5H12l-4.5 4v-4H6.5A2.5 2.5 0 0 1 4 12.5v-7Z"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="absolute inset-0 flex items-center justify-center px-4">
                <div className="relative h-[72%] w-full max-w-5xl overflow-hidden rounded-[28px] border border-white/10 bg-[#18211f] shadow-2xl">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_35%,rgba(66,212,188,.18),transparent_28%),linear-gradient(145deg,#17201f,#0d1111)]" />

                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <motion.div
                      animate={
                        isLive
                          ? {
                              scale: [1, 1.04, 1],
                              opacity: [0.9, 1, 0.9],
                            }
                          : {}
                      }
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="mb-6 flex h-28 w-28 items-center justify-center rounded-[34px] border border-[#42d4bc]/20 bg-[#42d4bc]/10 text-[#42d4bc] shadow-[0_0_80px_rgba(66,212,188,.12)]"
                    >
                      {isLive ? (
                        <span className="text-4xl font-black">TQ</span>
                      ) : (
                        <svg
                          viewBox="0 0 24 24"
                          className="h-12 w-12"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m15 10-4.2-2.5A1.2 1.2 0 0 0 9 8.5v7a1.2 1.2 0 0 0 1.8 1l4.2-2.5V10Z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 10.2 18.3 8A1.2 1.2 0 0 1 20 9v6a1.2 1.2 0 0 1-1.7 1L15 13.8v-3.6Z"
                          />
                        </svg>
                      )}
                    </motion.div>

                    <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#42d4bc]/80">
                      {isLive ? "Live classroom" : "Classroom preview"}
                    </p>

                    <h2 className="mt-2 text-2xl font-black text-white sm:text-3xl">
                      {subject}
                    </h2>

                    <p className="mt-2 text-sm text-white/45">
                      Class {className} • {batch}
                    </p>
                  </div>

                  <AnimatePresence>
                    {isScreenSharing && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute left-4 right-4 top-4 rounded-2xl border border-white/10 bg-black/50 px-4 py-3 text-sm font-bold text-white backdrop-blur-xl"
                      >
                        Screen sharing is active
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="absolute bottom-4 right-4 flex h-28 w-40 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-black/35 shadow-xl backdrop-blur-md sm:h-32 sm:w-48">
                    {isCameraOn ? (
                      <div className="flex flex-col items-center">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#42d4bc]/20 text-sm font-black text-[#42d4bc]">
                          YOU
                        </div>
                        <span className="mt-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white/50">
                          Camera preview
                        </span>
                      </div>
                    ) : (
                      <span className="text-xs font-bold text-white/35">
                        Camera off
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/80 via-black/30 to-transparent px-4 pb-5 pt-20 sm:px-6">
                <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
                  <button
                    onClick={() => setIsMuted((value) => !value)}
                    className={`flex h-11 items-center gap-2 rounded-xl px-4 text-xs font-black transition ${
                      isMuted
                        ? "bg-red-500 text-white"
                        : "bg-white/10 text-white hover:bg-white/15"
                    }`}
                  >
                    {isMuted ? "Unmute" : "Mute"}
                  </button>

                  <button
                    onClick={() => setIsCameraOn((value) => !value)}
                    className={`flex h-11 items-center gap-2 rounded-xl px-4 text-xs font-black transition ${
                      !isCameraOn
                        ? "bg-red-500 text-white"
                        : "bg-white/10 text-white hover:bg-white/15"
                    }`}
                  >
                    {isCameraOn ? "Camera" : "Camera Off"}
                  </button>

                  <button
                    onClick={() => setIsScreenSharing((value) => !value)}
                    className={`flex h-11 items-center gap-2 rounded-xl px-4 text-xs font-black transition ${
                      isScreenSharing
                        ? "bg-[#42d4bc] text-black"
                        : "bg-white/10 text-white hover:bg-white/15"
                    }`}
                  >
                    {isScreenSharing ? "Stop Share" : "Share Screen"}
                  </button>

                  {!isLive && (
                    <button
                      onClick={startClass}
                      className="flex h-11 items-center gap-2 rounded-xl bg-[#42d4bc] px-5 text-xs font-black text-black transition hover:brightness-105"
                    >
                      Start Class
                    </button>
                  )}
                </div>
              </div>
            </div>
          </section>

          {(showStudents || showChat) && (
            <aside className="grid gap-4">
              {showStudents && (
                <motion.div
                  layout
                  className="tq-glass overflow-hidden rounded-[28px] shadow-xl shadow-black/[0.03]"
                >
                  <div className="flex items-center justify-between border-b border-black/5 px-5 py-4">
                    <div>
                      <p className="text-sm font-black">Students</p>
                      <p className="mt-1 text-xs text-black/40">
                        {activeStudents} of {students.length} online
                      </p>
                    </div>

                    <div className="rounded-full bg-[#42d4bc]/10 px-3 py-1.5 text-xs font-black text-[#0d9079]">
                      {onlinePercentage}%
                    </div>
                  </div>

                  <div className="max-h-[310px] overflow-y-auto px-3 py-3">
                    {students.map((student, index) => (
                      <motion.div
                        key={student.id}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.02 }}
                        className="flex items-center justify-between rounded-2xl px-2 py-2.5 transition hover:bg-black/[0.025]"
                      >
                        <div className="flex min-w-0 items-center gap-3">
                          <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-black/[0.04] text-xs font-black">
                            {student.initials}
                            <span
                              className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white ${
                                student.status === "online"
                                  ? "bg-[#42d4bc]"
                                  : "bg-yellow-400"
                              }`}
                            />
                          </div>

                          <div className="min-w-0">
                            <p className="truncate text-sm font-bold">
                              {student.name}
                            </p>
                            <p className="mt-0.5 text-[11px] text-black/40">
                              {student.status === "online"
                                ? "Online"
                                : "Away"}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {showChat && (
                <motion.div
                  layout
                  className="tq-glass flex min-h-[380px] flex-col overflow-hidden rounded-[28px] shadow-xl shadow-black/[0.03]"
                >
                  <div className="flex items-center justify-between border-b border-black/5 px-5 py-4">
                    <div>
                      <p className="text-sm font-black">Class chat</p>
                      <p className="mt-1 text-xs text-black/40">
                        Chat with your students
                      </p>
                    </div>

                    <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-black/[0.04] text-xs font-black">
                      {messages.length}
                    </span>
                  </div>

                  <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="rounded-2xl bg-black/[0.025] p-3"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-xs font-black">
                            {message.name}
                          </span>
                          <span className="text-[10px] text-black/30">
                            {message.time}
                          </span>
                        </div>
                        <p className="mt-1.5 text-xs leading-5 text-black/55">
                          {message.message}
                        </p>
                      </motion.div>
                    ))}
                  </div>

                  <form
                    onSubmit={sendMessage}
                    className="border-t border-black/5 p-3"
                  >
                    <div className="flex items-center gap-2 rounded-2xl bg-black/[0.035] p-2">
                      <input
                        value={chatInput}
                        onChange={(event) => setChatInput(event.target.value)}
                        placeholder="Type a message..."
                        className="min-w-0 flex-1 bg-transparent px-2 text-xs font-medium outline-none placeholder:text-black/30"
                      />

                      <button
                        type="submit"
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-black text-white transition hover:bg-black/80"
                        aria-label="Send message"
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
                            d="m4 4 16 8-16 8 3.5-8L4 4Z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M7.5 12H20"
                          />
                        </svg>
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}

              <div className="tq-glass rounded-[24px] p-4 shadow-xl shadow-black/[0.03]">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#42d4bc]/10 text-[#12a98d]">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 3v18M3 12h18"
                      />
                    </svg>
                  </div>

                  <div>
                    <p className="text-xs font-black">Session tracking</p>
                    <p className="mt-1 text-[11px] leading-5 text-black/45">
                      The session timer is tracked for future verified class
                      completion and earnings processing.
                    </p>
                  </div>
                </div>
              </div>
            </aside>
          )}
        </div>
      </div>

      <AnimatePresence>
        {showEndModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 p-4 backdrop-blur-md"
            onClick={() => setShowEndModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.96 }}
              onClick={(event) => event.stopPropagation()}
              className="w-full max-w-md rounded-[30px] border border-white/50 bg-white/90 p-7 shadow-2xl backdrop-blur-2xl"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-500/10 text-red-500">
                <svg
                  viewBox="0 0 24 24"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <rect x="4" y="4" width="16" height="16" rx="4" />
                  <path strokeLinecap="round" d="M9 9h6v6H9z" />
                </svg>
              </div>

              <h2 className="mt-5 text-2xl font-black tracking-[-0.03em]">
                End this class?
              </h2>

              <p className="mt-2 text-sm leading-6 text-black/50">
                The session will be marked as completed and the final class
                duration will be recorded.
              </p>

              <div className="mt-5 rounded-2xl bg-black/[0.035] p-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-black/50">
                    Session duration
                  </span>
                  <span className="font-mono font-black">
                    {formatTime(elapsedSeconds)}
                  </span>
                </div>

                <div className="mt-3 flex items-center justify-between text-sm">
                  <span className="font-medium text-black/50">
                    Students online
                  </span>
                  <span className="font-black">{activeStudents}</span>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setShowEndModal(false)}
                  className="flex-1 rounded-2xl bg-black/[0.05] px-4 py-3.5 text-sm font-black transition hover:bg-black/[0.08]"
                >
                  Continue Class
                </button>

                <button
                  onClick={endClass}
                  className="flex-1 rounded-2xl bg-red-500 px-4 py-3.5 text-sm font-black text-white transition hover:bg-red-600"
                >
                  End & Complete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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