'use client';

import { useState } from 'react';

const spacingTokens = [
  { name: '0', variable: '--space-0', value: '0rem', pixels: '0px', usage: 'No spacing' },
  { name: 'px', variable: '--space-px', value: '0.0625rem', pixels: '1px', usage: 'Hairline borders, fine separators' },
  { name: '0.5', variable: '--space-0_5', value: '0.125rem', pixels: '2px', usage: 'Very tight spacing' },
  { name: '1', variable: '--space-1', value: '0.25rem', pixels: '4px', usage: 'Minimal spacing between elements' },
  { name: '1.5', variable: '--space-1_5', value: '0.375rem', pixels: '6px', usage: 'Small spacing, tight layouts' },
  { name: '2', variable: '--space-2', value: '0.5rem', pixels: '8px', usage: 'Base small spacing' },
  { name: '2.5', variable: '--space-2_5', value: '0.625rem', pixels: '10px', usage: 'Button padding, form spacing' },
  { name: '3', variable: '--space-3', value: '0.75rem', pixels: '12px', usage: 'Standard small spacing' },
  { name: '3.5', variable: '--space-3_5', value: '0.875rem', pixels: '14px', usage: 'Medium-small spacing' },
  { name: '4', variable: '--space-4', value: '1rem', pixels: '16px', usage: 'Base unit spacing' },
  { name: '5', variable: '--space-5', value: '1.25rem', pixels: '20px', usage: 'Standard medium spacing' },
  { name: '6', variable: '--space-6', value: '1.5rem', pixels: '24px', usage: 'Card padding, section spacing' },
  { name: '7', variable: '--space-7', value: '1.75rem', pixels: '28px', usage: 'Medium-large spacing' },
  { name: '8', variable: '--space-8', value: '2rem', pixels: '32px', usage: 'Large content spacing' },
  { name: '9', variable: '--space-9', value: '2.25rem', pixels: '36px', usage: 'Extra large spacing' },
  { name: '10', variable: '--space-10', value: '2.5rem', pixels: '40px', usage: 'Section breaks' },
  { name: '12', variable: '--space-12', value: '3rem', pixels: '48px', usage: 'Major section spacing' },
  { name: '16', variable: '--space-16', value: '4rem', pixels: '64px', usage: 'Large layout spacing' },
  { name: '20', variable: '--space-20', value: '5rem', pixels: '80px', usage: 'Hero section spacing' },
  { name: '24', variable: '--space-24', value: '6rem', pixels: '96px', usage: 'Page section spacing' },
  { name: '32', variable: '--space-32', value: '8rem', pixels: '128px', usage: 'Massive layout spacing' },
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
      className="px-2 py-1 rounded text-xs font-mono transition-colors"
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

function SpacingVisualizer({ size }: { size: string }) {
  return (
    <div className="flex items-center">
      <div
        style={{
          width: `var(${size})`,
          height: '1rem',
          background: 'var(--color-purple-400)',
          borderRadius: 'var(--radius-sm)',
          minWidth: '1px'
        }}
      />
      <div className="ml-2 text-xs" style={{ color: 'var(--text-tertiary)' }}>
        {`var(${size})`}
      </div>
    </div>
  );
}

export default function SpacingPage() {
  return (
    <div className="max-w-6xl mx-auto px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          Spacing
        </h1>
        <p className="text-lg mb-6" style={{ color: 'var(--text-secondary)' }}>
          Our spacing system provides consistent measurements for margins, padding, gaps, and positioning. 
          Based on a 4px base unit with logical scaling for different layout needs.
        </p>

        <div 
          className="rounded-lg p-6 border"
          style={{
            background: 'var(--bg-info-subtle)',
            border: `var(--border-thin) solid var(--border-info)`,
            borderRadius: 'var(--card-border-radius)'
          }}
        >
          <h3 className="font-semibold mb-2" style={{ color: 'var(--text-info)' }}>
            Spacing Scale Principle
          </h3>
          <p style={{ color: 'var(--text-primary)' }}>
            Our spacing scale follows a logical progression starting from 4px (1 unit). 
            This creates consistent rhythm and helps maintain visual hierarchy across all interfaces.
            Each token is designed for specific use cases to ensure predictable layouts.
          </p>
        </div>
      </div>

      {/* Spacing Scale */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
          Spacing Scale
        </h2>
        
        <div className="space-y-4">
          {spacingTokens.map((token) => (
            <div 
              key={token.name}
              className="flex items-center justify-between p-4 rounded-lg border"
              style={{
                background: 'var(--card-bg)',
                border: `var(--border-thin) solid var(--card-border)`,
                borderRadius: 'var(--card-border-radius)'
              }}
            >
              <div className="flex items-center space-x-8 flex-1 min-w-0">
                {/* Token name */}
                <div className="w-12 flex-shrink-0">
                  <span className="font-mono font-semibold" style={{ color: 'var(--text-primary)' }}>
                    {token.name}
                  </span>
                </div>
                
                {/* Visual representation */}
                <div className="w-48 flex-shrink-0">
                  <SpacingVisualizer size={token.variable} />
                </div>
                
                {/* Values */}
                <div className="flex items-center space-x-4 flex-shrink-0">
                  <span className="font-mono text-sm" style={{ color: 'var(--text-secondary)' }}>
                    {token.value}
                  </span>
                  <span className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
                    ({token.pixels})
                  </span>
                </div>
                
                {/* Usage */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm truncate" style={{ color: 'var(--text-secondary)' }}>
                    {token.usage}
                  </p>
                </div>
              </div>
              
              {/* Copy button */}
              <div className="ml-4 flex-shrink-0">
                <CopyButton text={token.variable} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Common Use Cases */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
          Common Use Cases
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div 
            className="p-6 rounded-lg border"
            style={{
              background: 'var(--card-bg)',
              border: `var(--border-thin) solid var(--card-border)`,
              borderRadius: 'var(--card-border-radius)'
            }}
          >
            <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-brand-primary)' }}>
              Component Spacing
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span style={{ color: 'var(--text-secondary)' }}>Button padding:</span>
                <code className="font-mono" style={{ color: 'var(--text-primary)' }}>--space-2_5 --space-4</code>
              </div>
              <div className="flex justify-between">
                <span style={{ color: 'var(--text-secondary)' }}>Input padding:</span>
                <code className="font-mono" style={{ color: 'var(--text-primary)' }}>--space-2_5 --space-3_5</code>
              </div>
              <div className="flex justify-between">
                <span style={{ color: 'var(--text-secondary)' }}>Card padding:</span>
                <code className="font-mono" style={{ color: 'var(--text-primary)' }}>--space-6</code>
              </div>
              <div className="flex justify-between">
                <span style={{ color: 'var(--text-secondary)' }}>Card gap:</span>
                <code className="font-mono" style={{ color: 'var(--text-primary)' }}>--space-4 --space-6</code>
              </div>
            </div>
          </div>
          
          <div 
            className="p-6 rounded-lg border"
            style={{
              background: 'var(--card-bg)',
              border: `var(--border-thin) solid var(--card-border)`,
              borderRadius: 'var(--card-border-radius)'
            }}
          >
            <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-brand-secondary)' }}>
              Layout Spacing
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span style={{ color: 'var(--text-secondary)' }}>Section margins:</span>
                <code className="font-mono" style={{ color: 'var(--text-primary)' }}>--space-12 --space-16</code>
              </div>
              <div className="flex justify-between">
                <span style={{ color: 'var(--text-secondary)' }}>Page padding:</span>
                <code className="font-mono" style={{ color: 'var(--text-primary)' }}>--space-8 --space-12</code>
              </div>
              <div className="flex justify-between">
                <span style={{ color: 'var(--text-secondary)' }}>Grid gaps:</span>
                <code className="font-mono" style={{ color: 'var(--text-primary)' }}>--space-6 --space-8</code>
              </div>
              <div className="flex justify-between">
                <span style={{ color: 'var(--text-secondary)' }}>Hero spacing:</span>
                <code className="font-mono" style={{ color: 'var(--text-primary)' }}>--space-20 --space-24</code>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Examples */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
          Interactive Examples
        </h2>
        
        {/* Card with different spacing */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
              Card with Different Padding Sizes
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { size: '--space-4', label: 'Small (16px)' },
                { size: '--space-6', label: 'Medium (24px)' },
                { size: '--space-8', label: 'Large (32px)' }
              ].map(({ size, label }) => (
                <div 
                  key={size}
                  style={{
                    background: 'var(--card-bg)',
                    border: `var(--border-thin) solid var(--card-border)`,
                    borderRadius: 'var(--card-border-radius)',
                    padding: `var(${size})`
                  }}
                >
                  <h4 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                    {label}
                  </h4>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    This card uses <code className="font-mono">{size}</code> for padding.
                  </p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Stack with different gaps */}
          <div>
            <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
              Stacks with Different Gap Sizes
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { gap: '--space-2', label: 'Tight (8px)' },
                { gap: '--space-4', label: 'Normal (16px)' },
                { gap: '--space-6', label: 'Loose (24px)' }
              ].map(({ gap, label }) => (
                <div key={gap}>
                  <h4 className="font-semibold mb-3" style={{ color: 'var(--text-secondary)' }}>
                    {label}
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: `var(${gap})` }}>
                    {[1, 2, 3].map((i) => (
                      <div 
                        key={i}
                        style={{
                          background: 'var(--bg-elevated)',
                          padding: 'var(--space-3)',
                          borderRadius: 'var(--radius-md)',
                          border: `var(--border-thin) solid var(--border-secondary)`
                        }}
                      >
                        <span className="text-sm" style={{ color: 'var(--text-primary)' }}>
                          Stack item {i}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Code Examples */}
      <section>
        <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
          Usage Examples
        </h2>
        
        <div 
          className="rounded-lg p-6 font-mono text-sm overflow-x-auto"
          style={{
            background: 'var(--code-bg)',
            color: 'var(--code-text)',
            borderRadius: 'var(--radius-xl)'
          }}
        >
          <div style={{ color: 'var(--code-comment)' }}>{/* CSS Usage Examples */}</div>
          <br />
          
          <div style={{ color: 'var(--code-comment)' }}>{/* Card with consistent spacing */}</div>
          <div>
            <span style={{ color: 'var(--code-punctuation)' }}>.</span>
            <span style={{ color: 'var(--code-tag)' }}>card</span>
            <span style={{ color: 'var(--code-punctuation)' }}> {'{'}</span>
          </div>
          <div style={{ paddingLeft: '1rem' }}>
            <span style={{ color: 'var(--code-attribute)' }}>padding</span>
            <span style={{ color: 'var(--code-punctuation)' }}>:</span>
            <span style={{ color: 'var(--code-function)' }}> var(</span>
            <span style={{ color: 'var(--code-string)' }}>--space-6</span>
            <span style={{ color: 'var(--code-function)' }}>)</span>
            <span style={{ color: 'var(--code-punctuation)' }}>;</span>
          </div>
          <div style={{ paddingLeft: '1rem' }}>
            <span style={{ color: 'var(--code-attribute)' }}>margin-bottom</span>
            <span style={{ color: 'var(--code-punctuation)' }}>:</span>
            <span style={{ color: 'var(--code-function)' }}> var(</span>
            <span style={{ color: 'var(--code-string)' }}>--space-4</span>
            <span style={{ color: 'var(--code-function)' }}>)</span>
            <span style={{ color: 'var(--code-punctuation)' }}>;</span>
          </div>
          <div>
            <span style={{ color: 'var(--code-punctuation)' }}>{'}'}</span>
          </div>
          <br />
          
          <div style={{ color: 'var(--code-comment)' }}>{/* Flexbox gap */}</div>
          <div>
            <span style={{ color: 'var(--code-punctuation)' }}>.</span>
            <span style={{ color: 'var(--code-tag)' }}>button-group</span>
            <span style={{ color: 'var(--code-punctuation)' }}> {'{'}</span>
          </div>
          <div style={{ paddingLeft: '1rem' }}>
            <span style={{ color: 'var(--code-attribute)' }}>display</span>
            <span style={{ color: 'var(--code-punctuation)' }}>:</span>
            <span style={{ color: 'var(--code-string)' }}> flex</span>
            <span style={{ color: 'var(--code-punctuation)' }}>;</span>
          </div>
          <div style={{ paddingLeft: '1rem' }}>
            <span style={{ color: 'var(--code-attribute)' }}>gap</span>
            <span style={{ color: 'var(--code-punctuation)' }}>:</span>
            <span style={{ color: 'var(--code-function)' }}> var(</span>
            <span style={{ color: 'var(--code-string)' }}>--space-4</span>
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