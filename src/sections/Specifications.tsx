import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, Monitor, Cpu, Camera, Battery, Wifi, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const specCategories = [
  {
    id: 'display',
    title: 'Display',
    icon: Monitor,
    specs: [
      '6.7" Super Retina XDR display',
      'ProMotion technology with 120Hz',
      'Dynamic Island',
      'Always-On display',
      'HDR10 and Dolby Vision',
      '2796 x 1290 resolution at 460 ppi',
    ],
  },
  {
    id: 'performance',
    title: 'Performance',
    icon: Cpu,
    specs: [
      'A17 Pro chip with 6-core GPU',
      'Hardware-accelerated ray tracing',
      '16-core Neural Engine',
      'Up to 1TB storage',
      'USB-C with USB 3 support',
      'Up to 2x faster machine learning',
    ],
  },
  {
    id: 'camera',
    title: 'Camera System',
    icon: Camera,
    specs: [
      '48MP Main camera with sensor-shift OIS',
      '12MP Ultra Wide with macro photography',
      '12MP Telephoto with 5x optical zoom',
      'ProRAW and ProRes support',
      'Spatial video capture',
      'Action mode for smooth handheld video',
    ],
  },
  {
    id: 'battery',
    title: 'Battery & Power',
    icon: Battery,
    specs: [
      'Up to 29 hours video playback',
      'MagSafe wireless charging up to 15W',
      'Qi wireless charging up to 7.5W',
      'Fast charging: 50% in 30 minutes',
      'USB-C Charge Cable included',
    ],
  },
  {
    id: 'connectivity',
    title: 'Connectivity',
    icon: Wifi,
    specs: [
      '5G capable',
      'Gigabit LTE with 4x4 MIMO',
      'Wi-Fi 6E (802.11ax)',
      'Bluetooth 5.3',
      'Ultra Wideband chip',
      'NFC with reader mode',
    ],
  },
  {
    id: 'features',
    title: 'Additional Features',
    icon: Sparkles,
    specs: [
      'Face ID facial recognition',
      'Action Button customizable shortcut',
      'Emergency SOS via satellite',
      'Crash Detection',
      'Ceramic Shield front',
      'IP68 water resistance',
    ],
  },
];

export default function Specifications() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const columnsRef = useRef<HTMLDivElement>(null);
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['display']);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Columns staggered animation
      const columns = columnsRef.current?.querySelectorAll('.spec-column');
      if (columns) {
        gsap.fromTo(
          columns,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: columnsRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Parallax effect on columns
      if (columns) {
        columns.forEach((column) => {
          gsap.to(column, {
            y: -20,
            ease: 'none',
            scrollTrigger: {
              trigger: column,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  // Split categories into 3 columns
  const columns = [
    specCategories.slice(0, 2),
    specCategories.slice(2, 4),
    specCategories.slice(4, 6),
  ];

  return (
    <section
      ref={sectionRef}
      id="mac"
      className="relative py-20 md:py-28 lg:py-32 bg-[#F5F5F7]"
    >
      <div className="max-w-[1400px] mx-auto section-padding">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-16">
          <h2 className="text-section text-[#1D1D1F] mb-4">
            Tech Specs
          </h2>
          <p className="text-body-large max-w-2xl mx-auto">
            Every detail designed for performance, efficiency, and beauty.
          </p>
        </div>

        {/* Specs Grid */}
        <div
          ref={columnsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {columns.map((column, columnIndex) => (
            <div key={columnIndex} className="spec-column space-y-4">
              {column.map((category) => {
                const Icon = category.icon;
                const isExpanded = expandedCategories.includes(category.id);

                return (
                  <div
                    key={category.id}
                    className="bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-md"
                    style={{ transitionTimingFunction: 'var(--ease-spring)' }}
                  >
                    {/* Category Header */}
                    <button
                      onClick={() => toggleCategory(category.id)}
                      className="w-full flex items-center justify-between p-5 text-left transition-colors duration-200 hover:bg-[#F5F5F7]"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#F5F5F7] flex items-center justify-center">
                          <Icon className="w-5 h-5 text-[#0071E3]" />
                        </div>
                        <span className="font-semibold text-[#1D1D1F]">
                          {category.title}
                        </span>
                      </div>
                      <ChevronDown
                        className={`w-5 h-5 text-[#86868B] transition-transform duration-300 ${
                          isExpanded ? 'rotate-180' : ''
                        }`}
                        style={{ transitionTimingFunction: 'var(--ease-spring)' }}
                      />
                    </button>

                    {/* Expandable Content */}
                    <div
                      className={`overflow-hidden transition-all duration-400 ${
                        isExpanded ? 'max-h-96' : 'max-h-0'
                      }`}
                      style={{ transitionTimingFunction: 'var(--ease-smooth)' }}
                    >
                      <div className="px-5 pb-5 pt-0">
                        <ul className="space-y-2">
                          {category.specs.map((spec, specIndex) => (
                            <li
                              key={specIndex}
                              className="text-sm text-[#86868B] flex items-start gap-2"
                            >
                              <span className="w-1 h-1 rounded-full bg-[#0071E3] mt-2 flex-shrink-0" />
                              {spec}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <a
            href="#"
            className="btn-text inline-flex items-center gap-2"
          >
            View complete tech specs
            <svg
              className="w-4 h-4 arrow-icon transition-transform duration-200"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
