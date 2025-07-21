'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../../components/Card';
import { Button } from '../../../components/Button';

export default function CardPage() {
  return (
    <div className="max-w-6xl mx-auto px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          Card
        </h1>
        <p className="text-lg mb-6" style={{ color: 'var(--text-secondary)' }}>
          Cards are flexible containers that group related content and actions. 
          Our card system includes compound components for consistent layouts.
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
              <div><strong>variant:</strong> &apos;default&apos; | &apos;elevated&apos; | &apos;outlined&apos; (default: &apos;default&apos;)</div>
              <div><strong>size:</strong> &apos;sm&apos; | &apos;base&apos; | &apos;lg&apos; (default: &apos;base&apos;)</div>
              <div><strong>interactive:</strong> Makes card hoverable with transition effects</div>
            </div>
          </div>
        </div>
      </div>

      {/* Basic Card */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
          Basic Card
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
          <Card>
            <CardHeader>
              <CardTitle>Simple Card</CardTitle>
              <CardDescription>This is a basic card with default styling</CardDescription>
            </CardHeader>
            <CardContent>
              <p style={{ color: 'var(--text-secondary)' }}>
                Cards provide a flexible way to display content in a contained, 
                organized manner. They&apos;re perfect for grouping related information.
              </p>
            </CardContent>
          </Card>

          <Card interactive>
            <CardHeader>
              <CardTitle>Interactive Card</CardTitle>
              <CardDescription>This card has hover effects enabled</CardDescription>
            </CardHeader>
            <CardContent>
              <p style={{ color: 'var(--text-secondary)' }}>
                Interactive cards provide visual feedback when hovered, 
                perfect for clickable content or navigation elements.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Card Variants */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
          Variants
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card variant="default">
            <CardHeader>
              <CardTitle>Default</CardTitle>
              <CardDescription>Standard card with subtle shadow</CardDescription>
            </CardHeader>
            <CardContent>
              <p style={{ color: 'var(--text-secondary)' }}>
                The default variant uses a subtle background and shadow for depth.
              </p>
            </CardContent>
          </Card>

          <Card variant="elevated">
            <CardHeader>
              <CardTitle>Elevated</CardTitle>
              <CardDescription>Card with prominent shadow</CardDescription>
            </CardHeader>
            <CardContent>
              <p style={{ color: 'var(--text-secondary)' }}>
                Elevated cards have a stronger shadow for more visual prominence.
              </p>
            </CardContent>
          </Card>

          <Card variant="outlined">
            <CardHeader>
              <CardTitle>Outlined</CardTitle>
              <CardDescription>Minimal card with border only</CardDescription>
            </CardHeader>
            <CardContent>
              <p style={{ color: 'var(--text-secondary)' }}>
                Outlined cards use only a border with no background or shadow.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Card Sizes */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
          Sizes
        </h2>
        
        <div className="space-y-6">
          <Card size="sm">
            <CardHeader>
              <CardTitle>Small Card</CardTitle>
              <CardDescription>Compact spacing for dense layouts</CardDescription>
            </CardHeader>
            <CardContent>
              <p style={{ color: 'var(--text-secondary)' }}>
                Small cards use reduced padding for more compact displays.
              </p>
            </CardContent>
          </Card>

          <Card size="base">
            <CardHeader>
              <CardTitle>Base Card (Default)</CardTitle>
              <CardDescription>Standard spacing for most use cases</CardDescription>
            </CardHeader>
            <CardContent>
              <p style={{ color: 'var(--text-secondary)' }}>
                Base cards provide comfortable spacing for most content types.
              </p>
            </CardContent>
          </Card>

          <Card size="lg">
            <CardHeader>
              <CardTitle>Large Card</CardTitle>
              <CardDescription>Generous spacing for prominent content</CardDescription>
            </CardHeader>
            <CardContent>
              <p style={{ color: 'var(--text-secondary)' }}>
                Large cards offer extra breathing room for important or detailed content.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Card with Actions */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
          Card with Actions
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
          <Card>
            <CardHeader>
              <CardTitle>Project Alpha</CardTitle>
              <CardDescription>Design system implementation</CardDescription>
            </CardHeader>
            <CardContent>
              <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-4)' }}>
                A comprehensive design system built with React and TypeScript, 
                featuring a complete token system and component library.
              </p>
              <div style={{ color: 'var(--text-tertiary)', fontSize: 'var(--font-sm)' }}>
                Last updated: 2 hours ago
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="primary" size="sm">View Project</Button>
              <Button variant="ghost" size="sm">Edit</Button>
            </CardFooter>
          </Card>

          <Card interactive>
            <CardHeader>
              <CardTitle>Fusion Integration</CardTitle>
              <CardDescription>AI-powered UI generation</CardDescription>
            </CardHeader>
            <CardContent>
              <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-4)' }}>
                Integration with Fusion AI for automated component generation 
                based on our design system tokens and patterns.
              </p>
              <div 
                style={{ 
                  color: 'var(--text-success)', 
                  fontSize: 'var(--font-sm)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-2)'
                }}
              >
                <div 
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: 'var(--color-success)'
                  }}
                />
                Active
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="secondary" size="sm">Configure</Button>
              <Button variant="ghost" size="sm">Logs</Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* Complex Layout Example */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
          Complex Layout Example
        </h2>
        
        <Card variant="elevated" size="lg">
          <CardHeader>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
              <div>
                <CardTitle>Analytics Dashboard</CardTitle>
                <CardDescription>Real-time metrics and insights</CardDescription>
              </div>
              <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                <Button variant="ghost" size="sm">Export</Button>
                <Button variant="secondary" size="sm">Settings</Button>
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6" style={{ marginBottom: 'var(--space-6)' }}>
              <div>
                <div style={{ fontSize: 'var(--font-2xl)', fontWeight: 'var(--font-weight-bold)', color: 'var(--text-primary)' }}>
                  12.4k
                </div>
                <div style={{ fontSize: 'var(--font-sm)', color: 'var(--text-secondary)' }}>
                  Total Users
                </div>
                <div style={{ fontSize: 'var(--font-xs)', color: 'var(--text-success)' }}>
                  +12% from last month
                </div>
              </div>
              
              <div>
                <div style={{ fontSize: 'var(--font-2xl)', fontWeight: 'var(--font-weight-bold)', color: 'var(--text-primary)' }}>
                  98.2%
                </div>
                <div style={{ fontSize: 'var(--font-sm)', color: 'var(--text-secondary)' }}>
                  Uptime
                </div>
                <div style={{ fontSize: 'var(--font-xs)', color: 'var(--text-success)' }}>
                  Above target
                </div>
              </div>
              
              <div>
                <div style={{ fontSize: 'var(--font-2xl)', fontWeight: 'var(--font-weight-bold)', color: 'var(--text-primary)' }}>
                  156ms
                </div>
                <div style={{ fontSize: 'var(--font-sm)', color: 'var(--text-secondary)' }}>
                  Avg Response Time
                </div>
                <div style={{ fontSize: 'var(--font-xs)', color: 'var(--text-warning)' }}>
                  +5ms from yesterday
                </div>
              </div>
            </div>
            
            <div 
              style={{
                height: '200px',
                background: 'var(--bg-elevated)',
                borderRadius: 'var(--radius-lg)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: `var(--border-thin) solid var(--border-secondary)`
              }}
            >
              <div style={{ color: 'var(--text-tertiary)', fontSize: 'var(--font-sm)' }}>
                Chart visualization would go here
              </div>
            </div>
          </CardContent>
          
          <CardFooter>
            <Button variant="primary" size="base">View Full Report</Button>
            <div style={{ fontSize: 'var(--font-sm)', color: 'var(--text-tertiary)', marginLeft: 'auto' }}>
              Updated 5 minutes ago
            </div>
          </CardFooter>
        </Card>
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
            The Card component system uses these design tokens:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div>
              <h4 className="font-semibold mb-2" style={{ color: 'var(--text-brand-primary)' }}>Card Structure</h4>
              <ul className="space-y-1 font-mono" style={{ color: 'var(--text-secondary)' }}>
                <li>--card-bg / --card-bg-hover</li>
                <li>--card-border / --card-border-hover</li>
                <li>--card-border-radius</li>
                <li>--card-shadow / --card-shadow-hover</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2" style={{ color: 'var(--text-brand-primary)' }}>Spacing & Effects</h4>
              <ul className="space-y-1 font-mono" style={{ color: 'var(--text-secondary)' }}>
                <li>--card-padding-sm/base/lg</li>
                <li>--transition-base</li>
                <li>--space-* (for internal spacing)</li>
                <li>--shadow-lg (elevated variant)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}