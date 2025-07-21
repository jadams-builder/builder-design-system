'use client';

import Link from 'next/link';

const navigationItems = [
  {
    title: 'Getting Started',
    items: [
      { name: 'Overview', href: '/' },
      { name: 'Installation', href: '/getting-started/installation' },
    ]
  },
  {
    title: 'Design Tokens',
    items: [
      { name: 'Colors', href: '/tokens/colors' },
      { name: 'Typography', href: '/tokens/typography' },
      { name: 'Spacing', href: '/tokens/spacing' },
      { name: 'Shadows', href: '/tokens/shadows' },
      { name: 'Border Radius', href: '/tokens/border-radius' },
    ]
  },
  {
    title: 'Components',
    items: [
      { name: 'Button', href: '/components/button' },
      { name: 'Input', href: '/components/input' },
      { name: 'Card', href: '/components/card' },
      { name: 'Badge', href: '/components/badge' },
      { name: 'Modal', href: '/components/modal' },
    ]
  },
  {
    title: 'Patterns',
    items: [
      { name: 'Forms', href: '/patterns/forms' },
      { name: 'Navigation', href: '/patterns/navigation' },
      { name: 'Data Display', href: '/patterns/data-display' },
    ]
  }
];

export function Navigation({ isOpen, onToggle }: { isOpen: boolean; onToggle: () => void }) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          style={{ background: 'var(--bg-overlay)' }}
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <nav
        className={`fixed top-0 left-0 z-50 h-full w-72 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:h-auto ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{
          background: 'var(--bg-secondary)',
          borderRight: `var(--border-thin) solid var(--border-primary)`
        }}
      >
        <div className="p-6">
          <Link href="/" className="block mb-8">
            <h2 
              className="text-xl font-bold"
              style={{ color: 'var(--text-brand-primary)' }}
            >
              Builder.io Design System
            </h2>
          </Link>

          <div className="space-y-6">
            {navigationItems.map((section) => (
              <div key={section.title}>
                <h3 
                  className="text-sm font-semibold uppercase tracking-wider mb-3"
                  style={{ color: 'var(--text-tertiary)' }}
                >
                  {section.title}
                </h3>
                <ul className="space-y-2">
                  {section.items.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="block py-2 px-3 rounded-md text-sm transition-colors"
                        style={{
                          color: 'var(--text-secondary)',
                          borderRadius: 'var(--radius-md)',
                          transition: 'var(--transition-fast)'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'var(--bg-elevated)';
                          e.currentTarget.style.color = 'var(--text-primary)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'transparent';
                          e.currentTarget.style.color = 'var(--text-secondary)';
                        }}
                        onClick={onToggle}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}

export function MobileMenuButton({ isOpen, onToggle }: { isOpen: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md"
      style={{
        background: 'var(--bg-elevated)',
        color: 'var(--text-primary)',
        borderRadius: 'var(--radius-md)',
        border: `var(--border-thin) solid var(--border-primary)`
      }}
      aria-label="Toggle navigation menu"
    >
      <svg
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        {isOpen ? (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        ) : (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        )}
      </svg>
    </button>
  );
}