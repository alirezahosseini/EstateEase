import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const towerRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.to(containerRef.current, {
            opacity: 0,
            y: -40,
            duration: 0.7,
            ease: "power2.inOut",
            onComplete,
          });
        },
      });

      // Animate floors lighting up from bottom to top
      tl.fromTo(
        ".tower-floor",
        { scaleY: 0, opacity: 0, transformOrigin: "50% 100%" },
        {
          scaleY: 1,
          opacity: 1,
          duration: 0.45,
          stagger: 0.12,
          ease: "back.out(1.7)",
        }
      )
        .to(
          ".tower-window",
          {
            fill: "#60a5fa",
            opacity: 1,
            duration: 0.3,
            stagger: 0.04,
            ease: "power1.out",
          },
          "-=0.3"
        )
        .to(
          ".tower-spire",
          {
            scaleY: 1,
            opacity: 1,
            duration: 0.5,
            ease: "elastic.out(1, 0.5)",
          },
          "-=0.2"
        )
        .to(
          ".tower-ring",
          {
            stroke: "#2563eb",
            strokeWidth: 3,
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: "power2.out",
          },
          "-=0.3"
        )
        .to(
          ".loader-text",
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
          },
          "-=0.4"
        )
        .to({}, { duration: 0.6 });
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#eef0f4]"
    >
      <svg
        ref={towerRef}
        width="140"
        height="220"
        viewBox="0 0 140 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mb-8"
      >
        {/* Ground base */}
        <ellipse
          cx="70"
          cy="205"
          rx="52"
          ry="8"
          className="tower-ring"
          stroke="#cbd5e1"
          strokeWidth="2"
          fill="#f8fafc"
          opacity="0.6"
        />
        {/* Tower body floors */}
        <g className="tower-floors">
          {/* Floor 1 */}
          <rect
            x="35"
            y="165"
            width="70"
            height="35"
            rx="6"
            className="tower-floor"
            fill="#2563eb"
            opacity="0"
          />
          <rect x="45" y="172" width="10" height="10" rx="2" className="tower-window" fill="#1e40af" opacity="0.4" />
          <rect x="65" y="172" width="10" height="10" rx="2" className="tower-window" fill="#1e40af" opacity="0.4" />
          <rect x="85" y="172" width="10" height="10" rx="2" className="tower-window" fill="#1e40af" opacity="0.4" />

          {/* Floor 2 */}
          <rect
            x="40"
            y="125"
            width="60"
            height="38"
            rx="6"
            className="tower-floor"
            fill="#3b82f6"
            opacity="0"
          />
          <rect x="48" y="133" width="9" height="11" rx="2" className="tower-window" fill="#1d4ed8" opacity="0.4" />
          <rect x="66" y="133" width="9" height="11" rx="2" className="tower-window" fill="#1d4ed8" opacity="0.4" />
          <rect x="84" y="133" width="9" height="11" rx="2" className="tower-window" fill="#1d4ed8" opacity="0.4" />

          {/* Floor 3 */}
          <rect
            x="45"
            y="85"
            width="50"
            height="38"
            rx="6"
            className="tower-floor"
            fill="#60a5fa"
            opacity="0"
          />
          <rect x="52" y="93" width="8" height="11" rx="2" className="tower-window" fill="#2563eb" opacity="0.4" />
          <rect x="66" y="93" width="8" height="11" rx="2" className="tower-window" fill="#2563eb" opacity="0.4" />
          <rect x="80" y="93" width="8" height="11" rx="2" className="tower-window" fill="#2563eb" opacity="0.4" />

          {/* Floor 4 */}
          <rect
            x="50"
            y="48"
            width="40"
            height="35"
            rx="6"
            className="tower-floor"
            fill="#93c5fd"
            opacity="0"
          />
          <rect x="58" y="56" width="7" height="10" rx="2" className="tower-window" fill="#3b82f6" opacity="0.4" />
          <rect x="75" y="56" width="7" height="10" rx="2" className="tower-window" fill="#3b82f6" opacity="0.4" />
        </g>
        {/* Spire */}
        <path
          d="M70 48 L70 18"
          className="tower-spire"
          stroke="#2563eb"
          strokeWidth="4"
          strokeLinecap="round"
          opacity="0"
          style={{ transformOrigin: "70px 48px", transform: "scaleY(0)" }}
        />
        <circle cx="70" cy="14" r="5" className="tower-spire" fill="#f59e0b" opacity="0" />
        {/* Decorative rings */}
        <ellipse
          cx="70"
          cy="165"
          rx="38"
          ry="5"
          className="tower-ring"
          stroke="#bfdbfe"
          strokeWidth="1.5"
          fill="none"
          opacity="0.4"
        />
        <ellipse
          cx="70"
          cy="125"
          rx="33"
          ry="4"
          className="tower-ring"
          stroke="#bfdbfe"
          strokeWidth="1.5"
          fill="none"
          opacity="0.4"
        />
      </svg>

      <div className="loader-text translate-y-3 opacity-0 text-center">
        <h2 className="text-2xl font-bold text-slate-900">EstateEase</h2>
        <p className="mt-2 text-sm font-medium text-slate-500">
          Building your experience…
        </p>
      </div>
    </div>
  );
}
