'use client';

import React, { useState } from 'react';
import { Select } from '@/components/Select';

const countryOptions = [
  { value: 'us', label: 'United States', description: 'North America' },
  { value: 'ca', label: 'Canada', description: 'North America' },
  { value: 'uk', label: 'United Kingdom', description: 'Europe' },
  { value: 'de', label: 'Germany', description: 'Europe' },
  { value: 'fr', label: 'France', description: 'Europe' },
  { value: 'jp', label: 'Japan', description: 'Asia' },
  { value: 'au', label: 'Australia', description: 'Oceania' },
  { value: 'br', label: 'Brazil', description: 'South America' },
  { value: 'mx', label: 'Mexico', description: 'North America' },
  { value: 'in', label: 'India', description: 'Asia' }
];

const simpleOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
  { value: 'option4', label: 'Option 4', disabled: true },
  { value: 'option5', label: 'Option 5' }
];

const frameworkOptions = [
  { value: 'react', label: 'React', description: 'A JavaScript library for building user interfaces' },
  { value: 'vue', label: 'Vue.js', description: 'The Progressive JavaScript Framework' },
  { value: 'angular', label: 'Angular', description: 'Platform for building mobile and desktop web applications' },
  { value: 'svelte', label: 'Svelte', description: 'Cybernetically enhanced web apps' },
  { value: 'solid', label: 'Solid', description: 'A declarative, efficient, and flexible JavaScript library' }
];

