"use client";

import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Banknote,
  CalendarDays,
  CheckCircle2,
  CircleDollarSign,
  Clock3,
  Download,
  Eye,
  Filter,
  IndianRupee,
  RefreshCcw,
  Search,
  WalletCards,
  X,
  Zap,
} from "lucide-react";

type PaymentStatus = "Paid" | "Pending" | "Failed" | "Refunded";
type PayoutStatus = "Pending" | "Processing" | "Paid";

type StudentPayment = {
  id: string;
  student: string;
  parent: string;
  plan: string;
  subject: string;
  amount: number;
  method: string;
  transactionId: string;
  date: string;
  status: PaymentStatus;
};

type TeacherPayout = {
  id: string;
  teacher: string;
  verifiedClasses: number;
  grossEarnings: number;
  payoutAmount: number;
  period: string;
  method: string;
  account: string;
  status: PayoutStatus;
};

const initialPayments: StudentPayment[] = [
  {
    id: "PAY-10482",
    student: "Aarav Kumar",
    parent: "Suresh Kumar",
    plan: "Monthly Premium",
    subject: "Mathematics",
    amount: 2499,
    method: "UPI",
    transactionId: "TXN879421",
    date: "14 Sep 2026",
    status: "Paid",
  },
  {
    id: "PAY-10481",
    student: "Ananya Reddy",
    parent: "Priya Reddy",
    plan: "Monthly Standard",
    subject: "Science",
    amount: 1999,
    method: "Card",
    transactionId: "TXN879408",
    date: "14 Sep 2026",
    status: "Paid",
  },
  {
    id: "PAY-10480",
    student: "Vihaan Rao",
    parent: "Naveen Rao",
    plan: "Quarterly Premium",
    subject: "Mathematics",
    amount: 6499,
    method: "UPI",
    transactionId: "TXN879391",
    date: "13 Sep 2026",
    status: "Paid",
  },
  {
    id: "PAY-10479",
    student: "Saanvi Singh",
    parent: "Rahul Singh",
    plan: "Monthly Standard",
    subject: "English",
    amount: 1999,
    method: "Net Banking",
    transactionId: "TXN879350",
    date: "13 Sep 2026",
    status: "Pending",
  },
  {
    id: "PAY-10478",
    student: "Arjun Varma",
    parent: "Kiran Varma",
    plan: "Monthly Premium",
    subject: "Mathematics",
    amount: 2499,
    method: "UPI",
    transactionId: "TXN879317",
    date: "12 Sep 2026",
    status: "Paid",
  },
  {
    id: "PAY-10477",
    student: "Diya Sharma",
    parent: "Pooja Sharma",
    plan: "Monthly Standard",
    subject: "Social Science",
    amount: 1999,
    method: "Card",
    transactionId: "TXN879281",
    date: "12 Sep 2026",
    status: "Refunded",
  },
  {
    id: "PAY-10476",
    student: "Ishaan Patel",
    parent: "Rakesh Patel",
    plan: "Monthly Premium",
    subject: "Science",
    amount: 2499,
    method: "UPI",
    transactionId: "TXN879240",
    date: "11 Sep 2026",
    status: "Failed",
  },
];

const initialPayouts: TeacherPayout[] = [
  {
    id: "PO-5821",
    teacher: "Dr. Anil Kumar",
    verifiedClasses: 16,
    grossEarnings: 9600,
    payoutAmount: 9600,
    period: "08 Sep – 14 Sep",
    method: "Bank Transfer",
    account: "•••• 4921",
    status: "Pending",
  },
  {
    id: "PO-5820",
    teacher: "Priya Sharma",
    verifiedClasses: 14,
    grossEarnings: 8400,
    payoutAmount: 8400,
    period: "08 Sep – 14 Sep",
    method: "Bank Transfer",
    account: "•••• 2817",
    status: "Pending",
  },
  {
    id: "PO-5819",
    teacher: "Karthik Reddy",
    verifiedClasses: 18,
    grossEarnings: 10800,
    payoutAmount: 10800,
    period: "08 Sep – 14 Sep",
    method: "UPI",
    account: "karthik@upi",
    status: "Processing",
  },
  {
    id: "PO-5818",
    teacher: "Sneha Rao",
    verifiedClasses: 12,
    grossEarnings: 7200,
    payoutAmount: 7200,
    period: "08 Sep – 14 Sep",
    method: "Bank Transfer",
    account: "•••• 6712",
    status: "Paid",
  },
  {
    id: "PO-5817",
    teacher: "Ravi Teja",
    verifiedClasses: 20,
    grossEarnings: 12000,
    payoutAmount: 12000,
    period: "01 Sep – 07 Sep",
    method: "Bank Transfer",
    account: "•••• 9014",
    status: "Paid",
  },
];

