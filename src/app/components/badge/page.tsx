'use client';

import { useState } from 'react';
import { Badge, BadgeWithIcon, NotificationBadge, DotBadge } from '../../../components/Badge';

export default function BadgePage() {
  const [notificationCount, setNotificationCount] = useState(5);

  return (
    <div className="max-w-6xl mx-auto px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          Badge
        </h1>
        <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
          Badges are used to display labels, status indicators, counts, and other small bits of information.
          They can be used standalone or attached to other components.
        </p>
      </div>

      {/* Basic Usage */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
          Basic Usage
        </h2>
        
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
            Variants
          </h3>
          <div className="flex flex-wrap items-center gap-4 p-6 rounded-lg" style={{ background: 'var(--bg-elevated)' }}>
            <Badge variant="default">Default</Badge>
            <Badge variant="primary">Primary</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="error">Error</Badge>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
            Sizes
          </h3>
          <div className="flex flex-wrap items-center gap-4 p-6 rounded-lg" style={{ background: 'var(--bg-elevated)' }}>
            <Badge size="sm" variant="primary">Small</Badge>
            <Badge size="base" variant="primary">Base</Badge>
            <Badge size="lg" variant="primary">Large</Badge>
          </div>
        </div>
      </section>

      {/* Badge with Icons */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
          Badge with Icons
        </h2>
        
        <div className="flex flex-wrap items-center gap-4 p-6 rounded-lg mb-6" style={{ background: 'var(--bg-elevated)' }}>
          <BadgeWithIcon 
            variant="success" 
            icon={
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            }
          >
            Completed
          </BadgeWithIcon>
          
          <BadgeWithIcon 
            variant="warning"
            icon={
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 9v4M12 17h.01" />
                <circle cx="12" cy="12" r="10" />
              </svg>
            }
          >
            Warning
          </BadgeWithIcon>
          
          <BadgeWithIcon 
            variant="error"
            iconPosition="right"
            icon={
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            }
          >
            Failed
          </BadgeWithIcon>
        </div>
      </section>

      {/* Notification Badges */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
          Notification Badges
        </h2>
        
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-6 p-6 rounded-lg" style={{ background: 'var(--bg-elevated)' }}>
            <div className="relative">
              <div 
                className="p-3 rounded-lg"
                style={{ 
                  background: 'var(--bg-interactive)',
                  color: 'var(--text-primary)'
                }}
              >
                Messages
              </div>
              <div className="absolute -top-2 -right-2">
                <NotificationBadge count={notificationCount} />
              </div>
            </div>

            <div className="relative">
              <div 
                className="p-3 rounded-lg"
                style={{ 
                  background: 'var(--bg-interactive)',
                  color: 'var(--text-primary)'
                }}
              >
                Notifications
              </div>
              <div className="absolute -top-2 -right-2">
                <NotificationBadge count={150} max={99} />
              </div>
            </div>

            <div className="relative">
              <div 
                className="p-3 rounded-lg"
                style={{ 
                  background: 'var(--bg-interactive)',
                  color: 'var(--text-primary)'
                }}
              >
                Updates
              </div>
              <div className="absolute -top-2 -right-2">
                <NotificationBadge count={0} showZero />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setNotificationCount(prev => Math.max(0, prev - 1))}
              className="px-3 py-1 rounded text-sm"
              style={{
                background: 'var(--button-secondary-bg)',
                color: 'var(--button-secondary-text)',
                border: `var(--border-thin) solid var(--button-secondary-border)`,
                borderRadius: 'var(--radius-md)',
                transition: 'var(--transition-fast)',
              }}
            >
              Decrease
            </button>
            <button
              onClick={() => setNotificationCount(prev => prev + 1)}
              className="px-3 py-1 rounded text-sm"
              style={{
                background: 'var(--button-primary-bg)',
                color: 'var(--button-primary-text)',
                border: `var(--border-thin) solid var(--button-primary-border)`,
                borderRadius: 'var(--radius-md)',
                transition: 'var(--transition-fast)',
              }}
            >
              Increase
            </button>
            <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              Current count: {notificationCount}
            </span>
          </div>
        </div>
      </section>

      {/* Dot Badges */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
          Dot Badges
        </h2>
        
        <div className="flex flex-wrap items-center gap-6 p-6 rounded-lg" style={{ background: 'var(--bg-elevated)' }}>
          <div className="flex items-center gap-2">
            <DotBadge variant="success" />
            <span style={{ color: 'var(--text-primary)' }}>Online</span>
          </div>
          
          <div className="flex items-center gap-2">
            <DotBadge variant="warning" />
            <span style={{ color: 'var(--text-primary)' }}>Away</span>
          </div>
          
          <div className="flex items-center gap-2">
            <DotBadge variant="error" />
            <span style={{ color: 'var(--text-primary)' }}>Offline</span>
          </div>
          
          <div className="flex items-center gap-2">
            <DotBadge variant="default" size="sm" />
            <span style={{ color: 'var(--text-primary)' }}>Unknown</span>
          </div>
        </div>
      </section>

      {/* Usage in Lists */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
          Usage Examples
        </h2>
        
        <div className="space-y-4">
          <div 
            className="p-4 rounded-lg border"
            style={{
              background: 'var(--card-bg)',
              border: `var(--border-thin) solid var(--card-border)`,
              borderRadius: 'var(--radius-lg)',
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                  Feature Request
                </h3>
                <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
                  Add dark mode support to the dashboard
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="primary" size="sm">Feature</Badge>
                <Badge variant="success" size="sm">Ready</Badge>
              </div>
            </div>
          </div>

          <div 
            className="p-4 rounded-lg border"
            style={{
              background: 'var(--card-bg)',
              border: `var(--border-thin) solid var(--card-border)`,
              borderRadius: 'var(--radius-lg)',
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                  Bug Report
                </h3>
                <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
                  Login form validation not working properly
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="error" size="sm">Bug</Badge>
                <Badge variant="warning" size="sm">High Priority</Badge>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Code Example */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
          Code Examples
        </h2>
        
        <div 
          className="p-6 rounded-lg font-mono text-sm overflow-x-auto"
          style={{
            background: 'var(--code-bg)',
            color: 'var(--code-text)',
            borderRadius: 'var(--radius-xl)'
          }}
        >
          <div style={{ color: 'var(--code-comment)' }}>{/* Basic Badge */}</div>
          <div>
            <span style={{ color: 'var(--code-punctuation)' }}>&lt;</span>
            <span style={{ color: 'var(--code-tag)' }}>Badge</span>
            <span style={{ color: 'var(--code-attribute)' }}> variant</span>
            <span style={{ color: 'var(--code-punctuation)' }}>="</span>
            <span style={{ color: 'var(--code-string)' }}>primary</span>
            <span style={{ color: 'var(--code-punctuation)' }}>"&gt;</span>
            <span style={{ color: 'var(--code-text)' }}>New</span>
            <span style={{ color: 'var(--code-punctuation)' }}>&lt;/</span>
            <span style={{ color: 'var(--code-tag)' }}>Badge</span>
            <span style={{ color: 'var(--code-punctuation)' }}>&gt;</span>
          </div>
          <br />
          <div style={{ color: 'var(--code-comment)' }}>{/* Notification Badge */}</div>
          <div>
            <span style={{ color: 'var(--code-punctuation)' }}>&lt;</span>
            <span style={{ color: 'var(--code-tag)' }}>NotificationBadge</span>
            <span style={{ color: 'var(--code-attribute)' }}> count</span>
            <span style={{ color: 'var(--code-punctuation)' }}>={'{'}</span>
            <span style={{ color: 'var(--code-number)' }}>5</span>
            <span style={{ color: 'var(--code-punctuation)' }}>{'}'} /&gt;</span>
          </div>
          <br />
          <div style={{ color: 'var(--code-comment)' }}>{/* Badge with Icon */}</div>
          <div>
            <span style={{ color: 'var(--code-punctuation)' }}>&lt;</span>
            <span style={{ color: 'var(--code-tag)' }}>BadgeWithIcon</span>
            <span style={{ color: 'var(--code-attribute)' }}> variant</span>
            <span style={{ color: 'var(--code-punctuation)' }}>="</span>
            <span style={{ color: 'var(--code-string)' }}>success</span>
            <span style={{ color: 'var(--code-punctuation)' }}>" icon</span>
            <span style={{ color: 'var(--code-punctuation)' }}>={'{'}</span>
            <span style={{ color: 'var(--code-variable)' }}>checkIcon</span>
            <span style={{ color: 'var(--code-punctuation)' }}>{'}'}&gt;</span>
          </div>
          <div style={{ paddingLeft: '1rem' }}>
            <span style={{ color: 'var(--code-text)' }}>Completed</span>
          </div>
          <div>
            <span style={{ color: 'var(--code-punctuation)' }}>&lt;/</span>
            <span style={{ color: 'var(--code-tag)' }}>BadgeWithIcon</span>
            <span style={{ color: 'var(--code-punctuation)' }}>&gt;</span>
          </div>
        </div>
      </section>
    </div>
  );
}