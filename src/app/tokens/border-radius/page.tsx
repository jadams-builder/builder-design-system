'use client';

import { useState } from 'react';

const radiusSections = [
  {
    title: 'Base Border Radius',
    description: 'Core border radius scale for consistent corner rounding',
    radii: [
      { name: 'None', variable: '--radius-none', value: '0', pixels: '0px', description: 'No border radius - sharp corners' },
      { name: 'SM', variable: '--radius-sm', value: '0.125rem', pixels: '2px', description: 'Small radius for subtle rounding' },
      { name: 'Base', variable: '--radius-base', value: '0.25rem', pixels: '4px', description: 'Default radius for most elements' },
      { name: 'MD', variable: '--radius-md', value: '0.375rem', pixels: '6px', description: 'Medium radius for inputs and small components' },
      { name: 'LG', variable: '--radius-lg', value: '0.5rem', pixels: '8px', description: 'Large radius for buttons and cards' },
      { name: 'XL', variable: '--radius-xl', value: '0.75rem', pixels: '12px', description: 'Extra large radius for prominent components' },
      { name: '2XL', variable: '--radius-2xl', value: '1rem', pixels: '16px', description: 'Double extra large radius for containers' },
      { name: '3XL', variable: '--radius-3xl', value: '1.5rem', pixels: '24px', description: 'Triple extra large radius for hero sections' },
      { name: 'Full', variable: '--radius-full', value: '9999px', pixels: '9999px', description: 'Pill shape - fully rounded' },
    ]
  },
  {
    title: 'Component Border Radius',
    description: 'Context-specific border radius tokens used by design system components',
    radii: [
      { name: 'Button SM', variable: '--button-sm-border-radius', value: 'var(--radius-md)', pixels: '6px', description: 'Small button corner radius' },
      { name: 'Button Base', variable: '--button-base-border-radius', value: 'var(--radius-lg)', pixels: '8px', description: 'Default button corner radius' },
      { name: 'Button LG', variable: '--button-lg-border-radius', value: 'var(--radius-xl)', pixels: '12px', description: 'Large button corner radius' },
      { name: 'Card', variable: '--card-border-radius', value: 'var(--radius-xl)', pixels: '12px', description: 'Card component corner radius' },
      { name: 'Input', variable: '--input-border-radius', value: 'var(--radius-lg)', pixels: '8px', description: 'Input field corner radius' },
    ]
  }
];

