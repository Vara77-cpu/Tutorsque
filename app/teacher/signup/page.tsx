"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const subjects = [
  "Mathematics",
  "Science",
  "English",
  "Telugu",
  "Hindi",
  "Social Studies",
];

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

function ShieldIcon() {
  return (
    <svg
      width="21"
      height="21"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 3l7 3v5.5c0 4.5-2.9 7.7-7 9.5-4.1-1.8-7-5-7-9.5V6l7-3z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M8.5 12l2.2 2.2 4.8-4.9"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function TeacherSignupPage() {
  const [submitted, setSubmitted] = useState(false);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [qualification, setQualification] = useState("");
  const [experience, setExperience] = useState("");
  const [board, setBoard] = useState("");
  const [subject, setSubject] = useState("");
  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
  const [agree, setAgree] = useState(false);

  function toggleClass(className: string) {
    setSelectedClasses((current) =>
      current.includes(className)
        ? current.filter((item) => item !== className)
        : [...current, className],
    );
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (
      !fullName ||
      !phone ||
      !email ||
      !qualification ||
      !experience ||
      !board ||
      !subject ||
      selectedClasses.length === 0 ||
      !agree
    ) {
      return;
    }

    setSubmitted(true);
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#f4f8f7] text-[#111111]">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <motion.div
          animate={{ x: [0, 35, 0], y: [0, -20, 0] }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-[-150px] top-[100px] h-[440px] w-[440px] rounded-full bg-[#42d4bc]/12 blur-[110px]"
        />

        <motion.div
          animate={{ x: [0, -25, 0], y: [0, 25, 0] }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute right-[-130px] top-[180px] h-[430px] w-[430px] rounded-full bg-cyan-200/20 blur-[110px]"
        />

        <div className="absolute bottom-[-180px] left-[35%] h-[430px] w-[430px] rounded-full bg-emerald-100/25 blur-[120px]" />
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
              className="text-[15px] font-medium text-black/70 transition hover:text-[#25b59e]"
            >
              How it works
            </Link>

            <Link
              href="/teacher/signup"
              className="text-[15px] font-semibold text-[#25b59e]"
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

      {/* Page */}
      <section>
        <div className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            {/* Left information panel */}
            <motion.div
              initial={{ opacity: 0, x: -25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="lg:sticky lg:top-[105px]"
            >
              <div className="tq-depth relative overflow-hidden rounded-[34px] border border-white/80 bg-black p-6 text-white sm:p-8">
                <div className="absolute right-[-80px] top-[-90px] h-64 w-64 rounded-full bg-[#42d4bc]/20 blur-3xl" />
                <div className="absolute bottom-[-100px] left-[25%] h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl" />

                <div className="relative">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-white/50">
                    <span className="h-2 w-2 rounded-full bg-[#42d4bc]" />
                    Teach with TutorsQue
                  </div>

                  <h1 className="mt-7 text-[46px] font-semibold leading-[0.98] tracking-[-0.065em] sm:text-[60px]">
                    Your teaching
                    <span className="block text-[#42d4bc]">
                      can go further.
                    </span>
                  </h1>

                  <p className="mt-6 max-w-[500px] text-[16px] leading-7 text-white/50">
                    Join TutorsQue and teach students through structured live
                    online tuition built around their class, subject and board.
                  </p>

                  <div className="mt-8 space-y-3">
                    {[
                      "Teach students who match your expertise",
                      "Flexible after-school teaching opportunities",
                      "Verified classes and attendance records",
                      "Weekly earnings based on completed classes",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-3 rounded-[17px] border border-white/8 bg-white/[0.05] px-4 py-3.5"
                      >
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#42d4bc]/15 text-[#42d4bc]">
                          <CheckIcon />
                        </span>

                        <span className="text-sm text-white/70">{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 rounded-[22px] border border-white/10 bg-white/[0.06] p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.14em] text-white/35">
                          TutorsQue model
                        </p>
                        <p className="mt-2 text-lg font-semibold">
                          Completed class → Earnings
                        </p>
                      </div>

                      <div className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-[#42d4bc]/15 text-[#42d4bc]">
                        <ShieldIcon />
                      </div>
                    </div>

                    <div className="mt-4 h-px bg-white/10" />

                    <p className="mt-4 text-xs leading-5 text-white/40">
                      Your earnings are tracked against verified completed
                      classes for transparent weekly payouts.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Application form */}
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.05 }}
              className="tq-glass rounded-[34px] p-5 sm:p-7 lg:p-9"
            >
              {!submitted ? (
                <>
                  <div className="border-b border-black/[0.06] pb-7">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.17em] text-black/40">
                      Tutor application
                    </p>

                    <h2 className="mt-3 text-[36px] font-semibold tracking-[-0.055em] sm:text-[46px]">
                      Tell us about yourself.
                    </h2>

                    <p className="mt-3 max-w-[620px] text-sm leading-6 text-black/50">
                      Submit your basic details and teaching preferences. The
                      verification process will happen before you start taking
                      classes.
                    </p>
                  </div>

                  <form
                    onSubmit={handleSubmit}
                    className="mt-8 space-y-8"
                  >
                    {/* Personal details */}
                    <div>
                      <div className="mb-5">
                        <p className="text-sm font-semibold">
                          Personal details
                        </p>

                        <p className="mt-1 text-xs text-black/40">
                          Basic information for your tutor profile.
                        </p>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <label className="block sm:col-span-2">
                          <span className="mb-2 block text-xs font-semibold text-black/60">
                            Full name
                          </span>

                          <input
                            value={fullName}
                            onChange={(event) =>
                              setFullName(event.target.value)
                            }
                            required
                            placeholder="Enter your full name"
                            className="tq-glass h-13 w-full rounded-[15px] border-black/5 bg-white/55 px-4 text-sm outline-none transition focus:border-[#42d4bc]"
                          />
                        </label>

                        <label className="block">
                          <span className="mb-2 block text-xs font-semibold text-black/60">
                            Phone number
                          </span>

                          <input
                            value={phone}
                            onChange={(event) => setPhone(event.target.value)}
                            required
                            type="tel"
                            placeholder="+91 XXXXX XXXXX"
                            className="tq-glass h-13 w-full rounded-[15px] border-black/5 bg-white/55 px-4 text-sm outline-none transition focus:border-[#42d4bc]"
                          />
                        </label>

                        <label className="block">
                          <span className="mb-2 block text-xs font-semibold text-black/60">
                            Email address
                          </span>

                          <input
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            required
                            type="email"
                            placeholder="you@example.com"
                            className="tq-glass h-13 w-full rounded-[15px] border-black/5 bg-white/55 px-4 text-sm outline-none transition focus:border-[#42d4bc]"
                          />
                        </label>
                      </div>
                    </div>

                    {/* Qualifications */}
                    <div className="border-t border-black/[0.06] pt-8">
                      <div className="mb-5">
                        <p className="text-sm font-semibold">
                          Teaching profile
                        </p>

                        <p className="mt-1 text-xs text-black/40">
                          Tell us what you can teach and your experience.
                        </p>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <label className="block">
                          <span className="mb-2 block text-xs font-semibold text-black/60">
                            Highest qualification
                          </span>

                          <input
                            value={qualification}
                            onChange={(event) =>
                              setQualification(event.target.value)
                            }
                            required
                            placeholder="e.g. B.Ed, M.Sc, B.Tech"
                            className="tq-glass h-13 w-full rounded-[15px] border-black/5 bg-white/55 px-4 text-sm outline-none transition focus:border-[#42d4bc]"
                          />
                        </label>

                        <label className="block">
                          <span className="mb-2 block text-xs font-semibold text-black/60">
                            Teaching experience
                          </span>

                          <select
                            value={experience}
                            onChange={(event) =>
                              setExperience(event.target.value)
                            }
                            required
                            className="tq-glass h-13 w-full rounded-[15px] border-black/5 bg-white/55 px-4 text-sm outline-none transition focus:border-[#42d4bc]"
                          >
                            <option value="">Select experience</option>
                            <option value="0-1">0–1 years</option>
                            <option value="2-3">2–3 years</option>
                            <option value="4-6">4–6 years</option>
                            <option value="7-10">7–10 years</option>
                            <option value="10+">10+ years</option>
                          </select>
                        </label>

                        <label className="block">
                          <span className="mb-2 block text-xs font-semibold text-black/60">
                            Board
                          </span>

                          <select
                            value={board}
                            onChange={(event) => setBoard(event.target.value)}
                            required
                            className="tq-glass h-13 w-full rounded-[15px] border-black/5 bg-white/55 px-4 text-sm outline-none transition focus:border-[#42d4bc]"
                          >
                            <option value="">Select board</option>
                            {boards.map((item) => (
                              <option key={item}>{item}</option>
                            ))}
                          </select>
                        </label>

                        <label className="block">
                          <span className="mb-2 block text-xs font-semibold text-black/60">
                            Main subject
                          </span>

                          <select
                            value={subject}
                            onChange={(event) =>
                              setSubject(event.target.value)
                            }
                            required
                            className="tq-glass h-13 w-full rounded-[15px] border-black/5 bg-white/55 px-4 text-sm outline-none transition focus:border-[#42d4bc]"
                          >
                            <option value="">Select subject</option>
                            {subjects.map((item) => (
                              <option key={item}>{item}</option>
                            ))}
                          </select>
                        </label>
                      </div>
                    </div>

                    {/* Classes */}
                    <div className="border-t border-black/[0.06] pt-8">
                      <div className="mb-5">
                        <p className="text-sm font-semibold">
                          Classes you can teach
                        </p>

                        <p className="mt-1 text-xs text-black/40">
                          Select one or more classes.
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2.5">
                        {classes.map((className) => {
                          const active = selectedClasses.includes(className);

                          return (
                            <button
                              key={className}
                              type="button"
                              onClick={() => toggleClass(className)}
                              className={`rounded-full border px-4 py-2.5 text-xs font-semibold transition ${
                                active
                                  ? "border-[#42d4bc] bg-[#42d4bc]/20 text-[#128c79]"
                                  : "border-black/10 bg-white/50 text-black/55 hover:border-black/20 hover:bg-white"
                              }`}
                            >
                              {className}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Verification note */}
                    <div className="border-t border-black/[0.06] pt-8">
                      <div className="rounded-[21px] border border-[#42d4bc]/20 bg-[#42d4bc]/8 p-5">
                        <div className="flex items-start gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[13px] bg-[#42d4bc]/15 text-[#159b87]">
                            <ShieldIcon />
                          </div>

                          <div>
                            <p className="text-sm font-semibold">
                              Verification comes first
                            </p>

                            <p className="mt-1 text-xs leading-5 text-black/45">
                              TutorsQue reviews tutor applications and
                              supporting documents before approving teachers
                              for live classes.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Agreement */}
                    <label className="flex cursor-pointer items-start gap-3">
                      <input
                        type="checkbox"
                        checked={agree}
                        onChange={(event) => setAgree(event.target.checked)}
                        required
                        className="mt-1 h-4 w-4 accent-[#42d4bc]"
                      />

                      <span className="text-xs leading-5 text-black/50">
                        I confirm that the information provided is accurate
                        and agree to the TutorsQue tutor verification process.
                      </span>
                    </label>

                    <button
                      type="submit"
                      className="flex h-14 w-full items-center justify-center gap-3 rounded-[16px] bg-black px-6 text-sm font-semibold text-white shadow-[0_15px_35px_rgba(0,0,0,0.12)] transition hover:-translate-y-0.5 hover:bg-[#42d4bc] hover:text-black"
                    >
                      Submit tutor application
                      <ArrowIcon />
                    </button>

                    <p className="text-center text-[11px] leading-5 text-black/35">
                      This is currently a frontend application flow. Backend
                      verification, documents and account creation will be
                      connected to the TutorsQue API later.
                    </p>
                  </form>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex min-h-[680px] flex-col items-center justify-center text-center"
                >
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#42d4bc]/20 text-[#159b87]">
                    <CheckIcon />
                  </div>

                  <p className="mt-7 text-[11px] font-semibold uppercase tracking-[0.17em] text-black/40">
                    Application received
                  </p>

                  <h2 className="mt-3 max-w-[560px] text-[40px] font-semibold leading-[1.02] tracking-[-0.055em] sm:text-[52px]">
                    Thanks, {fullName.split(" ")[0] || "Teacher"}.
                  </h2>

                  <p className="mt-5 max-w-[520px] text-sm leading-6 text-black/50">
                    Your tutor application has been captured successfully.
                    The next stage is teacher verification before live classes
                    can be assigned.
                  </p>

                  <div className="mt-8 rounded-[22px] border border-black/[0.06] bg-white/55 px-6 py-5 text-left">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-black/35">
                      Selected teaching profile
                    </p>

                    <div className="mt-3 space-y-2 text-sm">
                      <p>
                        <span className="text-black/40">Subject:</span>{" "}
                        <span className="font-semibold">{subject}</span>
                      </p>

                      <p>
                        <span className="text-black/40">Board:</span>{" "}
                        <span className="font-semibold">{board}</span>
                      </p>

                      <p>
                        <span className="text-black/40">Classes:</span>{" "}
                        <span className="font-semibold">
                          {selectedClasses.join(", ")}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <Link
                      href="/"
                      className="inline-flex h-12 items-center justify-center rounded-[15px] border border-black/10 bg-white px-6 text-sm font-semibold"
                    >
                      Back to home
                    </Link>

                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="inline-flex h-12 items-center justify-center rounded-[15px] bg-black px-6 text-sm font-semibold text-white"
                    >
                      Edit application
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      <footer className="border-t border-black/[0.06] px-5 py-8 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-4 text-sm text-black/45 sm:flex-row">
          <p>© {new Date().getFullYear()} TutorsQue</p>
          <p>Teach · Inspire · Grow</p>
        </div>
      </footer>
    </main>
  );
}