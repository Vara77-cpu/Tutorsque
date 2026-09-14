"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const boards = ["All Boards", "AP State Board", "CBSE"];
const classes = [
  "All Classes",
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
  "All Subjects",
  "Mathematics",
  "Science",
  "English",
  "Telugu",
  "Hindi",
  "Social Studies",
];

const tutors = [
  {
    id: 1,
    name: "Priya Sharma",
    subject: "Mathematics",
    board: "CBSE",
    classes: ["8th Class", "9th Class", "10th Class"],
    experience: "8 years",
    rating: 4.9,
    students: 124,
    price: "₹299",
    tag: "Top Rated",
    initials: "PS",
    accent: "from-cyan-400 to-emerald-300",
    availability: "Today · 6:00 PM",
  },
  {
    id: 2,
    name: "Ravi Kumar",
    subject: "Science",
    board: "AP State Board",
    classes: ["6th Class", "7th Class", "8th Class", "9th Class"],
    experience: "7 years",
    rating: 4.8,
    students: 98,
    price: "₹249",
    tag: "Popular",
    initials: "RK",
    accent: "from-sky-400 to-cyan-300",
    availability: "Today · 7:00 PM",
  },
  {
    id: 3,
    name: "Ananya Reddy",
    subject: "English",
    board: "CBSE",
    classes: ["5th Class", "6th Class", "7th Class", "8th Class"],
    experience: "6 years",
    rating: 4.9,
    students: 87,
    price: "₹229",
    tag: "Highly Rated",
    initials: "AR",
    accent: "from-violet-400 to-cyan-300",
    availability: "Tomorrow · 5:30 PM",
  },
  {
    id: 4,
    name: "Suresh Babu",
    subject: "Mathematics",
    board: "AP State Board",
    classes: ["9th Class", "10th Class"],
    experience: "11 years",
    rating: 5.0,
    students: 156,
    price: "₹349",
    tag: "Expert",
    initials: "SB",
    accent: "from-emerald-400 to-teal-300",
    availability: "Today · 8:00 PM",
  },
  {
    id: 5,
    name: "Lakshmi Devi",
    subject: "Telugu",
    board: "AP State Board",
    classes: ["1st Class", "2nd Class", "3rd Class", "4th Class", "5th Class"],
    experience: "9 years",
    rating: 4.9,
    students: 112,
    price: "₹199",
    tag: "Popular",
    initials: "LD",
    accent: "from-orange-300 to-amber-200",
    availability: "Tomorrow · 6:00 PM",
  },
  {
    id: 6,
    name: "Arjun Mehta",
    subject: "Social Studies",
    board: "CBSE",
    classes: ["7th Class", "8th Class", "9th Class", "10th Class"],
    experience: "5 years",
    rating: 4.8,
    students: 73,
    price: "₹219",
    tag: "Recommended",
    initials: "AM",
    accent: "from-indigo-400 to-sky-300",
    availability: "Today · 6:30 PM",
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

function SearchIcon() {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="11"
        cy="11"
        r="6.5"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M16 16L21 21"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2.7l2.84 5.75 6.35.92-4.6 4.48 1.09 6.32L12 17.18l-5.68 2.99 1.09-6.32-4.6-4.48 6.35-.92L12 2.7z" />
    </svg>
  );
}

function VerifiedIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 3.5l2.05 1.6 2.6-.1.92 2.42 2.15 1.45-.82 2.48.82 2.48-2.15 1.45-.92 2.42-2.6-.1L12 20.5l-2.05-1.6-2.6.1-.92-2.42-2.15-1.45.82-2.48-.82-2.48 2.15-1.45.92-2.42 2.6.1L12 3.5z"
        fill="currentColor"
      />
      <path
        d="M8.8 12.1l2.15 2.15 4.3-4.45"
        stroke="white"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function FindTutorsPage() {
  const [search, setSearch] = useState("");
  const [selectedBoard, setSelectedBoard] = useState("All Boards");
  const [selectedClass, setSelectedClass] = useState("All Classes");
  const [selectedSubject, setSelectedSubject] = useState("All Subjects");

  const filteredTutors = useMemo(() => {
    return tutors.filter((tutor) => {
      const normalizedSearch = search.toLowerCase().trim();

      const matchesSearch =
        !normalizedSearch ||
        tutor.name.toLowerCase().includes(normalizedSearch) ||
        tutor.subject.toLowerCase().includes(normalizedSearch) ||
        tutor.board.toLowerCase().includes(normalizedSearch);

      const matchesBoard =
        selectedBoard === "All Boards" || tutor.board === selectedBoard;

      const matchesClass =
        selectedClass === "All Classes" ||
        tutor.classes.includes(selectedClass);

      const matchesSubject =
        selectedSubject === "All Subjects" ||
        tutor.subject === selectedSubject;

      return (
        matchesSearch &&
        matchesBoard &&
        matchesClass &&
        matchesSubject
      );
    });
  }, [search, selectedBoard, selectedClass, selectedSubject]);

  return (
    <main className="min-h-screen overflow-hidden bg-[#f5f8f7] text-[#111111]">
      {/* Background atmosphere */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[-160px] top-[120px] h-[420px] w-[420px] rounded-full bg-[#42d4bc]/10 blur-[100px]" />
        <div className="absolute right-[-120px] top-[320px] h-[360px] w-[360px] rounded-full bg-cyan-200/20 blur-[100px]" />
        <div className="absolute bottom-[-160px] left-[35%] h-[400px] w-[400px] rounded-full bg-emerald-100/20 blur-[110px]" />
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
              className="text-[15px] font-semibold text-[#25b59e]"
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
              className="rounded-full bg-[#42d4bc] px-5 py-2.5 text-[14px] font-semibold text-black shadow-[0_8px_25px_rgba(66,212,188,0.2)] transition hover:-translate-y-0.5 hover:bg-[#32c8af]"
            >
              Get started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative">
        <div className="mx-auto max-w-[1440px] px-5 pb-14 pt-16 sm:px-8 sm:pt-20 lg:px-12 lg:pb-20 lg:pt-24">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-[760px]"
            >
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/65 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-black/55 shadow-sm backdrop-blur-xl">
                <span className="h-2 w-2 rounded-full bg-[#42d4bc] shadow-[0_0_14px_rgba(66,212,188,0.8)]" />
                Verified tutors
              </div>

              <h1 className="text-[50px] font-semibold leading-[0.97] tracking-[-0.07em] sm:text-[67px] lg:text-[78px]">
                Find the right
                <span className="block">teacher for you.</span>
              </h1>

              <p className="mt-7 max-w-[650px] text-[18px] leading-8 text-black/55 sm:text-[20px]">
                Discover trusted teachers for Classes 1–10, matched to your
                board, class, subject and learning needs.
              </p>

              {/* Search */}
              <div className="tq-glass mt-9 flex max-w-[680px] items-center gap-3 rounded-[22px] p-2.5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[15px] bg-black text-white">
                  <SearchIcon />
                </div>

                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search by tutor, subject or board..."
                  className="min-w-0 flex-1 bg-transparent px-1 text-[15px] outline-none placeholder:text-black/35"
                />

                <button
                  type="button"
                  className="hidden h-12 shrink-0 rounded-[15px] bg-[#42d4bc] px-5 text-sm font-semibold sm:block"
                >
                  Search
                </button>
              </div>

              <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-[13px] font-medium text-black/45">
                <span>✓ Board-specific tutors</span>
                <span>✓ Verified profiles</span>
                <span>✓ Live online classes</span>
              </div>
            </motion.div>

            {/* Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="relative mx-auto w-full max-w-[560px]"
            >
              <div className="absolute right-[-10px] top-[-15px] h-44 w-44 rounded-full bg-[#42d4bc]/20 blur-3xl" />
              <div className="absolute bottom-[-30px] left-[-20px] h-48 w-48 rounded-full bg-cyan-200/30 blur-3xl" />

              <div className="tq-depth relative overflow-hidden rounded-[36px] border border-white/80 bg-white/45 p-3 backdrop-blur-2xl">
                <div className="relative min-h-[470px] overflow-hidden rounded-[28px] bg-[radial-gradient(circle_at_70%_20%,rgba(255,255,255,0.85),transparent_28%),linear-gradient(145deg,#dffaf4,#eef7f5_45%,#d6ece8)]">
                  <div className="absolute right-[-70px] top-[-70px] h-64 w-64 rounded-full border border-white/70 bg-white/20 blur-[1px]" />
                  <div className="absolute bottom-[-90px] left-[-60px] h-72 w-72 rounded-full border border-white/60 bg-white/20" />

                  <motion.div
                    animate={{ y: [0, -12, 0], rotate: [0, 2, 0] }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute left-[14%] top-[13%] h-24 w-24 rounded-[26px] border border-white/80 bg-white/45 shadow-xl backdrop-blur-xl"
                  />

                  <motion.div
                    animate={{ y: [0, 14, 0], rotate: [0, -2, 0] }}
                    transition={{
                      duration: 7,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute right-[13%] top-[17%] flex h-20 w-20 items-center justify-center rounded-full border border-white/80 bg-[#42d4bc]/25 text-black/70 shadow-lg backdrop-blur-xl"
                  >
                    <div className="h-9 w-9 rounded-full border-[3px] border-black/15" />
                  </motion.div>

                  <div className="absolute left-[10%] right-[10%] top-[24%]">
                    <div className="tq-glass rounded-[26px] p-5 shadow-2xl">
                      <div className="flex items-center gap-4">
                        <div className="flex h-16 w-16 items-center justify-center rounded-[20px] bg-gradient-to-br from-[#42d4bc] to-[#baf4e8] text-lg font-bold text-black">
                          PS
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-semibold">Priya Sharma</p>
                            <span className="text-[#20b49c]">
                              <VerifiedIcon />
                            </span>
                          </div>

                          <p className="mt-1 text-sm text-black/50">
                            Mathematics · CBSE
                          </p>
                        </div>
                      </div>

                      <div className="mt-5 flex flex-wrap gap-2">
                        <span className="rounded-full bg-white/75 px-3 py-1.5 text-xs font-medium">
                          10th Class
                        </span>
                        <span className="rounded-full bg-white/75 px-3 py-1.5 text-xs font-medium">
                          8 yrs experience
                        </span>
                        <span className="rounded-full bg-white/75 px-3 py-1.5 text-xs font-medium">
                          Live classes
                        </span>
                      </div>

                      <div className="mt-5 flex items-center justify-between border-t border-black/8 pt-4">
                        <div className="flex items-center gap-1 text-sm font-semibold">
                          <span className="text-amber-500">
                            <StarIcon />
                          </span>
                          4.9
                        </div>

                        <span className="text-xs text-black/45">
                          124 students learning
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="absolute bottom-[11%] left-[10%] rounded-[20px] border border-white/80 bg-black px-4 py-3 text-white shadow-xl">
                    <p className="text-[10px] uppercase tracking-[0.14em] text-white/45">
                      Live
                    </p>
                    <p className="mt-1 text-sm font-semibold">
                      10th Maths · 6:00 PM
                    </p>
                  </div>

                  <div className="absolute bottom-[12%] right-[10%] rounded-[18px] border border-white/80 bg-white/75 px-4 py-3 shadow-xl backdrop-blur-xl">
                    <p className="text-xs font-semibold">4.9 / 5.0</p>
                    <p className="mt-1 text-[10px] text-black/45">
                      Parent rating
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="border-y border-black/[0.06] bg-white/60">
        <div className="mx-auto max-w-[1440px] px-5 py-6 sm:px-8 lg:px-12">
          <div className="grid gap-3 md:grid-cols-3">
            <select
              value={selectedBoard}
              onChange={(event) => setSelectedBoard(event.target.value)}
              className="tq-glass h-14 rounded-[16px] px-4 text-sm font-medium outline-none"
            >
              {boards.map((board) => (
                <option key={board}>{board}</option>
              ))}
            </select>

            <select
              value={selectedClass}
              onChange={(event) => setSelectedClass(event.target.value)}
              className="tq-glass h-14 rounded-[16px] px-4 text-sm font-medium outline-none"
            >
              {classes.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>

            <select
              value={selectedSubject}
              onChange={(event) => setSelectedSubject(event.target.value)}
              className="tq-glass h-14 rounded-[16px] px-4 text-sm font-medium outline-none"
            >
              {subjects.map((subject) => (
                <option key={subject}>{subject}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Tutor results */}
      <section className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-black/40">
              Tutor directory
            </p>

            <h2 className="mt-3 text-[38px] font-semibold tracking-[-0.055em] sm:text-[50px]">
              Teachers who match you.
            </h2>
          </div>

          <p className="text-sm text-black/45">
            {filteredTutors.length} tutor
            {filteredTutors.length === 1 ? "" : "s"} found
          </p>
        </div>

        {filteredTutors.length > 0 ? (
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredTutors.map((tutor, index) => (
              <motion.article
                key={tutor.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
                className="tq-hover tq-glass group rounded-[30px] p-4"
              >
                <div className="relative overflow-hidden rounded-[23px] bg-[#eef5f3] p-5">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${tutor.accent} opacity-[0.14]`}
                  />

                  <div className="relative flex items-start justify-between">
                    <div
                      className={`flex h-[72px] w-[72px] items-center justify-center rounded-[24px] bg-gradient-to-br ${tutor.accent} text-[20px] font-bold shadow-lg`}
                    >
                      {tutor.initials}
                    </div>

                    <span className="rounded-full border border-white/80 bg-white/65 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] backdrop-blur-xl">
                      {tutor.tag}
                    </span>
                  </div>

                  <div className="relative mt-6">
                    <div className="flex items-center gap-2">
                      <h3 className="text-[22px] font-semibold tracking-[-0.04em]">
                        {tutor.name}
                      </h3>
                      <span className="text-[#20b49c]">
                        <VerifiedIcon />
                      </span>
                    </div>

                    <p className="mt-1 text-sm text-black/50">
                      {tutor.subject} · {tutor.board}
                    </p>
                  </div>

                  <div className="relative mt-5 flex items-center gap-2 text-sm">
                    <span className="text-amber-500">
                      <StarIcon />
                    </span>
                    <span className="font-semibold">{tutor.rating}</span>
                    <span className="text-black/40">
                      · {tutor.students} students
                    </span>
                  </div>

                  <div className="relative mt-5 flex flex-wrap gap-2">
                    {tutor.classes.slice(0, 3).map((className) => (
                      <span
                        key={className}
                        className="rounded-full border border-white/70 bg-white/55 px-3 py-1.5 text-[11px] font-medium backdrop-blur-xl"
                      >
                        {className}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="px-2 pb-2 pt-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-black/35">
                        From
                      </p>
                      <p className="mt-1 text-[19px] font-semibold">
                        {tutor.price}
                        <span className="text-xs font-medium text-black/40">
                          {" "}
                          / class
                        </span>
                      </p>
                    </div>

                    <span className="rounded-full bg-[#edfaf7] px-3 py-1.5 text-[11px] font-semibold text-[#169b86]">
                      {tutor.availability}
                    </span>
                  </div>

                  <Link
                    href={`/find-tutors/${tutor.id}`}
                    className="mt-5 flex h-12 items-center justify-center gap-2 rounded-[15px] bg-black text-sm font-semibold text-white transition group-hover:bg-[#42d4bc] group-hover:text-black"
                  >
                    View tutor
                    <ArrowIcon />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        ) : (
          <div className="tq-glass mt-10 rounded-[28px] p-12 text-center">
            <h3 className="text-2xl font-semibold">No tutors found</h3>
            <p className="mt-3 text-sm text-black/50">
              Try changing your board, class, subject or search.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearch("");
                setSelectedBoard("All Boards");
                setSelectedClass("All Classes");
                setSelectedSubject("All Subjects");
              }}
              className="mt-6 rounded-full bg-black px-6 py-3 text-sm font-semibold text-white"
            >
              Reset filters
            </button>
          </div>
        )}
      </section>

      {/* Bottom CTA */}
      <section className="px-5 pb-20 sm:px-8 lg:px-12 lg:pb-28">
        <div className="mx-auto max-w-[1440px]">
          <div className="relative overflow-hidden rounded-[34px] bg-black px-6 py-12 text-white sm:px-10 lg:px-14 lg:py-16">
            <div className="absolute right-[-80px] top-[-100px] h-72 w-72 rounded-full bg-[#42d4bc]/20 blur-3xl" />
            <div className="absolute bottom-[-120px] left-[30%] h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />

            <div className="relative max-w-[760px]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#42d4bc]">
                TutorsQue
              </p>

              <h2 className="mt-4 text-[40px] font-semibold leading-[1.02] tracking-[-0.055em] sm:text-[56px]">
                Great teachers make
                <span className="block">great learners.</span>
              </h2>

              <p className="mt-5 max-w-[620px] text-[16px] leading-7 text-white/55">
                Choose a tutor, start learning live and follow your progress
                from one place.
              </p>

              <Link
                href="/signup"
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