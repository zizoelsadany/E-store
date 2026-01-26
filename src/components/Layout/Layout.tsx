import { ReactNode, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import { useThemeStore } from '@/store/themeStore';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { isDark } = useThemeStore();

  useEffect(() => {
    // Apply theme on mount and when it changes
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-slate-950 transition-colors">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
