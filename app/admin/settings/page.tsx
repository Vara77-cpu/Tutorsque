"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Bell,
  Building2,
  CheckCircle2,
  ChevronRight,
  CreditCard,
  Database,
  Globe2,
  LockKeyhole,
  Mail,
  Save,
  Settings2,
  ShieldCheck,
  WalletCards,
  X,
} from "lucide-react";

type Section =
  | "general"
  | "payments"
  | "notifications"
  | "security"
  | "platform";

const sectionItems: {
  id: Section;
  label: string;
  description: string;
  icon: React.ReactNode;
}[] = [
  {
    id: "general",
    label: "General",
    description: "Brand and platform information",
    icon: <Building2 size={18} />,
  },
  {
    id: "payments",
    label: "Payments",
    description: "Plans, fees and payout rules",
    icon: <CreditCard size={18} />,
  },
  {
    id: "notifications",
    label: "Notifications",
    description: "Email and system alerts",
    icon: <Bell size={18} />,
  },
  {
    id: "security",
    label: "Security",
    description: "Access and protection",
    icon: <ShieldCheck size={18} />,
  },
  {
    id: "platform",
    label: "Platform",
    description: "Operational configuration",
    icon: <Settings2 size={18} />,
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

function SettingRow({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 border-b border-black/5 py-5 last:border-0 sm:flex-row sm:items-center sm:justify-between">
      <div className="max-w-xl">
        <p className="text-sm font-black">{title}</p>
        <p className="mt-1 text-xs leading-5 text-black/45">{description}</p>
      </div>

      <div className="shrink-0">{children}</div>
    </div>
  );
}

function InputField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
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
        className="w-full rounded-2xl border border-black/8 bg-white px-4 py-3 text-sm font-semibold outline-none transition focus:border-[#42d4bc] focus:ring-4 focus:ring-[#42d4bc]/10"
      />
    </label>
  );
}

