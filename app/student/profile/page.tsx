"use client";

import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

import { api, type AuthUser } from "@/app/lib/api";

type Tab = "profile" | "academic" | "guardian" | "preferences";

type StudentProfileData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  board: string;
  className: string;
  medium: string;
  school: string;
  academicYear: string;
  subjects: string[];
  guardianName: string;
  guardianRelation: string;
  guardianPhone: string;
  guardianEmail: string;
  preferredTime: string;
  classMode: string;
  notifications: boolean;
  homeworkAlerts: boolean;
  classReminders: boolean;
};

const STORAGE_KEY = "tutorsque_student_profile";

const subjects = [
  "Mathematics",
  "Science",
  "English",
  "Social Studies",
  "Telugu",
  "Hindi",
];

const defaultProfile: StudentProfileData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  board: "",
  className: "",
  medium: "",
  school: "Not set",
  academicYear: "2026–27",
  subjects: ["Mathematics", "Science", "English"],
  guardianName: "",
  guardianRelation: "Father",
  guardianPhone: "",
  guardianEmail: "",
  preferredTime: "6:00 PM – 8:00 PM",
  classMode: "Live Online",
  notifications: true,
  homeworkAlerts: true,
  classReminders: true,
};

const tabs: {
  id: Tab;
  label: string;
  description: string;
  number: string;
}[] = [
  {
    id: "profile",
    label: "Profile",
    description: "Personal information",
    number: "01",
  },
  {
    id: "academic",
    label: "Academic",
    description: "Board & class",
    number: "02",
  },
  {
    id: "guardian",
    label: "Parent / Guardian",
    description: "Contact details",
    number: "03",
  },
  {
    id: "preferences",
    label: "Preferences",
    description: "Learning settings",
    number: "04",
  },
];

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);

  if (!parts.length) {
    return "ST";
  }

  return parts
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function splitName(fullName: string) {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);

  const firstName = parts.shift() || "";
  const lastName = parts.join(" ");

  return {
    firstName,
    lastName,
  };
}

