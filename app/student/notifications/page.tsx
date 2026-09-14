"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";

type NotificationType =
  | "class"
  | "homework"
  | "test"
  | "payment"
  | "system";

type NotificationItem = {
  id: number;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  dateLabel: string;
  read: boolean;
  important?: boolean;
};

const initialNotifications: NotificationItem[] = [
  {
    id: 1,
    type: "class",
    title: "Mathematics class starts soon",
    message:
      "Your Class 10 Mathematics session with Rahul Varma starts today at 6:00 PM.",
    time: "5:20 PM",
    dateLabel: "Today",
    read: false,
    important: true,
  },
  {
    id: 2,
    type: "homework",
    title: "New homework assigned",
    message:
      "Quadratic Equations Practice has been assigned. It is due on September 08.",
    time: "3:45 PM",
    dateLabel: "Today",
    read: false,
  },
  {
    id: 3,
    type: "test",
    title: "New test available",
    message:
      "Chemical Reactions & Equations assessment is now available for you.",
    time: "11:30 AM",
    dateLabel: "Today",
    read: true,
  },
  {
    id: 4,
    type: "class",
    title: "Class completed",
    message:
      "Your Science class on Light: Reflection & Refraction was completed successfully.",
    time: "Yesterday, 7:02 PM",
    dateLabel: "Yesterday",
    read: true,
  },
  {
    id: 5,
    type: "homework",
    title: "Homework reviewed",
    message:
      "Your Arithmetic Progressions assignment has been reviewed by Rahul Varma.",
    time: "Yesterday, 4:18 PM",
    dateLabel: "Yesterday",
    read: true,
  },
  {
    id: 6,
    type: "payment",
    title: "Payment successful",
    message:
      "Your ₹2,999 Regular Plan payment was successfully processed.",
    time: "Sep 01, 2026",
    dateLabel: "Earlier",
    read: true,
  },
  {
    id: 7,
    type: "system",
    title: "Welcome to TutorsQue",
    message:
      "Your student account is ready. Explore classes, tutors, homework and tests from your dashboard.",
    time: "Aug 30, 2026",
    dateLabel: "Earlier",
    read: true,
  },
  {
    id: 8,
    type: "test",
    title: "Test result published",
    message:
      "Your Mathematics Arithmetic Progressions result is now available. You scored 34/40.",
    time: "Aug 29, 2026",
    dateLabel: "Earlier",
    read: true,
  },
];

const filters = [
  { value: "All", label: "All" },
  { value: "Unread", label: "Unread" },
  { value: "class", label: "Classes" },
  { value: "homework", label: "Homework" },
  { value: "test", label: "Tests" },
  { value: "payment", label: "Payments" },
];

function typeClasses(type: NotificationType) {
  switch (type) {
    case "class":
      return "bg-[#42d4bc]/10 text-[#0b9079]";
    case "homework":
      return "bg-yellow-500/10 text-yellow-700";
    case "test":
      return "bg-blue-500/10 text-blue-700";
    case "payment":
      return "bg-purple-500/10 text-purple-700";
    default:
      return "bg-black/[0.05] text-black/55";
  }
}

function typeLabel(type: NotificationType) {
  switch (type) {
    case "class":
      return "Class";
    case "homework":
      return "Homework";
    case "test":
      return "Test";
    case "payment":
      return "Payment";
    default:
      return "System";
  }
}

function typeIcon(type: NotificationType) {
  switch (type) {
    case "class":
      return (
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <rect x="3" y="5" width="18" height="14" rx="3" />
          <path
            strokeLinecap="round"
            d="m10 9 5 3-5 3V9Z"
          />
        </svg>
      );

    case "homework":
      return (
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
            d="M6 3h9l3 3v15H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"
          />
          <path
            strokeLinecap="round"
            d="M9 11h6M9 15h6M9 7h2"
          />
        </svg>
      );

    case "test":
      return (
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
            d="M7 3h10a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"
          />
          <path
            strokeLinecap="round"
            d="M8 8h8M8 12h8M8 16h5"
          />
        </svg>
      );

    case "payment":
      return (
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <rect x="3" y="5" width="18" height="14" rx="3" />
          <path strokeLinecap="round" d="M3 10h18M7 15h4" />
        </svg>
      );

    default:
      return (
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <circle cx="12" cy="12" r="9" />
          <path strokeLinecap="round" d="M12 10v5M12 7h.01" />
        </svg>
      );
  }
}

