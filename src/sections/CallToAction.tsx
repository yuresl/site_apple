import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CallToAction() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const finePrintRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Headline word reveal
      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll('.word');
        gsap.fromTo(
          words,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: headlineRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Subheadline fade in
      gsap.fromTo(
        subheadlineRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: subheadlineRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // CTA buttons pop in
      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current.children,
          { opacity: 0, y: 30, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.4,
            stagger: 0.1,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: ctaRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Fine print fade in
      gsap.fromTo(
        finePrintRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.4,
          ease: 'smooth',
          scrollTrigger: {
            trigger: finePrintRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Background gradient shift on scroll
      gsap.to(contentRef.current, {
        backgroundPosition: '100% 100%',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const headlineText = 'Your new favorite device.';
  const headlineWords = headlineText.split(' ').map((word, i) => (
    <span key={i} className="word inline-block mr-[0.25em]">
      {word}
    </span>
  ));

  return (
    <section
      ref={sectionRef}
      id="buy"
      className="relative py-24 md:py-32 lg:py-40 overflow-hidden"
    >
      {/* Animated gradient background */}
      <div
        ref={contentRef}
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 30% 30%, #F5F5F7 0%, #FFFFFF 50%, #E8E8ED 100%)',
          backgroundSize: '200% 200%',
          backgroundPosition: '0% 0%',
        }}
      />

      {/* Floating accent shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-[20%] left-[15%] w-64 h-64 rounded-full animate-float-slow opacity-40"
          style={{
            background: 'radial-gradient(circle, rgba(0,113,227,0.08) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute bottom-[20%] right-[15%] w-48 h-48 rounded-full animate-float opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(0,113,227,0.06) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center section-padding">
        <h2
          ref={headlineRef}
          className="text-section md:text-5xl lg:text-6xl text-[#1D1D1F] mb-4"
        >
          {headlineWords}
        </h2>

        <p
          ref={subheadlineRef}
          className="text-xl md:text-2xl text-[#86868B] mb-10"
        >
          Available starting at <span className="text-[#1D1D1F] font-semibold">$999</span>
        </p>

        <div ref={ctaRef} className="flex flex-wrap items-center justify-center gap-4 mb-8">
          <button className="btn-primary px-8 py-4 text-lg animate-float-slow">
            Buy
          </button>
          <button className="btn-secondary px-8 py-4 text-lg">
            Learn more
          </button>
        </div>

        <p ref={finePrintRef} className="text-caption">
          Trade-in credit available.{' '}
          <a href="#" className="text-[#0071E3] hover:underline">
            Terms apply
          </a>
          .
        </p>
      </div>
    </section>
  );
}
