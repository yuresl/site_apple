import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronUp } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const footerLinks = [
  {
    title: 'Shop',
    links: ['Store', 'Mac', 'iPad', 'iPhone', 'Watch', 'Vision', 'AirPods'],
  },
  {
    title: 'Account',
    links: ['Manage Your Apple ID', 'Apple Store Account', 'iCloud.com'],
  },
  {
    title: 'Entertainment',
    links: ['Apple One', 'Apple TV+', 'Apple Music', 'Apple Arcade', 'Apple Fitness+'],
  },
  {
    title: 'Business',
    links: ['Apple and Business', 'Shop for Business'],
  },
  {
    title: 'Support',
    links: ['Apple Support', 'Service and Repair', 'User Guides'],
  },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const topBorderRef = useRef<HTMLDivElement>(null);
  const columnsRef = useRef<HTMLDivElement>(null);
  const bottomBarRef = useRef<HTMLDivElement>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Top border draw animation
      gsap.fromTo(
        topBorderRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.6,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Columns staggered animation
      const columns = columnsRef.current?.querySelectorAll('.footer-column');
      if (columns) {
        gsap.fromTo(
          columns,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.05,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: columnsRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Bottom bar fade in
      gsap.fromTo(
        bottomBarRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.4,
          ease: 'smooth',
          scrollTrigger: {
            trigger: bottomBarRef.current,
            start: 'top 95%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, footerRef);

    // Back to top button visibility
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      ctx.revert();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      ref={footerRef}
      className="relative bg-[#F5F5F7] pt-16 pb-8"
    >
      {/* Top border with gradient */}
      <div
        ref={topBorderRef}
        className="absolute top-0 left-1/2 w-full max-w-[1400px] h-px origin-center"
        style={{
          transform: 'translateX(-50%)',
          background: 'linear-gradient(90deg, transparent 0%, #D2D2D7 20%, #D2D2D7 80%, transparent 100%)',
        }}
      />

      <div className="max-w-[1400px] mx-auto section-padding">
        {/* Footer Links Grid */}
        <div
          ref={columnsRef}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-12"
        >
          {footerLinks.map((column) => (
            <div key={column.title} className="footer-column">
              <h4 className="font-semibold text-[#1D1D1F] text-sm mb-4">
                {column.title}
              </h4>
              <ul className="space-y-2">
                {column.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-[#86868B] hover:text-[#1D1D1F] transition-all duration-200 hover:translate-x-1 inline-block"
                      style={{ transitionTimingFunction: 'var(--ease-smooth)' }}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div
          ref={bottomBarRef}
          className="pt-8 border-t border-[#D2D2D7]"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Copyright */}
            <div className="text-sm text-[#86868B]">
              <p>Copyright &copy; {new Date().getFullYear()} Apple Inc. All rights reserved.</p>
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <a
                href="#"
                className="text-[#86868B] hover:text-[#1D1D1F] transition-colors duration-200"
              >
                Privacy Policy
              </a>
              <span className="text-[#D2D2D7]">|</span>
              <a
                href="#"
                className="text-[#86868B] hover:text-[#1D1D1F] transition-colors duration-200"
              >
                Terms of Use
              </a>
              <span className="text-[#D2D2D7]">|</span>
              <a
                href="#"
                className="text-[#86868B] hover:text-[#1D1D1F] transition-colors duration-200"
              >
                Site Map
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 w-12 h-12 rounded-full bg-[#1D1D1F] text-white flex items-center justify-center shadow-lg transition-all duration-500 z-50 ${
          showBackToTop
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
        style={{ transitionTimingFunction: 'var(--ease-spring)' }}
        aria-label="Back to top"
      >
        <ChevronUp className="w-5 h-5" />
      </button>
    </footer>
  );
}