function RadiusCard({ radius }: { radius: { name: string; variable: string; value: string; pixels: string; description: string } }) {
  const [copied, setCopied] = useState('');

  const copyToClipboard = async (text: string, type: 'variable' | 'value') => {
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
      {/* Radius preview */}
      <div className="p-6 flex items-center justify-center" style={{ background: 'var(--bg-primary)' }}>
        <div 
          className="w-24 h-16 flex items-center justify-center text-xs font-medium"
          style={{ 
            backgroundColor: 'var(--bg-brand-primary)',
            color: 'var(--text-primary)',
            borderRadius: `var(${radius.variable})`,
            border: `var(--border-thin) solid var(--border-brand)`
          }}
          title="Border radius preview"
        >
          {radius.pixels}
        </div>
      </div>
      
      {/* Radius info */}
      <div style={{ padding: 'var(--card-padding-sm)' }}>
        <h3 className="font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
          {radius.name}
        </h3>
        <p className="text-sm mb-3" style={{ color: 'var(--text-tertiary)' }}>
          {radius.description}
        </p>
        
        {/* Copy buttons */}
        <div className="space-y-2">
          <button
            onClick={() => copyToClipboard(radius.variable, 'variable')}
            className="w-full text-left p-2 rounded text-sm font-mono transition-colors"
            style={{
              background: 'var(--bg-elevated)',
              color: 'var(--text-secondary)',
              borderRadius: 'var(--radius-md)',
              border: `var(--border-thin) solid var(--border-secondary)`,
              transition: 'var(--transition-fast)'
            }}
          >
            {copied === 'variable' ? 'Copied!' : radius.variable}
          </button>
          
          <button
            onClick={() => copyToClipboard(radius.value, 'value')}
            className="w-full text-left p-2 rounded text-sm font-mono transition-colors"
            style={{
              background: 'var(--bg-elevated)',
              color: 'var(--text-secondary)',
              borderRadius: 'var(--radius-md)',
              border: `var(--border-thin) solid var(--border-secondary)`,
              transition: 'var(--transition-fast)'
            }}
          >
            {copied === 'value' ? 'Copied!' : radius.value}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function BorderRadiusPage() {
  return (
    <div className="max-w-6xl mx-auto px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          Border Radius
        </h1>
        <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
          Our border radius system provides consistent corner rounding across all components.
          Click on any border radius token or value to copy it.
        </p>
      </div>

      {radiusSections.map((section) => (
        <section key={section.title} className="mb-12">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
              {section.title}
            </h2>
            <p style={{ color: 'var(--text-secondary)' }}>
              {section.description}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {section.radii.map((radius) => (
              <RadiusCard key={radius.name} radius={radius} />
            ))}
          </div>
        </section>
      ))}

      {/* Usage examples */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
          Usage Examples
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Example components with different radius */}
          <div>
            <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
              Component Examples
            </h3>
            <div className="space-y-4">
              <div 
                className="p-4 text-sm"
                style={{
                  background: 'var(--bg-elevated)',
                  borderRadius: 'var(--radius-sm)',
                  border: `var(--border-thin) solid var(--border-secondary)`
                }}
              >
                Small radius (--radius-sm)
              </div>
              <div 
                className="p-4 text-sm"
                style={{
                  background: 'var(--bg-elevated)',
                  borderRadius: 'var(--radius-lg)',
                  border: `var(--border-thin) solid var(--border-secondary)`
                }}
              >
                Large radius (--radius-lg)
              </div>
              <div 
                className="p-4 text-sm"
                style={{
                  background: 'var(--bg-elevated)',
                  borderRadius: 'var(--radius-full)',
                  border: `var(--border-thin) solid var(--border-secondary)`
                }}
              >
                Full radius (--radius-full)
              </div>
            </div>
          </div>
          
          {/* Code example */}
          <div>
            <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
              CSS Usage
            </h3>
            <div 
              className="p-4 font-mono text-sm"
              style={{
                background: 'var(--code-bg)',
                color: 'var(--code-text)',
                borderRadius: 'var(--radius-lg)'
              }}
            >
              <div style={{ color: 'var(--code-comment)' }}>{/* Button with rounded corners */}</div>
              <div>
                <span style={{ color: 'var(--code-punctuation)' }}>.</span>
                <span style={{ color: 'var(--code-tag)' }}>button</span>
                <span style={{ color: 'var(--code-punctuation)' }}> {'{'}</span>
              </div>
              <div style={{ paddingLeft: '1rem' }}>
                <span style={{ color: 'var(--code-attribute)' }}>border-radius</span>
                <span style={{ color: 'var(--code-punctuation)' }}>:</span>
                <span style={{ color: 'var(--code-function)' }}> var(</span>
                <span style={{ color: 'var(--code-string)' }}>--radius-lg</span>
                <span style={{ color: 'var(--code-function)' }}>)</span>
                <span style={{ color: 'var(--code-punctuation)' }}>;</span>
              </div>
              <div>
                <span style={{ color: 'var(--code-punctuation)' }}>{'}'}</span>
              </div>
              <br />
              <div style={{ color: 'var(--code-comment)' }}>{/* Pill-shaped element */}</div>
              <div>
                <span style={{ color: 'var(--code-punctuation)' }}>.</span>
                <span style={{ color: 'var(--code-tag)' }}>pill</span>
                <span style={{ color: 'var(--code-punctuation)' }}> {'{'}</span>
              </div>
              <div style={{ paddingLeft: '1rem' }}>
                <span style={{ color: 'var(--code-attribute)' }}>border-radius</span>
                <span style={{ color: 'var(--code-punctuation)' }}>:</span>
                <span style={{ color: 'var(--code-function)' }}> var(</span>
                <span style={{ color: 'var(--code-string)' }}>--radius-full</span>
                <span style={{ color: 'var(--code-function)' }}>)</span>
                <span style={{ color: 'var(--code-punctuation)' }}>;</span>
              </div>
              <div>
                <span style={{ color: 'var(--code-punctuation)' }}>{'}'}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}