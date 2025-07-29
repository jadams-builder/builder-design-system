'use client';

import React, { useState } from 'react';
import { Toggle, ToggleGroup } from '@/components/Toggle';

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
    <div className="component-page">
      <div className="component-header">
        <h1>Toggle</h1>
        <p>
          Toggle component for binary on/off states with customizable 
          sizes, label positioning, and comprehensive accessibility support.
        </p>
      </div>

      <section className="component-section">
        <h2>Basic Usage</h2>
        <div className="component-demo">
          <Toggle
            label="Enable notifications"
            checked={basicToggle}
            onChange={(e) => setBasicToggle(e.target.checked)}
          />
        </div>
      </section>

      <section className="component-section">
        <h2>Sizes</h2>
        <div className="component-demo">
          <div className="demo-row">
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
        </div>
      </section>

      <section className="component-section">
        <h2>With Description</h2>
        <div className="component-demo">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
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
          </div>
        </div>
      </section>

      <section className="component-section">
        <h2>Label Position</h2>
        <div className="component-demo">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
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
          </div>
        </div>
      </section>

      <section className="component-section">
        <h2>States</h2>
        <div className="component-demo">
          <div className="demo-grid">
            <div>
              <h4 style={{ color: 'var(--text-primary)', marginBottom: 'var(--space-3)' }}>
                Default States
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                <Toggle label="Off state" checked={false} onChange={() => {}} />
                <Toggle label="On state" checked={true} onChange={() => {}} />
              </div>
            </div>

            <div>
              <h4 style={{ color: 'var(--text-primary)', marginBottom: 'var(--space-3)' }}>
                Disabled States
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                <Toggle label="Disabled off" disabled checked={false} onChange={() => {}} />
                <Toggle label="Disabled on" disabled checked={true} onChange={() => {}} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="component-section">
        <h2>Error State</h2>
        <div className="component-demo">
          <Toggle
            label="Terms and conditions"
            description="You must accept our terms and conditions to continue."
            error="Please accept the terms and conditions."
            checked={false}
            onChange={() => {}}
          />
        </div>
      </section>

      <section className="component-section">
        <h2>Without Labels</h2>
        <div className="component-demo">
          <div className="demo-row">
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-2)' }}>
              <Toggle size="sm" checked={false} onChange={() => {}} />
              <span style={{ fontSize: 'var(--font-xs)', color: 'var(--text-tertiary)' }}>Small</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-2)' }}>
              <Toggle size="base" checked={true} onChange={() => {}} />
              <span style={{ fontSize: 'var(--font-xs)', color: 'var(--text-tertiary)' }}>Base</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-2)' }}>
              <Toggle size="lg" checked={false} onChange={() => {}} />
              <span style={{ fontSize: 'var(--font-xs)', color: 'var(--text-tertiary)' }}>Large</span>
            </div>
          </div>
        </div>
      </section>

      <section className="component-section">
        <h2>Toggle Group</h2>
        <div className="component-demo">
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
        </div>
      </section>

      <section className="component-section">
        <h2>Interactive Example</h2>
        <div className="component-demo">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
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

            <div style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
              Status: {notificationsEnabled ? '🔔 Notifications Enabled' : '🔕 Notifications Disabled'}
            </div>
          </div>
        </div>
      </section>

      <section className="component-section">
        <h2>Code Example</h2>
        <div className="code-block">
          <pre>
            <code>{`import { Toggle, ToggleGroup } from '@/components/Toggle';

// Basic usage
<Toggle
  label="Enable feature"
  checked={enabled}
  onChange={(e) => setEnabled(e.target.checked)}
/>

// With description
<Toggle
  label="Dark mode"
  description="Switch to dark theme for better viewing"
  checked={darkMode}
  onChange={(e) => setDarkMode(e.target.checked)}
/>

// Different sizes
<Toggle size="sm" label="Small" checked={value} onChange={handler} />
<Toggle size="base" label="Default" checked={value} onChange={handler} />
<Toggle size="lg" label="Large" checked={value} onChange={handler} />

// Label positioning
<Toggle
  label="Label on left"
  labelPosition="left"
  checked={value}
  onChange={handler}
/>

// Grouped toggles
<ToggleGroup
  label="Settings"
  description="Configure your preferences"
>
  <Toggle label="Option 1" checked={opt1} onChange={setOpt1} />
  <Toggle label="Option 2" checked={opt2} onChange={setOpt2} />
</ToggleGroup>

// Error state
<Toggle
  label="Required setting"
  error="This setting must be enabled"
  checked={value}
  onChange={handler}
/>`}</code>
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

        .demo-row {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-6);
          align-items: center;
        }

        .demo-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
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

          .demo-row {
            flex-direction: column;
            align-items: flex-start;
          }

          .demo-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}