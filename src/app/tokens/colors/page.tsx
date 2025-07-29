'use client';

import React, { useState } from 'react';

const colorSections = [
  {
    title: 'Base Colors',
    description: 'Core color primitives from the design system',
    colors: [
      { name: 'Purple 400', variable: '--color-purple-400', hex: '#8B5CF6', description: 'Primary brand purple' },
      { name: 'Purple 500', variable: '--color-purple-500', hex: '#7C3AED', description: 'Main purple accent' },
      { name: 'Purple 600', variable: '--color-purple-600', hex: '#6D28D9', description: 'Darker purple for hover states' },
      { name: 'Purple 700', variable: '--color-purple-700', hex: '#5B21B6', description: 'Deep purple' },
      { name: 'Blue 400', variable: '--color-blue-400', hex: '#60A5FA', description: 'Secondary blue accent' },
      { name: 'Blue 500', variable: '--color-blue-500', hex: '#3B82F6', description: 'Main blue' },
      { name: 'Blue 600', variable: '--color-blue-600', hex: '#2563EB', description: 'Darker blue' },
    ]
  },
  {
    title: 'Semantic Colors',
    description: 'Colors that convey meaning and state',
    colors: [
      { name: 'Success', variable: '--color-success', hex: '#22C55E', description: 'Success and positive actions' },
      { name: 'Warning', variable: '--color-warning', hex: '#F59E0B', description: 'Warnings and caution' },
      { name: 'Error', variable: '--color-error', hex: '#EF4444', description: 'Errors and destructive actions' },
      { name: 'Info', variable: '--color-info', hex: '#3B82F6', description: 'Information and neutral messages' },
    ]
  },
  {
    title: 'Text Colors',
    description: 'Semantic text color tokens',
    colors: [
      { name: 'Primary', variable: '--text-primary', hex: '#FFFFFF', description: 'Main text on dark backgrounds' },
      { name: 'Secondary', variable: '--text-secondary', hex: '#D1D5DB', description: 'Secondary text' },
      { name: 'Tertiary', variable: '--text-tertiary', hex: '#9CA3AF', description: 'Tertiary/muted text' },
      { name: 'Subtle', variable: '--text-subtle', hex: '#6B7280', description: 'Very subtle text' },
      { name: 'Brand Primary', variable: '--text-brand-primary', hex: '#8B5CF6', description: 'Primary brand text' },
      { name: 'Brand Secondary', variable: '--text-brand-secondary', hex: '#60A5FA', description: 'Secondary brand text' },
    ]
  },
  {
    title: 'Background Colors',
    description: 'Surface and background tokens',
    colors: [
      { name: 'Primary', variable: '--bg-primary', hex: '#111111', description: 'Main page background' },
      { name: 'Secondary', variable: '--bg-secondary', hex: '#1A1A1A', description: 'Secondary background' },
      { name: 'Tertiary', variable: '--bg-tertiary', hex: '#1F1F1F', description: 'Card/section background' },
      { name: 'Elevated', variable: '--bg-elevated', hex: '#262626', description: 'Elevated surfaces' },
      { name: 'Interactive', variable: '--bg-interactive', hex: '#2D2D2D', description: 'Interactive surfaces' },
    ]
  },
  {
    title: 'Grays',
    description: 'Comprehensive gray scale for neutral tones',
    colors: [
      { name: 'Gray 950', variable: '--color-gray-950', hex: '#0A0A0A', description: 'Deepest background' },
      { name: 'Gray 900', variable: '--color-gray-900', hex: '#111111', description: 'Main dark background' },
      { name: 'Gray 850', variable: '--color-gray-850', hex: '#1A1A1A', description: 'Slightly lighter dark bg' },
      { name: 'Gray 800', variable: '--color-gray-800', hex: '#1F1F1F', description: 'Card/section backgrounds' },
      { name: 'Gray 750', variable: '--color-gray-750', hex: '#262626', description: 'Elevated surfaces' },
      { name: 'Gray 700', variable: '--color-gray-700', hex: '#2D2D2D', description: 'Interactive surface' },
      { name: 'Gray 600', variable: '--color-gray-600', hex: '#404040', description: 'Border/divider' },
      { name: 'Gray 500', variable: '--color-gray-500', hex: '#6B7280', description: 'Subtle text' },
      { name: 'Gray 400', variable: '--color-gray-400', hex: '#9CA3AF', description: 'Muted text' },
      { name: 'Gray 300', variable: '--color-gray-300', hex: '#D1D5DB', description: 'Light text' },
      { name: 'Gray 200', variable: '--color-gray-200', hex: '#E5E7EB', description: 'Very light text' },
      { name: 'Gray 100', variable: '--color-gray-100', hex: '#F3F4F6', description: 'Almost white' },
      { name: 'Gray 50', variable: '--color-gray-50', hex: '#F9FAFB', description: 'Lightest gray' },
    ]
  }
];

