"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { api, type AuthUser } from "@/app/lib/api";

type StudentProfile = {
  id: number;
  user_id: number;
  parent_id: number | null;
  school_id: number | null;

  board_id: number | null;
  board_name: string | null;

  medium_id: number | null;
  medium_name: string | null;

  class_number: number;
  date_of_birth: string | null;
  gender: string | null;
  address: string | null;
};

const schedule = [
  {
    time: "6:00 PM",
    subject: "Mathematics",
    tutor: "Priya Sharma",
    duration: "60 min",
    type: "Live class",
    status: "Today",
  },
  {
    time: "7:30 PM",
    subject: "Science",
    tutor: "Ravi Kumar",
    duration: "60 min",
    type: "Live class",
    status: "Tomorrow",
  },
  {
    time: "5:30 PM",
    subject: "English",
    tutor: "Ananya Reddy",
    duration: "60 min",
    type: "Live class",
    status: "Wed",
  },
];

const subjects = [
  {
    name: "Mathematics",
    progress: 78,
    score: "92%",
    color: "from-cyan-300 to-emerald-300",
  },
  {
    name: "Science",
    progress: 64,
    score: "86%",
    color: "from-sky-300 to-cyan-200",
  },
  {
    name: "English",
    progress: 82,
    score: "94%",
    color: "from-violet-300 to-sky-200",
  },
  {
    name: "Social Science",
    progress: 58,
    score: "81%",
    color: "from-indigo-300 to-sky-200",
  },
];

