import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProducts } from '@/hooks/useProducts';
import { useCategories } from '@/hooks/useCategories';
import { ProductFilters } from '@/types';
import ProductCard from '@/components/ProductCard';
import Loading from '@/components/Loading';

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState<ProductFilters>({
    search: searchParams.get('search') || undefined,
    category: searchParams.get('category') || undefined,
  });
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });

  const { products, loading } = useProducts(filters);
  const { categories } = useCategories();

  const handleCategoryChange = (category: string) => {
    const newFilters = { ...filters };
    if (category === 'all') {
      delete newFilters.category;
    } else {
      newFilters.category = category;
    }
    setFilters(newFilters);
    setSearchParams({ ...newFilters });
  };

  const handlePriceFilter = () => {
    const newFilters = { ...filters };
    if (priceRange.min) newFilters.minPrice = Number(priceRange.min);
    if (priceRange.max) newFilters.maxPrice = Number(priceRange.max);
    setFilters(newFilters);
  };

  const clearFilters = () => {
    setFilters({});
    setPriceRange({ min: '', max: '' });
    setSearchParams({});
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8 animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-2">Browse Products</h1>
        <p className="text-secondary text-lg">Discover our wide selection of quality products</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="lg:w-64 flex-shrink-0">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md dark:shadow-dark-md h-fit sticky top-20 transition-colors">
            <h2 className="text-xl font-bold text-primary mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-amazon-orange rounded-full"></span>
              Filters
            </h2>

            {/* Categories */}
            <div className="mb-8 pb-8 border-b border-gray-200 dark:border-slate-700">
              <h3 className="font-bold text-primary mb-4">Category</h3>
              <div className="space-y-3">
                <label className="flex items-center cursor-pointer group">
                  <input
                    type="radio"
                    name="category"
                    value="all"
                    checked={!filters.category}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                    className="w-4 h-4 accent-amazon-orange cursor-pointer"
                  />
                  <span className="ml-3 text-secondary group-hover:text-amazon-orange transition duration-300">All Categories</span>
                </label>
                {categories.map((cat) => (
                  <label key={cat.id} className="flex items-center cursor-pointer group">
                    <input
                      type="radio"
                      name="category"
                      value={cat.name}
                      checked={filters.category === cat.name}
                      onChange={(e) => handleCategoryChange(e.target.value)}
                      className="w-4 h-4 accent-amazon-orange cursor-pointer"
                    />
                    <span className="ml-3 text-secondary group-hover:text-amazon-orange transition duration-300">{cat.name}</span>
                  </label>
                ))}
            </div>
            </div>

            {/* Price Range */}
            <div className="mb-8 pb-8 border-b border-gray-200 dark:border-slate-700">
              <h3 className="font-bold text-primary mb-4">Price Range</h3>
              <div className="space-y-3">
                <input
                  type="number"
                  placeholder="Min Price"
                  value={priceRange.min}
                  onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                  className="w-full px-3 py-2.5 border border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-amazon-orange transition duration-250"
                />
                <input
                  type="number"
                  placeholder="Max Price"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                  className="w-full px-3 py-2.5 border border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-amazon-orange transition duration-250"
                />
                <button
                  onClick={handlePriceFilter}
                  className="w-full bg-amazon-orange hover:bg-orange-600 text-white py-2.5 rounded-lg transition duration-300 shadow-md hover:shadow-lg font-semibold transform hover:scale-105"
                >
                  Apply Filter
                </button>
              </div>
            </div>

            <button
              onClick={clearFilters}
              className="w-full text-amazon-orange hover:text-orange-600 font-semibold transition duration-300 py-2.5"
            >
              ✕ Clear All Filters
            </button>
          </div>
        </aside>

        {/* Products Grid */}
        <div className="flex-1">
          <div className="mb-8 pb-8 border-b border-gray-200 dark:border-slate-700">
            {filters.search && (
              <div className="bg-blue-50 dark:bg-slate-700 p-4 rounded-lg mb-4">
                <p className="text-blue-900 dark:text-blue-100">
                  Searching for: <span className="font-bold text-amazon-orange">{filters.search}</span>
                </p>
              </div>
            )}
            <p className="text-secondary font-semibold">
              {products.length} <span className="text-primary font-bold">{products.length === 1 ? 'product' : 'products'}</span> found
            </p>
          </div>

          {loading ? (
            <Loading />
          ) : products.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-secondary text-xl mb-2">📦 No products found</p>
              <p className="text-tertiary">Try adjusting your filters or search terms</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product, index) => (
                <div key={product.id} style={{ animationDelay: `${index * 50}ms` }}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
