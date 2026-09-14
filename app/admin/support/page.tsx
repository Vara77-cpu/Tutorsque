"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  AlertCircle,
  ArrowUpRight,
  Bot,
  CalendarClock,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Eye,
  Filter,
  Headphones,
  MessageCircle,
  Plus,
  Search,
  Send,
  ShieldCheck,
  UserRound,
  Users,
  X,
} from "lucide-react";

type TicketStatus = "Open" | "In Progress" | "Resolved" | "Closed";
type TicketPriority = "High" | "Medium" | "Low";
type TicketCategory =
  | "Payment"
  | "Student"
  | "Teacher"
  | "Technical"
  | "Batch"
  | "Account";

type Ticket = {
  id: string;
  subject: string;
  description: string;
  customer: string;
  customerType: "Student" | "Parent" | "Teacher";
  category: TicketCategory;
  priority: TicketPriority;
  status: TicketStatus;
  assignedTo: string;
  createdAt: string;
  updatedAt: string;
  messages: number;
};

const initialTickets: Ticket[] = [
  {
    id: "TQ-4821",
    subject: "Payment completed but enrollment not active",
    description:
      "Parent says the payment was completed successfully but the student dashboard still shows the old enrollment state.",
    customer: "Suresh Kumar",
    customerType: "Parent",
    category: "Payment",
    priority: "High",
    status: "Open",
    assignedTo: "Finance Team",
    createdAt: "14 Sep 2026 · 06:12 AM",
    updatedAt: "2 min ago",
    messages: 4,
  },
  {
    id: "TQ-4820",
    subject: "Cannot join scheduled live class",
    description:
      "Student is seeing the class in the schedule but the live class join button is not becoming active.",
    customer: "Ananya Reddy",
    customerType: "Student",
    category: "Technical",
    priority: "High",
    status: "In Progress",
    assignedTo: "Support Team",
    createdAt: "14 Sep 2026 · 05:54 AM",
    updatedAt: "8 min ago",
    messages: 7,
  },
  {
    id: "TQ-4819",
    subject: "Teacher availability needs correction",
    description:
      "Teacher requested an update to evening availability for Class 8 Mathematics.",
    customer: "Priya Sharma",
    customerType: "Teacher",
    category: "Teacher",
    priority: "Medium",
    status: "Open",
    assignedTo: "Teacher Operations",
    createdAt: "14 Sep 2026 · 05:31 AM",
    updatedAt: "17 min ago",
    messages: 3,
  },
  {
    id: "TQ-4818",
    subject: "Parent wants to change enrolled subject",
    description:
      "Parent requested replacing Social Science with English for the current tuition plan.",
    customer: "Pooja Sharma",
    customerType: "Parent",
    category: "Student",
    priority: "Medium",
    status: "In Progress",
    assignedTo: "Operations Team",
    createdAt: "13 Sep 2026 · 11:44 PM",
    updatedAt: "39 min ago",
    messages: 5,
  },
  {
    id: "TQ-4817",
    subject: "Batch timetable conflict",
    description:
      "Teacher reports overlap between two Class 9 Science sessions.",
    customer: "Dr. Anil Kumar",
    customerType: "Teacher",
    category: "Batch",
    priority: "High",
    status: "Resolved",
    assignedTo: "Operations Team",
    createdAt: "13 Sep 2026 · 10:42 PM",
    updatedAt: "1 hr ago",
    messages: 8,
  },
  {
    id: "TQ-4816",
    subject: "Need help updating parent email",
    description:
      "Parent wants to change the registered email address on the account.",
    customer: "Rahul Singh",
    customerType: "Parent",
    category: "Account",
    priority: "Low",
    status: "Resolved",
    assignedTo: "Support Team",
    createdAt: "13 Sep 2026 · 09:18 PM",
    updatedAt: "2 hrs ago",
    messages: 2,
  },
  {
    id: "TQ-4815",
    subject: "Teacher payout status clarification",
    description:
      "Teacher is asking when the weekly payout will move from processing to paid.",
    customer: "Karthik Reddy",
    customerType: "Teacher",
    category: "Payment",
    priority: "Medium",
    status: "Closed",
    assignedTo: "Finance Team",
    createdAt: "13 Sep 2026 · 07:40 PM",
    updatedAt: "4 hrs ago",
    messages: 6,
  },
  {
    id: "TQ-4814",
    subject: "Unable to reset password",
    description:
      "Student reports not receiving the password reset email.",
    customer: "Arjun Varma",
    customerType: "Student",
    category: "Account",
    priority: "Low",
    status: "Open",
    assignedTo: "Support Team",
    createdAt: "13 Sep 2026 · 06:52 PM",
    updatedAt: "5 hrs ago",
    messages: 3,
  },
];

