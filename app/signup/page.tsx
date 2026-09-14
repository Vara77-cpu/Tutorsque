"use client";

import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";

type AccountType = "student" | "teacher";

type Leaf = {
  left: string;
  delay: string;
  duration: string;
  size: number;
  rotation: number;
};

const leafSeeds: Leaf[] = [
  { left: "5%", delay: "0s", duration: "8s", size: 24, rotation: -25 },
  { left: "15%", delay: "2s", duration: "10s", size: 18, rotation: 30 },
  { left: "27%", delay: "1s", duration: "9s", size: 21, rotation: -15 },
  { left: "39%", delay: "4s", duration: "11s", size: 25, rotation: 40 },
  { left: "52%", delay: "0.5s", duration: "9.5s", size: 17, rotation: -35 },
  { left: "64%", delay: "3s", duration: "10.5s", size: 22, rotation: 25 },
  { left: "76%", delay: "1.5s", duration: "8.5s", size: 19, rotation: -20 },
  { left: "88%", delay: "3.5s", duration: "12s", size: 24, rotation: 35 },
];

function LeafShape({
  size,
  rotation,
}: {
  size: number;
  rotation: number;
}) {
  return (
    <span
      className="signup-leaf"
      style={{
        width: `${size}px`,
        height: `${size * 0.52}px`,
        transform: `rotate(${rotation}deg)`,
      }}
    >
      <span className="signup-leaf-vein" />
    </span>
  );
}

