"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Tab = "profile" | "qualifications" | "availability" | "documents";

const subjects = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "English",
  "Social Studies",
];

const classes = ["6", "7", "8", "9", "10"];

const availabilityData = [
  { day: "Monday", enabled: true, from: "5:00 PM", to: "8:00 PM" },
  { day: "Tuesday", enabled: true, from: "5:00 PM", to: "8:00 PM" },
  { day: "Wednesday", enabled: true, from: "5:00 PM", to: "8:00 PM" },
  { day: "Thursday", enabled: true, from: "5:00 PM", to: "8:00 PM" },
  { day: "Friday", enabled: true, from: "5:00 PM", to: "8:00 PM" },
  { day: "Saturday", enabled: true, from: "10:00 AM", to: "2:00 PM" },
  { day: "Sunday", enabled: false, from: "10:00 AM", to: "2:00 PM" },
];

const documents = [
  {
    name: "Degree Certificate",
    type: "PDF",
    status: "Verified",
    size: "2.4 MB",
  },
  {
    name: "Teaching Experience Certificate",
    type: "PDF",
    status: "Verified",
    size: "1.8 MB",
  },
  {
    name: "Identity Document",
    type: "PDF",
    status: "Verified",
    size: "1.2 MB",
  },
];

export default function TeacherProfilePage() {
  const [activeTab, setActiveTab] = useState<Tab>("profile");
  const [saved, setSaved] = useState(false);
  const [availability, setAvailability] = useState(availabilityData);

  const [profile, setProfile] = useState({
    firstName: "Rahul",
    lastName: "Varma",
    email: "rahul.varma@example.com",
    phone: "+91 98765 43210",
    city: "Vijayawada",
    school: "Sri Chaitanya School",
    experience: "7",
    bio: "Experienced mathematics educator focused on building strong fundamentals and helping students gain confidence through concept-based learning.",
  });

  const [selectedSubjects, setSelectedSubjects] = useState([
    "Mathematics",
    "Physics",
  ]);

  const [selectedClasses, setSelectedClasses] = useState([
    "8",
    "9",
    "10",
  ]);

  const [qualifications, setQualifications] = useState({
    highestQualification: "M.Sc Mathematics",
    university: "Andhra University",
    graduationYear: "2018",
    board: "AP State Board",
    teachingApproach: "Concept-first, interactive and exam-focused",
  });

  const saveChanges = (event?: FormEvent) => {
    event?.preventDefault();
    setSaved(true);

    window.setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  const toggleSubject = (subject: string) => {
    setSelectedSubjects((current) =>
      current.includes(subject)
        ? current.filter((item) => item !== subject)
        : [...current, subject]
    );
  };

  const toggleClass = (value: string) => {
    setSelectedClasses((current) =>
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value]
    );
  };

  const toggleAvailability = (index: number) => {
    setAvailability((current) =>
      current.map((item, itemIndex) =>
        itemIndex === index
          ? { ...item, enabled: !item.enabled }
          : item
      )
    );
  };

  const updateAvailabilityTime = (
    index: number,
    field: "from" | "to",
    value: string
  ) => {
    setAvailability((current) =>
      current.map((item, itemIndex) =>
        itemIndex === index
          ? { ...item, [field]: value }
          : item
      )
    );
  };

  const tabs: { id: Tab; label: string; description: string }[] = [
    {
      id: "profile",
      label: "Profile",
      description: "Personal information",
    },
    {
      id: "qualifications",
      label: "Qualifications",
      description: "Education & teaching",
    },
    {
      id: "availability",
      label: "Availability",
      description: "Teaching schedule",
    },
    {
      id: "documents",
      label: "Documents",
      description: "Verification documents",
    },
  ];

  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f8f7] text-[#111]">
      {/* Ambient 3D background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 25, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 13,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-[8%] top-[6%] h-72 w-72 rounded-full bg-[#42d4bc]/10 blur-[100px]"
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
          className="absolute bottom-[3%] right-[4%] h-96 w-96 rounded-full bg-cyan-100/40 blur-[110px]"
        />
      </div>

      <div className="relative mx-auto max-w-[1450px] px-4 py-5 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="tq-glass mb-6 flex flex-col gap-4 rounded-[26px] px-5 py-4 shadow-lg shadow-black/[0.03] sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex items-center gap-3">
            <Link
              href="/teacher/dashboard"
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-black text-white transition hover:-translate-y-0.5"
              aria-label="Back to teacher dashboard"
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
                Profile & Settings
              </p>
              <p className="mt-0.5 text-xs text-black/45">
                Manage your teaching profile and preferences
              </p>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {saved ? (
              <motion.div
                key="saved"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2 rounded-full bg-[#42d4bc]/10 px-4 py-2.5 text-xs font-black text-[#0b9079]"
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#42d4bc] text-black">
                  ✓
                </span>
                Changes saved
              </motion.div>
            ) : (
              <motion.div
                key="verified"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2 rounded-full bg-black/[0.04] px-4 py-2.5 text-xs font-black text-black/55"
              >
                <span className="h-2 w-2 rounded-full bg-[#42d4bc]" />
                Teacher account verified
              </motion.div>
            )}
          </AnimatePresence>
        </motion.header>

        <div className="grid gap-5 lg:grid-cols-[290px_minmax(0,1fr)]">
          {/* Sidebar */}
          <aside className="h-fit lg:sticky lg:top-5">
            <motion.div
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              className="tq-glass rounded-[28px] p-4 shadow-xl shadow-black/[0.03]"
            >
              {/* Profile preview */}
              <div className="rounded-[22px] bg-black p-5 text-white">
                <div className="flex items-center gap-3">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#42d4bc] text-lg font-black text-black">
                    RV
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-black">
                      {profile.firstName} {profile.lastName}
                    </p>
                    <p className="mt-1 text-[11px] text-white/45">
                      Mathematics Teacher
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.05] px-3 py-2.5">
                  <span className="text-[10px] font-bold text-white/40">
                    Teacher ID
                  </span>
                  <span className="font-mono text-[10px] font-black text-white/75">
                    TQ-TEA-00981
                  </span>
                </div>
              </div>

              <nav className="mt-4 space-y-1.5">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`group flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left transition ${
                      activeTab === tab.id
                        ? "bg-[#42d4bc]/10 text-[#087d6a]"
                        : "text-black/50 hover:bg-black/[0.035] hover:text-black"
                    }`}
                  >
                    <span
                      className={`flex h-9 w-9 items-center justify-center rounded-xl text-xs font-black ${
                        activeTab === tab.id
                          ? "bg-[#42d4bc] text-black"
                          : "bg-black/[0.04]"
                      }`}
                    >
                      {tab.id === "profile" && "01"}
                      {tab.id === "qualifications" && "02"}
                      {tab.id === "availability" && "03"}
                      {tab.id === "documents" && "04"}
                    </span>

                    <span className="min-w-0">
                      <span className="block text-xs font-black">
                        {tab.label}
                      </span>
                      <span className="mt-0.5 block text-[10px] text-black/30">
                        {tab.description}
                      </span>
                    </span>

                    <span className="ml-auto text-black/20 transition group-hover:translate-x-0.5">
                      →
                    </span>
                  </button>
                ))}
              </nav>

              <div className="mt-4 rounded-2xl border border-[#42d4bc]/15 bg-[#42d4bc]/6 p-4">
                <p className="text-xs font-black">Profile completion</p>

                <div className="mt-3 h-2 overflow-hidden rounded-full bg-black/[0.06]">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "92%" }}
                    transition={{ duration: 1 }}
                    className="h-full rounded-full bg-[#42d4bc]"
                  />
                </div>

                <div className="mt-2 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-black/35">
                    92% complete
                  </span>
                  <span className="text-[10px] font-black text-[#0b9079]">
                    Excellent
                  </span>
                </div>
              </div>
            </motion.div>
          </aside>

          {/* Main */}
          <section className="min-w-0">
            <AnimatePresence mode="wait">
              {/* PROFILE */}
              {activeTab === "profile" && (
                <motion.div
                  key="profile"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-5"
                >
                  <div className="tq-glass rounded-[28px] p-6 shadow-xl shadow-black/[0.03] sm:p-7">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-black/30">
                          Personal information
                        </p>
                        <h1 className="mt-2 text-3xl font-black tracking-[-0.04em]">
                          Your teacher profile
                        </h1>
                        <p className="mt-2 max-w-2xl text-sm leading-6 text-black/45">
                          Keep your profile accurate so students and
                          administrators can understand your teaching
                          experience.
                        </p>
                      </div>

                      <button
                        onClick={() => saveChanges()}
                        className="rounded-2xl bg-black px-5 py-3 text-xs font-black text-white transition hover:-translate-y-0.5 hover:bg-black/85"
                      >
                        Save Changes
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
                          onChange={(e) =>
                            setProfile({
                              ...profile,
                              firstName: e.target.value,
                            })
                          }
                          className="tq-input"
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-xs font-black">
                          Last name
                        </label>
                        <input
                          value={profile.lastName}
                          onChange={(e) =>
                            setProfile({
                              ...profile,
                              lastName: e.target.value,
                            })
                          }
                          className="tq-input"
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-xs font-black">
                          Email address
                        </label>
                        <input
                          type="email"
                          value={profile.email}
                          onChange={(e) =>
                            setProfile({
                              ...profile,
                              email: e.target.value,
                            })
                          }
                          className="tq-input"
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-xs font-black">
                          Phone number
                        </label>
                        <input
                          value={profile.phone}
                          onChange={(e) =>
                            setProfile({
                              ...profile,
                              phone: e.target.value,
                            })
                          }
                          className="tq-input"
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-xs font-black">
                          City
                        </label>
                        <input
                          value={profile.city}
                          onChange={(e) =>
                            setProfile({
                              ...profile,
                              city: e.target.value,
                            })
                          }
                          className="tq-input"
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-xs font-black">
                          Current school
                        </label>
                        <input
                          value={profile.school}
                          onChange={(e) =>
                            setProfile({
                              ...profile,
                              school: e.target.value,
                            })
                          }
                          className="tq-input"
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-xs font-black">
                          Teaching experience
                        </label>
                        <div className="relative">
                          <input
                            value={profile.experience}
                            onChange={(e) =>
                              setProfile({
                                ...profile,
                                experience: e.target.value,
                              })
                            }
                            className="tq-input pr-16"
                          />
                          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-black/30">
                            years
                          </span>
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label className="mb-2 block text-xs font-black">
                          Teacher bio
                        </label>
                        <textarea
                          rows={5}
                          value={profile.bio}
                          onChange={(e) =>
                            setProfile({
                              ...profile,
                              bio: e.target.value,
                            })
                          }
                          className="tq-input resize-none"
                        />
                        <p className="mt-2 text-[10px] text-black/35">
                          A clear bio helps parents and students understand
                          your teaching style.
                        </p>
                      </div>
                    </form>
                  </div>

                  <div className="grid gap-5 md:grid-cols-2">
                    <div className="tq-glass rounded-[26px] p-6 shadow-xl shadow-black/[0.03]">
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-black/30">
                        Teaching subjects
                      </p>

                      <h2 className="mt-2 text-xl font-black">
                        What do you teach?
                      </h2>

                      <div className="mt-5 flex flex-wrap gap-2">
                        {subjects.map((subject) => {
                          const selected =
                            selectedSubjects.includes(subject);

                          return (
                            <button
                              key={subject}
                              type="button"
                              onClick={() => toggleSubject(subject)}
                              className={`rounded-xl px-3.5 py-2.5 text-xs font-black transition ${
                                selected
                                  ? "bg-[#42d4bc] text-black"
                                  : "bg-black/[0.04] text-black/50 hover:bg-black/[0.07]"
                              }`}
                            >
                              {subject}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="tq-glass rounded-[26px] p-6 shadow-xl shadow-black/[0.03]">
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-black/30">
                        Preferred classes
                      </p>

                      <h2 className="mt-2 text-xl font-black">
                        Classes you teach
                      </h2>

                      <div className="mt-5 grid grid-cols-5 gap-2">
                        {classes.map((value) => {
                          const selected = selectedClasses.includes(value);

                          return (
                            <button
                              key={value}
                              type="button"
                              onClick={() => toggleClass(value)}
                              className={`rounded-xl px-2 py-3 text-xs font-black transition ${
                                selected
                                  ? "bg-black text-white"
                                  : "bg-black/[0.04] text-black/45 hover:bg-black/[0.07]"
                              }`}
                            >
                              Class {value}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* QUALIFICATIONS */}
              {activeTab === "qualifications" && (
                <motion.div
                  key="qualifications"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-5"
                >
                  <div className="tq-glass rounded-[28px] p-6 shadow-xl shadow-black/[0.03] sm:p-7">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-black/30">
                          Qualifications
                        </p>

                        <h1 className="mt-2 text-3xl font-black tracking-[-0.04em]">
                          Education & teaching
                        </h1>

                        <p className="mt-2 max-w-2xl text-sm leading-6 text-black/45">
                          These details are used to build your verified
                          TutorsQue teacher profile.
                        </p>
                      </div>

                      <button
                        onClick={() => saveChanges()}
                        className="rounded-2xl bg-black px-5 py-3 text-xs font-black text-white transition hover:-translate-y-0.5"
                      >
                        Save Changes
                      </button>
                    </div>

                    <div className="mt-8 grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-xs font-black">
                          Highest qualification
                        </label>
                        <input
                          value={qualifications.highestQualification}
                          onChange={(e) =>
                            setQualifications({
                              ...qualifications,
                              highestQualification: e.target.value,
                            })
                          }
                          className="tq-input"
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-xs font-black">
                          University / Institution
                        </label>
                        <input
                          value={qualifications.university}
                          onChange={(e) =>
                            setQualifications({
                              ...qualifications,
                              university: e.target.value,
                            })
                          }
                          className="tq-input"
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-xs font-black">
                          Graduation year
                        </label>
                        <input
                          value={qualifications.graduationYear}
                          onChange={(e) =>
                            setQualifications({
                              ...qualifications,
                              graduationYear: e.target.value,
                            })
                          }
                          className="tq-input"
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-xs font-black">
                          Teaching board
                        </label>
                        <select
                          value={qualifications.board}
                          onChange={(e) =>
                            setQualifications({
                              ...qualifications,
                              board: e.target.value,
                            })
                          }
                          className="tq-input appearance-none"
                        >
                          <option>AP State Board</option>
                          <option>CBSE</option>
                        </select>
                      </div>

                      <div className="sm:col-span-2">
                        <label className="mb-2 block text-xs font-black">
                          Teaching approach
                        </label>

                        <textarea
                          rows={4}
                          value={qualifications.teachingApproach}
                          onChange={(e) =>
                            setQualifications({
                              ...qualifications,
                              teachingApproach: e.target.value,
                            })
                          }
                          className="tq-input resize-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-5 md:grid-cols-3">
                    {[
                      {
                        title: "Qualification verified",
                        detail: "Education credentials approved",
                        icon: "✓",
                      },
                      {
                        title: "Experience verified",
                        detail: "Teaching experience approved",
                        icon: "↗",
                      },
                      {
                        title: "Board mapped",
                        detail: `${qualifications.board} curriculum`,
                        icon: "◉",
                      },
                    ].map((item, index) => (
                      <motion.div
                        key={item.title}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.06 }}
                        className="tq-glass rounded-[24px] p-5 shadow-lg shadow-black/[0.025]"
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#42d4bc]/10 text-sm font-black text-[#0b9079]">
                          {item.icon}
                        </div>

                        <p className="mt-4 text-sm font-black">
                          {item.title}
                        </p>

                        <p className="mt-1 text-xs leading-5 text-black/40">
                          {item.detail}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* AVAILABILITY */}
              {activeTab === "availability" && (
                <motion.div
                  key="availability"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-5"
                >
                  <div className="tq-glass rounded-[28px] p-6 shadow-xl shadow-black/[0.03] sm:p-7">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-black/30">
                          Availability
                        </p>

                        <h1 className="mt-2 text-3xl font-black tracking-[-0.04em]">
                          Your teaching schedule
                        </h1>

                        <p className="mt-2 max-w-2xl text-sm leading-6 text-black/45">
                          Set the hours during which TutorsQue can assign
                          online classes to you.
                        </p>
                      </div>

                      <button
                        onClick={() => saveChanges()}
                        className="rounded-2xl bg-black px-5 py-3 text-xs font-black text-white transition hover:-translate-y-0.5"
                      >
                        Save Schedule
                      </button>
                    </div>

                    <div className="mt-8 space-y-3">
                      {availability.map((item, index) => (
                        <motion.div
                          key={item.day}
                          layout
                          className="rounded-2xl bg-black/[0.025] p-4"
                        >
                          <div className="grid gap-3 sm:grid-cols-[170px_100px_1fr_1fr] sm:items-center">
                            <div>
                              <p className="text-sm font-black">
                                {item.day}
                              </p>

                              <p className="mt-1 text-[10px] text-black/35">
                                {item.enabled
                                  ? "Available for classes"
                                  : "Unavailable"}
                              </p>
                            </div>

                            <button
                              type="button"
                              onClick={() => toggleAvailability(index)}
                              className={`relative h-7 w-12 rounded-full transition ${
                                item.enabled
                                  ? "bg-[#42d4bc]"
                                  : "bg-black/[0.12]"
                              }`}
                              aria-label={`Toggle ${item.day}`}
                            >
                              <span
                                className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition ${
                                  item.enabled
                                    ? "left-6"
                                    : "left-1"
                                }`}
                              />
                            </button>

                            <div>
                              <label className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-black/30">
                                From
                              </label>
                              <select
                                value={item.from}
                                disabled={!item.enabled}
                                onChange={(e) =>
                                  updateAvailabilityTime(
                                    index,
                                    "from",
                                    e.target.value
                                  )
                                }
                                className="w-full rounded-xl border border-black/[0.06] bg-white/60 px-3 py-2.5 text-xs font-bold outline-none disabled:opacity-40"
                              >
                                {[
                                  "8:00 AM",
                                  "9:00 AM",
                                  "10:00 AM",
                                  "11:00 AM",
                                  "4:00 PM",
                                  "5:00 PM",
                                  "6:00 PM",
                                  "7:00 PM",
                                ].map((time) => (
                                  <option key={time}>{time}</option>
                                ))}
                              </select>
                            </div>

                            <div>
                              <label className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-black/30">
                                To
                              </label>
                              <select
                                value={item.to}
                                disabled={!item.enabled}
                                onChange={(e) =>
                                  updateAvailabilityTime(
                                    index,
                                    "to",
                                    e.target.value
                                  )
                                }
                                className="w-full rounded-xl border border-black/[0.06] bg-white/60 px-3 py-2.5 text-xs font-bold outline-none disabled:opacity-40"
                              >
                                {[
                                  "12:00 PM",
                                  "1:00 PM",
                                  "2:00 PM",
                                  "6:00 PM",
                                  "7:00 PM",
                                  "8:00 PM",
                                  "9:00 PM",
                                  "10:00 PM",
                                ].map((time) => (
                                  <option key={time}>{time}</option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-[26px] border border-[#42d4bc]/15 bg-[#42d4bc]/6 p-5">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#42d4bc]/15 text-[#0b9079]">
                        <svg
                          viewBox="0 0 24 24"
                          className="h-5 w-5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                        >
                          <circle cx="12" cy="12" r="9" />
                          <path
                            strokeLinecap="round"
                            d="M12 7v5l3 2"
                          />
                        </svg>
                      </div>

                      <div>
                        <p className="text-sm font-black">
                          Smart scheduling
                        </p>

                        <p className="mt-1 text-xs leading-5 text-black/50">
                          TutorsQue will use your availability when assigning
                          future batches and live classes.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* DOCUMENTS */}
              {activeTab === "documents" && (
                <motion.div
                  key="documents"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-5"
                >
                  <div className="tq-glass rounded-[28px] p-6 shadow-xl shadow-black/[0.03] sm:p-7">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-black/30">
                          Verification documents
                        </p>

                        <h1 className="mt-2 text-3xl font-black tracking-[-0.04em]">
                          Your documents
                        </h1>

                        <p className="mt-2 max-w-2xl text-sm leading-6 text-black/45">
                          Documents submitted during your teacher application
                          are shown here.
                        </p>
                      </div>

                      <button
                        onClick={() => saveChanges()}
                        className="rounded-2xl bg-black px-5 py-3 text-xs font-black text-white transition hover:-translate-y-0.5"
                      >
                        Upload Document
                      </button>
                    </div>

                    <div className="mt-8 space-y-3">
                      {documents.map((document, index) => (
                        <motion.div
                          key={document.name}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.06 }}
                          className="flex flex-col gap-4 rounded-2xl bg-black/[0.025] p-4 sm:flex-row sm:items-center sm:justify-between"
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-black text-[10px] font-black text-white">
                              {document.type}
                            </div>

                            <div>
                              <p className="text-sm font-black">
                                {document.name}
                              </p>

                              <p className="mt-1 text-[10px] text-black/35">
                                {document.size} • Uploaded during
                                verification
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="rounded-full bg-[#42d4bc]/10 px-3 py-1.5 text-[10px] font-black text-[#0b9079]">
                              ✓ {document.status}
                            </span>

                            <button className="rounded-xl bg-black/[0.05] px-3 py-2 text-[10px] font-black transition hover:bg-black/[0.08]">
                              View
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div className="grid gap-5 md:grid-cols-2">
                    <div className="tq-glass rounded-[25px] p-6 shadow-lg shadow-black/[0.025]">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#42d4bc]/10 text-[#0b9079]">
                        ✓
                      </div>

                      <p className="mt-4 text-sm font-black">
                        Verification complete
                      </p>

                      <p className="mt-1 text-xs leading-5 text-black/40">
                        Your required documents have been successfully
                        verified.
                      </p>
                    </div>

                    <div className="tq-glass rounded-[25px] p-6 shadow-lg shadow-black/[0.025]">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black/[0.04] text-black/60">
                        +
                      </div>

                      <p className="mt-4 text-sm font-black">
                        Add new credentials
                      </p>

                      <p className="mt-1 text-xs leading-5 text-black/40">
                        Upload additional certificates or teaching credentials
                        to strengthen your profile.
                      </p>
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
            background 180ms ease;
        }

        .tq-input::placeholder {
          color: rgba(0, 0, 0, 0.25);
        }

        .tq-input:focus {
          border-color: rgba(66, 212, 188, 0.55);
          background: rgba(255, 255, 255, 0.85);
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