"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Building2,
  CheckCircle2,
  ChevronRight,
  Edit3,
  Eye,
  Filter,
  GraduationCap,
  MapPin,
  Plus,
  Search,
  ShieldCheck,
  Users,
  X,
} from "lucide-react";

type SchoolStatus = "Active" | "Pending" | "Inactive";
type PartnershipType = "Partner School" | "Independent School";

type School = {
  id: string;
  name: string;
  location: string;
  district: string;
  type: PartnershipType;
  students: number;
  teachers: number;
  batches: number;
  status: SchoolStatus;
  joined: string;
  contact: string;
  board: string;
};

const initialSchools: School[] = [
  {
    id: "SCH-001",
    name: "Sri Vidya High School",
    location: "Vizianagaram",
    district: "Vizianagaram",
    type: "Partner School",
    students: 186,
    teachers: 14,
    batches: 18,
    status: "Active",
    joined: "02 Sep 2026",
    contact: "Principal Office",
    board: "AP State Board",
  },
  {
    id: "SCH-002",
    name: "Bright Future School",
    location: "Visakhapatnam",
    district: "Visakhapatnam",
    type: "Partner School",
    students: 224,
    teachers: 19,
    batches: 24,
    status: "Active",
    joined: "04 Sep 2026",
    contact: "Academic Coordinator",
    board: "CBSE",
  },
  {
    id: "SCH-003",
    name: "Little Stars Academy",
    location: "Bobbili",
    district: "Vizianagaram",
    type: "Partner School",
    students: 96,
    teachers: 8,
    batches: 10,
    status: "Active",
    joined: "06 Sep 2026",
    contact: "School Administration",
    board: "AP State Board",
  },
  {
    id: "SCH-004",
    name: "Narayana Concept School",
    location: "Srikakulam",
    district: "Srikakulam",
    type: "Independent School",
    students: 142,
    teachers: 11,
    batches: 15,
    status: "Pending",
    joined: "12 Sep 2026",
    contact: "Operations Manager",
    board: "CBSE",
  },
  {
    id: "SCH-005",
    name: "Future Minds School",
    location: "Parvathipuram",
    district: "Parvathipuram Manyam",
    type: "Partner School",
    students: 118,
    teachers: 9,
    batches: 12,
    status: "Active",
    joined: "08 Sep 2026",
    contact: "School Coordinator",
    board: "AP State Board",
  },
  {
    id: "SCH-006",
    name: "Green Valley Public School",
    location: "Rajam",
    district: "Srikakulam",
    type: "Independent School",
    students: 74,
    teachers: 6,
    batches: 8,
    status: "Inactive",
    joined: "28 Aug 2026",
    contact: "Principal Office",
    board: "CBSE",
  },
  {
    id: "SCH-007",
    name: "Knowledge Tree School",
    location: "Vizianagaram",
    district: "Vizianagaram",
    type: "Partner School",
    students: 165,
    teachers: 13,
    batches: 17,
    status: "Active",
    joined: "10 Sep 2026",
    contact: "Academic Head",
    board: "AP State Board",
  },
];

const statusStyles: Record<SchoolStatus, string> = {
  Active: "border-emerald-200 bg-emerald-500/10 text-emerald-700",
  Pending: "border-amber-200 bg-amber-500/10 text-amber-700",
  Inactive: "border-red-200 bg-red-500/10 text-red-700",
};

function StatusBadge({ status }: { status: SchoolStatus }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold ${statusStyles[status]}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}

