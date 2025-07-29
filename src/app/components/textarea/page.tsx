'use client';

import React, { useState } from 'react';
import { Textarea } from '@/components/Textarea';

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

export default function TextareaPage() {
  const [basicValue, setBasicValue] = useState('');
  const [autoResizeValue, setAutoResizeValue] = useState('This textarea will automatically resize as you type more content. Try adding multiple lines of text to see how it expands vertically while maintaining a good reading experience.');
  const [limitedValue, setLimitedValue] = useState('');
  const [bioValue, setBioValue] = useState('Software engineer with a passion for creating beautiful and functional user interfaces. I love working with React, TypeScript, and modern web technologies.');

  return (
    <div className="max-w-6xl mx-auto px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          Textarea
        </h1>
        <p className="text-lg mb-6" style={{ color: 'var(--text-secondary)' }}>
          Multi-line text input component with auto-resize functionality, 
          character counting, and comprehensive resize controls.
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
                <div style={{ color: 'var(--text-secondary)' }}>Textarea label text</div>
              </div>
              <div className="grid grid-cols-4 gap-4 text-sm">
                <div className="font-mono" style={{ color: 'var(--text-secondary)' }}>autoResize</div>
                <div style={{ color: 'var(--text-secondary)' }}>boolean</div>
                <div style={{ color: 'var(--text-secondary)' }}>false</div>
                <div style={{ color: 'var(--text-secondary)' }}>Auto-resize height based on content</div>
              </div>
              <div className="grid grid-cols-4 gap-4 text-sm">
                <div className="font-mono" style={{ color: 'var(--text-secondary)' }}>resize</div>
                <div style={{ color: 'var(--text-secondary)' }}>&apos;none&apos; | &apos;vertical&apos; | &apos;horizontal&apos; | &apos;both&apos;</div>
                <div style={{ color: 'var(--text-secondary)' }}>&apos;vertical&apos;</div>
                <div style={{ color: 'var(--text-secondary)' }}>Manual resize options</div>
              </div>
              <div className="grid grid-cols-4 gap-4 text-sm">
                <div className="font-mono" style={{ color: 'var(--text-secondary)' }}>showCharacterCount</div>
                <div style={{ color: 'var(--text-secondary)' }}>boolean</div>
                <div style={{ color: 'var(--text-secondary)' }}>false</div>
                <div style={{ color: 'var(--text-secondary)' }}>Show character count</div>
              </div>
              <div className="grid grid-cols-4 gap-4 text-sm">
                <div className="font-mono" style={{ color: 'var(--text-secondary)' }}>maxLength</div>
                <div style={{ color: 'var(--text-secondary)' }}>number</div>
                <div style={{ color: 'var(--text-secondary)' }}>-</div>
                <div style={{ color: 'var(--text-secondary)' }}>Maximum character limit</div>
              </div>
              <div className="grid grid-cols-4 gap-4 text-sm">
                <div className="font-mono" style={{ color: 'var(--text-secondary)' }}>minHeight</div>
                <div style={{ color: 'var(--text-secondary)' }}>number</div>
                <div style={{ color: 'var(--text-secondary)' }}>-</div>
                <div style={{ color: 'var(--text-secondary)' }}>Minimum height in pixels</div>
              </div>
              <div className="grid grid-cols-4 gap-4 text-sm">
                <div className="font-mono" style={{ color: 'var(--text-secondary)' }}>maxHeight</div>
                <div style={{ color: 'var(--text-secondary)' }}>number</div>
                <div style={{ color: 'var(--text-secondary)' }}>-</div>
                <div style={{ color: 'var(--text-secondary)' }}>Maximum height in pixels</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Section title="Basic Usage">
        <Example
          title="Simple Textarea"
          description="A basic multi-line text input with a label. The textarea can be resized vertically by default."
          code={`<Textarea
  label="Message"
  placeholder="Enter your message here..."
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>`}
        >
          <Textarea
            label="Message"
            placeholder="Enter your message here..."
            value={basicValue}
            onChange={(e) => setBasicValue(e.target.value)}
          />
        </Example>
      </Section>

      <Section title="Auto-Resize">
        <Example
          title="Auto-Resizing Textarea"
          description="Automatically adjusts height based on content. You can set minimum and maximum heights to control the resize behavior."
          code={`<Textarea
  label="Auto-resizing textarea"
  description="This textarea automatically adjusts its height based on content."
  placeholder="Start typing and watch the textarea grow..."
  value={value}
  onChange={(e) => setValue(e.target.value)}
  autoResize
  minHeight={80}
  maxHeight={200}
/>`}
        >
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
        </Example>
      </Section>

      <Section title="Resize Options">
        <Example
          title="Manual Resize Controls"
          description="Control how users can manually resize the textarea using the resize prop."
          code={`<Textarea label="No resize" resize="none" />
<Textarea label="Vertical resize" resize="vertical" />
<Textarea label="Horizontal resize" resize="horizontal" />
<Textarea label="Both resize" resize="both" />`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Textarea
              label="No resize"
              placeholder="Cannot be resized..."
              resize="none"
              minHeight={100}
              value=""
              onChange={() => {}}
            />
            <Textarea
              label="Vertical resize"
              placeholder="Can be resized vertically..."
              resize="vertical"
              minHeight={100}
              value=""
              onChange={() => {}}
            />
            <Textarea
              label="Horizontal resize"
              placeholder="Can be resized horizontally..."
              resize="horizontal"
              minHeight={100}
              value=""
              onChange={() => {}}
            />
            <Textarea
              label="Both resize"
              placeholder="Can be resized in both directions..."
              resize="both"
              minHeight={100}
              value=""
              onChange={() => {}}
            />
          </div>
        </Example>
      </Section>

      <Section title="Character Counting">
        <Example
          title="Character Limits and Counting"
          description="Display character count and enforce limits with visual feedback as users approach the limit."
          code={`<Textarea
  label="Tweet"
  description="Share what's on your mind in 280 characters or less."
  placeholder="What's happening?"
  value={value}
  onChange={(e) => setValue(e.target.value)}
  maxLength={280}
  showCharacterCount
  minHeight={100}
/>`}
        >
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
            label="Bio"
            description="Character count appears in the bottom right corner."
            placeholder="Tell us about yourself..."
            value={bioValue}
            onChange={(e) => setBioValue(e.target.value)}
            maxLength={500}
            showCharacterCount
            minHeight={120}
          />
        </Example>
      </Section>

      <Section title="States">
        <Example
          title="Textarea States"
          description="Different states including default, with content, disabled, and error states."
          code={`<Textarea label="Default state" placeholder="Default textarea..." />
<Textarea label="With content" value="This textarea has content..." />
<Textarea label="Disabled" value="Disabled textarea..." disabled />
<Textarea label="Error state" error="This field is required." />`}
        >
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
        </Example>
      </Section>

      <Section title="Complex Example">
        <Example
          title="Product Feedback Form"
          description="A comprehensive example combining auto-resize, character counting, and height limits for a feedback form."
          code={`<Textarea
  label="Product feedback"
  description="Share your detailed feedback about our product."
  placeholder="Tell us about your experience..."
  value={value}
  onChange={(e) => setValue(e.target.value)}
  autoResize
  minHeight={120}
  maxHeight={400}
  maxLength={2000}
  showCharacterCount
  resize="none"
/>`}
        >
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
            The Textarea component uses the following design tokens:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-semibold mb-2" style={{ color: 'var(--text-brand-primary)' }}>Colors</h4>
              <ul className="space-y-1 font-mono" style={{ color: 'var(--text-secondary)' }}>
                <li>--input-bg (background)</li>
                <li>--input-border (border)</li>
                <li>--border-focus (focus)</li>
                <li>--text-primary (text)</li>
                <li>--text-error (error state)</li>
                <li>--text-tertiary (character count)</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2" style={{ color: 'var(--text-brand-primary)' }}>Spacing & Sizing</h4>
              <ul className="space-y-1 font-mono" style={{ color: 'var(--text-secondary)' }}>
                <li>--input-padding-y/x</li>
                <li>--space-1_5, --space-2, --space-3</li>
                <li>--input-border-radius</li>
                <li>--line-height-relaxed</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2" style={{ color: 'var(--text-brand-primary)' }}>Typography</h4>
              <ul className="space-y-1 font-mono" style={{ color: 'var(--text-secondary)' }}>
                <li>--font-primary</li>
                <li>--font-base (textarea text)</li>
                <li>--font-sm (description, count)</li>
                <li>--font-weight-medium</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2" style={{ color: 'var(--text-brand-primary)' }}>Effects</h4>
              <ul className="space-y-1 font-mono" style={{ color: 'var(--text-secondary)' }}>
                <li>--transition-fast</li>
                <li>--focus-ring</li>
                <li>CSS resize property</li>
                <li>Auto-height calculation</li>
              </ul>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}