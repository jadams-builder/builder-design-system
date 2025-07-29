'use client';

import React, { useState } from 'react';
import { Toggle, ToggleGroup } from '@/components/Toggle';

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

export default function TogglePage() {
  const [basicToggle, setBasicToggle] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);
  const [settingsToggles, setSettingsToggles] = useState({
    push: true,
    email: false,
    sms: true,
    desktop: false
  });

  const handleSettingToggle = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettingsToggles(prev => ({
      ...prev,
      [key]: e.target.checked
    }));
  };

  return (
    <div className="max-w-6xl mx-auto px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          Toggle
        </h1>
        <p className="text-lg mb-6" style={{ color: 'var(--text-secondary)' }}>
          Toggle component for binary on/off states with customizable 
          sizes, label positioning, and comprehensive accessibility support.
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
                <div style={{ color: 'var(--text-secondary)' }}>Toggle label text</div>
              </div>
              <div className="grid grid-cols-4 gap-4 text-sm">
                <div className="font-mono" style={{ color: 'var(--text-secondary)' }}>size</div>
                <div style={{ color: 'var(--text-secondary)' }}>&apos;sm&apos; | &apos;base&apos; | &apos;lg&apos;</div>
                <div style={{ color: 'var(--text-secondary)' }}>&apos;base&apos;</div>
                <div style={{ color: 'var(--text-secondary)' }}>Toggle size</div>
              </div>
              <div className="grid grid-cols-4 gap-4 text-sm">
                <div className="font-mono" style={{ color: 'var(--text-secondary)' }}>labelPosition</div>
                <div style={{ color: 'var(--text-secondary)' }}>&apos;left&apos; | &apos;right&apos;</div>
                <div style={{ color: 'var(--text-secondary)' }}>&apos;right&apos;</div>
                <div style={{ color: 'var(--text-secondary)' }}>Position of the label</div>
              </div>
              <div className="grid grid-cols-4 gap-4 text-sm">
                <div className="font-mono" style={{ color: 'var(--text-secondary)' }}>disabled</div>
                <div style={{ color: 'var(--text-secondary)' }}>boolean</div>
                <div style={{ color: 'var(--text-secondary)' }}>false</div>
                <div style={{ color: 'var(--text-secondary)' }}>Disable the toggle</div>
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
          title="Simple Toggle"
          description="A basic toggle switch with a label. Click to toggle between on and off states."
          code={`<Toggle
  label="Enable notifications"
  checked={checked}
  onChange={(e) => setChecked(e.target.checked)}
/>`}
        >
          <Toggle
            label="Enable notifications"
            checked={basicToggle}
            onChange={(e) => setBasicToggle(e.target.checked)}
          />
        </Example>
      </Section>

      <Section title="Sizes">
        <Example
          title="Toggle Sizes"
          description="Toggles come in three sizes, each using design token values for consistent sizing."
          code={`<Toggle label="Small toggle" size="sm" checked={true} onChange={handler} />
<Toggle label="Default toggle" size="base" checked={true} onChange={handler} />
<Toggle label="Large toggle" size="lg" checked={true} onChange={handler} />`}
        >
          <div className="flex flex-wrap gap-6 items-center">
            <Toggle
              label="Small toggle"
              size="sm"
              checked={true}
              onChange={() => {}}
            />
            <Toggle
              label="Default toggle"
              size="base"
              checked={true}
              onChange={() => {}}
            />
            <Toggle
              label="Large toggle"
              size="lg"
              checked={true}
              onChange={() => {}}
            />
          </div>
        </Example>
      </Section>

      <Section title="With Description">
        <Example
          title="Descriptive Toggles"
          description="Toggles can include additional description text for better clarity and context."
          code={`<Toggle
  label="Dark mode"
  description="Switch to dark theme for better viewing in low light environments."
  checked={darkMode}
  onChange={(e) => setDarkMode(e.target.checked)}
/>`}
        >
          <Toggle
            label="Dark mode"
            description="Switch to dark theme for better viewing in low light environments."
            checked={darkModeEnabled}
            onChange={(e) => setDarkModeEnabled(e.target.checked)}
          />
          <Toggle
            label="Auto-save"
            description="Automatically save your work every few minutes to prevent data loss."
            checked={autoSaveEnabled}
            onChange={(e) => setAutoSaveEnabled(e.target.checked)}
          />
        </Example>
      </Section>

      <Section title="Label Position">
        <Example
          title="Label Positioning"
          description="Control whether the label appears before or after the toggle switch."
          code={`<Toggle
  label="Label on the right (default)"
  labelPosition="right"
  checked={value}
  onChange={handler}
/>
<Toggle
  label="Label on the left"
  labelPosition="left"
  checked={value}
  onChange={handler}
/>`}
        >
          <Toggle
            label="Label on the right (default)"
            description="This is the default label position."
            labelPosition="right"
            checked={true}
            onChange={() => {}}
          />
          <Toggle
            label="Label on the left"
            description="Label appears before the toggle switch."
            labelPosition="left"
            checked={false}
            onChange={() => {}}
          />
        </Example>
      </Section>

      <Section title="States">
        <Example
          title="Toggle States"
          description="Different states including default on/off and disabled states."
          code={`// Default States
<Toggle label="Off state" checked={false} onChange={handler} />
<Toggle label="On state" checked={true} onChange={handler} />

// Disabled States
<Toggle label="Disabled off" disabled checked={false} onChange={handler} />
<Toggle label="Disabled on" disabled checked={true} onChange={handler} />`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
                Default States
              </h4>
              <div className="space-y-3">
                <Toggle label="Off state" checked={false} onChange={() => {}} />
                <Toggle label="On state" checked={true} onChange={() => {}} />
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
                Disabled States
              </h4>
              <div className="space-y-3">
                <Toggle label="Disabled off" disabled checked={false} onChange={() => {}} />
                <Toggle label="Disabled on" disabled checked={true} onChange={() => {}} />
              </div>
            </div>
          </div>
        </Example>
      </Section>

      <Section title="Without Labels">
        <Example
          title="Standalone Toggles"
          description="Toggles can be used without labels when the context is clear from surrounding content."
          code={`<Toggle size="sm" checked={false} onChange={handler} />
<Toggle size="base" checked={true} onChange={handler} />
<Toggle size="lg" checked={false} onChange={handler} />`}
        >
          <div className="flex gap-6 items-center">
            <div className="flex flex-col items-center gap-2">
              <Toggle size="sm" checked={false} onChange={() => {}} />
              <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Small</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Toggle size="base" checked={true} onChange={() => {}} />
              <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Base</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Toggle size="lg" checked={false} onChange={() => {}} />
              <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Large</span>
            </div>
          </div>
        </Example>
      </Section>

      <Section title="Error State">
        <Example
          title="Validation"
          description="Toggles can display error messages for validation feedback."
          code={`<Toggle
  label="Terms and conditions"
  description="You must accept our terms and conditions to continue."
  error="Please accept the terms and conditions."
  checked={false}
  onChange={handler}
/>`}
        >
          <Toggle
            label="Terms and conditions"
            description="You must accept our terms and conditions to continue."
            error="Please accept the terms and conditions."
            checked={false}
            onChange={() => {}}
          />
        </Example>
      </Section>

      <Section title="Toggle Group">
        <Example
          title="Grouped Toggles"
          description="Use ToggleGroup to organize related toggles with a shared label and description."
          code={`<ToggleGroup
  label="Notification preferences"
  description="Choose how you'd like to receive notifications."
>
  <Toggle
    label="Push notifications"
    description="Receive notifications directly on your device."
    checked={pushEnabled}
    onChange={setPushEnabled}
  />
  <Toggle
    label="Email notifications"
    description="Get updates and alerts via email."
    checked={emailEnabled}
    onChange={setEmailEnabled}
  />
</ToggleGroup>`}
        >
          <ToggleGroup
            label="Notification preferences"
            description="Choose how you'd like to receive notifications from our platform."
          >
            <Toggle
              label="Push notifications"
              description="Receive notifications directly on your device."
              checked={settingsToggles.push}
              onChange={handleSettingToggle('push')}
            />
            <Toggle
              label="Email notifications"
              description="Get updates and alerts via email."
              checked={settingsToggles.email}
              onChange={handleSettingToggle('email')}
            />
            <Toggle
              label="SMS notifications"
              description="Receive important alerts via text message."
              checked={settingsToggles.sms}
              onChange={handleSettingToggle('sms')}
            />
            <Toggle
              label="Desktop notifications"
              description="Show notifications on your desktop when the app is running."
              checked={settingsToggles.desktop}
              onChange={handleSettingToggle('desktop')}
            />
          </ToggleGroup>
        </Example>
      </Section>

      <Section title="Interactive Example">
        <Example
          title="Dynamic Notification Status"
          description="A comprehensive example showing how toggle state affects the UI and provides visual feedback."
          code={`const [notificationsEnabled, setNotificationsEnabled] = useState(true);

<div style={{
  background: notificationsEnabled ? 'var(--bg-success-subtle)' : 'var(--bg-tertiary)',
  border: 'var(--border-thin) solid',
  borderColor: notificationsEnabled ? 'var(--border-success)' : 'var(--border-secondary)',
  borderRadius: 'var(--radius-xl)',
  padding: 'var(--space-6)',
  transition: 'var(--transition-base)'
}}>
  <Toggle
    label="Enable notifications"
    description={notificationsEnabled 
      ? "Notifications are currently enabled. You'll receive updates and alerts." 
      : "Notifications are disabled. You won't receive any updates or alerts."
    }
    checked={notificationsEnabled}
    onChange={(e) => setNotificationsEnabled(e.target.checked)}
    size="lg"
  />
</div>`}
        >
          <div
            style={{
              background: notificationsEnabled ? 'var(--bg-success-subtle)' : 'var(--bg-tertiary)',
              border: 'var(--border-thin) solid',
              borderColor: notificationsEnabled ? 'var(--border-success)' : 'var(--border-secondary)',
              borderRadius: 'var(--radius-xl)',
              padding: 'var(--space-6)',
              transition: 'var(--transition-base)'
            }}
          >
            <Toggle
              label="Enable notifications"
              description={
                notificationsEnabled 
                  ? "Notifications are currently enabled. You'll receive updates and alerts." 
                  : "Notifications are disabled. You won't receive any updates or alerts."
              }
              checked={notificationsEnabled}
              onChange={(e) => setNotificationsEnabled(e.target.checked)}
              size="lg"
            />
          </div>

          <div className="text-center" style={{ color: 'var(--text-secondary)' }}>
            Status: {notificationsEnabled ? '🔔 Notifications Enabled' : '🔕 Notifications Disabled'}
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
            The Toggle component uses the following design tokens:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-semibold mb-2" style={{ color: 'var(--text-brand-primary)' }}>Colors</h4>
              <ul className="space-y-1 font-mono" style={{ color: 'var(--text-secondary)' }}>
                <li>--color-purple-500 (on state)</li>
                <li>--color-purple-400 (hover)</li>
                <li>--color-gray-300 (off state)</li>
                <li>--color-gray-600 (disabled)</li>
                <li>--text-error (error state)</li>
                <li>--bg-primary (toggle background)</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2" style={{ color: 'var(--text-brand-primary)' }}>Spacing & Sizing</h4>
              <ul className="space-y-1 font-mono" style={{ color: 'var(--text-secondary)' }}>
                <li>--space-4, --space-5, --space-6 (sizes)</li>
                <li>--space-3 (gap between elements)</li>
                <li>--space-1_5 (error margin)</li>
                <li>50% border-radius (pill shape)</li>
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
                <li>CSS transform (slide animation)</li>
              </ul>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}