function MetricCard({
  title,
  value,
  description,
  icon,
  dark = false,
}: {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={`relative overflow-hidden rounded-[27px] border p-5 shadow-sm ${
        dark
          ? "border-black bg-black !text-white shadow-xl"
          : "border-black/5 bg-white/80"
      } tq-glass`}
    >
      <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#42d4bc]/10 blur-3xl" />

      <div className="relative">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-2xl ${
            dark
              ? "bg-white/10 text-[#42d4bc]"
              : "bg-[#42d4bc]/10 text-[#159e8b]"
          }`}
        >
          {icon}
        </div>

        <p
          className={`mt-5 text-sm font-semibold ${
            dark ? "!text-white/55" : "text-black/45"
          }`}
        >
          {title}
        </p>

        <p className="mt-1 text-2xl font-black tracking-tight">{value}</p>

        <p
          className={`mt-1 text-xs ${
            dark ? "!text-white/35" : "text-black/35"
          }`}
        >
          {description}
        </p>
      </div>
    </motion.div>
  );
}

function DetailBox({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-black/5 bg-black/[0.025] p-4">
      <p className="text-[11px] font-black uppercase tracking-[0.1em] text-black/35">
        {label}
      </p>
      <p className="mt-1 break-words text-sm font-black">{value}</p>
    </div>
  );
}

function ModalOverlay({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/45 p-4 backdrop-blur-md"
      onMouseDown={(event) => {
        if (event.currentTarget === event.target) {
          onClose();
        }
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 15, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.2 }}
        className="my-auto w-full max-w-xl"
      >
        {children}
      </motion.div>
    </div>
  );
}

export default function AdminSchoolsPage() {
  const [schools, setSchools] = useState<School[]>(initialSchools);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [boardFilter, setBoardFilter] = useState("All");

  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingSchool, setEditingSchool] = useState<School | null>(null);

  const [newName, setNewName] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [newDistrict, setNewDistrict] = useState("");
  const [newBoard, setNewBoard] = useState("AP State Board");
  const [newType, setNewType] =
    useState<PartnershipType>("Partner School");

  const activeSchools = schools.filter(
    (school) => school.status === "Active"
  ).length;

  const pendingSchools = schools.filter(
    (school) => school.status === "Pending"
  ).length;

  const totalStudents = schools.reduce(
    (total, school) => total + school.students,
    0
  );

  const totalTeachers = schools.reduce(
    (total, school) => total + school.teachers,
    0
  );

  const filteredSchools = useMemo(() => {
    const query = search.trim().toLowerCase();

    return schools.filter((school) => {
      const matchesSearch =
        !query ||
        school.name.toLowerCase().includes(query) ||
        school.location.toLowerCase().includes(query) ||
        school.district.toLowerCase().includes(query) ||
        school.id.toLowerCase().includes(query) ||
        school.board.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All" || school.status === statusFilter;

      const matchesType =
        typeFilter === "All" || school.type === typeFilter;

      const matchesBoard =
        boardFilter === "All" || school.board === boardFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesType &&
        matchesBoard
      );
    });
  }, [schools, search, statusFilter, typeFilter, boardFilter]);

  const resetFilters = () => {
    setSearch("");
    setStatusFilter("All");
    setTypeFilter("All");
    setBoardFilter("All");
  };

  const addSchool = () => {
    const name = newName.trim();
    const location = newLocation.trim();
    const district = newDistrict.trim();

    if (!name || !location || !district) {
      return;
    }

    const school: School = {
      id: `SCH-${String(schools.length + 1).padStart(3, "0")}`,
      name,
      location,
      district,
      type: newType,
      students: 0,
      teachers: 0,
      batches: 0,
      status: "Pending",
      joined: "14 Sep 2026",
      contact: "School Administration",
      board: newBoard,
    };

    setSchools((current) => [school, ...current]);

    setNewName("");
    setNewLocation("");
    setNewDistrict("");
    setNewBoard("AP State Board");
    setNewType("Partner School");
    setShowAddModal(false);
  };

  const toggleSchoolStatus = (id: string) => {
    setSchools((current) =>
      current.map((school) =>
        school.id === id
          ? {
              ...school,
              status:
                school.status === "Active"
                  ? "Inactive"
                  : "Active",
            }
          : school
      )
    );

    setSelectedSchool((current) => {
      if (!current || current.id !== id) {
        return current;
      }

      return {
        ...current,
        status:
          current.status === "Active" ? "Inactive" : "Active",
      };
    });
  };

  const approveSchool = (id: string) => {
    setSchools((current) =>
      current.map((school) =>
        school.id === id
          ? {
              ...school,
              status: "Active",
            }
          : school
      )
    );

    setSelectedSchool((current) => {
      if (!current || current.id !== id) {
        return current;
      }

      return {
        ...current,
        status: "Active",
      };
    });
  };

  const saveEdit = () => {
    if (!editingSchool) {
      return;
    }

    setSchools((current) =>
      current.map((school) =>
        school.id === editingSchool.id ? editingSchool : school
      )
    );

    setEditingSchool(null);
  };

  return (
    <main className="min-h-screen bg-[#f7f8f7] text-[#111]">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[7%] top-[8%] h-80 w-80 rounded-full bg-[#42d4bc]/10 blur-[110px]" />
        <div className="absolute right-[2%] top-[28%] h-96 w-96 rounded-full bg-cyan-300/10 blur-[120px]" />
        <div className="absolute bottom-[5%] left-[40%] h-80 w-80 rounded-full bg-emerald-200/10 blur-[115px]" />
      </div>

      {/* HEADER */}
      <header className="sticky top-0 z-30 border-b border-black/5 bg-[#f7f8f7]/85 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-5 py-4 lg:px-8">
          <div className="flex items-center gap-3">
            <Link href="/admin/dashboard" className="group">
              <div className="rounded-2xl bg-black px-4 py-2 text-lg font-black tracking-tight !text-white shadow-lg transition group-hover:-translate-y-0.5">
                TQ
              </div>
            </Link>

            <div className="hidden h-8 w-px bg-black/10 sm:block" />

            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-black/35">
                Admin
              </p>
              <h1 className="text-lg font-black tracking-tight">
                Schools & Partners
              </h1>
            </div>
          </div>

          <nav className="hidden items-center gap-1 md:flex">
            <Link
              href="/admin/dashboard"
              className="rounded-xl px-3 py-2 text-sm font-semibold text-black/50 transition hover:bg-black/5 hover:text-black"
            >
              Overview
            </Link>

            <Link
              href="/admin/students"
              className="rounded-xl px-3 py-2 text-sm font-semibold text-black/50 transition hover:bg-black/5 hover:text-black"
            >
              Students
            </Link>

            <Link
              href="/admin/teachers"
              className="rounded-xl px-3 py-2 text-sm font-semibold text-black/50 transition hover:bg-black/5 hover:text-black"
            >
              Teachers
            </Link>

            <Link
              href="/admin/batches"
              className="rounded-xl px-3 py-2 text-sm font-semibold text-black/50 transition hover:bg-black/5 hover:text-black"
            >
              Batches
            </Link>

            <Link
              href="/admin/payments"
              className="rounded-xl px-3 py-2 text-sm font-semibold text-black/50 transition hover:bg-black/5 hover:text-black"
            >
              Payments
            </Link>

            <Link
              href="/admin/reports"
              className="rounded-xl px-3 py-2 text-sm font-semibold text-black/50 transition hover:bg-black/5 hover:text-black"
            >
              Reports
            </Link>
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-[1500px] px-5 py-8 lg:px-8">
        {/* HERO */}
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex flex-col justify-between gap-6 lg:flex-row lg:items-end"
        >
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#42d4bc]/20 bg-[#42d4bc]/10 px-3 py-1.5 text-[11px] font-black tracking-wide text-[#159e8b]">
              <Building2 size={13} />
              SCHOOL PARTNERSHIPS
            </div>

            <h2 className="max-w-4xl text-3xl font-black leading-[1.04] tracking-[-0.045em] sm:text-4xl lg:text-5xl">
              Build the
              <span className="text-[#159e8b]"> local teacher network.</span>
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-black/50">
              Manage partner schools, school teachers, student capacity and
              academic collaboration across the TutorsQue network.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-black px-5 py-3 text-sm font-bold !text-white shadow-xl shadow-black/10 transition hover:-translate-y-0.5"
          >
            <Plus size={17} />
            Add School
          </button>
        </motion.section>

        {/* METRICS */}
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            title="Total Schools"
            value={String(schools.length)}
            description="Registered schools"
            icon={<Building2 size={21} />}
            dark
          />

          <MetricCard
            title="Active Partners"
            value={String(activeSchools)}
            description="Currently operational"
            icon={<CheckCircle2 size={21} />}
          />

          <MetricCard
            title="Students"
            value={totalStudents.toLocaleString("en-IN")}
            description="Across school network"
            icon={<GraduationCap size={21} />}
          />

          <MetricCard
            title="Teachers"
            value={totalTeachers.toLocaleString("en-IN")}
            description={`${pendingSchools} pending partnership${
              pendingSchools === 1 ? "" : "s"
            }`}
            icon={<Users size={21} />}
          />
        </section>

        {/* FILTERS + TABLE */}
        <section className="mt-8 rounded-[30px] border border-black/5 bg-white/75 p-4 shadow-sm tq-glass sm:p-5">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.15em] text-black/35">
                School Directory
              </p>

              <p className="mt-1 text-sm font-bold">
                {filteredSchools.length}{" "}
                {filteredSchools.length === 1
                  ? "school"
                  : "schools"}{" "}
                visible
              </p>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
              {/* SEARCH */}
              <div className="flex min-w-0 items-center gap-2 rounded-2xl border border-black/7 bg-white px-4 py-3 shadow-sm sm:w-[300px]">
                <Search size={17} className="shrink-0 text-black/30" />

                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search school or location..."
                  className="w-full bg-transparent text-sm font-medium outline-none placeholder:text-black/30"
                />
              </div>

              {/* STATUS */}
              <div className="flex items-center gap-2 rounded-2xl border border-black/7 bg-white px-3 shadow-sm">
                <Filter size={15} className="text-black/30" />

                <select
                  value={statusFilter}
                  onChange={(event) =>
                    setStatusFilter(event.target.value)
                  }
                  className="bg-transparent py-3 text-sm font-semibold outline-none"
                >
                  <option value="All">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Pending">Pending</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              {/* TYPE */}
              <div className="flex items-center gap-2 rounded-2xl border border-black/7 bg-white px-3 shadow-sm">
                <select
                  value={typeFilter}
                  onChange={(event) =>
                    setTypeFilter(event.target.value)
                  }
                  className="bg-transparent py-3 text-sm font-semibold outline-none"
                >
                  <option value="All">All Types</option>
                  <option value="Partner School">
                    Partner School
                  </option>
                  <option value="Independent School">
                    Independent School
                  </option>
                </select>
              </div>

              {/* BOARD */}
              <div className="flex items-center gap-2 rounded-2xl border border-black/7 bg-white px-3 shadow-sm">
                <select
                  value={boardFilter}
                  onChange={(event) =>
                    setBoardFilter(event.target.value)
                  }
                  className="bg-transparent py-3 text-sm font-semibold outline-none"
                >
                  <option value="All">All Boards</option>
                  <option value="AP State Board">
                    AP State Board
                  </option>
                  <option value="CBSE">CBSE</option>
                </select>
              </div>

              {(search ||
                statusFilter !== "All" ||
                typeFilter !== "All" ||
                boardFilter !== "All") && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="rounded-2xl border border-black/8 bg-white px-4 py-3 text-sm font-bold text-black/55 transition hover:text-black"
                >
                  Reset
                </button>
              )}
            </div>
          </div>

          <div className="mt-5 overflow-hidden rounded-[24px] border border-black/5 bg-white">
            <div className="hidden grid-cols-[1.45fr_1fr_.8fr_.7fr_.7fr_1fr_auto] gap-4 border-b border-black/5 bg-black/[0.025] px-5 py-4 text-[10px] font-black uppercase tracking-[0.14em] text-black/35 lg:grid">
              <div>School</div>
              <div>Location</div>
              <div>Students</div>
              <div>Teachers</div>
              <div>Batches</div>
              <div>Status</div>
              <div />
            </div>

            <div className="divide-y divide-black/5">
              {filteredSchools.map((school, index) => (
                <motion.div
                  key={school.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.025 }}
                  className="grid gap-4 px-5 py-4 lg:grid-cols-[1.45fr_1fr_.8fr_.7fr_.7fr_1fr_auto] lg:items-center"
                >
                  {/* SCHOOL */}
                  <div className="flex min-w-0 items-center gap-3">
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-sm font-black ${
                        school.status === "Active"
                          ? "bg-[#42d4bc]/10 text-[#159e8b]"
                          : "bg-black text-white"
                      }`}
                    >
                      <Building2 size={18} />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-black">
                        {school.name}
                      </p>

                      <p className="truncate text-xs text-black/40">
                        {school.id} · {school.board}
                      </p>

                      <p className="mt-0.5 truncate text-[11px] text-black/30">
                        {school.type}
                      </p>
                    </div>
                  </div>

                  {/* LOCATION */}
                  <div>
                    <p className="flex items-center gap-1.5 text-sm font-semibold">
                      <MapPin size={14} className="text-black/30" />
                      {school.location}
                    </p>

                    <p className="mt-0.5 text-xs text-black/40">
                      {school.district}
                    </p>
                  </div>

                  {/* STUDENTS */}
                  <div>
                    <p className="text-sm font-black">
                      {school.students}
                    </p>
                    <p className="text-xs text-black/35">
                      students
                    </p>
                  </div>

                  {/* TEACHERS */}
                  <div>
                    <p className="text-sm font-black">
                      {school.teachers}
                    </p>
                    <p className="text-xs text-black/35">
                      teachers
                    </p>
                  </div>

                  {/* BATCHES */}
                  <div>
                    <p className="text-sm font-black">
                      {school.batches}
                    </p>
                    <p className="text-xs text-black/35">
                      batches
                    </p>
                  </div>

                  {/* STATUS */}
                  <div>
                    <StatusBadge status={school.status} />
                  </div>

                  {/* ACTIONS */}
                  <div className="flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedSchool(school)}
                      className="flex h-10 w-10 items-center justify-center rounded-xl bg-black/[0.035] text-black/45 transition hover:bg-black/8 hover:text-black"
                      aria-label={`View ${school.name}`}
                    >
                      <Eye size={16} />
                    </button>

                    <button
                      type="button"
                      onClick={() => setEditingSchool(school)}
                      className="flex h-10 w-10 items-center justify-center rounded-xl bg-black !text-white transition hover:scale-105"
                      aria-label={`Edit ${school.name}`}
                    >
                      <Edit3 size={16} />
                    </button>
                  </div>
                </motion.div>
              ))}

              {filteredSchools.length === 0 && (
                <div className="px-6 py-16 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-black/5 text-black/25">
                    <Search size={22} />
                  </div>

                  <p className="mt-4 font-black">
                    No schools found
                  </p>

                  <p className="mt-1 text-sm text-black/40">
                    Try another search or filter.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* PARTNERSHIP MODEL */}
        <section className="mt-6 grid gap-5 lg:grid-cols-[1.1fr_.9fr]">
          <div className="rounded-[30px] border border-black/5 bg-black p-6 !text-white shadow-xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.16em] !text-white/40">
                  Partnership Model
                </p>

                <h3 className="mt-2 text-2xl font-black !text-white">
                  Local schools become the teacher network.
                </h3>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#42d4bc]/10 text-[#42d4bc]">
                <ShieldCheck size={20} />
              </div>
            </div>

            <p className="mt-4 max-w-2xl text-sm leading-6 !text-white/55">
              Partner schools can connect their teachers to TutorsQue for
              after-school online tuition. The platform manages students,
              batches, classes, payments and teacher earnings.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl bg-white/6 p-4">
                <p className="text-[11px] font-bold !text-white/35">
                  01
                </p>
                <p className="mt-1 text-sm font-bold !text-white">
                  School partnership
                </p>
              </div>

              <div className="rounded-2xl bg-white/6 p-4">
                <p className="text-[11px] font-bold !text-white/35">
                  02
                </p>
                <p className="mt-1 text-sm font-bold !text-white">
                  Teacher onboarding
                </p>
              </div>

              <div className="rounded-2xl bg-white/6 p-4">
                <p className="text-[11px] font-bold !text-white/35">
                  03
                </p>
                <p className="mt-1 text-sm font-bold !text-white">
                  Student enrollment
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[30px] border border-black/5 bg-white/80 p-6 shadow-sm tq-glass">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.16em] text-black/35">
                  Network Snapshot
                </p>

                <h3 className="mt-1 text-2xl font-black">
                  School capacity
                </h3>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#42d4bc]/10 text-[#159e8b]">
                <GraduationCap size={20} />
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <SnapshotRow
                label="Active schools"
                value={String(activeSchools)}
              />

              <SnapshotRow
                label="Total students"
                value={totalStudents.toLocaleString("en-IN")}
              />

              <SnapshotRow
                label="Teacher network"
                value={totalTeachers.toLocaleString("en-IN")}
              />

              <SnapshotRow
                label="Pending partnerships"
                value={String(pendingSchools)}
                last
              />
            </div>
          </div>
        </section>
      </div>

      {/* VIEW SCHOOL */}
      {selectedSchool && (
        <ModalOverlay onClose={() => setSelectedSchool(null)}>
          <div className="w-full max-w-2xl rounded-[30px] border border-black/10 bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#42d4bc]/10 text-[#159e8b]">
                  <Building2 size={25} />
                </div>

                <div>
                  <p className="text-2xl font-black">
                    {selectedSchool.name}
                  </p>

                  <p className="text-sm text-black/40">
                    {selectedSchool.id}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedSchool(null)}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-black !text-white"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              <StatusBadge status={selectedSchool.status} />

              <span className="rounded-full border border-black/8 bg-black/[0.035] px-3 py-1.5 text-xs font-bold text-black/55">
                {selectedSchool.type}
              </span>

              <span className="rounded-full border border-[#42d4bc]/20 bg-[#42d4bc]/10 px-3 py-1.5 text-xs font-bold text-[#159e8b]">
                {selectedSchool.board}
              </span>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <DetailBox
                label="Location"
                value={`${selectedSchool.location}, ${selectedSchool.district}`}
              />

              <DetailBox
                label="School Contact"
                value={selectedSchool.contact}
              />

              <DetailBox
                label="Students"
                value={String(selectedSchool.students)}
              />

              <DetailBox
                label="Teachers"
                value={String(selectedSchool.teachers)}
              />

              <DetailBox
                label="Batches"
                value={String(selectedSchool.batches)}
              />

              <DetailBox
                label="Joined"
                value={selectedSchool.joined}
              />
            </div>

            <div className="mt-5 rounded-2xl bg-[#42d4bc]/8 p-5">
              <p className="text-[11px] font-black uppercase tracking-[0.12em] text-[#159e8b]">
                Partnership Role
              </p>

              <p className="mt-2 text-sm leading-6 text-black/55">
                {selectedSchool.type === "Partner School"
                  ? "This school is part of the TutorsQue teacher network. Its teachers can teach online tuition classes after school hours."
                  : "This school is currently using TutorsQue as an independent school account and can be converted into a formal partner."}
              </p>
            </div>

            <div className="mt-5 flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setSelectedSchool(null);
                  setEditingSchool(selectedSchool);
                }}
                className="flex-1 rounded-2xl bg-black px-5 py-3 text-sm font-bold !text-white"
              >
                <span className="inline-flex items-center justify-center gap-2">
                  <Edit3 size={15} />
                  Edit School
                </span>
              </button>

              {selectedSchool.status === "Pending" ? (
                <button
                  type="button"
                  onClick={() => approveSchool(selectedSchool.id)}
                  className="flex-1 rounded-2xl border border-emerald-200 bg-emerald-500/5 px-5 py-3 text-sm font-bold text-emerald-700"
                >
                  Approve Partnership
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => toggleSchoolStatus(selectedSchool.id)}
                  className="flex-1 rounded-2xl border border-red-200 bg-red-500/5 px-5 py-3 text-sm font-bold text-red-700"
                >
                  {selectedSchool.status === "Active"
                    ? "Deactivate"
                    : "Activate"}
                </button>
              )}
            </div>
          </div>
        </ModalOverlay>
      )}

      {/* EDIT SCHOOL */}
      {editingSchool && (
        <ModalOverlay onClose={() => setEditingSchool(null)}>
          <div className="w-full max-w-xl rounded-[30px] border border-black/10 bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.16em] text-black/35">
                  School Profile
                </p>

                <h3 className="mt-1 text-2xl font-black">
                  Edit School
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setEditingSchool(null)}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-black !text-white"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <label className="block sm:col-span-2">
                <span className="mb-2 block text-xs font-bold text-black/45">
                  School Name
                </span>

                <input
                  value={editingSchool.name}
                  onChange={(event) =>
                    setEditingSchool({
                      ...editingSchool,
                      name: event.target.value,
                    })
                  }
                  className="w-full rounded-2xl border border-black/8 bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-[#42d4bc] focus:ring-4 focus:ring-[#42d4bc]/10"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-xs font-bold text-black/45">
                  Location
                </span>

                <input
                  value={editingSchool.location}
                  onChange={(event) =>
                    setEditingSchool({
                      ...editingSchool,
                      location: event.target.value,
                    })
                  }
                  className="w-full rounded-2xl border border-black/8 bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-[#42d4bc]"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-xs font-bold text-black/45">
                  District
                </span>

                <input
                  value={editingSchool.district}
                  onChange={(event) =>
                    setEditingSchool({
                      ...editingSchool,
                      district: event.target.value,
                    })
                  }
                  className="w-full rounded-2xl border border-black/8 bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-[#42d4bc]"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-xs font-bold text-black/45">
                  Board
                </span>

                <select
                  value={editingSchool.board}
                  onChange={(event) =>
                    setEditingSchool({
                      ...editingSchool,
                      board: event.target.value,
                    })
                  }
                  className="w-full rounded-2xl border border-black/8 bg-white px-4 py-3 text-sm font-bold outline-none focus:border-[#42d4bc]"
                >
                  <option value="AP State Board">
                    AP State Board
                  </option>
                  <option value="CBSE">CBSE</option>
                </select>
              </label>

              <label className="block">
                <span className="mb-2 block text-xs font-bold text-black/45">
                  Partnership Type
                </span>

                <select
                  value={editingSchool.type}
                  onChange={(event) =>
                    setEditingSchool({
                      ...editingSchool,
                      type: event.target.value as PartnershipType,
                    })
                  }
                  className="w-full rounded-2xl border border-black/8 bg-white px-4 py-3 text-sm font-bold outline-none focus:border-[#42d4bc]"
                >
                  <option value="Partner School">
                    Partner School
                  </option>
                  <option value="Independent School">
                    Independent School
                  </option>
                </select>
              </label>

              <label className="block">
                <span className="mb-2 block text-xs font-bold text-black/45">
                  Students
                </span>

                <input
                  type="number"
                  value={editingSchool.students}
                  onChange={(event) =>
                    setEditingSchool({
                      ...editingSchool,
                      students: Number(event.target.value),
                    })
                  }
                  className="w-full rounded-2xl border border-black/8 bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-[#42d4bc]"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-xs font-bold text-black/45">
                  Teachers
                </span>

                <input
                  type="number"
                  value={editingSchool.teachers}
                  onChange={(event) =>
                    setEditingSchool({
                      ...editingSchool,
                      teachers: Number(event.target.value),
                    })
                  }
                  className="w-full rounded-2xl border border-black/8 bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-[#42d4bc]"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-xs font-bold text-black/45">
                  Batches
                </span>

                <input
                  type="number"
                  value={editingSchool.batches}
                  onChange={(event) =>
                    setEditingSchool({
                      ...editingSchool,
                      batches: Number(event.target.value),
                    })
                  }
                  className="w-full rounded-2xl border border-black/8 bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-[#42d4bc]"
                />
              </label>
            </div>

            <div className="mt-5 flex gap-3">
              <button
                type="button"
                onClick={() => setEditingSchool(null)}
                className="flex-1 rounded-2xl border border-black/10 px-5 py-3 text-sm font-bold"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={saveEdit}
                className="flex-1 rounded-2xl bg-black px-5 py-3 text-sm font-bold !text-white"
              >
                Save Changes
              </button>
            </div>
          </div>
        </ModalOverlay>
      )}

      {/* ADD SCHOOL */}
      {showAddModal && (
        <ModalOverlay onClose={() => setShowAddModal(false)}>
          <div className="w-full max-w-xl rounded-[30px] border border-black/10 bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.16em] text-black/35">
                  New Partnership
                </p>

                <h3 className="mt-1 text-2xl font-black">
                  Add School
                </h3>

                <p className="mt-1 text-sm text-black/40">
                  New schools start as pending until reviewed by admin.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-black !text-white"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <label className="block sm:col-span-2">
                <span className="mb-2 block text-xs font-bold text-black/45">
                  School Name
                </span>

                <input
                  value={newName}
                  onChange={(event) => setNewName(event.target.value)}
                  placeholder="Enter school name"
                  className="w-full rounded-2xl border border-black/8 bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-[#42d4bc]"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-xs font-bold text-black/45">
                  City
                </span>

                <input
                  value={newLocation}
                  onChange={(event) =>
                    setNewLocation(event.target.value)
                  }
                  placeholder="e.g. Vizianagaram"
                  className="w-full rounded-2xl border border-black/8 bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-[#42d4bc]"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-xs font-bold text-black/45">
                  District
                </span>

                <input
                  value={newDistrict}
                  onChange={(event) =>
                    setNewDistrict(event.target.value)
                  }
                  placeholder="Enter district"
                  className="w-full rounded-2xl border border-black/8 bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-[#42d4bc]"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-xs font-bold text-black/45">
                  Board
                </span>

                <select
                  value={newBoard}
                  onChange={(event) => setNewBoard(event.target.value)}
                  className="w-full rounded-2xl border border-black/8 bg-white px-4 py-3 text-sm font-bold outline-none focus:border-[#42d4bc]"
                >
                  <option value="AP State Board">
                    AP State Board
                  </option>
                  <option value="CBSE">CBSE</option>
                </select>
              </label>

              <label className="block">
                <span className="mb-2 block text-xs font-bold text-black/45">
                  Partnership Type
                </span>

                <select
                  value={newType}
                  onChange={(event) =>
                    setNewType(
                      event.target.value as PartnershipType
                    )
                  }
                  className="w-full rounded-2xl border border-black/8 bg-white px-4 py-3 text-sm font-bold outline-none focus:border-[#42d4bc]"
                >
                  <option value="Partner School">
                    Partner School
                  </option>
                  <option value="Independent School">
                    Independent School
                  </option>
                </select>
              </label>
            </div>

            <div className="mt-5 rounded-2xl bg-[#42d4bc]/8 p-4">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#159e8b]">
                Next Step
              </p>

              <p className="mt-1 text-sm leading-6 text-black/55">
                After adding the school, admin can verify the partnership and
                connect teachers, students and batches.
              </p>
            </div>

            <div className="mt-5 flex gap-3">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="flex-1 rounded-2xl border border-black/10 px-5 py-3 text-sm font-bold"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={addSchool}
                className="flex-1 rounded-2xl bg-black px-5 py-3 text-sm font-bold !text-white"
              >
                <span className="inline-flex items-center justify-center gap-2">
                  <Plus size={15} />
                  Add School
                </span>
              </button>
            </div>
          </div>
        </ModalOverlay>
      )}
    </main>
  );
}

function SnapshotRow({
  label,
  value,
  last = false,
}: {
  label: string;
  value: string;
  last?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between pb-4 ${
        last ? "" : "border-b border-black/5"
      }`}
    >
      <span className="text-sm font-medium text-black/50">
        {label}
      </span>

      <span className="text-sm font-black">{value}</span>
    </div>
  );
}