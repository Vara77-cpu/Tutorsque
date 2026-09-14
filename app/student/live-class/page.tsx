"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const classmates = [
  { name: "Ananya Reddy", initials: "AR", status: "online" },
  { name: "Sai Teja", initials: "ST", status: "online" },
  { name: "Keerthi Rao", initials: "KR", status: "online" },
  { name: "Vishal Sharma", initials: "VS", status: "online" },
  { name: "Pavani Devi", initials: "PD", status: "away" },
  { name: "Rohit Sai", initials: "RS", status: "online" },
  { name: "Nikhil Reddy", initials: "NR", status: "online" },
  { name: "Mounika Sri", initials: "MS", status: "online" },
];

const initialMessages = [
  {
    id: 1,
    name: "Ananya",
    message: "Sir, can you repeat that formula?",
    time: "6:14 PM",
  },
  {
    id: 2,
    name: "Sai Teja",
    message: "I got the answer.",
    time: "6:16 PM",
  },
  {
    id: 3,
    name: "Keerthi",
    message: "Can we solve one more example?",
    time: "6:17 PM",
  },
];

type Message = {
  id: number;
  name: string;
  message: string;
  time: string;
};

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(
    remainingSeconds
  ).padStart(2, "0")}`;
}

export default function StudentLiveClassPage() {
  const [isJoined, setIsJoined] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [showChat, setShowChat] = useState(true);
  const [showClassmates, setShowClassmates] = useState(true);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] =
    useState<Message[]>(initialMessages);

  useEffect(() => {
    if (!isJoined) return;

    const timer = window.setInterval(() => {
      setElapsedSeconds((value) => value + 1);
    }, 1000);

    return () => window.clearInterval(timer);
  }, [isJoined]);

  const sendMessage = () => {
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

  const onlineCount = classmates.filter(
    (student) => student.status === "online"
  ).length;

  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f8f7] text-[#111]">
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 25, 0],
            y: [0, -20, 0],
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
            x: [0, -30, 0],
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

      <div className="relative mx-auto min-h-screen max-w-[1700px] px-4 py-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="tq-glass mb-4 flex items-center justify-between rounded-[24px] px-4 py-3 shadow-lg shadow-black/[0.03] sm:px-5">
          <div className="flex min-w-0 items-center gap-3">
            <Link
              href="/student/dashboard"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-black text-white transition hover:-translate-y-0.5"
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

            <div className="min-w-0">
              <p className="truncate text-sm font-black sm:text-base">
                Mathematics • Class 10
              </p>

              <div className="mt-0.5 flex items-center gap-2 text-xs text-black/45">
                <span>Rahul Varma</span>
                <span>•</span>
                <span>TQ-10-MATH-01</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {isJoined && (
              <div className="hidden items-center gap-2 rounded-full bg-red-500/10 px-3 py-2 text-xs font-black text-red-600 sm:flex">
                <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
                LIVE
              </div>
            )}

            <div className="rounded-full bg-black/[0.04] px-3 py-2 text-xs font-black">
              {formatTime(elapsedSeconds)}
            </div>

            <Link
              href="/student/dashboard"
              className="hidden rounded-xl bg-black/[0.04] px-4 py-2.5 text-xs font-black text-black/60 transition hover:bg-black/[0.07] sm:block"
            >
              Exit
            </Link>
          </div>
        </header>

        {!isJoined && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4"
          >
            <div className="tq-glass overflow-hidden rounded-[30px] p-6 shadow-xl shadow-black/[0.03] sm:p-8">
              <div className="grid gap-7 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-[#42d4bc]/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-[#0b9079]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#42d4bc]" />
                    Class starting soon
                  </div>

                  <h1 className="mt-5 text-4xl font-black tracking-[-0.05em] sm:text-5xl">
                    Your classroom
                    <span className="text-[#42d4bc]"> is ready.</span>
                  </h1>

                  <p className="mt-4 max-w-2xl text-sm leading-6 text-black/50 sm:text-base">
                    Join your live Mathematics class and learn directly with
                    your tutor and classmates.
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    <span className="rounded-xl bg-black/[0.04] px-3 py-2 text-xs font-black">
                      Mathematics
                    </span>

                    <span className="rounded-xl bg-black/[0.04] px-3 py-2 text-xs font-black">
                      Class 10
                    </span>

                    <span className="rounded-xl bg-black/[0.04] px-3 py-2 text-xs font-black">
                      AP State Board
                    </span>

                    <span className="rounded-xl bg-black/[0.04] px-3 py-2 text-xs font-black">
                      45 min
                    </span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ y: -3, scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsJoined(true)}
                  className="flex items-center justify-center gap-3 rounded-2xl bg-black px-7 py-4 text-sm font-black text-white shadow-xl shadow-black/10"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4"
                      fill="currentColor"
                    >
                      <path d="M8 5.8c0-1 1.1-1.6 2-1.1l8.3 5.2c.8.5.8 1.7 0 2.2L10 17.3c-.9.6-2-.1-2-1.1V5.8Z" />
                    </svg>
                  </span>

                  Join Live Class
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}

        <div
          className={`grid gap-4 ${
            showClassmates || showChat
              ? "xl:grid-cols-[minmax(0,1fr)_330px]"
              : "grid-cols-1"
          }`}
        >
          {/* Main classroom */}
          <section className="min-w-0">
            <div className="relative min-h-[580px] overflow-hidden rounded-[30px] bg-[#101515] shadow-2xl shadow-black/10 sm:min-h-[670px]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_25%,rgba(66,212,188,.15),transparent_35%),radial-gradient(circle_at_80%_80%,rgba(0,255,220,.06),transparent_30%)]" />

              {/* top overlay */}
              <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-4 py-4 sm:px-6">
                <div className="rounded-full border border-white/10 bg-black/30 px-3 py-2 text-xs font-bold text-white backdrop-blur-md">
                  <span className="mr-2 inline-block h-2 w-2 rounded-full bg-[#42d4bc]" />
                  {isJoined ? "LIVE CLASSROOM" : "CLASS PREVIEW"}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      setShowClassmates((value) => !value)
                    }
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-black/25 text-white backdrop-blur-md transition hover:bg-white/10"
                    aria-label="Toggle classmates"
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
                    onClick={() =>
                      setShowChat((value) => !value)
                    }
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

              {/* Tutor video */}
              <div className="absolute inset-0 flex items-center justify-center px-4">
                <div className="relative h-[70%] w-full max-w-5xl overflow-hidden rounded-[28px] border border-white/10 bg-[#18211f] shadow-2xl">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_30%,rgba(66,212,188,.18),transparent_28%),linear-gradient(145deg,#17201f,#0d1111)]" />

                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <motion.div
                      animate={
                        isJoined
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
                      className="mb-6 flex h-28 w-28 items-center justify-center rounded-[34px] border border-[#42d4bc]/20 bg-[#42d4bc]/10 text-4xl font-black text-[#42d4bc] shadow-[0_0_80px_rgba(66,212,188,.12)]"
                    >
                      RV
                    </motion.div>

                    <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#42d4bc]/80">
                      Tutor
                    </p>

                    <h2 className="mt-2 text-2xl font-black text-white sm:text-3xl">
                      Rahul Varma
                    </h2>

                    <p className="mt-2 text-sm text-white/40">
                      Mathematics • Quadratic Equations
                    </p>
                  </div>

                  {/* student preview */}
                  <div className="absolute bottom-4 right-4 flex h-28 w-40 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-black/35 shadow-xl backdrop-blur-md sm:h-32 sm:w-48">
                    {isCameraOn ? (
                      <div className="flex flex-col items-center">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#42d4bc]/20 text-sm font-black text-[#42d4bc]">
                          AK
                        </div>

                        <span className="mt-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white/50">
                          You
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

              {/* Controls */}
              <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/85 via-black/30 to-transparent px-4 pb-5 pt-20 sm:px-6">
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
                    onClick={() =>
                      setIsCameraOn((value) => !value)
                    }
                    className={`flex h-11 items-center gap-2 rounded-xl px-4 text-xs font-black transition ${
                      !isCameraOn
                        ? "bg-red-500 text-white"
                        : "bg-white/10 text-white hover:bg-white/15"
                    }`}
                  >
                    {isCameraOn ? "Camera" : "Camera Off"}
                  </button>

                  {!isJoined ? (
                    <button
                      onClick={() => setIsJoined(true)}
                      className="flex h-11 items-center gap-2 rounded-xl bg-[#42d4bc] px-5 text-xs font-black text-black transition hover:brightness-105"
                    >
                      Join Class
                    </button>
                  ) : (
                    <button
                      onClick={() => setIsJoined(false)}
                      className="flex h-11 items-center gap-2 rounded-xl bg-red-500 px-5 text-xs font-black text-white transition hover:bg-red-600"
                    >
                      Leave Class
                    </button>
                  )}
                </div>
              </div>
            </div>
          </section>

          {(showClassmates || showChat) && (
            <aside className="grid gap-4">
              {/* Classmates */}
              {showClassmates && (
                <motion.div className="tq-glass overflow-hidden rounded-[28px] shadow-xl shadow-black/[0.03]">
                  <div className="flex items-center justify-between border-b border-black/5 px-5 py-4">
                    <div>
                      <p className="text-sm font-black">
                        Classmates
                      </p>

                      <p className="mt-1 text-xs text-black/40">
                        {onlineCount} online now
                      </p>
                    </div>

                    <span className="rounded-full bg-[#42d4bc]/10 px-3 py-1.5 text-xs font-black text-[#0b9079]">
                      Class 10
                    </span>
                  </div>

                  <div className="max-h-[300px] overflow-y-auto px-3 py-3">
                    {classmates.map((student, index) => (
                      <motion.div
                        key={student.name}
                        initial={{ opacity: 0, x: 8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: index * 0.025,
                        }}
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

              {/* Chat */}
              {showChat && (
                <motion.div className="tq-glass flex min-h-[390px] flex-col overflow-hidden rounded-[28px] shadow-xl shadow-black/[0.03]">
                  <div className="flex items-center justify-between border-b border-black/5 px-5 py-4">
                    <div>
                      <p className="text-sm font-black">
                        Class chat
                      </p>

                      <p className="mt-1 text-xs text-black/40">
                        Ask questions during class
                      </p>
                    </div>

                    <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-black/[0.04] text-xs font-black">
                      {messages.length}
                    </span>
                  </div>

                  <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
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
                      </div>
                    ))}
                  </div>

                  <form
                    onSubmit={(event) => {
                      event.preventDefault();
                      sendMessage();
                    }}
                    className="border-t border-black/5 p-3"
                  >
                    <div className="flex items-center gap-2 rounded-2xl bg-black/[0.035] p-2">
                      <input
                        value={chatInput}
                        onChange={(event) =>
                          setChatInput(event.target.value)
                        }
                        placeholder="Ask your tutor..."
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

              {/* Lesson info */}
              <div className="tq-glass rounded-[24px] p-5 shadow-xl shadow-black/[0.03]">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-black/30">
                  Today's lesson
                </p>

                <h3 className="mt-2 text-lg font-black">
                  Quadratic Equations
                </h3>

                <p className="mt-1 text-xs leading-5 text-black/45">
                  Solving quadratic equations using factorisation and the
                  quadratic formula.
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-xl bg-black/[0.04] px-3 py-2 text-[10px] font-black">
                    Mathematics
                  </span>

                  <span className="rounded-xl bg-black/[0.04] px-3 py-2 text-[10px] font-black">
                    Chapter 4
                  </span>
                </div>
              </div>
            </aside>
          )}
        </div>
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