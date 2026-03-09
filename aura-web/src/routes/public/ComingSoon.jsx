import React, { useEffect, useRef } from "react";
import { logos } from "../../assets";
import gsap from "gsap";

function ComingSoon() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Gentle background breathing effect
      gsap.to(".bg-blob-1", {
        y: "30px",
        x: "-30px",
        scale: 1.05,
        duration: 6,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut"
      });

      gsap.to(".bg-blob-2", {
        y: "-30px",
        x: "30px",
        scale: 1.05,
        duration: 7,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut"
      });

      // Smooth staggered entrance for all items
      gsap.fromTo(
        ".animate-item",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: "power3.out",
          delay: 0.2
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-base-100 px-6 py-16 lg:px-8 font-sans selection:bg-primary/30"
    >
      {/* Abstract Background Blurs */}
      <div
        aria-hidden="true"
        className="bg-blob-1 pointer-events-none absolute left-1/3 top-0 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="bg-blob-2 pointer-events-none absolute bottom-0 right-1/3 -z-10 h-[500px] w-[500px] translate-x-1/3 translate-y-1/3 rounded-full bg-secondary/10 blur-[120px]"
      />

      <div className="mx-auto max-w-5xl text-center">
        {/* Logo */}
        <div className="animate-item opacity-0 flex justify-center mb-10">
          <img
            src={logos.aura}
            alt="AURA logo"
            className="h-14 w-auto sm:h-32 drop-shadow-sm transition-transform hover:scale-105 duration-500"
          />
        </div>

        {/* Status Badge */}
        <div className="animate-item opacity-0 mb-8">
          <span className="inline-flex items-center gap-2.5 rounded-full border border-base-content/10 bg-base-content/5 px-4 py-1.5 text-sm font-medium text-base-content/80 backdrop-blur-md transition-colors hover:bg-base-content/10">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            In Development
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="animate-item opacity-0 text-5xl font-light tracking-tight text-balance text-base-content sm:text-7xl mb-8">
          Something great is{" "}
          <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
            coming soon
          </span>
        </h1>

        {/* Subtitle */}
        <p className="animate-item opacity-0 text-lg text-pretty text-base-content/70 sm:text-xl font-light mb-8 max-w-xl mx-auto">
          We are actively building this experience. Please check back soon for
          the full launch.
        </p>

        {/* Description */}
        <p className="animate-item opacity-0 mx-auto mt-6 max-w-4xl text-base text-base-content/50 sm:text-lg font-light leading-relaxed mb-12">
          AURA is focused on building adaptive, accessible user experiences with
          intelligent personalization. We are currently collecting real user
          feedback and interaction data to improve the platform.
        </p>

        {/* CTA Button */}
        <div className="animate-item opacity-0">
          <a
            href="https://aura-dataset-collection-survey.vercel.app/"
            target="_blank"
            rel="noreferrer"
            className="group relative inline-flex items-center justify-center gap-3 rounded-full bg-base-content px-8 py-4 text-sm font-medium text-base-100 transition-all hover:scale-105 hover:shadow-xl hover:shadow-base-content/10 active:scale-95"
          >
            <span>Support Data Collection Survey</span>
            <svg
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5"
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
