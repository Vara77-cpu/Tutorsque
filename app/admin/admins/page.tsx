"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Activity,
  CheckCircle2,
  ChevronDown,
  Edit3,
  Eye,
  Filter,
  KeyRound,
  MoreHorizontal,
  Plus,
  Search,
  ShieldCheck,
  Trash2,
  UserCog,
  Users,
  X,
} from "lucide-react";

type AdminStatus = "Active" | "Invited" | "Suspended";
type AdminRole =
  | "Super Admin"
  | "Finance Admin"
  | "Operations Admin"
  | "Teacher Admin"
  | "Support Admin";

type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  status: AdminStatus;
  lastActive: string;
  joined: string;
  permissions: string[];
  initials: string;
};

const initialAdmins: AdminUser[] = [
  {
    id: "ADM-001",
    name: "Vara",
    email: "admin@tutorsque.com",
    role: "Super Admin",
    status: "Active",
    lastActive: "Just now",
    joined: "01 Sep 2026",
    permissions: ["Full platform access", "User management", "Finance", "Settings"],
    initials: "VA",
  },
  {
    id: "ADM-002",
    name: "Anil Kumar",
    email: "finance@tutorsque.com",
    role: "Finance Admin",
    status: "Active",
    lastActive: "8 min ago",
    joined: "03 Sep 2026",
    permissions: ["Payments", "Refunds", "Teacher payouts", "Reports"],
    initials: "AK",
  },
  {
    id: "ADM-003",
    name: "Priya Sharma",
    email: "operations@tutorsque.com",
    role: "Operations Admin",
    status: "Active",
    lastActive: "24 min ago",
    joined: "05 Sep 2026",
    permissions: ["Students", "Batches", "Schedules", "Enrollments"],
    initials: "PS",
  },
  {
    id: "ADM-004",
    name: "Karthik Reddy",
    email: "teachers@tutorsque.com",
    role: "Teacher Admin",
    status: "Active",
    lastActive: "42 min ago",
    joined: "06 Sep 2026",
    permissions: ["Teacher applications", "Verification", "Profiles"],
    initials: "KR",
  },
  {
    id: "ADM-005",
    name: "Sneha Rao",
    email: "support@tutorsque.com",
    role: "Support Admin",
    status: "Active",
    lastActive: "1 hr ago",
    joined: "08 Sep 2026",
    permissions: ["Support", "Student profiles", "Notifications"],
    initials: "SR",
  },
  {
    id: "ADM-006",
    name: "Rahul Verma",
    email: "rahul@tutorsque.com",
    role: "Operations Admin",
    status: "Invited",
    lastActive: "Not active",
    joined: "14 Sep 2026",
    permissions: ["Students", "Batches", "Schedules"],
    initials: "RV",
  },
];

const roleDescriptions: Record<AdminRole, string> = {
  "Super Admin": "Complete control across the TutorsQue platform.",
  "Finance Admin": "Manage payments, refunds, payouts and finance reports.",
  "Operations Admin": "Manage students, batches, schedules and enrollments.",
  "Teacher Admin": "Manage teacher applications, verification and profiles.",
  "Support Admin": "Manage support operations and student assistance.",
};

const roleColors: Record<AdminRole, string> = {
  "Super Admin":
    "border-violet-200 bg-violet-500/10 text-violet-700",
  "Finance Admin":
    "border-emerald-200 bg-emerald-500/10 text-emerald-700",
  "Operations Admin":
    "border-sky-200 bg-sky-500/10 text-sky-700",
  "Teacher Admin":
    "border-[#42d4bc]/20 bg-[#42d4bc]/10 text-[#159e8b]",
  "Support Admin":
    "border-amber-200 bg-amber-500/10 text-amber-700",
};

const statusColors: Record<AdminStatus, string> = {
  Active: "border-emerald-200 bg-emerald-500/10 text-emerald-700",
  Invited: "border-sky-200 bg-sky-500/10 text-sky-700",
  Suspended: "border-red-200 bg-red-500/10 text-red-700",
};

function StatusBadge({ status }: { status: AdminStatus }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold ${statusColors[status]}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}

