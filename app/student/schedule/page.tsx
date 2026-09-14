"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";

type ClassItem = {
  id: number;
  day: string;
  date: string;
  shortDate: string;
  time: string;
  start: number;
  duration: string;
  subject: string;
  chapter: string;
  tutor: string;
  initials: string;
  type: "Live Class" | "Test" | "Revision";
  status: "Upcoming" | "Completed";
};

const scheduleData: ClassItem[] = [
  {
    id: 1,
    day: "Monday",
    date: "Sep 07, 2026",
    shortDate: "07",
    time: "6:00 PM",
    start: 18,
    duration: "45 min",
    subject: "Mathematics",
    chapter: "Quadratic Equations",
    tutor: "Rahul Varma",
    initials: "RV",
    type: "Live Class",
    status: "Upcoming",
  },
  {
    id: 2,
    day: "Tuesday",
    date: "Sep 08, 2026",
    shortDate: "08",
    time: "6:00 PM",
    start: 18,
    duration: "45 min",
    subject: "Science",
    chapter: "Chemical Reactions",
    tutor: "Priya Sharma",
    initials: "PS",
    type: "Live Class",
    status: "Upcoming",
  },
  {
    id: 3,
    day: "Wednesday",
    date: "Sep 09, 2026",
    shortDate: "09",
    time: "5:30 PM",
    start: 17.5,
    duration: "35 min",
    subject: "English",
    chapter: "Reading & Grammar",
    tutor: "Sneha Rao",
    initials: "SR",
    type: "Live Class",
    status: "Upcoming",
  },
  {
    id: 4,
    day: "Thursday",
    date: "Sep 10, 2026",
    shortDate: "10",
    time: "6:00 PM",
    start: 18,
    duration: "45 min",
    subject: "Mathematics",
    chapter: "Arithmetic Progressions",
    tutor: "Rahul Varma",
    initials: "RV",
    type: "Revision",
    status: "Upcoming",
  },
  {
    id: 5,
    day: "Friday",
    date: "Sep 11, 2026",
    shortDate: "11",
    time: "5:30 PM",
    start: 17.5,
    duration: "40 min",
    subject: "Social Studies",
    chapter: "National Movement",
    tutor: "Arjun Reddy",
    initials: "AR",
    type: "Live Class",
    status: "Upcoming",
  },
  {
    id: 6,
    day: "Saturday",
    date: "Sep 12, 2026",
    shortDate: "12",
    time: "10:00 AM",
    start: 10,
    duration: "45 min",
    subject: "Science",
    chapter: "Light",
    tutor: "Priya Sharma",
    initials: "PS",
    type: "Revision",
    status: "Upcoming",
  },
  {
    id: 7,
    day: "Monday",
    date: "Aug 31, 2026",
    shortDate: "31",
    time: "6:00 PM",
    start: 18,
    duration: "45 min",
    subject: "Mathematics",
    chapter: "Real Numbers",
    tutor: "Rahul Varma",
    initials: "RV",
    type: "Live Class",
    status: "Completed",
  },
  {
    id: 8,
    day: "Tuesday",
    date: "Sep 01, 2026",
    shortDate: "01",
    time: "6:00 PM",
    start: 18,
    duration: "45 min",
    subject: "Science",
    chapter: "Light",
    tutor: "Priya Sharma",
    initials: "PS",
    type: "Live Class",
    status: "Completed",
  },
];

const weekDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const subjectFilters = [
  "All",
  "Mathematics",
  "Science",
  "English",
  "Social Studies",
];

function typeClasses(type: ClassItem["type"]) {
  if (type === "Test") {
    return "bg-purple-500/10 text-purple-700";
  }

  if (type === "Revision") {
    return "bg-blue-500/10 text-blue-700";
  }

  return "bg-[#42d4bc]/10 text-[#0b9079]";
}

function timeToLabel(hour: number) {
  const hours = Math.floor(hour);
  const minutes = hour % 1 === 0.5 ? "30" : "00";
  const suffix = hours >= 12 ? "PM" : "AM";
  const display = hours > 12 ? hours - 12 : hours;

  return `${display}:${minutes} ${suffix}`;
}

