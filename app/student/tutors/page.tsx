"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

type Tutor = {
  id: number;
  name: string;
  initials: string;
  subject: string;
  secondarySubjects: string[];
  board: string;
  classes: string[];
  experience: string;
  rating: number;
  reviews: number;
  students: number;
  price: number;
  availability: string;
  tag: string;
  accent: string;
};

const tutors: Tutor[] = [
  {
    id: 1,
    name: "Priya Sharma",
    initials: "PS",
    subject: "Mathematics",
    secondarySubjects: ["Science"],
    board: "CBSE",
    classes: ["6th Class", "7th Class", "8th Class", "9th Class", "10th Class"],
    experience: "8 years",
    rating: 4.9,
    reviews: 124,
    students: 86,
    price: 299,
    availability: "Today · 6:00 PM",
    tag: "Top Rated",
    accent: "from-cyan-300 to-emerald-300",
  },
  {
    id: 2,
    name: "Ravi Kumar",
    initials: "RK",
    subject: "Science",
    secondarySubjects: ["Mathematics"],
    board: "AP State Board",
    classes: ["6th Class", "7th Class", "8th Class", "9th Class"],
    experience: "7 years",
    rating: 4.8,
    reviews: 98,
    students: 73,
    price: 249,
    availability: "Today · 7:00 PM",
    tag: "Popular",
    accent: "from-sky-300 to-cyan-300",
  },
  {
    id: 3,
    name: "Ananya Reddy",
    initials: "AR",
    subject: "English",
    secondarySubjects: ["Hindi"],
    board: "CBSE",
    classes: ["5th Class", "6th Class", "7th Class", "8th Class"],
    experience: "6 years",
    rating: 4.9,
    reviews: 87,
    students: 61,
    price: 229,
    availability: "Tomorrow · 5:30 PM",
    tag: "Highly Rated",
    accent: "from-violet-300 to-sky-200",
  },
  {
    id: 4,
    name: "Suresh Babu",
    initials: "SB",
    subject: "Mathematics",
    secondarySubjects: ["Physical Science", "Biological Science"],
    board: "AP State Board",
    classes: ["8th Class", "9th Class", "10th Class"],
    experience: "11 years",
    rating: 5.0,
    reviews: 156,
    students: 112,
    price: 349,
    availability: "Today · 8:00 PM",
    tag: "Expert",
    accent: "from-emerald-300 to-teal-200",
  },
  {
    id: 5,
    name: "Lakshmi Devi",
    initials: "LD",
    subject: "Telugu",
    secondarySubjects: ["English"],
    board: "AP State Board",
    classes: [
      "1st Class",
      "2nd Class",
      "3rd Class",
      "4th Class",
      "5th Class",
      "6th Class",
    ],
    experience: "9 years",
    rating: 4.9,
    reviews: 112,
    students: 94,
    price: 199,
    availability: "Tomorrow · 6:00 PM",
    tag: "Popular",
    accent: "from-orange-200 to-amber-200",
  },
  {
    id: 6,
    name: "Arjun Mehta",
    initials: "AM",
    subject: "Social Science",
    secondarySubjects: ["English"],
    board: "CBSE",
    classes: ["7th Class", "8th Class", "9th Class", "10th Class"],
    experience: "5 years",
    rating: 4.8,
    reviews: 73,
    students: 58,
    price: 219,
    availability: "Today · 6:30 PM",
    tag: "Recommended",
    accent: "from-indigo-300 to-sky-200",
  },
  {
    id: 7,
    name: "Meena Krishnan",
    initials: "MK",
    subject: "Hindi",
    secondarySubjects: ["English"],
    board: "CBSE",
    classes: ["3rd Class", "4th Class", "5th Class", "6th Class", "7th Class"],
    experience: "7 years",
    rating: 4.9,
    reviews: 91,
    students: 68,
    price: 209,
    availability: "Today · 5:00 PM",
    tag: "Trusted",
    accent: "from-rose-200 to-orange-200",
  },
  {
    id: 8,
    name: "Vikram Rao",
    initials: "VR",
    subject: "Physical Science",
    secondarySubjects: ["Mathematics"],
    board: "AP State Board",
    classes: ["9th Class", "10th Class"],
    experience: "10 years",
    rating: 4.9,
    reviews: 104,
    students: 79,
    price: 329,
    availability: "Tomorrow · 7:30 PM",
    tag: "Expert",
    accent: "from-sky-300 to-indigo-200",
  },
  {
    id: 9,
    name: "Divya Nair",
    initials: "DN",
    subject: "Science",
    secondarySubjects: ["Mathematics"],
    board: "CBSE",
    classes: ["6th Class", "7th Class", "8th Class", "9th Class", "10th Class"],
    experience: "8 years",
    rating: 4.8,
    reviews: 79,
    students: 65,
    price: 279,
    availability: "Today · 7:30 PM",
    tag: "Recommended",
    accent: "from-teal-200 to-cyan-300",
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
      width="17"
      height="17"
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

function getMatchingSubjects(
  tutor: Tutor,
  selectedSubjects: string[],
): string[] {
  return selectedSubjects.filter(
    (subject) =>
      subject === tutor.subject || tutor.secondarySubjects.includes(subject),
  );
}

export default function StudentTutorsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const board = searchParams.get("board") || "";
  const studentClass = searchParams.get("class") || "";
  const medium = searchParams.get("medium") || "";

  const selectedSubjects = useMemo(
    () =>
      (searchParams.get("subjects") || "")
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
    [searchParams],
  );

  const [sortBy, setSortBy] = useState("Recommended");
  const [selectedTutorId, setSelectedTutorId] = useState<number | null>(null);

  const matchingTutors = useMemo(() => {
    const matches = tutors.filter((tutor) => {
      const boardMatches = !board || tutor.board === board;

      const classMatches =
        !studentClass || tutor.classes.includes(studentClass);

      const subjectMatches =
        selectedSubjects.length === 0 ||
        selectedSubjects.some(
          (subject) =>
            subject === tutor.subject ||
            tutor.secondarySubjects.includes(subject),
        );

      return boardMatches && classMatches && subjectMatches;
    });

    if (sortBy === "Rating") {
      return [...matches].sort((a, b) => b.rating - a.rating);
    }

    if (sortBy === "Price") {
      return [...matches].sort((a, b) => a.price - b.price);
    }

    if (sortBy === "Experience") {
      return [...matches].sort(
        (a, b) =>
          Number.parseInt(b.experience) - Number.parseInt(a.experience),
      );
    }

    return [...matches].sort(
      (a, b) =>
        getMatchingSubjects(b, selectedSubjects).length -
        getMatchingSubjects(a, selectedSubjects).length,
    );
  }, [board, studentClass, selectedSubjects, sortBy]);

  const selectedTutor = tutors.find((tutor) => tutor.id === selectedTutorId);

  function handleContinue() {
    if (!selectedTutor) return;

    const params = new URLSearchParams({
      board,
      class: studentClass,
      medium,
      subjects: selectedSubjects.join(","),
      tutorId: String(selectedTutor.id),
    });

    router.push(`/student/plan?${params.toString()}`);
  }

  function handleBack() {
    const params = new URLSearchParams({
      board,
      class: studentClass,
      medium,
      subjects: selectedSubjects.join(","),
    });

    router.push(`/student/subjects?${params.toString()}`);
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#f4f8f7] text-[#111111]">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-[-160px] top-[100px] h-[440px] w-[440px] rounded-full bg-[#42d4bc]/12 blur-[110px]"
        />

        <motion.div
          animate={{ x: [0, -25, 0], y: [0, 25, 0] }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute right-[-150px] top-[220px] h-[430px] w-[430px] rounded-full bg-cyan-200/20 blur-[110px]"
        />

        <div className="absolute bottom-[-180px] left-[32%] h-[430px] w-[430px] rounded-full bg-emerald-100/25 blur-[120px]" />
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
            Step 3 of 5
          </div>
        </div>
      </header>

      {/* Progress */}
      <div className="border-b border-black/[0.05] bg-white/45">
        <div className="mx-auto max-w-[1440px] px-5 py-4 sm:px-8 lg:px-12">
          <div className="flex items-center gap-2">
            <div className="h-1.5 flex-1 rounded-full bg-[#42d4bc]" />
            <div className="h-1.5 flex-1 rounded-full bg-[#42d4bc]" />
            <div className="h-1.5 flex-1 rounded-full bg-[#42d4bc]" />
            <div className="h-1.5 flex-1 rounded-full bg-black/8" />
            <div className="h-1.5 flex-1 rounded-full bg-black/8" />
          </div>
        </div>
      </div>

      {/* Page */}
      <section>
        <div className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
              <div className="max-w-[820px]">
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/65 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-black/50 shadow-sm backdrop-blur-xl">
                  <span className="h-2 w-2 rounded-full bg-[#42d4bc]" />
                  Step 3 · Tutor matching
                </div>

                <h1 className="text-[48px] font-semibold leading-[0.98] tracking-[-0.07em] sm:text-[64px] lg:text-[74px]">
                  Meet teachers
                  <span className="block">who fit your needs.</span>
                </h1>

                <p className="mt-6 max-w-[700px] text-[17px] leading-7 text-black/50 sm:text-[19px]">
                  We matched tutors using your board, class and selected
                  subjects. Choose the teacher who feels right for the
                  student.
                </p>
              </div>

              <div className="tq-glass rounded-[22px] p-5 lg:min-w-[300px]">
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-black/35">
                  Your learning setup
                </p>

                <div className="mt-4 space-y-2 text-sm">
                  <p>
                    <span className="text-black/40">Board:</span>{" "}
                    <span className="font-semibold">
                      {board || "Not selected"}
                    </span>
                  </p>

                  <p>
                    <span className="text-black/40">Class:</span>{" "}
                    <span className="font-semibold">
                      {studentClass || "Not selected"}
                    </span>
                  </p>

                  <p>
                    <span className="text-black/40">Medium:</span>{" "}
                    <span className="font-semibold">
                      {medium || "Not selected"}
                    </span>
                  </p>

                  <div className="pt-1">
                    <span className="text-black/40">Subjects:</span>

                    <div className="mt-2 flex flex-wrap gap-2">
                      {selectedSubjects.length > 0 ? (
                        selectedSubjects.map((subject) => (
                          <span
                            key={subject}
                            className="rounded-full bg-[#42d4bc]/12 px-3 py-1.5 text-[10px] font-semibold text-[#138c79]"
                          >
                            {subject}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs text-black/35">
                          Not selected
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Toolbar */}
          <div className="mt-12 flex flex-col justify-between gap-4 border-y border-black/[0.06] py-5 sm:flex-row sm:items-center">
            <div>
              <p className="text-sm font-semibold">
                {matchingTutors.length} matching tutor
                {matchingTutors.length === 1 ? "" : "s"}
              </p>

              <p className="mt-1 text-xs text-black/40">
                Verified teachers matched to this learning path
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-black/40">Sort by</span>

              <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
                className="rounded-full border border-black/10 bg-white/70 px-4 py-2.5 text-xs font-semibold outline-none"
              >
                <option>Recommended</option>
                <option>Rating</option>
                <option>Experience</option>
                <option>Price</option>
              </select>
            </div>
          </div>

          {/* Results */}
          {matchingTutors.length > 0 ? (
            <div className="mt-8 grid gap-5 lg:grid-cols-2">
              {matchingTutors.map((tutor, index) => {
                const matches = getMatchingSubjects(
                  tutor,
                  selectedSubjects,
                );
                const selected = selectedTutorId === tutor.id;

                return (
                  <motion.article
                    key={tutor.id}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.05,
                    }}
                    className={`tq-hover tq-glass rounded-[30px] p-4 ${
                      selected
                        ? "ring-2 ring-[#42d4bc] ring-offset-2 ring-offset-[#f4f8f7]"
                        : ""
                    }`}
                  >
                    <div className="relative overflow-hidden rounded-[24px] bg-white/45 p-5">
                      <div
                        className={`absolute right-[-60px] top-[-60px] h-48 w-48 rounded-full bg-gradient-to-br ${tutor.accent} opacity-20 blur-3xl`}
                      />

                      <div className="relative flex items-start justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div
                            className={`flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-[24px] bg-gradient-to-br ${tutor.accent} text-lg font-bold shadow-lg`}
                          >
                            {tutor.initials}
                          </div>

                          <div>
                            <div className="flex items-center gap-2">
                              <h2 className="text-[21px] font-semibold tracking-[-0.035em]">
                                {tutor.name}
                              </h2>

                              <span className="text-[#20b49c]">
                                <VerifiedIcon />
                              </span>
                            </div>

                            <p className="mt-1 text-sm text-black/45">
                              {tutor.board}
                            </p>

                            <div className="mt-2 flex items-center gap-1 text-sm">
                              <span className="text-amber-500">
                                <StarIcon />
                              </span>

                              <span className="font-semibold">
                                {tutor.rating}
                              </span>

                              <span className="text-black/35">
                                ({tutor.reviews})
                              </span>
                            </div>
                          </div>
                        </div>

                        <span className="rounded-full bg-black px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.1em] text-white">
                          {tutor.tag}
                        </span>
                      </div>

                      <div className="relative mt-6 grid gap-3 sm:grid-cols-2">
                        <div className="rounded-[17px] border border-black/[0.06] bg-white/50 p-4">
                          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-black/30">
                            Main subject
                          </p>

                          <p className="mt-2 text-sm font-semibold">
                            {tutor.subject}
                          </p>
                        </div>

                        <div className="rounded-[17px] border border-black/[0.06] bg-white/50 p-4">
                          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-black/30">
                            Experience
                          </p>

                          <p className="mt-2 text-sm font-semibold">
                            {tutor.experience}
                          </p>
                        </div>
                      </div>

                      <div className="relative mt-3 rounded-[17px] border border-[#42d4bc]/15 bg-[#42d4bc]/7 p-4">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-black/30">
                          Subject match
                        </p>

                        <div className="mt-2 flex flex-wrap gap-2">
                          {matches.length > 0 ? (
                            matches.map((match) => (
                              <span
                                key={match}
                                className="rounded-full bg-[#42d4bc]/15 px-3 py-1.5 text-[10px] font-semibold text-[#138c79]"
                              >
                                ✓ {match}
                              </span>
                            ))
                          ) : (
                            <span className="text-xs text-black/40">
                              Relevant tutor match
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="relative mt-3 flex flex-wrap gap-2">
                        {tutor.classes
                          .filter(
                            (className) =>
                              !studentClass || className === studentClass,
                          )
                          .slice(0, 2)
                          .map((className) => (
                            <span
                              key={className}
                              className="rounded-full border border-black/8 bg-white/55 px-3 py-1.5 text-[10px] font-medium text-black/50"
                            >
                              {className}
                            </span>
                          ))}

                        <span className="rounded-full border border-black/8 bg-white/55 px-3 py-1.5 text-[10px] font-medium text-black/50">
                          {tutor.students} students
                        </span>
                      </div>
                    </div>

                    <div className="grid gap-3 px-2 pb-2 pt-5 sm:grid-cols-[1fr_auto] sm:items-center">
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-black/30">
                          Starting from
                        </p>

                        <p className="mt-1 text-[20px] font-semibold">
                          ₹{tutor.price}
                          <span className="text-xs font-medium text-black/35">
                            {" "}
                            / class
                          </span>
                        </p>

                        <p className="mt-1 text-[11px] text-black/40">
                          {tutor.availability}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => setSelectedTutorId(tutor.id)}
                        className={`inline-flex h-12 items-center justify-center gap-2 rounded-[15px] px-6 text-sm font-semibold transition ${
                          selected
                            ? "bg-[#42d4bc] text-black"
                            : "bg-black text-white hover:bg-[#42d4bc] hover:text-black"
                        }`}
                      >
                        {selected ? (
                          <>
                            Selected
                            <CheckIcon />
                          </>
                        ) : (
                          <>
                            Choose tutor
                            <ArrowIcon />
                          </>
                        )}
                      </button>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          ) : (
            <div className="tq-glass mt-8 rounded-[30px] p-12 text-center">
              <h2 className="text-2xl font-semibold">
                No exact tutor match found
              </h2>

              <p className="mx-auto mt-3 max-w-[520px] text-sm leading-6 text-black/45">
                We could not find a tutor matching every current selection.
                Go back and adjust the subjects or class.
              </p>

              <button
                type="button"
                onClick={handleBack}
                className="mt-7 rounded-full bg-black px-6 py-3 text-sm font-semibold text-white"
              >
                Change subjects
              </button>
            </div>
          )}

          {/* Bottom selection bar */}
          {selectedTutor && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="sticky bottom-4 z-40 mt-8"
            >
              <div className="tq-depth flex flex-col gap-4 rounded-[25px] border border-white/80 bg-white/85 p-4 backdrop-blur-2xl sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-[16px] bg-gradient-to-br ${selectedTutor.accent} text-sm font-bold`}
                  >
                    {selectedTutor.initials}
                  </div>

                  <div>
                    <p className="text-sm font-semibold">
                      {selectedTutor.name}
                    </p>

                    <p className="mt-1 text-xs text-black/40">
                      {selectedTutor.subject} · {selectedTutor.board}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedTutorId(null)}
                    className="rounded-[14px] border border-black/10 px-4 py-3 text-xs font-semibold"
                  >
                    Change
                  </button>

                  <button
                    type="button"
                    onClick={handleContinue}
                    className="inline-flex items-center gap-2 rounded-[14px] bg-black px-5 py-3 text-xs font-semibold text-white transition hover:bg-[#42d4bc] hover:text-black"
                  >
                    Continue to plan
                    <ArrowIcon />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      <footer className="border-t border-black/[0.06] px-5 py-8 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-4 text-sm text-black/40 sm:flex-row">
          <p>© {new Date().getFullYear()} TutorsQue</p>
          <p>Step 3 · Tutor selection</p>
        </div>
      </footer>
    </main>
  );
}