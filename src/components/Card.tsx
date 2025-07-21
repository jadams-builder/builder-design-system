'use client';

import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outlined';
  size?: 'sm' | 'base' | 'lg';
  interactive?: boolean;
  children: React.ReactNode;
}

export function Card({ 
  variant = 'default',
  size = 'base',
  interactive = false,
  children,
  className,
  style,
  onMouseEnter,
  onMouseLeave,
  ...props 
}: CardProps) {
  const [isHovered, setIsHovered] = React.useState(false);

  const getVariantStyles = (variant: string, isHovered: boolean = false) => {
    switch (variant) {
      case 'elevated':
        return {
          background: 'var(--card-bg)',
          border: 'none',
          boxShadow: isHovered && interactive ? 'var(--card-shadow-hover)' : 'var(--shadow-lg)',
        };
      case 'outlined':
        return {
          background: 'transparent',
          border: `var(--border-thin) solid var(--card-border)`,
          boxShadow: 'none',
        };
      case 'default':
      default:
        return {
          background: isHovered && interactive ? 'var(--card-bg-hover)' : 'var(--card-bg)',
          border: `var(--border-thin) solid ${isHovered && interactive ? 'var(--card-border-hover)' : 'var(--card-border)'}`,
          boxShadow: isHovered && interactive ? 'var(--card-shadow-hover)' : 'var(--card-shadow)',
        };
    }
  };

  const getSizeStyles = (size: string) => {
    switch (size) {
      case 'sm':
        return {
          padding: 'var(--card-padding-sm)',
          borderRadius: 'var(--radius-lg)',
        };
      case 'base':
        return {
          padding: 'var(--card-padding)',
          borderRadius: 'var(--card-border-radius)',
        };
      case 'lg':
        return {
          padding: 'var(--card-padding-lg)',
          borderRadius: 'var(--radius-2xl)',
        };
      default:
        return {};
    }
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (interactive) {
      setIsHovered(true);
    }
    onMouseEnter?.(e);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsHovered(false);
    onMouseLeave?.(e);
  };

  const baseStyles = {
    transition: 'var(--transition-base)',
    cursor: interactive ? 'pointer' : 'default',
    ...getSizeStyles(size),
    ...getVariantStyles(variant, isHovered),
    ...style,
  };

  return (
    <div
      className={`card ${className || ''}`}
      style={baseStyles}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </div>
  );
}

// Compound components for common card patterns
export function CardHeader({ children, className, style, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`card-header ${className || ''}`}
      style={{
        marginBottom: 'var(--space-4)',
        ...style
      }}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardTitle({ children, className, style, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={`card-title ${className || ''}`}
      style={{
        fontSize: 'var(--font-lg)',
        fontWeight: 'var(--font-weight-semibold)',
        color: 'var(--text-primary)',
        margin: 0,
        lineHeight: 'var(--line-height-tight)',
        ...style
      }}
      {...props}
    >
      {children}
    </h3>
  );
}

export function CardDescription({ children, className, style, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={`card-description ${className || ''}`}
      style={{
        fontSize: 'var(--font-sm)',
        color: 'var(--text-secondary)',
        margin: 0,
        marginTop: 'var(--space-2)',
        lineHeight: 'var(--line-height-normal)',
        ...style
      }}
      {...props}
    >
      {children}
    </p>
  );
}

export function CardContent({ children, className, style, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`card-content ${className || ''}`}
      style={{
        color: 'var(--text-primary)',
        ...style
      }}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardFooter({ children, className, style, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`card-footer ${className || ''}`}
      style={{
        marginTop: 'var(--space-6)',
        paddingTop: 'var(--space-4)',
        borderTop: `var(--border-thin) solid var(--border-secondary)`,
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-3)',
        ...style
      }}
      {...props}
    >
      {children}
    </div>
  );
}