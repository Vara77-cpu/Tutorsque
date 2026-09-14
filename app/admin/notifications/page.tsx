"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  AlertCircle,
  Bell,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Eye,
  Filter,
  Mail,
  MessageCircle,
  MoreHorizontal,
  Plus,
  Search,
  Send,
  Settings2,
  Smartphone,
  Users,
  X,
  Zap,
} from "lucide-react";

type NotificationType =
  | "Payment"
  | "Enrollment"
  | "Teacher"
  | "Class"
  | "System"
  | "Support";

type NotificationStatus = "Sent" | "Scheduled" | "Failed" | "Draft";
type NotificationAudience = "Students" | "Parents" | "Teachers" | "Admins" | "All";

type NotificationItem = {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  audience: NotificationAudience;
  channels: string[];
  status: NotificationStatus;
  date: string;
  delivered: number;
  opened: number;
};

const initialNotifications: NotificationItem[] = [
  {
    id: "NTF-9021",
    title: "Payment successful",
    message: "Your tuition payment for Mathematics has been confirmed.",
    type: "Payment",
    audience: "Parents",
    channels: ["Email", "Push"],
    status: "Sent",
    date: "14 Sep 2026 · 06:14 AM",
    delivered: 184,
    opened: 151,
  },
  {
    id: "NTF-9020",
    title: "New class enrollment",
    message: "A new student has joined your assigned batch.",
    type: "Enrollment",
    audience: "Teachers",
    channels: ["Push"],
    status: "Sent",
    date: "14 Sep 2026 · 05:57 AM",
    delivered: 72,
    opened: 61,
  },
  {
    id: "NTF-9019",
    title: "Live class reminder",
    message: "Your Class 8 Mathematics session starts in 15 minutes.",
    type: "Class",
    audience: "Students",
    channels: ["Push", "SMS"],
    status: "Sent",
    date: "14 Sep 2026 · 05:40 AM",
    delivered: 239,
    opened: 194,
  },
  {
    id: "NTF-9018",
    title: "Weekly payout processing",
    message: "Your verified teacher earnings are being processed.",
    type: "Teacher",
    audience: "Teachers",
    channels: ["Email", "Push"],
    status: "Sent",
    date: "14 Sep 2026 · 05:05 AM",
    delivered: 58,
    opened: 44,
  },
  {
    id: "NTF-9017",
    title: "Platform maintenance",
    message: "Scheduled maintenance will begin tonight at 11:30 PM.",
    type: "System",
    audience: "All",
    channels: ["Email", "Push"],
    status: "Scheduled",
    date: "15 Sep 2026 · 10:00 PM",
    delivered: 0,
    opened: 0,
  },
  {
    id: "NTF-9016",
    title: "Teacher verification completed",
    message: "Your teacher profile has been successfully verified.",
    type: "Teacher",
    audience: "Teachers",
    channels: ["Email"],
    status: "Sent",
    date: "13 Sep 2026 · 09:21 PM",
    delivered: 41,
    opened: 35,
  },
  {
    id: "NTF-9015",
    title: "Support ticket update",
    message: "Your TutorsQue support request has been updated.",
    type: "Support",
    audience: "Students",
    channels: ["Email"],
    status: "Sent",
    date: "13 Sep 2026 · 08:17 PM",
    delivered: 36,
    opened: 29,
  },
  {
    id: "NTF-9014",
    title: "New feature announcement",
    message: "A new learning progress experience is coming to TutorsQue.",
    type: "System",
    audience: "All",
    channels: ["Email", "Push"],
    status: "Draft",
    date: "Not scheduled",
    delivered: 0,
    opened: 0,
  },
];

const typeStyles: Record<NotificationType, string> = {
  Payment: "bg-emerald-500/10 text-emerald-700",
  Enrollment: "bg-sky-500/10 text-sky-700",
  Teacher: "bg-[#42d4bc]/10 text-[#159e8b]",
  Class: "bg-violet-500/10 text-violet-700",
  System: "bg-black/5 text-black/60",
  Support: "bg-amber-500/10 text-amber-700",
};