export default function StudentProfilePage() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<Tab>("profile");

  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);

  const [profile, setProfile] =
    useState<StudentProfileData>(defaultProfile);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    let cancelled = false;

    const loadProfile = async () => {
      setLoading(true);
      setError("");

      try {
        const token = api.getAccessToken();

        if (!token) {
          router.replace("/login");
          return;
        }

        const user = await api.getCurrentUser();

        if (cancelled) {
          return;
        }

        if (user.role !== "student") {
          if (user.role === "teacher") {
            router.replace("/teacher/dashboard");
          } else if (user.role === "parent") {
            router.replace("/parent/dashboard");
          } else if (user.role === "admin") {
            router.replace("/admin/dashboard");
          } else {
            router.replace("/login");
          }

          return;
        }

        setCurrentUser(user);

        const name = splitName(user.full_name);

        let storedProfile: Partial<StudentProfileData> = {};

        try {
          const stored = localStorage.getItem(STORAGE_KEY);

          if (stored) {
            storedProfile = JSON.parse(stored);
          }
        } catch {
          storedProfile = {};
        }

        setProfile({
          ...defaultProfile,
          ...storedProfile,
          firstName: name.firstName,
          lastName: name.lastName,
          email: user.email,
          phone: user.phone || "",
        });
      } catch (err) {
        if (cancelled) {
          return;
        }

        const message =
          err instanceof Error
            ? err.message
            : "Unable to load your profile.";

        if (
          message.toLowerCase().includes("unauthorized") ||
          message.toLowerCase().includes("invalid") ||
          message.toLowerCase().includes("expired") ||
          message.toLowerCase().includes("token")
        ) {
          router.replace("/login");
          return;
        }

        setError(message);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void loadProfile();

    return () => {
      cancelled = true;
    };
  }, [router]);

  const fullName = useMemo(() => {
    const name = `${profile.firstName} ${profile.lastName}`.trim();

    return name || "Student";
  }, [profile.firstName, profile.lastName]);

  const initials = useMemo(() => {
    if (currentUser?.full_name) {
      return getInitials(currentUser.full_name);
    }

    return getInitials(fullName);
  }, [currentUser, fullName]);

  const profileCompletion = useMemo(() => {
    const checks = [
      Boolean(profile.firstName),
      Boolean(profile.lastName),
      Boolean(profile.email),
      Boolean(profile.phone),
      Boolean(profile.address),
      Boolean(profile.board),
      Boolean(profile.className),
      Boolean(profile.medium),
      Boolean(profile.guardianName),
      Boolean(profile.guardianPhone),
    ];

    const completed = checks.filter(Boolean).length;

    return Math.round((completed / checks.length) * 100);
  }, [profile]);

  const saveChanges = async (event?: FormEvent) => {
    event?.preventDefault();

    if (saving) {
      return;
    }

    setSaving(true);
    setSaved(false);
    setError("");

    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          ...profile,
        }),
      );

      await new Promise((resolve) => {
        window.setTimeout(resolve, 450);
      });

      setSaved(true);

      window.setTimeout(() => {
        setSaved(false);
      }, 2500);
    } catch {
      setError("Unable to save your profile on this device.");
    } finally {
      setSaving(false);
    }
  };

  const toggleSubject = (subject: string) => {
    setProfile((current) => {
      const exists = current.subjects.includes(subject);

      return {
        ...current,
        subjects: exists
          ? current.subjects.filter((item) => item !== subject)
          : [...current.subjects, subject],
      };
    });
  };

  const updateProfile = <K extends keyof StudentProfileData>(
    key: K,
    value: StudentProfileData[K],
  ) => {
    setProfile((current) => ({
      ...current,
      [key]: value,
    }));
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f8f7] text-[#111]">
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 24, 0],
            y: [0, -18, 0],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-[5%] top-[4%] h-80 w-80 rounded-full bg-[#42d4bc]/10 blur-[110px]"
        />

        <motion.div
          animate={{
            x: [0, -30, 0],
            y: [0, 25, 0],
          }}
          transition={{
            duration: 17,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-[0%] right-[0%] h-[430px] w-[430px] rounded-full bg-cyan-100/40 blur-[120px]"
        />

        <div className="absolute left-1/2 top-[35%] h-64 w-64 -translate-x-1/2 rounded-full bg-white/80 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-[1450px] px-4 py-5 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="tq-glass mb-6 flex flex-col gap-4 rounded-[28px] px-5 py-4 shadow-xl shadow-black/[0.035] sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex items-center gap-3">
            <Link
              href="/student/dashboard"
              aria-label="Back to student dashboard"
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-black text-white transition duration-200 hover:-translate-y-0.5 hover:shadow-lg"
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
              <p className="text-lg font-black tracking-[-0.03em]">
                Profile & Settings
              </p>

              <p className="mt-0.5 text-xs text-black/45">
                Manage your student account and learning preferences
              </p>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {saved ? (
              <motion.div
                key="saved"
                initial={{ opacity: 0, scale: 0.92, y: 5 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex items-center gap-2 self-start rounded-full bg-[#42d4bc]/10 px-4 py-2.5 text-xs font-black text-[#087d6a] sm:self-auto"
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#42d4bc] text-black">
                  ✓
                </span>

                Changes saved
              </motion.div>
            ) : (
              <motion.div
                key="active"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2 self-start rounded-full bg-black/[0.04] px-4 py-2.5 text-xs font-black text-black/55 sm:self-auto"
              >
                <span className="h-2 w-2 rounded-full bg-[#42d4bc]" />
                Student account active
              </motion.div>
            )}
          </AnimatePresence>
        </motion.header>

        {/* Error */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700"
          >
            {error}
          </motion.div>
        )}

        {/* Loading */}
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-5 rounded-2xl border border-black/[0.05] bg-white/70 px-4 py-3 text-xs font-bold text-black/45 shadow-sm"
          >
            Loading your student profile…
          </motion.div>
        )}

        <div className="grid gap-5 lg:grid-cols-[290px_minmax(0,1fr)]">
          {/* Sidebar */}
          <aside className="h-fit lg:sticky lg:top-5">
            <motion.div
              initial={{ opacity: 0, x: -18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="tq-glass rounded-[30px] p-4 shadow-xl shadow-black/[0.035]"
            >
              {/* Student card */}
              <div className="relative overflow-hidden rounded-[24px] bg-black p-5 text-white">
                <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#42d4bc]/20 blur-3xl" />

                <div className="relative flex items-center gap-3">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#42d4bc] text-lg font-black text-black shadow-lg shadow-[#42d4bc]/10">
                    {initials}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-black">
                      {fullName}
                    </p>

                    <p className="mt-1 text-[11px] text-white/45">
                      Class {profile.className || "—"} Student
                    </p>
                  </div>
                </div>

                <div className="relative mt-5 rounded-xl border border-white/10 bg-white/[0.05] px-3 py-2.5">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[10px] font-bold text-white/40">
                      Student ID
                    </span>

                    <span className="font-mono text-[10px] font-black text-white/75">
                      {currentUser
                        ? `TQ-STU-${currentUser.id}`
                        : "TQ-STU-—"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <nav className="mt-4 space-y-1.5">
                {tabs.map((tab) => {
                  const active = activeTab === tab.id;

                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      className={`group flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left transition ${
                        active
                          ? "bg-[#42d4bc]/10 text-[#087d6a]"
                          : "text-black/50 hover:bg-black/[0.035] hover:text-black"
                      }`}
                    >
                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-xs font-black transition ${
                          active
                            ? "bg-[#42d4bc] text-black shadow-sm"
                            : "bg-black/[0.04]"
                        }`}
                      >
                        {tab.number}
                      </span>

                      <span className="min-w-0">
                        <span className="block text-xs font-black">
                          {tab.label}
                        </span>

                        <span className="mt-0.5 block text-[10px] text-black/30">
                          {tab.description}
                        </span>
                      </span>

                      <span
                        className={`ml-auto transition ${
                          active
                            ? "translate-x-0 text-[#087d6a]"
                            : "text-black/20 group-hover:translate-x-0.5"
                        }`}
                      >
                        →
                      </span>
                    </button>
                  );
                })}
              </nav>

              {/* Completion */}
              <div className="mt-4 rounded-2xl border border-[#42d4bc]/15 bg-[#42d4bc]/[0.06] p-4">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-black">
                    Profile completion
                  </p>

                  <span className="text-xs font-black text-[#0b9079]">
                    {profileCompletion}%
                  </span>
                </div>

                <div className="mt-3 h-2 overflow-hidden rounded-full bg-black/[0.06]">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{
                      width: `${profileCompletion}%`,
                    }}
                    transition={{
                      duration: 1,
                      ease: "easeOut",
                    }}
                    className="h-full rounded-full bg-[#42d4bc]"
                  />
                </div>

                <div className="mt-2 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-black/35">
                    Keep your profile updated
                  </span>

                  <span className="text-[10px] font-black text-[#0b9079]">
                    {profileCompletion >= 80
                      ? "Excellent"
                      : profileCompletion >= 50
                        ? "Good"
                        : "Getting started"}
                  </span>
                </div>
              </div>

              {/* Account status */}
              <div className="mt-4 flex items-center gap-2 rounded-2xl bg-black/[0.025] px-3.5 py-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#42d4bc]/10 text-xs text-[#087d6a]">
                  ✓
                </span>

                <div>
                  <p className="text-[11px] font-black">
                    Account secure
                  </p>

                  <p className="mt-0.5 text-[10px] text-black/35">
                    Your account is authenticated
                  </p>
                </div>
              </div>
            </motion.div>
          </aside>

          {/* Main content */}
          <section className="min-w-0">
            <AnimatePresence mode="wait">
              {/* PROFILE */}
              {activeTab === "profile" && (
                <motion.div
                  key="profile"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35 }}
                  className="space-y-5"
                >
                  <div className="tq-glass rounded-[30px] p-6 shadow-xl shadow-black/[0.035] sm:p-8">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-black/30">
                          Personal information
                        </p>

                        <h1 className="mt-2 text-3xl font-black tracking-[-0.045em] sm:text-4xl">
                          Your profile
                        </h1>

                        <p className="mt-2 max-w-2xl text-sm leading-6 text-black/45">
                          Keep your personal information updated so your
                          TutorsQue learning experience stays accurate.
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => void saveChanges()}
                        disabled={saving || loading}
                        className="rounded-2xl bg-black px-5 py-3 text-xs font-black text-white transition hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {saving ? "Saving…" : "Save Changes"}
                      </button>
                    </div>

                    <form
                      onSubmit={saveChanges}
                      className="mt-8 grid gap-5 sm:grid-cols-2"
                    >
                      <div>
                        <label className="mb-2 block text-xs font-black">
                          First name
                        </label>

                        <input
                          value={profile.firstName}
                          readOnly
                          className="tq-input"
                        />

                        <p className="mt-1.5 text-[10px] text-black/30">
                          Taken from your account
                        </p>
                      </div>

                      <div>
                        <label className="mb-2 block text-xs font-black">
                          Last name
                        </label>

                        <input
                          value={profile.lastName}
                          readOnly
                          className="tq-input"
                        />

                        <p className="mt-1.5 text-[10px] text-black/30">
                          Taken from your account
                        </p>
                      </div>

                      <div>
                        <label className="mb-2 block text-xs font-black">
                          Email address
                        </label>

                        <input
                          type="email"
                          value={profile.email}
                          readOnly
                          className="tq-input"
                        />

                        <p className="mt-1.5 text-[10px] text-black/30">
                          Account email
                        </p>
                      </div>

                      <div>
                        <label className="mb-2 block text-xs font-black">
                          Phone number
                        </label>

                        <input
                          value={profile.phone}
                          readOnly
                          className="tq-input"
                        />

                        <p className="mt-1.5 text-[10px] text-black/30">
                          Account phone
                        </p>
                      </div>

                      <div className="sm:col-span-2">
                        <label className="mb-2 block text-xs font-black">
                          Address
                        </label>

                        <input
                          value={profile.address}
                          onChange={(event) =>
                            updateProfile(
                              "address",
                              event.target.value,
                            )
                          }
                          className="tq-input"
                          placeholder="Enter your current address"
                        />
                      </div>
                    </form>
                  </div>

                  <div className="grid gap-5 md:grid-cols-2">
                    <motion.div
                      whileHover={{ y: -3 }}
                      transition={{ duration: 0.2 }}
                      className="tq-glass rounded-[26px] p-6 shadow-lg shadow-black/[0.03]"
                    >
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#42d4bc]/10 text-[#0b9079]">
                        ✓
                      </div>

                      <p className="mt-4 text-sm font-black">
                        Account verified
                      </p>

                      <p className="mt-1 text-xs leading-5 text-black/40">
                        Your TutorsQue student account is authenticated
                        and ready for learning.
                      </p>
                    </motion.div>

                    <motion.div
                      whileHover={{ y: -3 }}
                      transition={{ duration: 0.2 }}
                      className="tq-glass rounded-[26px] p-6 shadow-lg shadow-black/[0.03]"
                    >
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-black/[0.04] text-black/60">
                        {profile.className || "—"}
                      </div>

                      <p className="mt-4 text-sm font-black">
                        Current class
                      </p>

                      <p className="mt-1 text-xs leading-5 text-black/40">
                        Class {profile.className || "—"}{" "}
                        {profile.board
                          ? `under ${profile.board}`
                          : "learning profile"}
                        .
                      </p>
                    </motion.div>
                  </div>

                  {/* Account information */}
                  <div className="tq-glass rounded-[26px] p-6 shadow-lg shadow-black/[0.03]">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-black/30">
                      Account information
                    </p>

                    <div className="mt-5 grid gap-4 sm:grid-cols-3">
                      <div className="rounded-2xl bg-black/[0.025] p-4">
                        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-black/30">
                          Role
                        </p>

                        <p className="mt-2 text-sm font-black">
                          Student
                        </p>
                      </div>

                      <div className="rounded-2xl bg-black/[0.025] p-4">
                        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-black/30">
                          Account status
                        </p>

                        <p className="mt-2 text-sm font-black capitalize">
                          {currentUser?.status || "Active"}
                        </p>
                      </div>

                      <div className="rounded-2xl bg-black/[0.025] p-4">
                        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-black/30">
                          Student ID
                        </p>

                        <p className="mt-2 font-mono text-sm font-black">
                          {currentUser
                            ? `TQ-STU-${currentUser.id}`
                            : "TQ-STU-—"}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ACADEMIC */}
              {activeTab === "academic" && (
                <motion.div
                  key="academic"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35 }}
                  className="space-y-5"
                >
                  <div className="tq-glass rounded-[30px] p-6 shadow-xl shadow-black/[0.035] sm:p-8">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-black/30">
                          Academic profile
                        </p>

                        <h1 className="mt-2 text-3xl font-black tracking-[-0.045em] sm:text-4xl">
                          Your academics
                        </h1>

                        <p className="mt-2 max-w-2xl text-sm leading-6 text-black/45">
                          Set the academic information used to personalize
                          your TutorsQue learning experience.
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => void saveChanges()}
                        disabled={saving || loading}
                        className="rounded-2xl bg-black px-5 py-3 text-xs font-black text-white transition hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {saving ? "Saving…" : "Save Changes"}
                      </button>
                    </div>

                    <div className="mt-8 grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-xs font-black">
                          Board
                        </label>

                        <select
                          value={profile.board}
                          onChange={(event) =>
                            updateProfile(
                              "board",
                              event.target.value,
                            )
                          }
                          className="tq-input appearance-none"
                        >
                          <option value="">
                            Select board
                          </option>
                          <option value="AP State Board">
                            AP State Board
                          </option>
                          <option value="CBSE">CBSE</option>
                        </select>
                      </div>

                      <div>
                        <label className="mb-2 block text-xs font-black">
                          Class
                        </label>

                        <select
                          value={profile.className}
                          onChange={(event) =>
                            updateProfile(
                              "className",
                              event.target.value,
                            )
                          }
                          className="tq-input appearance-none"
                        >
                          <option value="">
                            Select class
                          </option>

                          {Array.from(
                            { length: 10 },
                            (_, index) => (
                              <option
                                key={index + 1}
                                value={String(index + 1)}
                              >
                                Class {index + 1}
                              </option>
                            ),
                          )}
                        </select>
                      </div>

                      <div>
                        <label className="mb-2 block text-xs font-black">
                          Medium
                        </label>

                        <select
                          value={profile.medium}
                          onChange={(event) =>
                            updateProfile(
                              "medium",
                              event.target.value,
                            )
                          }
                          className="tq-input appearance-none"
                        >
                          <option value="">
                            Select medium
                          </option>
                          <option value="English">
                            English
                          </option>
                          <option value="Telugu">
                            Telugu
                          </option>
                          <option value="Hindi">
                            Hindi
                          </option>
                        </select>
                      </div>

                      <div>
                        <label className="mb-2 block text-xs font-black">
                          Academic year
                        </label>

                        <select
                          value={profile.academicYear}
                          onChange={(event) =>
                            updateProfile(
                              "academicYear",
                              event.target.value,
                            )
                          }
                          className="tq-input appearance-none"
                        >
                          <option value="2026–27">
                            2026–27
                          </option>
                          <option value="2027–28">
                            2027–28
                          </option>
                          <option value="2028–29">
                            2028–29
                          </option>
                        </select>
                      </div>

                      <div className="sm:col-span-2">
                        <label className="mb-2 block text-xs font-black">
                          School
                        </label>

                        <input
                          value={profile.school}
                          readOnly
                          className="tq-input"
                        />

                        <p className="mt-1.5 text-[10px] text-black/30">
                          School information is managed through the
                          TutorsQue enrollment system.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Subjects */}
                  <div className="tq-glass rounded-[28px] p-6 shadow-xl shadow-black/[0.03] sm:p-7">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-black/30">
                      Subjects
                    </p>

                    <h2 className="mt-2 text-2xl font-black tracking-[-0.035em]">
                      Your active subjects
                    </h2>

                    <p className="mt-1 text-xs leading-5 text-black/40">
                      Choose the subjects you are currently learning
                      through TutorsQue.
                    </p>

                    <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {subjects.map((subject) => {
                        const selected =
                          profile.subjects.includes(subject);

                        return (
                          <button
                            key={subject}
                            type="button"
                            onClick={() =>
                              toggleSubject(subject)
                            }
                            className={`group flex items-center justify-between rounded-2xl border px-4 py-3.5 text-left transition ${
                              selected
                                ? "border-[#42d4bc]/30 bg-[#42d4bc]/10"
                                : "border-black/[0.05] bg-white/45 hover:border-black/[0.09] hover:bg-white/70"
                            }`}
                          >
                            <span className="flex items-center gap-3">
                              <span
                                className={`flex h-8 w-8 items-center justify-center rounded-xl text-xs font-black ${
                                  selected
                                    ? "bg-[#42d4bc] text-black"
                                    : "bg-black/[0.04] text-black/35"
                                }`}
                              >
                                {selected ? "✓" : "+"}
                              </span>

                              <span
                                className={`text-xs font-black ${
                                  selected
                                    ? "text-black"
                                    : "text-black/50"
                                }`}
                              >
                                {subject}
                              </span>
                            </span>

                            <span className="text-black/20 transition group-hover:translate-x-0.5">
                              →
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    <div className="mt-5 flex items-center justify-between rounded-2xl bg-black/[0.025] px-4 py-3">
                      <span className="text-xs font-bold text-black/45">
                        Selected subjects
                      </span>

                      <span className="text-sm font-black text-[#0b9079]">
                        {profile.subjects.length}
                      </span>
                    </div>
                  </div>

                  {/* Academic summary */}
                  <div className="grid gap-5 md:grid-cols-3">
                    <motion.div
                      whileHover={{ y: -3 }}
                      className="tq-glass rounded-[25px] p-5 shadow-lg shadow-black/[0.025]"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#42d4bc]/10 text-sm font-black text-[#087d6a]">
                        B
                      </div>

                      <p className="mt-4 text-sm font-black">
                        Board
                      </p>

                      <p className="mt-1 text-xs text-black/40">
                        {profile.board || "Not selected"}
                      </p>
                    </motion.div>

                    <motion.div
                      whileHover={{ y: -3 }}
                      className="tq-glass rounded-[25px] p-5 shadow-lg shadow-black/[0.025]"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black/[0.04] text-sm font-black">
                        C
                      </div>

                      <p className="mt-4 text-sm font-black">
                        Class
                      </p>

                      <p className="mt-1 text-xs text-black/40">
                        {profile.className
                          ? `Class ${profile.className}`
                          : "Not selected"}
                      </p>
                    </motion.div>

                    <motion.div
                      whileHover={{ y: -3 }}
                      className="tq-glass rounded-[25px] p-5 shadow-lg shadow-black/[0.025]"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black/[0.04] text-sm font-black">
                        M
                      </div>

                      <p className="mt-4 text-sm font-black">
                        Medium
                      </p>

                      <p className="mt-1 text-xs text-black/40">
                        {profile.medium || "Not selected"}
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {/* GUARDIAN */}
              {activeTab === "guardian" && (
                <motion.div
                  key="guardian"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35 }}
                  className="space-y-5"
                >
                  <div className="tq-glass rounded-[30px] p-6 shadow-xl shadow-black/[0.035] sm:p-8">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-black/30">
                          Parent / Guardian
                        </p>

                        <h1 className="mt-2 text-3xl font-black tracking-[-0.045em] sm:text-4xl">
                          Family contact
                        </h1>

                        <p className="mt-2 max-w-2xl text-sm leading-6 text-black/45">
                          Keep a parent or guardian contact connected to
                          your TutorsQue learning profile.
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => void saveChanges()}
                        disabled={saving || loading}
                        className="rounded-2xl bg-black px-5 py-3 text-xs font-black text-white transition hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {saving ? "Saving…" : "Save Changes"}
                      </button>
                    </div>

                    <div className="mt-8 grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-xs font-black">
                          Full name
                        </label>

                        <input
                          value={profile.guardianName}
                          onChange={(event) =>
                            updateProfile(
                              "guardianName",
                              event.target.value,
                            )
                          }
                          className="tq-input"
                          placeholder="Parent or guardian name"
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-xs font-black">
                          Relationship
                        </label>

                        <select
                          value={profile.guardianRelation}
                          onChange={(event) =>
                            updateProfile(
                              "guardianRelation",
                              event.target.value,
                            )
                          }
                          className="tq-input appearance-none"
                        >
                          <option value="Father">
                            Father
                          </option>
                          <option value="Mother">
                            Mother
                          </option>
                          <option value="Guardian">
                            Guardian
                          </option>
                          <option value="Other">
                            Other
                          </option>
                        </select>
                      </div>

                      <div>
                        <label className="mb-2 block text-xs font-black">
                          Phone number
                        </label>

                        <input
                          type="tel"
                          value={profile.guardianPhone}
                          onChange={(event) =>
                            updateProfile(
                              "guardianPhone",
                              event.target.value,
                            )
                          }
                          className="tq-input"
                          placeholder="Parent phone number"
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-xs font-black">
                          Email address
                        </label>

                        <input
                          type="email"
                          value={profile.guardianEmail}
                          onChange={(event) =>
                            updateProfile(
                              "guardianEmail",
                              event.target.value,
                            )
                          }
                          className="tq-input"
                          placeholder="Parent email address"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="rounded-[28px] border border-[#42d4bc]/15 bg-[#42d4bc]/[0.055] p-6 sm:p-7">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#42d4bc]/15 text-[#087d6a]">
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
                            d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"
                          />

                          <circle
                            cx="9.5"
                            cy="7"
                            r="4"
                          />

                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17 8.5a4 4 0 0 1 0 7"
                          />
                        </svg>
                      </div>

                      <div>
                        <p className="text-sm font-black">
                          Parent communication
                        </p>

                        <p className="mt-1 max-w-2xl text-xs leading-5 text-black/50">
                          This contact can be used for important
                          enrollment, payment and learning
                          communication from TutorsQue.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-5 md:grid-cols-2">
                    <div className="tq-glass rounded-[25px] p-6 shadow-lg shadow-black/[0.025]">
                      <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-black/30">
                        Relationship
                      </p>

                      <p className="mt-2 text-lg font-black">
                        {profile.guardianRelation || "Not set"}
                      </p>

                      <p className="mt-1 text-xs text-black/40">
                        Primary family contact
                      </p>
                    </div>

                    <div className="tq-glass rounded-[25px] p-6 shadow-lg shadow-black/[0.025]">
                      <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-black/30">
                        Contact status
                      </p>

                      <p className="mt-2 text-lg font-black">
                        {profile.guardianPhone
                          ? "Connected"
                          : "Not set"}
                      </p>

                      <p className="mt-1 text-xs text-black/40">
                        Parent communication details
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* PREFERENCES */}
              {activeTab === "preferences" && (
                <motion.div
                  key="preferences"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35 }}
                  className="space-y-5"
                >
                  <div className="tq-glass rounded-[30px] p-6 shadow-xl shadow-black/[0.035] sm:p-8">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-black/30">
                          Learning preferences
                        </p>

                        <h1 className="mt-2 text-3xl font-black tracking-[-0.045em] sm:text-4xl">
                          Your preferences
                        </h1>

                        <p className="mt-2 max-w-2xl text-sm leading-6 text-black/45">
                          Customize your preferred class timing and how
                          TutorsQue communicates with you.
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => void saveChanges()}
                        disabled={saving || loading}
                        className="rounded-2xl bg-black px-5 py-3 text-xs font-black text-white transition hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {saving
                          ? "Saving…"
                          : "Save Preferences"}
                      </button>
                    </div>

                    <div className="mt-8 grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-xs font-black">
                          Preferred class time
                        </label>

                        <select
                          value={profile.preferredTime}
                          onChange={(event) =>
                            updateProfile(
                              "preferredTime",
                              event.target.value,
                            )
                          }
                          className="tq-input appearance-none"
                        >
                          <option>
                            4:00 PM – 6:00 PM
                          </option>
                          <option>
                            5:00 PM – 7:00 PM
                          </option>
                          <option>
                            6:00 PM – 8:00 PM
                          </option>
                          <option>
                            7:00 PM – 9:00 PM
                          </option>
                        </select>
                      </div>

                      <div>
                        <label className="mb-2 block text-xs font-black">
                          Class mode
                        </label>

                        <select
                          value={profile.classMode}
                          onChange={(event) =>
                            updateProfile(
                              "classMode",
                              event.target.value,
                            )
                          }
                          className="tq-input appearance-none"
                        >
                          <option>
                            Live Online
                          </option>
                          <option>
                            Recorded + Live
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Notifications */}
                  <div className="tq-glass rounded-[28px] p-6 shadow-xl shadow-black/[0.03] sm:p-7">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-black/30">
                      Notifications
                    </p>

                    <h2 className="mt-2 text-2xl font-black tracking-[-0.035em]">
                      Stay updated
                    </h2>

                    <p className="mt-1 text-xs leading-5 text-black/40">
                      Choose which learning updates you want to receive.
                    </p>

                    <div className="mt-6 space-y-3">
                      {[
                        {
                          key: "notifications" as const,
                          label: "Class notifications",
                          description:
                            "Receive updates about upcoming classes.",
                        },
                        {
                          key: "homeworkAlerts" as const,
                          label: "Homework alerts",
                          description:
                            "Get notified when new homework is assigned.",
                        },
                        {
                          key: "classReminders" as const,
                          label: "Class reminders",
                          description:
                            "Receive reminders before your classes start.",
                        },
                      ].map((item) => {
                        const enabled = profile[item.key];

                        return (
                          <div
                            key={item.key}
                            className="flex items-center justify-between gap-4 rounded-2xl border border-black/[0.035] bg-black/[0.018] p-4 transition hover:bg-black/[0.025]"
                          >
                            <div>
                              <p className="text-sm font-black">
                                {item.label}
                              </p>

                              <p className="mt-1 text-[11px] leading-5 text-black/40">
                                {item.description}
                              </p>
                            </div>

                            <button
                              type="button"
                              onClick={() =>
                                updateProfile(
                                  item.key,
                                  !enabled,
                                )
                              }
                              className={`relative h-7 w-12 shrink-0 rounded-full transition ${
                                enabled
                                  ? "bg-[#42d4bc]"
                                  : "bg-black/[0.12]"
                              }`}
                              aria-label={`Toggle ${item.label}`}
                            >
                              <span
                                className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-md transition ${
                                  enabled
                                    ? "left-6"
                                    : "left-1"
                                }`}
                              />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Preference cards */}
                  <div className="grid gap-5 md:grid-cols-2">
                    <motion.div
                      whileHover={{ y: -3 }}
                      className="tq-glass rounded-[25px] p-6 shadow-lg shadow-black/[0.025]"
                    >
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#42d4bc]/10 text-[#087d6a]">
                        ◷
                      </div>

                      <p className="mt-4 text-sm font-black">
                        Live classes
                      </p>

                      <p className="mt-1 text-xs leading-5 text-black/40">
                        Your enrolled classes and scheduled sessions
                        will appear automatically in your student
                        dashboard.
                      </p>

                      <div className="mt-4 rounded-xl bg-black/[0.025] px-3 py-2.5">
                        <p className="text-[10px] font-bold text-black/35">
                          Preferred time
                        </p>

                        <p className="mt-1 text-xs font-black">
                          {profile.preferredTime}
                        </p>
                      </div>
                    </motion.div>

                    <motion.div
                      whileHover={{ y: -3 }}
                      className="tq-glass rounded-[25px] p-6 shadow-lg shadow-black/[0.025]"
                    >
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-black/[0.04] text-black/60">
                        ✓
                      </div>

                      <p className="mt-4 text-sm font-black">
                        Personalized learning
                      </p>

                      <p className="mt-1 text-xs leading-5 text-black/40">
                        Your subjects, board, class and learning
                        preferences help TutorsQue personalize your
                        experience.
                      </p>

                      <div className="mt-4 rounded-xl bg-black/[0.025] px-3 py-2.5">
                        <p className="text-[10px] font-bold text-black/35">
                          Learning mode
                        </p>

                        <p className="mt-1 text-xs font-black">
                          {profile.classMode}
                        </p>
                      </div>
                    </motion.div>
                  </div>

                  {/* Save panel */}
                  <div className="rounded-[28px] bg-black p-6 text-white shadow-xl shadow-black/10 sm:p-7">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/35">
                          Ready
                        </p>

                        <h2 className="mt-2 text-xl font-black">
                          Keep your learning profile updated.
                        </h2>

                        <p className="mt-1 text-xs leading-5 text-white/45">
                          Your preferences are stored on this device
                          until the TutorsQue profile API is connected.
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => void saveChanges()}
                        disabled={saving || loading}
                        className="rounded-2xl bg-[#42d4bc] px-5 py-3 text-xs font-black text-black transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#42d4bc]/10 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {saving
                          ? "Saving…"
                          : "Save Everything"}
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </section>
        </div>
      </div>

      <style jsx>{`
        .tq-input {
          width: 100%;
          border-radius: 16px;
          border: 1px solid rgba(0, 0, 0, 0.06);
          background: rgba(255, 255, 255, 0.66);
          padding: 13px 15px;
          font-size: 13px;
          font-weight: 600;
          color: #111;
          outline: none;
          transition:
            border-color 180ms ease,
            box-shadow 180ms ease,
            background 180ms ease,
            transform 180ms ease;
        }

        .tq-input::placeholder {
          color: rgba(0, 0, 0, 0.25);
        }

        .tq-input:hover {
          background: rgba(255, 255, 255, 0.78);
        }

        .tq-input:focus {
          border-color: rgba(66, 212, 188, 0.55);
          background: rgba(255, 255, 255, 0.9);
          box-shadow: 0 0 0 4px rgba(66, 212, 188, 0.08);
        }

        .tq-input:read-only {
          cursor: default;
          background: rgba(255, 255, 255, 0.5);
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