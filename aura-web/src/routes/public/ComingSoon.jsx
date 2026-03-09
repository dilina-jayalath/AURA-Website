import React, { useEffect, useRef } from "react";
import { logos } from "../../assets";
import gsap from "gsap";

function ComingSoon() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Ambient background blob float
      gsap.to(".bg-blob-1", {
        y: 40,
        x: -30,
        duration: 7,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });
      gsap.to(".bg-blob-2", {
        y: -40,
        x: 30,
        duration: 9,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });

      // Staggered entrance for supporting elements
      gsap.fromTo(
        ".fade-up",
        { y: 36, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.14, ease: "power3.out", delay: 0.5 }
      );

      // Heading — large entrance then continuous gentle float
      gsap.fromTo(
        ".hero-heading",
        { y: 60, opacity: 0, scale: 0.96 },
        {
          y: 0, opacity: 1, scale: 1, duration: 1.6, ease: "expo.out", delay: 0.2,
          onComplete: () => {
            gsap.to(".hero-heading", {
              y: -12,
              duration: 4,
              yoyo: true,
              repeat: -1,
              ease: "sine.inOut",
            });
          }
        }
      );

      // Continuous gradient shine on "coming soon"
      gsap.to(".shine-text", {
        backgroundPosition: "200% center",
        duration: 7,
        ease: "none",
        repeat: -1,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative isolate flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-base-100 px-8 py-24 sm:px-16 lg:px-24 selection:bg-primary/20"
    >
      {/* Ambient blobs */}
      <div
        aria-hidden="true"
        className="bg-blob-1 pointer-events-none absolute -top-40 left-1/4 -z-10 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-primary/10 blur-[160px]"
      />
      <div
        aria-hidden="true"
        className="bg-blob-2 pointer-events-none absolute -bottom-40 right-1/4 -z-10 h-[600px] w-[600px] translate-x-1/2 rounded-full bg-secondary/10 blur-[160px]"
      />

      {/* === Inner layout — full‑width, left‑aligned like Apple / Tailwind === */}
      <div className="w-full max-w-screen-2xl mx-auto flex flex-col items-start">

        {/* Logo */}
        <div className="fade-up opacity-0 mb-14">
          <img
            src={logos.aura}
            alt="AURA"
            className="h-12 w-auto sm:h-14 opacity-90 hover:opacity-100 transition-opacity duration-500"
          />
        </div>

        {/* Status pill */}
        <div className="fade-up opacity-0 mb-10">
          <span className="inline-flex items-center gap-2.5 rounded-full border border-base-content/10 bg-base-content/5 px-5 py-2 text-sm font-medium text-base-content/75 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            In Development
          </span>
        </div>

        {/* Hero heading */}
        <h1 className="hero-heading opacity-0 w-full text-left font-light tracking-tighter text-base-content leading-[1.03] mb-12
                       text-[clamp(3rem,9vw,9rem)]">
          Something great is
          <br />
          <span className="shine-text font-semibold text-transparent bg-clip-text
                           bg-gradient-to-r from-primary via-secondary to-primary
                           bg-[length:200%_auto]">
            coming soon.
          </span>
        </h1>

        {/* Divider */}
        <div className="fade-up opacity-0 w-full border-t border-base-content/10 mb-10" />

        {/* Two‑column description row */}
        <div className="fade-up opacity-0 w-full grid grid-cols-1 md:grid-cols-2 gap-10 mb-14">
          <p className="text-xl sm:text-2xl font-light text-base-content/65 leading-relaxed">
            We are actively building this experience. Please check back soon for the full launch.
          </p>
          <p className="text-lg sm:text-xl font-light text-base-content/45 leading-relaxed">
            AURA builds adaptive, accessible user experiences with intelligent personalization.
            We're currently collecting real user feedback to improve the platform.
          </p>
        </div>

        {/* CTA */}
        <div className="fade-up opacity-0">
          <a
            href="https://aura-dataset-collection-survey.vercel.app/"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-3 rounded-full bg-base-content
                       px-9 py-4 text-base font-medium text-base-100
                       transition-all duration-300 hover:scale-105 hover:shadow-2xl
                       hover:shadow-base-content/10 active:scale-95"
          >
            Support Data Collection Survey
            <svg
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

export default ComingSoon;