const statusStyles: Record<TicketStatus, string> = {
  Open: "border-sky-200 bg-sky-500/10 text-sky-700",
  "In Progress": "border-amber-200 bg-amber-500/10 text-amber-700",
  Resolved: "border-emerald-200 bg-emerald-500/10 text-emerald-700",
  Closed: "border-black/10 bg-black/5 text-black/55",
};

const priorityStyles: Record<TicketPriority, string> = {
  High: "border-red-200 bg-red-500/10 text-red-700",
  Medium: "border-amber-200 bg-amber-500/10 text-amber-700",
  Low: "border-emerald-200 bg-emerald-500/10 text-emerald-700",
};

const categoryStyles: Record<TicketCategory, string> = {
  Payment: "bg-emerald-500/10 text-emerald-700",
  Student: "bg-sky-500/10 text-sky-700",
  Teacher: "bg-[#42d4bc]/10 text-[#159e8b]",
  Technical: "bg-violet-500/10 text-violet-700",
  Batch: "bg-amber-500/10 text-amber-700",
  Account: "bg-black/5 text-black/55",
};

function StatusBadge({ status }: { status: TicketStatus }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold ${statusStyles[status]}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}

function PriorityBadge({ priority }: { priority: TicketPriority }) {
  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1.5 text-xs font-bold ${priorityStyles[priority]}`}
    >
      {priority}
    </span>
  );
}

function CategoryBadge({ category }: { category: TicketCategory }) {
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1.5 text-xs font-bold ${categoryStyles[category]}`}
    >
      {category}
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
        className="my-auto w-full max-w-2xl"
      >
        {children}
      </motion.div>
    </div>
  );
}

