"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Activity,
  Bell,
  Camera,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Edit3,
  KeyRound,
  LockKeyhole,
  LogOut,
  Mail,
  Phone,
  Save,
  ShieldCheck,
  Smartphone,
  User,
  X,
} from "lucide-react";

type Tab = "profile" | "security" | "sessions" | "preferences";

type Session = {
  id: string;
  device: string;
  browser: string;
  location: string;
  lastActive: string;
  current: boolean;
};

const sessions: Session[] = [
  {
    id: "SES-001",
    device: "Windows Desktop",
    browser: "Chrome",
    location: "India",
    lastActive: "Active now",
    current: true,
  },
  {
    id: "SES-002",
    device: "Android Phone",
    browser: "Chrome Mobile",
    location: "India",
    lastActive: "18 min ago",
    current: false,
  },
  {
    id: "SES-003",
    device: "MacBook",
    browser: "Safari",
    location: "India",
    lastActive: "2 hrs ago",
    current: false,
  },
];

function Toggle({
  value,
  onChange,
}: {
  value: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!value)}
      className={`relative h-7 w-12 rounded-full p-1 transition ${
        value ? "bg-black" : "bg-black/10"
      }`}
      aria-pressed={value}
    >
      <span
        className={`block h-5 w-5 rounded-full bg-white shadow transition-transform ${
          value ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
}

function InputField({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  disabled = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-bold text-black/45">
        {label}
      </span>

      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full rounded-2xl border px-4 py-3 text-sm font-semibold outline-none transition ${
          disabled
            ? "border-black/5 bg-black/[0.025] text-black/35"
            : "border-black/8 bg-white focus:border-[#42d4bc] focus:ring-4 focus:ring-[#42d4bc]/10"
        }`}
      />
    </label>
  );
}

