import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselSlide {
  id: number;
  image: string;
  title: string;
  description: string;
  link?: string;
}

const slides: CarouselSlide[] = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&q=80',
    title: 'Welcome to E-Store',
    description: 'Discover amazing products at unbeatable prices',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1920&q=80',
    title: 'New Arrivals',
    description: 'Check out our latest collection of premium products',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80',
    title: 'Special Offers',
    description: 'Limited time deals on your favorite items',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?w=1920&q=80',
    title: 'Free Shipping',
    description: 'On orders over $50 - Shop now!',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=1920&q=80',
    title: 'Electronics Sale',
    description: 'Up to 50% off on all electronics and gadgets',
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=1920&q=80',
    title: 'Fashion Collection',
    description: 'Trendy clothing and accessories for every style',
  },
  {
    id: 7,
    image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1920&q=80',
    title: 'Home & Garden',
    description: 'Transform your living space with our home essentials',
  },
  {
    id: 8,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1920&q=80',
    title: 'Sports & Fitness',
    description: 'Everything you need for an active lifestyle',
  },
];

export default function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden rounded-lg shadow-2xl mb-8">
      {/* Slides */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>
              <div className="relative h-full flex items-center justify-start px-8 md:px-16">
                <div className="text-white max-w-2xl">
                  <h2 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
                    {slide.title}
                  </h2>
                  <p className="text-xl md:text-2xl mb-8 text-gray-200">
                    {slide.description}
                  </p>
                  <button className="bg-amazon-orange hover:bg-orange-600 text-white px-8 py-3 rounded-lg text-lg font-semibold transition shadow-lg hover:shadow-xl transform hover:scale-105">
                    Shop Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition backdrop-blur-sm"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition backdrop-blur-sm"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition ${
              index === currentSlide
                ? 'bg-amazon-orange w-8'
                : 'bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
