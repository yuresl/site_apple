import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Cpu, Battery, Camera, Hexagon, CircleDot } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const bentoCards = [
  {
    id: 1,
    title: "Chip A17 Pro",
    subtitle: "O chip mais poderoso de todos os tempos em um smartphone",
    cta: "Explorar desempenho",
    icon: Cpu,
    size: "large",
    gradient: "from-blue-50 to-indigo-50",
  },
  {
    id: 2,
    title: "Bateria para o dia todo",
    description: "Até 29 horas de reprodução de vídeo",
    icon: Battery,
    size: "small",
    gradient: "from-green-50 to-emerald-50",
  },
  {
    id: 3,
    title: "Sistema de Câmera Pro",
    description: "Principal de 48 MP | Ultra-angular | Teleobjetiva",
    icon: Camera,
    size: "small",
    gradient: "from-purple-50 to-pink-50",
  },
  {
    id: 4,
    title: "Design em Titânio",
    description:
      "Titânio de grau aeroespacial. Notavelmente leve. Incrivelmente forte.",
    icon: Hexagon,
    size: "medium",
    gradient: "from-gray-50 to-slate-50",
  },
  {
    id: 5,
    title: "Botão de Ação",
    description: "Seu atalho para seu recurso favorito",
    icon: CircleDot,
    size: "medium",
    gradient: "from-orange-50 to-amber-50",
  },
];

export default function ProductShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "expo.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Bento cards staggered animation
      const cards = gridRef.current?.querySelectorAll(".bento-card-item");
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 60, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "expo.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }

      // Parallax effect on scroll
      if (cards) {
        cards.forEach((card) => {
          gsap.to(card, {
            y: -40,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // 3D tilt effect handler
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      translateZ: 20,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      translateZ: 0,
      duration: 0.5,
      ease: "spring(1, 0.5)",
    });
  };

  return (
    <section
      ref={sectionRef}
      id="features"
      className="relative py-20 md:py-28 lg:py-32 bg-white"
    >
      <div className="max-w-[1400px] mx-auto section-padding">
        {/* Section Title */}
        <h2
          ref={titleRef}
          className="text-section text-[#1D1D1F] text-center mb-16"
        >
          Feito para o extraordinário.
        </h2>

        {/* Bento Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6"
          style={{ perspective: "1000px" }}
        >
          {bentoCards.map((card) => {
            const Icon = card.icon;
            const gridClass =
              card.size === "large"
                ? "lg:col-span-8 lg:row-span-2"
                : card.size === "small"
                  ? "lg:col-span-4"
                  : "lg:col-span-6";

            return (
              <div
                key={card.id}
                className={`bento-card-item ${gridClass}`}
                style={{ transformStyle: "preserve-3d" }}
              >
                <div
                  className={`bento-card h-full bg-gradient-to-br ${card.gradient} relative overflow-hidden`}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Icon */}
                  <div
                    className="mb-4"
                    style={{ transform: "translateZ(30px)" }}
                  >
                    <div className="w-12 h-12 rounded-xl bg-white/80 flex items-center justify-center shadow-sm">
                      <Icon className="w-6 h-6 text-[#1D1D1F]" />
                    </div>
                  </div>

                  {/* Content */}
                  <div style={{ transform: "translateZ(20px)" }}>
                    <h3 className="text-xl md:text-2xl font-semibold text-[#1D1D1F] mb-2">
                      {card.title}
                    </h3>
                    {card.subtitle && (
                      <p className="text-body-large mb-4">{card.subtitle}</p>
                    )}
                    {card.description && (
                      <p className="text-body text-[#86868B] mb-4">
                        {card.description}
                      </p>
                    )}
                    {card.cta && (
                      <button className="btn-text mt-2">
                        {card.cta}
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
                      </button>
                    )}
                  </div>

                  {/* Decorative element */}
                  <div
                    className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full opacity-30"
                    style={{
                      background:
                        "radial-gradient(circle, rgba(0,113,227,0.2) 0%, transparent 70%)",
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