function ColorCard({ color }: { color: { name: string; variable: string; hex: string; description: string } }) {
  const [copied, setCopied] = useState('');

  const copyToClipboard = async (text: string, type: 'variable' | 'hex') => {
    await navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(''), 2000);
  };

  return (
    <div 
      className="rounded-lg border overflow-hidden"
      style={{
        background: 'var(--card-bg)',
        border: `var(--border-thin) solid var(--card-border)`,
        borderRadius: 'var(--card-border-radius)',
        boxShadow: 'var(--card-shadow)',
        transition: 'var(--transition-base)'
      }}
    >
      {/* Color swatch */}
      <div 
        className="h-20 w-full cursor-pointer relative group hover:opacity-80 transition-opacity duration-200"
        style={{ backgroundColor: color.hex }}
        onClick={() => copyToClipboard(color.hex, 'hex')}
        title="Click to copy hex value"
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black bg-opacity-50 px-2 py-1 rounded">
            {copied === 'hex' ? 'Copied!' : 'Click to copy'}
          </span>
        </div>
      </div>
      
      {/* Color info */}
      <div style={{ padding: 'var(--card-padding-sm)' }}>
        <h3 className="font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
          {color.name}
        </h3>
        <p className="text-sm mb-3" style={{ color: 'var(--text-tertiary)' }}>
          {color.description}
        </p>
        
        {/* Copy buttons */}
        <div className="space-y-2">
          <button
            onClick={() => copyToClipboard(color.variable, 'variable')}
            className="w-full text-left p-2 rounded text-sm font-mono transition-colors"
            style={{
              background: 'var(--bg-elevated)',
              color: 'var(--text-secondary)',
              borderRadius: 'var(--radius-md)',
              border: `var(--border-thin) solid var(--border-secondary)`,
              transition: 'var(--transition-fast)'
            }}
          >
            {copied === 'variable' ? 'Copied!' : color.variable}
          </button>
          
          <button
            onClick={() => copyToClipboard(color.hex, 'hex')}
            className="w-full text-left p-2 rounded text-sm font-mono transition-colors"
            style={{
              background: 'var(--bg-elevated)',
              color: 'var(--text-secondary)',
              borderRadius: 'var(--radius-md)',
              border: `var(--border-thin) solid var(--border-secondary)`,
              transition: 'var(--transition-fast)'
            }}
          >
            {copied === 'hex' ? 'Copied!' : color.hex}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ColorsPage() {
  return (
    <div className="max-w-6xl mx-auto px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          Colors
        </h1>
        <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
          Our comprehensive color system includes base colors, semantic meanings, and contextual applications.
          Click on any color swatch or token to copy its value.
        </p>
      </div>

      {colorSections.map((section) => (
        <section key={section.title} className="mb-12">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
              {section.title}
            </h2>
            <p style={{ color: 'var(--text-secondary)' }}>
              {section.description}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {section.colors.map((color) => (
              <ColorCard key={color.name} color={color} />
            ))}
          </div>
        </section>
      ))}

      {/* Usage examples */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
          Usage Examples
        </h2>
        
        <div 
          className="rounded-lg p-6 font-mono text-sm"
          style={{
            background: 'var(--code-bg)',
            color: 'var(--code-text)',
            borderRadius: 'var(--radius-xl)'
          }}
        >
          <div style={{ color: 'var(--code-comment)' }}>{/* CSS Usage */}</div>
          <br />
          <div>
            <span style={{ color: 'var(--code-punctuation)' }}>.</span>
            <span style={{ color: 'var(--code-tag)' }}>primary-button</span>
            <span style={{ color: 'var(--code-punctuation)' }}> {'{'}</span>
          </div>
          <div style={{ paddingLeft: '1rem' }}>
            <span style={{ color: 'var(--code-attribute)' }}>background</span>
            <span style={{ color: 'var(--code-punctuation)' }}>:</span>
            <span style={{ color: 'var(--code-function)' }}> var(</span>
            <span style={{ color: 'var(--code-string)' }}>--color-purple-500</span>
            <span style={{ color: 'var(--code-function)' }}>)</span>
            <span style={{ color: 'var(--code-punctuation)' }}>;</span>
          </div>
          <div style={{ paddingLeft: '1rem' }}>
            <span style={{ color: 'var(--code-attribute)' }}>color</span>
            <span style={{ color: 'var(--code-punctuation)' }}>:</span>
            <span style={{ color: 'var(--code-function)' }}> var(</span>
            <span style={{ color: 'var(--code-string)' }}>--text-primary</span>
            <span style={{ color: 'var(--code-function)' }}>)</span>
            <span style={{ color: 'var(--code-punctuation)' }}>;</span>
          </div>
          <div>
            <span style={{ color: 'var(--code-punctuation)' }}>{'}'}</span>
          </div>
        </div>
      </section>
    </div>
  );
}