function RoleBadge({ role }: { role: AdminRole }) {
  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1.5 text-xs font-bold ${roleColors[role]}`}
    >
      {role}
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
      className={`relative overflow-hidden rounded-[26px] border p-5 shadow-sm ${
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

export default function AdminUsersPage() {
  const [admins, setAdmins] = useState<AdminUser[]>(initialAdmins);

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const [selectedAdmin, setSelectedAdmin] =
    useState<AdminUser | null>(null);

  const [editingAdmin, setEditingAdmin] =
    useState<AdminUser | null>(null);

  const [showAddModal, setShowAddModal] = useState(false);

  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newRole, setNewRole] =
    useState<AdminRole>("Operations Admin");

  const filteredAdmins = useMemo(() => {
    const query = search.trim().toLowerCase();

    return admins.filter((admin) => {
      const matchesSearch =
        !query ||
        admin.name.toLowerCase().includes(query) ||
        admin.email.toLowerCase().includes(query) ||
        admin.id.toLowerCase().includes(query) ||
        admin.role.toLowerCase().includes(query);

      const matchesRole =
        roleFilter === "All" || admin.role === roleFilter;

      const matchesStatus =
        statusFilter === "All" || admin.status === statusFilter;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [admins, search, roleFilter, statusFilter]);

  const activeAdmins = admins.filter(
    (admin) => admin.status === "Active"
  ).length;

  const invitedAdmins = admins.filter(
    (admin) => admin.status === "Invited"
  ).length;

  const suspendedAdmins = admins.filter(
    (admin) => admin.status === "Suspended"
  ).length;

  const superAdmins = admins.filter(
    (admin) => admin.role === "Super Admin"
  ).length;

  const addAdmin = () => {
    const cleanName = newName.trim();
    const cleanEmail = newEmail.trim();

    if (!cleanName || !cleanEmail) {
      return;
    }

    const initials = cleanName
      .split(" ")
      .filter(Boolean)
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

    const newAdmin: AdminUser = {
      id: `ADM-${String(admins.length + 1).padStart(3, "0")}`,
      name: cleanName,
      email: cleanEmail,
      role: newRole,
      status: "Invited",
      lastActive: "Not active",
      joined: "14 Sep 2026",
      permissions:
        newRole === "Super Admin"
          ? ["Full platform access", "User management", "Finance", "Settings"]
          : newRole === "Finance Admin"
          ? ["Payments", "Refunds", "Teacher payouts", "Reports"]
          : newRole === "Teacher Admin"
          ? ["Teacher applications", "Verification", "Profiles"]
          : newRole === "Support Admin"
          ? ["Support", "Student profiles", "Notifications"]
          : ["Students", "Batches", "Schedules", "Enrollments"],
      initials,
    };

    setAdmins((current) => [newAdmin, ...current]);

    setNewName("");
    setNewEmail("");
    setNewRole("Operations Admin");
    setShowAddModal(false);
  };

  const toggleStatus = (id: string) => {
    setAdmins((current) =>
      current.map((admin) => {
        if (admin.id !== id) {
          return admin;
        }

        return {
          ...admin,
          status:
            admin.status === "Suspended"
              ? "Active"
              : "Suspended",
        };
      })
    );

    setSelectedAdmin((current) => {
      if (!current || current.id !== id) {
        return current;
      }

      return {
        ...current,
        status:
          current.status === "Suspended"
            ? "Active"
            : "Suspended",
      };
    });
  };

  const resendInvite = (id: string) => {
    setAdmins((current) =>
      current.map((admin) =>
        admin.id === id
          ? {
              ...admin,
              status: "Invited",
              lastActive: "Invitation resent",
            }
          : admin
      )
    );
  };

  const saveRole = (id: string, role: AdminRole) => {
    setAdmins((current) =>
      current.map((admin) =>
        admin.id === id
          ? {
              ...admin,
              role,
              permissions:
                role === "Super Admin"
                  ? ["Full platform access", "User management", "Finance", "Settings"]
                  : role === "Finance Admin"
                  ? ["Payments", "Refunds", "Teacher payouts", "Reports"]
                  : role === "Teacher Admin"
                  ? ["Teacher applications", "Verification", "Profiles"]
                  : role === "Support Admin"
                  ? ["Support", "Student profiles", "Notifications"]
                  : ["Students", "Batches", "Schedules", "Enrollments"],
            }
          : admin
      )
    );

    setEditingAdmin(null);
  };

  const resetFilters = () => {
    setSearch("");
    setRoleFilter("All");
    setStatusFilter("All");
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
                Admin Users & Roles
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
              href="/admin/audit-logs"
              className="rounded-xl px-3 py-2 text-sm font-semibold text-black/50 transition hover:bg-black/5 hover:text-black"
            >
              Audit Logs
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
              <ShieldCheck size={13} />
              ACCESS CONTROL CENTER
            </div>

            <h2 className="max-w-4xl text-3xl font-black leading-[1.04] tracking-[-0.045em] sm:text-4xl lg:text-5xl">
              The right people.
              <span className="text-[#159e8b]"> The right access.</span>
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-black/50">
              Manage administrator accounts, role permissions, invitations and
              platform access from one secure workspace.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-black px-5 py-3 text-sm font-bold !text-white shadow-xl shadow-black/10 transition hover:-translate-y-0.5"
          >
            <Plus size={17} />
            Add Admin
          </button>
        </motion.section>

        {/* METRICS */}
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            title="Total Admins"
            value={String(admins.length)}
            description="Platform administrators"
            icon={<Users size={21} />}
            dark
          />

          <MetricCard
            title="Active Admins"
            value={String(activeAdmins)}
            description="Currently enabled"
            icon={<CheckCircle2 size={21} />}
          />

          <MetricCard
            title="Pending Invites"
            value={String(invitedAdmins)}
            description="Awaiting activation"
            icon={<Activity size={21} />}
          />

          <MetricCard
            title="Super Admins"
            value={String(superAdmins)}
            description={`${suspendedAdmins} suspended account${
              suspendedAdmins === 1 ? "" : "s"
            }`}
            icon={<ShieldCheck size={21} />}
          />
        </section>

        {/* WORKSPACE */}
        <section className="mt-8 rounded-[30px] border border-black/5 bg-white/75 p-4 shadow-sm tq-glass sm:p-5">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.15em] text-black/35">
                Administrator Directory
              </p>

              <p className="mt-1 text-sm font-bold">
                {filteredAdmins.length}{" "}
                {filteredAdmins.length === 1 ? "administrator" : "administrators"}{" "}
                visible
              </p>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
              <div className="flex min-w-0 items-center gap-2 rounded-2xl border border-black/7 bg-white px-4 py-3 shadow-sm sm:w-[310px]">
                <Search size={17} className="shrink-0 text-black/30" />

                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search name, email, role..."
                  className="w-full bg-transparent text-sm font-medium outline-none placeholder:text-black/30"
                />
              </div>

              <div className="flex items-center gap-2 rounded-2xl border border-black/7 bg-white px-3 shadow-sm">
                <Filter size={15} className="text-black/30" />

                <select
                  value={roleFilter}
                  onChange={(event) => setRoleFilter(event.target.value)}
                  className="bg-transparent py-3 text-sm font-semibold outline-none"
                >
                  <option value="All">All Roles</option>
                  <option value="Super Admin">Super Admin</option>
                  <option value="Finance Admin">Finance Admin</option>
                  <option value="Operations Admin">
                    Operations Admin
                  </option>
                  <option value="Teacher Admin">Teacher Admin</option>
                  <option value="Support Admin">Support Admin</option>
                </select>
              </div>

              <div className="flex items-center gap-2 rounded-2xl border border-black/7 bg-white px-3 shadow-sm">
                <select
                  value={statusFilter}
                  onChange={(event) => setStatusFilter(event.target.value)}
                  className="bg-transparent py-3 text-sm font-semibold outline-none"
                >
                  <option value="All">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Invited">Invited</option>
                  <option value="Suspended">Suspended</option>
                </select>
              </div>

              {(search ||
                roleFilter !== "All" ||
                statusFilter !== "All") && (
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

          {/* TABLE */}
          <div className="mt-5 overflow-hidden rounded-[24px] border border-black/5 bg-white">
            <div className="hidden grid-cols-[1.3fr_1.35fr_1fr_.8fr_1fr_auto] gap-4 border-b border-black/5 bg-black/[0.025] px-5 py-4 text-[10px] font-black uppercase tracking-[0.14em] text-black/35 lg:grid">
              <div>Administrator</div>
              <div>Role</div>
              <div>Last Active</div>
              <div>Status</div>
              <div>Joined</div>
              <div />
            </div>

            <div className="divide-y divide-black/5">
              {filteredAdmins.map((admin, index) => (
                <motion.div
                  key={admin.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.025 }}
                  className="grid gap-4 px-5 py-4 lg:grid-cols-[1.3fr_1.35fr_1fr_.8fr_1fr_auto] lg:items-center"
                >
                  {/* ADMIN */}
                  <div className="flex min-w-0 items-center gap-3">
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-sm font-black ${
                        admin.role === "Super Admin"
                          ? "bg-black !text-white"
                          : "bg-[#42d4bc]/10 text-[#159e8b]"
                      }`}
                    >
                      {admin.initials}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-black">
                        {admin.name}
                      </p>

                      <p className="truncate text-xs text-black/40">
                        {admin.email}
                      </p>

                      <p className="mt-0.5 truncate text-[11px] text-black/30">
                        {admin.id}
                      </p>
                    </div>
                  </div>

                  {/* ROLE */}
                  <div>
                    <RoleBadge role={admin.role} />

                    <p className="mt-1 hidden text-xs text-black/35 xl:block">
                      {roleDescriptions[admin.role]}
                    </p>
                  </div>

                  {/* LAST ACTIVE */}
                  <p className="text-sm font-semibold text-black/55">
                    {admin.lastActive}
                  </p>

                  {/* STATUS */}
                  <StatusBadge status={admin.status} />

                  {/* JOINED */}
                  <p className="text-sm font-medium text-black/45">
                    {admin.joined}
                  </p>

                  {/* ACTIONS */}
                  <div className="flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedAdmin(admin)}
                      className="flex h-10 w-10 items-center justify-center rounded-xl bg-black/[0.035] text-black/45 transition hover:bg-black/8 hover:text-black"
                      aria-label={`View ${admin.name}`}
                    >
                      <Eye size={16} />
                    </button>

                    <button
                      type="button"
                      onClick={() => setEditingAdmin(admin)}
                      className="flex h-10 w-10 items-center justify-center rounded-xl bg-black !text-white transition hover:scale-105"
                      aria-label={`Edit ${admin.name}`}
                    >
                      <Edit3 size={16} />
                    </button>
                  </div>
                </motion.div>
              ))}

              {filteredAdmins.length === 0 && (
                <div className="px-6 py-16 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-black/5 text-black/25">
                    <Search size={22} />
                  </div>

                  <p className="mt-4 font-black">
                    No administrators found
                  </p>

                  <p className="mt-1 text-sm text-black/40">
                    Try another search or filter.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ROLES */}
        <section className="mt-6">
          <div className="mb-4">
            <p className="text-[11px] font-black uppercase tracking-[0.15em] text-black/35">
              Role Architecture
            </p>

            <h3 className="mt-1 text-2xl font-black">
              Permission groups
            </h3>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {(Object.keys(roleDescriptions) as AdminRole[]).map((role) => {
              const count = admins.filter(
                (admin) => admin.role === role
              ).length;

              return (
                <motion.div
                  key={role}
                  whileHover={{ y: -3 }}
                  className="rounded-[24px] border border-black/5 bg-white/75 p-5 shadow-sm tq-glass"
                >
                  <div className="flex items-center justify-between gap-3">
                    <RoleBadge role={role} />

                    <span className="rounded-full bg-black/5 px-2.5 py-1 text-xs font-black">
                      {count}
                    </span>
                  </div>

                  <p className="mt-4 text-sm font-bold">{role}</p>

                  <p className="mt-1 text-xs leading-5 text-black/40">
                    {roleDescriptions[role]}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* SECURITY NOTE */}
        <section className="mt-6 rounded-[30px] border border-black/5 bg-black p-6 !text-white shadow-xl">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#42d4bc]/10 text-[#42d4bc]">
                <KeyRound size={21} />
              </div>

              <div>
                <p className="text-xs font-black uppercase tracking-[0.14em] !text-white/40">
                  Access Policy
                </p>

                <h3 className="mt-1 text-xl font-black !text-white">
                  Keep privileges minimal and role-based.
                </h3>

                <p className="mt-1 max-w-2xl text-sm leading-6 !text-white/50">
                  Administrators should only receive the operational access
                  required for their responsibilities. Sensitive actions should
                  remain restricted to authorized roles.
                </p>
              </div>
            </div>

            <Link
              href="/admin/audit-logs"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-bold text-black transition hover:bg-[#42d4bc]"
            >
              <Activity size={16} />
              View Audit Logs
            </Link>
          </div>
        </section>
      </div>

      {/* VIEW ADMIN MODAL */}
      {selectedAdmin && (
        <ModalOverlay onClose={() => setSelectedAdmin(null)}>
          <div className="w-full max-w-xl rounded-[30px] border border-black/10 bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl text-lg font-black ${
                    selectedAdmin.role === "Super Admin"
                      ? "bg-black !text-white"
                      : "bg-[#42d4bc]/10 text-[#159e8b]"
                  }`}
                >
                  {selectedAdmin.initials}
                </div>

                <div>
                  <p className="text-xl font-black">
                    {selectedAdmin.name}
                  </p>

                  <p className="text-sm text-black/40">
                    {selectedAdmin.email}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedAdmin(null)}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-black !text-white"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              <RoleBadge role={selectedAdmin.role} />
              <StatusBadge status={selectedAdmin.status} />
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <DetailBox label="Admin ID" value={selectedAdmin.id} />
              <DetailBox label="Joined" value={selectedAdmin.joined} />
              <DetailBox
                label="Last Active"
                value={selectedAdmin.lastActive}
              />
              <DetailBox
                label="Role"
                value={selectedAdmin.role}
              />
            </div>

            <div className="mt-4 rounded-2xl border border-black/5 bg-black/[0.025] p-5">
              <p className="text-[11px] font-black uppercase tracking-[0.12em] text-black/35">
                Permissions
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                {selectedAdmin.permissions.map((permission) => (
                  <span
                    key={permission}
                    className="rounded-full border border-black/8 bg-white px-3 py-1.5 text-xs font-bold text-black/55"
                  >
                    {permission}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-5 flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setSelectedAdmin(null);
                  setEditingAdmin(selectedAdmin);
                }}
                className="flex-1 rounded-2xl bg-black px-5 py-3 text-sm font-bold !text-white"
              >
                <span className="inline-flex items-center justify-center gap-2">
                  <Edit3 size={15} />
                  Edit Access
                </span>
              </button>

              {selectedAdmin.status === "Invited" ? (
                <button
                  type="button"
                  onClick={() => resendInvite(selectedAdmin.id)}
                  className="flex-1 rounded-2xl border border-black/10 px-5 py-3 text-sm font-bold"
                >
                  Resend Invite
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => toggleStatus(selectedAdmin.id)}
                  className="flex-1 rounded-2xl border border-red-200 bg-red-500/5 px-5 py-3 text-sm font-bold text-red-700"
                >
                  {selectedAdmin.status === "Suspended"
                    ? "Activate"
                    : "Suspend"}
                </button>
              )}
            </div>
          </div>
        </ModalOverlay>
      )}

      {/* EDIT ROLE MODAL */}
      {editingAdmin && (
        <ModalOverlay onClose={() => setEditingAdmin(null)}>
          <div className="w-full max-w-lg rounded-[30px] border border-black/10 bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.16em] text-black/35">
                  Edit Access
                </p>

                <h3 className="mt-1 text-2xl font-black">
                  {editingAdmin.name}
                </h3>

                <p className="mt-1 text-sm text-black/40">
                  {editingAdmin.email}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setEditingAdmin(null)}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-black !text-white"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-6">
              <p className="mb-2 text-xs font-bold text-black/45">
                Administrator Role
              </p>

              <select
                defaultValue={editingAdmin.role}
                onChange={(event) => {
                  const role = event.target.value as AdminRole;

                  setEditingAdmin((current) =>
                    current
                      ? {
                          ...current,
                          role,
                        }
                      : current
                  );
                }}
                className="w-full rounded-2xl border border-black/8 bg-white px-4 py-3 text-sm font-bold outline-none focus:border-[#42d4bc]"
              >
                <option value="Super Admin">Super Admin</option>
                <option value="Finance Admin">Finance Admin</option>
                <option value="Operations Admin">
                  Operations Admin
                </option>
                <option value="Teacher Admin">Teacher Admin</option>
                <option value="Support Admin">Support Admin</option>
              </select>
            </div>

            <div className="mt-4 rounded-2xl bg-[#42d4bc]/8 p-4">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#159e8b]">
                Role Description
              </p>

              <p className="mt-2 text-sm leading-6 text-black/55">
                {roleDescriptions[editingAdmin.role]}
              </p>
            </div>

            <div className="mt-5 flex gap-3">
              <button
                type="button"
                onClick={() => setEditingAdmin(null)}
                className="flex-1 rounded-2xl border border-black/10 px-5 py-3 text-sm font-bold"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() =>
                  saveRole(editingAdmin.id, editingAdmin.role)
                }
                className="flex-1 rounded-2xl bg-black px-5 py-3 text-sm font-bold !text-white"
              >
                Save Access
              </button>
            </div>
          </div>
        </ModalOverlay>
      )}

      {/* ADD ADMIN MODAL */}
      {showAddModal && (
        <ModalOverlay onClose={() => setShowAddModal(false)}>
          <div className="w-full max-w-lg rounded-[30px] border border-black/10 bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.16em] text-black/35">
                  New Administrator
                </p>

                <h3 className="mt-1 text-2xl font-black">
                  Add Admin
                </h3>

                <p className="mt-1 text-sm text-black/40">
                  The new account will be created as an invitation.
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

            <div className="mt-6 space-y-4">
              <label className="block">
                <span className="mb-2 block text-xs font-bold text-black/45">
                  Full Name
                </span>

                <input
                  value={newName}
                  onChange={(event) => setNewName(event.target.value)}
                  placeholder="Enter administrator name"
                  className="w-full rounded-2xl border border-black/8 bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-[#42d4bc] focus:ring-4 focus:ring-[#42d4bc]/10"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-xs font-bold text-black/45">
                  Email Address
                </span>

                <input
                  type="email"
                  value={newEmail}
                  onChange={(event) => setNewEmail(event.target.value)}
                  placeholder="admin@tutorsque.com"
                  className="w-full rounded-2xl border border-black/8 bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-[#42d4bc] focus:ring-4 focus:ring-[#42d4bc]/10"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-xs font-bold text-black/45">
                  Administrator Role
                </span>

                <select
                  value={newRole}
                  onChange={(event) =>
                    setNewRole(event.target.value as AdminRole)
                  }
                  className="w-full rounded-2xl border border-black/8 bg-white px-4 py-3 text-sm font-bold outline-none focus:border-[#42d4bc]"
                >
                  <option value="Super Admin">Super Admin</option>
                  <option value="Finance Admin">Finance Admin</option>
                  <option value="Operations Admin">
                    Operations Admin
                  </option>
                  <option value="Teacher Admin">Teacher Admin</option>
                  <option value="Support Admin">Support Admin</option>
                </select>
              </label>
            </div>

            <div className="mt-4 rounded-2xl bg-black/[0.025] p-4">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-black/35">
                Access
              </p>

              <p className="mt-2 text-sm leading-6 text-black/55">
                {roleDescriptions[newRole]}
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
                onClick={addAdmin}
                className="flex-1 rounded-2xl bg-black px-5 py-3 text-sm font-bold !text-white"
              >
                <span className="inline-flex items-center justify-center gap-2">
                  <Plus size={15} />
                  Send Invitation
                </span>
              </button>
            </div>
          </div>
        </ModalOverlay>
      )}
    </main>
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
    <div className="rounded-2xl border border-black/5 bg-white p-4">
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
        className="my-auto w-full"
      >
        {children}
      </motion.div>
    </div>
  );
}