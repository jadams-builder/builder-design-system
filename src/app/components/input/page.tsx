'use client';

import { Input } from '../../../components/Input';
import { useState } from 'react';

// Simple icon components for examples
function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="11" cy="11" r="8"/>
      <path d="m21 21-4.35-4.35"/>
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="20,6 9,17 4,12"/>
    </svg>
  );
}

export default function InputPage() {
  const [emailValue, setEmailValue] = useState('');
  const [searchValue, setSearchValue] = useState('');

  return (
    <div className="max-w-6xl mx-auto px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          Input
        </h1>
        <p className="text-lg mb-6" style={{ color: 'var(--text-secondary)' }}>
          Input components allow users to enter and edit text with support for validation states, 
          icons, and different sizes.
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
            <h4 className="font-semibold" style={{ color: 'var(--text-primary)' }}>Key Props</h4>
          </div>
          <div className="p-6">
            <div className="space-y-3 text-sm">
              <div><strong>label:</strong> Input label text</div>
              <div><strong>error:</strong> Error message (shows error state)</div>
              <div><strong>success:</strong> Success message (shows success state)</div>
              <div><strong>size:</strong> &apos;sm&apos; | &apos;base&apos; | &apos;lg&apos; (default: &apos;base&apos;)</div>
              <div><strong>leftIcon/rightIcon:</strong> Icons for visual context</div>
            </div>
          </div>
        </div>
      </div>

      {/* Basic Examples */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
          Basic Usage
        </h2>
        
        <div 
          className="p-6 rounded-lg border"
          style={{
            background: 'var(--card-bg)',
            border: `var(--border-thin) solid var(--card-border)`,
            borderRadius: 'var(--card-border-radius)'
          }}
        >
          <div className="space-y-6 max-w-md">
            <Input
              label="Email Address"
              placeholder="Enter your email"
              type="email"
            />
            
            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
            />
            
            <Input
              label="Username"
              placeholder="Choose a username"
              helperText="Must be at least 3 characters long"
            />
          </div>
        </div>
      </section>

      {/* Sizes */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
          Sizes
        </h2>
        
        <div 
          className="p-6 rounded-lg border"
          style={{
            background: 'var(--card-bg)',
            border: `var(--border-thin) solid var(--card-border)`,
            borderRadius: 'var(--card-border-radius)'
          }}
        >
          <div className="space-y-4 max-w-md">
            <Input size="sm" label="Small" placeholder="Small input" />
            <Input size="base" label="Base (Default)" placeholder="Base input" />
            <Input size="lg" label="Large" placeholder="Large input" />
          </div>
        </div>
      </section>

      {/* States */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
          States
        </h2>
        
        <div 
          className="p-6 rounded-lg border"
          style={{
            background: 'var(--card-bg)',
            border: `var(--border-thin) solid var(--card-border)`,
            borderRadius: 'var(--card-border-radius)'
          }}
        >
          <div className="space-y-4 max-w-md">
            <Input
              label="Error State"
              value="invalid@email"
              error="Please enter a valid email address"
              readOnly
            />
            
            <Input
              label="Success State"
              value="valid@example.com"
              success="Email format is valid!"
              readOnly
            />
            
            <Input
              label="Disabled State"
              value="Cannot edit this field"
              disabled
            />
          </div>
        </div>
      </section>

      {/* With Icons */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
          With Icons
        </h2>
        
        <div 
          className="p-6 rounded-lg border"
          style={{
            background: 'var(--card-bg)',
            border: `var(--border-thin) solid var(--card-border)`,
            borderRadius: 'var(--card-border-radius)'
          }}
        >
          <div className="space-y-4 max-w-md">
            <Input
              label="Search"
              placeholder="Search for anything..."
              leftIcon={<SearchIcon />}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            
            <Input
              label="Verified Email"
              value="john@example.com"
              success="Email verified successfully!"
              rightIcon={<CheckIcon />}
              readOnly
            />
          </div>
        </div>
      </section>

      {/* Interactive Demo */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
          Interactive Demo
        </h2>
        
        <div 
          className="p-6 rounded-lg border"
          style={{
            background: 'var(--card-bg)',
            border: `var(--border-thin) solid var(--card-border)`,
            borderRadius: 'var(--card-border-radius)'
          }}
        >
          <div className="max-w-md">
            <Input
              label="Email Validation Demo"
              type="email"
              value={emailValue}
              onChange={(e) => setEmailValue(e.target.value)}
              placeholder="Type an email to see validation"
              error={emailValue && !emailValue.includes('@') ? 'Please enter a valid email' : undefined}
              success={emailValue && emailValue.includes('@') && emailValue.includes('.') ? 'Valid email format' : undefined}
              helperText={!emailValue ? 'Start typing to see real-time validation' : undefined}
            />
          </div>
        </div>
      </section>

      {/* Design Tokens */}
      <section>
        <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
          Design Token Usage
        </h2>
        
        <div 
          className="p-6 rounded-lg border"
          style={{
            background: 'var(--card-bg)',
            border: `var(--border-thin) solid var(--card-border)`,
            borderRadius: 'var(--card-border-radius)'
          }}
        >
          <p className="mb-4" style={{ color: 'var(--text-primary)' }}>
            The Input component uses design tokens for consistent styling:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div>
              <h4 className="font-semibold mb-2" style={{ color: 'var(--text-brand-primary)' }}>Colors & States</h4>
              <ul className="space-y-1 font-mono" style={{ color: 'var(--text-secondary)' }}>
                <li>--input-bg / --input-bg-focus</li>
                <li>--input-border / --input-border-focus</li>
                <li>--input-border-error</li>
                <li>--border-success</li>
                <li>--text-error / --text-success</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2" style={{ color: 'var(--text-brand-primary)' }}>Spacing & Effects</h4>
              <ul className="space-y-1 font-mono" style={{ color: 'var(--text-secondary)' }}>
                <li>--input-padding-y / --input-padding-x</li>
                <li>--input-border-radius</li>
                <li>--focus-ring</li>
                <li>--transition-fast</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}