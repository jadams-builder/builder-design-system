'use client';

import React, { useState } from 'react';
import { Radio, RadioGroup } from '@/components/Radio';

export default function RadioPage() {
  const [selectedPlan, setSelectedPlan] = useState<string | number>('basic');
  const [selectedTheme, setSelectedTheme] = useState<string | number>('dark');
  const [selectedSize, setSelectedSize] = useState<string | number>('medium');
  const [paymentMethod, setPaymentMethod] = useState<string | number>('card');

  return (
    <div className="component-page">
      <div className="component-header">
        <h1>Radio Button</h1>
        <p>
          Radio button component for mutually exclusive selections with 
          comprehensive group management and accessibility features.
        </p>
      </div>

      <section className="component-section">
        <h2>Basic Usage</h2>
        <div className="component-demo">
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
        </div>
      </section>

      <section className="component-section">
        <h2>Sizes</h2>
        <div className="component-demo">
          <div className="demo-column">
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
          </div>
        </div>
      </section>

      <section className="component-section">
        <h2>With Descriptions</h2>
        <div className="component-demo">
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
        </div>
      </section>

      <section className="component-section">
        <h2>States</h2>
        <div className="component-demo">
          <div className="demo-column">
            <div>
              <h4 style={{ color: 'var(--text-primary)', marginBottom: 'var(--space-3)' }}>
                Default State
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                <Radio value="unselected" label="Unselected" />
                <Radio value="selected" label="Selected" checked />
              </div>
            </div>

            <div>
              <h4 style={{ color: 'var(--text-primary)', marginBottom: 'var(--space-3)' }}>
                Disabled State
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                <Radio value="disabled-unselected" label="Disabled Unselected" disabled />
                <Radio value="disabled-selected" label="Disabled Selected" disabled checked />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="component-section">
        <h2>Error State</h2>
        <div className="component-demo">
          <RadioGroup
            label="Payment method"
            description="Select your preferred payment method for this transaction."
            error="Please select a payment method to continue."
            value=""
            onChange={() => {}}
            name="payment-error"
          >
            <Radio
              value="card"
              label="Credit Card"
              description="Pay securely with your credit or debit card."
              error="Card payment is currently unavailable"
            />
            <Radio
              value="paypal"
              label="PayPal"
              description="Use your PayPal account for quick checkout."
            />
            <Radio
              value="bank"
              label="Bank Transfer"
              description="Direct transfer from your bank account."
            />
          </RadioGroup>
        </div>
      </section>

      <section className="component-section">
        <h2>Disabled Group</h2>
        <div className="component-demo">
          <RadioGroup
            label="Unavailable options"
            description="These options are currently disabled."
            value="option1"
            onChange={() => {}}
            disabled
            name="disabled-group"
          >
            <Radio
              value="option1"
              label="Disabled Option 1"
              description="This option is not available right now."
            />
            <Radio
              value="option2"
              label="Disabled Option 2"
              description="This option is also unavailable."
            />
          </RadioGroup>
        </div>
      </section>

      <section className="component-section">
        <h2>Standalone Radio Buttons</h2>
        <div className="component-demo">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <h4 style={{ color: 'var(--text-primary)' }}>Individual radio buttons (same name for mutual exclusion):</h4>
            <Radio
              name="standalone"
              value="option-a"
              label="Standalone Option A"
              description="This radio button is managed individually."
              checked={selectedSize === 'option-a'}
              onChange={(e) => setSelectedSize((e.target as HTMLInputElement).value)}
            />
            <Radio
              name="standalone"
              value="option-b"
              label="Standalone Option B"
              description="This radio button is also managed individually."
              checked={selectedSize === 'option-b'}
              onChange={(e) => setSelectedSize((e.target as HTMLInputElement).value)}
            />
            <Radio
              name="standalone"
              value="option-c"
              label="Standalone Option C"
              description="All these radio buttons share the same name attribute."
              checked={selectedSize === 'option-c'}
              onChange={(e) => setSelectedSize((e.target as HTMLInputElement).value)}
            />
          </div>
        </div>
      </section>

      <section className="component-section">
        <h2>Complex Example</h2>
        <div className="component-demo">
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
            <Radio
              value="google-pay"
              label="Google Pay"
              description="Pay quickly and securely with your saved payment methods in Google Pay."
            />
            <Radio
              value="bank"
              label="Bank Transfer"
              description="Direct transfer from your bank account. This may take 3-5 business days to process."
            />
          </RadioGroup>
        </div>
      </section>

      <section className="component-section">
        <h2>Code Example</h2>
        <div className="code-block">
          <pre>
            <code>{`import { Radio, RadioGroup } from '@/components/Radio';

// Group usage (recommended)
<RadioGroup
  label="Select plan"
  description="Choose your subscription plan"
  value={selectedPlan}
  onChange={setSelectedPlan}
  name="plan"
>
  <Radio value="basic" label="Basic Plan" />
  <Radio value="pro" label="Pro Plan" />
  <Radio value="enterprise" label="Enterprise Plan" />
</RadioGroup>

// Individual radio buttons
<Radio
  name="theme"
  value="dark"
  label="Dark Theme"
  description="Easy on the eyes"
  checked={theme === 'dark'}
  onChange={(e) => setTheme(e.target.value)}
/>

// With error state
<RadioGroup
  label="Payment method"
  error="Please select a payment method"
  value={payment}
  onChange={setPayment}
>
  <Radio value="card" label="Credit Card" />
  <Radio value="paypal" label="PayPal" />
</RadioGroup>`}</code>
          </pre>
        </div>
      </section>

      <style jsx>{`
        .component-page {
          max-width: 1200px;
          margin: 0 auto;
          padding: var(--space-8);
          font-family: var(--font-primary);
        }

        .component-header {
          margin-bottom: var(--space-12);
          text-align: center;
        }

        .component-header h1 {
          color: var(--text-primary);
          font-size: var(--font-4xl);
          font-weight: var(--font-weight-bold);
          margin-bottom: var(--space-4);
        }

        .component-header p {
          color: var(--text-secondary);
          font-size: var(--font-lg);
          max-width: 600px;
          margin: 0 auto;
          line-height: var(--line-height-relaxed);
        }

        .component-section {
          margin-bottom: var(--space-16);
        }

        .component-section h2 {
          color: var(--text-primary);
          font-size: var(--font-2xl);
          font-weight: var(--font-weight-semibold);
          margin-bottom: var(--space-6);
          border-bottom: var(--border-thin) solid var(--border-secondary);
          padding-bottom: var(--space-3);
        }

        .component-demo {
          background: var(--bg-tertiary);
          border: var(--border-thin) solid var(--border-secondary);
          border-radius: var(--radius-xl);
          padding: var(--space-8);
        }

        .demo-column {
          display: flex;
          flex-direction: column;
          gap: var(--space-8);
        }

        .code-block {
          background: var(--color-gray-950);
          border: var(--border-thin) solid var(--border-primary);
          border-radius: var(--radius-lg);
          overflow: hidden;
        }

        .code-block pre {
          margin: 0;
          padding: var(--space-6);
          overflow-x: auto;
        }

        .code-block code {
          font-family: var(--font-mono);
          font-size: var(--font-sm);
          line-height: var(--line-height-relaxed);
          color: var(--code-text);
        }

        @media (max-width: 768px) {
          .component-page {
            padding: var(--space-4);
          }
        }
      `}</style>
    </div>
  );
}