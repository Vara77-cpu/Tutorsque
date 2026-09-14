"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

type Plan = {
  id: string;
  name: string;
  duration: string;
  classesPerWeek: number;
  minutesPerClass: number;
  monthlyClasses: number;
  price: number;
  popular?: boolean;
  description: string;
  benefits: string[];
};

const plans: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    duration: "1 month",
    classesPerWeek: 2,
    minutesPerClass: 60,
    monthlyClasses: 8,
    price: 1799,
    description: "A focused starting point for consistent learning.",
    benefits: [
      "8 live classes per month",
      "60-minute live sessions",
      "Homework support",
      "Weekly progress tracking",
    ],
  },
  {
    id: "regular",
    name: "Regular",
    duration: "1 month",
    classesPerWeek: 3,
    minutesPerClass: 60,
    monthlyClasses: 12,
    price: 2499,
    popular: true,
    description: "A balanced plan for steady academic progress.",
    benefits: [
      "12 live classes per month",
      "60-minute live sessions",
      "Homework & practice support",
      "Weekly progress tracking",
      "Priority tutor scheduling",
    ],
  },
  {
    id: "intensive",
    name: "Intensive",
    duration: "1 month",
    classesPerWeek: 5,
    minutesPerClass: 60,
    monthlyClasses: 20,
    price: 3899,
    description: "More guided learning for stronger practice and preparation.",
    benefits: [
      "20 live classes per month",
      "60-minute live sessions",
      "Homework & test support",
      "Weekly progress tracking",
      "Priority tutor scheduling",
      "Extra revision sessions",
    ],
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

function ShieldIcon() {
  return (
    <svg
      width="20"
      height="20"
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

function TutorAvatar({
  name,
  initials,
}: {
  name: string;
  initials: string;
}) {
  return (
    <div className="flex h-14 w-14 items-center justify-center rounded-[18px] bg-gradient-to-br from-[#42d4bc] to-cyan-200 text-sm font-bold text-black shadow-lg">
      {initials}
    </div>
  );
}

export default function StudentPlanPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const board = searchParams.get("board") || "";
  const studentClass = searchParams.get("class") || "";
  const medium = searchParams.get("medium") || "";
  const tutorId = searchParams.get("tutorId") || "";
  const selectedSubjects = useMemo(
    () =>
      (searchParams.get("subjects") || "")
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
    [searchParams],
  );

  const [selectedPlanId, setSelectedPlanId] = useState("regular");

  const selectedPlan =
    plans.find((plan) => plan.id === selectedPlanId) ?? plans[1];

  const tutorMap: Record<
    string,
    { name: string; initials: string; subject: string; board: string }
  > = {
    "1": {
      name: "Priya Sharma",
      initials: "PS",
      subject: "Mathematics",
      board: "CBSE",
    },
    "2": {
      name: "Ravi Kumar",
      initials: "RK",
      subject: "Science",
      board: "AP State Board",
    },
    "3": {
      name: "Ananya Reddy",
      initials: "AR",
      subject: "English",
      board: "CBSE",
    },
    "4": {
      name: "Suresh Babu",
      initials: "SB",
      subject: "Mathematics",
      board: "AP State Board",
    },
    "5": {
      name: "Lakshmi Devi",
      initials: "LD",
      subject: "Telugu",
      board: "AP State Board",
    },
    "6": {
      name: "Arjun Mehta",
      initials: "AM",
      subject: "Social Science",
      board: "CBSE",
    },
    "7": {
      name: "Meena Krishnan",
      initials: "MK",
      subject: "Hindi",
      board: "CBSE",
    },
    "8": {
      name: "Vikram Rao",
      initials: "VR",
      subject: "Physical Science",
      board: "AP State Board",
    },
    "9": {
      name: "Divya Nair",
      initials: "DN",
      subject: "Science",
      board: "CBSE",
    },
  };

  const tutor = tutorMap[tutorId] ?? {
    name: "Selected Tutor",
    initials: "TQ",
    subject: selectedSubjects[0] || "Subject",
    board: board || "Board",
  };

  function handleContinue() {
    const params = new URLSearchParams({
      board,
      class: studentClass,
      medium,
      subjects: selectedSubjects.join(","),
      tutorId,
      planId: selectedPlan.id,
      planName: selectedPlan.name,
      amount: String(selectedPlan.price),
    });

    router.push(`/student/payment?${params.toString()}`);
  }

  function handleBack() {
    const params = new URLSearchParams({
      board,
      class: studentClass,
      medium,
      subjects: selectedSubjects.join(","),
    });

    router.push(`/student/tutors?${params.toString()}`);
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#f4f8f7] text-[#111111]">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-[-160px] top-[100px] h-[440px] w-[440px] rounded-full bg-[#42d4bc]/12 blur-[110px]"
        />

        <motion.div
          animate={{
            x: [0, -25, 0],
            y: [0, 25, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute right-[-150px] top-[230px] h-[430px] w-[430px] rounded-full bg-cyan-200/20 blur-[110px]"
        />

        <div className="absolute bottom-[-180px] left-[30%] h-[430px] w-[430px] rounded-full bg-emerald-100/25 blur-[120px]" />
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
            Step 4 of 5
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
            <div className="h-1.5 flex-1 rounded-full bg-[#42d4bc]" />
            <div className="h-1.5 flex-1 rounded-full bg-black/8" />
          </div>
        </div>
      </div>

      {/* Main */}
      <section>
        <div className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-[850px]"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/65 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-black/50 shadow-sm backdrop-blur-xl">
              <span className="h-2 w-2 rounded-full bg-[#42d4bc]" />
              Step 4 · Tuition plan
            </div>

            <h1 className="mt-6 text-[48px] font-semibold leading-[0.98] tracking-[-0.07em] sm:text-[64px] lg:text-[74px]">
              Choose how you
              <span className="block">want to learn.</span>
            </h1>

            <p className="mt-6 max-w-[700px] text-[17px] leading-7 text-black/50 sm:text-[19px]">
              Pick a plan that matches the student&apos;s preferred learning
              frequency. You can change plans later as the learning journey
              evolves.
            </p>
          </motion.div>

          {/* Selected tutor */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="tq-glass mt-10 rounded-[28px] p-4"
          >
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <TutorAvatar
                  name={tutor.name}
                  initials={tutor.initials}
                />

                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-[18px] font-semibold">
                      {tutor.name}
                    </p>

                    <span className="rounded-full bg-[#42d4bc]/12 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.1em] text-[#148d7a]">
                      Selected
                    </span>
                  </div>

                  <p className="mt-1 text-sm text-black/45">
                    {tutor.subject} · {tutor.board}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {selectedSubjects.map((subject) => (
                  <span
                    key={subject}
                    className="rounded-full border border-black/8 bg-white/55 px-3 py-2 text-[10px] font-medium text-black/50"
                  >
                    {subject}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Plan cards */}
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {plans.map((plan, index) => {
              const active = selectedPlanId === plan.id;

              return (
                <motion.button
                  key={plan.id}
                  type="button"
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.06,
                  }}
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => setSelectedPlanId(plan.id)}
                  className={`relative rounded-[31px] p-1 text-left transition ${
                    active
                      ? "bg-[#42d4bc] shadow-[0_25px_60px_rgba(66,212,188,0.2)]"
                      : "bg-transparent"
                  }`}
                >
                  <div
                    className={`relative h-full overflow-hidden rounded-[29px] border p-6 ${
                      active
                        ? "border-transparent bg-white"
                        : "border-black/8 bg-white/55 backdrop-blur-xl"
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute right-5 top-5 rounded-full bg-black px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.11em] text-white">
                        Most popular
                      </div>
                    )}

                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-[16px] text-sm font-bold ${
                        active
                          ? "bg-[#42d4bc] text-black"
                          : "bg-black text-white"
                      }`}
                    >
                      {index + 1}
                    </div>

                    <div className="mt-7">
                      <h2 className="text-[27px] font-semibold tracking-[-0.045em]">
                        {plan.name}
                      </h2>

                      <p className="mt-2 max-w-[310px] text-sm leading-6 text-black/45">
                        {plan.description}
                      </p>
                    </div>

                    <div className="mt-7">
                      <span className="text-[38px] font-semibold tracking-[-0.06em]">
                        ₹{plan.price.toLocaleString("en-IN")}
                      </span>

                      <span className="ml-2 text-xs text-black/40">
                        / month
                      </span>
                    </div>

                    <div className="mt-5 grid grid-cols-2 gap-2">
                      <div className="rounded-[16px] bg-black/[0.04] p-3">
                        <p className="text-[10px] uppercase tracking-[0.11em] text-black/30">
                          Classes
                        </p>

                        <p className="mt-1 text-sm font-semibold">
                          {plan.classesPerWeek}/week
                        </p>
                      </div>

                      <div className="rounded-[16px] bg-black/[0.04] p-3">
                        <p className="text-[10px] uppercase tracking-[0.11em] text-black/30">
                          Duration
                        </p>

                        <p className="mt-1 text-sm font-semibold">
                          {plan.minutesPerClass} min
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 border-t border-black/[0.06] pt-5">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-black/30">
                        Includes
                      </p>

                      <div className="mt-4 space-y-3">
                        {plan.benefits.map((benefit) => (
                          <div
                            key={benefit}
                            className="flex items-start gap-2.5"
                          >
                            <span
                              className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                                active
                                  ? "bg-[#42d4bc] text-black"
                                  : "bg-black/5 text-black/50"
                              }`}
                            >
                              <CheckIcon />
                            </span>

                            <span className="text-xs leading-5 text-black/55">
                              {benefit}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div
                      className={`mt-7 flex h-12 items-center justify-center rounded-[15px] text-xs font-semibold ${
                        active
                          ? "bg-black text-white"
                          : "border border-black/10 bg-white/55 text-black/55"
                      }`}
                    >
                      {active ? "Selected plan" : "Choose this plan"}
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Selected plan summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="tq-glass mt-8 rounded-[29px] p-5 sm:p-6"
          >
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-black/35">
                  Your selected plan
                </p>

                <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-end sm:gap-4">
                  <h2 className="text-[30px] font-semibold tracking-[-0.045em]">
                    {selectedPlan.name}
                  </h2>

                  <p className="text-sm text-black/40">
                    {selectedPlan.classesPerWeek} live classes/week ·{" "}
                    {selectedPlan.minutesPerClass} minutes/class
                  </p>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-full bg-[#42d4bc]/12 px-3 py-1.5 text-[10px] font-semibold text-[#148d7a]">
                    {selectedPlan.monthlyClasses} classes/month
                  </span>

                  <span className="rounded-full bg-black/[0.04] px-3 py-1.5 text-[10px] font-semibold text-black/45">
                    {selectedPlan.duration}
                  </span>

                  <span className="rounded-full bg-black/[0.04] px-3 py-1.5 text-[10px] font-semibold text-black/45">
                    Weekly progress
                  </span>
                </div>
              </div>

              <div className="rounded-[20px] border border-black/[0.06] bg-white/55 px-6 py-5 lg:min-w-[220px]">
                <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-black/30">
                  Total today
                </p>

                <p className="mt-1 text-[30px] font-semibold tracking-[-0.045em]">
                  ₹{selectedPlan.price.toLocaleString("en-IN")}
                </p>

                <p className="mt-1 text-[11px] text-black/35">
                  1 month tuition
                </p>
              </div>
            </div>
          </motion.div>

          {/* Security / policy */}
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div className="rounded-[21px] border border-black/[0.06] bg-white/45 p-5">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[13px] bg-[#42d4bc]/15 text-[#159b87]">
                  <ShieldIcon />
                </div>

                <div>
                  <p className="text-sm font-semibold">
                    Secure checkout
                  </p>

                  <p className="mt-1 text-xs leading-5 text-black/40">
                    Your selected plan will be passed securely to the next
                    payment step.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[21px] border border-black/[0.06] bg-white/45 p-5">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[13px] bg-black/[0.04] text-black/50">
                  <CheckIcon />
                </div>

                <div>
                  <p className="text-sm font-semibold">
                    Flexible learning
                  </p>

                  <p className="mt-1 text-xs leading-5 text-black/40">
                    Plan prices shown here are frontend placeholders and will
                    be connected to the final TutorsQue pricing engine later.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
            <button
              type="button"
              onClick={handleBack}
              className="inline-flex h-13 items-center justify-center rounded-[15px] border border-black/10 bg-white/55 px-6 text-sm font-semibold transition hover:bg-white"
            >
              Back to tutors
            </button>

            <button
              type="button"
              onClick={handleContinue}
              className="inline-flex h-13 flex-1 items-center justify-center gap-3 rounded-[15px] bg-black px-7 text-sm font-semibold text-white transition hover:-translate-y-0.5 sm:flex-none"
            >
              Continue to payment
              <ArrowIcon />
            </button>
          </div>
        </div>
      </section>

      <footer className="border-t border-black/[0.06] px-5 py-8 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-4 text-sm text-black/40 sm:flex-row">
          <p>© {new Date().getFullYear()} TutorsQue</p>
          <p>Step 4 · Tuition plan</p>
        </div>
      </footer>
    </main>
  );
}