const money = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function StatusBadge({
  status,
}: {
  status: PaymentStatus | PayoutStatus;
}) {
  const statusStyles: Record<string, string> = {
    Paid: "border-emerald-200 bg-emerald-500/10 text-emerald-700",
    Pending: "border-amber-200 bg-amber-500/10 text-amber-700",
    Processing: "border-sky-200 bg-sky-500/10 text-sky-700",
    Failed: "border-red-200 bg-red-500/10 text-red-700",
    Refunded: "border-violet-200 bg-violet-500/10 text-violet-700",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold ${
        statusStyles[status]
      }`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}

function MetricCard({
  title,
  value,
  note,
  icon,
  dark = false,
}: {
  title: string;
  value: string;
  note: string;
  icon: ReactNode;
  dark?: boolean;
}) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.22 }}
      className={`relative overflow-hidden rounded-[28px] border p-5 shadow-sm ${
        dark
          ? "border-black bg-black !text-white shadow-xl shadow-black/10"
          : "border-black/5 bg-white/80 text-black"
      } tq-glass`}
    >
      <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#42d4bc]/10 blur-3xl" />

      <div className="relative">
        <div className="flex items-center justify-between">
          <div
            className={`flex h-11 w-11 items-center justify-center rounded-2xl ${
              dark
                ? "bg-white/10 text-[#42d4bc]"
                : "bg-[#42d4bc]/10 text-[#159e8b]"
            }`}
          >
            {icon}
          </div>

          <span
            className={`inline-flex items-center gap-1 text-xs font-bold ${
              dark ? "text-[#42d4bc]" : "text-emerald-600"
            }`}
          >
            <ArrowUpRight size={13} />
            {note}
          </span>
        </div>

        <p
          className={`mt-6 text-sm font-semibold ${
            dark ? "!text-white/55" : "text-black/45"
          }`}
        >
          {title}
        </p>

        <p className="mt-1 text-2xl font-black tracking-tight">{value}</p>
      </div>
    </motion.div>
  );
}

export default function AdminPaymentsPage() {
  const [activeTab, setActiveTab] = useState<"payments" | "payouts">(
    "payments"
  );

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [payments, setPayments] = useState<StudentPayment[]>(initialPayments);
  const [payouts, setPayouts] = useState<TeacherPayout[]>(initialPayouts);

  const [selectedPayment, setSelectedPayment] =
    useState<StudentPayment | null>(null);

  const [selectedPayout, setSelectedPayout] =
    useState<TeacherPayout | null>(null);

  const paidRevenue = useMemo(() => {
    return payments
      .filter((payment) => payment.status === "Paid")
      .reduce((total, payment) => total + payment.amount, 0);
  }, [payments]);

  const pendingRevenue = useMemo(() => {
    return payments
      .filter((payment) => payment.status === "Pending")
      .reduce((total, payment) => total + payment.amount, 0);
  }, [payments]);

  const refundedRevenue = useMemo(() => {
    return payments
      .filter((payment) => payment.status === "Refunded")
      .reduce((total, payment) => total + payment.amount, 0);
  }, [payments]);

  const payableTeacherEarnings = useMemo(() => {
    return payouts
      .filter(
        (payout) =>
          payout.status === "Pending" || payout.status === "Processing"
      )
      .reduce((total, payout) => total + payout.payoutAmount, 0);
  }, [payouts]);

  const paidTeacherEarnings = useMemo(() => {
    return payouts
      .filter((payout) => payout.status === "Paid")
      .reduce((total, payout) => total + payout.payoutAmount, 0);
  }, [payouts]);

  const platformContribution = useMemo(() => {
    return Math.max(0, paidRevenue - paidTeacherEarnings);
  }, [paidRevenue, paidTeacherEarnings]);

  const filteredPayments = useMemo(() => {
    const query = search.trim().toLowerCase();

    return payments.filter((payment) => {
      const matchesSearch =
        !query ||
        payment.student.toLowerCase().includes(query) ||
        payment.parent.toLowerCase().includes(query) ||
        payment.id.toLowerCase().includes(query) ||
        payment.transactionId.toLowerCase().includes(query) ||
        payment.subject.toLowerCase().includes(query) ||
        payment.plan.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All" || payment.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [payments, search, statusFilter]);

  const filteredPayouts = useMemo(() => {
    const query = search.trim().toLowerCase();

    return payouts.filter((payout) => {
      const matchesSearch =
        !query ||
        payout.teacher.toLowerCase().includes(query) ||
        payout.id.toLowerCase().includes(query) ||
        payout.account.toLowerCase().includes(query) ||
        payout.method.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All" || payout.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [payouts, search, statusFilter]);

  const switchTab = (tab: "payments" | "payouts") => {
    setActiveTab(tab);
    setSearch("");
    setStatusFilter("All");
  };

  const handleRefund = (paymentId: string) => {
    setPayments((current) =>
      current.map((payment) =>
        payment.id === paymentId
          ? { ...payment, status: "Refunded" }
          : payment
      )
    );

    setSelectedPayment(null);
  };

  const processPayout = (payoutId: string) => {
    setPayouts((current) =>
      current.map((payout) => {
        if (payout.id !== payoutId) {
          return payout;
        }

        if (payout.status === "Pending") {
          return {
            ...payout,
            status: "Processing",
          };
        }

        if (payout.status === "Processing") {
          return {
            ...payout,
            status: "Paid",
          };
        }

        return payout;
      })
    );

    setSelectedPayout((current) => {
      if (!current) {
        return current;
      }

      if (current.status === "Pending") {
        return {
          ...current,
          status: "Processing",
        };
      }

      if (current.status === "Processing") {
        return {
          ...current,
          status: "Paid",
        };
      }

      return current;
    });
  };

  const resetFilters = () => {
    setSearch("");
    setStatusFilter("All");
  };

  return (
    <main className="min-h-screen bg-[#f7f8f7] text-[#111]">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[5%] top-[8%] h-80 w-80 rounded-full bg-[#42d4bc]/10 blur-[110px]" />
        <div className="absolute right-[2%] top-[32%] h-96 w-96 rounded-full bg-cyan-300/10 blur-[120px]" />
        <div className="absolute bottom-[5%] left-[38%] h-80 w-80 rounded-full bg-emerald-200/10 blur-[115px]" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-black/5 bg-[#f7f8f7]/85 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-5 py-4 lg:px-8">
          <div className="flex items-center gap-3">
            <Link href="/admin/dashboard" className="group">
              <div className="rounded-2xl bg-black px-4 py-2 text-lg font-black tracking-tight !text-white shadow-lg shadow-black/10 transition group-hover:-translate-y-0.5">
                TQ
              </div>
            </Link>

            <div className="hidden h-8 w-px bg-black/10 sm:block" />

            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-black/35">
                Admin
              </p>
              <h1 className="text-lg font-black tracking-tight">
                Payments & Payouts
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
              href="/admin/settings"
              className="rounded-xl px-3 py-2 text-sm font-semibold text-black/50 transition hover:bg-black/5 hover:text-black"
            >
              Settings
            </Link>
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-[1500px] px-5 py-8 lg:px-8">
        {/* Hero */}
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex flex-col justify-between gap-6 lg:flex-row lg:items-end"
        >
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#42d4bc]/20 bg-[#42d4bc]/10 px-3 py-1.5 text-[11px] font-black tracking-wide text-[#159e8b]">
              <WalletCards size={13} />
              FINANCE CONTROL CENTER
            </div>

            <h2 className="max-w-4xl text-3xl font-black leading-[1.05] tracking-[-0.045em] sm:text-4xl lg:text-5xl">
              Track every rupee.
              <span className="text-[#159e8b]"> Pay teachers cleanly.</span>
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-black/50">
              Manage student collections, refunds, teacher earnings and weekly
              payouts from one finance workspace.
            </p>
          </div>

          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-black px-5 py-3 text-sm font-bold !text-white shadow-xl shadow-black/10 transition hover:-translate-y-0.5"
          >
            <Download size={16} />
            Export Report
          </button>
        </motion.section>

        {/* Metrics */}
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            title="Collected Revenue"
            value={money(paidRevenue)}
            note="+12.8%"
            icon={<CircleDollarSign size={21} />}
            dark
          />

          <MetricCard
            title="Pending Collections"
            value={money(pendingRevenue)}
            note="+4.2%"
            icon={<Clock3 size={21} />}
          />

          <MetricCard
            title="Teacher Payable"
            value={money(payableTeacherEarnings)}
            note="+8.6%"
            icon={<Banknote size={21} />}
          />

          <MetricCard
            title="Platform Contribution"
            value={money(platformContribution)}
            note="+15.4%"
            icon={<Zap size={21} />}
          />
        </section>

        {/* Main finance workspace */}
        <section className="mt-8 rounded-[30px] border border-black/5 bg-white/75 p-4 shadow-sm tq-glass sm:p-5">
          {/* Controls */}
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex w-full max-w-md items-center gap-1.5 rounded-2xl bg-black/[0.035] p-1.5">
              <button
                type="button"
                onClick={() => switchTab("payments")}
                className={`flex-1 rounded-xl px-4 py-2.5 text-sm font-bold transition ${
                  activeTab === "payments"
                    ? "bg-black !text-white shadow-lg"
                    : "text-black/45 hover:text-black"
                }`}
              >
                Student Payments
              </button>

              <button
                type="button"
                onClick={() => switchTab("payouts")}
                className={`flex-1 rounded-xl px-4 py-2.5 text-sm font-bold transition ${
                  activeTab === "payouts"
                    ? "bg-black !text-white shadow-lg"
                    : "text-black/45 hover:text-black"
                }`}
              >
                Teacher Payouts
              </button>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="flex min-w-0 items-center gap-2 rounded-2xl border border-black/7 bg-white px-4 py-3 shadow-sm sm:w-[320px]">
                <Search size={17} className="shrink-0 text-black/30" />

                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder={
                    activeTab === "payments"
                      ? "Search student, ID, transaction..."
                      : "Search teacher, payout ID..."
                  }
                  className="w-full bg-transparent text-sm font-medium outline-none placeholder:text-black/30"
                />
              </div>

              <div className="flex items-center gap-2 rounded-2xl border border-black/7 bg-white px-3 shadow-sm">
                <Filter size={15} className="text-black/30" />

                <select
                  value={statusFilter}
                  onChange={(event) => setStatusFilter(event.target.value)}
                  className="bg-transparent py-3 text-sm font-semibold outline-none"
                >
                  <option value="All">All Status</option>

                  {activeTab === "payments" ? (
                    <>
                      <option value="Paid">Paid</option>
                      <option value="Pending">Pending</option>
                      <option value="Failed">Failed</option>
                      <option value="Refunded">Refunded</option>
                    </>
                  ) : (
                    <>
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Paid">Paid</option>
                    </>
                  )}
                </select>
              </div>

              {(search || statusFilter !== "All") && (
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

          {/* Payments */}
          {activeTab === "payments" && (
            <motion.div
              key="payments-table"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-5 overflow-hidden rounded-[24px] border border-black/5 bg-white"
            >
              <div className="hidden grid-cols-[1.45fr_1fr_.85fr_.9fr_1fr_.8fr_auto] gap-4 border-b border-black/5 bg-black/[0.025] px-5 py-4 text-[10px] font-black uppercase tracking-[0.14em] text-black/35 lg:grid">
                <div>Student</div>
                <div>Plan / Subject</div>
                <div>Amount</div>
                <div>Method</div>
                <div>Date</div>
                <div>Status</div>
                <div />
              </div>

              <div className="divide-y divide-black/5">
                {filteredPayments.map((payment, index) => (
                  <motion.div
                    key={payment.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.025 }}
                    className="grid gap-4 px-5 py-4 lg:grid-cols-[1.45fr_1fr_.85fr_.9fr_1fr_.8fr_auto] lg:items-center"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#42d4bc]/10 text-sm font-black text-[#159e8b]">
                        {getInitials(payment.student)}
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-black">
                          {payment.student}
                        </p>

                        <p className="truncate text-xs text-black/40">
                          {payment.id} · {payment.parent}
                        </p>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-bold">{payment.plan}</p>
                      <p className="mt-0.5 text-xs text-black/40">
                        {payment.subject}
                      </p>
                    </div>

                    <p className="text-sm font-black">
                      {money(payment.amount)}
                    </p>

                    <p className="text-sm font-semibold text-black/55">
                      {payment.method}
                    </p>

                    <p className="text-sm font-medium text-black/50">
                      {payment.date}
                    </p>

                    <div>
                      <StatusBadge status={payment.status} />
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelectedPayment(payment)}
                      className="flex h-10 w-10 items-center justify-center rounded-xl bg-black !text-white transition hover:scale-105"
                      aria-label={`View ${payment.id}`}
                    >
                      <Eye size={16} />
                    </button>
                  </motion.div>
                ))}

                {filteredPayments.length === 0 && (
                  <EmptyState
                    title="No payments found"
                    description="Try another search term or status filter."
                  />
                )}
              </div>
            </motion.div>
          )}

          {/* Payouts */}
          {activeTab === "payouts" && (
            <motion.div
              key="payouts-table"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-5 overflow-hidden rounded-[24px] border border-black/5 bg-white"
            >
              <div className="hidden grid-cols-[1.4fr_.7fr_1fr_1fr_1fr_.8fr_auto] gap-4 border-b border-black/5 bg-black/[0.025] px-5 py-4 text-[10px] font-black uppercase tracking-[0.14em] text-black/35 lg:grid">
                <div>Teacher</div>
                <div>Classes</div>
                <div>Earnings</div>
                <div>Period</div>
                <div>Method</div>
                <div>Status</div>
                <div />
              </div>

              <div className="divide-y divide-black/5">
                {filteredPayouts.map((payout, index) => (
                  <motion.div
                    key={payout.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.025 }}
                    className="grid gap-4 px-5 py-4 lg:grid-cols-[1.4fr_.7fr_1fr_1fr_1fr_.8fr_auto] lg:items-center"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-black text-sm font-black !text-white">
                        {getInitials(payout.teacher)}
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-black">
                          {payout.teacher}
                        </p>

                        <p className="truncate text-xs text-black/40">
                          {payout.id} · {payout.account}
                        </p>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-black">
                        {payout.verifiedClasses}
                      </p>

                      <p className="text-xs text-black/40">verified</p>
                    </div>

                    <div>
                      <p className="text-sm font-black">
                        {money(payout.payoutAmount)}
                      </p>

                      <p className="text-xs text-black/40">
                        gross {money(payout.grossEarnings)}
                      </p>
                    </div>

                    <p className="text-sm font-medium text-black/50">
                      {payout.period}
                    </p>

                    <div>
                      <p className="text-sm font-semibold">{payout.method}</p>
                      <p className="text-xs text-black/40">
                        {payout.account}
                      </p>
                    </div>

                    <StatusBadge status={payout.status} />

                    <button
                      type="button"
                      onClick={() => setSelectedPayout(payout)}
                      className="flex h-10 w-10 items-center justify-center rounded-xl bg-black !text-white transition hover:scale-105"
                      aria-label={`View ${payout.id}`}
                    >
                      <Eye size={16} />
                    </button>
                  </motion.div>
                ))}

                {filteredPayouts.length === 0 && (
                  <EmptyState
                    title="No payouts found"
                    description="Try another search term or payout status."
                  />
                )}
              </div>
            </motion.div>
          )}
        </section>

        {/* Finance information */}
        <section className="mt-6 grid gap-5 lg:grid-cols-[1.1fr_.9fr]">
          <div className="rounded-[30px] border border-black/5 bg-black p-6 !text-white shadow-xl shadow-black/10">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.16em] !text-white/40">
                  Teacher Earnings Flow
                </p>

                <h3 className="mt-2 max-w-xl text-2xl font-black !text-white">
                  Teachers are paid from verified completed classes.
                </h3>
              </div>

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#42d4bc]/10 text-[#42d4bc]">
                <CheckCircle2 size={20} />
              </div>
            </div>

            <p className="mt-4 max-w-2xl text-sm leading-6 !text-white/55">
              TutorsQue calculates teacher earnings through the earnings
              ledger. Completed classes become payable in the weekly payout
              period after verification.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <ProcessCard step="01" title="Class completed" />
              <ProcessCard step="02" title="Earnings verified" />
              <ProcessCard step="03" title="Weekly payout" />
            </div>
          </div>

          <div className="rounded-[30px] border border-black/5 bg-white/80 p-6 shadow-sm tq-glass">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.16em] text-black/35">
                  Payout Snapshot
                </p>

                <h3 className="mt-1 text-2xl font-black">Current cycle</h3>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#42d4bc]/10 text-[#159e8b]">
                <CalendarDays size={20} />
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <SnapshotRow
                label="Pending payouts"
                value={money(
                  payouts
                    .filter((payout) => payout.status === "Pending")
                    .reduce(
                      (total, payout) => total + payout.payoutAmount,
                      0
                    )
                )}
              />

              <SnapshotRow
                label="Processing"
                value={money(
                  payouts
                    .filter((payout) => payout.status === "Processing")
                    .reduce(
                      (total, payout) => total + payout.payoutAmount,
                      0
                    )
                )}
              />

              <SnapshotRow
                label="Paid out"
                value={money(
                  payouts
                    .filter((payout) => payout.status === "Paid")
                    .reduce(
                      (total, payout) => total + payout.payoutAmount,
                      0
                    )
                )}
                last
              />
            </div>
          </div>
        </section>

        {/* Small financial summary */}
        <section className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <SmallSummary
            icon={<IndianRupee size={18} />}
            label="Refunded"
            value={money(refundedRevenue)}
          />

          <SmallSummary
            icon={<Clock3 size={18} />}
            label="Pending teacher payouts"
            value={money(
              payouts
                .filter((payout) => payout.status === "Pending")
                .reduce((total, payout) => total + payout.payoutAmount, 0)
            )}
          />

          <SmallSummary
            icon={<CheckCircle2 size={18} />}
            label="Teacher payouts completed"
            value={money(paidTeacherEarnings)}
          />
        </section>
      </div>

      {/* Payment modal */}
      {selectedPayment && (
        <ModalOverlay onClose={() => setSelectedPayment(null)}>
          <div className="w-full max-w-xl rounded-[30px] border border-black/10 bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.16em] text-black/35">
                  Payment Details
                </p>

                <h3 className="mt-1 text-2xl font-black">
                  {selectedPayment.student}
                </h3>

                <p className="mt-1 text-sm text-black/40">
                  {selectedPayment.id}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedPayment(null)}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-black !text-white"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <DetailItem label="Parent" value={selectedPayment.parent} />
              <DetailItem label="Transaction" value={selectedPayment.transactionId} />
              <DetailItem label="Plan" value={selectedPayment.plan} />
              <DetailItem label="Subject" value={selectedPayment.subject} />
              <DetailItem label="Payment method" value={selectedPayment.method} />
              <DetailItem label="Date" value={selectedPayment.date} />
            </div>

            <div className="mt-4 flex items-center justify-between rounded-2xl border border-black/5 bg-[#42d4bc]/8 p-4">
              <div>
                <p className="text-xs font-semibold text-black/35">Status</p>
                <div className="mt-1">
                  <StatusBadge status={selectedPayment.status} />
                </div>
              </div>

              <p className="text-2xl font-black">
                {money(selectedPayment.amount)}
              </p>
            </div>

            <div className="mt-5 flex gap-3">
              <button
                type="button"
                onClick={() => setSelectedPayment(null)}
                className="flex-1 rounded-2xl border border-black/10 px-5 py-3 text-sm font-bold"
              >
                Close
              </button>

              {selectedPayment.status === "Paid" && (
                <button
                  type="button"
                  onClick={() => handleRefund(selectedPayment.id)}
                  className="flex-1 rounded-2xl bg-black px-5 py-3 text-sm font-bold !text-white"
                >
                  <span className="inline-flex items-center justify-center gap-2">
                    <RefreshCcw size={15} />
                    Refund Payment
                  </span>
                </button>
              )}
            </div>
          </div>
        </ModalOverlay>
      )}

      {/* Payout modal */}
      {selectedPayout && (
        <ModalOverlay onClose={() => setSelectedPayout(null)}>
          <div className="w-full max-w-xl rounded-[30px] border border-black/10 bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.16em] text-black/35">
                  Teacher Payout
                </p>

                <h3 className="mt-1 text-2xl font-black">
                  {selectedPayout.teacher}
                </h3>

                <p className="mt-1 text-sm text-black/40">
                  {selectedPayout.id}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedPayout(null)}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-black !text-white"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-6 rounded-[25px] bg-black p-5 !text-white">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[11px] font-black uppercase tracking-[0.15em] !text-white/40">
                    Payable amount
                  </p>

                  <p className="mt-2 text-4xl font-black !text-white">
                    {money(selectedPayout.payoutAmount)}
                  </p>
                </div>

                <StatusBadge status={selectedPayout.status} />
              </div>

              <p className="mt-4 text-sm leading-6 !text-white/50">
                {selectedPayout.verifiedClasses} verified completed classes
                during {selectedPayout.period}.
              </p>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <DetailItem label="Verified classes" value={`${selectedPayout.verifiedClasses}`} />
              <DetailItem label="Gross earnings" value={money(selectedPayout.grossEarnings)} />
              <DetailItem label="Payment method" value={selectedPayout.method} />
              <DetailItem label="Account" value={selectedPayout.account} />
              <DetailItem label="Payout period" value={selectedPayout.period} />
              <DetailItem label="Payout ID" value={selectedPayout.id} />
            </div>

            <div className="mt-5 flex gap-3">
              <button
                type="button"
                onClick={() => setSelectedPayout(null)}
                className="flex-1 rounded-2xl border border-black/10 px-5 py-3 text-sm font-bold"
              >
                Close
              </button>

              {selectedPayout.status !== "Paid" && (
                <button
                  type="button"
                  onClick={() => processPayout(selectedPayout.id)}
                  className="flex-1 rounded-2xl bg-black px-5 py-3 text-sm font-bold !text-white"
                >
                  <span className="inline-flex items-center justify-center gap-2">
                    {selectedPayout.status === "Pending" ? (
                      <>
                        <IndianRupee size={15} />
                        Process Payout
                      </>
                    ) : (
                      <>
                        <CheckCircle2 size={15} />
                        Mark as Paid
                      </>
                    )}
                  </span>
                </button>
              )}
            </div>
          </div>
        </ModalOverlay>
      )}
    </main>
  );
}

function EmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="px-6 py-16 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-black/5 text-black/25">
        <Search size={22} />
      </div>

      <p className="mt-4 font-black">{title}</p>
      <p className="mt-1 text-sm text-black/40">{description}</p>
    </div>
  );
}

function ProcessCard({
  step,
  title,
}: {
  step: string;
  title: string;
}) {
  return (
    <div className="rounded-2xl bg-white/6 p-4">
      <p className="text-[11px] font-bold !text-white/35">{step}</p>
      <p className="mt-1 text-sm font-bold !text-white">{title}</p>
    </div>
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

function SmallSummary({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-[22px] border border-black/5 bg-white/75 p-5 shadow-sm tq-glass">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#42d4bc]/10 text-[#159e8b]">
          {icon}
        </div>

        <span className="text-sm font-semibold text-black/50">{label}</span>
      </div>

      <span className="text-sm font-black">{value}</span>
    </div>
  );
}

function DetailItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-black/5 bg-black/[0.025] p-4">
      <p className="text-xs font-semibold text-black/35">{label}</p>
      <p className="mt-1 break-words text-sm font-black">{value}</p>
    </div>
  );
}

function ModalOverlay({
  children,
  onClose,
}: {
  children: ReactNode;
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