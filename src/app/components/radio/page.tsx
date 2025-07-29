'use client';

import React, { useState } from 'react';
import { Radio, RadioGroup } from '@/components/Radio';

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

export default function RadioPage() {
  const [selectedPlan, setSelectedPlan] = useState<string | number>('basic');
  const [selectedTheme, setSelectedTheme] = useState<string | number>('dark');
  const [paymentMethod, setPaymentMethod] = useState<string | number>('card');

  return (
    <div className="max-w-6xl mx-auto px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          Radio Button
        </h1>
        <p className="text-lg mb-6" style={{ color: 'var(--text-secondary)' }}>
          Radio button component for mutually exclusive selections with 
          comprehensive group management and accessibility features.
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
                <div style={{ color: 'var(--text-secondary)' }}>Radio button label text</div>
              </div>
              <div className="grid grid-cols-4 gap-4 text-sm">
                <div className="font-mono" style={{ color: 'var(--text-secondary)' }}>value</div>
                <div style={{ color: 'var(--text-secondary)' }}>string | number</div>
                <div style={{ color: 'var(--text-secondary)' }}>-</div>
                <div style={{ color: 'var(--text-secondary)' }}>Unique value for this radio option</div>
              </div>
              <div className="grid grid-cols-4 gap-4 text-sm">
                <div className="font-mono" style={{ color: 'var(--text-secondary)' }}>size</div>
                <div style={{ color: 'var(--text-secondary)' }}>&apos;sm&apos; | &apos;base&apos; | &apos;lg&apos;</div>
                <div style={{ color: 'var(--text-secondary)' }}>&apos;base&apos;</div>
                <div style={{ color: 'var(--text-secondary)' }}>Radio button size</div>
              </div>
              <div className="grid grid-cols-4 gap-4 text-sm">
                <div className="font-mono" style={{ color: 'var(--text-secondary)' }}>disabled</div>
                <div style={{ color: 'var(--text-secondary)' }}>boolean</div>
                <div style={{ color: 'var(--text-secondary)' }}>false</div>
                <div style={{ color: 'var(--text-secondary)' }}>Disable the radio button</div>
              </div>
              <div className="grid grid-cols-4 gap-4 text-sm">
                <div className="font-mono" style={{ color: 'var(--text-secondary)' }}>name</div>
                <div style={{ color: 'var(--text-secondary)' }}>string</div>
                <div style={{ color: 'var(--text-secondary)' }}>-</div>
                <div style={{ color: 'var(--text-secondary)' }}>Name attribute for grouping</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Section title="Basic Usage">
        <Example
          title="Radio Group"
          description="Radio buttons work best when grouped together. Use RadioGroup for easy management."
          code={`<RadioGroup
  label="Choose a plan"
  value={selectedPlan}
  onChange={setSelectedPlan}
  name="plan"
>
  <Radio value="basic" label="Basic Plan" />
  <Radio value="pro" label="Pro Plan" />
  <Radio value="enterprise" label="Enterprise Plan" />
</RadioGroup>`}
        >
          <RadioGroup
            label="Choose a plan"
            value={selectedPlan}
            onChange={setSelectedPlan}
            name="plan"
          >
            <Radio value="basic" label="Basic Plan" />
            <Radio value="pro" label="Pro Plan" />
            <Radio value="enterprise" label="Enterprise Plan" />
          </RadioGroup>
        </Example>
      </Section>

      <Section title="Sizes">
        <Example
          title="Radio Button Sizes"
          description="Radio buttons come in three sizes, each using design token values for consistent spacing."
          code={`<RadioGroup label="Small size" value="option1" onChange={() => {}} size="sm">
  <Radio value="option1" label="Small radio option 1" />
  <Radio value="option2" label="Small radio option 2" />
</RadioGroup>

<RadioGroup label="Default size" value="option1" onChange={() => {}} size="base">
  <Radio value="option1" label="Default radio option 1" />
  <Radio value="option2" label="Default radio option 2" />
</RadioGroup>

<RadioGroup label="Large size" value="option1" onChange={() => {}} size="lg">
  <Radio value="option1" label="Large radio option 1" />
  <Radio value="option2" label="Large radio option 2" />
</RadioGroup>`}
        >
          <RadioGroup
            label="Small size"
            value="option1"
            onChange={() => {}}
            size="sm"
          >
            <Radio value="option1" label="Small radio option 1" />
            <Radio value="option2" label="Small radio option 2" />
          </RadioGroup>

          <RadioGroup
            label="Default size"
            value="option1"
            onChange={() => {}}
            size="base"
          >
            <Radio value="option1" label="Default radio option 1" />
            <Radio value="option2" label="Default radio option 2" />
          </RadioGroup>

          <RadioGroup
            label="Large size"
            value="option1"
            onChange={() => {}}
            size="lg"
          >
            <Radio value="option1" label="Large radio option 1" />
            <Radio value="option2" label="Large radio option 2" />
          </RadioGroup>
        </Example>
      </Section>

      <Section title="With Descriptions">
        <Example
          title="Descriptive Options"
          description="Radio buttons can include additional description text for better clarity."
          code={`<RadioGroup
  label="Select theme"
  description="Choose your preferred theme for the application."
  value={selectedTheme}
  onChange={setSelectedTheme}
>
  <Radio
    value="light"
    label="Light Theme"
    description="Clean and bright interface suitable for daytime use."
  />
  <Radio
    value="dark"
    label="Dark Theme"
    description="Easy on the eyes with reduced blue light emission."
  />
  <Radio
    value="auto"
    label="Auto Theme"
    description="Switches between light and dark based on system settings."
  />
</RadioGroup>`}
        >
          <RadioGroup
            label="Select theme"
            description="Choose your preferred theme for the application interface."
            value={selectedTheme}
            onChange={setSelectedTheme}
            name="theme"
          >
            <Radio
              value="light"
              label="Light Theme"
              description="Clean and bright interface suitable for daytime use."
            />
            <Radio
              value="dark"
              label="Dark Theme"
              description="Easy on the eyes with reduced blue light emission."
            />
            <Radio
              value="auto"
              label="Auto Theme"
              description="Automatically switches between light and dark based on system settings."
            />
          </RadioGroup>
        </Example>
      </Section>

      <Section title="States">
        <Example
          title="Radio Button States"
          description="Different states including default, selected, and disabled."
          code={`// Default State
<Radio value="unselected" label="Unselected" />
<Radio value="selected" label="Selected" checked />

// Disabled State  
<Radio value="disabled-unselected" label="Disabled Unselected" disabled />
<Radio value="disabled-selected" label="Disabled Selected" disabled checked />`}
        >
          <div>
            <h4 className="text-sm font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
              Default State
            </h4>
            <div className="space-y-2 mb-6">
              <Radio value="unselected" label="Unselected" />
              <Radio value="selected" label="Selected" checked />
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
              Disabled State
            </h4>
            <div className="space-y-2">
              <Radio value="disabled-unselected" label="Disabled Unselected" disabled />
              <Radio value="disabled-selected" label="Disabled Selected" disabled checked />
            </div>
          </div>
        </Example>
      </Section>

      <Section title="Complex Example">
        <Example
          title="Payment Method Selection"
          description="A comprehensive example showing radio buttons for selecting payment methods."
          code={`<RadioGroup
  label="Payment method"
  description="Choose how you'd like to pay for your subscription."
  value={paymentMethod}
  onChange={setPaymentMethod}
  name="payment"
>
  <Radio
    value="card"
    label="Credit or Debit Card"
    description="We accept Visa, Mastercard, American Express, and Discover."
  />
  <Radio
    value="paypal"
    label="PayPal"
    description="Pay with your PayPal account. Redirected to PayPal to complete payment."
  />
  <Radio
    value="apple-pay"
    label="Apple Pay"
    description="Use Touch ID or Face ID to pay securely with Apple Pay."
  />
</RadioGroup>`}
        >
          <RadioGroup
            label="Payment method"
            description="Choose how you'd like to pay for your subscription."
            value={paymentMethod}
            onChange={setPaymentMethod}
            name="payment"
          >
            <Radio
              value="card"
              label="Credit or Debit Card"
              description="We accept Visa, Mastercard, American Express, and Discover. Your payment information is encrypted and secure."
            />
            <Radio
              value="paypal"
              label="PayPal"
              description="Pay with your PayPal account. You'll be redirected to PayPal to complete your payment securely."
            />
            <Radio
              value="apple-pay"
              label="Apple Pay"
              description="Use Touch ID or Face ID to pay securely with Apple Pay on supported devices."
            />
          </RadioGroup>
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
            The Radio component uses the following design tokens:
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
                <li>--text-error (error state)</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2" style={{ color: 'var(--text-brand-primary)' }}>Spacing & Sizing</h4>
              <ul className="space-y-1 font-mono" style={{ color: 'var(--text-secondary)' }}>
                <li>--space-4, --space-5, --space-6 (sizes)</li>
                <li>--space-1_5, --space-2, --space-2_5 (dot)</li>
                <li>--space-3 (gap between elements)</li>
                <li>50% border-radius (circular shape)</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2" style={{ color: 'var(--text-brand-primary)' }}>Typography</h4>
              <ul className="space-y-1 font-mono" style={{ color: 'var(--text-secondary)' }}>
                <li>--font-primary</li>
                <li>--font-base (label)</li>
                <li>--font-sm (description)</li>
                <li>--font-weight-medium</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2" style={{ color: 'var(--text-brand-primary)' }}>Effects</h4>
              <ul className="space-y-1 font-mono" style={{ color: 'var(--text-secondary)' }}>
                <li>--transition-fast</li>
                <li>--focus-ring</li>
                <li>--line-height-snug</li>
                <li>--line-height-normal</li>
              </ul>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}