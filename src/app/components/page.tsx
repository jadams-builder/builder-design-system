'use client';

import Link from 'next/link';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Card, CardTitle, CardContent } from '../../components/Card';

const components = [
  {
    name: 'Button',
    href: '/components/button',
    description: 'Trigger actions and events with multiple variants and sizes',
    status: 'ready',
    preview: (
      <div className="flex gap-2">
        <Button variant="primary" size="sm">Primary</Button>
        <Button variant="secondary" size="sm">Secondary</Button>
        <Button variant="ghost" size="sm">Ghost</Button>
      </div>
    )
  },
  {
    name: 'Input',
    href: '/components/input',
    description: 'Text input fields with validation states and focus handling',
    status: 'ready',
    preview: (
      <div style={{ maxWidth: '200px' }}>
        <Input size="sm" placeholder="Sample input" />
      </div>
    )
  },
  {
    name: 'Card',
    href: '/components/card',
    description: 'Flexible container component with consistent elevation and spacing',
    status: 'ready',
    preview: (
      <Card size="sm">
        <CardTitle style={{ fontSize: 'var(--font-sm)', marginBottom: 'var(--space-1)' }}>
          Sample Card
        </CardTitle>
        <CardContent style={{ fontSize: 'var(--font-xs)' }}>
          Card content here
        </CardContent>
      </Card>
    )
  },
  {
    name: 'Badge',
    href: '/components/badge',
    description: 'Status indicators and labels with semantic color meanings',
    status: 'coming-soon',
    preview: (
      <div className="flex gap-2">
        <span 
          className="px-2 py-1 rounded-full text-xs font-medium"
          style={{
            background: 'var(--bg-success-subtle)',
            color: 'var(--text-success)',
            borderRadius: 'var(--radius-full)'
          }}
        >
          Success
        </span>
        <span 
          className="px-2 py-1 rounded-full text-xs font-medium"
          style={{
            background: 'var(--bg-info-subtle)',
            color: 'var(--text-info)',
            borderRadius: 'var(--radius-full)'
          }}
        >
          Info
        </span>
      </div>
    )
  },
  {
    name: 'Modal',
    href: '/components/modal',
    description: 'Overlay dialog components with backdrop and focus management',
    status: 'coming-soon',
    preview: (
      <div 
        className="p-3 rounded border text-sm text-center"
        style={{
          background: 'var(--card-bg)',
          border: `var(--border-thin) solid var(--card-border)`,
          borderRadius: 'var(--card-border-radius)',
          color: 'var(--text-secondary)'
        }}
      >
        Modal preview
      </div>
    )
  },
  {
    name: 'Toast',
    href: '/components/toast',
    description: 'Temporary notification messages with different severity levels',
    status: 'coming-soon',
    preview: (
      <div 
        className="px-3 py-2 rounded border text-xs"
        style={{
          background: 'var(--bg-elevated)',
          border: `var(--border-thin) solid var(--border-primary)`,
          borderRadius: 'var(--radius-lg)',
          color: 'var(--text-primary)'
        }}
      >
        Toast notification
      </div>
    )
  }
];

