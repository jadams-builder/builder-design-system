export default function Home() {
  return (
    <div className="min-h-screen" style={{ color: 'var(--text-primary)' }}>
      <div className="max-w-6xl mx-auto px-8 py-12">
        <div className="text-center mb-16">
          <h1 
            className="text-6xl font-bold mb-6"
            style={{ 
              background: 'var(--bg-brand-gradient)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            Builder.io Design System
          </h1>
          <p 
            className="text-xl mb-8 max-w-2xl mx-auto"
            style={{ color: 'var(--text-secondary)' }}
          >
            A comprehensive design system with tokens, components, and patterns built for modern web applications.
            Perfect for Fusion&apos;s AI-powered UI generation.
          </p>
          
          <div className="flex gap-4 justify-center">
            <a
              href="/tokens/colors"
              style={{
                background: 'var(--button-primary-bg)',
                color: 'var(--button-primary-text)',
                borderRadius: 'var(--button-base-border-radius)',
                padding: 'var(--button-base-padding-y) var(--button-base-padding-x)',
                fontSize: 'var(--button-base-font-size)',
                border: `var(--border-thin) solid var(--button-primary-border)`,
                transition: 'var(--transition-fast)'
              }}
              className="inline-block text-decoration-none font-medium hover:opacity-90"
            >
              Explore Tokens
            </a>
            
            <a
              href="/components"
              style={{
                background: 'var(--button-secondary-bg)',
                color: 'var(--button-secondary-text)',
                borderRadius: 'var(--button-base-border-radius)',
                padding: 'var(--button-base-padding-y) var(--button-base-padding-x)',
                fontSize: 'var(--button-base-font-size)',
                border: `var(--border-thin) solid var(--button-secondary-border)`,
                transition: 'var(--transition-fast)'
              }}
              className="inline-block text-decoration-none font-medium hover:opacity-90"
            >
              View Components
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div 
            style={{
              background: 'var(--card-bg)',
              border: `var(--border-thin) solid var(--card-border)`,
              borderRadius: 'var(--card-border-radius)',
              padding: 'var(--card-padding)',
              boxShadow: 'var(--card-shadow)',
              transition: 'var(--transition-base)'
            }}
            className="hover:shadow-md"
          >
            <h3 className="text-2xl font-semibold mb-4" style={{ color: 'var(--text-brand-primary)' }}>
              Design Tokens
            </h3>
            <p style={{ color: 'var(--text-secondary)' }}>
              Comprehensive color palettes, typography scales, spacing systems, and semantic tokens
              for consistent design across all interfaces.
            </p>
          </div>
          
          <div 
            style={{
              background: 'var(--card-bg)',
              border: `var(--border-thin) solid var(--card-border)`,
              borderRadius: 'var(--card-border-radius)',
              padding: 'var(--card-padding)',
              boxShadow: 'var(--card-shadow)',
              transition: 'var(--transition-base)'
            }}
            className="hover:shadow-md"
          >
            <h3 className="text-2xl font-semibold mb-4" style={{ color: 'var(--text-brand-secondary)' }}>
              Atomic Components
            </h3>
            <p style={{ color: 'var(--text-secondary)' }}>
              Foundational UI components like buttons, inputs, cards, and typography that form
              the building blocks of complex interfaces.
            </p>
          </div>
          
          <div 
            style={{
              background: 'var(--card-bg)',
              border: `var(--border-thin) solid var(--card-border)`,
              borderRadius: 'var(--card-border-radius)',
              padding: 'var(--card-padding)',
              boxShadow: 'var(--card-shadow)',
              transition: 'var(--transition-base)'
            }}
            className="hover:shadow-md"
          >
            <h3 className="text-2xl font-semibold mb-4" style={{ color: 'var(--text-success)' }}>
              Fusion Ready
            </h3>
            <p style={{ color: 'var(--text-secondary)' }}>
              Designed specifically for AI-powered UI generation. Every component is documented
              and structured for seamless integration with Fusion.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
