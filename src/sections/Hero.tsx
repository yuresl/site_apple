import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const preTitleRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const floatingShapesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial states
      gsap.set([preTitleRef.current, subtitleRef.current, descRef.current], {
        opacity: 0,
        y: 30,
      });
      gsap.set(titleRef.current, { opacity: 0 });
      gsap.set(imageRef.current, { opacity: 0, scale: 0.7, z: -200 });
      gsap.set(ctaRef.current?.children || [], { opacity: 0, y: 30, scale: 0.9 });
      gsap.set(floatingShapesRef.current?.children || [], { opacity: 0, scale: 0 });

      // Entrance timeline
      const tl = gsap.timeline({ delay: 0.3 });

      // Pre-title blur in
      tl.to(preTitleRef.current, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.6,
        ease: 'expo.out',
      });

      // Title character animation
      if (titleRef.current) {
        const chars = titleRef.current.querySelectorAll('.char');
        tl.to(
          chars,
          {
            opacity: 1,
            rotateX: 0,
            duration: 0.08,
            stagger: 0.06,
            ease: 'back.out(1.7)',
          },
          '-=0.3'
        );
      }

      // Subtitle typewriter effect
      tl.to(
        subtitleRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'expo.out',
        },
        '-=0.2'
      );

      // Description fade in
      tl.to(
        descRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'expo.out',
        },
        '-=0.4'
      );

      // Product image emergence
      tl.to(
        imageRef.current,
        {
          opacity: 1,
          scale: 1,
          z: 0,
          duration: 1,
          ease: 'power3.out',
        },
        '-=0.8'
      );

      // CTA buttons pop up
      tl.to(
        ctaRef.current?.children || [],
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.4,
          stagger: 0.1,
          ease: 'back.out(1.7)',
        },
        '-=0.5'
      );

      // Floating shapes
      tl.to(
        floatingShapesRef.current?.children || [],
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'expo.out',
        },
        '-=0.6'
      );

      // Scroll-triggered animations
      const scrollTriggers: ScrollTrigger[] = [];

      // Title letter spacing on scroll
      if (titleRef.current) {
        const st = ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top top',
          end: '30% top',
          scrub: 1,
          onUpdate: (self) => {
            if (titleRef.current) {
              gsap.to(titleRef.current, {
                letterSpacing: `${-0.03 + self.progress * 0.15}em`,
                duration: 0.1,
              });
            }
          },
        });
        scrollTriggers.push(st);
      }

      // Product image 3D rotation on scroll
      if (imageRef.current) {
        const st = ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top top',
          end: '50% top',
          scrub: 1,
          onUpdate: (self) => {
            if (imageRef.current) {
              gsap.to(imageRef.current, {
                rotateY: self.progress * 15,
                translateZ: self.progress * 100,
                duration: 0.1,
              });
            }
          },
        });
        scrollTriggers.push(st);
      }

      // Content fade out on scroll
      const contentElements = [preTitleRef.current, titleRef.current, subtitleRef.current, descRef.current, ctaRef.current];
      const st = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: '20% top',
        end: '60% top',
        scrub: 1,
        onUpdate: (self) => {
          contentElements.forEach((el) => {
            if (el) {
              gsap.to(el, {
                opacity: 1 - self.progress,
                y: -self.progress * 100,
                duration: 0.1,
              });
            }
          });
        },
      });
      scrollTriggers.push(st);

      // Product scale down
      if (imageRef.current) {
        const st2 = ScrollTrigger.create({
          trigger: sectionRef.current,
          start: '30% top',
          end: '80% top',
          scrub: 1,
          onUpdate: (self) => {
            if (imageRef.current) {
              gsap.to(imageRef.current, {
                scale: 1 - self.progress * 0.4,
                opacity: 1 - self.progress,
                duration: 0.1,
              });
            }
          },
        });
        scrollTriggers.push(st2);
      }

      return () => {
        scrollTriggers.forEach((st) => st.kill());
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Split title into characters
  const titleText = 'Vision Pro';
  const titleChars = titleText.split('').map((char, i) => (
    <span
      key={i}
      className="char inline-block"
      style={{
        opacity: 0,
        transform: 'rotateX(-90deg)',
        transformOrigin: 'center bottom',
      }}
    >
      {char === ' ' ? '\u00A0' : char}
    </span>
  ));

  return (
    <section
      ref={sectionRef}
      id="vision"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ perspective: '1200px' }}
    >
      {/* Animated gradient background */}
      <div
        className="absolute inset-0 animate-gradient"
        style={{
          background: 'linear-gradient(135deg, #F5F5F7 0%, #FFFFFF 25%, #E8E8ED 50%, #F0F0F5 75%, #F5F5F7 100%)',
          backgroundSize: '400% 400%',
        }}
      />

      {/* Floating accent shapes */}
      <div ref={floatingShapesRef} className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-[15%] left-[10%] w-32 h-32 rounded-full animate-float-slow"
          style={{ background: 'rgba(0, 113, 227, 0.06)' }}
        />
        <div
          className="absolute top-[25%] right-[15%] w-24 h-24 rounded-2xl animate-float"
          style={{ background: 'rgba(0, 0, 0, 0.03)' }}
        />
        <div
          className="absolute bottom-[30%] left-[20%] w-16 h-16 rounded-full animate-float"
          style={{ background: 'rgba(0, 113, 227, 0.04)' }}
        />
        <div
          className="absolute bottom-[20%] right-[10%] w-20 h-20 rounded-xl animate-float-slow"
          style={{ background: 'rgba(0, 0, 0, 0.02)' }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center section-padding pt-24 pb-16 max-w-5xl mx-auto">
        {/* Pre-title */}
        <p
          ref={preTitleRef}
          className="text-sm md:text-base font-medium text-[#86868B] uppercase tracking-widest mb-4"
          style={{ filter: 'blur(10px)' }}
        >
          Introducing
        </p>

        {/* Main Title */}
        <h1
          ref={titleRef}
          className="text-hero text-[#1D1D1F] mb-4 preserve-3d"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {titleChars}
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-subsection text-[#1D1D1F] mb-6"
        >
          Spatial computing. Now a reality.
        </p>

        {/* Description */}
        <p
          ref={descRef}
          className="text-body-large max-w-2xl mx-auto mb-10"
        >
          Experience your digital content in entirely new ways. Where the digital world blends seamlessly with your physical space.
        </p>

        {/* CTA Buttons */}
        <div ref={ctaRef} className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <a href="#features" className="btn-primary">
            Learn more
          </a>
          <a href="#buy" className="btn-secondary">
            Buy
          </a>
        </div>

        {/* Product Image */}
        <div
          ref={imageRef}
          className="relative mx-auto max-w-4xl preserve-3d animate-breathe"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <img
            src="/hero-product.jpg"
            alt="Vision Pro"
            className="w-full h-auto rounded-3xl shadow-2xl"
            style={{
              boxShadow: '0 40px 80px rgba(0, 0, 0, 0.15), 0 20px 40px rgba(0, 0, 0, 0.1)',
            }}
          />
          {/* Reflection overlay */}
          <div
            className="absolute inset-0 rounded-3xl pointer-events-none"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 50%, rgba(255,255,255,0.1) 100%)',
            }}
          />
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, #FFFFFF 0%, transparent 100%)',
        }}
      />
    </section>
  );
}
