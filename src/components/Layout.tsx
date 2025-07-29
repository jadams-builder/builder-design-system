'use client';

import { useState } from 'react';
import { Navigation, MobileMenuButton } from './Navigation';

export function Layout({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      <MobileMenuButton
        isOpen={isMobileMenuOpen}
        onToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />
      
      <div className="lg:flex lg:h-screen">
        <Navigation
          isOpen={isMobileMenuOpen}
          onToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        />
        
        <main className="flex-1 lg:ml-72 lg:overflow-y-auto">
          <div className="lg:hidden h-16"></div>
          {children}
        </main>
      </div>
    </div>
  );
}