export default function StudentSchedulePage() {
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [subjectFilter, setSubjectFilter] = useState("All");
  const [view, setView] = useState<"week" | "list">("week");

  const upcoming = scheduleData.filter(
    (item) => item.status === "Upcoming"
  );

  const completed = scheduleData.filter(
    (item) => item.status === "Completed"
  );

  const nextClass = upcoming[0];

  const dayClasses = useMemo(() => {
    return scheduleData
      .filter((item) => item.day === selectedDay)
      .filter(
        (item) =>
          subjectFilter === "All" || item.subject === subjectFilter
      )
      .sort((a, b) => a.start - b.start);
  }, [selectedDay, subjectFilter]);

  const filteredList = useMemo(() => {
    return scheduleData
      .filter(
        (item) =>
          subjectFilter === "All" || item.subject === subjectFilter
      )
      .sort((a, b) => {
        if (a.status === "Upcoming" && b.status !== "Upcoming") return -1;
        if (a.status !== "Upcoming" && b.status === "Upcoming") return 1;
        return a.id - b.id;
      });
  }, [subjectFilter]);

  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f8f7] text-[#111]">
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 25, 0],
            y: [0, -18, 0],
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

      <div className="relative mx-auto max-w-[1500px] px-4 py-5 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="tq-glass mb-6 flex flex-col gap-4 rounded-[26px] px-5 py-4 shadow-lg shadow-black/[0.03] sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex items-center gap-3">
            <Link
              href="/student/dashboard"
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-black text-white transition hover:-translate-y-0.5"
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

            <div>
              <p className="text-lg font-black tracking-[-0.02em]">
                My Schedule
              </p>

              <p className="mt-0.5 text-xs text-black/45">
                View your live classes, revision sessions and upcoming tests
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-full bg-[#42d4bc]/10 px-4 py-2.5 text-xs font-black text-[#0b9079]">
            <span className="h-2 w-2 rounded-full bg-[#42d4bc]" />
            Class 10 • 2026–27
          </div>
        </motion.header>

        {/* Hero */}
        <section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden rounded-[30px] bg-black p-7 text-white shadow-2xl shadow-black/10 sm:p-9"
          >
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#42d4bc]/20 blur-3xl" />

            <div className="absolute bottom-[-120px] left-[26%] h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl" />

            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-white/55">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#42d4bc]" />
                Your week
              </div>

              <h1 className="mt-5 max-w-2xl text-4xl font-black leading-[1.03] tracking-[-0.05em] sm:text-5xl">
                Know what is
                <span className="text-[#42d4bc]"> next.</span>
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-6 text-white/50 sm:text-base">
                Your complete academic schedule, organized so you always know
                where you need to be and what you are learning.
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                  <p className="text-xs text-white/35">Upcoming</p>
                  <p className="mt-1.5 text-2xl font-black">
                    {upcoming.length}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                  <p className="text-xs text-white/35">This week</p>
                  <p className="mt-1.5 text-2xl font-black">6</p>
                </div>

                <div className="rounded-2xl border border-[#42d4bc]/20 bg-[#42d4bc]/10 p-4">
                  <p className="text-xs text-[#42d4bc]/65">
                    Completed
                  </p>

                  <p className="mt-1.5 text-2xl font-black text-[#42d4bc]">
                    {completed.length}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Next class */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="tq-glass rounded-[30px] p-6 shadow-xl shadow-black/[0.03] sm:p-7"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-black/30">
                  Next class
                </p>

                <p className="mt-2 text-sm font-black">
                  {nextClass.day}
                </p>
              </div>

              <span className="rounded-full bg-[#42d4bc]/10 px-3 py-1.5 text-[10px] font-black text-[#0b9079]">
                Upcoming
              </span>
            </div>

            <div className="mt-6 flex items-center gap-4">
              <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-2xl bg-black text-white">
                <span className="text-[9px] font-bold uppercase tracking-wider text-white/40">
                  Sep
                </span>

                <span className="text-2xl font-black">
                  {nextClass.shortDate}
                </span>
              </div>

              <div>
                <p className="text-xl font-black tracking-[-0.03em]">
                  {nextClass.subject}
                </p>

                <p className="mt-1 text-xs text-black/45">
                  {nextClass.chapter}
                </p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-black/[0.035] p-4">
                <p className="text-[10px] font-bold uppercase tracking-wider text-black/30">
                  Time
                </p>

                <p className="mt-1 text-xs font-black">
                  {nextClass.time}
                </p>
              </div>

              <div className="rounded-2xl bg-black/[0.035] p-4">
                <p className="text-[10px] font-bold uppercase tracking-wider text-black/30">
                  Tutor
                </p>

                <p className="mt-1 text-xs font-black">
                  {nextClass.tutor}
                </p>
              </div>
            </div>

            <Link
              href="/student/live-class"
              className="mt-5 flex w-full items-center justify-center rounded-2xl bg-black px-5 py-3.5 text-xs font-black text-white transition hover:-translate-y-0.5 hover:bg-black/85"
            >
              View Live Class
            </Link>
          </motion.div>
        </section>

        {/* Controls */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
          className="tq-glass mt-4 rounded-[26px] p-4 shadow-xl shadow-black/[0.03]"
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setView("week")}
                className={`rounded-xl px-4 py-2.5 text-xs font-black transition ${
                  view === "week"
                    ? "bg-black text-white"
                    : "bg-black/[0.04] text-black/45 hover:bg-black/[0.07]"
                }`}
              >
                Weekly View
              </button>

              <button
                onClick={() => setView("list")}
                className={`rounded-xl px-4 py-2.5 text-xs font-black transition ${
                  view === "list"
                    ? "bg-black text-white"
                    : "bg-black/[0.04] text-black/45 hover:bg-black/[0.07]"
                }`}
              >
                List View
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {subjectFilters.map((subject) => (
                <button
                  key={subject}
                  onClick={() => setSubjectFilter(subject)}
                  className={`rounded-xl px-3 py-2.5 text-[10px] font-black transition ${
                    subjectFilter === subject
                      ? "bg-[#42d4bc] text-black"
                      : "bg-black/[0.04] text-black/45 hover:bg-black/[0.07]"
                  }`}
                >
                  {subject}
                </button>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Weekly view */}
        {view === "week" && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 grid gap-4 lg:grid-cols-[280px_minmax(0,1fr)]"
          >
            {/* Day selector */}
            <div className="tq-glass h-fit rounded-[28px] p-4 shadow-xl shadow-black/[0.03]">
              <div className="px-2 pb-3">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-black/30">
                  Week
                </p>

                <p className="mt-1 text-lg font-black">
                  September 07–13
                </p>
              </div>

              <div className="space-y-1.5">
                {weekDays.map((day) => {
                  const count = scheduleData.filter(
                    (item) => item.day === day && item.status === "Upcoming"
                  ).length;

                  const active = selectedDay === day;

                  return (
                    <button
                      key={day}
                      onClick={() => setSelectedDay(day)}
                      className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left transition ${
                        active
                          ? "bg-black text-white"
                          : "text-black/55 hover:bg-black/[0.04]"
                      }`}
                    >
                      <div>
                        <p className="text-xs font-black">{day}</p>

                        <p
                          className={`mt-0.5 text-[10px] ${
                            active ? "text-white/40" : "text-black/30"
                          }`}
                        >
                          {count === 0
                            ? "No upcoming class"
                            : `${count} class${count > 1 ? "es" : ""}`}
                        </p>
                      </div>

                      {count > 0 && (
                        <span
                          className={`flex h-7 w-7 items-center justify-center rounded-lg text-[10px] font-black ${
                            active
                              ? "bg-[#42d4bc] text-black"
                              : "bg-[#42d4bc]/10 text-[#0b9079]"
                          }`}
                        >
                          {count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Day schedule */}
            <div className="tq-glass rounded-[28px] p-5 shadow-xl shadow-black/[0.03] sm:p-6">
              <div className="flex flex-col gap-2 border-b border-black/5 pb-5 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-black/30">
                    Selected day
                  </p>

                  <h2 className="mt-1 text-2xl font-black tracking-[-0.03em]">
                    {selectedDay}
                  </h2>
                </div>

                <span className="text-xs font-bold text-black/35">
                  {dayClasses.length} scheduled
                </span>
              </div>

              <div className="mt-6">
                {dayClasses.length > 0 ? (
                  <div className="space-y-4">
                    {dayClasses.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.06 }}
                        className="grid gap-4 sm:grid-cols-[95px_minmax(0,1fr)_auto] sm:items-center"
                      >
                        <div className="rounded-2xl bg-black/[0.035] p-3 text-center sm:text-left">
                          <p className="text-xs font-black">
                            {item.time}
                          </p>

                          <p className="mt-1 text-[10px] text-black/35">
                            {item.duration}
                          </p>
                        </div>

                        <div className="rounded-2xl border border-black/[0.05] bg-white/50 p-4">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex min-w-0 items-center gap-3">
                              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-black text-xs font-black text-white">
                                {item.initials}
                              </div>

                              <div className="min-w-0">
                                <div className="flex flex-wrap items-center gap-2">
                                  <p className="text-sm font-black">
                                    {item.subject}
                                  </p>

                                  <span
                                    className={`rounded-full px-2.5 py-1 text-[9px] font-black ${typeClasses(
                                      item.type
                                    )}`}
                                  >
                                    {item.type}
                                  </span>
                                </div>

                                <p className="mt-1 text-xs text-black/45">
                                  {item.chapter}
                                </p>

                                <p className="mt-1 text-[10px] text-black/30">
                                  with {item.tutor}
                                </p>
                              </div>
                            </div>

                            <span
                              className={`hidden rounded-full px-2.5 py-1 text-[9px] font-black sm:block ${
                                item.status === "Upcoming"
                                  ? "bg-blue-500/10 text-blue-700"
                                  : "bg-black/[0.05] text-black/40"
                              }`}
                            >
                              {item.status}
                            </span>
                          </div>
                        </div>

                        <div className="sm:text-right">
                          {item.status === "Upcoming" &&
                          item.type === "Live Class" ? (
                            <Link
                              href="/student/live-class"
                              className="inline-flex rounded-xl bg-black px-4 py-2.5 text-[10px] font-black text-white transition hover:-translate-y-0.5"
                            >
                              Join
                            </Link>
                          ) : (
                            <button className="inline-flex rounded-xl bg-black/[0.05] px-4 py-2.5 text-[10px] font-black text-black/50">
                              Details
                            </button>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-2xl bg-black/[0.025] p-10 text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-black/[0.04] text-black/30">
                      <svg
                        viewBox="0 0 24 24"
                        className="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.7"
                      >
                        <rect
                          x="3"
                          y="4"
                          width="18"
                          height="17"
                          rx="3"
                        />
                        <path
                          strokeLinecap="round"
                          d="M8 2v4M16 2v4M3 9h18"
                        />
                      </svg>
                    </div>

                    <p className="mt-4 text-sm font-black">
                      No classes scheduled
                    </p>

                    <p className="mt-1 text-xs text-black/40">
                      You have a free day. Use it to revise your lessons.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.section>
        )}

        {/* List view */}
        {view === "list" && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="tq-glass mt-4 rounded-[28px] p-5 shadow-xl shadow-black/[0.03] sm:p-6"
          >
            <div className="flex items-end justify-between border-b border-black/5 pb-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-black/30">
                  Schedule
                </p>

                <h2 className="mt-1 text-2xl font-black tracking-[-0.03em]">
                  All sessions
                </h2>
              </div>

              <span className="text-xs font-bold text-black/35">
                {filteredList.length} sessions
              </span>
            </div>

            <div className="mt-5 space-y-3">
              {filteredList.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.04 }}
                  className="grid gap-4 rounded-2xl bg-black/[0.025] p-4 sm:grid-cols-[85px_1fr_auto] sm:items-center"
                >
                  <div className="flex h-14 w-14 flex-col justify-center rounded-2xl bg-black text-center text-white">
                    <span className="text-[8px] font-bold uppercase tracking-wider text-white/35">
                      Sep
                    </span>

                    <span className="text-xl font-black">
                      {item.shortDate}
                    </span>
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-black">
                        {item.subject}
                      </p>

                      <span
                        className={`rounded-full px-2.5 py-1 text-[9px] font-black ${typeClasses(
                          item.type
                        )}`}
                      >
                        {item.type}
                      </span>

                      <span
                        className={`rounded-full px-2.5 py-1 text-[9px] font-black ${
                          item.status === "Upcoming"
                            ? "bg-blue-500/10 text-blue-700"
                            : "bg-black/[0.05] text-black/40"
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>

                    <p className="mt-1 text-xs text-black/45">
                      {item.chapter}
                    </p>

                    <div className="mt-2 flex flex-wrap gap-3 text-[10px] font-bold text-black/35">
                      <span>{item.day}</span>
                      <span>•</span>
                      <span>{item.time}</span>
                      <span>•</span>
                      <span>{item.duration}</span>
                      <span>•</span>
                      <span>{item.tutor}</span>
                    </div>
                  </div>

                  {item.status === "Upcoming" &&
                  item.type === "Live Class" ? (
                    <Link
                      href="/student/live-class"
                      className="rounded-xl bg-black px-4 py-2.5 text-center text-[10px] font-black text-white transition hover:-translate-y-0.5"
                    >
                      Join
                    </Link>
                  ) : (
                    <button className="rounded-xl bg-black/[0.05] px-4 py-2.5 text-[10px] font-black text-black/50">
                      Details
                    </button>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Weekly overview */}
        <section className="mt-4 grid gap-4 md:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="tq-glass rounded-[24px] p-5 shadow-lg shadow-black/[0.025]"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#42d4bc]/10 text-[#0b9079]">
              ◷
            </div>

            <p className="mt-4 text-sm font-black">
              Consistent schedule
            </p>

            <p className="mt-1 text-xs leading-5 text-black/40">
              Your weekday classes are mostly scheduled between 5:30 PM and
              6:00 PM.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.06 }}
            className="tq-glass rounded-[24px] p-5 shadow-lg shadow-black/[0.025]"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black/[0.04] text-black/60">
              6
            </div>

            <p className="mt-4 text-sm font-black">
              Classes this week
            </p>

            <p className="mt-1 text-xs leading-5 text-black/40">
              Six planned learning sessions are currently visible in your
              weekly schedule.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
            className="tq-glass rounded-[24px] p-5 shadow-lg shadow-black/[0.025]"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-700">
              ↑
            </div>

            <p className="mt-4 text-sm font-black">
              Stay prepared
            </p>

            <p className="mt-1 text-xs leading-5 text-black/40">
              Review homework and previous class notes before your next live
              session.
            </p>
          </motion.div>
        </section>
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