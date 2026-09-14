"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";

type TeacherStatus = "Verified" | "Pending" | "Suspended";

type Teacher = {
  id: string;
  name: string;
  initials: string;
  email: string;
  phone: string;
  subject: string;
  subjects: number;
  classes: string[];
  board: "AP State Board" | "CBSE" | "AP State Board & CBSE";
  experience: number;
  school: string;
  location: string;
  students: number;
  batches: number;
  rating: number;
  earnings: number;
  status: TeacherStatus;
  joined: string;
};

const teachers: Teacher[] = [
  {
    id: "TQ-TEA-00981",
    name: "Rahul Varma",
    initials: "RV",
    email: "rahul.varma@example.com",
    phone: "+91 98765 43210",
    subject: "Mathematics",
    subjects: 2,
    classes: ["8", "9", "10"],
    board: "AP State Board",
    experience: 7,
    school: "Sri Chaitanya School",
    location: "Vijayawada",
    students: 86,
    batches: 8,
    rating: 4.9,
    earnings: 52480,
    status: "Verified",
    joined: "Jun 12, 2026",
  },
  {
    id: "TQ-TEA-00980",
    name: "Priya Sharma",
    initials: "PS",
    email: "priya.sharma@example.com",
    phone: "+91 99887 12045",
    subject: "Science",
    subjects: 3,
    classes: ["7", "8", "9", "10"],
    board: "CBSE",
    experience: 8,
    school: "Delhi Public School",
    location: "Visakhapatnam",
    students: 74,
    batches: 7,
    rating: 4.8,
    earnings: 48620,
    status: "Verified",
    joined: "May 28, 2026",
  },
  {
    id: "TQ-TEA-00979",
    name: "Sneha Rao",
    initials: "SR",
    email: "sneha.rao@example.com",
    phone: "+91 98665 22114",
    subject: "English",
    subjects: 2,
    classes: ["6", "7", "8", "9"],
    board: "AP State Board & CBSE",
    experience: 6,
    school: "Oakridge International",
    location: "Guntur",
    students: 62,
    batches: 6,
    rating: 4.8,
    earnings: 39980,
    status: "Verified",
    joined: "May 15, 2026",
  },
  {
    id: "TQ-TEA-00978",
    name: "Arjun Reddy",
    initials: "AR",
    email: "arjun.reddy@example.com",
    phone: "+91 98482 77521",
    subject: "Social Studies",
    subjects: 2,
    classes: ["8", "9", "10"],
    board: "AP State Board",
    experience: 5,
    school: "Narayana School",
    location: "Vijayawada",
    students: 58,
    batches: 5,
    rating: 4.7,
    earnings: 36120,
    status: "Verified",
    joined: "Apr 27, 2026",
  },
  {
    id: "TQ-TEA-00977",
    name: "Vikram Shah",
    initials: "VS",
    email: "vikram.shah@example.com",
    phone: "+91 90001 33102",
    subject: "Mathematics",
    subjects: 2,
    classes: ["9", "10"],
    board: "CBSE",
    experience: 9,
    school: "DAV School",
    location: "Hyderabad",
    students: 68,
    batches: 6,
    rating: 4.9,
    earnings: 47200,
    status: "Verified",
    joined: "Apr 18, 2026",
  },
  {
    id: "TQ-TEA-00976",
    name: "Kiran Reddy",
    initials: "KR",
    email: "kiran.reddy@example.com",
    phone: "+91 97777 44110",
    subject: "Mathematics",
    subjects: 1,
    classes: ["8", "9", "10"],
    board: "AP State Board",
    experience: 6,
    school: "Narayana School",
    location: "Vijayawada",
    students: 0,
    batches: 0,
    rating: 0,
    earnings: 0,
    status: "Pending",
    joined: "Sep 10, 2026",
  },
  {
    id: "TQ-TEA-00975",
    name: "Meghana Rao",
    initials: "MR",
    email: "meghana.rao@example.com",
    phone: "+91 98888 55121",
    subject: "Biology",
    subjects: 2,
    classes: ["9", "10"],
    board: "CBSE",
    experience: 4,
    school: "Oakridge International",
    location: "Guntur",
    students: 0,
    batches: 0,
    rating: 0,
    earnings: 0,
    status: "Pending",
    joined: "Sep 09, 2026",
  },
  {
    id: "TQ-TEA-00974",
    name: "Suresh Kumar",
    initials: "SK",
    email: "suresh.kumar@example.com",
    phone: "+91 94444 22118",
    subject: "Physics",
    subjects: 2,
    classes: ["9", "10"],
    board: "AP State Board & CBSE",
    experience: 8,
    school: "Sri Chaitanya School",
    location: "Visakhapatnam",
    students: 0,
    batches: 0,
    rating: 0,
    earnings: 0,
    status: "Pending",
    joined: "Sep 08, 2026",
  },
  {
    id: "TQ-TEA-00973",
    name: "Meera Das",
    initials: "MD",
    email: "meera.das@example.com",
    phone: "+91 95555 66120",
    subject: "Chemistry",
    subjects: 1,
    classes: ["9", "10"],
    board: "CBSE",
    experience: 7,
    school: "Delhi Public School",
    location: "Vijayawada",
    students: 31,
    batches: 3,
    rating: 4.5,
    earnings: 18400,
    status: "Suspended",
    joined: "Mar 12, 2026",
  },
];

