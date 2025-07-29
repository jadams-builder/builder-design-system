'use client';

import { useState } from 'react';

const fontFamilies = [
  { name: 'Primary', variable: '--font-primary', stack: 'Poppins, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, sans-serif', usage: 'Body text, UI elements' },
  { name: 'Secondary', variable: '--font-secondary', stack: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif', usage: 'Alternative sans-serif' },
  { name: 'Monospace', variable: '--font-mono', stack: 'JetBrains Mono, Fira Code, SF Mono, Monaco, Cascadia Code, Roboto Mono, Consolas, Courier New, monospace', usage: 'Code blocks, data display' },
  { name: 'Display', variable: '--font-display', stack: 'var(--font-primary)', usage: 'Large headings, hero text' },
];

const fontSizes = [
  { name: 'XS', variable: '--font-xs', size: '0.75rem', pixels: '12px', usage: 'Captions, fine print' },
  { name: 'SM', variable: '--font-sm', size: '0.875rem', pixels: '14px', usage: 'Small text, labels' },
  { name: 'Base', variable: '--font-base', size: '1rem', pixels: '16px', usage: 'Body text (default)' },
  { name: 'MD', variable: '--font-md', size: '1.125rem', pixels: '18px', usage: 'Subheadings, intro text' },
  { name: 'LG', variable: '--font-lg', size: '1.25rem', pixels: '20px', usage: 'Card titles' },
  { name: 'XL', variable: '--font-xl', size: '1.375rem', pixels: '22px', usage: 'Section headings' },
  { name: '2XL', variable: '--font-2xl', size: '1.5rem', pixels: '24px', usage: 'Page headings' },
  { name: '3XL', variable: '--font-3xl', size: '1.875rem', pixels: '30px', usage: 'Large headings' },
  { name: '4XL', variable: '--font-4xl', size: '2.25rem', pixels: '36px', usage: 'Hero headings' },
  { name: '5XL', variable: '--font-5xl', size: '3rem', pixels: '48px', usage: 'Display text' },
  { name: '6XL', variable: '--font-6xl', size: '3.75rem', pixels: '60px', usage: 'Large display' },
  { name: '7XL', variable: '--font-7xl', size: '4.5rem', pixels: '72px', usage: 'Massive display' },
];

const fontWeights = [
  { name: 'Light', variable: '--font-weight-light', value: '300', usage: 'Subtle text, elegant headings' },
  { name: 'Normal', variable: '--font-weight-normal', value: '400', usage: 'Body text (default)' },
  { name: 'Medium', variable: '--font-weight-medium', value: '500', usage: 'Emphasis, UI elements' },
  { name: 'Semibold', variable: '--font-weight-semibold', value: '600', usage: 'Subheadings, strong emphasis' },
  { name: 'Bold', variable: '--font-weight-bold', value: '700', usage: 'Headings, important text' },
  { name: 'Extrabold', variable: '--font-weight-extrabold', value: '800', usage: 'Strong headings' },
  { name: 'Black', variable: '--font-weight-black', value: '900', usage: 'Display text, impact' },
];

const lineHeights = [
  { name: 'None', variable: '--line-height-none', value: '1', usage: 'Tight spacing, decorative text' },
  { name: 'Tight', variable: '--line-height-tight', value: '1.25', usage: 'Headings, compact layouts' },
  { name: 'Snug', variable: '--line-height-snug', value: '1.375', usage: 'Subheadings' },
  { name: 'Normal', variable: '--line-height-normal', value: '1.5', usage: 'Body text (default)' },
  { name: 'Relaxed', variable: '--line-height-relaxed', value: '1.625', usage: 'Comfortable reading' },
  { name: 'Loose', variable: '--line-height-loose', value: '2', usage: 'Maximum readability' },
];

const letterSpacings = [
  { name: 'Tighter', variable: '--letter-spacing-tighter', value: '-0.05em', usage: 'Large headings' },
  { name: 'Tight', variable: '--letter-spacing-tight', value: '-0.025em', usage: 'Medium headings' },
  { name: 'Normal', variable: '--letter-spacing-normal', value: '0', usage: 'Body text (default)' },
  { name: 'Wide', variable: '--letter-spacing-wide', value: '0.025em', usage: 'Emphasis, spacing' },
  { name: 'Wider', variable: '--letter-spacing-wider', value: '0.05em', usage: 'Labels, small caps' },
  { name: 'Widest', variable: '--letter-spacing-widest', value: '0.1em', usage: 'All caps, strong spacing' },
];

function CopyButton({ text, label }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={copyToClipboard}
      className="px-3 py-1 rounded text-xs font-mono transition-colors"
      style={{
        background: 'var(--bg-elevated)',
        color: 'var(--text-secondary)',
        borderRadius: 'var(--radius-sm)',
        border: `var(--border-thin) solid var(--border-secondary)`,
        transition: 'var(--transition-fast)'
      }}
    >
      {copied ? 'Copied!' : (label || text)}
    </button>
  );
}