function EyeIcon({ open }: { open: boolean }) {
  if (open) {
    return (
      <svg
        width="19"
        height="19"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M2.5 12s3.4-6 9.5-6 9.5 6 9.5 6-3.4 6-9.5 6-9.5-6-9.5-6Z"
          stroke="currentColor"
          strokeWidth="1.7"
        />
        <circle
          cx="12"
          cy="12"
          r="2.8"
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
    );
  }

  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2.5 12s3.4-6 9.5-6 9.5 6 9.5 6-3.4 6-9.5 6-9.5-6-9.5-6Z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <circle
        cx="12"
        cy="12"
        r="2.8"
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

function SparkleIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="m12 2 1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function SignupPage() {
  const [accountType, setAccountType] = useState<AccountType>("student");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const leafStyles = useMemo(() => leafSeeds, []);

  useEffect(() => {
    setSubmitted(false);
  }, [accountType]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!acceptedTerms) {
      setSubmitted(false);
      return;
    }

    setSubmitted(true);
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#d9e8f4] text-[#182536]">
      <style jsx global>{`
        @keyframes signupCloudMove {
          0%,
          100% {
            transform: translate3d(-10px, 0, 0) scale(1);
          }
          50% {
            transform: translate3d(20px, 8px, 0) scale(1.03);
          }
        }

        @keyframes signupCloudMoveTwo {
          0%,
          100% {
            transform: translate3d(10px, 0, 0);
          }
          50% {
            transform: translate3d(-28px, 10px, 0);
          }
        }

        @keyframes signupTreeSway {
          0%,
          100% {
            transform: rotate(-1deg) translateY(0);
          }
          50% {
            transform: rotate(1.2deg) translateY(-2px);
          }
        }

        @keyframes signupGrassSway {
          0%,
          100% {
            transform: skewX(-1deg);
          }
          50% {
            transform: skewX(2deg);
          }
        }

        @keyframes signupLeafFall {
          0% {
            opacity: 0;
            transform: translate3d(0, -80px, 0) rotate(0deg);
          }
          12% {
            opacity: 1;
          }
          50% {
            transform: translate3d(36px, 45vh, 0)
              rotate(180deg);
          }
          100% {
            opacity: 0;
            transform: translate3d(-40px, 105vh, 0)
              rotate(360deg);
          }
        }

        @keyframes signupGlow {
          0%,
          100% {
            opacity: 0.35;
            transform: scale(0.95);
          }
          50% {
            opacity: 0.65;
            transform: scale(1.08);
          }
        }

        @keyframes signupCardFloat {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
          }
          50% {
            transform: translate3d(0, -7px, 0);
          }
        }

        @keyframes signupSunPulse {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.65;
          }
          50% {
            transform: scale(1.07);
            opacity: 0.82;
          }
        }

        .signup-leaf {
          position: absolute;
          top: -60px;
          display: block;
          border-radius: 100% 0 100% 0;
          background: linear-gradient(
            135deg,
            #ff8a22 0%,
            #ef5419 55%,
            #bd311b 100%
          );
          box-shadow: 0 8px 18px rgba(137, 56, 20, 0.18);
          animation-name: signupLeafFall;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }

        .signup-leaf-vein {
          position: absolute;
          left: 50%;
          top: 8%;
          width: 1px;
          height: 84%;
          border-radius: 999px;
          background: rgba(116, 39, 20, 0.45);
          transform: translateX(-50%) rotate(45deg);
        }

        .signup-tree {
          animation: signupTreeSway 5s ease-in-out infinite;
          transform-origin: bottom center;
        }

        .signup-grass {
          animation: signupGrassSway 3.8s ease-in-out infinite;
          transform-origin: bottom center;
        }

        .signup-card {
          animation: signupCardFloat 6s ease-in-out infinite;
        }

        .signup-glow {
          animation: signupGlow 5s ease-in-out infinite;
        }

        .signup-sun {
          animation: signupSunPulse 7s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .signup-tree,
          .signup-grass,
          .signup-card,
          .signup-glow,
          .signup-sun,
          .signup-leaf {
            animation: none !important;
          }
        }
      `}</style>

      {/* Sky background */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#d7e9f6_0%,#e8edf0_28%,#ffe6be_60%,#ffb647_100%)]" />

      {/* Soft animated clouds */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute left-[-8%] top-[9%] h-[105px] w-[300px] rounded-full bg-white/75 blur-[2px]"
          style={{
            animation: "signupCloudMove 13s ease-in-out infinite",
          }}
        />
        <div
          className="absolute right-[-5%] top-[18%] h-[85px] w-[250px] rounded-full bg-white/60 blur-[3px]"
          style={{
            animation: "signupCloudMoveTwo 17s ease-in-out infinite",
          }}
        />
        <div
          className="absolute left-[31%] top-[5%] h-[75px] w-[230px] rounded-full bg-white/55 blur-[5px]"
          style={{
            animation: "signupCloudMove 18s ease-in-out infinite",
          }}
        />
      </div>

      {/* Sun */}
      <div className="signup-sun pointer-events-none absolute left-1/2 top-[15%] h-[170px] w-[170px] -translate-x-1/2 rounded-full bg-[#fff8d9]/80 blur-[2px] shadow-[0_0_80px_rgba(255,230,137,0.5)] sm:h-[230px] sm:w-[230px]" />

      {/* Hills */}
      <div className="absolute bottom-[24%] left-[-8%] h-[180px] w-[75%] rotate-[-6deg] rounded-[50%] bg-[#f6d99e]/70 blur-[1px]" />
      <div className="absolute bottom-[19%] right-[-12%] h-[220px] w-[77%] rotate-[7deg] rounded-[50%] bg-[#edc57f]/70 blur-[1px]" />

      {/* Ground */}
      <div className="absolute bottom-0 h-[30%] w-full bg-[linear-gradient(180deg,#ffca67_0%,#ffae43_48%,#ff922d_100%)]" />

      {/* Trees */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Left tree */}
        <div className="signup-tree absolute bottom-[17%] left-[-4%] hidden h-[650px] w-[270px] sm:block">
          <div className="absolute bottom-0 left-[92px] h-[490px] w-[55px] rounded-[50%] bg-[#8e3025]" />
          <div className="absolute bottom-[375px] left-[65px] h-[160px] w-[38px] rotate-[30deg] rounded-full bg-[#8e3025]" />
          <div className="absolute bottom-[305px] left-[112px] h-[200px] w-[38px] rotate-[-30deg] rounded-full bg-[#8e3025]" />

          <div className="absolute left-[0px] top-[30px] h-[165px] w-[270px] rounded-[45%] bg-[#ff5918]" />
          <div className="absolute left-[30px] top-[-10px] h-[150px] w-[200px] rounded-[50%] bg-[#ff671c]" />
          <div className="absolute left-[54px] top-[90px] h-[110px] w-[180px] rounded-[45%] bg-[#e14a25]" />
        </div>

        {/* Right tree */}
        <div className="signup-tree absolute bottom-[16%] right-[-7%] hidden h-[700px] w-[300px] sm:block">
          <div className="absolute bottom-0 right-[100px] h-[530px] w-[65px] rounded-[50%] bg-[#873029]" />
          <div className="absolute bottom-[400px] right-[125px] h-[180px] w-[40px] rotate-[34deg] rounded-full bg-[#873029]" />
          <div className="absolute bottom-[325px] right-[82px] h-[215px] w-[38px] rotate-[-31deg] rounded-full bg-[#873029]" />

          <div className="absolute right-[0px] top-[22px] h-[180px] w-[300px] rounded-[45%] bg-[#ff5716]" />
          <div className="absolute right-[30px] top-[-10px] h-[155px] w-[220px] rounded-[50%] bg-[#ff6a1d]" />
          <div className="absolute right-[80px] top-[105px] h-[105px] w-[175px] rounded-[45%] bg-[#e24c28]" />
        </div>
      </div>

      {/* Floating leaves */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {leafStyles.map((leaf, index) => (
          <span
            key={index}
            className="signup-leaf"
            style={{
              left: leaf.left,
              animationDelay: leaf.delay,
              animationDuration: leaf.duration,
            }}
          >
            <LeafShape size={leaf.size} rotation={leaf.rotation} />
          </span>
        ))}
      </div>

      {/* Decorative ground leaves */}
      <div className="pointer-events-none absolute bottom-0 left-0 h-[150px] w-[260px]">
        <div className="absolute bottom-0 left-0 h-[115px] w-[180px] rounded-t-[80%] bg-[#a42d20]" />
        <div className="absolute bottom-[25px] left-[80px] h-[85px] w-[90px] rounded-t-[70%] bg-[#d83d21]" />
        <div className="absolute bottom-[20px] left-[35px] h-[50px] w-[50px] rounded-full bg-[#f1671f]" />
      </div>

      <div className="pointer-events-none absolute bottom-0 right-0 h-[160px] w-[300px]">
        <div className="absolute bottom-0 right-0 h-[120px] w-[210px] rounded-t-[80%] bg-[#8d2821]" />
        <div className="absolute bottom-[30px] right-[90px] h-[100px] w-[95px] rounded-t-[70%] bg-[#d74321]" />
        <div className="absolute bottom-[55px] right-[38px] h-[55px] w-[55px] rounded-full bg-[#f36b1c]" />
      </div>

      {/* Small grass strokes */}
      <div className="signup-grass pointer-events-none absolute bottom-[7%] left-[26%] hidden h-[70px] w-[70px] sm:block">
        <span className="absolute bottom-0 left-1/2 h-[55px] w-[8px] rotate-[-28deg] rounded-full bg-[#ca641d]" />
        <span className="absolute bottom-0 left-1/2 h-[60px] w-[8px] rotate-[22deg] rounded-full bg-[#d16b1d]" />
        <span className="absolute bottom-0 left-[32%] h-[48px] w-[7px] rotate-[-8deg] rounded-full bg-[#dc721d]" />
      </div>

      {/* Top navigation / logo */}
      <div className="relative z-30 mx-auto flex w-full max-w-[1440px] items-center justify-between px-5 py-5 sm:px-8 lg:px-12">
        <Link href="/" className="inline-flex items-center gap-2.5">
          <span className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-[11px] bg-[#111827] shadow-[0_10px_28px_rgba(17,24,39,0.18)]">
            <span className="absolute left-[8px] top-[8px] h-[18px] w-[18px] rounded-[5px] border-2 border-white" />
            <span className="absolute left-[13px] top-[13px] h-[7px] w-[7px] rounded-full bg-[#59dbc6]" />
          </span>

          <span className="text-[23px] font-semibold tracking-[-0.055em] text-[#142230]">
            Tutors<span className="text-[#1ab89f]">Que</span>
          </span>
        </Link>

        <Link
          href="/login"
          className="rounded-full border border-white/75 bg-white/30 px-4 py-2 text-sm font-semibold text-[#334a5c] shadow-[0_8px_24px_rgba(69,90,108,0.08)] backdrop-blur-xl transition hover:bg-white/50"
        >
          Already have an account?
        </Link>
      </div>

      {/* Signup content */}
      <section className="relative z-20 flex min-h-[calc(100vh-85px)] items-center justify-center px-4 pb-12 pt-2 sm:px-6 sm:pb-16">
        <div className="w-full max-w-[520px]">
          {/* Heading */}
          <div className="mb-5 text-center">
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/65 bg-white/30 px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#516677] backdrop-blur-xl">
              <SparkleIcon />
              Start your journey
            </div>

            <h1 className="mt-4 text-[40px] font-semibold tracking-[-0.06em] text-[#172536] sm:text-[48px]">
              Create your account
            </h1>

            <p className="mx-auto mt-2 max-w-[390px] text-sm leading-6 text-[#536979]/85">
              Join TutorsQue and discover a better way to learn or teach
              online.
            </p>
          </div>

          {/* Glass card */}
          <div className="signup-card relative overflow-hidden rounded-[32px] border border-white/75 bg-white/25 p-3 shadow-[0_35px_100px_rgba(75,99,122,0.22)] backdrop-blur-[28px]">
            <div className="signup-glow pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-white/50 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-24 h-60 w-60 rounded-full bg-[#72dfcd]/20 blur-3xl" />

            <div className="relative rounded-[25px] border border-white/55 bg-white/20 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] sm:p-7">
              {/* Account type */}
              <div className="mb-6">
                <p className="mb-2 pl-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-[#506475]">
                  I&apos;m joining as
                </p>

                <div className="grid grid-cols-2 gap-2 rounded-2xl border border-white/60 bg-white/25 p-1.5">
                  <button
                    type="button"
                    onClick={() => setAccountType("student")}
                    className={`rounded-xl px-3 py-3 text-sm font-semibold transition ${
                      accountType === "student"
                        ? "bg-white/85 text-[#182b3a] shadow-sm"
                        : "text-[#52697a] hover:bg-white/30"
                    }`}
                  >
                    Student / Parent
                  </button>

                  <button
                    type="button"
                    onClick={() => setAccountType("teacher")}
                    className={`rounded-xl px-3 py-3 text-sm font-semibold transition ${
                      accountType === "teacher"
                        ? "bg-white/85 text-[#182b3a] shadow-sm"
                        : "text-[#52697a] hover:bg-white/30"
                    }`}
                  >
                    Teacher
                  </button>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="fullName"
                      className="mb-2 block pl-1 text-xs font-semibold text-[#43596a]"
                    >
                      Full name
                    </label>

                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      autoComplete="name"
                      required
                      placeholder="Your name"
                      className="h-12 w-full rounded-[14px] border border-white/65 bg-white/55 px-4 text-sm text-[#162433] outline-none shadow-[inset_0_1px_0_rgba(255,255,255,0.85),0_8px_18px_rgba(72,93,112,0.06)] placeholder:text-[#718393]/70 focus:border-white focus:bg-white/75 focus:ring-2 focus:ring-[#54d9c1]/40"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-2 block pl-1 text-xs font-semibold text-[#43596a]"
                    >
                      Phone number
                    </label>

                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      required
                      placeholder="+91 XXXXX XXXXX"
                      className="h-12 w-full rounded-[14px] border border-white/65 bg-white/55 px-4 text-sm text-[#162433] outline-none shadow-[inset_0_1px_0_rgba(255,255,255,0.85),0_8px_18px_rgba(72,93,112,0.06)] placeholder:text-[#718393]/70 focus:border-white focus:bg-white/75 focus:ring-2 focus:ring-[#54d9c1]/40"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block pl-1 text-xs font-semibold text-[#43596a]"
                  >
                    Email address
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="you@example.com"
                    className="h-12 w-full rounded-[14px] border border-white/65 bg-white/55 px-4 text-sm text-[#162433] outline-none shadow-[inset_0_1px_0_rgba(255,255,255,0.85),0_8px_18px_rgba(72,93,112,0.06)] placeholder:text-[#718393]/70 focus:border-white focus:bg-white/75 focus:ring-2 focus:ring-[#54d9c1]/40"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="password"
                      className="mb-2 block pl-1 text-xs font-semibold text-[#43596a]"
                    >
                      Password
                    </label>

                    <div className="relative">
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="new-password"
                        required
                        minLength={8}
                        placeholder="Minimum 8 characters"
                        className="h-12 w-full rounded-[14px] border border-white/65 bg-white/55 px-4 pr-12 text-sm text-[#162433] outline-none shadow-[inset_0_1px_0_rgba(255,255,255,0.85),0_8px_18px_rgba(72,93,112,0.06)] placeholder:text-[#718393]/70 focus:border-white focus:bg-white/75 focus:ring-2 focus:ring-[#54d9c1]/40"
                      />

                      <button
                        type="button"
                        onClick={() => setShowPassword((value) => !value)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-2 text-[#5d7180] transition hover:bg-white/50"
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                      >
                        <EyeIcon open={showPassword} />
                      </button>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="mb-2 block pl-1 text-xs font-semibold text-[#43596a]"
                    >
                      Confirm password
                    </label>

                    <div className="relative">
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        autoComplete="new-password"
                        required
                        minLength={8}
                        placeholder="Repeat password"
                        className="h-12 w-full rounded-[14px] border border-white/65 bg-white/55 px-4 pr-12 text-sm text-[#162433] outline-none shadow-[inset_0_1px_0_rgba(255,255,255,0.85),0_8px_18px_rgba(72,93,112,0.06)] placeholder:text-[#718393]/70 focus:border-white focus:bg-white/75 focus:ring-2 focus:ring-[#54d9c1]/40"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword((value) => !value)
                        }
                        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-2 text-[#5d7180] transition hover:bg-white/50"
                        aria-label={
                          showConfirmPassword
                            ? "Hide confirm password"
                            : "Show confirm password"
                        }
                      >
                        <EyeIcon open={showConfirmPassword} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Student / Parent fields */}
                {accountType === "student" && (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="classLevel"
                        className="mb-2 block pl-1 text-xs font-semibold text-[#43596a]"
                      >
                        Class
                      </label>

                      <select
                        id="classLevel"
                        name="classLevel"
                        required
                        defaultValue=""
                        className="h-12 w-full rounded-[14px] border border-white/65 bg-white/55 px-4 text-sm text-[#162433] outline-none shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] focus:border-white focus:bg-white/75 focus:ring-2 focus:ring-[#54d9c1]/40"
                      >
                        <option value="" disabled>
                          Select class
                        </option>
                        {Array.from({ length: 10 }, (_, index) => (
                          <option key={index + 1} value={index + 1}>
                            {index + 1}
                            {index + 1 === 1
                              ? "st"
                              : index + 1 === 2
                                ? "nd"
                                : index + 1 === 3
                                  ? "rd"
                                  : "th"}{" "}
                            Class
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="board"
                        className="mb-2 block pl-1 text-xs font-semibold text-[#43596a]"
                      >
                        Board
                      </label>

                      <select
                        id="board"
                        name="board"
                        required
                        defaultValue=""
                        className="h-12 w-full rounded-[14px] border border-white/65 bg-white/55 px-4 text-sm text-[#162433] outline-none shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] focus:border-white focus:bg-white/75 focus:ring-2 focus:ring-[#54d9c1]/40"
                      >
                        <option value="" disabled>
                          Select board
                        </option>
                        <option value="ap-state-board">
                          Andhra Pradesh State Board
                        </option>
                        <option value="cbse">CBSE</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* Teacher fields */}
                {accountType === "teacher" && (
                  <>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="qualification"
                          className="mb-2 block pl-1 text-xs font-semibold text-[#43596a]"
                        >
                          Qualification
                        </label>

                        <input
                          id="qualification"
                          name="qualification"
                          type="text"
                          required
                          placeholder="B.Ed / M.Sc / etc."
                          className="h-12 w-full rounded-[14px] border border-white/65 bg-white/55 px-4 text-sm text-[#162433] outline-none shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] placeholder:text-[#718393]/70 focus:border-white focus:bg-white/75 focus:ring-2 focus:ring-[#54d9c1]/40"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="experience"
                          className="mb-2 block pl-1 text-xs font-semibold text-[#43596a]"
                        >
                          Experience
                        </label>

                        <input
                          id="experience"
                          name="experience"
                          type="number"
                          min="0"
                          max="60"
                          required
                          placeholder="Years"
                          className="h-12 w-full rounded-[14px] border border-white/65 bg-white/55 px-4 text-sm text-[#162433] outline-none shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] placeholder:text-[#718393]/70 focus:border-white focus:bg-white/75 focus:ring-2 focus:ring-[#54d9c1]/40"
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="teacherBoard"
                          className="mb-2 block pl-1 text-xs font-semibold text-[#43596a]"
                        >
                          Board
                        </label>

                        <select
                          id="teacherBoard"
                          name="teacherBoard"
                          required
                          defaultValue=""
                          className="h-12 w-full rounded-[14px] border border-white/65 bg-white/55 px-4 text-sm text-[#162433] outline-none focus:border-white focus:bg-white/75 focus:ring-2 focus:ring-[#54d9c1]/40"
                        >
                          <option value="" disabled>
                            Select board
                          </option>
                          <option value="ap-state-board">
                            Andhra Pradesh State Board
                          </option>
                          <option value="cbse">CBSE</option>
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor="subject"
                          className="mb-2 block pl-1 text-xs font-semibold text-[#43596a]"
                        >
                          Main subject
                        </label>

                        <select
                          id="subject"
                          name="subject"
                          required
                          defaultValue=""
                          className="h-12 w-full rounded-[14px] border border-white/65 bg-white/55 px-4 text-sm text-[#162433] outline-none focus:border-white focus:bg-white/75 focus:ring-2 focus:ring-[#54d9c1]/40"
                        >
                          <option value="" disabled>
                            Select subject
                          </option>
                          <option value="mathematics">Mathematics</option>
                          <option value="science">Science</option>
                          <option value="english">English</option>
                          <option value="telugu">Telugu</option>
                          <option value="hindi">Hindi</option>
                          <option value="social-studies">
                            Social Studies
                          </option>
                        </select>
                      </div>
                    </div>
                  </>
                )}

                <label className="flex cursor-pointer items-start gap-3 px-1 pt-1 text-xs leading-5 text-[#536a7b]">
                  <input
                    type="checkbox"
                    checked={acceptedTerms}
                    onChange={(event) =>
                      setAcceptedTerms(event.target.checked)
                    }
                    className="mt-0.5 h-4 w-4 shrink-0 rounded accent-[#30c7b0]"
                  />

                  <span>
                    I agree to the TutorsQue{" "}
                    <Link
                      href="/terms"
                      className="font-semibold text-[#169c86] hover:text-[#0c7d6a]"
                    >
                      Terms
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/privacy"
                      className="font-semibold text-[#169c86] hover:text-[#0c7d6a]"
                    >
                      Privacy Policy
                    </Link>
                    .
                  </span>
                </label>

                <button
                  type="submit"
                  className="mt-2 flex h-13 w-full items-center justify-center gap-2 rounded-full border border-white/80 bg-white/75 px-6 text-[14px] font-semibold text-[#1b2d3c] shadow-[0_14px_32px_rgba(60,86,107,0.14),inset_0_1px_0_rgba(255,255,255,0.95)] backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:bg-white/90 active:translate-y-0"
                >
                  Create account
                  <ArrowIcon />
                </button>

                {!acceptedTerms && (
                  <p className="text-center text-[11px] text-[#6b7f8d]">
                    Please accept the terms to continue.
                  </p>
                )}

                {submitted && (
                  <div className="rounded-[14px] border border-white/70 bg-white/45 px-4 py-3 text-center text-xs leading-5 text-[#486072]">
                    Account creation will be connected to the FastAPI
                    authentication service in the backend phase.
                  </div>
                )}
              </form>

              <div className="my-6 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#637887]/65">
                <span className="h-px flex-1 bg-white/60" />
                or
                <span className="h-px flex-1 bg-white/60" />
              </div>

              <p className="text-center text-sm text-[#526979]">
                Already registered?{" "}
                <Link
                  href="/login"
                  className="font-semibold text-[#169c86] transition hover:text-[#0b7b69]"
                >
                  Log in
                </Link>
              </p>
            </div>
          </div>

          <p className="mx-auto mt-5 max-w-[430px] text-center text-[10px] leading-5 text-[#5f7483]/70">
            TutorsQue is designed for students, parents and verified teachers
            participating in online learning.
          </p>
        </div>
      </section>
    </main>
  );
}