const statusStyles: Record<NotificationStatus, string> = {
  Sent: "border-emerald-200 bg-emerald-500/10 text-emerald-700",
  Scheduled: "border-sky-200 bg-sky-500/10 text-sky-700",
  Failed: "border-red-200 bg-red-500/10 text-red-700",
  Draft: "border-black/10 bg-black/5 text-black/55",
};

function TypeBadge({ type }: { type: NotificationType }) {
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1.5 text-xs font-bold ${typeStyles[type]}`}
    >
      {type}
    </span>
  );
}

function StatusBadge({ status }: { status: NotificationStatus }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold ${statusStyles[status]}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
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

function ChannelBadge({ channel }: { channel: string }) {
  const icon =
    channel === "Email" ? (
      <Mail size={12} />
    ) : channel === "SMS" ? (
      <MessageCircle size={12} />
    ) : (
      <Smartphone size={12} />
    );

  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-black/7 bg-white px-2.5 py-1 text-[11px] font-bold text-black/50">
      {icon}
      {channel}
    </span>
  );
}

export default function AdminNotificationsPage() {
  const [notifications, setNotifications] =
    useState<NotificationItem[]>(initialNotifications);

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [audienceFilter, setAudienceFilter] = useState("All");

  const [selectedNotification, setSelectedNotification] =
    useState<NotificationItem | null>(null);

  const [showCreateModal, setShowCreateModal] = useState(false);

  const [newTitle, setNewTitle] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [newType, setNewType] =
    useState<NotificationType>("System");
  const [newAudience, setNewAudience] =
    useState<NotificationAudience>("All");
  const [newChannel, setNewChannel] = useState("Push");
  const [newMode, setNewMode] =
    useState<"Send now" | "Schedule">("Send now");

  const sentCount = notifications.filter(
    (item) => item.status === "Sent"
  ).length;

  const scheduledCount = notifications.filter(
    (item) => item.status === "Scheduled"
  ).length;

  const draftCount = notifications.filter(
    (item) => item.status === "Draft"
  ).length;

  const failedCount = notifications.filter(
    (item) => item.status === "Failed"
  ).length;

  const totalDelivered = notifications.reduce(
    (total, item) => total + item.delivered,
    0
  );

  const totalOpened = notifications.reduce(
    (total, item) => total + item.opened,
    0
  );

  const openRate =
    totalDelivered > 0
      ? Math.round((totalOpened / totalDelivered) * 100)
      : 0;

  const filteredNotifications = useMemo(() => {
    const query = search.trim().toLowerCase();

    return notifications.filter((notification) => {
      const matchesSearch =
        !query ||
        notification.id.toLowerCase().includes(query) ||
        notification.title.toLowerCase().includes(query) ||
        notification.message.toLowerCase().includes(query) ||
        notification.audience.toLowerCase().includes(query);

      const matchesType =
        typeFilter === "All" || notification.type === typeFilter;

      const matchesStatus =
        statusFilter === "All" || notification.status === statusFilter;

      const matchesAudience =
        audienceFilter === "All" ||
        notification.audience === audienceFilter;

      return (
        matchesSearch &&
        matchesType &&
        matchesStatus &&
        matchesAudience
      );
    });
  }, [
    notifications,
    search,
    typeFilter,
    statusFilter,
    audienceFilter,
  ]);

  const resetFilters = () => {
    setSearch("");
    setTypeFilter("All");
    setStatusFilter("All");
    setAudienceFilter("All");
  };

  const createNotification = () => {
    const title = newTitle.trim();
    const message = newMessage.trim();

    if (!title || !message) {
      return;
    }

    const item: NotificationItem = {
      id: `NTF-${9022 + notifications.length - initialNotifications.length}`,
      title,
      message,
      type: newType,
      audience: newAudience,
      channels: [newChannel],
      status: newMode === "Send now" ? "Sent" : "Scheduled",
      date:
        newMode === "Send now"
          ? "14 Sep 2026 · Just now"
          : "Scheduled",
      delivered: newMode === "Send now" ? 0 : 0,
      opened: 0,
    };

    setNotifications((current) => [item, ...current]);

    setNewTitle("");
    setNewMessage("");
    setNewType("System");
    setNewAudience("All");
    setNewChannel("Push");
    setNewMode("Send now");
    setShowCreateModal(false);
  };

  const markAsSent = (id: string) => {
    setNotifications((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              status: "Sent",
              date: "14 Sep 2026 · Just now",
            }
          : item
      )
    );

    setSelectedNotification((current) =>
      current && current.id === id
        ? {
            ...current,
            status: "Sent",
            date: "14 Sep 2026 · Just now",
          }
        : current
    );
  };

  const saveDraft = (id: string) => {
    setNotifications((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              status: "Draft",
            }
          : item
      )
    );

    setSelectedNotification((current) =>
      current && current.id === id
        ? {
            ...current,
            status: "Draft",
          }
        : current
    );
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
                Notifications Center
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
              href="/admin/support"
              className="rounded-xl px-3 py-2 text-sm font-semibold text-black/50 transition hover:bg-black/5 hover:text-black"
            >
              Support
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
              <Bell size={13} />
              COMMUNICATION CONTROL CENTER
            </div>

            <h2 className="max-w-4xl text-3xl font-black leading-[1.04] tracking-[-0.045em] sm:text-4xl lg:text-5xl">
              Reach the
              <span className="text-[#159e8b]"> right people </span>
              at the right time.
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-black/50">
              Manage platform notifications, transactional messages,
              announcements and scheduled communication across students,
              parents, teachers and admins.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-black px-5 py-3 text-sm font-bold !text-white shadow-xl shadow-black/10 transition hover:-translate-y-0.5"
          >
            <Plus size={17} />
            Create Notification
          </button>
        </motion.section>

        {/* METRICS */}
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            title="Sent"
            value={String(sentCount)}
            description="Delivered campaigns"
            icon={<Send size={21} />}
            dark
          />

          <MetricCard
            title="Scheduled"
            value={String(scheduledCount)}
            description="Upcoming messages"
            icon={<Clock3 size={21} />}
          />

          <MetricCard
            title="Drafts"
            value={String(draftCount)}
            description="Saved communications"
            icon={<Settings2 size={21} />}
          />

          <MetricCard
            title="Open Rate"
            value={`${openRate}%`}
            description={`${failedCount} failed campaign${
              failedCount === 1 ? "" : "s"
            }`}
            icon={<CheckCircle2 size={21} />}
          />
        </section>

        {/* CHANNEL PERFORMANCE */}
        <section className="mt-6 grid gap-5 lg:grid-cols-[1.1fr_.9fr]">
          <div className="rounded-[30px] border border-black/5 bg-black p-6 !text-white shadow-xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.16em] !text-white/40">
                  Delivery Performance
                </p>

                <h3 className="mt-1 text-2xl font-black !text-white">
                  Communication health
                </h3>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#42d4bc]/10 text-[#42d4bc]">
                <Zap size={20} />
              </div>
            </div>

            <div className="mt-7 grid gap-4 sm:grid-cols-3">
              <ChannelStat
                icon={<Mail size={18} />}
                title="Email"
                value="96%"
                label="delivery"
              />

              <ChannelStat
                icon={<Smartphone size={18} />}
                title="Push"
                value="98%"
                label="delivery"
              />

              <ChannelStat
                icon={<MessageCircle size={18} />}
                title="SMS"
                value="94%"
                label="delivery"
              />
            </div>

            <div className="mt-6 rounded-2xl bg-white/6 p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold !text-white">
                  Overall delivery health
                </p>

                <p className="text-sm font-black text-[#42d4bc]">
                  97.1%
                </p>
              </div>

              <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "97.1%" }}
                  transition={{ duration: 0.8 }}
                  className="h-full rounded-full bg-[#42d4bc]"
                />
              </div>
            </div>
          </div>

          <div className="rounded-[30px] border border-black/5 bg-white/80 p-6 shadow-sm tq-glass">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.16em] text-black/35">
                  Audience Reach
                </p>

                <h3 className="mt-1 text-2xl font-black">
                  Active channels
                </h3>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#42d4bc]/10 text-[#159e8b]">
                <Users size={20} />
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <AudienceRow
                label="Students"
                value="428"
                percent="72%"
              />

              <AudienceRow
                label="Parents"
                value="316"
                percent="61%"
              />

              <AudienceRow
                label="Teachers"
                value="86"
                percent="84%"
              />

              <AudienceRow
                label="Admins"
                value="6"
                percent="100%"
                last
              />
            </div>
          </div>
        </section>

        {/* NOTIFICATION QUEUE */}
        <section className="mt-6 rounded-[30px] border border-black/5 bg-white/75 p-4 shadow-sm tq-glass sm:p-5">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.15em] text-black/35">
                Notification Queue
              </p>

              <p className="mt-1 text-sm font-bold">
                {filteredNotifications.length}{" "}
                {filteredNotifications.length === 1
                  ? "notification"
                  : "notifications"}{" "}
                visible
              </p>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
              <div className="flex min-w-0 items-center gap-2 rounded-2xl border border-black/7 bg-white px-4 py-3 shadow-sm sm:w-[300px]">
                <Search size={17} className="shrink-0 text-black/30" />

                <input
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                  placeholder="Search notification..."
                  className="w-full bg-transparent text-sm font-medium outline-none placeholder:text-black/30"
                />
              </div>

              <div className="flex items-center gap-2 rounded-2xl border border-black/7 bg-white px-3 shadow-sm">
                <Filter size={15} className="text-black/30" />

                <select
                  value={typeFilter}
                  onChange={(event) =>
                    setTypeFilter(event.target.value)
                  }
                  className="bg-transparent py-3 text-sm font-semibold outline-none"
                >
                  <option value="All">All Types</option>
                  <option value="Payment">Payment</option>
                  <option value="Enrollment">Enrollment</option>
                  <option value="Teacher">Teacher</option>
                  <option value="Class">Class</option>
                  <option value="System">System</option>
                  <option value="Support">Support</option>
                </select>
              </div>

              <div className="flex items-center gap-2 rounded-2xl border border-black/7 bg-white px-3 shadow-sm">
                <select
                  value={statusFilter}
                  onChange={(event) =>
                    setStatusFilter(event.target.value)
                  }
                  className="bg-transparent py-3 text-sm font-semibold outline-none"
                >
                  <option value="All">All Status</option>
                  <option value="Sent">Sent</option>
                  <option value="Scheduled">Scheduled</option>
                  <option value="Draft">Draft</option>
                  <option value="Failed">Failed</option>
                </select>
              </div>

              <div className="flex items-center gap-2 rounded-2xl border border-black/7 bg-white px-3 shadow-sm">
                <select
                  value={audienceFilter}
                  onChange={(event) =>
                    setAudienceFilter(event.target.value)
                  }
                  className="bg-transparent py-3 text-sm font-semibold outline-none"
                >
                  <option value="All">All Audiences</option>
                  <option value="Students">Students</option>
                  <option value="Parents">Parents</option>
                  <option value="Teachers">Teachers</option>
                  <option value="Admins">Admins</option>
                  <option value="All">All</option>
                </select>
              </div>

              {(search ||
                typeFilter !== "All" ||
                statusFilter !== "All" ||
                audienceFilter !== "All") && (
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
            <div className="hidden grid-cols-[1.5fr_1fr_.8fr_1.2fr_1fr_auto] gap-4 border-b border-black/5 bg-black/[0.025] px-5 py-4 text-[10px] font-black uppercase tracking-[0.14em] text-black/35 lg:grid">
              <div>Notification</div>
              <div>Audience</div>
              <div>Type</div>
              <div>Channels</div>
              <div>Status</div>
              <div />
            </div>

            <div className="divide-y divide-black/5">
              {filteredNotifications.map((notification, index) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.025 }}
                  className="grid gap-4 px-5 py-4 lg:grid-cols-[1.5fr_1fr_.8fr_1.2fr_1fr_auto] lg:items-center"
                >
                  <div className="min-w-0">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#42d4bc]/10 text-[#159e8b]">
                        <Bell size={17} />
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-black">
                          {notification.title}
                        </p>

                        <p className="mt-0.5 truncate text-xs text-black/40">
                          {notification.id} · {notification.date}
                        </p>

                        <p className="mt-1 hidden truncate text-[11px] text-black/30 xl:block">
                          {notification.message}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-black">
                      {notification.audience}
                    </p>

                    <p className="mt-0.5 text-xs text-black/40">
                      {notification.delivered > 0
                        ? `${notification.delivered} delivered`
                        : "No delivery yet"}
                    </p>
                  </div>

                  <div>
                    <TypeBadge type={notification.type} />
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {notification.channels.map((channel) => (
                      <ChannelBadge
                        key={channel}
                        channel={channel}
                      />
                    ))}
                  </div>

                  <div>
                    <StatusBadge status={notification.status} />
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setSelectedNotification(notification)
                    }
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-black !text-white transition hover:scale-105"
                    aria-label={`Open ${notification.id}`}
                  >
                    <Eye size={16} />
                  </button>
                </motion.div>
              ))}

              {filteredNotifications.length === 0 && (
                <div className="px-6 py-16 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-black/5 text-black/25">
                    <Search size={22} />
                  </div>

                  <p className="mt-4 font-black">
                    No notifications found
                  </p>

                  <p className="mt-1 text-sm text-black/40">
                    Try another search or filter.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* DELIVERY LOGIC */}
        <section className="mt-6 grid gap-5 lg:grid-cols-[1.1fr_.9fr]">
          <div className="rounded-[30px] border border-black/5 bg-black p-6 !text-white shadow-xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.16em] !text-white/40">
                  Communication Flow
                </p>

                <h3 className="mt-2 max-w-xl text-2xl font-black !text-white">
                  Trigger the message from the event that matters.
                </h3>
              </div>

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#42d4bc]/10 text-[#42d4bc]">
                <Bell size={20} />
              </div>
            </div>

            <p className="mt-4 max-w-2xl text-sm leading-6 !text-white/55">
              TutorsQue can connect notifications to payments, enrollments,
              live classes, teacher payouts, support tickets and platform
              events.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <FlowCard number="01" title="Event occurs" />
              <FlowCard number="02" title="Notification triggered" />
              <FlowCard number="03" title="Message delivered" />
            </div>
          </div>

          <div className="rounded-[30px] border border-black/5 bg-white/80 p-6 shadow-sm tq-glass">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.16em] text-black/35">
                  Delivery Snapshot
                </p>

                <h3 className="mt-1 text-2xl font-black">
                  Communication stats
                </h3>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#42d4bc]/10 text-[#159e8b]">
                <CheckCircle2 size={20} />
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <SnapshotRow
                label="Delivered"
                value={String(totalDelivered)}
              />

              <SnapshotRow
                label="Opened"
                value={String(totalOpened)}
              />

              <SnapshotRow
                label="Open rate"
                value={`${openRate}%`}
              />

              <SnapshotRow
                label="Failed"
                value={String(failedCount)}
                last
              />
            </div>
          </div>
        </section>
      </div>

      {/* DETAIL MODAL */}
      {selectedNotification && (
        <ModalOverlay
          onClose={() => setSelectedNotification(null)}
        >
          <div className="w-full rounded-[30px] border border-black/10 bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#42d4bc]/10 text-[#159e8b]">
                  <Bell size={21} />
                </div>

                <div>
                  <p className="text-[11px] font-black uppercase tracking-[0.16em] text-black/35">
                    Notification Details
                  </p>

                  <h3 className="mt-1 text-2xl font-black">
                    {selectedNotification.title}
                  </h3>

                  <p className="mt-1 text-sm text-black/40">
                    {selectedNotification.id}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedNotification(null)
                }
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-black !text-white"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              <TypeBadge type={selectedNotification.type} />
              <StatusBadge status={selectedNotification.status} />

              <span className="rounded-full border border-black/8 bg-black/[0.035] px-3 py-1.5 text-xs font-bold text-black/55">
                {selectedNotification.audience}
              </span>
            </div>

            <div className="mt-5 rounded-2xl border border-black/5 bg-black/[0.025] p-5">
              <p className="text-[11px] font-black uppercase tracking-[0.12em] text-black/35">
                Message
              </p>

              <p className="mt-2 text-sm leading-6 text-black/60">
                {selectedNotification.message}
              </p>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <DetailBox
                label="Date"
                value={selectedNotification.date}
              />

              <DetailBox
                label="Audience"
                value={selectedNotification.audience}
              />

              <DetailBox
                label="Delivered"
                value={String(selectedNotification.delivered)}
              />

              <DetailBox
                label="Opened"
                value={String(selectedNotification.opened)}
              />
            </div>

            <div className="mt-4 rounded-2xl border border-black/5 bg-white p-4">
              <p className="text-[11px] font-black uppercase tracking-[0.12em] text-black/35">
                Channels
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                {selectedNotification.channels.map(
                  (channel) => (
                    <ChannelBadge
                      key={channel}
                      channel={channel}
                    />
                  )
                )}
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {selectedNotification.status !== "Sent" && (
                <button
                  type="button"
                  onClick={() =>
                    markAsSent(selectedNotification.id)
                  }
                  className="flex-1 rounded-2xl bg-black px-5 py-3 text-sm font-bold !text-white"
                >
                  <span className="inline-flex items-center justify-center gap-2">
                    <Send size={15} />
                    Send Now
                  </span>
                </button>
              )}

              {selectedNotification.status !== "Draft" && (
                <button
                  type="button"
                  onClick={() =>
                    saveDraft(selectedNotification.id)
                  }
                  className="flex-1 rounded-2xl border border-black/10 px-5 py-3 text-sm font-bold"
                >
                  Save as Draft
                </button>
              )}

              <button
                type="button"
                onClick={() =>
                  setSelectedNotification(null)
                }
                className="rounded-2xl border border-black/10 px-5 py-3 text-sm font-bold"
              >
                Close
              </button>
            </div>
          </div>
        </ModalOverlay>
      )}

      {/* CREATE MODAL */}
      {showCreateModal && (
        <ModalOverlay onClose={() => setShowCreateModal(false)}>
          <div className="w-full rounded-[30px] border border-black/10 bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.16em] text-black/35">
                  New Communication
                </p>

                <h3 className="mt-1 text-2xl font-black">
                  Create Notification
                </h3>

                <p className="mt-1 text-sm text-black/40">
                  Create an announcement or transactional message.
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
                  Notification Title
                </span>

                <input
                  value={newTitle}
                  onChange={(event) =>
                    setNewTitle(event.target.value)
                  }
                  placeholder="Enter notification title"
                  className="w-full rounded-2xl border border-black/8 bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-[#42d4bc] focus:ring-4 focus:ring-[#42d4bc]/10"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-xs font-bold text-black/45">
                  Message
                </span>

                <textarea
                  value={newMessage}
                  onChange={(event) =>
                    setNewMessage(event.target.value)
                  }
                  placeholder="Write the notification message..."
                  rows={4}
                  className="w-full resize-none rounded-2xl border border-black/8 bg-white px-4 py-3 text-sm font-medium outline-none focus:border-[#42d4bc] focus:ring-4 focus:ring-[#42d4bc]/10"
                />
              </label>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-xs font-bold text-black/45">
                    Type
                  </span>

                  <select
                    value={newType}
                    onChange={(event) =>
                      setNewType(
                        event.target.value as NotificationType
                      )
                    }
                    className="w-full rounded-2xl border border-black/8 bg-white px-4 py-3 text-sm font-bold outline-none focus:border-[#42d4bc]"
                  >
                    <option value="Payment">Payment</option>
                    <option value="Enrollment">
                      Enrollment
                    </option>
                    <option value="Teacher">Teacher</option>
                    <option value="Class">Class</option>
                    <option value="System">System</option>
                    <option value="Support">Support</option>
                  </select>
                </label>

                <label className="block">
                  <span className="mb-2 block text-xs font-bold text-black/45">
                    Audience
                  </span>

                  <select
                    value={newAudience}
                    onChange={(event) =>
                      setNewAudience(
                        event.target.value as NotificationAudience
                      )
                    }
                    className="w-full rounded-2xl border border-black/8 bg-white px-4 py-3 text-sm font-bold outline-none focus:border-[#42d4bc]"
                  >
                    <option value="Students">Students</option>
                    <option value="Parents">Parents</option>
                    <option value="Teachers">Teachers</option>
                    <option value="Admins">Admins</option>
                    <option value="All">All</option>
                  </select>
                </label>

                <label className="block">
                  <span className="mb-2 block text-xs font-bold text-black/45">
                    Channel
                  </span>

                  <select
                    value={newChannel}
                    onChange={(event) =>
                      setNewChannel(event.target.value)
                    }
                    className="w-full rounded-2xl border border-black/8 bg-white px-4 py-3 text-sm font-bold outline-none focus:border-[#42d4bc]"
                  >
                    <option value="Push">Push</option>
                    <option value="Email">Email</option>
                    <option value="SMS">SMS</option>
                  </select>
                </label>

                <label className="block">
                  <span className="mb-2 block text-xs font-bold text-black/45">
                    Delivery
                  </span>

                  <select
                    value={newMode}
                    onChange={(event) =>
                      setNewMode(
                        event.target.value as
                          | "Send now"
                          | "Schedule"
                      )
                    }
                    className="w-full rounded-2xl border border-black/8 bg-white px-4 py-3 text-sm font-bold outline-none focus:border-[#42d4bc]"
                  >
                    <option value="Send now">Send now</option>
                    <option value="Schedule">Schedule</option>
                  </select>
                </label>
              </div>
            </div>

            <div className="mt-5 rounded-2xl bg-[#42d4bc]/8 p-4">
              <div className="flex gap-3">
                <div className="mt-0.5 text-[#159e8b]">
                  <AlertCircle size={17} />
                </div>

                <p className="text-sm leading-6 text-black/55">
                  This frontend demo creates notification records locally.
                  Actual email, push and SMS delivery will be connected to the
                  backend notification service later.
                </p>
              </div>
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
                onClick={createNotification}
                className="flex-1 rounded-2xl bg-black px-5 py-3 text-sm font-bold !text-white"
              >
                <span className="inline-flex items-center justify-center gap-2">
                  {newMode === "Send now" ? (
                    <>
                      <Send size={15} />
                      Create & Send
                    </>
                  ) : (
                    <>
                      <Clock3 size={15} />
                      Schedule
                    </>
                  )}
                </span>
              </button>
            </div>
          </div>
        </ModalOverlay>
      )}
    </main>
  );
}

function ChannelStat({
  icon,
  title,
  value,
  label,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  label: string;
}) {
  return (
    <div className="rounded-2xl bg-white/6 p-4">
      <div className="flex items-center gap-2 !text-white/65">
        {icon}
        <span className="text-xs font-bold !text-white/50">
          {title}
        </span>
      </div>

      <p className="mt-3 text-2xl font-black !text-white">{value}</p>

      <p className="mt-1 text-xs !text-white/35">{label}</p>
    </div>
  );
}

function AudienceRow({
  label,
  value,
  percent,
  last = false,
}: {
  label: string;
  value: string;
  percent: string;
  last?: boolean;
}) {
  return (
    <div
      className={`pb-4 ${
        last ? "" : "border-b border-black/5"
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold">{label}</span>

        <div className="flex items-center gap-2">
          <span className="text-sm font-black">{value}</span>
          <span className="text-xs font-bold text-black/35">
            {percent}
          </span>
        </div>
      </div>

      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-black/5">
        <div
          className="h-full rounded-full bg-black"
          style={{ width: percent }}
        />
      </div>
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

function FlowCard({
  number,
  title,
}: {
  number: string;
  title: string;
}) {
  return (
    <div className="rounded-2xl bg-white/6 p-4">
      <p className="text-[11px] font-bold !text-white/35">{number}</p>
      <p className="mt-1 text-sm font-bold !text-white">{title}</p>
    </div>
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