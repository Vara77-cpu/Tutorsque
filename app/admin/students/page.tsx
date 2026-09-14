"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";

type StudentStatus = "Active" | "Pending" | "Inactive";

type Student = {
  id: string;
  name: string;
  initials: string;
  email: string;
  phone: string;
  className: string;
  board: "AP State Board" | "CBSE";
  medium: "English" | "Telugu";
  school: string;
  tutor: string;
  subjects: number;
  plan: "Starter" | "Regular" | "Intensive";
  status: StudentStatus;
  joined: string;
  lastActive: string;
  progress: number;
  score: number;
};

const students: Student[] = [
  {
    id: "TQ-STU-01482",
    name: "Aarav Kumar",
    initials: "AK",
    email: "aarav.kumar@example.com",
    phone: "+91 98765 43210",
    className: "Class 10",
    board: "AP State Board",
    medium: "English",
    school: "Sri Chaitanya School",
    tutor: "Rahul Varma",
    subjects: 3,
    plan: "Regular",
    status: "Active",
    joined: "Sep 01, 2026",
    lastActive: "8 min ago",
    progress: 86,
    score: 85,
  },
  {
    id: "TQ-STU-01481",
    name: "Ananya Reddy",
    initials: "AR",
    email: "ananya.reddy@example.com",
    phone: "+91 98765 12045",
    className: "Class 9",
    board: "CBSE",
    medium: "English",
    school: "Delhi Public School",
    tutor: "Priya Sharma",
    subjects: 4,
    plan: "Intensive",
    status: "Active",
    joined: "Aug 28, 2026",
    lastActive: "24 min ago",
    progress: 82,
    score: 88,
  },
  {
    id: "TQ-STU-01480",
    name: "Sai Teja",
    initials: "ST",
    email: "sai.teja@example.com",
    phone: "+91 98665 22114",
    className: "Class 8",
    board: "AP State Board",
    medium: "Telugu",
    school: "Narayana School",
    tutor: "Sneha Rao",
    subjects: 4,
    plan: "Regular",
    status: "Active",
    joined: "Aug 25, 2026",
    lastActive: "41 min ago",
    progress: 74,
    score: 79,
  },
  {
    id: "TQ-STU-01479",
    name: "Keerthi Rao",
    initials: "KR",
    email: "keerthi.rao@example.com",
    phone: "+91 98482 77521",
    className: "Class 10",
    board: "CBSE",
    medium: "English",
    school: "Oakridge International",
    tutor: "Vikram Shah",
    subjects: 3,
    plan: "Regular",
    status: "Active",
    joined: "Aug 22, 2026",
    lastActive: "1 hr ago",
    progress: 79,
    score: 83,
  },
  {
    id: "TQ-STU-01478",
    name: "Vishal Sharma",
    initials: "VS",
    email: "vishal.sharma@example.com",
    phone: "+91 99887 33102",
    className: "Class 7",
    board: "CBSE",
    medium: "English",
    school: "DAV School",
    tutor: "Megha Rao",
    subjects: 4,
    plan: "Starter",
    status: "Pending",
    joined: "Sep 03, 2026",
    lastActive: "2 hrs ago",
    progress: 52,
    score: 68,
  },
  {
    id: "TQ-STU-01477",
    name: "Pavani Devi",
    initials: "PD",
    email: "pavani.devi@example.com",
    phone: "+91 90001 88991",
    className: "Class 9",
    board: "AP State Board",
    medium: "Telugu",
    school: "Kendriya Vidyalaya",
    tutor: "Arjun Reddy",
    subjects: 4,
    plan: "Regular",
    status: "Pending",
    joined: "Sep 04, 2026",
    lastActive: "3 hrs ago",
    progress: 61,
    score: 71,
  },
  {
    id: "TQ-STU-01476",
    name: "Rohit Sai",
    initials: "RS",
    email: "rohit.sai@example.com",
    phone: "+91 91234 67890",
    className: "Class 6",
    board: "AP State Board",
    medium: "English",
    school: "Sri Chaitanya School",
    tutor: "Rahul Varma",
    subjects: 4,
    plan: "Starter",
    status: "Active",
    joined: "Aug 18, 2026",
    lastActive: "5 hrs ago",
    progress: 70,
    score: 74,
  },
  {
    id: "TQ-STU-01475",
    name: "Nikhil Reddy",
    initials: "NR",
    email: "nikhil.reddy@example.com",
    phone: "+91 95555 44110",
    className: "Class 10",
    board: "AP State Board",
    medium: "English",
    school: "Narayana School",
    tutor: "Rahul Varma",
    subjects: 3,
    plan: "Intensive",
    status: "Active",
    joined: "Aug 15, 2026",
    lastActive: "6 hrs ago",
    progress: 91,
    score: 92,
  },
  {
    id: "TQ-STU-01474",
    name: "Mounika Sri",
    initials: "MS",
    email: "mounika.sri@example.com",
    phone: "+91 94444 99887",
    className: "Class 8",
    board: "CBSE",
    medium: "English",
    school: "DAV School",
    tutor: "Priya Sharma",
    subjects: 4,
    plan: "Regular",
    status: "Inactive",
    joined: "Jul 30, 2026",
    lastActive: "3 days ago",
    progress: 63,
    score: 70,
  },
  {
    id: "TQ-STU-01473",
    name: "Yashwanth",
    initials: "YW",
    email: "yashwanth@example.com",
    phone: "+91 93333 11990",
    className: "Class 7",
    board: "AP State Board",
    medium: "Telugu",
    school: "Narayana School",
    tutor: "Sneha Rao",
    subjects: 4,
    plan: "Starter",
    status: "Active",
    joined: "Aug 08, 2026",
    lastActive: "Yesterday",
    progress: 69,
    score: 75,
  },
  {
    id: "TQ-STU-01472",
    name: "Bhavya Lakshmi",
    initials: "BL",
    email: "bhavya.lakshmi@example.com",
    phone: "+91 97777 22110",
    className: "Class 9",
    board: "CBSE",
    medium: "English",
    school: "Oakridge International",
    tutor: "Priya Sharma",
    subjects: 4,
    plan: "Regular",
    status: "Active",
    joined: "Aug 05, 2026",
    lastActive: "Yesterday",
    progress: 84,
    score: 86,
  },
];

