'use client';

import { Button } from '../../../components/Button';
import { useState } from 'react';

function CodeBlock({ children }: { children: string }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative">
      <pre 
        className="p-4 rounded-lg text-sm overflow-x-auto font-mono"
        style={{
          background: 'var(--code-bg)',
          color: 'var(--code-text)',
          borderRadius: 'var(--radius-lg)'
        }}
      >
        <code>{children}</code>
      </pre>
      <button
        onClick={copyToClipboard}
        className="absolute top-2 right-2 px-2 py-1 text-xs rounded"
        style={{
          background: 'var(--bg-elevated)',
          color: 'var(--text-secondary)',
          border: `var(--border-thin) solid var(--border-secondary)`,
          borderRadius: 'var(--radius-sm)'
        }}
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
        {title}
      </h2>
      {children}
    </section>
  );
}

function Example({ title, description, children, code }: { 
  title: string; 
  description?: string; 
  children: React.ReactNode; 
  code: string; 
}) {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
        {title}
      </h3>
      {description && (
        <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
          {description}
        </p>
      )}
      
      {/* Preview */}
      <div 
        className="p-6 rounded-lg border mb-4"
        style={{
          background: 'var(--card-bg)',
          border: `var(--border-thin) solid var(--card-border)`,
          borderRadius: 'var(--card-border-radius)'
        }}
      >
        <div className="flex flex-wrap gap-4 items-center">
          {children}
        </div>
      </div>
      
      {/* Code */}
      <CodeBlock>{code}</CodeBlock>
    </div>
  );
}

