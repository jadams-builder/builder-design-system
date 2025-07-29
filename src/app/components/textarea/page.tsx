'use client';

import React, { useState } from 'react';
import { Textarea } from '@/components/Textarea';

export default function TextareaPage() {
  const [basicValue, setBasicValue] = useState('');
  const [autoResizeValue, setAutoResizeValue] = useState('This textarea will automatically resize as you type more content. Try adding multiple lines of text to see how it expands vertically while maintaining a good reading experience.');
  const [limitedValue, setLimitedValue] = useState('');
  const [bioValue, setBioValue] = useState('Software engineer with a passion for creating beautiful and functional user interfaces. I love working with React, TypeScript, and modern web technologies.');

  return (
    <div className="component-page">
      <div className="component-header">
        <h1>Textarea</h1>
        <p>
          Multi-line text input component with auto-resize functionality, 
          character counting, and comprehensive resize controls.
        </p>
      </div>

      <section className="component-section">
        <h2>Basic Usage</h2>
        <div className="component-demo">
          <Textarea
            label="Message"
            placeholder="Enter your message here..."
            value={basicValue}
            onChange={(e) => setBasicValue(e.target.value)}
          />
        </div>
      </section>

      <section className="component-section">
        <h2>With Description</h2>
        <div className="component-demo">
          <Textarea
            label="Project description"
            description="Provide a detailed description of your project, including its goals, features, and target audience."
            placeholder="Describe your project..."
            rows={4}
            value=""
            onChange={() => {}}
          />
        </div>
      </section>

      <section className="component-section">
        <h2>Auto-Resize</h2>
        <div className="component-demo">
          <Textarea
            label="Auto-resizing textarea"
            description="This textarea automatically adjusts its height based on content."
            placeholder="Start typing and watch the textarea grow..."
            value={autoResizeValue}
            onChange={(e) => setAutoResizeValue(e.target.value)}
            autoResize
            minHeight={80}
            maxHeight={200}
          />
        </div>
      </section>

      <section className="component-section">
        <h2>Resize Options</h2>
        <div className="component-demo">
          <div className="demo-grid">
            <div>
              <Textarea
                label="No resize"
                placeholder="Cannot be resized..."
                resize="none"
                minHeight={100}
                value=""
                onChange={() => {}}
              />
            </div>
            <div>
              <Textarea
                label="Vertical resize"
                placeholder="Can be resized vertically..."
                resize="vertical"
                minHeight={100}
                value=""
                onChange={() => {}}
              />
            </div>
            <div>
              <Textarea
                label="Horizontal resize"
                placeholder="Can be resized horizontally..."
                resize="horizontal"
                minHeight={100}
                value=""
                onChange={() => {}}
              />
            </div>
            <div>
              <Textarea
                label="Both resize"
                placeholder="Can be resized in both directions..."
                resize="both"
                minHeight={100}
                value=""
                onChange={() => {}}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="component-section">
        <h2>Character Counting</h2>
        <div className="component-demo">
          <div className="demo-column">
            <Textarea
              label="Tweet"
              description="Share what's on your mind in 280 characters or less."
              placeholder="What's happening?"
              value={limitedValue}
              onChange={(e) => setLimitedValue(e.target.value)}
              maxLength={280}
              showCharacterCount
              minHeight={100}
            />
            
            <Textarea
              label="Bio (without label counter)"
              description="Character count appears in the bottom right corner."
              placeholder="Tell us about yourself..."
              value={bioValue}
              onChange={(e) => setBioValue(e.target.value)}
              maxLength={500}
              showCharacterCount
              minHeight={120}
            />
          </div>
        </div>
      </section>

      <section className="component-section">
        <h2>States</h2>
        <div className="component-demo">
          <div className="demo-column">
            <Textarea
              label="Default state"
              placeholder="Default textarea..."
              value=""
              onChange={() => {}}
              minHeight={80}
            />
            
            <Textarea
              label="With content"
              value="This textarea has some content in it already."
              onChange={() => {}}
              minHeight={80}
            />
            
            <Textarea
              label="Disabled"
              value="This textarea is disabled and cannot be edited."
              onChange={() => {}}
              disabled
              minHeight={80}
            />
            
            <Textarea
              label="Error state"
              placeholder="Enter your feedback..."
              value=""
              onChange={() => {}}
              error="This field is required. Please enter your feedback."
              minHeight={80}
            />
          </div>
        </div>
      </section>

      <section className="component-section">
        <h2>Height Controls</h2>
        <div className="component-demo">
          <div className="demo-column">
            <Textarea
              label="Fixed height (no auto-resize)"
              description="This textarea has a fixed height of 150px."
              placeholder="Fixed height textarea..."
              value=""
              onChange={() => {}}
              minHeight={150}
              resize="none"
            />
            
            <Textarea
              label="Auto-resize with limits"
              description="Auto-resizes between 60px and 300px height."
              placeholder="This will grow as you type, but won't exceed 300px..."
              value=""
              onChange={() => {}}
              autoResize
              minHeight={60}
              maxHeight={300}
            />
            
            <Textarea
              label="Large minimum height"
              description="Starts with a larger minimum height for longer content."
              placeholder="This textarea starts tall..."
              value=""
              onChange={() => {}}
              minHeight={200}
              resize="vertical"
            />
          </div>
        </div>
      </section>

      <section className="component-section">
        <h2>Complex Example</h2>
        <div className="component-demo">
          <Textarea
            label="Product feedback"
            description="Share your detailed feedback about our product. Your input helps us improve and build better features for everyone."
            placeholder="Tell us about your experience with our product. What did you like? What could be improved? Any specific features you'd like to see?"
            value=""
            onChange={() => {}}
            autoResize
            minHeight={120}
            maxHeight={400}
            maxLength={2000}
            showCharacterCount
            resize="none"
          />
        </div>
      </section>

      <section className="component-section">
        <h2>Code Example</h2>
        <div className="code-block">
          <pre>
            <code>{`import { Textarea } from '@/components/Textarea';

// Basic usage
<Textarea
  label="Message"
  placeholder="Enter your message..."
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>

// Auto-resize with limits
<Textarea
  label="Description"
  autoResize
  minHeight={80}
  maxHeight={300}
  value={description}
  onChange={(e) => setDescription(e.target.value)}
/>

// With character counting
<Textarea
  label="Tweet"
  maxLength={280}
  showCharacterCount
  value={tweet}
  onChange={(e) => setTweet(e.target.value)}
/>

// Custom resize behavior
<Textarea
  label="Notes"
  resize="vertical" // 'none' | 'vertical' | 'horizontal' | 'both'
  minHeight={150}
  value={notes}
  onChange={(e) => setNotes(e.target.value)}
/>

// With error state
<Textarea
  label="Required field"
  value={value}
  onChange={setValue}
  error="This field is required"
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

        .demo-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
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

          .demo-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}