# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Context

This design system is actively developed with a focus on dark theme aesthetics and Builder.io branding. When working with colors, ensure shadows use white/light colors (`rgba(255, 255, 255, ...)`) rather than black for proper visibility against dark backgrounds. The system uses Poppins as the primary font family throughout. Always prioritize component functionality and visual polish - fix rendering issues immediately when they arise, such as color swatches not displaying properly or syntax errors in JSX code examples.

## Project Overview

This is a Next.js 15-based design system documentation site for Builder.io, built with TypeScript, React 19, and Tailwind CSS. The project serves as both a design system reference and a component library showcase.

## Development Commands

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the application for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint for code quality checks

## Architecture

### Design System Structure

The project follows a token-first design approach with a comprehensive design token system defined in `src/builderio-design-tokens.css`. This file contains:

- **Color System**: Semantic colors, primitives, and theme-aware tokens
- **Typography**: Font families, sizes, weights, and spacing
- **Layout Tokens**: Spacing scale, container widths, breakpoints
- **Component Tokens**: Button, card, input, and other component-specific styling
- **Interactive States**: Focus rings, hover states, transitions

### Component Architecture

Components are built with a consistent pattern:

1. **Type-safe Props**: All components use TypeScript interfaces extending native HTML element props
2. **CSS Custom Properties**: Components use design tokens from `builderio-design-tokens.css` via CSS custom properties
3. **Size Variants**: Components support `sm`, `base`, and `lg` sizes using token-based sizing
4. **State Management**: Interactive states (hover, focus, disabled) are handled with React state and CSS custom properties
5. **Compound Components**: Complex components like Card provide sub-components (CardHeader, CardTitle, etc.)

### Key Components

- **Button** (`src/components/Button.tsx`): Supports primary, secondary, and ghost variants with full keyboard accessibility
- **Card** (`src/components/Card.tsx`): Flexible container with compound pattern for headers, content, and footers
- **Input** (`src/components/Input.tsx`): Form input with label, validation states, and icon support
- **Layout** (`src/components/Layout.tsx`): Main layout wrapper with responsive navigation
- **Navigation** (`src/components/Navigation.tsx`): Responsive navigation with mobile menu support

### File Structure

- `/src/app/` - Next.js App Router pages and layouts
- `/src/components/` - Reusable UI components
- `/src/builderio-design-tokens.css` - Complete design token system
- `/src/app/globals.css` - Global styles and Tailwind imports

### Design Token Usage

Always use CSS custom properties from the design token system:

```tsx
// ✅ Correct - Use design tokens
style={{
  background: 'var(--button-primary-bg)',
  color: 'var(--text-primary)',
  padding: 'var(--space-4)',
  borderRadius: 'var(--radius-lg)'
}}

// ❌ Avoid - Hardcoded values
style={{
  background: '#7C3AED',
  color: '#FFFFFF',
  padding: '16px',
  borderRadius: '8px'
}}
```

### Icon Usage

Always use Tabler Icons for consistent iconography:

```tsx
// ✅ Correct - Import from @tabler/icons-react
import { IconCheck, IconX, IconChevronDown } from '@tabler/icons-react';

// Use with proper sizing from design tokens
<IconCheck 
  size="var(--icon-sm)" 
  style={{ color: 'var(--text-success)' }} 
/>

// ❌ Avoid - Other icon libraries or inline SVGs
import { Check } from 'lucide-react';
// or hardcoded SVG elements
```

### Component Development Patterns

1. **Extend Native Props**: Components should extend appropriate HTML element interfaces
2. **Default Props**: Provide sensible defaults for variant and size props
3. **State-driven Styling**: Use React state to drive style changes (hover, focus, etc.)
4. **Accessibility**: Include proper ARIA attributes, focus management, and semantic HTML
5. **Token Consistency**: Always reference design tokens rather than hardcoded values
6. **Tabler Icons Only**: Use `@tabler/icons-react` exclusively for all iconography needs

### Responsive Design

The project uses a mobile-first approach with:
- Responsive navigation (mobile hamburger menu, desktop sidebar)
- Tailwind CSS utilities for responsive behavior
- Design token breakpoints for custom responsive components

## Component Documentation Pages