export default function AdminSettingsPage() {
  const [activeSection, setActiveSection] = useState<Section>("general");

  const [saved, setSaved] = useState(false);

  const [platformName, setPlatformName] = useState("TutorsQue");
  const [supportEmail, setSupportEmail] = useState("support@tutorsque.com");
  const [supportPhone, setSupportPhone] = useState("+91 90000 00000");
  const [timezone, setTimezone] = useState("Asia/Kolkata");

  const [razorpayEnabled, setRazorpayEnabled] = useState(true);
  const [upiEnabled, setUpiEnabled] = useState(true);
  const [cardEnabled, setCardEnabled] = useState(true);
  const [autoRefundEnabled, setAutoRefundEnabled] = useState(false);
  const [weeklyPayoutEnabled, setWeeklyPayoutEnabled] = useState(true);

  const [studentPaymentEmail, setStudentPaymentEmail] = useState(true);
  const [teacherPayoutEmail, setTeacherPayoutEmail] = useState(true);
  const [newEnrollmentAlert, setNewEnrollmentAlert] = useState(true);
  const [failedPaymentAlert, setFailedPaymentAlert] = useState(true);

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [adminLoginAlerts, setAdminLoginAlerts] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState("60");

  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [studentRegistration, setStudentRegistration] = useState(true);
  const [teacherApplications, setTeacherApplications] = useState(true);
  const [liveClasses, setLiveClasses] = useState(true);

  const [standardPlan, setStandardPlan] = useState("1999");
  const [premiumPlan, setPremiumPlan] = useState("2499");
  const [quarterlyPlan, setQuarterlyPlan] = useState("6499");
  const [teacherPayoutDay, setTeacherPayoutDay] = useState("Sunday");

  const saveSettings = () => {
    setSaved(true);

    window.setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  const activeItem = sectionItems.find(
    (item) => item.id === activeSection
  );

  return (
    <main className="min-h-screen bg-[#f7f8f7] text-[#111]">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[7%] top-[8%] h-80 w-80 rounded-full bg-[#42d4bc]/10 blur-[110px]" />
        <div className="absolute right-[2%] top-[25%] h-96 w-96 rounded-full bg-cyan-300/10 blur-[120px]" />
        <div className="absolute bottom-[5%] left-[35%] h-80 w-80 rounded-full bg-emerald-200/10 blur-[115px]" />
      </div>

      {/* HEADER */}
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
                Operations & Settings
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
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-[1500px] px-5 py-8 lg:px-8">
        {/* HERO */}
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#42d4bc]/20 bg-[#42d4bc]/10 px-3 py-1.5 text-[11px] font-black tracking-wide text-[#159e8b]">
            <Settings2 size={13} />
            ADMIN CONTROL CENTER
          </div>

          <h2 className="max-w-4xl text-3xl font-black leading-[1.04] tracking-[-0.045em] sm:text-4xl lg:text-5xl">
            Everything behind
            <span className="text-[#159e8b]"> TutorsQue.</span>
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-black/50">
            Control your education platform, payment operations, notifications,
            security and day-to-day business configuration.
          </p>
        </motion.section>

        {/* SETTINGS LAYOUT */}
        <div className="grid gap-6 lg:grid-cols-[285px_1fr]">
          {/* SIDEBAR */}
          <aside className="self-start rounded-[28px] border border-black/5 bg-white/75 p-3 shadow-sm tq-glass lg:sticky lg:top-24">
            <div className="mb-3 rounded-2xl bg-black p-4 !text-white">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#42d4bc]/10 text-[#42d4bc]">
                  <Settings2 size={19} />
                </div>

                <div>
                  <p className="text-sm font-black !text-white">
                    Platform Control
                  </p>
                  <p className="text-xs !text-white/45">
                    Administrator access
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-1">
              {sectionItems.map((item) => {
                const active = activeSection === item.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveSection(item.id)}
                    className={`group flex w-full items-center gap-3 rounded-2xl p-3 text-left transition ${
                      active
                        ? "bg-black !text-white shadow-lg shadow-black/10"
                        : "text-black/60 hover:bg-black/[0.035] hover:text-black"
                    }`}
                  >
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                        active
                          ? "bg-[#42d4bc]/10 text-[#42d4bc]"
                          : "bg-black/5 text-black/45"
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
                          active ? "!text-white/45" : "text-black/35"
                        }`}
                      >
                        {item.description}
                      </p>
                    </div>

                    <ChevronRight
                      size={15}
                      className={
                        active ? "text-[#42d4bc]" : "text-black/20"
                      }
                    />
                  </button>
                );
              })}
            </div>
          </aside>

          {/* CONTENT */}
          <section className="min-w-0">
            <div className="rounded-[30px] border border-black/5 bg-white/80 p-5 shadow-sm tq-glass sm:p-7">
              <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                <div>
                  <p className="text-[11px] font-black uppercase tracking-[0.16em] text-[#159e8b]">
                    Settings
                  </p>

                  <h3 className="mt-1 text-2xl font-black">
                    {activeItem?.label}
                  </h3>

                  <p className="mt-1 text-sm text-black/45">
                    {activeItem?.description}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={saveSettings}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-black px-5 py-3 text-sm font-bold !text-white shadow-lg shadow-black/10 transition hover:-translate-y-0.5"
                >
                  <Save size={16} />
                  Save Changes
                </button>
              </div>

              {/* GENERAL */}
              {activeSection === "general" && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <div className="grid gap-4 md:grid-cols-2">
                    <InputField
                      label="Platform Name"
                      value={platformName}
                      onChange={setPlatformName}
                    />

                    <InputField
                      label="Support Email"
                      value={supportEmail}
                      onChange={setSupportEmail}
                      type="email"
                    />

                    <InputField
                      label="Support Phone"
                      value={supportPhone}
                      onChange={setSupportPhone}
                    />

                    <label className="block">
                      <span className="mb-2 block text-xs font-bold text-black/45">
                        Timezone
                      </span>

                      <select
                        value={timezone}
                        onChange={(event) => setTimezone(event.target.value)}
                        className="w-full rounded-2xl border border-black/8 bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-[#42d4bc]"
                      >
                        <option value="Asia/Kolkata">Asia/Kolkata</option>
                        <option value="Asia/Dubai">Asia/Dubai</option>
                        <option value="Asia/Singapore">Asia/Singapore</option>
                        <option value="UTC">UTC</option>
                      </select>
                    </label>
                  </div>

                  <div className="rounded-[24px] bg-black p-5 !text-white">
                    <div className="flex items-start gap-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#42d4bc]/10 text-[#42d4bc]">
                        <Globe2 size={20} />
                      </div>

                      <div>
                        <p className="font-black !text-white">
                          Regional Configuration
                        </p>

                        <p className="mt-1 text-sm leading-6 !text-white/50">
                          TutorsQue is configured for India-first operations,
                          including INR payments and Asia/Kolkata scheduling.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* PAYMENTS */}
              {activeSection === "payments" && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="grid gap-4 md:grid-cols-3">
                    <InputField
                      label="Standard Monthly Plan"
                      value={standardPlan}
                      onChange={setStandardPlan}
                      type="number"
                    />

                    <InputField
                      label="Premium Monthly Plan"
                      value={premiumPlan}
                      onChange={setPremiumPlan}
                      type="number"
                    />

                    <InputField
                      label="Premium Quarterly Plan"
                      value={quarterlyPlan}
                      onChange={setQuarterlyPlan}
                      type="number"
                    />
                  </div>

                  <div className="mt-5 rounded-[24px] border border-black/5 bg-black/[0.018] px-5">
                    <SettingRow
                      title="Razorpay Payments"
                      description="Enable online payment processing for student enrollments."
                    >
                      <Toggle
                        value={razorpayEnabled}
                        onChange={setRazorpayEnabled}
                      />
                    </SettingRow>

                    <SettingRow
                      title="UPI Payments"
                      description="Allow students and parents to pay through UPI."
                    >
                      <Toggle value={upiEnabled} onChange={setUpiEnabled} />
                    </SettingRow>

                    <SettingRow
                      title="Card Payments"
                      description="Allow debit and credit card payments."
                    >
                      <Toggle
                        value={cardEnabled}
                        onChange={setCardEnabled}
                      />
                    </SettingRow>

                    <SettingRow
                      title="Automatic Refund Workflow"
                      description="Allow eligible refunds to enter the automated refund workflow."
                    >
                      <Toggle
                        value={autoRefundEnabled}
                        onChange={setAutoRefundEnabled}
                      />
                    </SettingRow>

                    <SettingRow
                      title="Weekly Teacher Payouts"
                      description="Enable weekly payout processing for verified teacher earnings."
                    >
                      <Toggle
                        value={weeklyPayoutEnabled}
                        onChange={setWeeklyPayoutEnabled}
                      />
                    </SettingRow>
                  </div>

                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-[24px] bg-black p-5 !text-white">
                      <WalletCards className="text-[#42d4bc]" size={22} />

                      <p className="mt-4 text-xs font-bold uppercase tracking-[0.12em] !text-white/40">
                        Payout Day
                      </p>

                      <select
                        value={teacherPayoutDay}
                        onChange={(event) =>
                          setTeacherPayoutDay(event.target.value)
                        }
                        className="mt-2 w-full rounded-xl border border-white/10 bg-white/10 px-3 py-3 text-sm font-bold !text-white outline-none"
                      >
                        <option className="text-black" value="Friday">
                          Friday
                        </option>
                        <option className="text-black" value="Saturday">
                          Saturday
                        </option>
                        <option className="text-black" value="Sunday">
                          Sunday
                        </option>
                        <option className="text-black" value="Monday">
                          Monday
                        </option>
                      </select>
                    </div>

                    <div className="rounded-[24px] border border-[#42d4bc]/15 bg-[#42d4bc]/7 p-5">
                      <Database className="text-[#159e8b]" size={22} />

                      <p className="mt-4 text-xs font-bold uppercase tracking-[0.12em] text-black/40">
                        Payment Logic
                      </p>

                      <p className="mt-2 text-sm font-bold">
                        Student revenue → Teacher ledger → Weekly payout
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* NOTIFICATIONS */}
              {activeSection === "notifications" && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="rounded-[24px] border border-black/5 bg-black/[0.018] px-5">
                    <SettingRow
                      title="Student Payment Emails"
                      description="Send parents confirmation when a student payment succeeds."
                    >
                      <Toggle
                        value={studentPaymentEmail}
                        onChange={setStudentPaymentEmail}
                      />
                    </SettingRow>

                    <SettingRow
                      title="Teacher Payout Emails"
                      description="Notify teachers when weekly payout processing changes."
                    >
                      <Toggle
                        value={teacherPayoutEmail}
                        onChange={setTeacherPayoutEmail}
                      />
                    </SettingRow>

                    <SettingRow
                      title="New Enrollment Alerts"
                      description="Notify administrators when a student completes enrollment."
                    >
                      <Toggle
                        value={newEnrollmentAlert}
                        onChange={setNewEnrollmentAlert}
                      />
                    </SettingRow>

                    <SettingRow
                      title="Failed Payment Alerts"
                      description="Notify administrators when a payment fails."
                    >
                      <Toggle
                        value={failedPaymentAlert}
                        onChange={setFailedPaymentAlert}
                      />
                    </SettingRow>
                  </div>

                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-[24px] bg-black p-5 !text-white">
                      <Mail className="text-[#42d4bc]" size={22} />

                      <p className="mt-4 font-black !text-white">
                        Email Operations
                      </p>

                      <p className="mt-1 text-sm leading-6 !text-white/50">
                        Transactional emails remain separate from promotional
                        communication.
                      </p>
                    </div>

                    <div className="rounded-[24px] bg-[#42d4bc]/8 p-5">
                      <Bell className="text-[#159e8b]" size={22} />

                      <p className="mt-4 font-black">Admin Alerts</p>

                      <p className="mt-1 text-sm leading-6 text-black/50">
                        Keep critical operational alerts enabled to avoid
                        missing payment or enrollment events.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* SECURITY */}
              {activeSection === "security" && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="rounded-[24px] border border-black/5 bg-black/[0.018] px-5">
                    <SettingRow
                      title="Two-Factor Authentication"
                      description="Require an additional verification step for administrator accounts."
                    >
                      <Toggle
                        value={twoFactorEnabled}
                        onChange={setTwoFactorEnabled}
                      />
                    </SettingRow>

                    <SettingRow
                      title="Administrator Login Alerts"
                      description="Notify administrators when a new sign-in is detected."
                    >
                      <Toggle
                        value={adminLoginAlerts}
                        onChange={setAdminLoginAlerts}
                      />
                    </SettingRow>

                    <SettingRow
                      title="Session Timeout"
                      description="Automatically expire inactive administrator sessions."
                    >
                      <select
                        value={sessionTimeout}
                        onChange={(event) =>
                          setSessionTimeout(event.target.value)
                        }
                        className="rounded-xl border border-black/8 bg-white px-4 py-2.5 text-sm font-bold outline-none"
                      >
                        <option value="30">30 minutes</option>
                        <option value="60">60 minutes</option>
                        <option value="120">120 minutes</option>
                        <option value="240">4 hours</option>
                      </select>
                    </SettingRow>
                  </div>

                  <div className="mt-5 rounded-[24px] bg-black p-5 !text-white">
                    <div className="flex items-start gap-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#42d4bc]/10 text-[#42d4bc]">
                        <LockKeyhole size={20} />
                      </div>

                      <div>
                        <p className="font-black !text-white">
                          Protected Admin Environment
                        </p>

                        <p className="mt-1 text-sm leading-6 !text-white/50">
                          Production authentication should use secure sessions,
                          role-based access and server-side authorization.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* PLATFORM */}
              {activeSection === "platform" && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="rounded-[24px] border border-black/5 bg-black/[0.018] px-5">
                    <SettingRow
                      title="Maintenance Mode"
                      description="Temporarily restrict student and teacher access while operations are being updated."
                    >
                      <Toggle
                        value={maintenanceMode}
                        onChange={setMaintenanceMode}
                      />
                    </SettingRow>

                    <SettingRow
                      title="Student Registration"
                      description="Allow new students and parents to create accounts."
                    >
                      <Toggle
                        value={studentRegistration}
                        onChange={setStudentRegistration}
                      />
                    </SettingRow>

                    <SettingRow
                      title="Teacher Applications"
                      description="Allow new teachers to submit applications."
                    >
                      <Toggle
                        value={teacherApplications}
                        onChange={setTeacherApplications}
                      />
                    </SettingRow>

                    <SettingRow
                      title="Live Classes"
                      description="Enable live classroom sessions across the platform."
                    >
                      <Toggle
                        value={liveClasses}
                        onChange={setLiveClasses}
                      />
                    </SettingRow>
                  </div>

                  <div className="mt-5 grid gap-4 md:grid-cols-3">
                    <div className="rounded-[24px] border border-black/5 bg-white p-5">
                      <p className="text-xs font-bold uppercase tracking-[0.12em] text-black/35">
                        Environment
                      </p>
                      <p className="mt-2 text-xl font-black">Development</p>
                      <span className="mt-3 inline-flex rounded-full bg-amber-500/10 px-3 py-1.5 text-xs font-bold text-amber-700">
                        Local
                      </span>
                    </div>

                    <div className="rounded-[24px] border border-black/5 bg-white p-5">
                      <p className="text-xs font-bold uppercase tracking-[0.12em] text-black/35">
                        API Status
                      </p>
                      <p className="mt-2 text-xl font-black">Connected</p>
                      <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1.5 text-xs font-bold text-emerald-700">
                        <CheckCircle2 size={13} />
                        Operational
                      </span>
                    </div>

                    <div className="rounded-[24px] border border-black/5 bg-white p-5">
                      <p className="text-xs font-bold uppercase tracking-[0.12em] text-black/35">
                        Database
                      </p>
                      <p className="mt-2 text-xl font-black">PostgreSQL</p>
                      <span className="mt-3 inline-flex rounded-full bg-[#42d4bc]/10 px-3 py-1.5 text-xs font-bold text-[#159e8b]">
                        Ready
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* FOOTER NOTE */}
            <div className="mt-5 flex flex-col justify-between gap-3 rounded-[22px] border border-black/5 bg-white/65 px-5 py-4 text-sm shadow-sm sm:flex-row sm:items-center">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#42d4bc]/10 text-[#159e8b]">
                  <CheckCircle2 size={17} />
                </div>

                <div>
                  <p className="font-bold">Configuration workspace</p>
                  <p className="text-xs text-black/40">
                    Changes shown here are frontend demo state.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={saveSettings}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-black/10 px-4 py-2.5 text-sm font-bold transition hover:bg-black hover:!text-white"
              >
                <Save size={15} />
                Save
              </button>
            </div>
          </section>
        </div>
      </div>

      {/* SAVED TOAST */}
      {saved && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl bg-black px-5 py-4 shadow-2xl !text-white"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#42d4bc]/10 text-[#42d4bc]">
            <CheckCircle2 size={17} />
          </div>

          <div>
            <p className="text-sm font-black !text-white">
              Settings saved
            </p>
            <p className="text-xs !text-white/45">
              Demo configuration updated successfully.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setSaved(false)}
            className="ml-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 !text-white/60 transition hover:bg-white/10 hover:!text-white"
          >
            <X size={15} />
          </button>
        </motion.div>
      )}
    </main>
  );
}