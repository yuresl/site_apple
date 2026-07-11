import { useState, useEffect } from "react";
import { Search, ShoppingBag, Menu, X } from "lucide-react";

const navItems = [
  "Loja",
  "Mac",
  "iPad",
  "iPhone",
  "Watch",
  "Vision",
  "AirPods",
  "Suporte",
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? "glass-nav-scrolled" : "glass-nav"
        }`}
        style={{ transitionTimingFunction: "var(--ease-expo-out)" }}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12">
            {/* Logo */}
            <a
              href="#"
              className="text-[#1D1D1F] font-semibold text-lg transition-transform duration-300 hover:scale-105"
              style={{ transitionTimingFunction: "var(--ease-spring)" }}
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="relative text-xs text-[#1D1D1F] hover:text-[#0071E3] transition-colors duration-200 group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-1/2 w-0 h-[1px] bg-[#0071E3] transition-all duration-250 group-hover:w-full group-hover:left-0" />
                </button>
              ))}
            </div>

            {/* Action Icons */}
            <div className="flex items-center space-x-4">
              <button
                className="text-[#1D1D1F] hover:text-[#0071E3] transition-colors duration-200"
                aria-label="Buscar"
              >
                <Search className="w-4 h-4" />
              </button>
              <button
                className="text-[#1D1D1F] hover:text-[#0071E3] transition-colors duration-200"
                aria-label="Sacola de Compras"
              >
                <ShoppingBag className="w-4 h-4" />
              </button>

              {/* Mobile Menu Button */}
              <button
                className="lg:hidden text-[#1D1D1F] transition-transform duration-300"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Alternar menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        style={{ transitionTimingFunction: "var(--ease-expo-out)" }}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/20 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Menu Panel */}
        <div
          className={`absolute top-12 left-0 right-0 bg-white/95 backdrop-blur-xl transition-transform duration-500 ${
            isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"
          }`}
          style={{ transitionTimingFunction: "var(--ease-expo-out)" }}
        >
          <div className="px-6 py-8 space-y-1">
            {navItems.map((item, index) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="block w-full text-left text-2xl font-semibold text-[#1D1D1F] py-3 hover:text-[#0071E3] transition-all duration-300"
                style={{
                  animationDelay: `${index * 50}ms`,
                  transitionTimingFunction: "var(--ease-spring)",
                }}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
