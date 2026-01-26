export default function Footer() {
  return (
    <footer className="bg-amazon-light dark:bg-slate-900 text-gray-300 dark:text-slate-300 mt-auto transition-colors">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div className="hover:translate-y-[-2px] transition-transform duration-300">
            <h3 className="text-white dark:text-slate-100 font-semibold mb-4 text-lg">Get to Know Us</h3>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#" className="hover:text-amazon-orange dark:hover:text-amazon-orange transition duration-300">About Us</a></li>
              <li><a href="#" className="hover:text-amazon-orange dark:hover:text-amazon-orange transition duration-300">Careers</a></li>
              <li><a href="#" className="hover:text-amazon-orange dark:hover:text-amazon-orange transition duration-300">Press Releases</a></li>
            </ul>
          </div>
          <div className="hover:translate-y-[-2px] transition-transform duration-300">
            <h3 className="text-white dark:text-slate-100 font-semibold mb-4 text-lg">Make Money with Us</h3>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#" className="hover:text-amazon-orange dark:hover:text-amazon-orange transition duration-300">Sell products</a></li>
              <li><a href="#" className="hover:text-amazon-orange dark:hover:text-amazon-orange transition duration-300">Become an Affiliate</a></li>
            </ul>
          </div>
          <div className="hover:translate-y-[-2px] transition-transform duration-300">
            <h3 className="text-white dark:text-slate-100 font-semibold mb-4 text-lg">Customer Service</h3>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#" className="hover:text-amazon-orange dark:hover:text-amazon-orange transition duration-300">Your Account</a></li>
              <li><a href="#" className="hover:text-amazon-orange dark:hover:text-amazon-orange transition duration-300">Returns</a></li>
              <li><a href="#" className="hover:text-amazon-orange dark:hover:text-amazon-orange transition duration-300">Help</a></li>
            </ul>
          </div>
          <div className="hover:translate-y-[-2px] transition-transform duration-300">
            <h3 className="text-white dark:text-slate-100 font-semibold mb-4 text-lg">Connect with Us</h3>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#" className="hover:text-amazon-orange dark:hover:text-amazon-orange transition duration-300">Facebook</a></li>
              <li><a href="#" className="hover:text-amazon-orange dark:hover:text-amazon-orange transition duration-300">Twitter</a></li>
              <li><a href="#" className="hover:text-amazon-orange dark:hover:text-amazon-orange transition duration-300">Instagram</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 dark:border-slate-700 pt-8 text-center text-sm text-gray-400 dark:text-slate-400">
          <p>&copy; 2024 E-Store. All rights reserved. | Made with ❤️</p>
        </div>
      </div>
    </footer>
  );
}