Each component has a dedicated documentation page under `/src/app/components/[component]/page.tsx` that demonstrates:
- Component variants and sizes
- Interactive examples
- Accessibility features
- Usage guidelines

### Documentation Page Template

All component documentation pages must follow this standardized structure based on the Button component template:

```tsx
'use client';

import React, { useState } from 'react';
import { ComponentName } from '@/components/ComponentName';

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

export default function ComponentNamePage() {
  // Component state management here
  
  return (
    <div className="max-w-6xl mx-auto px-8 py-12">
      {/* Header with title, description, and props table */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          Component Name
        </h1>
        <p className="text-lg mb-6" style={{ color: 'var(--text-secondary)' }}>
          Brief description of the component and its main features.
        </p>
        
        {/* Props table - REQUIRED */}
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
            {/* Props table content */}
          </div>
        </div>
      </div>

      {/* Component examples using Section and Example components */}
      <Section title="Basic Usage">
        <Example
          title="Example Title"
          description="Description of what this example demonstrates."
          code={`<ComponentName 
  prop="value"
  onChange={handler}
/>`}
        >
          {/* Interactive component example */}
        </Example>
      </Section>

      {/* Additional sections for variants, states, etc. */}

      {/* Design Token Usage section - REQUIRED */}
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
            The ComponentName component uses the following design tokens:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            {/* Design token categories */}
          </div>
        </div>
      </Section>
    </div>
  );
}
```

### Documentation Standards

**REQUIRED Elements for Every Component Page:**

1. **Header Section**: Title, description, and comprehensive props table
2. **Basic Usage Section**: Simple example showing primary use case
3. **Design Token Usage Section**: Detailed list of tokens used by the component
4. **Interactive Examples**: All major variants, sizes, and states demonstrated
5. **Copy-to-Clipboard**: All code examples must be copyable via CodeBlock component

**Section Organization Pattern:**
- Basic Usage
- Variants (if applicable)
- Sizes (if applicable) 
- States (disabled, error, etc.)
- Advanced Examples
- Design Token Usage (always last)

**Code Example Standards:**
- Show realistic, practical usage patterns
- Include proper TypeScript types
- Demonstrate accessibility features
- Use design tokens in examples
- Keep examples concise but complete

**Visual Standards:**
- Use consistent spacing and typography via design tokens
- Ensure proper contrast in dark theme
- Test all interactive elements
- Verify responsive behavior on mobile devices

**Accessibility Standards:**
- Document keyboard navigation patterns
- Show ARIA usage examples
- Demonstrate focus management
- Include screen reader considerations

## Component Development Workflow

**ESSENTIAL**: Follow this complete workflow when implementing new components to ensure they appear in the UI:

### 1. Component Implementation
- Create `/src/components/ComponentName.tsx` with:
  - TypeScript interfaces extending native HTML elements
  - All variants, sizes, and states (sm/base/lg)
  - Design token integration via CSS custom properties
  - Tabler Icons for any iconography needs
  - Proper accessibility (ARIA, keyboard navigation)

### 2. Documentation Page
- Create `/src/app/components/componentname/page.tsx` with:
  - Interactive examples of all variants and states
  - Code examples showing usage patterns
  - Comprehensive demonstrations of features
  - Follow existing documentation page patterns

### 3. Navigation Integration
- Update `/src/components/Navigation.tsx`:
  - Add component to appropriate subgroup in `navigationItems`
  - Use lowercase URL path: `/components/componentname`
  - Maintain alphabetical order within subgroups
  - Create new subgroups as needed for organization

### 4. Dependencies
- Install required packages (e.g., `npm install @tabler/icons-react`)
- Ensure all imports resolve correctly

### 5. Testing & Validation
- Run `npm run lint` to check for code quality issues
- Test component functionality and navigation links
- Verify responsive behavior and accessibility

**Without following all steps, components won't appear in the UI navigation!**

## Todo List Management

**IMPORTANT**: After completing any component group, always update `/tasks/todo.md` to reflect the current progress:

1. **Mark completed components** with `[x]` checkboxes
2. **Update group status** by adding "✅ COMPLETED" to the group header when all components in that group are finished
3. **Maintain accuracy** - the todo list should always reflect the true state of component implementation
4. **Include component details** - ensure each completed component entry includes its key features and capabilities

This ensures the roadmap stays current and stakeholders can easily track progress across the design system development.