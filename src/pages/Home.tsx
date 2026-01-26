import { Link } from 'react-router-dom';
import { useProducts } from '@/hooks/useProducts';
import ProductCard from '@/components/ProductCard';
import Loading from '@/components/Loading';
import Carousel from '@/components/Carousel';

export default function Home() {
  const { products, loading } = useProducts();

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-slate-950 dark:to-slate-900 transition-colors">
      <div className="container mx-auto px-4 py-12">
        {/* Carousel */}
        <div className="animate-fade-in">
          <Carousel />
        </div>

        {/* Featured Products Section */}
        <div className="mt-16 mb-12">
          <div className="mb-8 flex justify-between items-center animate-slide-in-right">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-10 bg-gradient-to-b from-amazon-orange to-orange-600 rounded-full shadow-lg"></div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary">
                منتجات مميزة
              </h2>
            </div>
            <Link
              to="/products"
              className="text-amazon-orange hover:text-orange-600 font-bold transition-all duration-300 transform hover:translate-x-1 flex items-center gap-1"
            >
              <span>عرض الكل</span>
              <span className="text-xl">←</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.slice(0, 8).map((product, index) => (
              <div key={product.id} className="h-full" style={{ animationDelay: `${index * 50}ms` }}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>

        {/* Promo Section */}
        <div className="mt-16 mb-12 bg-gradient-to-r from-amazon-orange via-orange-500 to-orange-600 rounded-2xl p-8 md:p-12 text-white shadow-xl dark:shadow-dark-xl animate-fade-in">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex-1">
              <h3 className="text-3xl md:text-4xl font-bold mb-3">عروض حصرية</h3>
              <p className="text-lg opacity-95">استمتع بخصومات تصل إلى 50% على المنتجات المختارة</p>
            </div>
            <Link
              to="/products"
              className="bg-white text-amazon-orange px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl whitespace-nowrap"
            >
              تسوق الآن
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