export default function StudentNotificationsPage() {
  const [notifications, setNotifications] = useState(
    initialNotifications
  );
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");

  const unreadCount = notifications.filter(
    (item) => !item.read
  ).length;

  const classCount = notifications.filter(
    (item) => item.type === "class"
  ).length;

  const homeworkCount = notifications.filter(
    (item) => item.type === "homework"
  ).length;

  const filteredNotifications = useMemo(() => {
    return notifications.filter((item) => {
      const matchesFilter =
        activeFilter === "All"
          ? true
          : activeFilter === "Unread"
            ? !item.read
            : item.type === activeFilter;

      const searchable =
        `${item.title} ${item.message} ${typeLabel(
          item.type
        )}`.toLowerCase();

      return (
        matchesFilter &&
        searchable.includes(search.toLowerCase())
      );
    });
  }, [notifications, activeFilter, search]);

  const markAsRead = (id: number) => {
    setNotifications((current) =>
      current.map((item) =>
        item.id === id ? { ...item, read: true } : item
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((current) =>
      current.map((item) => ({ ...item, read: true }))
    );
  };

  const deleteNotification = (id: number) => {
    setNotifications((current) =>
      current.filter((item) => item.id !== id)
    );
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

      <div className="relative mx-auto max-w-[1450px] px-4 py-5 sm:px-6 lg:px-8">
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
                Notifications
              </p>

              <p className="mt-0.5 text-xs text-black/45">
                Stay updated on classes, homework, tests and payments
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-full bg-[#42d4bc]/10 px-4 py-2.5 text-xs font-black text-[#0b9079]">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#42d4bc]" />
            {unreadCount} unread
          </div>
        </motion.header>

        {/* Hero */}
        <section className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden rounded-[30px] bg-black p-7 text-white shadow-2xl shadow-black/10 sm:p-9"
          >
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#42d4bc]/20 blur-3xl" />
            <div className="absolute bottom-[-120px] left-[25%] h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl" />

            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-white/55">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#42d4bc]" />
                Updates center
              </div>

              <h1 className="mt-5 max-w-2xl text-4xl font-black leading-[1.03] tracking-[-0.05em] sm:text-5xl">
                Nothing important should
                <span className="text-[#42d4bc]">
                  {" "}
                  slip through.
                </span>
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-6 text-white/50 sm:text-base">
                TutorsQue keeps your important academic activity in one
                simple notification center.
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                  <p className="text-xs text-white/35">
                    Unread
                  </p>

                  <p className="mt-1.5 text-2xl font-black">
                    {unreadCount}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                  <p className="text-xs text-white/35">
                    Classes
                  </p>

                  <p className="mt-1.5 text-2xl font-black">
                    {classCount}
                  </p>
                </div>

                <div className="rounded-2xl border border-[#42d4bc]/20 bg-[#42d4bc]/10 p-4">
                  <p className="text-xs text-[#42d4bc]/65">
                    Homework
                  </p>

                  <p className="mt-1.5 text-2xl font-black text-[#42d4bc]">
                    {homeworkCount}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Notification summary */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="tq-glass rounded-[30px] p-6 shadow-xl shadow-black/[0.03] sm:p-7"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-black/30">
                  Notification status
                </p>

                <h2 className="mt-2 text-3xl font-black tracking-[-0.04em]">
                  {unreadCount}
                </h2>

                <p className="mt-1 text-xs text-black/40">
                  messages need your attention
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
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"
                  />
                  <path
                    strokeLinecap="round"
                    d="M10 21h4"
                  />
                </svg>
              </div>
            </div>

            <div className="mt-7 h-3 overflow-hidden rounded-full bg-black/[0.06]">
              <motion.div
                initial={{ width: 0 }}
                animate={{
                  width: `${
                    notifications.length > 0
                      ? ((notifications.length - unreadCount) /
                          notifications.length) *
                        100
                      : 100
                  }%`,
                }}
                transition={{ duration: 1 }}
                className="h-full rounded-full bg-[#42d4bc]"
              />
            </div>

            <div className="mt-3 flex items-center justify-between text-xs">
              <span className="font-bold text-black/35">
                {notifications.length - unreadCount} read
              </span>

              <button
                onClick={markAllAsRead}
                className="font-black text-[#0b9079] transition hover:opacity-70"
              >
                Mark all as read
              </button>
            </div>

            <div className="mt-6 rounded-2xl bg-black/[0.03] p-4">
              <p className="text-xs font-black">
                Notification preferences
              </p>

              <p className="mt-1 text-[11px] leading-5 text-black/45">
                Manage reminders and notification settings from your
                student profile.
              </p>

              <Link
                href="/student/profile"
                className="mt-3 inline-flex rounded-xl bg-black px-4 py-2.5 text-[10px] font-black text-white transition hover:-translate-y-0.5"
              >
                Open Settings
              </Link>
            </div>
          </motion.div>
        </section>

        {/* Filters */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
          className="tq-glass mt-4 rounded-[26px] p-4 shadow-xl shadow-black/[0.03]"
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => setActiveFilter(filter.value)}
                  className={`rounded-xl px-3.5 py-2.5 text-xs font-black transition ${
                    activeFilter === filter.value
                      ? "bg-black text-white"
                      : "bg-black/[0.04] text-black/45 hover:bg-black/[0.07]"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            <div className="relative">
              <svg
                viewBox="0 0 24 24"
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-black/30"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <circle cx="11" cy="11" r="6.5" />
                <path
                  strokeLinecap="round"
                  d="m16 16 4 4"
                />
              </svg>

              <input
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search notifications..."
                className="h-11 w-full rounded-xl border border-black/[0.06] bg-white/60 pl-10 pr-4 text-xs font-semibold outline-none transition focus:border-[#42d4bc]/50 focus:bg-white sm:w-64"
              />
            </div>
          </div>
        </motion.section>

        {/* Notification list */}
        <section className="mt-4">
          {filteredNotifications.length > 0 ? (
            <div className="space-y-3">
              {filteredNotifications.map((notification, index) => (
                <motion.article
                  key={notification.id}
                  layout
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: index * 0.04 }}
                  className={`tq-glass rounded-[25px] p-4 shadow-xl shadow-black/[0.025] sm:p-5 ${
                    !notification.read
                      ? "border border-[#42d4bc]/20"
                      : ""
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${typeClasses(
                        notification.type
                      )}`}
                    >
                      {typeIcon(notification.type)}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <h2
                              className={`text-sm tracking-[-0.01em] ${
                                notification.read
                                  ? "font-bold"
                                  : "font-black"
                              }`}
                            >
                              {notification.title}
                            </h2>

                            <span
                              className={`rounded-full px-2.5 py-1 text-[9px] font-black ${typeClasses(
                                notification.type
                              )}`}
                            >
                              {typeLabel(notification.type)}
                            </span>

                            {!notification.read && (
                              <span className="rounded-full bg-[#42d4bc] px-2.5 py-1 text-[9px] font-black text-black">
                                New
                              </span>
                            )}

                            {notification.important && (
                              <span className="rounded-full bg-red-500/10 px-2.5 py-1 text-[9px] font-black text-red-600">
                                Important
                              </span>
                            )}
                          </div>

                          <p className="mt-2 text-xs leading-6 text-black/50">
                            {notification.message}
                          </p>
                        </div>

                        <div className="shrink-0 text-left sm:text-right">
                          <p className="text-[10px] font-bold text-black/30">
                            {notification.dateLabel}
                          </p>

                          <p className="mt-1 text-[10px] font-medium text-black/30">
                            {notification.time}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-black/5 pt-3">
                        {!notification.read && (
                          <button
                            onClick={() =>
                              markAsRead(notification.id)
                            }
                            className="rounded-xl bg-black/[0.05] px-3 py-2 text-[10px] font-black text-black/55 transition hover:bg-black/[0.08]"
                          >
                            Mark as read
                          </button>
                        )}

                        {notification.type === "class" && (
                          <Link
                            href="/student/live-class"
                            className="rounded-xl bg-black px-3 py-2 text-[10px] font-black text-white transition hover:-translate-y-0.5"
                          >
                            View Class
                          </Link>
                        )}

                        {notification.type === "homework" && (
                          <Link
                            href="/student/homework"
                            className="rounded-xl bg-black px-3 py-2 text-[10px] font-black text-white transition hover:-translate-y-0.5"
                          >
                            View Homework
                          </Link>
                        )}

                        {notification.type === "test" && (
                          <Link
                            href="/student/tests"
                            className="rounded-xl bg-black px-3 py-2 text-[10px] font-black text-white transition hover:-translate-y-0.5"
                          >
                            View Tests
                          </Link>
                        )}

                        {notification.type === "payment" && (
                          <Link
                            href="/student/payments"
                            className="rounded-xl bg-black px-3 py-2 text-[10px] font-black text-white transition hover:-translate-y-0.5"
                          >
                            View Payments
                          </Link>
                        )}

                        <button
                          onClick={() =>
                            deleteNotification(notification.id)
                          }
                          className="rounded-xl bg-black/[0.03] px-3 py-2 text-[10px] font-black text-black/35 transition hover:bg-red-500/10 hover:text-red-600"
                        >
                          Dismiss
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="tq-glass rounded-[28px] p-12 text-center shadow-xl shadow-black/[0.03]"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-black/[0.04] text-black/35">
                <svg
                  viewBox="0 0 24 24"
                  className="h-7 w-7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"
                  />
                  <path
                    strokeLinecap="round"
                    d="M10 21h4"
                  />
                </svg>
              </div>

              <h2 className="mt-5 text-xl font-black">
                No notifications found
              </h2>

              <p className="mt-2 text-sm text-black/40">
                Try another filter or search term.
              </p>
            </motion.div>
          )}
        </section>

        {/* Notification information */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
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
                <circle cx="12" cy="12" r="9" />
                <path
                  strokeLinecap="round"
                  d="M12 10v5M12 7h.01"
                />
              </svg>
            </div>

            <div>
              <p className="text-sm font-black">
                About your notifications
              </p>

              <p className="mt-1 text-xs leading-5 text-black/50">
                TutorsQue notifications can include live class reminders,
                homework updates, test availability, results, payments and
                important account information.
              </p>
            </div>
          </div>
        </motion.section>
      </div>

      <style jsx>{`
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