'use client';

import React, { useState } from 'react';
import { Checkbox, CheckboxGroup } from '@/components/Checkbox';

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

export default function CheckboxPage() {
  const [basicChecked, setBasicChecked] = useState(false);
  const [sizeStates, setSizeStates] = useState({
    sm: false,
    base: true,
    lg: false
  });
  const [groupStates, setGroupStates] = useState({
    darkMode: true,
    notifications: false,
    autoSave: true
  });

  return (
    <div className="max-w-6xl mx-auto px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          Checkbox
        </h1>
        <p className="text-lg mb-6" style={{ color: 'var(--text-secondary)' }}>
          Checkbox component for single and multiple selections with support for 
          indeterminate states, grouping, and comprehensive accessibility features.
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
                <div className="font-mono" style={{ color: 'var(--text-secondary)' }}>label</div>
                <div style={{ color: 'var(--text-secondary)' }}>string</div>
                <div style={{ color: 'var(--text-secondary)' }}>-</div>
                <div style={{ color: 'var(--text-secondary)' }}>Checkbox label text</div>
              </div>
              <div className="grid grid-cols-4 gap-4 text-sm">
                <div className="font-mono" style={{ color: 'var(--text-secondary)' }}>size</div>
                <div style={{ color: 'var(--text-secondary)' }}>&apos;sm&apos; | &apos;base&apos; | &apos;lg&apos;</div>
                <div style={{ color: 'var(--text-secondary)' }}>&apos;base&apos;</div>
                <div style={{ color: 'var(--text-secondary)' }}>Checkbox size</div>
              </div>
              <div className="grid grid-cols-4 gap-4 text-sm">
                <div className="font-mono" style={{ color: 'var(--text-secondary)' }}>indeterminate</div>
                <div style={{ color: 'var(--text-secondary)' }}>boolean</div>
                <div style={{ color: 'var(--text-secondary)' }}>false</div>
                <div style={{ color: 'var(--text-secondary)' }}>Show indeterminate state</div>
              </div>
              <div className="grid grid-cols-4 gap-4 text-sm">
                <div className="font-mono" style={{ color: 'var(--text-secondary)' }}>disabled</div>
                <div style={{ color: 'var(--text-secondary)' }}>boolean</div>
                <div style={{ color: 'var(--text-secondary)' }}>false</div>
                <div style={{ color: 'var(--text-secondary)' }}>Disable the checkbox</div>
              </div>
              <div className="grid grid-cols-4 gap-4 text-sm">
                <div className="font-mono" style={{ color: 'var(--text-secondary)' }}>error</div>
                <div style={{ color: 'var(--text-secondary)' }}>string</div>
                <div style={{ color: 'var(--text-secondary)' }}>-</div>
                <div style={{ color: 'var(--text-secondary)' }}>Error message to display</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Section title="Basic Usage">
        <Example
          title="Simple Checkbox"
          description="A basic checkbox with a label. Click to toggle the checked state."
          code={`<Checkbox
  label="Accept terms and conditions"
  checked={checked}
  onChange={(e) => setChecked(e.target.checked)}
/>`}
        >
          <Checkbox
            label="Accept terms and conditions"
            checked={basicChecked}
            onChange={(e) => setBasicChecked(e.target.checked)}
          />
        </Example>
      </Section>

      <Section title="Sizes">
        <Example
          title="Checkbox Sizes"
          description="Checkboxes come in three sizes, each using design token values for consistent spacing."
          code={`<Checkbox label="Small checkbox" size="sm" checked={sm} onChange={setSm} />
<Checkbox label="Default checkbox" size="base" checked={base} onChange={setBase} />
<Checkbox label="Large checkbox" size="lg" checked={lg} onChange={setLg} />`}
        >
          <Checkbox
            label="Small checkbox"
            size="sm"
            checked={sizeStates.sm}
            onChange={(e) => setSizeStates(prev => ({...prev, sm: e.target.checked}))}
          />
          <Checkbox
            label="Default checkbox"
            size="base"
            checked={sizeStates.base}
            onChange={(e) => setSizeStates(prev => ({...prev, base: e.target.checked}))}
          />
          <Checkbox
            label="Large checkbox"
            size="lg"
            checked={sizeStates.lg}
            onChange={(e) => setSizeStates(prev => ({...prev, lg: e.target.checked}))}
          />
        </Example>
      </Section>

      <Section title="States">
        <Example
          title="Checkbox States"
          description="Different states including default, checked, indeterminate, and disabled."
          code={`<Checkbox label="Default" checked={false} onChange={() => {}} />
<Checkbox label="Checked" checked={true} onChange={() => {}} />
<Checkbox label="Indeterminate" indeterminate={true} onChange={() => {}} />
<Checkbox label="Disabled" disabled checked={false} onChange={() => {}} />
<Checkbox label="Disabled Checked" disabled checked={true} onChange={() => {}} />`}
        >
          <Checkbox label="Default" checked={false} onChange={() => {}} />
          <Checkbox label="Checked" checked={true} onChange={() => {}} />
          <Checkbox label="Indeterminate" indeterminate={true} onChange={() => {}} />
          <Checkbox label="Disabled" disabled checked={false} onChange={() => {}} />
          <Checkbox label="Disabled Checked" disabled checked={true} onChange={() => {}} />
        </Example>
      </Section>

      <Section title="With Description">
        <Example
          title="Descriptive Checkboxes"
          description="Checkboxes can include additional description text for clarity."
          code={`<Checkbox
  label="Email notifications"
  description="Receive updates about your account activity."
  checked={true}
  onChange={() => {}}
/>`}
        >
          <Checkbox
            label="Email notifications"
            description="Receive updates about your account activity and important announcements."
            checked={true}
            onChange={() => {}}
          />
          <Checkbox
            label="Marketing emails"
            description="Get the latest news, product updates, and special offers."
            checked={false}
            onChange={() => {}}
          />
        </Example>
      </Section>

      <Section title="Checkbox Group">
        <Example
          title="Grouped Checkboxes"
          description="Use CheckboxGroup to organize related checkboxes with a shared label and description."
          code={`<CheckboxGroup
  label="Select features"
  description="Choose features to enable for your account."
>
  <Checkbox label="Dark mode" checked={darkMode} onChange={setDarkMode} />
  <Checkbox label="Notifications" checked={notifications} onChange={setNotifications} />
  <Checkbox label="Auto-save" checked={autoSave} onChange={setAutoSave} />
</CheckboxGroup>`}
        >
          <CheckboxGroup
            label="Select features"
            description="Choose which features you'd like to enable for your account."
          >
            <Checkbox
              label="Dark mode"
              description="Enable dark theme throughout the application"
              checked={groupStates.darkMode}
              onChange={(e) => setGroupStates(prev => ({...prev, darkMode: e.target.checked}))}
            />
            <Checkbox
              label="Notifications"
              description="Receive real-time notifications"
              checked={groupStates.notifications}
              onChange={(e) => setGroupStates(prev => ({...prev, notifications: e.target.checked}))}
            />
            <Checkbox
              label="Auto-save"
              description="Automatically save your work"
              checked={groupStates.autoSave}
              onChange={(e) => setGroupStates(prev => ({...prev, autoSave: e.target.checked}))}
            />
          </CheckboxGroup>
        </Example>
      </Section>

      <Section title="Error State">
        <Example
          title="Validation"
          description="Checkboxes can display error messages for validation feedback."
          code={`<Checkbox
  label="Accept privacy policy"
  description="Please review and accept our privacy policy."
  error="You must accept the privacy policy to proceed."
  checked={false}
  onChange={() => {}}
/>`}
        >
          <Checkbox
            label="Accept privacy policy"
            description="Please review and accept our privacy policy to continue."
            error="You must accept the privacy policy to proceed."
            checked={false}
            onChange={() => {}}
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
            The Checkbox component uses the following design tokens:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-semibold mb-2" style={{ color: 'var(--text-brand-primary)' }}>Colors</h4>
              <ul className="space-y-1 font-mono" style={{ color: 'var(--text-secondary)' }}>
                <li>--color-purple-500 (checked)</li>
                <li>--color-purple-400 (hover)</li>
                <li>--input-bg (background)</li>
                <li>--input-border (border)</li>
                <li>--border-focus (focus)</li>
                <li>--text-error (error state)</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2" style={{ color: 'var(--text-brand-primary)' }}>Spacing & Sizing</h4>
              <ul className="space-y-1 font-mono" style={{ color: 'var(--text-secondary)' }}>
                <li>--space-4, --space-5, --space-6 (sizes)</li>
                <li>--space-3 (gap between elements)</li>
                <li>--space-1_5 (error margin)</li>
                <li>--radius-base, --radius-md, --radius-lg</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2" style={{ color: 'var(--text-brand-primary)' }}>Typography</h4>
              <ul className="space-y-1 font-mono" style={{ color: 'var(--text-secondary)' }}>
                <li>--font-primary</li>
                <li>--font-base (label)</li>
                <li>--font-sm (description, error)</li>
                <li>--font-weight-medium</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2" style={{ color: 'var(--text-brand-primary)' }}>Effects</h4>
              <ul className="space-y-1 font-mono" style={{ color: 'var(--text-secondary)' }}>
                <li>--transition-fast</li>
                <li>--focus-ring</li>
                <li>--icon-xs, --icon-sm, --icon-base</li>
              </ul>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}