export default function ButtonPage() {
  return (
    <div className="max-w-6xl mx-auto px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          Button
        </h1>
        <p className="text-lg mb-6" style={{ color: 'var(--text-secondary)' }}>
          Buttons trigger actions and events. Our button component comes in multiple variants and sizes,
          all built using our design token system for consistent styling.
        </p>
        
        {/* Props table */}
        <div 
          className="rounded-lg border overflow-hidden"
          style={{
            background: 'var(--card-bg)',
            border: `var(--border-thin) solid var(--card-border)`,
            borderRadius: 'var(--card-border-radius)'
          }}
        >
          <div 
            className="px-6 py-3 border-b"
            style={{
              background: 'var(--bg-elevated)',
              borderBottom: `var(--border-thin) solid var(--border-secondary)`
            }}
          >
            <h4 className="font-semibold" style={{ color: 'var(--text-primary)' }}>Props</h4>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              <div className="grid grid-cols-4 gap-4 text-sm">
                <div className="font-semibold" style={{ color: 'var(--text-primary)' }}>Prop</div>
                <div className="font-semibold" style={{ color: 'var(--text-primary)' }}>Type</div>
                <div className="font-semibold" style={{ color: 'var(--text-primary)' }}>Default</div>
                <div className="font-semibold" style={{ color: 'var(--text-primary)' }}>Description</div>
              </div>
              <div className="grid grid-cols-4 gap-4 text-sm">
                <div className="font-mono" style={{ color: 'var(--text-secondary)' }}>variant</div>
                <div style={{ color: 'var(--text-secondary)' }}>&apos;primary&apos; | &apos;secondary&apos; | &apos;ghost&apos;</div>
                <div style={{ color: 'var(--text-secondary)' }}>&apos;primary&apos;</div>
                <div style={{ color: 'var(--text-secondary)' }}>Button style variant</div>
              </div>
              <div className="grid grid-cols-4 gap-4 text-sm">
                <div className="font-mono" style={{ color: 'var(--text-secondary)' }}>size</div>
                <div style={{ color: 'var(--text-secondary)' }}>&apos;sm&apos; | &apos;base&apos; | &apos;lg&apos;</div>
                <div style={{ color: 'var(--text-secondary)' }}>&apos;base&apos;</div>
                <div style={{ color: 'var(--text-secondary)' }}>Button size</div>
              </div>
              <div className="grid grid-cols-4 gap-4 text-sm">
                <div className="font-mono" style={{ color: 'var(--text-secondary)' }}>disabled</div>
                <div style={{ color: 'var(--text-secondary)' }}>boolean</div>
                <div style={{ color: 'var(--text-secondary)' }}>false</div>
                <div style={{ color: 'var(--text-secondary)' }}>Disable the button</div>
              </div>
              <div className="grid grid-cols-4 gap-4 text-sm">
                <div className="font-mono" style={{ color: 'var(--text-secondary)' }}>children</div>
                <div style={{ color: 'var(--text-secondary)' }}>React.ReactNode</div>
                <div style={{ color: 'var(--text-secondary)' }}>-</div>
                <div style={{ color: 'var(--text-secondary)' }}>Button content</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Section title="Variants">
        <Example
          title="Primary Button"
          description="Use for primary actions and calls-to-action. Uses the brand purple color from our design tokens."
          code={`<Button variant="primary">Primary Button</Button>`}
        >
          <Button variant="primary">Primary Button</Button>
        </Example>

        <Example
          title="Secondary Button"
          description="Use for secondary actions. Has a transparent background with a border."
          code={`<Button variant="secondary">Secondary Button</Button>`}
        >
          <Button variant="secondary">Secondary Button</Button>
        </Example>

        <Example
          title="Ghost Button"
          description="Use for tertiary actions or when you need a subtle button that doesn't compete for attention."
          code={`<Button variant="ghost">Ghost Button</Button>`}
        >
          <Button variant="ghost">Ghost Button</Button>
        </Example>
      </Section>

      <Section title="Sizes">
        <Example
          title="Button Sizes"
          description="Buttons come in three sizes, each using design token values for consistent spacing and typography."
          code={`<Button variant="primary" size="sm">Small</Button>
<Button variant="primary" size="base">Base</Button>
<Button variant="primary" size="lg">Large</Button>`}
        >
          <Button variant="primary" size="sm">Small</Button>
          <Button variant="primary" size="base">Base</Button>
          <Button variant="primary" size="lg">Large</Button>
        </Example>
      </Section>

      <Section title="States">
        <Example
          title="Disabled State"
          description="Disabled buttons have reduced opacity and cursor changes. Hover effects are disabled."
          code={`<Button variant="primary" disabled>Disabled Primary</Button>
<Button variant="secondary" disabled>Disabled Secondary</Button>
<Button variant="ghost" disabled>Disabled Ghost</Button>`}
        >
          <Button variant="primary" disabled>Disabled Primary</Button>
          <Button variant="secondary" disabled>Disabled Secondary</Button>
          <Button variant="ghost" disabled>Disabled Ghost</Button>
        </Example>
      </Section>

      <Section title="Interactive Example">
        <Example
          title="All Variants and Sizes"
          description="Here's a comprehensive showcase of all button variants and sizes working together."
          code={`// Primary buttons
<Button variant="primary" size="sm">Small Primary</Button>
<Button variant="primary" size="base">Base Primary</Button>
<Button variant="primary" size="lg">Large Primary</Button>

// Secondary buttons  
<Button variant="secondary" size="sm">Small Secondary</Button>
<Button variant="secondary" size="base">Base Secondary</Button>
<Button variant="secondary" size="lg">Large Secondary</Button>

// Ghost buttons
<Button variant="ghost" size="sm">Small Ghost</Button>
<Button variant="ghost" size="base">Base Ghost</Button>
<Button variant="ghost" size="lg">Large Ghost</Button>`}
        >
          <div className="space-y-4 w-full">
            <div className="space-y-2">
              <h4 className="text-sm font-semibold" style={{ color: 'var(--text-tertiary)' }}>Primary</h4>
              <div className="flex gap-3">
                <Button variant="primary" size="sm">Small</Button>
                <Button variant="primary" size="base">Base</Button>
                <Button variant="primary" size="lg">Large</Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="text-sm font-semibold" style={{ color: 'var(--text-tertiary)' }}>Secondary</h4>
              <div className="flex gap-3">
                <Button variant="secondary" size="sm">Small</Button>
                <Button variant="secondary" size="base">Base</Button>
                <Button variant="secondary" size="lg">Large</Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="text-sm font-semibold" style={{ color: 'var(--text-tertiary)' }}>Ghost</h4>
              <div className="flex gap-3">
                <Button variant="ghost" size="sm">Small</Button>
                <Button variant="ghost" size="base">Base</Button>
                <Button variant="ghost" size="lg">Large</Button>
              </div>
            </div>
          </div>
        </Example>
      </Section>

      <Section title="Design Token Usage">
        <div 
          className="p-6 rounded-lg border"
          style={{
            background: 'var(--card-bg)',
            border: `var(--border-thin) solid var(--card-border)`,
            borderRadius: 'var(--card-border-radius)'
          }}
        >
          <p className="mb-4" style={{ color: 'var(--text-primary)' }}>
            The Button component uses the following design tokens:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-semibold mb-2" style={{ color: 'var(--text-brand-primary)' }}>Colors</h4>
              <ul className="space-y-1 font-mono" style={{ color: 'var(--text-secondary)' }}>
                <li>--button-primary-bg</li>
                <li>--button-primary-bg-hover</li>
                <li>--button-secondary-bg</li>
                <li>--button-secondary-bg-hover</li>
                <li>--button-ghost-bg</li>
                <li>--button-ghost-bg-hover</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2" style={{ color: 'var(--text-brand-primary)' }}>Spacing & Sizing</h4>
              <ul className="space-y-1 font-mono" style={{ color: 'var(--text-secondary)' }}>
                <li>--button-sm-padding-y/x</li>
                <li>--button-base-padding-y/x</li>
                <li>--button-lg-padding-y/x</li>
                <li>--button-*-border-radius</li>
                <li>--button-*-font-size</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2" style={{ color: 'var(--text-brand-primary)' }}>Typography</h4>
              <ul className="space-y-1 font-mono" style={{ color: 'var(--text-secondary)' }}>
                <li>--font-primary</li>
                <li>--font-weight-medium</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2" style={{ color: 'var(--text-brand-primary)' }}>Effects</h4>
              <ul className="space-y-1 font-mono" style={{ color: 'var(--text-secondary)' }}>
                <li>--transition-fast</li>
                <li>--focus-ring</li>
                <li>--focus-ring-offset</li>
              </ul>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}