export default function TypographyPage() {
  return (
    <div className="max-w-6xl mx-auto px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          Typography
        </h1>
        <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
          Our typography system provides consistent text styling across all interfaces with carefully crafted scales for size, weight, spacing, and hierarchy.
        </p>
      </div>

      {/* Font Families */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
          Font Families
        </h2>
        
        <div className="space-y-6">
          {fontFamilies.map((font) => (
            <div 
              key={font.name}
              className="rounded-lg p-6 border"
              style={{
                background: 'var(--card-bg)',
                border: `var(--border-thin) solid var(--card-border)`,
                borderRadius: 'var(--card-border-radius)'
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
                  {font.name}
                </h3>
                <CopyButton text={font.variable} />
              </div>
              
              <div 
                className="text-2xl mb-3"
                style={{ fontFamily: `var(${font.variable})`, color: 'var(--text-primary)' }}
              >
                The quick brown fox jumps over the lazy dog
              </div>
              
              <p className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
                <strong>Usage:</strong> {font.usage}
              </p>
              <p className="text-xs font-mono" style={{ color: 'var(--text-tertiary)' }}>
                {font.stack}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Font Sizes */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
          Font Sizes
        </h2>
        
        <div className="space-y-4">
          {fontSizes.map((size) => (
            <div 
              key={size.name}
              className="flex items-center justify-between p-4 rounded-lg border"
              style={{
                background: 'var(--card-bg)',
                border: `var(--border-thin) solid var(--card-border)`,
                borderRadius: 'var(--card-border-radius)'
              }}
            >
              <div className="flex items-center space-x-8 flex-1">
                <div className="w-16">
                  <span className="font-mono text-sm" style={{ color: 'var(--text-tertiary)' }}>
                    {size.name}
                  </span>
                </div>
                
                <div 
                  style={{ 
                    fontSize: `var(${size.variable})`,
                    color: 'var(--text-primary)',
                    lineHeight: '1.2'
                  }}
                >
                  Sample Text
                </div>
                
                <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  {size.size} ({size.pixels})
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
                  {size.usage}
                </span>
                <CopyButton text={size.variable} label={size.name} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Font Weights */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
          Font Weights
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {fontWeights.map((weight) => (
            <div 
              key={weight.name}
              className="p-4 rounded-lg border"
              style={{
                background: 'var(--card-bg)',
                border: `var(--border-thin) solid var(--card-border)`,
                borderRadius: 'var(--card-border-radius)'
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                  {weight.name}
                </h4>
                <CopyButton text={weight.variable} />
              </div>
              
              <div 
                className="text-xl mb-2"
                style={{ 
                  fontWeight: `var(${weight.variable})`,
                  color: 'var(--text-primary)'
                }}
              >
                Sample Text ({weight.value})
              </div>
              
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                {weight.usage}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Line Heights */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
          Line Heights
        </h2>
        
        <div className="space-y-4">
          {lineHeights.map((lineHeight) => (
            <div 
              key={lineHeight.name}
              className="p-4 rounded-lg border"
              style={{
                background: 'var(--card-bg)',
                border: `var(--border-thin) solid var(--card-border)`,
                borderRadius: 'var(--card-border-radius)'
              }}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                    {lineHeight.name} ({lineHeight.value})
                  </h4>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    {lineHeight.usage}
                  </p>
                </div>
                <CopyButton text={lineHeight.variable} />
              </div>
              
              <div 
                className="max-w-2xl"
                style={{ 
                  lineHeight: `var(${lineHeight.variable})`,
                  color: 'var(--text-primary)'
                }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Letter Spacings */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
          Letter Spacing
        </h2>
        
        <div className="space-y-4">
          {letterSpacings.map((spacing) => (
            <div 
              key={spacing.name}
              className="p-4 rounded-lg border"
              style={{
                background: 'var(--card-bg)',
                border: `var(--border-thin) solid var(--card-border)`,
                borderRadius: 'var(--card-border-radius)'
              }}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                    {spacing.name} ({spacing.value})
                  </h4>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    {spacing.usage}
                  </p>
                </div>
                <CopyButton text={spacing.variable} />
              </div>
              
              <div 
                className="text-lg"
                style={{ 
                  letterSpacing: `var(${spacing.variable})`,
                  color: 'var(--text-primary)'
                }}
              >
                SAMPLE TEXT WITH SPACING
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Typography Examples */}
      <section>
        <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
          Typography Hierarchy Example
        </h2>
        
        <div 
          className="rounded-lg p-8 border"
          style={{
            background: 'var(--card-bg)',
            border: `var(--border-thin) solid var(--card-border)`,
            borderRadius: 'var(--card-border-radius)'
          }}
        >
          <h1 
            className="mb-4"
            style={{ 
              fontSize: 'var(--font-4xl)',
              fontWeight: 'var(--font-weight-bold)',
              lineHeight: 'var(--line-height-tight)',
              color: 'var(--text-primary)'
            }}
          >
            Main Heading (4XL Bold)
          </h1>
          
          <h2 
            className="mb-4"
            style={{ 
              fontSize: 'var(--font-2xl)',
              fontWeight: 'var(--font-weight-semibold)',
              lineHeight: 'var(--line-height-tight)',
              color: 'var(--text-primary)'
            }}
          >
            Section Heading (2XL Semibold)
          </h2>
          
          <h3 
            className="mb-4"
            style={{ 
              fontSize: 'var(--font-lg)',
              fontWeight: 'var(--font-weight-medium)',
              lineHeight: 'var(--line-height-snug)',
              color: 'var(--text-secondary)'
            }}
          >
            Subsection Heading (LG Medium)
          </h3>
          
          <p 
            className="mb-4"
            style={{ 
              fontSize: 'var(--font-base)',
              fontWeight: 'var(--font-weight-normal)',
              lineHeight: 'var(--line-height-normal)',
              color: 'var(--text-primary)'
            }}
          >
            Body paragraph text using the base font size with normal weight and line height. This demonstrates the default text styling for content throughout the application.
          </p>
          
          <p 
            className="mb-0"
            style={{ 
              fontSize: 'var(--font-sm)',
              fontWeight: 'var(--font-weight-normal)',
              lineHeight: 'var(--line-height-normal)',
              color: 'var(--text-tertiary)'
            }}
          >
            Small supporting text (SM Normal) - perfect for captions, metadata, and secondary information.
          </p>
        </div>
      </section>
    </div>
  );
}