const classFilters = [
  "All",
  "Class 6",
  "Class 7",
  "Class 8",
  "Class 9",
  "Class 10",
];

const boardFilters = ["All", "AP State Board", "CBSE"];

const statusFilters = ["All", "Active", "Pending", "Inactive"];

function statusClasses(status: StudentStatus) {
  if (status === "Active") {
    return "bg-[#42d4bc]/10 text-[#0b9079]";
  }

  if (status === "Pending") {
    return "bg-yellow-500/10 text-yellow-700";
  }

  return "bg-black/[0.05] text-black/45";
}

function planClasses(plan: Student["plan"]) {
  if (plan === "Intensive") {
    return "bg-purple-500/10 text-purple-700";
  }

  if (plan === "Regular") {
    return "bg-[#42d4bc]/10 text-[#0b9079]";
  }

  return "bg-blue-500/10 text-blue-700";
}

export default function AdminStudentsPage() {
  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("All");
  const [boardFilter, setBoardFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedStudent, setSelectedStudent] =
    useState<Student | null>(null);
  const [view, setView] = useState<"grid" | "table">("table");

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const searchText =
        `${student.name} ${student.email} ${student.id} ${student.school} ${student.tutor}`.toLowerCase();

      const matchesSearch = searchText.includes(
        search.toLowerCase()
      );

      const matchesClass =
        classFilter === "All" || student.className === classFilter;

      const matchesBoard =
        boardFilter === "All" || student.board === boardFilter;

      const matchesStatus =
        statusFilter === "All" || student.status === statusFilter;

      return (
        matchesSearch &&
        matchesClass &&
        matchesBoard &&
        matchesStatus
      );
    });
  }, [search, classFilter, boardFilter, statusFilter]);

  const activeCount = students.filter(
    (student) => student.status === "Active"
  ).length;

  const pendingCount = students.filter(
    (student) => student.status === "Pending"
  ).length;

  const inactiveCount = students.filter(
    (student) => student.status === "Inactive"
  ).length;

  const averageProgress = Math.round(
    students.reduce((sum, student) => sum + student.progress, 0) /
      students.length
  );

  const averageScore = Math.round(
    students.reduce((sum, student) => sum + student.score, 0) /
      students.length
  );

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
                Student Management
              </p>

              <p className="mt-0.5 text-xs text-black/45">
                Manage student accounts, enrollments and academic activity
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-2 rounded-full bg-[#42d4bc]/10 px-4 py-2.5 text-xs font-black text-[#0b9079]">
              <span className="h-2 w-2 rounded-full bg-[#42d4bc]" />
              {filteredStudents.length} students shown
            </div>

            <button
              type="button"
              className="rounded-xl bg-black px-4 py-2.5 text-[10px] font-black !text-white transition hover:bg-black/85"
            >
              + Add Student
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
                  Student operations
                </div>

                <h1 className="mt-5 text-4xl font-black leading-[1.02] tracking-[-0.055em] sm:text-5xl">
                  Manage every
                  <span className="text-[#42d4bc]"> learner.</span>
                </h1>

                <p className="mt-4 max-w-3xl text-sm leading-6 text-white/50 sm:text-base">
                  Monitor student accounts, curriculum mapping, tutors,
                  tuition plans and academic progress from one place.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:min-w-[520px]">
                <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                  <p className="text-[10px] text-white/35">
                    Total
                  </p>

                  <p className="mt-1.5 text-2xl font-black">
                    {students.length}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                  <p className="text-[10px] text-white/35">
                    Active
                  </p>

                  <p className="mt-1.5 text-2xl font-black">
                    {activeCount}
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
                    Avg. score
                  </p>

                  <p className="mt-1.5 text-2xl font-black text-[#42d4bc]">
                    {averageScore}%
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Analytics */}
        <section className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              label: "Active Students",
              value: activeCount.toString(),
              detail: "Currently enrolled",
              icon: "AC",
            },
            {
              label: "Pending Onboarding",
              value: pendingCount.toString(),
              detail: "Need attention",
              icon: "PN",
            },
            {
              label: "Inactive",
              value: inactiveCount.toString(),
              detail: "Not recently active",
              icon: "IN",
            },
            {
              label: "Avg. Progress",
              value: `${averageProgress}%`,
              detail: "Across all students",
              icon: "PR",
            },
          ].map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.06 + index * 0.05 }}
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
          transition={{ delay: 0.25 }}
          className="tq-glass mt-4 rounded-[26px] p-4 shadow-xl shadow-black/[0.03]"
        >
          <div className="flex flex-col gap-4">
            {/* Search */}
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
                  placeholder="Search name, ID, school, email or tutor..."
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

            {/* Filter groups */}
            <div className="grid gap-3 border-t border-black/5 pt-3 lg:grid-cols-3">
              <div>
                <p className="mb-2 text-[9px] font-black uppercase tracking-wider text-black/30">
                  Class
                </p>

                <div className="flex flex-wrap gap-2">
                  {classFilters.map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setClassFilter(filter)}
                      className={`rounded-xl px-3 py-2 text-[10px] font-black transition ${
                        classFilter === filter
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

        {/* TABLE VIEW */}
        {view === "table" && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="tq-glass mt-4 overflow-hidden rounded-[28px] shadow-xl shadow-black/[0.03]"
          >
            <div className="flex flex-col gap-3 border-b border-black/5 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-black/30">
                  Student directory
                </p>

                <h2 className="mt-1.5 text-2xl font-black tracking-[-0.03em]">
                  {filteredStudents.length} students
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
              <table className="w-full min-w-[1200px] border-collapse">
                <thead>
                  <tr className="border-b border-black/5 text-left">
                    {[
                      "Student",
                      "Class / Board",
                      "Tutor",
                      "Plan",
                      "Progress",
                      "Score",
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
                  {filteredStudents.map((student, index) => (
                    <motion.tr
                      key={student.id}
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
                            {student.initials}
                          </div>

                          <div>
                            <p className="text-xs font-black">
                              {student.name}
                            </p>

                            <p className="mt-1 text-[9px] font-mono text-black/30">
                              {student.id}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <p className="text-xs font-black">
                          {student.className}
                        </p>

                        <p className="mt-1 text-[10px] text-black/35">
                          {student.board} • {student.medium}
                        </p>
                      </td>

                      <td className="px-6 py-4 text-xs font-bold text-black/55">
                        {student.tutor}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`rounded-full px-2.5 py-1.5 text-[9px] font-black ${planClasses(
                            student.plan
                          )}`}
                        >
                          {student.plan}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <div className="w-24">
                          <div className="flex justify-between text-[9px] font-bold">
                            <span>{student.progress}%</span>
                          </div>

                          <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-black/[0.06]">
                            <div
                              className="h-full rounded-full bg-[#42d4bc]"
                              style={{
                                width: `${student.progress}%`,
                              }}
                            />
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-xs font-black">
                        {student.score}%
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`rounded-full px-2.5 py-1.5 text-[9px] font-black ${statusClasses(
                            student.status
                          )}`}
                        >
                          {student.status}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <button
                          type="button"
                          onClick={() => setSelectedStudent(student)}
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

            {/* Tablet/mobile */}
            <div className="space-y-3 p-4 xl:hidden">
              {filteredStudents.map((student, index) => (
                <motion.div
                  key={student.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.025 }}
                  className="rounded-2xl bg-black/[0.025] p-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-black !text-white text-[10px] font-black">
                        {student.initials}
                      </div>

                      <div>
                        <p className="text-sm font-black">
                          {student.name}
                        </p>

                        <p className="mt-1 text-[9px] font-mono text-black/30">
                          {student.id}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`rounded-full px-2.5 py-1.5 text-[9px] font-black ${statusClasses(
                        student.status
                      )}`}
                    >
                      {student.status}
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-wider text-black/30">
                        Class
                      </p>

                      <p className="mt-1 text-xs font-black">
                        {student.className}
                      </p>
                    </div>

                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-wider text-black/30">
                        Board
                      </p>

                      <p className="mt-1 truncate text-xs font-black">
                        {student.board}
                      </p>
                    </div>

                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-wider text-black/30">
                        Tutor
                      </p>

                      <p className="mt-1 text-xs font-black">
                        {student.tutor}
                      </p>
                    </div>

                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-wider text-black/30">
                        Score
                      </p>

                      <p className="mt-1 text-xs font-black">
                        {student.score}%
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-black/5 pt-3">
                    <div>
                      <span
                        className={`rounded-full px-2.5 py-1.5 text-[9px] font-black ${planClasses(
                          student.plan
                        )}`}
                      >
                        {student.plan}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelectedStudent(student)}
                      className="rounded-xl bg-black px-4 py-2.5 text-[10px] font-black !text-white"
                    >
                      View Student
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredStudents.length === 0 && (
              <div className="p-12 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-black/[0.04] text-black/30">
                  ?
                </div>

                <h3 className="mt-4 text-lg font-black">
                  No students found
                </h3>

                <p className="mt-1 text-xs text-black/40">
                  Try changing your search or filters.
                </p>
              </div>
            )}
          </motion.section>
        )}

        {/* GRID VIEW */}
        {view === "grid" && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
          >
            {filteredStudents.map((student, index) => (
              <motion.article
                key={student.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04 }}
                whileHover={{ y: -4 }}
                className="tq-glass rounded-[26px] p-5 shadow-xl shadow-black/[0.025]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black !text-white text-xs font-black">
                      {student.initials}
                    </div>

                    <div>
                      <p className="text-sm font-black">
                        {student.name}
                      </p>

                      <p className="mt-1 text-[9px] font-mono text-black/30">
                        {student.id}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`rounded-full px-2.5 py-1.5 text-[9px] font-black ${statusClasses(
                      student.status
                    )}`}
                  >
                    {student.status}
                  </span>
                </div>

                <div className="mt-5 rounded-2xl bg-black/[0.025] p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-wider text-black/30">
                        Class
                      </p>

                      <p className="mt-1 text-xs font-black">
                        {student.className}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-[9px] font-bold uppercase tracking-wider text-black/30">
                        Score
                      </p>

                      <p className="mt-1 text-xs font-black">
                        {student.score}%
                      </p>
                    </div>
                  </div>

                  <p className="mt-3 text-[10px] text-black/40">
                    {student.board} • {student.medium}
                  </p>
                </div>

                <div className="mt-4">
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] font-bold text-black/35">
                      Learning progress
                    </p>

                    <p className="text-xs font-black">
                      {student.progress}%
                    </p>
                  </div>

                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-black/[0.06]">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${student.progress}%` }}
                      transition={{
                        delay: 0.15 + index * 0.04,
                        duration: 0.7,
                      }}
                      className="h-full rounded-full bg-[#42d4bc]"
                    />
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2">
                  <div className="rounded-xl bg-black/[0.025] p-3">
                    <p className="text-[9px] font-bold uppercase tracking-wider text-black/30">
                      Tutor
                    </p>

                    <p className="mt-1 truncate text-[10px] font-black">
                      {student.tutor}
                    </p>
                  </div>

                  <div className="rounded-xl bg-black/[0.025] p-3">
                    <p className="text-[9px] font-bold uppercase tracking-wider text-black/30">
                      Plan
                    </p>

                    <span
                      className={`mt-1 inline-flex rounded-full px-2 py-1 text-[8px] font-black ${planClasses(
                        student.plan
                      )}`}
                    >
                      {student.plan}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedStudent(student)}
                  className="mt-4 w-full rounded-xl bg-black px-4 py-3 text-[10px] font-black !text-white transition hover:bg-black/85"
                >
                  View Student
                </button>
              </motion.article>
            ))}

            {filteredStudents.length === 0 && (
              <div className="tq-glass col-span-full rounded-[28px] p-12 text-center">
                <h3 className="text-lg font-black">
                  No students found
                </h3>

                <p className="mt-1 text-xs text-black/40">
                  Try changing your search or filters.
                </p>
              </div>
            )}
          </motion.section>
        )}

        {/* Operational note */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-4 rounded-[26px] border border-[#42d4bc]/15 bg-[#42d4bc]/6 p-5"
        >
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#42d4bc]/15 text-[#0b9079]">
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3 5 6v5c0 4.8 2.9 8.2 7 10 4.1-1.8 7-5.2 7-10V6l-7-3Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.2 11 14l4-4"
                />
              </svg>
            </div>

            <div>
              <p className="text-sm font-black">
                Student data is admin-controlled
              </p>

              <p className="mt-1 text-xs leading-5 text-black/50">
                Production student records will be protected by backend RBAC,
                audit logs and server-side authorization. Changes made from
                this admin interface will eventually be persisted through the
                TutorsQue API.
              </p>
            </div>
          </div>
        </motion.section>
      </div>

      {/* Student detail modal */}
      {selectedStudent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 p-4 backdrop-blur-md"
          onClick={() => setSelectedStudent(null)}
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
                    {selectedStudent.initials}
                  </div>

                  <div>
                    <p className="text-xl font-black">
                      {selectedStudent.name}
                    </p>

                    <p className="mt-1 text-xs text-white/40">
                      {selectedStudent.id}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedStudent(null)}
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-sm !text-white transition hover:bg-white/15"
                  aria-label="Close"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="max-h-[70vh] overflow-y-auto p-6 sm:p-7">
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  ["Email", selectedStudent.email],
                  ["Phone", selectedStudent.phone],
                  ["Class", selectedStudent.className],
                  ["Board", selectedStudent.board],
                  ["Medium", selectedStudent.medium],
                  ["School", selectedStudent.school],
                  ["Tutor", selectedStudent.tutor],
                  ["Subjects", `${selectedStudent.subjects} active`],
                  ["Plan", selectedStudent.plan],
                  ["Joined", selectedStudent.joined],
                  ["Last active", selectedStudent.lastActive],
                  ["Status", selectedStudent.status],
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

              <div className="mt-5 rounded-2xl border border-[#42d4bc]/15 bg-[#42d4bc]/6 p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-black/35">
                      Learning progress
                    </p>

                    <p className="mt-1 text-2xl font-black">
                      {selectedStudent.progress}%
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-black/35">
                      Average score
                    </p>

                    <p className="mt-1 text-2xl font-black">
                      {selectedStudent.score}%
                    </p>
                  </div>
                </div>

                <div className="mt-4 h-3 overflow-hidden rounded-full bg-black/[0.06]">
                  <div
                    className="h-full rounded-full bg-[#42d4bc]"
                    style={{
                      width: `${selectedStudent.progress}%`,
                    }}
                  />
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-2 sm:flex-row">
                <button
                  type="button"
                  className="flex-1 rounded-2xl bg-black px-5 py-3.5 text-xs font-black !text-white transition hover:bg-black/85"
                >
                  Edit Student
                </button>

                <button
                  type="button"
                  className="flex-1 rounded-2xl bg-black/[0.05] px-5 py-3.5 text-xs font-black text-black/55 transition hover:bg-black/[0.08]"
                >
                  View Activity
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedStudent(null)}
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