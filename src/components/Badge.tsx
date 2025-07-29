'use client';

import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'base' | 'lg';
  children: React.ReactNode;
}

export function Badge({ 
  variant = 'default', 
  size = 'base',
  children,
  className,
  style,
  ...props 
}: BadgeProps) {
  const getVariantStyles = (variant: string) => {
    switch (variant) {
      case 'primary':
        return {
          background: 'var(--badge-primary-bg)',
          color: 'var(--badge-primary-text)',
          border: `var(--border-thin) solid var(--badge-primary-border)`,
        };
      case 'secondary':
        return {
          background: 'var(--badge-secondary-bg)',
          color: 'var(--badge-secondary-text)',
          border: `var(--border-thin) solid var(--badge-secondary-border)`,
        };
      case 'success':
        return {
          background: 'var(--badge-success-bg)',
          color: 'var(--badge-success-text)',
          border: `var(--border-thin) solid var(--badge-success-border)`,
        };
      case 'warning':
        return {
          background: 'var(--badge-warning-bg)',
          color: 'var(--badge-warning-text)',
          border: `var(--border-thin) solid var(--badge-warning-border)`,
        };
      case 'error':
        return {
          background: 'var(--badge-error-bg)',
          color: 'var(--badge-error-text)',
          border: `var(--border-thin) solid var(--badge-error-border)`,
        };
      case 'default':
      default:
        return {
          background: 'var(--badge-default-bg)',
          color: 'var(--badge-default-text)',
          border: `var(--border-thin) solid var(--badge-default-border)`,
        };
    }
  };

  const getSizeStyles = (size: string) => {
    switch (size) {
      case 'sm':
        return {
          padding: 'var(--badge-sm-padding-y) var(--badge-sm-padding-x)',
          fontSize: 'var(--badge-sm-font-size)',
          borderRadius: 'var(--badge-sm-border-radius)',
        };
      case 'base':
        return {
          padding: 'var(--badge-base-padding-y) var(--badge-base-padding-x)',
          fontSize: 'var(--badge-base-font-size)',
          borderRadius: 'var(--badge-base-border-radius)',
        };
      case 'lg':
        return {
          padding: 'var(--badge-lg-padding-y) var(--badge-lg-padding-x)',
          fontSize: 'var(--badge-lg-font-size)',
          borderRadius: 'var(--badge-lg-border-radius)',
        };
      default:
        return {};
    }
  };

  const baseStyles = {
    fontFamily: 'var(--font-primary)',
    fontWeight: 'var(--font-weight-medium)',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center' as const,
    whiteSpace: 'nowrap' as const,
    verticalAlign: 'middle',
    textDecoration: 'none',
    lineHeight: 'var(--line-height-none)',
    ...getSizeStyles(size),
    ...getVariantStyles(variant),
    ...style,
  };

  return (
    <span
      className={`badge ${className || ''}`}
      style={baseStyles}
      {...props}
    >
      {children}
    </span>
  );
}

// Badge with icon support
export interface BadgeWithIconProps extends BadgeProps {
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export function BadgeWithIcon({ 
  icon,
  iconPosition = 'left',
  children,
  style,
  ...props 
}: BadgeWithIconProps) {
  const iconSpacing = props.size === 'sm' ? 'var(--space-1)' : 'var(--space-1_5)';
  
  return (
    <Badge 
      style={{
        gap: iconSpacing,
        ...style
      }}
      {...props}
    >
      {iconPosition === 'left' && icon}
      {children}
      {iconPosition === 'right' && icon}
    </Badge>
  );
}

// Badge for notifications/counts
export interface NotificationBadgeProps extends Omit<BadgeProps, 'children'> {
  count: number;
  max?: number;
  showZero?: boolean;
}

export function NotificationBadge({ 
  count, 
  max = 99, 
  showZero = false,
  variant = 'error',
  size = 'sm',
  ...props 
}: NotificationBadgeProps) {
  if (count === 0 && !showZero) {
    return null;
  }

  const displayCount = count > max ? `${max}+` : count.toString();

  return (
    <Badge
      variant={variant}
      size={size}
      style={{
        minWidth: size === 'sm' ? 'var(--space-5)' : 'var(--space-6)',
        height: size === 'sm' ? 'var(--space-5)' : 'var(--space-6)',
        borderRadius: 'var(--radius-full)',
        padding: '0',
        ...props.style
      }}
      {...props}
    >
      {displayCount}
    </Badge>
  );
}

// Dot badge for simple indicators
export interface DotBadgeProps extends Omit<BadgeProps, 'children' | 'size'> {
  size?: 'sm' | 'base';
}

export function DotBadge({ 
  variant = 'primary',
  size = 'base',
  style,
  ...props 
}: DotBadgeProps) {
  const dotSize = size === 'sm' ? 'var(--space-2)' : 'var(--space-3)';
  
  return (
    <Badge
      variant={variant}
      style={{
        width: dotSize,
        height: dotSize,
        borderRadius: 'var(--radius-full)',
        padding: '0',
        minWidth: 'auto',
        ...style
      }}
      {...props}
    >
      <span className="sr-only">Status indicator</span>
    </Badge>
  );
}