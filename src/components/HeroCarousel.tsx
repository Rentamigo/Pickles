import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Star, ArrowRight } from 'lucide-react';

interface CarouselSlide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  cta: string;
  ctaLink: string;
  badge?: string;
}

const slides: CarouselSlide[] = [
  {
    id: 1,
    title: "Achari Bliss",
    subtitle: "Taste the Tradition",
    description: "Handcrafted pickles made with love, using recipes passed down through generations",
    image: "images/v1.png",
    cta: "Explore Our Collection",
    ctaLink: "/shop",
    badge: "100% Authentic"
  },
  {
    id: 2,
    title: "Premium Quality",
    subtitle: "No Preservatives Added",
    description: "Pure, natural ingredients with traditional sun-drying methods for authentic flavors",
    image: "images/nv1.png",
    cta: "Shop Premium Range",
    ctaLink: "/shop",
    badge: "Chemical Free"
  },
  {
    id: 3,
    title: "Regional Specialties",
    subtitle: "From Every Corner of India",
    description: "Discover unique pickle varieties from Andhra, Bengal, Punjab, and Gujarat",
    image: "images/p1.png",
    cta: "Discover Flavors",
    ctaLink: "/shop",
    badge: "Regional Authentic"
  }
];

const HeroCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div 
      className="relative h-screen overflow-hidden"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
            index === currentSlide 
              ? 'opacity-100 scale-100' 
              : 'opacity-0 scale-105'
          }`}
        >
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url('${slide.image}')` }}
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-earthy-900/80 via-earthy-800/60 to-transparent" />
          
          {/* Content */}
          <div className="relative z-10 h-full flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="max-w-3xl">
                {/* Badge */}
                {slide.badge && (
                  <div className="inline-flex items-center space-x-2 bg-turmeric-400/90 backdrop-blur-sm text-earthy-900 px-4 py-2 rounded-full text-sm font-semibold mb-6 animate-slide-in-left">
                    <Star className="w-4 h-4 fill-current" />
                    <span>{slide.badge}</span>
                  </div>
                )}
                
                {/* Title */}
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-4 font-serif leading-tight animate-slide-in-left">
                  {slide.title}
                </h1>
                
                {/* Subtitle */}
                <h2 className="text-2xl md:text-3xl lg:text-4xl text-turmeric-200 mb-6 font-light animate-slide-in-left">
                  {slide.subtitle}
                </h2>
                
                {/* Description */}
                <p className="text-lg md:text-xl text-turmeric-100 mb-8 max-w-2xl leading-relaxed animate-slide-in-left">
                  {slide.description}
                </p>
                
                {/* CTA Button */}
                <Link
                  to={slide.ctaLink}
                  className="inline-flex items-center space-x-3 bg-gradient-to-r from-achari-500 to-achari-600 hover:from-achari-600 hover:to-achari-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-glow hover:shadow-glow-lg animate-slide-in-left"
                >
                  <span>{slide.cta}</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 z-20"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 z-20"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-white scale-125' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-8 animate-bounce-gentle z-20">
        <div className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default HeroCarousel;