const subjectFilters = [
  "All",
  "Mathematics",
  "Science",
  "Physics",
  "Biology",
  "Chemistry",
  "English",
  "Social Studies",
];

const statusFilters = ["All", "Verified", "Pending", "Suspended"];

const boardFilters = [
  "All",
  "AP State Board",
  "CBSE",
  "AP State Board & CBSE",
];

function statusClasses(status: TeacherStatus) {
  if (status === "Verified") {
    return "bg-[#42d4bc]/10 text-[#0b9079]";
  }

  if (status === "Pending") {
    return "bg-yellow-500/10 text-yellow-700";
  }

  return "bg-red-500/10 text-red-600";
}

function boardClasses(board: Teacher["board"]) {
  if (board === "CBSE") {
    return "bg-blue-500/10 text-blue-700";
  }

  if (board === "AP State Board & CBSE") {
    return "bg-purple-500/10 text-purple-700";
  }

  return "bg-[#42d4bc]/10 text-[#0b9079]";
}

function formatCurrency(value: number) {
  return `₹${value.toLocaleString("en-IN")}`;
}

export default function AdminTeachersPage() {
  const [search, setSearch] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [boardFilter, setBoardFilter] = useState("All");
  const [view, setView] = useState<"table" | "grid">("table");
  const [selectedTeacher, setSelectedTeacher] =
    useState<Teacher | null>(null);

  const filteredTeachers = useMemo(() => {
    return teachers.filter((teacher) => {
      const searchText =
        `${teacher.name} ${teacher.email} ${teacher.id} ${teacher.school} ${teacher.location}`.toLowerCase();

      const matchesSearch = searchText.includes(
        search.toLowerCase()
      );

      const matchesSubject =
        subjectFilter === "All" ||
        teacher.subject === subjectFilter;

      const matchesStatus =
        statusFilter === "All" ||
        teacher.status === statusFilter;

      const matchesBoard =
        boardFilter === "All" ||
        teacher.board === boardFilter;

      return (
        matchesSearch &&
        matchesSubject &&
        matchesStatus &&
        matchesBoard
      );
    });
  }, [search, subjectFilter, statusFilter, boardFilter]);

  const verifiedCount = teachers.filter(
    (teacher) => teacher.status === "Verified"
  ).length;

  const pendingCount = teachers.filter(
    (teacher) => teacher.status === "Pending"
  ).length;

  const suspendedCount = teachers.filter(
    (teacher) => teacher.status === "Suspended"
  ).length;

  const activeStudents = teachers.reduce(
    (sum, teacher) => sum + teacher.students,
    0
  );

  const totalBatches = teachers.reduce(
    (sum, teacher) => sum + teacher.batches,
    0
  );

  const averageRating = teachers.filter(
    (teacher) => teacher.rating > 0
  ).length
    ? (
        teachers
          .filter((teacher) => teacher.rating > 0)
          .reduce((sum, teacher) => sum + teacher.rating, 0) /
        teachers.filter((teacher) => teacher.rating > 0).length
      ).toFixed(1)
    : "0.0";

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

      <div className="relative mx-auto max-w-[1600px] px-4 py-5 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="tq-glass mb-6 flex flex-col gap-4 rounded-[26px] px-5 py-4 shadow-lg shadow-black/[0.03] lg:flex-row lg:items-center lg:justify-between"
        >
          <div className="flex items-center gap-3">
            <Link
              href="/admin/dashboard"
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-black !text-white text-xs font-black transition hover:-translate-y-0.5"
            >
              ←
            </Link>

            <div>
              <p className="text-lg font-black tracking-[-0.02em]">
                Teacher Management
              </p>

              <p className="mt-0.5 text-xs text-black/45">
                Verify teachers, manage teaching assignments and monitor tutor performance
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-2 rounded-full bg-[#42d4bc]/10 px-4 py-2.5 text-xs font-black text-[#0b9079]">
              <span className="h-2 w-2 rounded-full bg-[#42d4bc]" />
              {filteredTeachers.length} teachers shown
            </div>

            <button
              type="button"
              className="rounded-xl bg-black px-4 py-2.5 text-[10px] font-black !text-white transition hover:bg-black/85"
            >
              + Add Teacher
            </button>
          </div>
        </motion.header>

        {/* Hero */}
        <section className="relative overflow-hidden rounded-[30px] bg-black p-7 text-white shadow-2xl shadow-black/10 sm:p-9">
          <div className="absolute -right-28 -top-28 h-80 w-80 rounded-full bg-[#42d4bc]/20 blur-3xl" />

          <div className="absolute bottom-[-130px] left-[28%] h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />

          <div className="relative">
            <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-white/55">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#42d4bc]" />
                  Tutor operations
                </div>

                <h1 className="mt-5 text-4xl font-black leading-[1.02] tracking-[-0.055em] sm:text-5xl">
                  Build the
                  <span className="text-[#42d4bc]"> teaching network.</span>
                </h1>

                <p className="mt-4 max-w-3xl text-sm leading-6 text-white/50 sm:text-base">
                  Manage teacher verification, subjects, classes, boards,
                  batches, students and tutor performance across TutorsQue.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                  <p className="text-[10px] text-white/35">
                    Total
                  </p>

                  <p className="mt-1.5 text-2xl font-black">
                    {teachers.length}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                  <p className="text-[10px] text-white/35">
                    Verified
                  </p>

                  <p className="mt-1.5 text-2xl font-black">
                    {verifiedCount}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                  <p className="text-[10px] text-white/35">
                    Pending
                  </p>

                  <p className="mt-1.5 text-2xl font-black">
                    {pendingCount}
                  </p>
                </div>

                <div className="rounded-2xl border border-[#42d4bc]/20 bg-[#42d4bc]/10 p-4">
                  <p className="text-[10px] text-[#42d4bc]/65">
                    Students covered
                  </p>

                  <p className="mt-1.5 text-2xl font-black text-[#42d4bc]">
                    {activeStudents}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* KPI */}
        <section className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              label: "Verified Teachers",
              value: verifiedCount,
              detail: "Approved to teach",
              icon: "VR",
            },
            {
              label: "Pending Verification",
              value: pendingCount,
              detail: "Require admin review",
              icon: "PN",
            },
            {
              label: "Active Batches",
              value: totalBatches,
              detail: "Across verified tutors",
              icon: "BA",
            },
            {
              label: "Average Rating",
              value: averageRating,
              detail: "Across active tutors",
              icon: "★",
            },
          ].map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.06 + index * 0.05,
              }}
              whileHover={{ y: -3 }}
              className="tq-glass rounded-[24px] p-5 shadow-lg shadow-black/[0.025]"
            >
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold text-black/40">
                  {item.label}
                </p>

                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-black/[0.04] text-[9px] font-black">
                  {item.icon}
                </div>
              </div>

              <p className="mt-4 text-3xl font-black tracking-[-0.04em]">
                {item.value}
              </p>

              <p className="mt-1 text-[10px] text-black/35">
                {item.detail}
              </p>
            </motion.div>
          ))}
        </section>

        {/* Filters */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.23 }}
          className="tq-glass mt-4 rounded-[26px] p-4 shadow-xl shadow-black/[0.03]"
        >
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div className="relative w-full lg:max-w-md">
                <svg
                  viewBox="0 0 24 24"
                  className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-black/30"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <circle cx="11" cy="11" r="6.5" />
                  <path strokeLinecap="round" d="m16 16 4 4" />
                </svg>

                <input
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                  placeholder="Search name, ID, school, location or email..."
                  className="h-12 w-full rounded-xl border border-black/[0.06] bg-white/65 pl-11 pr-4 text-xs font-semibold outline-none transition focus:border-[#42d4bc]/55 focus:bg-white"
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setView("table")}
                  className={`rounded-xl px-4 py-2.5 text-[10px] font-black transition ${
                    view === "table"
                      ? "bg-black !text-white"
                      : "bg-black/[0.04] text-black/45 hover:bg-black/[0.07]"
                  }`}
                >
                  Table
                </button>

                <button
                  type="button"
                  onClick={() => setView("grid")}
                  className={`rounded-xl px-4 py-2.5 text-[10px] font-black transition ${
                    view === "grid"
                      ? "bg-black !text-white"
                      : "bg-black/[0.04] text-black/45 hover:bg-black/[0.07]"
                  }`}
                >
                  Cards
                </button>
              </div>
            </div>

            <div className="grid gap-3 border-t border-black/5 pt-3 lg:grid-cols-3">
              <div>
                <p className="mb-2 text-[9px] font-black uppercase tracking-wider text-black/30">
                  Subject
                </p>

                <div className="flex flex-wrap gap-2">
                  {subjectFilters.map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setSubjectFilter(filter)}
                      className={`rounded-xl px-3 py-2 text-[10px] font-black transition ${
                        subjectFilter === filter
                          ? "bg-[#42d4bc] text-black"
                          : "bg-black/[0.04] text-black/45 hover:bg-black/[0.07]"
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-2 text-[9px] font-black uppercase tracking-wider text-black/30">
                  Board
                </p>

                <div className="flex flex-wrap gap-2">
                  {boardFilters.map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setBoardFilter(filter)}
                      className={`rounded-xl px-3 py-2 text-[10px] font-black transition ${
                        boardFilter === filter
                          ? "bg-[#42d4bc] text-black"
                          : "bg-black/[0.04] text-black/45 hover:bg-black/[0.07]"
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-2 text-[9px] font-black uppercase tracking-wider text-black/30">
                  Status
                </p>

                <div className="flex flex-wrap gap-2">
                  {statusFilters.map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setStatusFilter(filter)}
                      className={`rounded-xl px-3 py-2 text-[10px] font-black transition ${
                        statusFilter === filter
                          ? "bg-[#42d4bc] text-black"
                          : "bg-black/[0.04] text-black/45 hover:bg-black/[0.07]"
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* TABLE */}
        {view === "table" && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="tq-glass mt-4 overflow-hidden rounded-[28px] shadow-xl shadow-black/[0.03]"
          >
            <div className="flex flex-col gap-3 border-b border-black/5 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-black/30">
                  Teacher directory
                </p>

                <h2 className="mt-1.5 text-2xl font-black tracking-[-0.03em]">
                  {filteredTeachers.length} teachers
                </h2>
              </div>

              <button
                type="button"
                className="rounded-xl bg-black/[0.04] px-4 py-2.5 text-[10px] font-black text-black/50 transition hover:bg-black/[0.07]"
              >
                Export CSV
              </button>
            </div>

            <div className="hidden overflow-x-auto xl:block">
              <table className="w-full min-w-[1350px] border-collapse">
                <thead>
                  <tr className="border-b border-black/5 text-left">
                    {[
                      "Teacher",
                      "Subject",
                      "Board",
                      "Experience",
                      "Students",
                      "Batches",
                      "Rating",
                      "Status",
                      "Action",
                    ].map((heading) => (
                      <th
                        key={heading}
                        className="px-6 py-4 text-[10px] font-black uppercase tracking-wider text-black/30"
                      >
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {filteredTeachers.map((teacher, index) => (
                    <motion.tr
                      key={teacher.id}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: index * 0.025,
                      }}
                      className="border-b border-black/[0.04] transition hover:bg-black/[0.015]"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-black !text-white text-[10px] font-black">
                            {teacher.initials}
                          </div>

                          <div>
                            <p className="text-xs font-black">
                              {teacher.name}
                            </p>

                            <p className="mt-1 text-[9px] font-mono text-black/30">
                              {teacher.id}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <p className="text-xs font-black">
                          {teacher.subject}
                        </p>

                        <p className="mt-1 text-[10px] text-black/35">
                          {teacher.subjects} specializations
                        </p>
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`rounded-full px-2.5 py-1.5 text-[9px] font-black ${boardClasses(
                            teacher.board
                          )}`}
                        >
                          {teacher.board}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-xs font-bold">
                        {teacher.experience} yrs
                      </td>

                      <td className="px-6 py-4 text-xs font-black">
                        {teacher.students}
                      </td>

                      <td className="px-6 py-4 text-xs font-black">
                        {teacher.batches}
                      </td>

                      <td className="px-6 py-4">
                        {teacher.rating > 0 ? (
                          <span className="text-xs font-black">
                            ★ {teacher.rating}
                          </span>
                        ) : (
                          <span className="text-[10px] text-black/30">
                            Not rated
                          </span>
                        )}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`rounded-full px-2.5 py-1.5 text-[9px] font-black ${statusClasses(
                            teacher.status
                          )}`}
                        >
                          {teacher.status}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <button
                          type="button"
                          onClick={() =>
                            setSelectedTeacher(teacher)
                          }
                          className="rounded-xl bg-black px-3.5 py-2.5 text-[10px] font-black !text-white transition hover:bg-black/85"
                        >
                          View
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Responsive list */}
            <div className="space-y-3 p-4 xl:hidden">
              {filteredTeachers.map((teacher, index) => (
                <motion.div
                  key={teacher.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: index * 0.025,
                  }}
                  className="rounded-2xl bg-black/[0.025] p-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-black !text-white text-[10px] font-black">
                        {teacher.initials}
                      </div>

                      <div>
                        <p className="text-sm font-black">
                          {teacher.name}
                        </p>

                        <p className="mt-1 text-[9px] font-mono text-black/30">
                          {teacher.id}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`rounded-full px-2.5 py-1.5 text-[9px] font-black ${statusClasses(
                        teacher.status
                      )}`}
                    >
                      {teacher.status}
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-wider text-black/30">
                        Subject
                      </p>

                      <p className="mt-1 text-xs font-black">
                        {teacher.subject}
                      </p>
                    </div>

                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-wider text-black/30">
                        Board
                      </p>

                      <p className="mt-1 text-[10px] font-black">
                        {teacher.board}
                      </p>
                    </div>

                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-wider text-black/30">
                        Students
                      </p>

                      <p className="mt-1 text-xs font-black">
                        {teacher.students}
                      </p>
                    </div>

                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-wider text-black/30">
                        Rating
                      </p>

                      <p className="mt-1 text-xs font-black">
                        {teacher.rating > 0
                          ? `★ ${teacher.rating}`
                          : "Pending"}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-black/5 pt-3">
                    <div className="flex flex-wrap gap-2">
                      <span
                        className={`rounded-full px-2.5 py-1.5 text-[9px] font-black ${boardClasses(
                          teacher.board
                        )}`}
                      >
                        {teacher.board}
                      </span>

                      <span className="rounded-full bg-black/[0.04] px-2.5 py-1.5 text-[9px] font-black">
                        {teacher.experience} yrs
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        setSelectedTeacher(teacher)
                      }
                      className="rounded-xl bg-black px-4 py-2.5 text-[10px] font-black !text-white"
                    >
                      View Teacher
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredTeachers.length === 0 && (
              <div className="p-12 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-black/[0.04] text-black/30">
                  ?
                </div>

                <h3 className="mt-4 text-lg font-black">
                  No teachers found
                </h3>

                <p className="mt-1 text-xs text-black/40">
                  Try changing your search or filters.
                </p>
              </div>
            )}
          </motion.section>
        )}

        {/* GRID */}
        {view === "grid" && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
          >
            {filteredTeachers.map((teacher, index) => (
              <motion.article
                key={teacher.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.04,
                }}
                whileHover={{ y: -4 }}
                className="tq-glass rounded-[26px] p-5 shadow-xl shadow-black/[0.025]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black !text-white text-xs font-black">
                      {teacher.initials}
                    </div>

                    <div>
                      <p className="text-sm font-black">
                        {teacher.name}
                      </p>

                      <p className="mt-1 text-[9px] font-mono text-black/30">
                        {teacher.id}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`rounded-full px-2.5 py-1.5 text-[9px] font-black ${statusClasses(
                      teacher.status
                    )}`}
                  >
                    {teacher.status}
                  </span>
                </div>

                <div className="mt-5 rounded-2xl bg-black/[0.025] p-4">
                  <p className="text-[9px] font-bold uppercase tracking-wider text-black/30">
                    Primary subject
                  </p>

                  <p className="mt-1 text-lg font-black">
                    {teacher.subject}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <span
                      className={`rounded-full px-2.5 py-1.5 text-[9px] font-black ${boardClasses(
                        teacher.board
                      )}`}
                    >
                      {teacher.board}
                    </span>

                    <span className="rounded-full bg-black/[0.04] px-2.5 py-1.5 text-[9px] font-black">
                      {teacher.experience} yrs
                    </span>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-2">
                  <div className="rounded-xl bg-black/[0.025] p-3">
                    <p className="text-[9px] font-bold uppercase tracking-wider text-black/30">
                      Students
                    </p>

                    <p className="mt-1 text-xs font-black">
                      {teacher.students}
                    </p>
                  </div>

                  <div className="rounded-xl bg-black/[0.025] p-3">
                    <p className="text-[9px] font-bold uppercase tracking-wider text-black/30">
                      Batches
                    </p>

                    <p className="mt-1 text-xs font-black">
                      {teacher.batches}
                    </p>
                  </div>

                  <div className="rounded-xl bg-black/[0.025] p-3">
                    <p className="text-[9px] font-bold uppercase tracking-wider text-black/30">
                      Rating
                    </p>

                    <p className="mt-1 text-xs font-black">
                      {teacher.rating > 0
                        ? `★ ${teacher.rating}`
                        : "—"}
                    </p>
                  </div>
                </div>

                <div className="mt-4 rounded-xl bg-[#42d4bc]/7 p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-black/30">
                      Students
                    </span>

                    <span className="text-[10px] font-black text-[#0b9079]">
                      {teacher.status === "Verified"
                        ? "Teaching"
                        : "Awaiting approval"}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedTeacher(teacher)}
                  className="mt-4 w-full rounded-xl bg-black px-4 py-3 text-[10px] font-black !text-white transition hover:bg-black/85"
                >
                  View Teacher
                </button>
              </motion.article>
            ))}

            {filteredTeachers.length === 0 && (
              <div className="tq-glass col-span-full rounded-[28px] p-12 text-center">
                <h3 className="text-lg font-black">
                  No teachers found
                </h3>

                <p className="mt-1 text-xs text-black/40">
                  Try changing your search or filters.
                </p>
              </div>
            )}
          </motion.section>
        )}

        {/* Verification note */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-4 rounded-[26px] border border-[#42d4bc]/15 bg-[#42d4bc]/6 p-5"
        >
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#42d4bc]/15 text-[#0b9079]">
              ✓
            </div>

            <div>
              <p className="text-sm font-black">
                Teacher verification workflow
              </p>

              <p className="mt-1 text-xs leading-5 text-black/50">
                Production approval will verify teacher identity,
                qualifications, experience, subject mapping, classes,
                board, documents and availability before assigning batches.
              </p>
            </div>
          </div>
        </motion.section>
      </div>

      {/* Detail modal */}
      {selectedTeacher && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 p-4 backdrop-blur-md"
          onClick={() => setSelectedTeacher(null)}
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            onClick={(event) => event.stopPropagation()}
            className="w-full max-w-2xl overflow-hidden rounded-[30px] border border-white/60 bg-white/95 shadow-2xl backdrop-blur-2xl"
          >
            <div className="bg-black p-6 text-white sm:p-7">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#42d4bc] text-xl font-black text-black">
                    {selectedTeacher.initials}
                  </div>

                  <div>
                    <p className="text-xl font-black">
                      {selectedTeacher.name}
                    </p>

                    <p className="mt-1 text-xs text-white/40">
                      {selectedTeacher.id}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedTeacher(null)}
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-sm !text-white transition hover:bg-white/15"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="max-h-[72vh] overflow-y-auto p-6 sm:p-7">
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  ["Email", selectedTeacher.email],
                  ["Phone", selectedTeacher.phone],
                  ["Primary subject", selectedTeacher.subject],
                  ["Specializations", `${selectedTeacher.subjects}`],
                  ["Classes", selectedTeacher.classes.join(", ")],
                  ["Board", selectedTeacher.board],
                  ["Experience", `${selectedTeacher.experience} years`],
                  ["School", selectedTeacher.school],
                  ["Location", selectedTeacher.location],
                  ["Students", `${selectedTeacher.students}`],
                  ["Batches", `${selectedTeacher.batches}`],
                  ["Joined", selectedTeacher.joined],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded-2xl bg-black/[0.025] p-4"
                  >
                    <p className="text-[9px] font-bold uppercase tracking-wider text-black/30">
                      {label}
                    </p>

                    <p className="mt-1.5 text-xs font-black">
                      {value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-[#42d4bc]/15 bg-[#42d4bc]/6 p-4">
                  <p className="text-[9px] font-bold uppercase tracking-wider text-black/30">
                    Rating
                  </p>

                  <p className="mt-1.5 text-xl font-black text-[#0b9079]">
                    {selectedTeacher.rating > 0
                      ? `★ ${selectedTeacher.rating}`
                      : "Pending"}
                  </p>
                </div>

                <div className="rounded-2xl bg-black/[0.025] p-4">
                  <p className="text-[9px] font-bold uppercase tracking-wider text-black/30">
                    Earnings
                  </p>

                  <p className="mt-1.5 text-xl font-black">
                    {formatCurrency(selectedTeacher.earnings)}
                  </p>
                </div>

                <div className="rounded-2xl bg-black/[0.025] p-4">
                  <p className="text-[9px] font-bold uppercase tracking-wider text-black/30">
                    Status
                  </p>

                  <span
                    className={`mt-1.5 inline-flex rounded-full px-2.5 py-1.5 text-[9px] font-black ${statusClasses(
                      selectedTeacher.status
                    )}`}
                  >
                    {selectedTeacher.status}
                  </span>
                </div>
              </div>

              {selectedTeacher.status === "Pending" && (
                <div className="mt-5 rounded-2xl border border-yellow-500/15 bg-yellow-500/6 p-4">
                  <p className="text-xs font-black">
                    Verification required
                  </p>

                  <p className="mt-1 text-[11px] leading-5 text-black/45">
                    Review identity, qualification documents, experience,
                    subject mapping and board before approving this teacher.
                  </p>
                </div>
              )}

              {selectedTeacher.status === "Verified" && (
                <div className="mt-5 rounded-2xl border border-[#42d4bc]/15 bg-[#42d4bc]/6 p-4">
                  <p className="text-xs font-black">
                    Teacher verified
                  </p>

                  <p className="mt-1 text-[11px] leading-5 text-black/45">
                    This teacher is eligible for batch assignment and live
                    teaching on TutorsQue.
                  </p>
                </div>
              )}

              <div className="mt-6 flex flex-col gap-2 sm:flex-row">
                {selectedTeacher.status === "Pending" && (
                  <>
                    <button
                      type="button"
                      className="flex-1 rounded-2xl bg-[#42d4bc] px-5 py-3.5 text-xs font-black text-black transition hover:brightness-105"
                    >
                      Approve Teacher
                    </button>

                    <button
                      type="button"
                      className="flex-1 rounded-2xl bg-red-500 px-5 py-3.5 text-xs font-black !text-white transition hover:bg-red-600"
                    >
                      Reject Application
                    </button>
                  </>
                )}

                {selectedTeacher.status === "Verified" && (
                  <>
                    <button
                      type="button"
                      className="flex-1 rounded-2xl bg-black px-5 py-3.5 text-xs font-black !text-white transition hover:bg-black/85"
                    >
                      Edit Teacher
                    </button>

                    <button
                      type="button"
                      className="flex-1 rounded-2xl bg-black/[0.05] px-5 py-3.5 text-xs font-black text-black/55 transition hover:bg-black/[0.08]"
                    >
                      Assign Batch
                    </button>
                  </>
                )}

                {selectedTeacher.status === "Suspended" && (
                  <button
                    type="button"
                    className="flex-1 rounded-2xl bg-[#42d4bc] px-5 py-3.5 text-xs font-black text-black transition hover:brightness-105"
                  >
                    Reinstate Teacher
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => setSelectedTeacher(null)}
                  className="rounded-2xl bg-black/[0.05] px-5 py-3.5 text-xs font-black text-black/55 transition hover:bg-black/[0.08]"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

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