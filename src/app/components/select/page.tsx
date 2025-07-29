'use client';

import React, { useState } from 'react';
import { Select } from '@/components/Select';

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
        <div className="flex flex-col gap-4">
          {children}
        </div>
      </div>
      
      {/* Code */}
      <CodeBlock>{code}</CodeBlock>
    </div>
  );
}

const simpleOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
  { value: 'option4', label: 'Option 4', disabled: true },
  { value: 'option5', label: 'Option 5' }
];

const countryOptions = [
  { value: 'us', label: 'United States', description: 'North America' },
  { value: 'ca', label: 'Canada', description: 'North America' },
  { value: 'uk', label: 'United Kingdom', description: 'Europe' },
  { value: 'de', label: 'Germany', description: 'Europe' },
  { value: 'fr', label: 'France', description: 'Europe' }
];

export default function SelectPage() {
  const [basicValue, setBasicValue] = useState<string | number>('');
  const [multiValue, setMultiValue] = useState<(string | number)[]>(['us', 'ca']);

  return (
    <div className="max-w-6xl mx-auto px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          Select
        </h1>
        <p className="text-lg mb-6" style={{ color: 'var(--text-secondary)' }}>
          Flexible select component with support for single and multi-select, 
          search functionality, and comprehensive keyboard navigation.
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
                <div className="font-mono" style={{ color: 'var(--text-secondary)' }}>options</div>
                <div style={{ color: 'var(--text-secondary)' }}>SelectOption[]</div>
                <div style={{ color: 'var(--text-secondary)' }}>-</div>
                <div style={{ color: 'var(--text-secondary)' }}>Array of select options</div>
              </div>
              <div className="grid grid-cols-4 gap-4 text-sm">
                <div className="font-mono" style={{ color: 'var(--text-secondary)' }}>multiple</div>
                <div style={{ color: 'var(--text-secondary)' }}>boolean</div>
                <div style={{ color: 'var(--text-secondary)' }}>false</div>
                <div style={{ color: 'var(--text-secondary)' }}>Enable multi-select</div>
              </div>
              <div className="grid grid-cols-4 gap-4 text-sm">
                <div className="font-mono" style={{ color: 'var(--text-secondary)' }}>searchable</div>
                <div style={{ color: 'var(--text-secondary)' }}>boolean</div>
                <div style={{ color: 'var(--text-secondary)' }}>false</div>
                <div style={{ color: 'var(--text-secondary)' }}>Enable search functionality</div>
              </div>
              <div className="grid grid-cols-4 gap-4 text-sm">
                <div className="font-mono" style={{ color: 'var(--text-secondary)' }}>clearable</div>
                <div style={{ color: 'var(--text-secondary)' }}>boolean</div>
                <div style={{ color: 'var(--text-secondary)' }}>false</div>
                <div style={{ color: 'var(--text-secondary)' }}>Enable clear button</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Section title="Basic Usage">
        <Example
          title="Simple Select"
          description="A basic select dropdown with options. Click to open the dropdown."
          code={`<Select
  label="Choose an option"
  placeholder="Select an option..."
  options={simpleOptions}
  value={value}
  onChange={setValue}
/>`}
        >
          <Select
            label="Choose an option"
            placeholder="Select an option..."
            options={simpleOptions}
            value={basicValue}
            onChange={setBasicValue}
          />
        </Example>
      </Section>

      <Section title="Multi-Select">
        <Example
          title="Multiple Selection"
          description="Select multiple options. Selected items appear as tags with remove buttons."
          code={`<Select
  label="Select countries"
  options={countryOptions}
  value={multiValue}
  onChange={setMultiValue}
  multiple
  clearable
  placeholder="Select countries..."
/>`}
        >
          <Select
            label="Select countries"
            description="Choose multiple countries where you operate."
            options={countryOptions}
            value={multiValue}
            onChange={setMultiValue}
            multiple
            placeholder="Select countries..."
            clearable
          />
        </Example>
      </Section>

      <Section title="Searchable">
        <Example
          title="Search Functionality"
          description="Enable search to filter through options quickly."
          code={`<Select
  label="Choose framework"
  options={frameworkOptions}
  value={value}
  onChange={setValue}
  searchable
  clearable
  placeholder="Search frameworks..."
/>`}
        >
          <Select
            label="Choose framework"
            description="Select your preferred JavaScript framework."
            options={[
              { value: 'react', label: 'React', description: 'JavaScript library for building user interfaces' },
              { value: 'vue', label: 'Vue.js', description: 'Progressive JavaScript framework' },
              { value: 'angular', label: 'Angular', description: 'Platform for building web applications' }
            ]}
            value="react"
            onChange={() => {}}
            searchable
            clearable
            placeholder="Search frameworks..."
          />
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
            The Select component uses the following design tokens:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-semibold mb-2" style={{ color: 'var(--text-brand-primary)' }}>Colors</h4>
              <ul className="space-y-1 font-mono" style={{ color: 'var(--text-secondary)' }}>
                <li>--color-purple-500 (selected)</li>
                <li>--color-purple-400 (hover)</li>
                <li>--input-bg (background)</li>
                <li>--input-border (border)</li>
                <li>--border-focus (focus)</li>
                <li>--bg-tertiary (dropdown)</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2" style={{ color: 'var(--text-brand-primary)' }}>Spacing & Sizing</h4>
              <ul className="space-y-1 font-mono" style={{ color: 'var(--text-secondary)' }}>
                <li>--input-padding-y/x</li>
                <li>--space-2, --space-3, --space-4</li>
                <li>--input-border-radius</li>
                <li>--radius-lg (dropdown)</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2" style={{ color: 'var(--text-brand-primary)' }}>Typography</h4>
              <ul className="space-y-1 font-mono" style={{ color: 'var(--text-secondary)' }}>
                <li>--font-primary</li>
                <li>--font-base, --font-sm</li>
                <li>--font-weight-medium</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2" style={{ color: 'var(--text-brand-primary)' }}>Effects</h4>
              <ul className="space-y-1 font-mono" style={{ color: 'var(--text-secondary)' }}>
                <li>--transition-fast</li>
                <li>--focus-ring</li>
                <li>--shadow-lg (dropdown)</li>
                <li>--z-index-dropdown</li>
              </ul>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}