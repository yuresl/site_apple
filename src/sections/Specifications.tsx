import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ChevronDown,
  Monitor,
  Cpu,
  Camera,
  Battery,
  Wifi,
  Sparkles,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const specCategories = [
  {
    id: "display",
    title: "Tela",
    icon: Monitor,
    specs: [
      'Tela Super Retina XDR de 6,7"',
      "Tecnologia ProMotion com 120 Hz",
      "Dynamic Island",
      "Tela Sempre Ativa",
      "HDR10 e Dolby Vision",
      "Resolução de 2796 x 1290 a 460 ppp",
    ],
  },
  {
    id: "performance",
    title: "Desempenho",
    icon: Cpu,
    specs: [
      "Chip A17 Pro com GPU de 6 núcleos",
      "Ray tracing acelerado por hardware",
      "Neural Engine de 16 núcleos",
      "Até 1 TB de armazenamento",
      "USB-C com suporte a USB 3",
      "Aprendizado de máquina até 2x mais rápido",
    ],
  },
  {
    id: "camera",
    title: "Sistema de Câmera",
    icon: Camera,
    specs: [
      "Câmera principal de 48 MP com estabilização óptica de imagem (OIS) por deslocamento de sensor",
      "Ultra-angular de 12 MP com fotografia macro",
      "Teleobjetiva de 12 MP com zoom óptico de 5x",
      "Suporte a ProRAW e ProRes",
      "Captura de vídeo espacial",
      "Modo de Ação para vídeos fluidos na mão",
    ],
  },
  {
    id: "battery",
    title: "Bateria e Energia",
    icon: Battery,
    specs: [
      "Até 29 horas de reprodução de vídeo",
      "Recarga sem fio MagSafe de até 15W",
      "Recarga sem fio Qi de até 7,5W",
      "Recarga rápida: 50% em 30 minutos",
      "Cabo de recarga USB-C incluído",
    ],
  },
  {
    id: "connectivity",
    title: "Conectividade",
    icon: Wifi,
    specs: [
      "Compatível com 5G",
      "Gigabit LTE com MIMO 4x4",
      "Wi-Fi 6E (802.11ax)",
      "Bluetooth 5.3",
      "Chip de banda ultralarga",
      "NFC com modo leitura",
    ],
  },
  {
    id: "features",
    title: "Recursos Adicionais",
    icon: Sparkles,
    specs: [
      "Reconhecimento facial Face ID",
      "Atalho personalizável do Botão de Ação",
      "SOS de Emergência via satélite",
      "Detecção de Acidente",
      "Parte da frente em Ceramic Shield",
      "Resistência à água IP68",
    ],
  },
];

export default function Specifications() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const columnsRef = useRef<HTMLDivElement>(null);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([
    "display",
  ]);

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
          ease: "expo.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Columns staggered animation
      const columns = columnsRef.current?.querySelectorAll(".spec-column");
      if (columns) {
        gsap.fromTo(
          columns,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "expo.out",
            scrollTrigger: {
              trigger: columnsRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }

      // Parallax effect on columns
      if (columns) {
        columns.forEach((column) => {
          gsap.to(column, {
            y: -20,
            ease: "none",
            scrollTrigger: {
              trigger: column,
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

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId],
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
            Especificações Técnicas
          </h2>
          <p className="text-body-large max-w-2xl mx-auto">
            Cada detalhe projetado para desempenho, eficiência e beleza.
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
                    style={{ transitionTimingFunction: "var(--ease-spring)" }}
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
                          isExpanded ? "rotate-180" : ""
                        }`}
                        style={{
                          transitionTimingFunction: "var(--ease-spring)",
                        }}
                      />
                    </button>

                    {/* Expandable Content */}
                    <div
                      className={`overflow-hidden transition-all duration-400 ${
                        isExpanded ? "max-h-96" : "max-h-0"
                      }`}
                      style={{ transitionTimingFunction: "var(--ease-smooth)" }}
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
          <a href="#" className="btn-text inline-flex items-center gap-2">
            Ver especificações técnicas completas
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
