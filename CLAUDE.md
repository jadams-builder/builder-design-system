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

## Todo List Management

**IMPORTANT**: After completing any component group, always update `/tasks/todo.md` to reflect the current progress:

1. **Mark completed components** with `[x]` checkboxes
2. **Update group status** by adding "✅ COMPLETED" to the group header when all components in that group are finished
3. **Maintain accuracy** - the todo list should always reflect the true state of component implementation
4. **Include component details** - ensure each completed component entry includes its key features and capabilities

This ensures the roadmap stays current and stakeholders can easily track progress across the design system development.