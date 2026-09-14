"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

type PaymentStatus = "Paid" | "Processing" | "Failed";

type Payment = {
  id: string;
  date: string;
  description: string;
  tutor: string;
  plan: string;
  method: string;
  amount: number;
  status: PaymentStatus;
};

const payments: Payment[] = [
  {
    id: "TQ-PAY-1008",
    date: "Sep 01, 2026",
    description: "Monthly Tuition Plan",
    tutor: "Rahul Varma",
    plan: "Regular",
    method: "UPI",
    amount: 2999,
    status: "Paid",
  },
  {
    id: "TQ-PAY-1007",
    date: "Aug 01, 2026",
    description: "Monthly Tuition Plan",
    tutor: "Rahul Varma",
    plan: "Regular",
    method: "UPI",
    amount: 2999,
    status: "Paid",
  },
  {
    id: "TQ-PAY-1006",
    date: "Jul 01, 2026",
    description: "Monthly Tuition Plan",
    tutor: "Rahul Varma",
    plan: "Regular",
    method: "Card",
    amount: 2999,
    status: "Paid",
  },
  {
    id: "TQ-PAY-1005",
    date: "Jun 01, 2026",
    description: "Monthly Tuition Plan",
    tutor: "Rahul Varma",
    plan: "Regular",
    method: "UPI",
    amount: 2999,
    status: "Paid",
  },
];

const benefits = [
  "Live interactive classes",
  "Verified TutorsQue tutor",
  "Homework and assignments",
  "Tests and performance tracking",
  "Personalized learning support",
];

function statusClasses(status: PaymentStatus) {
  if (status === "Paid") {
    return "bg-[#42d4bc]/10 text-[#0b9079]";
  }

  if (status === "Processing") {
    return "bg-yellow-500/10 text-yellow-700";
  }

  return "bg-red-500/10 text-red-600";
}

function formatCurrency(value: number) {
  return `₹${value.toLocaleString("en-IN")}`;
}

