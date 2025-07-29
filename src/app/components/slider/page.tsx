'use client';

import React, { useState } from 'react';
import { Slider } from '@/components/Slider';

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
    <div className="max-w-6xl mx-auto px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          Slider
        </h1>
        <p className="text-lg mb-6" style={{ color: 'var(--text-secondary)' }}>
          Slider component for selecting numeric values and ranges with 
          support for single and dual handles, custom formatting, and ticks.
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
                <div style={{ color: 'var(--text-secondary)' }}>Slider label text</div>
              </div>
              <div className="grid grid-cols-4 gap-4 text-sm">
                <div className="font-mono" style={{ color: 'var(--text-secondary)' }}>value</div>
                <div style={{ color: 'var(--text-secondary)' }}>number | [number, number]</div>
                <div style={{ color: 'var(--text-secondary)' }}>-</div>
                <div style={{ color: 'var(--text-secondary)' }}>Current value or range</div>
              </div>
              <div className="grid grid-cols-4 gap-4 text-sm">
                <div className="font-mono" style={{ color: 'var(--text-secondary)' }}>min</div>
                <div style={{ color: 'var(--text-secondary)' }}>number</div>
                <div style={{ color: 'var(--text-secondary)' }}>0</div>
                <div style={{ color: 'var(--text-secondary)' }}>Minimum value</div>
              </div>
              <div className="grid grid-cols-4 gap-4 text-sm">
                <div className="font-mono" style={{ color: 'var(--text-secondary)' }}>max</div>
                <div style={{ color: 'var(--text-secondary)' }}>number</div>
                <div style={{ color: 'var(--text-secondary)' }}>100</div>
                <div style={{ color: 'var(--text-secondary)' }}>Maximum value</div>
              </div>
              <div className="grid grid-cols-4 gap-4 text-sm">
                <div className="font-mono" style={{ color: 'var(--text-secondary)' }}>step</div>
                <div style={{ color: 'var(--text-secondary)' }}>number</div>
                <div style={{ color: 'var(--text-secondary)' }}>1</div>
                <div style={{ color: 'var(--text-secondary)' }}>Step increment</div>
              </div>
              <div className="grid grid-cols-4 gap-4 text-sm">
                <div className="font-mono" style={{ color: 'var(--text-secondary)' }}>dual</div>
                <div style={{ color: 'var(--text-secondary)' }}>boolean</div>
                <div style={{ color: 'var(--text-secondary)' }}>false</div>
                <div style={{ color: 'var(--text-secondary)' }}>Enable range selection</div>
              </div>
              <div className="grid grid-cols-4 gap-4 text-sm">
                <div className="font-mono" style={{ color: 'var(--text-secondary)' }}>showValue</div>
                <div style={{ color: 'var(--text-secondary)' }}>boolean</div>
                <div style={{ color: 'var(--text-secondary)' }}>false</div>
                <div style={{ color: 'var(--text-secondary)' }}>Show current value</div>
              </div>
              <div className="grid grid-cols-4 gap-4 text-sm">
                <div className="font-mono" style={{ color: 'var(--text-secondary)' }}>showTicks</div>
                <div style={{ color: 'var(--text-secondary)' }}>boolean</div>
                <div style={{ color: 'var(--text-secondary)' }}>false</div>
                <div style={{ color: 'var(--text-secondary)' }}>Show tick marks</div>
              </div>
              <div className="grid grid-cols-4 gap-4 text-sm">
                <div className="font-mono" style={{ color: 'var(--text-secondary)' }}>formatValue</div>
                <div style={{ color: 'var(--text-secondary)' }}>(value: number) =&gt; string</div>
                <div style={{ color: 'var(--text-secondary)' }}>-</div>
                <div style={{ color: 'var(--text-secondary)' }}>Custom value formatter</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Section title="Basic Usage">
        <Example
          title="Simple Slider"
          description="A basic slider for selecting a single numeric value. Drag the handle to change the value."
          code={`<Slider
  label="Basic slider"
  value={value}
  onChange={setValue}
  min={0}
  max={100}
  step={1}
  showValue
/>`}
        >
          <Slider
            label="Basic slider"
            value={basicValue}
            onChange={setBasicValue}
            min={0}
            max={100}
            step={1}
            showValue
          />
        </Example>
      </Section>

      <Section title="With Description">
        <Example
          title="Descriptive Slider"
          description="Sliders can include description text to provide context and custom value formatting."
          code={`<Slider
  label="Volume"
  description="Adjust the system volume level from 0 to 100."
  value={volume}
  onChange={setVolume}
  min={0}
  max={100}
  step={5}
  showValue
  formatValue={(val) => \`\${val}%\`}
/>`}
        >
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
        </Example>
      </Section>

      <Section title="Range Slider (Dual Handle)">
        <Example
          title="Range Selection"
          description="Use dual handles to select a range of values. Both handles can be dragged independently."
          code={`<Slider
  label="Price range"
  description="Select your preferred price range for products."
  value={[minPrice, maxPrice]}
  onChange={setPriceRange}
  min={0}
  max={100}
  step={5}
  dual
  showValue
  formatValue={(val) => \`$\${val}\`}
/>`}
        >
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
        </Example>
      </Section>

      <Section title="With Ticks">
        <Example
          title="Tick Marks"
          description="Show tick marks for better visual reference and precise value selection."
          code={`<Slider
  label="Rating"
  description="Rate your experience from 1 to 5 stars."
  value={3}
  onChange={setRating}
  min={1}
  max={5}
  step={1}
  showTicks
  tickCount={5}
  showValue
/>`}
        >
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
        </Example>
      </Section>

      <Section title="Different Step Sizes">
        <Example
          title="Step Control"
          description="Control the precision and increment size with different step values."
          code={`// Fine control (step: 0.1)
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

// Coarse control (step: 10)
<Slider
  label="Coarse control"
  value={value}
  onChange={setValue}
  min={0}
  max={100}
  step={10}
  showValue
  showTicks
  tickCount={11}
/>`}
        >
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
        </Example>
      </Section>

      <Section title="States">
        <Example
          title="Slider States"
          description="Different states including default, disabled, and error states."
          code={`<Slider label="Default state" value={50} onChange={handler} />
<Slider label="Disabled single" value={30} onChange={handler} disabled />
<Slider label="Disabled range" value={[20, 80]} onChange={handler} dual disabled />
<Slider label="Error state" value={90} onChange={handler} error="Value is too high." />`}
        >
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
        </Example>
      </Section>

      <Section title="Custom Formatting">
        <Example
          title="Value Formatting"
          description="Use custom formatters to display values in different units and formats."
          code={`// File size formatter
<Slider
  label="File size"
  value={512}
  onChange={setValue}
  min={0}
  max={1024}
  step={64}
  showValue
  formatValue={(val) => \`\${val} MB\`}
/>

// Time formatter
<Slider
  label="Time range"
  value={[9, 17]}
  onChange={setTimeRange}
  min={0}
  max={24}
  step={1}
  dual
  showValue
  formatValue={(val) => {
    const hour = Math.floor(val);
    return \`\${hour.toString().padStart(2, '0')}:00\`;
  }}
/>`}
        >
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
        </Example>
      </Section>

      <Section title="Interactive Example">
        <Example
          title="Monitor Brightness Control"
          description="A comprehensive example showing dynamic value display and visual feedback."
          code={`const [brightnessValue, setBrightnessValue] = useState(80);

<div style={{
  background: 'var(--bg-elevated)',
  border: 'var(--border-thin) solid var(--border-secondary)',
  borderRadius: 'var(--radius-xl)',
  padding: 'var(--space-6)',
  textAlign: 'center'
}}>
  <h3>Monitor Brightness</h3>
  <div style={{
    fontSize: '3rem',
    color: 'var(--color-purple-400)',
    fontWeight: 'var(--font-weight-bold)'
  }}>
    {brightnessValue}%
  </div>
  
  <Slider
    value={brightnessValue}
    onChange={setBrightnessValue}
    min={0}
    max={100}
    step={1}
    showTicks
    tickCount={11}
    formatValue={(val) => \`\${val}%\`}
  />
</div>`}
        >
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
            The Slider component uses the following design tokens:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-semibold mb-2" style={{ color: 'var(--text-brand-primary)' }}>Colors</h4>
              <ul className="space-y-1 font-mono" style={{ color: 'var(--text-secondary)' }}>
                <li>--color-purple-500 (handle, track)</li>
                <li>--color-purple-400 (hover)</li>
                <li>--color-gray-300 (inactive track)</li>
                <li>--color-gray-600 (disabled)</li>
                <li>--text-error (error state)</li>
                <li>--bg-primary (handle background)</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2" style={{ color: 'var(--text-brand-primary)' }}>Spacing & Sizing</h4>
              <ul className="space-y-1 font-mono" style={{ color: 'var(--text-secondary)' }}>
                <li>--space-3, --space-4, --space-5 (handle)</li>
                <li>--space-2 (track height)</li>
                <li>--space-1_5 (tick marks)</li>
                <li>50% border-radius (rounded handles)</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2" style={{ color: 'var(--text-brand-primary)' }}>Typography</h4>
              <ul className="space-y-1 font-mono" style={{ color: 'var(--text-secondary)' }}>
                <li>--font-primary</li>
                <li>--font-base (label)</li>
                <li>--font-sm (description, value)</li>
                <li>--font-weight-medium</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2" style={{ color: 'var(--text-brand-primary)' }}>Effects</h4>
              <ul className="space-y-1 font-mono" style={{ color: 'var(--text-secondary)' }}>
                <li>--transition-fast</li>
                <li>--focus-ring</li>
                <li>--shadow-sm (handle elevation)</li>
                <li>CSS transform (handle position)</li>
              </ul>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}