export default function AdminSupportPage() {
  const [tickets, setTickets] = useState<Ticket[]>(initialTickets);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

  const [showCreateModal, setShowCreateModal] = useState(false);

  const [newSubject, setNewSubject] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newCustomer, setNewCustomer] = useState("");
  const [newCategory, setNewCategory] =
    useState<TicketCategory>("Technical");
  const [newPriority, setNewPriority] =
    useState<TicketPriority>("Medium");

  const [reply, setReply] = useState("");

  const openTickets = tickets.filter(
    (ticket) => ticket.status === "Open"
  ).length;

  const inProgressTickets = tickets.filter(
    (ticket) => ticket.status === "In Progress"
  ).length;

  const resolvedTickets = tickets.filter(
    (ticket) =>
      ticket.status === "Resolved" || ticket.status === "Closed"
  ).length;

  const urgentTickets = tickets.filter(
    (ticket) =>
      ticket.priority === "High" &&
      ticket.status !== "Resolved" &&
      ticket.status !== "Closed"
  ).length;

  const filteredTickets = useMemo(() => {
    const query = search.trim().toLowerCase();

    return tickets.filter((ticket) => {
      const matchesSearch =
        !query ||
        ticket.id.toLowerCase().includes(query) ||
        ticket.subject.toLowerCase().includes(query) ||
        ticket.description.toLowerCase().includes(query) ||
        ticket.customer.toLowerCase().includes(query) ||
        ticket.assignedTo.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All" || ticket.status === statusFilter;

      const matchesPriority =
        priorityFilter === "All" ||
        ticket.priority === priorityFilter;

      const matchesCategory =
        categoryFilter === "All" ||
        ticket.category === categoryFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPriority &&
        matchesCategory
      );
    });
  }, [
    tickets,
    search,
    statusFilter,
    priorityFilter,
    categoryFilter,
  ]);

  const resetFilters = () => {
    setSearch("");
    setStatusFilter("All");
    setPriorityFilter("All");
    setCategoryFilter("All");
  };

  const updateTicket = (
    id: string,
    updates: Partial<Ticket>
  ) => {
    setTickets((current) =>
      current.map((ticket) =>
        ticket.id === id
          ? {
              ...ticket,
              ...updates,
              updatedAt: "Just now",
            }
          : ticket
      )
    );

    setSelectedTicket((current) =>
      current && current.id === id
        ? {
            ...current,
            ...updates,
            updatedAt: "Just now",
          }
        : current
    );
  };

  const createTicket = () => {
    const subject = newSubject.trim();
    const description = newDescription.trim();
    const customer = newCustomer.trim();

    if (!subject || !description || !customer) {
      return;
    }

    const newTicket: Ticket = {
      id: `TQ-${4822 + tickets.length - initialTickets.length}`,
      subject,
      description,
      customer,
      customerType: "Student",
      category: newCategory,
      priority: newPriority,
      status: "Open",
      assignedTo: "Support Team",
      createdAt: "14 Sep 2026 · Just now",
      updatedAt: "Just now",
      messages: 1,
    };

    setTickets((current) => [newTicket, ...current]);

    setNewSubject("");
    setNewDescription("");
    setNewCustomer("");
    setNewCategory("Technical");
    setNewPriority("Medium");
    setShowCreateModal(false);
  };

  const sendReply = () => {
    if (!selectedTicket || !reply.trim()) {
      return;
    }

    updateTicket(selectedTicket.id, {
      messages: selectedTicket.messages + 1,
      status: "In Progress",
    });

    setReply("");
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
                Support & Helpdesk
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
              <Headphones size={13} />
              SUPPORT OPERATIONS
            </div>

            <h2 className="max-w-4xl text-3xl font-black leading-[1.04] tracking-[-0.045em] sm:text-4xl lg:text-5xl">
              Solve problems
              <span className="text-[#159e8b]"> before they grow.</span>
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-black/50">
              Handle student, parent and teacher support requests, assign
              issues, track resolutions and keep the TutorsQue experience
              running smoothly.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-black px-5 py-3 text-sm font-bold !text-white shadow-xl shadow-black/10 transition hover:-translate-y-0.5"
          >
            <Plus size={17} />
            Create Ticket
          </button>
        </motion.section>

        {/* METRICS */}
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            title="Open Tickets"
            value={String(openTickets)}
            description="Awaiting action"
            icon={<MessageCircle size={21} />}
            dark
          />

          <MetricCard
            title="In Progress"
            value={String(inProgressTickets)}
            description="Being handled"
            icon={<Clock3 size={21} />}
          />

          <MetricCard
            title="Resolved"
            value={String(resolvedTickets)}
            description="Completed tickets"
            icon={<CheckCircle2 size={21} />}
          />

          <MetricCard
            title="Urgent"
            value={String(urgentTickets)}
            description="High priority active"
            icon={<AlertCircle size={21} />}
          />
        </section>

        {/* TICKETS */}
        <section className="mt-8 rounded-[30px] border border-black/5 bg-white/75 p-4 shadow-sm tq-glass sm:p-5">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.15em] text-black/35">
                Support Queue
              </p>

              <p className="mt-1 text-sm font-bold">
                {filteredTickets.length}{" "}
                {filteredTickets.length === 1 ? "ticket" : "tickets"} visible
              </p>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
              <div className="flex min-w-0 items-center gap-2 rounded-2xl border border-black/7 bg-white px-4 py-3 shadow-sm sm:w-[300px]">
                <Search size={17} className="shrink-0 text-black/30" />

                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search ticket, customer..."
                  className="w-full bg-transparent text-sm font-medium outline-none placeholder:text-black/30"
                />
              </div>

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
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>

              <div className="flex items-center gap-2 rounded-2xl border border-black/7 bg-white px-3 shadow-sm">
                <select
                  value={priorityFilter}
                  onChange={(event) =>
                    setPriorityFilter(event.target.value)
                  }
                  className="bg-transparent py-3 text-sm font-semibold outline-none"
                >
                  <option value="All">All Priority</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>

              <div className="flex items-center gap-2 rounded-2xl border border-black/7 bg-white px-3 shadow-sm">
                <select
                  value={categoryFilter}
                  onChange={(event) =>
                    setCategoryFilter(event.target.value)
                  }
                  className="bg-transparent py-3 text-sm font-semibold outline-none"
                >
                  <option value="All">All Categories</option>
                  <option value="Payment">Payment</option>
                  <option value="Student">Student</option>
                  <option value="Teacher">Teacher</option>
                  <option value="Technical">Technical</option>
                  <option value="Batch">Batch</option>
                  <option value="Account">Account</option>
                </select>
              </div>

              {(search ||
                statusFilter !== "All" ||
                priorityFilter !== "All" ||
                categoryFilter !== "All") && (
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
            <div className="hidden grid-cols-[1.45fr_1.35fr_.9fr_.75fr_1fr_auto] gap-4 border-b border-black/5 bg-black/[0.025] px-5 py-4 text-[10px] font-black uppercase tracking-[0.14em] text-black/35 lg:grid">
              <div>Ticket</div>
              <div>Customer</div>
              <div>Category</div>
              <div>Priority</div>
              <div>Status</div>
              <div />
            </div>

            <div className="divide-y divide-black/5">
              {filteredTickets.map((ticket, index) => (
                <motion.div
                  key={ticket.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.025 }}
                  className="grid gap-4 px-5 py-4 lg:grid-cols-[1.45fr_1.35fr_.9fr_.75fr_1fr_auto] lg:items-center"
                >
                  {/* TICKET */}
                  <div className="min-w-0">
                    <div className="flex items-start gap-3">
                      <div
                        className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                          ticket.priority === "High"
                            ? "bg-red-500/10 text-red-600"
                            : "bg-[#42d4bc]/10 text-[#159e8b]"
                        }`}
                      >
                        <MessageCircle size={17} />
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-black">
                          {ticket.subject}
                        </p>

                        <p className="mt-0.5 text-xs text-black/40">
                          {ticket.id} · {ticket.messages} messages
                        </p>

                        <p className="mt-1 hidden truncate text-[11px] text-black/30 xl:block">
                          {ticket.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* CUSTOMER */}
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-black text-xs font-black !text-white">
                      {ticket.customer
                        .split(" ")
                        .map((part) => part[0])
                        .join("")
                        .slice(0, 2)
                        .toUpperCase()}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-black">
                        {ticket.customer}
                      </p>

                      <p className="truncate text-xs text-black/40">
                        {ticket.customerType} · {ticket.assignedTo}
                      </p>
                    </div>
                  </div>

                  {/* CATEGORY */}
                  <div>
                    <CategoryBadge category={ticket.category} />
                  </div>

                  {/* PRIORITY */}
                  <div>
                    <PriorityBadge priority={ticket.priority} />
                  </div>

                  {/* STATUS */}
                  <div>
                    <StatusBadge status={ticket.status} />
                  </div>

                  {/* ACTION */}
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => setSelectedTicket(ticket)}
                      className="flex h-10 w-10 items-center justify-center rounded-xl bg-black !text-white transition hover:scale-105"
                      aria-label={`Open ${ticket.id}`}
                    >
                      <Eye size={16} />
                    </button>
                  </div>
                </motion.div>
              ))}

              {filteredTickets.length === 0 && (
                <div className="px-6 py-16 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-black/5 text-black/25">
                    <Search size={22} />
                  </div>

                  <p className="mt-4 font-black">No tickets found</p>

                  <p className="mt-1 text-sm text-black/40">
                    Try another search or filter.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* SUPPORT OPERATIONS */}
        <section className="mt-6 grid gap-5 lg:grid-cols-[1.1fr_.9fr]">
          <div className="rounded-[30px] border border-black/5 bg-black p-6 !text-white shadow-xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.16em] !text-white/40">
                  Support Operations
                </p>

                <h3 className="mt-2 max-w-xl text-2xl font-black !text-white">
                  One place for every student, parent and teacher problem.
                </h3>
              </div>

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#42d4bc]/10 text-[#42d4bc]">
                <Headphones size={20} />
              </div>
            </div>

            <p className="mt-4 max-w-2xl text-sm leading-6 !text-white/55">
              Route support requests to finance, operations, teacher
              operations or technical support while keeping the complete issue
              history attached to the ticket.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl bg-white/6 p-4">
                <p className="text-[11px] font-bold !text-white/35">
                  01
                </p>
                <p className="mt-1 text-sm font-bold !text-white">
                  Capture issue
                </p>
              </div>

              <div className="rounded-2xl bg-white/6 p-4">
                <p className="text-[11px] font-bold !text-white/35">
                  02
                </p>
                <p className="mt-1 text-sm font-bold !text-white">
                  Assign team
                </p>
              </div>

              <div className="rounded-2xl bg-white/6 p-4">
                <p className="text-[11px] font-bold !text-white/35">
                  03
                </p>
                <p className="mt-1 text-sm font-bold !text-white">
                  Resolve & close
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[30px] border border-black/5 bg-white/80 p-6 shadow-sm tq-glass">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.16em] text-black/35">
                  Support Snapshot
                </p>

                <h3 className="mt-1 text-2xl font-black">
                  Current queue
                </h3>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#42d4bc]/10 text-[#159e8b]">
                <ActivityIcon />
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <SnapshotRow
                label="Open"
                value={String(openTickets)}
              />

              <SnapshotRow
                label="In progress"
                value={String(inProgressTickets)}
              />

              <SnapshotRow
                label="Urgent active"
                value={String(urgentTickets)}
              />

              <SnapshotRow
                label="Resolved / closed"
                value={String(resolvedTickets)}
                last
              />
            </div>
          </div>
        </section>

        {/* AI SUPPORT */}
        <section className="mt-6 rounded-[30px] border border-black/5 bg-white/80 p-6 shadow-sm tq-glass">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#42d4bc]/10 text-[#159e8b]">
                <Bot size={21} />
              </div>

              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.16em] text-black/35">
                  Future AI Support Layer
                </p>

                <h3 className="mt-1 text-xl font-black">
                  Automate repetitive support without losing control.
                </h3>

                <p className="mt-1 max-w-3xl text-sm leading-6 text-black/45">
                  Later, TutorsQue can classify tickets, suggest replies,
                  identify duplicate issues and route conversations to the
                  correct team while administrators retain final control.
                </p>
              </div>
            </div>

            <div className="shrink-0 rounded-2xl bg-black px-4 py-3 !text-white">
              <p className="text-xs font-bold !text-white/40">
                Architecture
              </p>

              <p className="mt-1 text-sm font-black !text-white">
                AI-assisted, human-approved
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* TICKET DETAIL MODAL */}
      {selectedTicket && (
        <ModalOverlay onClose={() => setSelectedTicket(null)}>
          <div className="w-full rounded-[30px] border border-black/10 bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#42d4bc]/10 text-[#159e8b]">
                  <MessageCircle size={21} />
                </div>

                <div>
                  <p className="text-[11px] font-black uppercase tracking-[0.16em] text-black/35">
                    Support Ticket
                  </p>

                  <h3 className="mt-1 text-2xl font-black">
                    {selectedTicket.subject}
                  </h3>

                  <p className="mt-1 text-sm text-black/40">
                    {selectedTicket.id} · {selectedTicket.updatedAt}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedTicket(null)}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-black !text-white"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              <StatusBadge status={selectedTicket.status} />
              <PriorityBadge priority={selectedTicket.priority} />
              <CategoryBadge category={selectedTicket.category} />
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <DetailBox
                label="Customer"
                value={`${selectedTicket.customer} · ${selectedTicket.customerType}`}
              />

              <DetailBox
                label="Assigned Team"
                value={selectedTicket.assignedTo}
              />

              <DetailBox
                label="Created"
                value={selectedTicket.createdAt}
              />

              <DetailBox
                label="Messages"
                value={String(selectedTicket.messages)}
              />
            </div>

            <div className="mt-4 rounded-2xl border border-black/5 bg-black/[0.025] p-5">
              <p className="text-[11px] font-black uppercase tracking-[0.12em] text-black/35">
                Issue Description
              </p>

              <p className="mt-2 text-sm leading-6 text-black/60">
                {selectedTicket.description}
              </p>
            </div>

            {/* STATUS ACTIONS */}
            <div className="mt-4">
              <p className="mb-2 text-xs font-bold text-black/40">
                Update Status
              </p>

              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {(
                  [
                    "Open",
                    "In Progress",
                    "Resolved",
                    "Closed",
                  ] as TicketStatus[]
                ).map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() =>
                      updateTicket(selectedTicket.id, {
                        status,
                      })
                    }
                    className={`rounded-xl border px-3 py-2.5 text-xs font-bold transition ${
                      selectedTicket.status === status
                        ? "border-black bg-black !text-white"
                        : "border-black/8 bg-white text-black/50 hover:text-black"
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            {/* REPLY */}
            <div className="mt-5 rounded-2xl border border-black/5 bg-white p-4">
              <div className="mb-3 flex items-center gap-2">
                <UserRound size={16} className="text-black/35" />
                <p className="text-sm font-black">Admin Reply</p>
              </div>

              <textarea
                value={reply}
                onChange={(event) => setReply(event.target.value)}
                placeholder="Write a response to the customer..."
                rows={4}
                className="w-full resize-none rounded-xl border border-black/7 bg-black/[0.02] px-4 py-3 text-sm font-medium outline-none focus:border-[#42d4bc] focus:ring-4 focus:ring-[#42d4bc]/10"
              />

              <div className="mt-3 flex justify-end">
                <button
                  type="button"
                  onClick={sendReply}
                  className="inline-flex items-center gap-2 rounded-xl bg-black px-4 py-2.5 text-sm font-bold !text-white"
                >
                  <Send size={15} />
                  Send Reply
                </button>
              </div>
            </div>
          </div>
        </ModalOverlay>
      )}

      {/* CREATE TICKET */}
      {showCreateModal && (
        <ModalOverlay onClose={() => setShowCreateModal(false)}>
          <div className="w-full rounded-[30px] border border-black/10 bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.16em] text-black/35">
                  New Support Request
                </p>

                <h3 className="mt-1 text-2xl font-black">
                  Create Ticket
                </h3>

                <p className="mt-1 text-sm text-black/40">
                  Create an internal support case for follow-up.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-black !text-white"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-6 space-y-4">
              <label className="block">
                <span className="mb-2 block text-xs font-bold text-black/45">
                  Customer
                </span>

                <input
                  value={newCustomer}
                  onChange={(event) =>
                    setNewCustomer(event.target.value)
                  }
                  placeholder="Student, parent or teacher name"
                  className="w-full rounded-2xl border border-black/8 bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-[#42d4bc] focus:ring-4 focus:ring-[#42d4bc]/10"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-xs font-bold text-black/45">
                  Subject
                </span>

                <input
                  value={newSubject}
                  onChange={(event) =>
                    setNewSubject(event.target.value)
                  }
                  placeholder="Describe the support issue"
                  className="w-full rounded-2xl border border-black/8 bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-[#42d4bc] focus:ring-4 focus:ring-[#42d4bc]/10"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-xs font-bold text-black/45">
                  Description
                </span>

                <textarea
                  value={newDescription}
                  onChange={(event) =>
                    setNewDescription(event.target.value)
                  }
                  placeholder="Add the complete issue details..."
                  rows={4}
                  className="w-full resize-none rounded-2xl border border-black/8 bg-white px-4 py-3 text-sm font-medium outline-none focus:border-[#42d4bc] focus:ring-4 focus:ring-[#42d4bc]/10"
                />
              </label>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-xs font-bold text-black/45">
                    Category
                  </span>

                  <select
                    value={newCategory}
                    onChange={(event) =>
                      setNewCategory(
                        event.target.value as TicketCategory
                      )
                    }
                    className="w-full rounded-2xl border border-black/8 bg-white px-4 py-3 text-sm font-bold outline-none focus:border-[#42d4bc]"
                  >
                    <option value="Payment">Payment</option>
                    <option value="Student">Student</option>
                    <option value="Teacher">Teacher</option>
                    <option value="Technical">Technical</option>
                    <option value="Batch">Batch</option>
                    <option value="Account">Account</option>
                  </select>
                </label>

                <label className="block">
                  <span className="mb-2 block text-xs font-bold text-black/45">
                    Priority
                  </span>

                  <select
                    value={newPriority}
                    onChange={(event) =>
                      setNewPriority(
                        event.target.value as TicketPriority
                      )
                    }
                    className="w-full rounded-2xl border border-black/8 bg-white px-4 py-3 text-sm font-bold outline-none focus:border-[#42d4bc]"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </label>
              </div>
            </div>

            <div className="mt-5 rounded-2xl bg-[#42d4bc]/8 p-4">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#159e8b]">
                Routing
              </p>

              <p className="mt-1 text-sm leading-6 text-black/55">
                The demo ticket will start in the Support Team queue and can
                later be routed to the appropriate operations team.
              </p>
            </div>

            <div className="mt-5 flex gap-3">
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="flex-1 rounded-2xl border border-black/10 px-5 py-3 text-sm font-bold"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={createTicket}
                className="flex-1 rounded-2xl bg-black px-5 py-3 text-sm font-bold !text-white"
              >
                <span className="inline-flex items-center justify-center gap-2">
                  <Plus size={15} />
                  Create Ticket
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
      <span className="text-sm font-medium text-black/50">{label}</span>
      <span className="text-sm font-black">{value}</span>
    </div>
  );
}

function ActivityIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 12h4l2-8 4 16 2-8h6" />
    </svg>
  );
}