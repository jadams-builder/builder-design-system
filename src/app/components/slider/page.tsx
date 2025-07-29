'use client';

import React, { useState } from 'react';
import { Slider } from '@/components/Slider';

export default function SliderPage() {
  const [basicValue, setBasicValue] = useState(50);
  const [volumeValue, setVolumeValue] = useState(75);
  const [priceRange, setPriceRange] = useState<[number, number]>([25, 75]);
  const [temperatureRange, setTemperatureRange] = useState<[number, number]>([18, 24]);
  const [brightnessValue, setBrightnessValue] = useState(80);

  const formatCurrency = (value: number) => `$${value}`;
  const formatTemperature = (value: number) => `${value}°C`;
  const formatPercentage = (value: number) => `${value}%`;

  return (
    <div className="component-page">
      <div className="component-header">
        <h1>Slider</h1>
        <p>
          Slider component for selecting numeric values and ranges with 
          support for single and dual handles, custom formatting, and ticks.
        </p>
      </div>

      <section className="component-section">
        <h2>Basic Usage</h2>
        <div className="component-demo">
          <Slider
            label="Basic slider"
            value={basicValue}
            onChange={setBasicValue}
            min={0}
            max={100}
            step={1}
            showValue
          />
        </div>
      </section>

      <section className="component-section">
        <h2>With Description</h2>
        <div className="component-demo">
          <Slider
            label="Volume"
            description="Adjust the system volume level from 0 to 100."
            value={volumeValue}
            onChange={setVolumeValue}
            min={0}
            max={100}
            step={5}
            showValue
            formatValue={formatPercentage}
          />
        </div>
      </section>

      <section className="component-section">
        <h2>Range Slider (Dual Handle)</h2>
        <div className="component-demo">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            <Slider
              label="Price range"
              description="Select your preferred price range for products."
              value={priceRange}
              onChange={setPriceRange}
              min={0}
              max={100}
              step={5}
              dual
              showValue
              formatValue={formatCurrency}
            />
            
            <Slider
              label="Temperature range"
              description="Set your comfortable temperature range."
              value={temperatureRange}
              onChange={setTemperatureRange}
              min={10}
              max={30}
              step={0.5}
              dual
              showValue
              formatValue={formatTemperature}
            />
          </div>
        </div>
      </section>

      <section className="component-section">
        <h2>With Ticks</h2>
        <div className="component-demo">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            <Slider
              label="Rating"
              description="Rate your experience from 1 to 5 stars."
              value={3}
              onChange={() => {}}
              min={1}
              max={5}
              step={1}
              showTicks
              tickCount={5}
              showValue
            />
            
            <Slider
              label="Quality settings"
              description="Choose video quality with preset options."
              value={2}
              onChange={() => {}}
              min={0}
              max={4}
              step={1}
              showTicks
              tickCount={5}
              showValue
              formatValue={(val) => {
                const qualities = ['Low', 'Medium', 'High', 'Ultra', 'Max'];
                return qualities[val] || val.toString();
              }}
            />
          </div>
        </div>
      </section>

      <section className="component-section">
        <h2>Different Step Sizes</h2>
        <div className="component-demo">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            <Slider
              label="Fine control (step: 0.1)"
              value={5.5}
              onChange={() => {}}
              min={0}
              max={10}
              step={0.1}
              showValue
              formatValue={(val) => val.toFixed(1)}
            />
            
            <Slider
              label="Coarse control (step: 10)"
              value={50}
              onChange={() => {}}
              min={0}
              max={100}
              step={10}
              showValue
              showTicks
              tickCount={11}
            />
            
            <Slider
              label="Large steps (step: 25)"
              value={[25, 75]}
              onChange={() => {}}
              min={0}
              max={100}
              step={25}
              dual
              showValue
              showTicks
              tickCount={5}
            />
          </div>
        </div>
      </section>

      <section className="component-section">
        <h2>States</h2>
        <div className="component-demo">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            <Slider
              label="Default state"
              value={50}
              onChange={() => {}}
              min={0}
              max={100}
              showValue
            />
            
            <Slider
              label="Disabled single"
              value={30}
              onChange={() => {}}
              min={0}
              max={100}
              disabled
              showValue
            />
            
            <Slider
              label="Disabled range"
              value={[20, 80]}
              onChange={() => {}}
              min={0}
              max={100}
              dual
              disabled
              showValue
            />
            
            <Slider
              label="Error state"
              value={90}
              onChange={() => {}}
              min={0}
              max={100}
              showValue
              error="Value is too high. Please select a value below 80."
            />
          </div>
        </div>
      </section>

      <section className="component-section">
        <h2>Custom Formatting</h2>
        <div className="component-demo">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            <Slider
              label="File size"
              description="Select maximum file size for uploads."
              value={512}
              onChange={() => {}}
              min={0}
              max={1024}
              step={64}
              showValue
              formatValue={(val) => `${val} MB`}
            />
            
            <Slider
              label="Time range"
              description="Set your available hours."
              value={[9, 17]}
              onChange={() => {}}
              min={0}
              max={24}
              step={1}
              dual
              showValue
              formatValue={(val) => {
                const hour = Math.floor(val);
                return `${hour.toString().padStart(2, '0')}:00`;
              }}
            />
            
            <Slider
              label="Memory usage"
              description="Allocate system memory for the application."
              value={4}
              onChange={() => {}}
              min={1}
              max={16}
              step={1}
              showValue
              showTicks
              tickCount={8}
              formatValue={(val) => `${val} GB`}
            />
          </div>
        </div>
      </section>

      <section className="component-section">
        <h2>Interactive Example</h2>
        <div className="component-demo">
          <div
            style={{
              background: 'var(--bg-elevated)',
              border: 'var(--border-thin) solid var(--border-secondary)',
              borderRadius: 'var(--radius-xl)',
              padding: 'var(--space-6)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-4)'
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <h3 style={{ color: 'var(--text-primary)', marginBottom: 'var(--space-2)' }}>
                Monitor Brightness
              </h3>
              <div
                style={{
                  fontSize: '3rem',
                  color: 'var(--color-purple-400)',
                  fontWeight: 'var(--font-weight-bold)',
                  marginBottom: 'var(--space-4)'
                }}
              >
                {brightnessValue}%
              </div>
            </div>
            
            <Slider
              value={brightnessValue}
              onChange={setBrightnessValue}
              min={0}
              max={100}
              step={1}
              showTicks
              tickCount={11}
              formatValue={formatPercentage}
            />
            
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--font-sm)', color: 'var(--text-tertiary)' }}>
              <span>🌑 Dark</span>
              <span>☀️ Bright</span>
            </div>
          </div>
        </div>
      </section>

      <section className="component-section">
        <h2>Code Example</h2>
        <div className="code-block">
          <pre>
            <code>{`import { Slider } from '@/components/Slider';

// Basic slider
<Slider
  label="Volume"
  value={volume}
  onChange={setVolume}
  min={0}
  max={100}
  step={1}
  showValue
/>

// Range slider (dual handle)
<Slider
  label="Price range"
  value={[minPrice, maxPrice]}
  onChange={setPriceRange}
  min={0}
  max={1000}
  step={10}
  dual
  showValue
  formatValue={(val) => \`$\${val}\`}
/>

// With ticks and custom formatting
<Slider
  label="Quality"
  value={quality}
  onChange={setQuality}
  min={0}
  max={4}
  step={1}
  showTicks
  tickCount={5}
  showValue
  formatValue={(val) => {
    const levels = ['Low', 'Medium', 'High', 'Ultra', 'Max'];
    return levels[val];
  }}
/>

// Different step sizes
<Slider
  label="Fine control"
  value={value}
  onChange={setValue}
  min={0}
  max={10}
  step={0.1}
  showValue
  formatValue={(val) => val.toFixed(1)}
/>

// Error state
<Slider
  label="Setting"
  value={value}
  onChange={setValue}
  error="Value must be between 20 and 80"
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