export default function StudentPaymentsPage() {
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("UPI");
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const monthlyFee = 2999;
  const totalPaid = payments
    .filter((item) => item.status === "Paid")
    .reduce((sum, item) => sum + item.amount, 0);

  const paymentDate = "Oct 01, 2026";

  const completePayment = () => {
    setPaymentSuccess(true);
    setShowPaymentForm(false);

    window.setTimeout(() => {
      setPaymentSuccess(false);
    }, 3500);
  };

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
                Payments & Subscription
              </p>

              <p className="mt-0.5 text-xs text-black/45">
                Manage your tuition plan, payments and billing history
              </p>
            </div>
          </div>

          {paymentSuccess ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-2 rounded-full bg-[#42d4bc]/10 px-4 py-2.5 text-xs font-black text-[#0b9079]"
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#42d4bc] text-black">
                ✓
              </span>
              Payment successful
            </motion.div>
          ) : (
            <div className="flex items-center gap-2 rounded-full bg-[#42d4bc]/10 px-4 py-2.5 text-xs font-black text-[#0b9079]">
              <span className="h-2 w-2 rounded-full bg-[#42d4bc]" />
              Subscription active
            </div>
          )}
        </motion.header>

        {/* Subscription hero */}
        <section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden rounded-[30px] bg-black p-7 text-white shadow-2xl shadow-black/10 sm:p-9"
          >
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#42d4bc]/20 blur-3xl" />

            <div className="absolute bottom-[-120px] left-[28%] h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl" />

            <div className="relative">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-[#42d4bc]/20 bg-[#42d4bc]/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-[#42d4bc]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#42d4bc]" />
                    Active plan
                  </div>

                  <h1 className="mt-5 text-4xl font-black tracking-[-0.05em] sm:text-5xl">
                    Regular
                  </h1>

                  <p className="mt-3 max-w-2xl text-sm leading-6 text-white/50">
                    Your monthly TutorsQue tuition plan with live classes,
                    homework, tests and progress tracking.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-right">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-white/35">
                    Monthly
                  </p>

                  <p className="mt-1 text-2xl font-black">
                    {formatCurrency(monthlyFee)}
                  </p>
                </div>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                  <p className="text-xs text-white/35">
                    Tutor
                  </p>

                  <p className="mt-1.5 text-sm font-black">
                    Rahul Varma
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                  <p className="text-xs text-white/35">
                    Renewal date
                  </p>

                  <p className="mt-1.5 text-sm font-black">
                    {paymentDate}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {benefits.map((benefit) => (
                  <span
                    key={benefit}
                    className="rounded-xl border border-white/10 bg-white/[0.045] px-3 py-2 text-[10px] font-bold text-white/60"
                  >
                    ✓ {benefit}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Billing summary */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="tq-glass rounded-[30px] p-6 shadow-xl shadow-black/[0.03] sm:p-7"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-black/30">
                  Billing summary
                </p>

                <p className="mt-3 text-4xl font-black tracking-[-0.04em]">
                  {formatCurrency(monthlyFee)}
                </p>

                <p className="mt-1 text-xs text-black/40">
                  Monthly tuition
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#42d4bc]/10 text-[#0b9079]">
                <svg
                  viewBox="0 0 24 24"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <rect
                    x="3"
                    y="5"
                    width="18"
                    height="14"
                    rx="3"
                  />

                  <path
                    strokeLinecap="round"
                    d="M3 10h18"
                  />

                  <path
                    strokeLinecap="round"
                    d="M7 15h3"
                  />
                </svg>
              </div>
            </div>

            <div className="mt-7 space-y-3">
              <div className="flex items-center justify-between rounded-2xl bg-black/[0.035] p-4">
                <span className="text-xs font-bold text-black/45">
                  Last payment
                </span>

                <span className="text-xs font-black">
                  Sep 01 • ₹2,999
                </span>
              </div>

              <div className="flex items-center justify-between rounded-2xl bg-black/[0.035] p-4">
                <span className="text-xs font-bold text-black/45">
                  Payment method
                </span>

                <span className="text-xs font-black">
                  UPI
                </span>
              </div>

              <div className="flex items-center justify-between rounded-2xl bg-[#42d4bc]/8 p-4">
                <span className="text-xs font-bold text-black/45">
                  Total paid
                </span>

                <span className="text-sm font-black text-[#0b9079]">
                  {formatCurrency(totalPaid)}
                </span>
              </div>
            </div>

            <button
              onClick={() => setShowPaymentForm(true)}
              className="mt-5 flex w-full items-center justify-center rounded-2xl bg-black px-5 py-3.5 text-xs font-black text-white transition hover:-translate-y-0.5 hover:bg-black/85"
            >
              Make Next Payment
            </button>
          </motion.div>
        </section>

        {/* Current plan details */}
        <section className="mt-4 grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
            className="tq-glass rounded-[28px] p-6 shadow-xl shadow-black/[0.03]"
          >
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-black/30">
              Subscription
            </p>

            <h2 className="mt-2 text-2xl font-black tracking-[-0.03em]">
              Plan details
            </h2>

            <div className="mt-6 space-y-3">
              {[
                ["Plan", "Regular"],
                ["Board", "AP State Board"],
                ["Class", "Class 10"],
                ["Medium", "English"],
                ["Subjects", "3 active subjects"],
                ["Billing", "Monthly"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex items-center justify-between gap-4 rounded-xl bg-black/[0.025] px-4 py-3"
                >
                  <span className="text-xs font-medium text-black/40">
                    {label}
                  </span>

                  <span className="text-xs font-black text-right">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.17 }}
            className="tq-glass rounded-[28px] p-6 shadow-xl shadow-black/[0.03]"
          >
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-black/30">
              Included with your plan
            </p>

            <h2 className="mt-2 text-2xl font-black tracking-[-0.03em]">
              Everything you need to learn
            </h2>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.05 }}
                  className="rounded-2xl bg-black/[0.025] p-4"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#42d4bc]/10 text-sm font-black text-[#0b9079]">
                    ✓
                  </div>

                  <p className="mt-3 text-xs font-black">
                    {benefit}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Payment history */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.21 }}
          className="tq-glass mt-4 overflow-hidden rounded-[28px] shadow-xl shadow-black/[0.03]"
        >
          <div className="flex flex-col gap-3 border-b border-black/5 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-base font-black">
                Payment history
              </p>

              <p className="mt-1 text-xs text-black/40">
                Your previous TutorsQue tuition payments
              </p>
            </div>

            <button className="rounded-xl bg-black/[0.04] px-4 py-2.5 text-xs font-black transition hover:bg-black/[0.07]">
              Download Statement
            </button>
          </div>

          <div className="hidden overflow-x-auto md:block">
            <table className="w-full min-w-[850px] border-collapse">
              <thead>
                <tr className="border-b border-black/5 text-left">
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-wider text-black/30">
                    Payment
                  </th>

                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-wider text-black/30">
                    Date
                  </th>

                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-wider text-black/30">
                    Method
                  </th>

                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-wider text-black/30">
                    Amount
                  </th>

                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-wider text-black/30">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {payments.map((payment) => (
                  <tr
                    key={payment.id}
                    className="border-b border-black/[0.04] transition hover:bg-black/[0.015]"
                  >
                    <td className="px-6 py-4">
                      <p className="text-sm font-black">
                        {payment.description}
                      </p>

                      <p className="mt-1 text-[10px] text-black/35">
                        {payment.id} • {payment.plan} Plan
                      </p>
                    </td>

                    <td className="px-6 py-4 text-xs font-medium text-black/50">
                      {payment.date}
                    </td>

                    <td className="px-6 py-4 text-xs font-bold">
                      {payment.method}
                    </td>

                    <td className="px-6 py-4 text-sm font-black">
                      {formatCurrency(payment.amount)}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1.5 text-[10px] font-black ${statusClasses(
                          payment.status
                        )}`}
                      >
                        ✓ {payment.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile */}
          <div className="space-y-3 p-4 md:hidden">
            {payments.map((payment) => (
              <div
                key={payment.id}
                className="rounded-2xl bg-black/[0.025] p-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-black">
                      {payment.description}
                    </p>

                    <p className="mt-1 text-[10px] text-black/35">
                      {payment.id}
                    </p>
                  </div>

                  <p className="text-sm font-black">
                    {formatCurrency(payment.amount)}
                  </p>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-wider text-black/30">
                      Date
                    </p>

                    <p className="mt-1 text-xs font-bold">
                      {payment.date}
                    </p>
                  </div>

                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-wider text-black/30">
                      Method
                    </p>

                    <p className="mt-1 text-xs font-bold">
                      {payment.method}
                    </p>
                  </div>

                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-wider text-black/30">
                      Plan
                    </p>

                    <p className="mt-1 text-xs font-bold">
                      {payment.plan}
                    </p>
                  </div>

                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-wider text-black/30">
                      Status
                    </p>

                    <span
                      className={`mt-1 inline-flex rounded-full px-2.5 py-1 text-[9px] font-black ${statusClasses(
                        payment.status
                      )}`}
                    >
                      {payment.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Secure payment note */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
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
                Secure billing
              </p>

              <p className="mt-1 text-xs leading-5 text-black/50">
                Payment processing shown here is currently a frontend
                simulation. Production payments will be securely processed
                through Razorpay and verified by the TutorsQue backend.
              </p>
            </div>
          </div>
        </motion.section>
      </div>

      {/* Payment Modal */}
      {showPaymentForm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 p-4 backdrop-blur-md"
          onClick={() => setShowPaymentForm(false)}
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            onClick={(event) => event.stopPropagation()}
            className="w-full max-w-lg rounded-[30px] border border-white/60 bg-white/92 p-6 shadow-2xl backdrop-blur-2xl sm:p-7"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-black/30">
                  Tuition payment
                </p>

                <h2 className="mt-2 text-2xl font-black tracking-[-0.04em]">
                  Pay {formatCurrency(monthlyFee)}
                </h2>

                <p className="mt-1 text-xs text-black/40">
                  Regular Plan • TutorsQue
                </p>
              </div>

              <button
                onClick={() => setShowPaymentForm(false)}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-black/[0.05] text-black/45 transition hover:bg-black/[0.08]"
                aria-label="Close payment form"
              >
                ×
              </button>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-2">
              {["UPI", "Card", "Netbanking"].map((method) => (
                <button
                  key={method}
                  onClick={() => setPaymentMethod(method)}
                  className={`rounded-xl px-3 py-3 text-xs font-black transition ${
                    paymentMethod === method
                      ? "bg-black text-white"
                      : "bg-black/[0.04] text-black/45 hover:bg-black/[0.07]"
                  }`}
                >
                  {method}
                </button>
              ))}
            </div>

            {paymentMethod === "UPI" && (
              <div className="mt-5">
                <label className="mb-2 block text-xs font-black">
                  UPI ID
                </label>

                <input
                  placeholder="yourname@upi"
                  className="tq-payment-input"
                />

                <div className="mt-4 rounded-2xl bg-[#42d4bc]/7 p-4">
                  <p className="text-xs font-black">
                    Quick & secure
                  </p>

                  <p className="mt-1 text-[11px] leading-5 text-black/45">
                    Enter your UPI ID to continue with the payment.
                  </p>
                </div>
              </div>
            )}

            {paymentMethod === "Card" && (
              <div className="mt-5 space-y-4">
                <div>
                  <label className="mb-2 block text-xs font-black">
                    Card number
                  </label>

                  <input
                    placeholder="1234 5678 9012 3456"
                    className="tq-payment-input"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-2 block text-xs font-black">
                      Expiry
                    </label>

                    <input
                      placeholder="MM / YY"
                      className="tq-payment-input"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-xs font-black">
                      CVV
                    </label>

                    <input
                      placeholder="•••"
                      className="tq-payment-input"
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === "Netbanking" && (
              <div className="mt-5">
                <label className="mb-2 block text-xs font-black">
                  Select bank
                </label>

                <select className="tq-payment-input">
                  <option>State Bank of India</option>
                  <option>HDFC Bank</option>
                  <option>ICICI Bank</option>
                  <option>Axis Bank</option>
                  <option>Andhra Bank</option>
                </select>
              </div>
            )}

            <div className="mt-6 rounded-2xl bg-black/[0.035] p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-black/45">
                  Tuition plan
                </span>

                <span className="text-xs font-black">
                  Regular
                </span>
              </div>

              <div className="mt-3 flex items-center justify-between border-t border-black/5 pt-3">
                <span className="text-sm font-black">
                  Total
                </span>

                <span className="text-lg font-black">
                  {formatCurrency(monthlyFee)}
                </span>
              </div>
            </div>

            <button
              onClick={completePayment}
              className="mt-6 w-full rounded-2xl bg-black px-5 py-4 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-black/85"
            >
              Pay {formatCurrency(monthlyFee)}
            </button>

            <p className="mt-4 text-center text-[10px] leading-5 text-black/30">
              Demo payment screen. Production integration will use Razorpay
              checkout.
            </p>
          </motion.div>
        </div>
      )}

      <style jsx>{`
        .tq-payment-input {
          width: 100%;
          border-radius: 15px;
          border: 1px solid rgba(0, 0, 0, 0.06);
          background: rgba(255, 255, 255, 0.7);
          padding: 13px 15px;
          font-size: 13px;
          font-weight: 600;
          color: #111;
          outline: none;
          transition:
            border-color 180ms ease,
            box-shadow 180ms ease,
            background 180ms ease;
        }

        .tq-payment-input::placeholder {
          color: rgba(0, 0, 0, 0.25);
        }

        .tq-payment-input:focus {
          border-color: rgba(66, 212, 188, 0.55);
          background: rgba(255, 255, 255, 0.92);
          box-shadow: 0 0 0 4px rgba(66, 212, 188, 0.08);
        }

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