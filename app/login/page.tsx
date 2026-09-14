"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/app/lib/api";

type AccountType = "student" | "teacher";

function EyeIcon({ open }: { open: boolean }) {
  return open ? (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2.5 12s3.2-6 9.5-6 9.5 6 9.5 6-3.2 6-9.5 6-9.5-6-9.5-6Z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <circle
        cx="12"
        cy="12"
        r="2.6"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M4 4 20 20"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  ) : (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2.5 12s3.2-6 9.5-6 9.5 6 9.5 6-3.2 6-9.5 6-9.5-6-9.5-6Z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <circle
        cx="12"
        cy="12"
        r="2.6"
        stroke="currentColor"
        strokeWidth="1.7"
      />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MenuLogo() {
  return (
    <span className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-[11px] bg-[#111827] shadow-[0_10px_28px_rgba(17,24,39,0.18)]">
      <span className="absolute left-[8px] top-[8px] h-[18px] w-[18px] rounded-[5px] border-2 border-white" />
      <span className="absolute left-[13px] top-[13px] h-[7px] w-[7px] rounded-full bg-[#59dbc6] shadow-[0_0_14px_rgba(89,219,198,0.8)]" />
    </span>
  );
}

export default function LoginPage() {
  const router = useRouter();

  const [accountType, setAccountType] =
    useState<AccountType>("student");

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isLoading) {
      return;
    }

    setMessage("");
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);

    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    try {
      const response = await api.login({
        email,
        password,
      });

      const user = response.user;

      /*
       * The backend determines the real role.
       * The account selector is used as an additional
       * frontend check so a user doesn't accidentally
       * enter through the wrong account type.
       */

      if (
        accountType === "student" &&
        user.role !== "student" &&
        user.role !== "parent"
      ) {
        await api.logout();

        setMessage(
          "This account is registered as a teacher. Please select Teacher and try again.",
        );

        return;
      }

      if (accountType === "teacher" && user.role !== "teacher") {
        await api.logout();

        setMessage(
          "This account is not registered as a teacher. Please select Student / Parent and try again.",
        );

        return;
      }

      /*
       * Login succeeded.
       *
       * api.login() has already stored the access and
       * refresh tokens.
       */

      if (rememberMe) {
        setMessage("Login successful. Redirecting...");
      } else {
        setMessage("Login successful. Redirecting...");
      }

      /*
       * Route users according to the role returned
       * by the backend.
       */

      switch (user.role) {
        case "student":
          router.push("/student/dashboard");
          break;

        case "parent":
          router.push("/parent/dashboard");
          break;

        case "teacher":
          router.push("/teacher/dashboard");
          break;

        case "admin":
          router.push("/admin/dashboard");
          break;

        default:
          setMessage("Login succeeded, but the account role is invalid.");
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Unable to sign in. Please try again.";

      setMessage(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#dceaf5] text-[#172736] selection:bg-[#59dbc6] selection:text-black">
      <style jsx global>{`
        @keyframes floatOrbOne {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
          }

          50% {
            transform: translate3d(25px, -18px, 0);
          }
        }

        @keyframes floatOrbTwo {
          0%,
          100% {
            transform: translate3d(0, 0, 0) scale(1);
          }

          50% {
            transform: translate3d(-25px, 20px, 0) scale(1.04);
          }
        }

        @keyframes floatOrbThree {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
          }

          50% {
            transform: translate3d(18px, 10px, 0);
          }
        }

        @keyframes cardFloat {
          0%,
          100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-8px);
          }
        }

        @keyframes glowPulse {
          0%,
          100% {
            opacity: 0.25;
            transform: scale(0.96);
          }

          50% {
            opacity: 0.58;
            transform: scale(1.08);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-120%);
          }

          100% {
            transform: translateX(120%);
          }
        }

        .login-orb-one {
          animation: floatOrbOne 10s ease-in-out infinite;
        }

        .login-orb-two {
          animation: floatOrbTwo 13s ease-in-out infinite;
        }

        .login-orb-three {
          animation: floatOrbThree 11s ease-in-out infinite;
        }

        .login-card {
          animation: cardFloat 6s ease-in-out infinite;
        }

        .login-glow {
          animation: glowPulse 5s ease-in-out infinite;
        }

        .login-shimmer {
          animation: shimmer 5s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .login-orb-one,
          .login-orb-two,
          .login-orb-three,
          .login-card,
          .login-glow,
          .login-shimmer {
            animation: none !important;
          }
        }
      `}</style>

      {/* Background atmosphere */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(255,255,255,0.78),transparent_31%),linear-gradient(135deg,#d7e8f5_0%,#eaf0f5_50%,#cfdfeb_100%)]" />

        <div className="login-orb-one absolute left-[-120px] top-[17%] h-[360px] w-[360px] rounded-full border border-white/40 bg-white/38 shadow-[inset_-22px_-22px_55px_rgba(112,139,162,0.16),inset_20px_20px_40px_rgba(255,255,255,0.96),0_30px_100px_rgba(70,103,127,0.15)] sm:h-[470px] sm:w-[470px]" />

        <div className="login-orb-two absolute right-[-105px] top-[-30px] h-[330px] w-[330px] rounded-full border border-white/45 bg-white/34 shadow-[inset_-20px_-20px_50px_rgba(112,139,162,0.15),inset_20px_20px_38px_rgba(255,255,255,0.95),0_30px_100px_rgba(70,103,127,0.14)] sm:h-[430px] sm:w-[430px]" />

        <div className="login-orb-three absolute bottom-[-155px] left-[4%] h-[370px] w-[370px] rounded-full border border-white/40 bg-white/40 shadow-[inset_-20px_-20px_55px_rgba(112,139,162,0.18),inset_20px_20px_40px_rgba(255,255,255,0.95),0_25px_95px_rgba(70,103,127,0.13)] sm:h-[460px] sm:w-[460px]" />

        <div className="absolute right-[17%] top-[-135px] h-[270px] w-[270px] rounded-full bg-white/20 blur-3xl sm:h-[350px] sm:w-[350px]" />

        <div className="absolute left-[18%] top-[52%] h-[160px] w-[160px] rounded-full bg-[#8ae4d4]/15 blur-3xl" />
      </div>

      {/* Decorative glass fragments */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[12%] top-[18%] h-28 w-28 rotate-12 rounded-[30px] border border-white/30 bg-white/[0.07] backdrop-blur-2xl" />

        <div className="absolute bottom-[18%] right-[13%] h-24 w-24 -rotate-12 rounded-[26px] border border-white/30 bg-white/[0.08] backdrop-blur-2xl" />

        <div className="absolute right-[29%] top-[22%] h-14 w-14 rounded-full border border-white/40 bg-white/20 blur-[1px]" />
      </div>

      {/* Brand */}
      <div className="relative z-20 mx-auto flex w-full max-w-[1440px] items-center justify-between px-5 py-5 sm:px-8 lg:px-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2.5"
          aria-label="TutorsQue home"
        >
          <MenuLogo />

          <span className="text-[24px] font-semibold tracking-[-0.055em] text-[#142433]">
            Tutors<span className="text-[#19b69e]">Que</span>
          </span>
        </Link>

        <Link
          href="/signup"
          className="rounded-full border border-white/75 bg-white/30 px-4 py-2 text-sm font-semibold text-[#354d5f] shadow-[0_8px_24px_rgba(69,90,108,0.08)] backdrop-blur-xl transition hover:bg-white/55"
        >
          Create account
        </Link>
      </div>

      {/* Main login area */}
      <section className="relative z-10 flex min-h-[calc(100vh-88px)] items-center justify-center px-4 pb-12 pt-3 sm:px-6 sm:pb-16">
        <div className="w-full max-w-[510px]">
          {/* Heading */}
          <div className="mb-6 text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#536a7b]/80">
              Welcome back
            </p>

            <h1 className="mt-3 text-[42px] font-semibold tracking-[-0.065em] text-[#152535] sm:text-[50px]">
              Log in
            </h1>

            <p className="mx-auto mt-3 max-w-[390px] text-sm leading-6 text-[#50697b]/80">
              Continue learning with TutorsQue or manage your teaching
              journey.
            </p>
          </div>

          {/* Main glass card */}
          <div className="login-card relative overflow-hidden rounded-[32px] border border-white/75 bg-white/25 p-3 shadow-[0_38px_110px_rgba(64,92,114,0.22)] backdrop-blur-[28px]">
            <div className="login-glow pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/55 blur-3xl" />

            <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-[#65dfcc]/20 blur-3xl" />

            {/* Glass highlight */}
            <div className="pointer-events-none absolute left-0 top-0 h-px w-[65%] overflow-hidden bg-white/80">
              <span className="login-shimmer block h-full w-1/3 bg-gradient-to-r from-transparent via-white to-transparent" />
            </div>

            <div className="relative rounded-[25px] border border-white/55 bg-white/[0.19] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] sm:p-7">
              {/* Account selector */}
              <div className="mb-6">
                <p className="mb-2 pl-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-[#536a7b]">
                  Continue as
                </p>

                <div className="grid grid-cols-2 gap-2 rounded-2xl border border-white/60 bg-white/20 p-1.5">
                  <button
                    type="button"
                    disabled={isLoading}
                    onClick={() => {
                      setAccountType("student");
                      setMessage("");
                    }}
                    className={`rounded-xl px-4 py-3 text-sm font-semibold transition duration-200 ${
                      accountType === "student"
                        ? "bg-white/85 text-[#172a39] shadow-[0_4px_16px_rgba(48,76,95,0.08)]"
                        : "text-[#536a7b] hover:bg-white/30"
                    } ${isLoading ? "cursor-not-allowed opacity-60" : ""}`}
                  >
                    Student / Parent
                  </button>

                  <button
                    type="button"
                    disabled={isLoading}
                    onClick={() => {
                      setAccountType("teacher");
                      setMessage("");
                    }}
                    className={`rounded-xl px-4 py-3 text-sm font-semibold transition duration-200 ${
                      accountType === "teacher"
                        ? "bg-white/85 text-[#172a39] shadow-[0_4px_16px_rgba(48,76,95,0.08)]"
                        : "text-[#536a7b] hover:bg-white/30"
                    } ${isLoading ? "cursor-not-allowed opacity-60" : ""}`}
                  >
                    Teacher
                  </button>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block pl-1 text-xs font-semibold text-[#42596a]"
                  >
                    Email address
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="you@example.com"
                    disabled={isLoading}
                    className="h-12 w-full rounded-[14px] border border-white/65 bg-white/55 px-4 text-sm text-[#172736] outline-none shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_7px_20px_rgba(69,94,112,0.05)] placeholder:text-[#778895]/70 transition focus:border-white focus:bg-white/75 focus:ring-2 focus:ring-[#55d9c3]/35 disabled:cursor-not-allowed disabled:opacity-60"
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block pl-1 text-xs font-semibold text-[#42596a]"
                  >
                    Password
                  </label>

                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      autoComplete="current-password"
                      placeholder="Enter your password"
                      disabled={isLoading}
                      className="h-12 w-full rounded-[14px] border border-white/65 bg-white/55 px-4 pr-12 text-sm text-[#172736] outline-none shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_7px_20px_rgba(69,94,112,0.05)] placeholder:text-[#778895]/70 transition focus:border-white focus:bg-white/75 focus:ring-2 focus:ring-[#55d9c3]/35 disabled:cursor-not-allowed disabled:opacity-60"
                    />

                    <button
                      type="button"
                      disabled={isLoading}
                      onClick={() => setShowPassword((value) => !value)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-2 text-[#5b7282] transition hover:bg-white/50 hover:text-[#1e3545] disabled:cursor-not-allowed disabled:opacity-50"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      <EyeIcon open={showPassword} />
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4 px-1 text-xs text-[#577082]">
                  <label className="inline-flex cursor-pointer items-center gap-2">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(event) =>
                        setRememberMe(event.target.checked)
                      }
                      disabled={isLoading}
                      className="h-4 w-4 rounded accent-[#31c8b0]"
                    />

                    Remember me
                  </label>

                  <Link
                    href="/forgot-password"
                    className="font-medium transition hover:text-[#159c86]"
                  >
                    Forgot password?
                  </Link>
                </div>

                {message && (
                  <div
                    className={`rounded-[14px] border px-4 py-3 text-xs leading-5 ${
                      message.toLowerCase().includes("successful")
                        ? "border-[#5edbc8]/40 bg-[#dffaf5]/55 text-[#187967]"
                        : "border-white/65 bg-white/45 text-[#526979]"
                    }`}
                  >
                    {message}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="relative flex h-13 w-full items-center justify-center gap-2 overflow-hidden rounded-full border border-white/80 bg-white/75 px-6 text-[14px] font-semibold text-[#1a2c3b] shadow-[0_15px_35px_rgba(59,84,104,0.14),inset_0_1px_0_rgba(255,255,255,0.96)] backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:bg-white/90 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
                >
                  {isLoading ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#1a2c3b]/20 border-t-[#19b69e]" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign in
                      <ArrowIcon />
                    </>
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="my-6 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#687c89]/65">
                <span className="h-px flex-1 bg-white/60" />
                or
                <span className="h-px flex-1 bg-white/60" />
              </div>

              {/* Signup */}
              <p className="text-center text-sm text-[#526a79]">
                New to TutorsQue?{" "}
                <Link
                  href="/signup"
                  className="font-semibold text-[#149b85] transition hover:text-[#0b7b69]"
                >
                  Create an account
                </Link>
              </p>
            </div>
          </div>

          <p className="mx-auto mt-5 max-w-[430px] text-center text-[10px] leading-5 text-[#5c7382]/70">
            By continuing, you agree to the TutorsQue terms and privacy
            policy.
          </p>
        </div>
      </section>
    </main>
  );
}