export default function ComponentsPage() {
  return (
    <div className="max-w-6xl mx-auto px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          Components
        </h1>
        <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
          A comprehensive library of reusable UI components built with our design token system. 
          Each component is designed to be consistent, accessible, and perfect for AI-powered UI generation with Fusion.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {components.map((component) => (
          <div
            key={component.name}
            className="group"
          >
            {component.status === 'ready' ? (
              <Link href={component.href} className="block">
                <ComponentCard component={component} />
              </Link>
            ) : (
              <div className="cursor-not-allowed">
                <ComponentCard component={component} />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-16">
        <div 
          className="rounded-lg p-6 border"
          style={{
            background: 'var(--bg-info-subtle)',
            border: `var(--border-thin) solid var(--border-info)`,
            borderRadius: 'var(--card-border-radius)'
          }}
        >
          <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-info)' }}>
            Fusion Integration Ready
          </h3>
          <p style={{ color: 'var(--text-primary)' }}>
            All components in this library are designed specifically for AI-powered UI generation. 
            Each component follows consistent patterns, uses our design token system, and includes 
            comprehensive documentation to help Fusion understand how to use them effectively.
          </p>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
          Design Principles
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div 
            className="p-6 rounded-lg border"
            style={{
              background: 'var(--card-bg)',
              border: `var(--border-thin) solid var(--card-border)`,
              borderRadius: 'var(--card-border-radius)'
            }}
          >
            <h3 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-brand-primary)' }}>
              Token-Driven
            </h3>
            <p style={{ color: 'var(--text-secondary)' }}>
              Every component uses design tokens for colors, spacing, typography, and effects, 
              ensuring consistency across all interfaces.
            </p>
          </div>
          
          <div 
            className="p-6 rounded-lg border"
            style={{
              background: 'var(--card-bg)',
              border: `var(--border-thin) solid var(--card-border)`,
              borderRadius: 'var(--card-border-radius)'
            }}
          >
            <h3 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-brand-secondary)' }}>
              Accessible
            </h3>
            <p style={{ color: 'var(--text-secondary)' }}>
              Components follow ARIA guidelines and accessibility best practices, with proper 
              focus management and keyboard navigation.
            </p>
          </div>
          
          <div 
            className="p-6 rounded-lg border"
            style={{
              background: 'var(--card-bg)',
              border: `var(--border-thin) solid var(--card-border)`,
              borderRadius: 'var(--card-border-radius)'
            }}
          >
            <h3 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-success)' }}>
              Composable
            </h3>
            <p style={{ color: 'var(--text-secondary)' }}>
              Components are designed to work together seamlessly, allowing for complex 
              UI patterns while maintaining consistency.
            </p>
          </div>
          
          <div 
            className="p-6 rounded-lg border"
            style={{
              background: 'var(--card-bg)',
              border: `var(--border-thin) solid var(--card-border)`,
              borderRadius: 'var(--card-border-radius)'
            }}
          >
            <h3 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-warning)' }}>
              AI-Friendly
            </h3>
            <p style={{ color: 'var(--text-secondary)' }}>
              Clear prop interfaces, comprehensive documentation, and predictable behavior 
              make these components perfect for AI-powered generation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ComponentCard({ component }: { component: typeof components[0] }) {
  return (
    <div 
      className="p-6 rounded-lg border transition-all duration-200 h-full"
      style={{
        background: 'var(--card-bg)',
        border: `var(--border-thin) solid var(--card-border)`,
        borderRadius: 'var(--card-border-radius)',
        boxShadow: 'var(--card-shadow)',
        transition: 'var(--transition-base)'
      }}
      onMouseEnter={(e) => {
        if (component.status === 'ready') {
          e.currentTarget.style.background = 'var(--card-bg-hover)';
          e.currentTarget.style.borderColor = 'var(--card-border-hover)';
          e.currentTarget.style.boxShadow = 'var(--card-shadow-hover)';
        }
      }}
      onMouseLeave={(e) => {
        if (component.status === 'ready') {
          e.currentTarget.style.background = 'var(--card-bg)';
          e.currentTarget.style.borderColor = 'var(--card-border)';
          e.currentTarget.style.boxShadow = 'var(--card-shadow)';
        }
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
          {component.name}
        </h3>
        <span 
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            component.status === 'ready' ? '' : 'opacity-60'
          }`}
          style={{
            background: component.status === 'ready' ? 'var(--bg-success-subtle)' : 'var(--bg-secondary)',
            color: component.status === 'ready' ? 'var(--text-success)' : 'var(--text-tertiary)',
            borderRadius: 'var(--radius-full)'
          }}
        >
          {component.status === 'ready' ? 'Ready' : 'Coming Soon'}
        </span>
      </div>
      
      <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>
        {component.description}
      </p>
      
      <div className="mt-auto">
        <div className="p-4 rounded-lg border" style={{
          background: 'var(--bg-elevated)',
          border: `var(--border-thin) solid var(--border-secondary)`,
          borderRadius: 'var(--radius-md)'
        }}>
          {component.preview}
        </div>
      </div>
    </div>
  );
}