export default function SelectPage() {
  const [basicValue, setBasicValue] = useState<string | number>('');
  const [multiValue, setMultiValue] = useState<(string | number)[]>(['us', 'ca']);
  const [searchableValue, setSearchableValue] = useState<string | number>('react');
  const [sizeValues, setSizeValues] = useState({
    sm: '',
    base: 'option2',
    lg: ''
  });

  return (
    <div className="component-page">
      <div className="component-header">
        <h1>Select</h1>
        <p>
          Flexible select component with support for single and multi-select, 
          search functionality, and comprehensive keyboard navigation.
        </p>
      </div>

      <section className="component-section">
        <h2>Basic Usage</h2>
        <div className="component-demo">
          <Select
            label="Choose an option"
            placeholder="Select an option..."
            options={simpleOptions}
            value={basicValue}
            onChange={setBasicValue}
          />
        </div>
      </section>

      <section className="component-section">
        <h2>Sizes</h2>
        <div className="component-demo">
          <div className="demo-column">
            <Select
              label="Small select"
              size="sm"
              options={simpleOptions} 
              value={sizeValues.sm}
              onChange={(value) => setSizeValues(prev => ({ ...prev, sm: value as string }))}
              placeholder="Small size..."
            />
            <Select
              label="Default select"
              size="base"
              options={simpleOptions}
              value={sizeValues.base}
              onChange={(value) => setSizeValues(prev => ({ ...prev, base: value as string }))}
              placeholder="Default size..."
            />
            <Select
              label="Large select"
              size="lg"
              options={simpleOptions}
              value={sizeValues.lg}
              onChange={(value) => setSizeValues(prev => ({ ...prev, lg: value as string }))}
              placeholder="Large size..."
            />
          </div>
        </div>
      </section>

      <section className="component-section">
        <h2>With Description</h2>
        <div className="component-demo">
          <Select
            label="Select country"
            description="Choose your country of residence for shipping and billing purposes."
            options={countryOptions}
            value="us"
            onChange={() => {}}
            placeholder="Select a country..."
          />
        </div>
      </section>

      <section className="component-section">
        <h2>Multi-Select</h2>
        <div className="component-demo">
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
        </div>
      </section>

      <section className="component-section">
        <h2>Searchable</h2>
        <div className="component-demo">
          <Select
            label="Choose framework"
            description="Select your preferred JavaScript framework."
            options={frameworkOptions}
            value={searchableValue}
            onChange={setSearchableValue}
            searchable
            clearable
            placeholder="Search frameworks..."
          />
        </div>
      </section>

      <section className="component-section">
        <h2>States</h2>
        <div className="component-demo">
          <div className="demo-column">
            <Select
              label="Default state"
              options={simpleOptions}
              value=""
              onChange={() => {}}
              placeholder="Default select..."
            />
            
            <Select
              label="With selection"
              options={simpleOptions}
              value="option2"
              onChange={() => {}}
            />
            
            <Select
              label="Disabled"
              options={simpleOptions}
              value="option1"
              onChange={() => {}}
              disabled
            />
            
            <Select
              label="With error"
              options={simpleOptions}
              value=""
              onChange={() => {}}
              error="Please select an option to continue."
              placeholder="Select an option..."
            />
          </div>
        </div>
      </section>

      <section className="component-section">
        <h2>Clearable</h2>
        <div className="component-demo">
          <Select
            label="Clearable select"
            description="You can clear the selection using the X button."
            options={simpleOptions}
            value="option2"
            onChange={() => {}}
            clearable
            placeholder="Select an option..."
          />
        </div>
      </section>

      <section className="component-section">
        <h2>Multi-Select with Search</h2>
        <div className="component-demo">
          <Select
            label="Countries and regions"
            description="Search and select multiple countries. Selected items appear as tags."
            options={countryOptions}
            value={['us', 'ca', 'uk', 'de']}
            onChange={() => {}}
            multiple
            searchable
            clearable
            placeholder="Search and select countries..."
            maxHeight={300}
          />
        </div>
      </section>

      <section className="component-section">
        <h2>Custom Max Height</h2>
        <div className="component-demo">
          <Select
            label="Limited height dropdown"
            description="This dropdown has a custom maximum height of 150px."
            options={[
              ...countryOptions,
              { value: 'it', label: 'Italy', description: 'Europe' },
              { value: 'es', label: 'Spain', description: 'Europe' },
              { value: 'pt', label: 'Portugal', description: 'Europe' },
              { value: 'nl', label: 'Netherlands', description: 'Europe' },
              { value: 'be', label: 'Belgium', description: 'Europe' },
              { value: 'ch', label: 'Switzerland', description: 'Europe' },
              { value: 'at', label: 'Austria', description: 'Europe' }
            ]}
            value=""
            onChange={() => {}}
            searchable
            maxHeight={150}
            placeholder="Search countries..."
          />
        </div>
      </section>

      <section className="component-section">
        <h2>Complex Example</h2>
        <div className="component-demo">
          <div className="demo-column">
            <Select
              label="Development stack"
              description="Choose the technologies you're most experienced with. You can select multiple options and search through them."
              options={[
                { value: 'react', label: 'React', description: 'JavaScript library for building user interfaces' },
                { value: 'vue', label: 'Vue.js', description: 'Progressive JavaScript framework' },
                { value: 'angular', label: 'Angular', description: 'Platform for building web applications' },
                { value: 'svelte', label: 'Svelte', description: 'Cybernetically enhanced web apps' },
                { value: 'nextjs', label: 'Next.js', description: 'React framework for production' },
                { value: 'nuxtjs', label: 'Nuxt.js', description: 'Vue.js framework' },
                { value: 'gatsby', label: 'Gatsby', description: 'Static site generator for React' },
                { value: 'nodejs', label: 'Node.js', description: 'JavaScript runtime for server-side development' },
                { value: 'express', label: 'Express.js', description: 'Fast, minimalist web framework for Node.js' },
                { value: 'django', label: 'Django', description: 'Python web framework' },
                { value: 'flask', label: 'Flask', description: 'Lightweight Python web framework' },
                { value: 'rails', label: 'Ruby on Rails', description: 'Web application framework written in Ruby' }
              ]}
              value={['react', 'nextjs', 'nodejs']}
              onChange={() => {}}
              multiple
              searchable
              clearable
              size="lg"
              maxHeight={250}
              placeholder="Search and select technologies..."
            />
          </div>
        </div>
      </section>

      <section className="component-section">
        <h2>Code Example</h2>
        <div className="code-block">
          <pre>
            <code>{`import { Select } from '@/components/Select';

const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2', description: 'With description' },
  { value: 'option3', label: 'Option 3', disabled: true }
];

// Basic usage
<Select
  label="Choose option"
  options={options}
  value={value}
  onChange={setValue}
  placeholder="Select..."
/>

// Multi-select with search
<Select
  label="Select multiple"
  options={options}
  value={selectedItems}
  onChange={setSelectedItems}
  multiple
  searchable
  clearable
  placeholder="Search and select..."
/>

// Different sizes
<Select size="sm" options={options} value={value} onChange={setValue} />
<Select size="base" options={options} value={value} onChange={setValue} />
<Select size="lg" options={options} value={value} onChange={setValue} />

// With error state
<Select
  label="Required field"
  options={options}
  value={value}
  onChange={setValue}
  error="Please select an option"
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

        .demo-column {
          display: flex;
          flex-direction: column;
          gap: var(--space-6);
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