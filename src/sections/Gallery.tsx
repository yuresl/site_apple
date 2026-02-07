import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const galleryItems = [
  {
    id: 1,
    title: 'Morning Light',
    category: 'Portrait',
    image: '/gallery-1.jpg',
  },
  {
    id: 2,
    title: 'Urban Geometry',
    category: 'Architecture',
    image: '/gallery-2.jpg',
  },
  {
    id: 3,
    title: 'Golden Hour',
    category: 'Landscape',
    image: '/gallery-3.jpg',
  },
  {
    id: 4,
    title: 'Macro World',
    category: 'Detail',
    image: '/gallery-4.jpg',
  },
  {
    id: 5,
    title: 'Night Sky',
    category: 'Astrophotography',
    image: '/gallery-5.jpg',
  },
];

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Gallery items animation
      const items = trackRef.current?.querySelectorAll('.gallery-item');
      if (items) {
        gsap.fromTo(
          items,
          { opacity: 0, scale: 0.9 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.7,
            stagger: 0.1,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: trackRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToItem = (direction: 'prev' | 'next') => {
    if (!trackRef.current) return;

    const newIndex =
      direction === 'next'
        ? Math.min(activeIndex + 1, galleryItems.length - 1)
        : Math.max(activeIndex - 1, 0);

    setActiveIndex(newIndex);

    const itemWidth = trackRef.current.scrollWidth / galleryItems.length;
    gsap.to(trackRef.current, {
      scrollLeft: itemWidth * newIndex - trackRef.current.clientWidth / 2 + itemWidth / 2,
      duration: 0.6,
      ease: 'expo.out',
    });
  };

  const handleScroll = () => {
    if (!trackRef.current) return;
    const scrollLeft = trackRef.current.scrollLeft;
    const itemWidth = trackRef.current.scrollWidth / galleryItems.length;
    const newIndex = Math.round(scrollLeft / itemWidth);
    setActiveIndex(Math.min(newIndex, galleryItems.length - 1));
  };

  return (
    <section
      ref={sectionRef}
      id="ipad"
      className="relative py-20 md:py-28 lg:py-32 bg-white overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto section-padding">
        {/* Section Header */}
        <div
          ref={titleRef}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-12"
        >
          <div>
            <h2 className="text-section text-[#1D1D1F] mb-2">
              Shot on Vision Pro.
            </h2>
            <p className="text-body-large">
              See what the new camera system can do.
            </p>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-3 mt-6 md:mt-0">
            <button
              onClick={() => scrollToItem('prev')}
              disabled={activeIndex === 0}
              className="w-12 h-12 rounded-full bg-[#F5F5F7] flex items-center justify-center transition-all duration-300 hover:bg-[#E8E8ED] hover:scale-110 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
              style={{ transitionTimingFunction: 'var(--ease-spring)' }}
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5 text-[#1D1D1F]" />
            </button>
            <button
              onClick={() => scrollToItem('next')}
              disabled={activeIndex === galleryItems.length - 1}
              className="w-12 h-12 rounded-full bg-[#F5F5F7] flex items-center justify-center transition-all duration-300 hover:bg-[#E8E8ED] hover:scale-110 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
              style={{ transitionTimingFunction: 'var(--ease-spring)' }}
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5 text-[#1D1D1F]" />
            </button>
          </div>
        </div>
      </div>

      {/* Gallery Track */}
      <div
        ref={trackRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide px-4 sm:px-6 lg:px-8 xl:px-12 pb-8"
        onScroll={handleScroll}
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {galleryItems.map((item, index) => {
          const isActive = index === activeIndex;

          return (
            <div
              key={item.id}
              className="gallery-item flex-shrink-0"
              style={{
                width: 'clamp(280px, 70vw, 800px)',
                scrollSnapAlign: 'center',
              }}
            >
              <div
                className={`relative overflow-hidden rounded-3xl transition-all duration-500 ${
                  isActive ? 'scale-100' : 'scale-95 opacity-70'
                }`}
                style={{ transitionTimingFunction: 'var(--ease-spring)' }}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                  />
                </div>

                {/* Caption */}
                <div
                  className={`absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent transition-all duration-500 ${
                    isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                >
                  <p className="text-xs text-white/70 uppercase tracking-wider mb-1">
                    {item.category}
                  </p>
                  <h3 className="text-xl font-semibold text-white">
                    {item.title}
                  </h3>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors duration-300" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {galleryItems.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setActiveIndex(index);
              if (trackRef.current) {
                const itemWidth = trackRef.current.scrollWidth / galleryItems.length;
                gsap.to(trackRef.current, {
                  scrollLeft: itemWidth * index - trackRef.current.clientWidth / 2 + itemWidth / 2,
                  duration: 0.6,
                  ease: 'expo.out',
                });
              }
            }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === activeIndex
                ? 'w-8 bg-[#0071E3]'
                : 'bg-[#D2D2D7] hover:bg-[#86868B]'
            }`}
            style={{ transitionTimingFunction: 'var(--ease-spring)' }}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
