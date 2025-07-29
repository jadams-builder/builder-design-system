'use client';

import Link from 'next/link';
import { useState } from 'react';

interface NavigationItem {
  name: string;
  href: string;
}

interface NavigationSubgroup {
  name: string;
  items: NavigationItem[];
}

interface NavigationSection {
  title: string;
  collapsible: boolean;
  defaultOpen?: boolean;
  items?: NavigationItem[];
  subgroups?: NavigationSubgroup[];
}

const navigationItems: NavigationSection[] = [
  {
    title: 'Getting Started',
    collapsible: false,
    items: [
      { name: 'Overview', href: '/' },
      { name: 'Installation', href: '/getting-started/installation' },
    ]
  },
  {
    title: 'Design Tokens',
    collapsible: true,
    defaultOpen: true,
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
    collapsible: true,
    defaultOpen: true,
    subgroups: [
      {
        name: 'Basics',
        items: [
          { name: 'Button', href: '/components/button' },
          { name: 'Input', href: '/components/input' },
          { name: 'Card', href: '/components/card' },
          { name: 'Badge', href: '/components/badge' },
          { name: 'Modal', href: '/components/modal' },
        ]
      },
      {
        name: 'Essentials',
        items: [
          { name: 'Checkbox', href: '/components/checkbox' },
          { name: 'Radio', href: '/components/radio' },
          { name: 'Select', href: '/components/select' },
          { name: 'Textarea', href: '/components/textarea' },
          { name: 'Toggle', href: '/components/toggle' },
          { name: 'Slider', href: '/components/slider' },
          { name: 'File Upload', href: '/components/fileupload' },
        ]
      }
    ]
  },
  {
    title: 'Patterns',
    collapsible: true,
    defaultOpen: false,
    items: [
      { name: 'Forms', href: '/patterns/forms' },
      { name: 'Navigation', href: '/patterns/navigation' },
      { name: 'Data Display', href: '/patterns/data-display' },
    ]
  }
];

export function Navigation({ isOpen, onToggle }: { isOpen: boolean; onToggle: () => void }) {
  // Initialize collapsed sections state based on defaultOpen values
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>(() => {
    const initialState: Record<string, boolean> = {};
    navigationItems.forEach(section => {
      if (section.collapsible) {
        initialState[section.title] = !section.defaultOpen;
      }
    });
    return initialState;
  });

  const toggleSection = (sectionTitle: string) => {
    setCollapsedSections(prev => ({
      ...prev,
      [sectionTitle]: !prev[sectionTitle]
    }));
  };

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
        className={`fixed top-0 left-0 z-50 h-screen w-72 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{
          background: 'var(--bg-secondary)',
          borderRight: `var(--border-thin) solid var(--border-primary)`
        }}
      >
        <div className="h-full flex flex-col">
          <div className="flex-shrink-0 p-6">
            <Link href="/" className="block mb-8">
              <h2 
                className="text-xl font-bold"
                style={{ color: 'var(--text-brand-primary)' }}
              >
                Builder.io Design System
              </h2>
            </Link>
          </div>

          <div 
            className="flex-1 overflow-y-auto px-6 pb-6"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: 'var(--color-gray-600) transparent'
            }}
          >
            <div className="space-y-6">
            {navigationItems.map((section) => (
              <div key={section.title}>
                {section.collapsible ? (
                  <button
                    onClick={() => toggleSection(section.title)}
                    className="flex items-center justify-between w-full text-left text-sm font-semibold uppercase tracking-wider mb-3 hover:opacity-80 transition-opacity"
                    style={{ 
                      color: 'var(--text-tertiary)',
                      transition: 'var(--transition-fast)'
                    }}
                    aria-expanded={!collapsedSections[section.title]}
                    aria-controls={`section-${section.title.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <span>{section.title}</span>
                    <svg
                      className={`h-4 w-4 transform transition-transform ${
                        collapsedSections[section.title] ? 'rotate-0' : 'rotate-90'
                      }`}
                      style={{ 
                        transition: 'var(--transition-fast)',
                        color: 'var(--text-tertiary)'
                      }}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                ) : (
                  <h3 
                    className="text-sm font-semibold uppercase tracking-wider mb-3"
                    style={{ color: 'var(--text-tertiary)' }}
                  >
                    {section.title}
                  </h3>
                )}
                
                <div
                  id={`section-${section.title.toLowerCase().replace(/\s+/g, '-')}`}
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    section.collapsible && collapsedSections[section.title] 
                      ? 'max-h-0 opacity-0' 
                      : 'max-h-none opacity-100'
                  }`}
                >
                  {/* Render direct items if they exist */}
                  {section.items && (
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
                  )}
                  
                  {/* Render subgroups if they exist */}
                  {section.subgroups && (
                    <div className="space-y-4">
                      {section.subgroups.map((subgroup) => (
                        <div key={subgroup.name}>
                          <h4 
                            className="text-xs font-medium uppercase tracking-wider mb-2 px-3"
                            style={{ 
                              color: 'var(--text-tertiary)',
                              opacity: 0.8
                            }}
                          >
                            {subgroup.name}
                          </h4>
                          <ul className="space-y-2">
                            {subgroup.items.map((item) => (
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
                  )}
                </div>
              </div>
            ))}
            </div>
          </div>
        </div>
      </nav>
      
      <style jsx>{`
        .flex-1::-webkit-scrollbar {
          width: 6px;
        }
        
        .flex-1::-webkit-scrollbar-track {
          background: transparent;
        }
        
        .flex-1::-webkit-scrollbar-thumb {
          background-color: var(--color-gray-600);
          border-radius: 3px;
        }
        
        .flex-1::-webkit-scrollbar-thumb:hover {
          background-color: var(--color-gray-500);
        }
      `}</style>
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