export default function AdminProfilePage() {
  const [activeTab, setActiveTab] = useState<Tab>("profile");

  const [saved, setSaved] = useState(false);

  const [name, setName] = useState("Vara");
  const [email, setEmail] = useState("admin@tutorsque.com");
  const [phone, setPhone] = useState("+91 90000 00000");
  const [jobTitle, setJobTitle] = useState("Super Administrator");
  const [department, setDepartment] = useState("Platform Operations");

  const [twoFactor, setTwoFactor] = useState(true);
  const [loginAlerts, setLoginAlerts] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [weeklyReports, setWeeklyReports] = useState(true);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const saveChanges = () => {
    setSaved(true);

    window.setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  const passwordUpdate = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      return;
    }

    if (newPassword !== confirmPassword) {
      return;
    }

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setSaved(true);

    window.setTimeout(() => {
      setSaved(false);
    }, 2500);
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
                My Account
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
              href="/admin/settings"
              className="rounded-xl px-3 py-2 text-sm font-semibold text-black/50 transition hover:bg-black/5 hover:text-black"
            >
              Settings
            </Link>

            <Link
              href="/admin/audit-logs"
              className="rounded-xl px-3 py-2 text-sm font-semibold text-black/50 transition hover:bg-black/5 hover:text-black"
            >
              Audit Logs
            </Link>

            <Link
              href="/admin/system"
              className="rounded-xl px-3 py-2 text-sm font-semibold text-black/50 transition hover:bg-black/5 hover:text-black"
            >
              System
            </Link>
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-[1250px] px-5 py-8 lg:px-8">
        {/* HERO */}
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#42d4bc]/20 bg-[#42d4bc]/10 px-3 py-1.5 text-[11px] font-black tracking-wide text-[#159e8b]">
            <User size={13} />
            ADMIN ACCOUNT
          </div>

          <h2 className="max-w-4xl text-3xl font-black leading-[1.04] tracking-[-0.045em] sm:text-4xl lg:text-5xl">
            Your
            <span className="text-[#159e8b]"> control identity.</span>
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-black/50">
            Manage your administrator profile, authentication, active sessions
            and personal notification preferences.
          </p>
        </motion.section>

        {/* PROFILE HEADER CARD */}
        <section className="relative overflow-hidden rounded-[30px] border border-black/5 bg-black p-6 !text-white shadow-xl">
          <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-[#42d4bc]/10 blur-[90px]" />

          <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="flex h-20 w-20 items-center justify-center rounded-[25px] bg-[#42d4bc]/10 text-2xl font-black text-[#42d4bc] ring-1 ring-[#42d4bc]/20">
                  VA
                </div>

                <button
                  type="button"
                  className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-xl bg-white !text-black shadow-lg"
                >
                  <Camera size={14} />
                </button>
              </div>

              <div>
                <p className="text-2xl font-black !text-white">{name}</p>

                <p className="mt-1 text-sm !text-white/50">
                  {jobTitle}
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="rounded-full bg-[#42d4bc]/10 px-3 py-1.5 text-xs font-bold text-[#42d4bc]">
                    Super Admin
                  </span>

                  <span className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold !text-white/60">
                    {department}
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-white/6 p-4 sm:min-w-[230px]">
              <p className="text-[11px] font-bold uppercase tracking-[0.13em] !text-white/35">
                Account status
              </p>

              <div className="mt-2 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,.7)]" />
                <span className="text-sm font-bold !text-white">
                  Active
                </span>
              </div>

              <p className="mt-1 text-xs !text-white/35">
                Last login · Just now
              </p>
            </div>
          </div>
        </section>

        {/* ACCOUNT CONTENT */}
        <section className="mt-6 grid gap-6 lg:grid-cols-[250px_1fr]">
          {/* SIDEBAR */}
          <aside className="self-start rounded-[28px] border border-black/5 bg-white/75 p-3 shadow-sm tq-glass lg:sticky lg:top-24">
            {[
              {
                id: "profile" as Tab,
                label: "Profile",
                description: "Personal information",
                icon: <User size={18} />,
              },
              {
                id: "security" as Tab,
                label: "Security",
                description: "Password & authentication",
                icon: <ShieldCheck size={18} />,
              },
              {
                id: "sessions" as Tab,
                label: "Sessions",
                description: "Active devices",
                icon: <Smartphone size={18} />,
              },
              {
                id: "preferences" as Tab,
                label: "Preferences",
                description: "Notifications",
                icon: <Bell size={18} />,
              },
            ].map((item) => {
              const active = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(item.id)}
                  className={`mb-1 flex w-full items-center gap-3 rounded-2xl p-3 text-left transition last:mb-0 ${
                    active
                      ? "bg-black !text-white shadow-lg"
                      : "text-black/55 hover:bg-black/[0.035] hover:text-black"
                  }`}
                >
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                      active
                        ? "bg-[#42d4bc]/10 text-[#42d4bc]"
                        : "bg-black/5 text-black/40"
                    }`}
                  >
                    {item.icon}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p
                      className={`text-sm font-bold ${
                        active ? "!text-white" : ""
                      }`}
                    >
                      {item.label}
                    </p>

                    <p
                      className={`mt-0.5 truncate text-xs ${
                        active
                          ? "!text-white/40"
                          : "text-black/35"
                      }`}
                    >
                      {item.description}
                    </p>
                  </div>

                  <ChevronRight
                    size={15}
                    className={
                      active
                        ? "text-[#42d4bc]"
                        : "text-black/20"
                    }
                  />
                </button>
              );
            })}

            <div className="my-3 border-t border-black/5" />

            <Link
              href="/admin/dashboard"
              className="flex items-center gap-3 rounded-2xl p-3 text-sm font-bold text-black/50 transition hover:bg-black/5 hover:text-black"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black/5">
                <ChevronRight size={17} className="rotate-180" />
              </div>

              Back to Dashboard
            </Link>
          </aside>

          {/* MAIN */}
          <div className="min-w-0">
            {/* PROFILE */}
            {activeTab === "profile" && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-[30px] border border-black/5 bg-white/80 p-5 shadow-sm tq-glass sm:p-7"
              >
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                  <div>
                    <p className="text-[11px] font-black uppercase tracking-[0.16em] text-[#159e8b]">
                      Profile Information
                    </p>

                    <h3 className="mt-1 text-2xl font-black">
                      Personal details
                    </h3>

                    <p className="mt-1 text-sm text-black/45">
                      Keep your administrator profile information up to date.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={saveChanges}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-black px-5 py-3 text-sm font-bold !text-white shadow-lg"
                  >
                    <Save size={16} />
                    Save Changes
                  </button>
                </div>

                <div className="mt-7 grid gap-4 md:grid-cols-2">
                  <InputField
                    label="Full Name"
                    value={name}
                    onChange={setName}
                  />

                  <InputField
                    label="Job Title"
                    value={jobTitle}
                    onChange={setJobTitle}
                  />

                  <InputField
                    label="Email Address"
                    value={email}
                    onChange={setEmail}
                    type="email"
                  />

                  <InputField
                    label="Phone Number"
                    value={phone}
                    onChange={setPhone}
                    type="tel"
                  />

                  <InputField
                    label="Department"
                    value={department}
                    onChange={setDepartment}
                  />

                  <InputField
                    label="Account Role"
                    value="Super Admin"
                    onChange={() => {}}
                    disabled
                  />
                </div>

                <div className="mt-6 rounded-[25px] bg-black p-5 !text-white">
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#42d4bc]/10 text-[#42d4bc]">
                      <ShieldCheck size={20} />
                    </div>

                    <div>
                      <p className="font-black !text-white">
                        Maximum platform access
                      </p>

                      <p className="mt-1 text-sm leading-6 !text-white/50">
                        Super Admin access includes platform operations,
                        finance, users, teachers, settings and security
                        controls.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* SECURITY */}
            {activeTab === "security" && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-5"
              >
                <div className="rounded-[30px] border border-black/5 bg-white/80 p-5 shadow-sm tq-glass sm:p-7">
                  <div>
                    <p className="text-[11px] font-black uppercase tracking-[0.16em] text-[#159e8b]">
                      Authentication
                    </p>

                    <h3 className="mt-1 text-2xl font-black">
                      Password & security
                    </h3>
                  </div>

                  <div className="mt-7 space-y-4">
                    <PasswordField
                      label="Current Password"
                      value={currentPassword}
                      onChange={setCurrentPassword}
                      visible
                    />

                    <PasswordField
                      label="New Password"
                      value={newPassword}
                      onChange={setNewPassword}
                      visible
                    />

                    <PasswordField
                      label="Confirm New Password"
                      value={confirmPassword}
                      onChange={setConfirmPassword}
                      visible={showConfirm}
                      onToggle={() => setShowConfirm(!showConfirm)}
                    />
                  </div>

                  <div className="mt-5 flex justify-end">
                    <button
                      type="button"
                      onClick={passwordUpdate}
                      className="inline-flex items-center justify-center gap-2 rounded-2xl bg-black px-5 py-3 text-sm font-bold !text-white"
                    >
                      <KeyRound size={16} />
                      Update Password
                    </button>
                  </div>
                </div>

                <div className="rounded-[30px] border border-black/5 bg-white/80 p-5 shadow-sm tq-glass sm:p-7">
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#42d4bc]/10 text-[#159e8b]">
                      <ShieldCheck size={20} />
                    </div>

                    <div className="flex-1">
                      <p className="font-black">
                        Two-factor authentication
                      </p>

                      <p className="mt-1 text-sm leading-6 text-black/45">
                        Add an additional verification step when signing into
                        your administrator account.
                      </p>
                    </div>

                    <Toggle
                      value={twoFactor}
                      onChange={setTwoFactor}
                    />
                  </div>

                  <div className="mt-5 border-t border-black/5 pt-5">
                    <div className="flex items-start gap-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-black/5 text-black/50">
                        <LockKeyhole size={20} />
                      </div>

                      <div className="flex-1">
                        <p className="font-black">
                          Login alerts
                        </p>

                        <p className="mt-1 text-sm leading-6 text-black/45">
                          Receive an alert when your administrator account is
                          accessed from a new device.
                        </p>
                      </div>

                      <Toggle
                        value={loginAlerts}
                        onChange={setLoginAlerts}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* SESSIONS */}
            {activeTab === "sessions" && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-[30px] border border-black/5 bg-white/80 p-5 shadow-sm tq-glass sm:p-7"
              >
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                  <div>
                    <p className="text-[11px] font-black uppercase tracking-[0.16em] text-[#159e8b]">
                      Active Sessions
                    </p>

                    <h3 className="mt-1 text-2xl font-black">
                      Devices & sessions
                    </h3>

                    <p className="mt-1 text-sm text-black/45">
                      Review where your administrator account is currently
                      active.
                    </p>
                  </div>

                  <button
                    type="button"
                    className="rounded-2xl border border-red-200 bg-red-500/5 px-4 py-3 text-sm font-bold text-red-700"
                  >
                    Sign out all other sessions
                  </button>
                </div>

                <div className="mt-7 space-y-3">
                  {sessions.map((session) => (
                    <div
                      key={session.id}
                      className="flex flex-col gap-4 rounded-[24px] border border-black/5 bg-white p-5 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#42d4bc]/10 text-[#159e8b]">
                          <Smartphone size={19} />
                        </div>

                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <p className="text-sm font-black">
                              {session.device}
                            </p>

                            {session.current && (
                              <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-[10px] font-black text-emerald-700">
                                Current
                              </span>
                            )}
                          </div>

                          <p className="mt-0.5 text-xs text-black/40">
                            {session.browser} · {session.location}
                          </p>

                          <p className="mt-1 flex items-center gap-1 text-xs text-black/35">
                            <Clock3 size={11} />
                            {session.lastActive}
                          </p>
                        </div>
                      </div>

                      {!session.current && (
                        <button
                          type="button"
                          className="rounded-xl border border-red-200 px-4 py-2.5 text-xs font-bold text-red-700"
                        >
                          Sign Out
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-5 rounded-[24px] bg-black p-5 !text-white">
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#42d4bc]/10 text-[#42d4bc]">
                      <Activity size={20} />
                    </div>

                    <div>
                      <p className="font-black !text-white">
                        Session protection
                      </p>

                      <p className="mt-1 text-sm leading-6 !text-white/50">
                        Production sessions should use secure HTTP-only cookies,
                        server-side validation and automatic expiry.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* PREFERENCES */}
            {activeTab === "preferences" && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-[30px] border border-black/5 bg-white/80 p-5 shadow-sm tq-glass sm:p-7"
              >
                <div>
                  <p className="text-[11px] font-black uppercase tracking-[0.16em] text-[#159e8b]">
                    Personal Preferences
                  </p>

                  <h3 className="mt-1 text-2xl font-black">
                    Notification preferences
                  </h3>

                  <p className="mt-1 text-sm text-black/45">
                    Choose which administrator notifications you receive.
                  </p>
                </div>

                <div className="mt-6 rounded-[24px] border border-black/5 bg-black/[0.018] px-5">
                  <PreferenceRow
                    icon={<Mail size={18} />}
                    title="Email Notifications"
                    description="Receive important platform events and account alerts by email."
                    value={emailNotifications}
                    onChange={setEmailNotifications}
                  />

                  <PreferenceRow
                    icon={<Smartphone size={18} />}
                    title="Push Notifications"
                    description="Receive real-time alerts on supported devices."
                    value={pushNotifications}
                    onChange={setPushNotifications}
                  />

                  <PreferenceRow
                    icon={<Activity size={18} />}
                    title="Weekly Reports"
                    description="Receive a weekly summary of platform activity and finance."
                    value={weeklyReports}
                    onChange={setWeeklyReports}
                  />
                </div>

                <div className="mt-5 rounded-[24px] bg-[#42d4bc]/8 p-5">
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#42d4bc]/10 text-[#159e8b]">
                      <Bell size={19} />
                    </div>

                    <div>
                      <p className="font-black">
                        Critical alerts stay active
                      </p>

                      <p className="mt-1 text-sm leading-6 text-black/50">
                        Security and account-critical events may still be
                        delivered even when optional notifications are disabled.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex justify-end">
                  <button
                    type="button"
                    onClick={saveChanges}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-black px-5 py-3 text-sm font-bold !text-white"
                  >
                    <Save size={16} />
                    Save Preferences
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </section>

        {/* ACCOUNT FOOTER */}
        <section className="mt-6 rounded-[28px] border border-red-100 bg-red-500/[0.035] p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-black text-red-800">Account actions</p>

              <p className="mt-1 text-sm leading-6 text-red-700/55">
                Signing out will end the current administrator session.
              </p>
            </div>

            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-red-200 bg-white px-5 py-3 text-sm font-bold text-red-700 transition hover:bg-red-50"
            >
              <LogOut size={16} />
              Sign Out
            </button>
          </div>
        </section>
      </div>

      {/* SAVED TOAST */}
      {saved && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl bg-black px-5 py-4 shadow-2xl !text-white"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#42d4bc]/10 text-[#42d4bc]">
            <CheckCircle2 size={17} />
          </div>

          <div>
            <p className="text-sm font-black !text-white">
              Changes saved
            </p>

            <p className="text-xs !text-white/45">
              Your account settings were updated.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setSaved(false)}
            className="ml-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 !text-white/60 hover:bg-white/10 hover:!text-white"
          >
            <X size={15} />
          </button>
        </motion.div>
      )}
    </main>
  );
}

function PasswordField({
  label,
  value,
  onChange,
  visible,
  onToggle,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  visible: boolean;
  onToggle?: () => void;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-bold text-black/45">
        {label}
      </span>

      <div className="relative">
        <input
          type={visible ? "text" : "password"}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="w-full rounded-2xl border border-black/8 bg-white px-4 py-3 pr-20 text-sm font-semibold outline-none transition focus:border-[#42d4bc] focus:ring-4 focus:ring-[#42d4bc]/10"
        />

        {onToggle && (
          <button
            type="button"
            onClick={onToggle}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg px-2 py-1 text-xs font-bold text-black/40 hover:text-black"
          >
            {visible ? "Hide" : "Show"}
          </button>
        )}
      </div>
    </label>
  );
}

function PreferenceRow({
  icon,
  title,
  description,
  value,
  onChange,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  value: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="flex flex-col gap-4 border-b border-black/5 py-5 last:border-0 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#42d4bc]/10 text-[#159e8b]">
          {icon}
        </div>

        <div>
          <p className="text-sm font-black">{title}</p>

          <p className="mt-1 max-w-xl text-xs leading-5 text-black/45">
            {description}
          </p>
        </div>
      </div>

      <Toggle value={value} onChange={onChange} />
    </div>
  );
}