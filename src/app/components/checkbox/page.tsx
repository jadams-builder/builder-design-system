'use client';

import React, { useState } from 'react';
import { Checkbox, CheckboxGroup } from '@/components/Checkbox';

export default function CheckboxPage() {
  const [basicChecked, setBasicChecked] = useState(false);
  const [checkedItems, setCheckedItems] = useState({
    option1: false,
    option2: true,
    option3: false
  });
  const [groupItems, setGroupItems] = useState({
    feature1: true,
    feature2: false,
    feature3: true
  });
  const [indeterminateParent, setIndeterminateParent] = useState(false);
  const [indeterminateChildren, setIndeterminateChildren] = useState({
    child1: true,
    child2: false,
    child3: false
  });

  const handleIndeterminateParentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.checked;
    setIndeterminateParent(newValue);
    setIndeterminateChildren({
      child1: newValue,
      child2: newValue,
      child3: newValue
    });
  };

  const handleIndeterminateChildChange = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const newChildren = {
      ...indeterminateChildren,
      [key]: e.target.checked
    };
    setIndeterminateChildren(newChildren);
    
    const checkedCount = Object.values(newChildren).filter(Boolean).length;
    const totalCount = Object.keys(newChildren).length;
    
    setIndeterminateParent(checkedCount === totalCount);
  };

  const isIndeterminate = () => {
    const checkedCount = Object.values(indeterminateChildren).filter(Boolean).length;
    const totalCount = Object.keys(indeterminateChildren).length;
    return checkedCount > 0 && checkedCount < totalCount;
  };

  return (
    <div className="component-page">
      <div className="component-header">
        <h1>Checkbox</h1>
        <p>
          Checkbox component for single and multiple selections with support for 
          indeterminate states, grouping, and comprehensive accessibility features.
        </p>
      </div>

      <section className="component-section">
        <h2>Basic Usage</h2>
        <div className="component-demo">
          <Checkbox
            label="Accept terms and conditions"
            checked={basicChecked}
            onChange={(e) => setBasicChecked(e.target.checked)}
          />
        </div>
      </section>

      <section className="component-section">
        <h2>Sizes</h2>
        <div className="component-demo">
          <div className="demo-row">
            <Checkbox
              label="Small checkbox"
              size="sm"
              checked={checkedItems.option1}
              onChange={(e) => setCheckedItems(prev => ({...prev, option1: e.target.checked}))}
            />
            <Checkbox
              label="Default checkbox"
              size="base"
              checked={checkedItems.option2}
              onChange={(e) => setCheckedItems(prev => ({...prev, option2: e.target.checked}))}
            />
            <Checkbox
              label="Large checkbox"
              size="lg"
              checked={checkedItems.option3}
              onChange={(e) => setCheckedItems(prev => ({...prev, option3: e.target.checked}))}
            />
          </div>
        </div>
      </section>

      <section className="component-section">
        <h2>With Description</h2>
        <div className="component-demo">
          <Checkbox
            label="Email notifications"
            description="Receive updates about your account activity and important announcements."
            checked={true}
            onChange={() => {}}
          />
          <Checkbox
            label="Marketing emails"
            description="Get the latest news, product updates, and special offers delivered to your inbox."
            checked={false}
            onChange={() => {}}
          />
        </div>
      </section>

      <section className="component-section">
        <h2>States</h2>
        <div className="component-demo">
          <div className="demo-row">
            <Checkbox label="Default" checked={false} onChange={() => {}} />
            <Checkbox label="Checked" checked={true} onChange={() => {}} />
            <Checkbox label="Indeterminate" indeterminate={true} onChange={() => {}} />
            <Checkbox label="Disabled" disabled checked={false} onChange={() => {}} />
            <Checkbox label="Disabled Checked" disabled checked={true} onChange={() => {}} />
          </div>
        </div>
      </section>

      <section className="component-section">
        <h2>Error State</h2>
        <div className="component-demo">
          <Checkbox
            label="Accept privacy policy"
            description="Please review and accept our privacy policy to continue."
            error="You must accept the privacy policy to proceed."
            checked={false}
            onChange={() => {}}
          />
        </div>
      </section>

      <section className="component-section">
        <h2>Checkbox Group</h2>
        <div className="component-demo">
          <CheckboxGroup
            label="Select features"
            description="Choose which features you'd like to enable for your account."
          >
            <Checkbox
              label="Dark mode"
              description="Enable dark theme throughout the application"
              checked={groupItems.feature1}
              onChange={(e) => setGroupItems(prev => ({...prev, feature1: e.target.checked}))}
            />
            <Checkbox
              label="Notifications"
              description="Receive real-time notifications"
              checked={groupItems.feature2}
              onChange={(e) => setGroupItems(prev => ({...prev, feature2: e.target.checked}))}
            />
            <Checkbox
              label="Auto-save"
              description="Automatically save your work"
              checked={groupItems.feature3}
              onChange={(e) => setGroupItems(prev => ({...prev, feature3: e.target.checked}))}
            />
          </CheckboxGroup>
        </div>
      </section>

      <section className="component-section">
        <h2>Indeterminate with Children</h2>
        <div className="component-demo">
          <div>
            <Checkbox
              label="Select All"
              checked={indeterminateParent}
              indeterminate={isIndeterminate()}
              onChange={handleIndeterminateParentChange}
            />
            <div style={{ marginLeft: 'var(--space-6)', marginTop: 'var(--space-3)' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                <Checkbox
                  label="Option 1"
                  checked={indeterminateChildren.child1}
                  onChange={handleIndeterminateChildChange('child1')}
                />
                <Checkbox
                  label="Option 2"
                  checked={indeterminateChildren.child2}
                  onChange={handleIndeterminateChildChange('child2')}
                />
                <Checkbox
                  label="Option 3"
                  checked={indeterminateChildren.child3}
                  onChange={handleIndeterminateChildChange('child3')}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="component-section">
        <h2>Code Example</h2>
        <div className="code-block">
          <pre>
            <code>{`import { Checkbox, CheckboxGroup } from '@/components/Checkbox';

// Basic usage
<Checkbox
  label="Accept terms"
  checked={checked}
  onChange={(e) => setChecked(e.target.checked)}
/>

// With description and error
<Checkbox
  label="Email notifications"  
  description="Receive updates about your account"
  error="Please select an option"
  checked={checked}
  onChange={(e) => setChecked(e.target.checked)}
/>

// Indeterminate state
<Checkbox
  label="Select All"
  indeterminate={true}
  onChange={handleChange}
/>

// Grouped checkboxes
<CheckboxGroup
  label="Select features"
  description="Choose features to enable"
>
  <Checkbox label="Feature 1" checked={f1} onChange={setF1} />
  <Checkbox label="Feature 2" checked={f2} onChange={setF2} />
</CheckboxGroup>`}</code>
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
          display: flex;
          flex-direction: column;
          gap: var(--space-6);
        }

        .demo-row {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-6);
          align-items: flex-start;
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
          }
        }
      `}</style>
    </div>
  );
}