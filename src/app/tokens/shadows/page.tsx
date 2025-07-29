'use client';

import { useState } from 'react';

const shadowSections = [
  {
    title: 'Base Shadows',
    description: 'Core shadow system for creating depth and elevation',
    shadows: [
      { name: 'XS', variable: '--shadow-xs', value: '0 1px 2px 0 rgba(255, 255, 255, 0.05)', description: 'Minimal elevation for subtle separation' },
      { name: 'SM', variable: '--shadow-sm', value: '0 1px 3px 0 rgba(255, 255, 255, 0.1), 0 1px 2px 0 rgba(255, 255, 255, 0.06)', description: 'Small shadows for cards and buttons' },
      { name: 'Base', variable: '--shadow-base', value: '0 4px 6px -1px rgba(255, 255, 255, 0.1), 0 2px 4px -1px rgba(255, 255, 255, 0.06)', description: 'Default shadow for most components' },
      { name: 'MD', variable: '--shadow-md', value: '0 10px 15px -3px rgba(255, 255, 255, 0.1), 0 4px 6px -2px rgba(255, 255, 255, 0.05)', description: 'Medium elevation for dropdowns' },
      { name: 'LG', variable: '--shadow-lg', value: '0 20px 25px -5px rgba(255, 255, 255, 0.15), 0 10px 10px -5px rgba(255, 255, 255, 0.08)', description: 'Large shadows for modals' },
      { name: 'XL', variable: '--shadow-xl', value: '0 25px 50px -12px rgba(255, 255, 255, 0.2)', description: 'Extra large shadows for overlays' },
      { name: '2XL', variable: '--shadow-2xl', value: '0 25px 50px -12px rgba(255, 255, 255, 0.25)', description: 'Maximum elevation shadows' },
    ]
  },
  {
    title: 'Special Shadows',
    description: 'Specialized shadow effects for unique use cases',
    shadows: [
      { name: 'Inner', variable: '--shadow-inner', value: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.15)', description: 'Inset shadow for pressed states' },
      { name: 'None', variable: '--shadow-none', value: 'none', description: 'Removes all shadows' },
      { name: 'Glow', variable: '--shadow-glow', value: '0 0 20px rgba(139, 92, 246, 0.3)', description: 'Purple glow effect for brand elements' },
      { name: 'Glow Large', variable: '--shadow-glow-lg', value: '0 0 40px rgba(139, 92, 246, 0.2)', description: 'Large purple glow for hero sections' },
    ]
  },
  {
    title: 'Component Shadows',
    description: 'Context-specific shadows used by design system components',
    shadows: [
      { name: 'Card Default', variable: '--card-shadow', value: 'var(--shadow-sm)', description: 'Default shadow for card components' },
      { name: 'Card Hover', variable: '--card-shadow-hover', value: 'var(--shadow-md)', description: 'Hover state shadow for interactive cards' },
    ]
  }
];

function ShadowCard({ shadow }: { shadow: { name: string; variable: string; value: string; description: string } }) {
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
      {/* Shadow preview */}
      <div className="p-6 flex items-center justify-center" style={{ background: 'var(--bg-primary)' }}>
        <div 
          className="w-24 h-16 rounded-lg"
          style={{ 
            backgroundColor: 'var(--bg-elevated)',
            boxShadow: `var(${shadow.variable})`,
            border: `var(--border-thin) solid var(--border-tertiary)`
          }}
          title="Shadow preview"
        />
      </div>
      
      {/* Shadow info */}
      <div style={{ padding: 'var(--card-padding-sm)' }}>
        <h3 className="font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
          {shadow.name}
        </h3>
        <p className="text-sm mb-3" style={{ color: 'var(--text-tertiary)' }}>
          {shadow.description}
        </p>
        
        {/* Copy buttons */}
        <div className="space-y-2">
          <button
            onClick={() => copyToClipboard(shadow.variable, 'variable')}
            className="w-full text-left p-2 rounded text-sm font-mono transition-colors"
            style={{
              background: 'var(--bg-elevated)',
              color: 'var(--text-secondary)',
              borderRadius: 'var(--radius-md)',
              border: `var(--border-thin) solid var(--border-secondary)`,
              transition: 'var(--transition-fast)'
            }}
          >
            {copied === 'variable' ? 'Copied!' : shadow.variable}
          </button>
          
          <button
            onClick={() => copyToClipboard(shadow.value, 'value')}
            className="w-full text-left p-2 rounded text-xs font-mono transition-colors overflow-hidden"
            style={{
              background: 'var(--bg-elevated)',
              color: 'var(--text-secondary)',
              borderRadius: 'var(--radius-md)',
              border: `var(--border-thin) solid var(--border-secondary)`,
              transition: 'var(--transition-fast)',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis'
            }}
            title={shadow.value}
          >
            {copied === 'value' ? 'Copied!' : shadow.value}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ShadowsPage() {
  return (
    <div className="max-w-6xl mx-auto px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          Shadows
        </h1>
        <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
          Our shadow system creates depth and visual hierarchy through consistent elevation patterns.
          Click on any shadow token or value to copy it.
        </p>
      </div>

      {shadowSections.map((section) => (
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
            {section.shadows.map((shadow) => (
              <ShadowCard key={shadow.name} shadow={shadow} />
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
            <span style={{ color: 'var(--code-tag)' }}>elevated-card</span>
            <span style={{ color: 'var(--code-punctuation)' }}> {'{'}</span>
          </div>
          <div style={{ paddingLeft: '1rem' }}>
            <span style={{ color: 'var(--code-attribute)' }}>box-shadow</span>
            <span style={{ color: 'var(--code-punctuation)' }}>:</span>
            <span style={{ color: 'var(--code-function)' }}> var(</span>
            <span style={{ color: 'var(--code-string)' }}>--shadow-lg</span>
            <span style={{ color: 'var(--code-function)' }}>)</span>
            <span style={{ color: 'var(--code-punctuation)' }}>;</span>
          </div>
          <div style={{ paddingLeft: '1rem' }}>
            <span style={{ color: 'var(--code-attribute)' }}>transition</span>
            <span style={{ color: 'var(--code-punctuation)' }}>:</span>
            <span style={{ color: 'var(--code-function)' }}> var(</span>
            <span style={{ color: 'var(--code-string)' }}>--transition-base</span>
            <span style={{ color: 'var(--code-function)' }}>)</span>
            <span style={{ color: 'var(--code-punctuation)' }}>;</span>
          </div>
          <div>
            <span style={{ color: 'var(--code-punctuation)' }}>{'}'}</span>
          </div>
          <br />
          <div>
            <span style={{ color: 'var(--code-punctuation)' }}>.</span>
            <span style={{ color: 'var(--code-tag)' }}>elevated-card</span>
            <span style={{ color: 'var(--code-punctuation)' }}>:</span>
            <span style={{ color: 'var(--code-tag)' }}>hover</span>
            <span style={{ color: 'var(--code-punctuation)' }}> {'{'}</span>
          </div>
          <div style={{ paddingLeft: '1rem' }}>
            <span style={{ color: 'var(--code-attribute)' }}>box-shadow</span>
            <span style={{ color: 'var(--code-punctuation)' }}>:</span>
            <span style={{ color: 'var(--code-function)' }}> var(</span>
            <span style={{ color: 'var(--code-string)' }}>--shadow-xl</span>
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