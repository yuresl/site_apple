import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    id: 1,
    title: "Mecanismo Fotônico",
    description:
      "Nosso processador de sinal de imagem mais poderoso oferece detalhes, cores e clareza sem precedentes. Cada pixel é otimizado para fidelidade máxima.",
    stat: "2x",
    statLabel: "melhor desempenho em pouca luz",
    image: "./feature-camera.jpg",
    imagePosition: "left",
  },
  {
    id: 2,
    title: "Modo Cinema",
    description:
      "Agora em 4K Dolby Vision. Mude automaticamente o foco para criar efeitos de profundidade com qualidade de cinema que dão vida aos seus vídeos.",
    stat: "4K",
    statLabel: "a 30 qps com Dolby Vision",
    image: "./feature-video.jpg",
    imagePosition: "right",
  },
  {
    id: 3,
    title: "Vídeo ProRes",
    description:
      "Formato de vídeo profissional para máxima fidelidade de cores e flexibilidade na pós-produção. Edite com as mesmas ferramentas usadas em Hollywood.",
    stat: "Até 4K60",
    statLabel: "Gravação ProRes",
    image: "./feature-prores.jpg",
    imagePosition: "left",
  },
];

export default function Features() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "expo.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Feature sections animation
      featureRefs.current.forEach((featureRef, index) => {
        if (!featureRef) return;

        const image = featureRef.querySelector(".feature-image");
        const content = featureRef.querySelector(".feature-content");
        const stat = featureRef.querySelector(".feature-stat");
        const isLeft = features[index].imagePosition === "left";

        // Image reveal with clip-path
        gsap.fromTo(
          image,
          {
            clipPath: "circle(0% at 50% 50%)",
            opacity: 0,
          },
          {
            clipPath: "circle(100% at 50% 50%)",
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: featureRef,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          },
        );

        // Content slide in
        gsap.fromTo(
          content,
          {
            opacity: 0,
            x: isLeft ? 80 : -80,
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            ease: "expo.out",
            scrollTrigger: {
              trigger: featureRef,
              start: "top 65%",
              toggleActions: "play none none reverse",
            },
          },
        );

        // Stat counter animation
        if (stat) {
          gsap.fromTo(
            stat,
            { opacity: 0, scale: 0.8 },
            {
              opacity: 1,
              scale: 1,
              duration: 0.5,
              ease: "back.out(1.7)",
              scrollTrigger: {
                trigger: stat,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
            },
          );
        }

        // Parallax effect
        gsap.to(image, {
          y: -30,
          ease: "none",
          scrollTrigger: {
            trigger: featureRef,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });

        gsap.to(content, {
          y: -50,
          ease: "none",
          scrollTrigger: {
            trigger: featureRef,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="iphone"
      className="relative py-20 md:py-28 lg:py-32 bg-[#F5F5F7]"
    >
      <div className="max-w-[1400px] mx-auto section-padding">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-20 md:mb-28">
          <h2 className="text-section text-[#1D1D1F] mb-4">
            Um sistema de câmera que captura mais.
          </h2>
          <p className="text-body-large max-w-2xl mx-auto">
            Nosso sistema de câmera mais avançado até hoje. Com detalhes sem
            precedentes, precisão de cores e desempenho em pouca luz.
          </p>
        </div>

        {/* Features */}
        <div className="space-y-24 md:space-y-32">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              ref={(el) => {
                featureRefs.current[index] = el;
              }}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
                feature.imagePosition === "right" ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Image */}
              <div
                className={`feature-image relative overflow-hidden rounded-3xl ${
                  feature.imagePosition === "right" ? "lg:order-2" : ""
                }`}
              >
                <div className="aspect-[3/2] overflow-hidden">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
                {/* Overlay gradient */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent 60%, rgba(0,0,0,0.1) 100%)",
                  }}
                />
              </div>

              {/* Content */}
              <div
                className={`feature-content ${
                  feature.imagePosition === "right" ? "lg:order-1" : ""
                }`}
              >
                <h3 className="text-subsection text-[#1D1D1F] mb-4">
                  {feature.title}
                </h3>
                <p className="text-body-large mb-8">{feature.description}</p>

                {/* Stat */}
                <div className="feature-stat inline-flex items-baseline gap-2 bg-white rounded-2xl px-6 py-4 shadow-sm">
                  <span className="text-4xl md:text-5xl font-bold text-[#0071E3]">
                    {feature.stat}
                  </span>
                  <span className="text-sm text-[#86868B]">
                    {feature.statLabel}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Connecting SVG Line */}
        <svg
          className="absolute left-1/2 top-[300px] bottom-[300px] w-px hidden lg:block"
          style={{ transform: "translateX(-50%)" }}
        >
          <line
            x1="0"
            y1="0"
            x2="0"
            y2="100%"
            stroke="url(#gradient)"
            strokeWidth="2"
            strokeDasharray="8 8"
            className="animate-pulse"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0071E3" stopOpacity="0" />
              <stop offset="50%" stopColor="#0071E3" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#0071E3" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
}