const homework = [
  {
    title: "Algebra Practice",
    subject: "Mathematics",
    due: "Today",
    progress: 70,
  },
  {
    title: "Light & Reflection",
    subject: "Science",
    due: "Tomorrow",
    progress: 45,
  },
  {
    title: "Grammar Worksheet",
    subject: "English",
    due: "Wed",
    progress: 100,
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

function BookIcon() {
  return (
    <svg
      width="21"
      height="21"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5 4.5h9.5A3.5 3.5 0 0118 8v11.5H8.5A3.5 3.5 0 015 16V4.5z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M5 16V8a3.5 3.5 0 013.5-3.5H12"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function TrophyIcon() {
  return (
    <svg
      width="21"
      height="21"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M8 4h8v5a4 4 0 01-8 0V4z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M8 6H5v2a3 3 0 003 3M16 6h3v2a3 3 0 01-3 3M12 13v4M8.5 20h7"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg
      width="21"
      height="21"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="12"
        cy="8"
        r="3.5"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M5 20c.8-3.5 3-5.5 7-5.5s6.2 2 7 5.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M18 10a6 6 0 00-12 0c0 7-3 7-3 8.5h18C21 17 18 17 18 10z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M10 21h4"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function StudentDashboardPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [user, setUser] = useState<AuthUser | null>(null);
  const [studentProfile, setStudentProfile] =
    useState<StudentProfile | null>(null);

  const [loading, setLoading] = useState(true);
  const [profileError, setProfileError] = useState("");

  const planName =
    searchParams.get("planName") || "Regular";

  const tutorId =
    searchParams.get("tutorId") || "1";

  useEffect(() => {
    let mounted = true;

    const loadStudentData = async () => {
      setLoading(true);
      setProfileError("");

      try {
        const currentUser = await api.getCurrentUser();

        if (!mounted) return;

        if (currentUser.role !== "student") {
          const dashboardByRole: Record<string, string> = {
            parent: "/parent/dashboard",
            teacher: "/teacher/dashboard",
            admin: "/admin/dashboard",
          };

          router.replace(
            dashboardByRole[currentUser.role] || "/login",
          );

          return;
        }

        setUser(currentUser);

        const token = api.getAccessToken();

        if (!token) {
          router.replace("/login");
          return;
        }

        const apiBaseUrl =
          process.env.NEXT_PUBLIC_API_URL ||
          "http://127.0.0.1:8000/api/v1";

        const response = await fetch(
          `${apiBaseUrl}/students/me`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (!mounted) return;

        if (response.status === 401) {
          router.replace("/login");
          return;
        }

        if (response.status === 404) {
          setStudentProfile(null);
          setProfileError(
            "Your student profile has not been completed yet.",
          );
          return;
        }

        if (!response.ok) {
          const data = await response.json().catch(() => null);

          throw new Error(
            typeof data?.detail === "string"
              ? data.detail
              : "Unable to load your student profile.",
          );
        }

        const profile =
          (await response.json()) as StudentProfile;

        if (!mounted) return;

        setStudentProfile(profile);
      } catch (error) {
        if (!mounted) return;

        const message =
          error instanceof Error
            ? error.message
            : "Unable to load your student information.";

        setProfileError(message);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    void loadStudentData();

    return () => {
      mounted = false;
    };
  }, [router]);

  const studentName =
    user?.full_name || "Student";

  const firstName =
    studentName.trim().split(/\s+/)[0] || "Student";

  const studentInitials =
    studentName
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("") || "ST";

  const studentClass = studentProfile?.class_number
    ? `${studentProfile.class_number}th Class`
    : "Class not set";

  const board =
    studentProfile?.board_name || "Board not set";

  const medium =
    studentProfile?.medium_name || "Medium not set";

  const selectedSubjectsCount = subjects.length;

  const tutorMap: Record<
    string,
    {
      name: string;
      initials: string;
      subject: string;
    }
  > = {
    "1": {
      name: "Priya Sharma",
      initials: "PS",
      subject: "Mathematics",
    },
    "2": {
      name: "Ravi Kumar",
      initials: "RK",
      subject: "Science",
    },
    "3": {
      name: "Ananya Reddy",
      initials: "AR",
      subject: "English",
    },
    "4": {
      name: "Suresh Babu",
      initials: "SB",
      subject: "Mathematics",
    },
    "5": {
      name: "Lakshmi Devi",
      initials: "LD",
      subject: "Telugu",
    },
    "6": {
      name: "Arjun Mehta",
      initials: "AM",
      subject: "Social Science",
    },
    "7": {
      name: "Meena Krishnan",
      initials: "MK",
      subject: "Hindi",
    },
    "8": {
      name: "Vikram Rao",
      initials: "VR",
      subject: "Physical Science",
    },
    "9": {
      name: "Divya Nair",
      initials: "DN",
      subject: "Science",
    },
  };

  const tutor =
    tutorMap[tutorId] || tutorMap["1"];

  return (
    <main className="min-h-screen overflow-hidden bg-[#f4f8f7] text-[#111111]">
      {/* Ambient background */}
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
          className="absolute left-[-180px] top-[100px] h-[440px] w-[440px] rounded-full bg-[#42d4bc]/10 blur-[110px]"
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

        <div className="absolute bottom-[-180px] left-[30%] h-[430px] w-[430px] rounded-full bg-emerald-100/20 blur-[120px]" />
      </div>

      {/* Top navigation */}
      <header className="sticky top-0 z-50 border-b border-black/[0.06] bg-white/75 backdrop-blur-2xl">
        <div className="mx-auto flex h-[76px] max-w-[1480px] items-center justify-between px-5 sm:px-8 lg:px-12">
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
              Tutors
              <span className="text-[#37cdb3]">
                Que
              </span>
            </span>
          </Link>

          <div className="hidden items-center gap-7 lg:flex">
            <Link
              href="/student/dashboard"
              className="text-sm font-semibold text-[#169b87]"
            >
              Dashboard
            </Link>

            <Link
              href="/find-tutors"
              className="text-sm font-medium text-black/60 transition hover:text-[#169b87]"
            >
              Find tutors
            </Link>

            <Link
              href="/classes"
              className="text-sm font-medium text-black/60 transition hover:text-[#169b87]"
            >
              Classes
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/student/notifications"
              className="hidden h-11 w-11 items-center justify-center rounded-full border border-black/8 bg-white/55 text-black/55 transition hover:bg-white sm:flex"
              aria-label="Notifications"
            >
              <BellIcon />
            </Link>

            <div className="flex items-center gap-3 rounded-full border border-black/8 bg-white/65 py-1.5 pl-1.5 pr-4 backdrop-blur-xl">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#42d4bc] to-cyan-200 text-xs font-bold">
                {studentInitials}
              </div>

              <div className="hidden sm:block">
                <p className="text-xs font-semibold">
                  {studentName}
                </p>

                <p className="text-[10px] text-black/35">
                  {studentClass}
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section>
        <div className="mx-auto max-w-[1480px] px-5 py-8 sm:px-8 lg:px-12 lg:py-12">
          {/* Welcome */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end"
          >
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/65 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-black/45 shadow-sm backdrop-blur-xl">
                <span className="h-2 w-2 rounded-full bg-[#42d4bc]" />
                Student dashboard
              </div>

              <h1 className="mt-5 text-[43px] font-semibold leading-[1] tracking-[-0.065em] sm:text-[58px] lg:text-[66px]">
                Welcome back, {firstName}.
                <span className="block text-[#169b87]">
                  let&apos;s learn.
                </span>
              </h1>

              <p className="mt-5 max-w-[680px] text-[16px] leading-7 text-black/50">
                Your learning journey is organized in one place —
                classes, homework, tests and progress.
              </p>
            </div>

            <div className="tq-glass rounded-[23px] p-5 lg:min-w-[310px]">
              <p className="text-[10px] font-semibold uppercase tracking-[0.13em] text-black/35">
                Current learning setup
              </p>

              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.1em] text-black/30">
                    Board
                  </p>

                  <p className="mt-1 text-sm font-semibold">
                    {board}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] uppercase tracking-[0.1em] text-black/30">
                    Class
                  </p>

                  <p className="mt-1 text-sm font-semibold">
                    {studentClass}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] uppercase tracking-[0.1em] text-black/30">
                    Medium
                  </p>

                  <p className="mt-1 text-sm font-semibold">
                    {medium}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] uppercase tracking-[0.1em] text-black/30">
                    Plan
                  </p>

                  <p className="mt-1 text-sm font-semibold">
                    {planName}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Profile status */}
          {profileError && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 rounded-[20px] border border-amber-200 bg-amber-50/80 px-5 py-4 text-sm font-medium text-amber-800"
            >
              {profileError}
              <Link
                href="/student/profile"
                className="ml-2 font-bold underline underline-offset-4"
              >
                Complete profile
              </Link>
            </motion.div>
          )}

          {loading && (
            <div className="mt-6 rounded-[20px] border border-black/[0.05] bg-white/60 px-5 py-4 text-sm font-medium text-black/40 backdrop-blur-xl">
              Loading your student profile…
            </div>
          )}

          {/* Stats */}
          <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[
              {
                label: "Subjects",
                value: String(selectedSubjectsCount),
                detail: "In your learning plan",
                icon: <BookIcon />,
              },
              {
                label: "Classes completed",
                value: "28",
                detail: "This month",
                icon: <CheckIcon />,
              },
              {
                label: "Average score",
                value: "88%",
                detail: "+6% from last month",
                icon: <TrophyIcon />,
              },
              {
                label: "Learning streak",
                value: "12 days",
                detail: "Keep it going",
                icon: <BookIcon />,
              },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="tq-hover tq-glass rounded-[24px] p-5"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-[15px] bg-[#42d4bc]/15 text-[#159b87]">
                    {item.icon}
                  </div>

                  <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-black/25">
                    2026
                  </span>
                </div>

                <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.12em] text-black/30">
                  {item.label}
                </p>

                <p className="mt-1 text-[30px] font-semibold tracking-[-0.05em]">
                  {item.value}
                </p>

                <p className="mt-1 text-[11px] text-black/40">
                  {item.detail}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Main grid */}
          <div className="mt-8 grid gap-8 xl:grid-cols-[1.35fr_0.65fr]">
            {/* Left */}
            <div className="space-y-8">
              {/* Upcoming class */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="tq-depth overflow-hidden rounded-[31px] bg-black text-white"
              >
                <div className="relative p-6 sm:p-8">
                  <div className="absolute right-[-80px] top-[-100px] h-64 w-64 rounded-full bg-[#42d4bc]/20 blur-3xl" />

                  <div className="relative">
                    <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#42d4bc]">
                          Next live class
                        </p>

                        <h2 className="mt-3 text-[31px] font-semibold tracking-[-0.045em]">
                          Mathematics
                        </h2>

                        <p className="mt-1 text-sm text-white/45">
                          With {tutor.name}
                        </p>
                      </div>

                      <span className="rounded-full border border-[#42d4bc]/20 bg-[#42d4bc]/10 px-3 py-1.5 text-[10px] font-semibold text-[#42d4bc]">
                        Today · 6:00 PM
                      </span>
                    </div>

                    <div className="mt-7 grid gap-3 sm:grid-cols-3">
                      <div className="rounded-[18px] border border-white/10 bg-white/[0.06] p-4">
                        <p className="text-[10px] uppercase tracking-[0.11em] text-white/30">
                          Duration
                        </p>

                        <p className="mt-1 text-sm font-semibold">
                          60 minutes
                        </p>
                      </div>

                      <div className="rounded-[18px] border border-white/10 bg-white/[0.06] p-4">
                        <p className="text-[10px] uppercase tracking-[0.11em] text-white/30">
                          Chapter
                        </p>

                        <p className="mt-1 text-sm font-semibold">
                          Algebra
                        </p>
                      </div>

                      <div className="rounded-[18px] border border-white/10 bg-white/[0.06] p-4">
                        <p className="text-[10px] uppercase tracking-[0.11em] text-white/30">
                          Status
                        </p>

                        <p className="mt-1 text-sm font-semibold">
                          Scheduled
                        </p>
                      </div>
                    </div>

                    <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                      <Link
                        href="/student/live-class"
                        className="inline-flex h-12 items-center justify-center gap-2 rounded-[15px] bg-[#42d4bc] px-6 text-sm font-semibold text-black transition hover:-translate-y-0.5"
                      >
                        Join live class
                        <ArrowIcon />
                      </Link>

                      <Link
                        href="/student/schedule"
                        className="inline-flex h-12 items-center justify-center rounded-[15px] border border-white/10 bg-white/[0.06] px-6 text-sm font-semibold text-white/75"
                      >
                        View class details
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Schedule */}
              <div>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-black/30">
                      Schedule
                    </p>

                    <h2 className="mt-2 text-[30px] font-semibold tracking-[-0.045em]">
                      Upcoming classes
                    </h2>
                  </div>

                  <Link
                    href="/student/schedule"
                    className="text-xs font-semibold text-[#159b87]"
                  >
                    View calendar
                  </Link>
                </div>

                <div className="mt-5 space-y-3">
                  {schedule.map((item, index) => (
                    <motion.div
                      key={`${item.subject}-${item.time}`}
                      initial={{
                        opacity: 0,
                        x: -15,
                      }}
                      whileInView={{
                        opacity: 1,
                        x: 0,
                      }}
                      viewport={{ once: true }}
                      transition={{
                        delay: index * 0.04,
                      }}
                      className="tq-glass rounded-[22px] p-4"
                    >
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                        <div className="min-w-[100px]">
                          <p className="text-sm font-semibold">
                            {item.time}
                          </p>

                          <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.1em] text-black/30">
                            {item.status}
                          </p>
                        </div>

                        <div className="h-px bg-black/6 sm:h-10 sm:w-px" />

                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-semibold">
                              {item.subject}
                            </p>

                            <span className="rounded-full bg-[#42d4bc]/10 px-2.5 py-1 text-[9px] font-semibold text-[#138d79]">
                              {item.type}
                            </span>
                          </div>

                          <p className="mt-1 text-xs text-black/40">
                            {item.tutor} · {item.duration}
                          </p>
                        </div>

                        <Link
                          href="/student/schedule"
                          className="flex h-10 items-center justify-center rounded-[13px] border border-black/8 bg-white/50 px-4 text-xs font-semibold"
                        >
                          Details
                        </Link>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Homework */}
              <div>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-black/30">
                      Practice
                    </p>

                    <h2 className="mt-2 text-[30px] font-semibold tracking-[-0.045em]">
                      Homework
                    </h2>
                  </div>

                  <Link
                    href="/student/homework"
                    className="text-xs font-semibold text-[#159b87]"
                  >
                    View all
                  </Link>
                </div>

                <div className="mt-5 grid gap-3 md:grid-cols-3">
                  {homework.map((item) => (
                    <div
                      key={item.title}
                      className="tq-hover tq-glass rounded-[22px] p-4"
                    >
                      <div className="flex items-center justify-between">
                        <span className="rounded-full bg-black/5 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.1em] text-black/35">
                          {item.subject}
                        </span>

                        <span className="text-[10px] font-semibold text-black/35">
                          {item.due}
                        </span>
                      </div>

                      <h3 className="mt-5 text-[17px] font-semibold tracking-[-0.025em]">
                        {item.title}
                      </h3>

                      <div className="mt-5">
                        <div className="flex items-center justify-between text-[10px] text-black/35">
                          <span>Progress</span>
                          <span>{item.progress}%</span>
                        </div>

                        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-black/5">
                          <div
                            className="h-full rounded-full bg-[#42d4bc]"
                            style={{
                              width: `${item.progress}%`,
                            }}
                          />
                        </div>
                      </div>

                      <Link
                        href="/student/homework"
                        className="mt-5 inline-block text-xs font-semibold text-[#159b87]"
                      >
                        {item.progress === 100
                          ? "Completed"
                          : "Continue assignment"}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right */}
            <div className="space-y-8">
              {/* Profile */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 }}
                className="tq-glass rounded-[28px] p-5"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-[21px] bg-gradient-to-br from-[#42d4bc] to-cyan-200 text-lg font-bold">
                    {studentInitials}
                  </div>

                  <div>
                    <p className="text-[18px] font-semibold">
                      {studentName}
                    </p>

                    <p className="mt-1 text-xs text-black/40">
                      {studentClass} · {board}
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-2">
                  <div className="rounded-[16px] bg-white/55 p-4">
                    <p className="text-[9px] uppercase tracking-[0.1em] text-black/30">
                      Plan
                    </p>

                    <p className="mt-1 text-sm font-semibold">
                      {planName}
                    </p>
                  </div>

                  <div className="rounded-[16px] bg-white/55 p-4">
                    <p className="text-[9px] uppercase tracking-[0.1em] text-black/30">
                      Medium
                    </p>

                    <p className="mt-1 text-sm font-semibold">
                      {medium}
                    </p>
                  </div>
                </div>

                <Link
                  href="/student/profile"
                  className="mt-3 flex h-11 w-full items-center justify-center gap-2 rounded-[14px] border border-black/8 bg-white/55 text-xs font-semibold"
                >
                  <UserIcon />
                  View profile
                </Link>
              </motion.div>

              {/* Subject progress */}
              <div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-black/30">
                    Progress
                  </p>

                  <h2 className="mt-2 text-[27px] font-semibold tracking-[-0.04em]">
                    Subject progress
                  </h2>
                </div>

                <div className="mt-5 space-y-3">
                  {subjects.map((subject) => (
                    <div
                      key={subject.name}
                      className="tq-glass rounded-[21px] p-4"
                    >
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold">
                          {subject.name}
                        </p>

                        <span className="text-xs font-semibold text-[#159b87]">
                          {subject.score}
                        </span>
                      </div>

                      <div className="mt-4 h-2 overflow-hidden rounded-full bg-black/5">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{
                            width: `${subject.progress}%`,
                          }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.8,
                          }}
                          className={`h-full rounded-full bg-gradient-to-r ${subject.color}`}
                        />
                      </div>

                      <div className="mt-2 flex justify-between text-[9px] text-black/30">
                        <span>Course progress</span>
                        <span>{subject.progress}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tutor */}
              <div className="tq-glass rounded-[26px] p-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-black/30">
                  Your tutor
                </p>

                <div className="mt-5 flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-[18px] bg-gradient-to-br from-[#42d4bc] to-cyan-200 text-sm font-bold">
                    {tutor.initials}
                  </div>

                  <div className="flex-1">
                    <p className="text-[17px] font-semibold">
                      {tutor.name}
                    </p>

                    <p className="mt-1 text-xs text-black/40">
                      {tutor.subject} tutor
                    </p>
                  </div>

                  <span className="rounded-full bg-[#42d4bc]/10 px-2.5 py-1.5 text-[9px] font-semibold text-[#159b87]">
                    Active
                  </span>
                </div>

                <Link
                  href="/find-tutors"
                  className="mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-[14px] bg-black text-xs font-semibold text-white transition hover:bg-[#42d4bc] hover:text-black"
                >
                  View tutor
                  <ArrowIcon />
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-8">
            <div className="relative overflow-hidden rounded-[31px] bg-[#42d4bc] p-6 sm:p-8">
              <div className="absolute right-[-100px] top-[-120px] h-72 w-72 rounded-full bg-white/25 blur-3xl" />

              <div className="relative flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-black/45">
                    Keep learning
                  </p>

                  <h2 className="mt-3 text-[31px] font-semibold tracking-[-0.045em] sm:text-[38px]">
                    Small progress every day
                    <span className="block">
                      creates big results.
                    </span>
                  </h2>

                  <p className="mt-3 max-w-[600px] text-sm leading-6 text-black/50">
                    Stay consistent with your live classes, assignments and
                    weekly progress.
                  </p>
                </div>

                <Link
                  href="/find-tutors"
                  className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-[15px] bg-black px-6 text-sm font-semibold text-white transition hover:-translate-y-0.5"
                >
                  Find more tutors
                  <ArrowIcon />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-black/[0.06] px-5 py-8 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1480px] flex-col justify-between gap-4 text-sm text-black/40 sm:flex-row">
          <p>© {new Date().getFullYear()} TutorsQue</p>
          <p>Student learning dashboard</p>
        </div>
      </footer>
    </main>
  );
}