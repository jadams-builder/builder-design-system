'use client';

import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'base' | 'lg';
  disabled?: boolean;
  children: React.ReactNode;
}

export function Button({ 
  variant = 'primary', 
  size = 'base', 
  disabled = false, 
  children, 
  style,
  onMouseEnter,
  onMouseLeave,
  ...props 
}: ButtonProps) {
  const getVariantStyles = (variant: string, isHover: boolean = false) => {
    switch (variant) {
      case 'primary':
        return {
          background: isHover ? 'var(--button-primary-bg-hover)' : 'var(--button-primary-bg)',
          color: disabled ? 'var(--button-primary-text-disabled)' : 'var(--button-primary-text)',
          border: `var(--border-thin) solid ${isHover ? 'var(--button-primary-border-hover)' : 'var(--button-primary-border)'}`,
        };
      case 'secondary':
        return {
          background: isHover ? 'var(--button-secondary-bg-hover)' : 'var(--button-secondary-bg)',
          color: isHover ? 'var(--button-secondary-text-hover)' : 'var(--button-secondary-text)',
          border: `var(--border-thin) solid ${isHover ? 'var(--button-secondary-border-hover)' : 'var(--button-secondary-border)'}`,
        };
      case 'ghost':
        return {
          background: isHover ? 'var(--button-ghost-bg-hover)' : 'var(--button-ghost-bg)',
          color: isHover ? 'var(--button-ghost-text-hover)' : 'var(--button-ghost-text)',
          border: 'var(--border-thin) solid transparent',
        };
      default:
        return {};
    }
  };

  const getSizeStyles = (size: string) => {
    switch (size) {
      case 'sm':
        return {
          padding: 'var(--button-sm-padding-y) var(--button-sm-padding-x)',
          fontSize: 'var(--button-sm-font-size)',
          borderRadius: 'var(--button-sm-border-radius)',
        };
      case 'base':
        return {
          padding: 'var(--button-base-padding-y) var(--button-base-padding-x)',
          fontSize: 'var(--button-base-font-size)',
          borderRadius: 'var(--button-base-border-radius)',
        };
      case 'lg':
        return {
          padding: 'var(--button-lg-padding-y) var(--button-lg-padding-x)',
          fontSize: 'var(--button-lg-font-size)',
          borderRadius: 'var(--button-lg-border-radius)',
        };
      default:
        return {};
    }
  };

  const [isHovered, setIsHovered] = React.useState(false);

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled) {
      setIsHovered(true);
    }
    onMouseEnter?.(e);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsHovered(false);
    onMouseLeave?.(e);
  };

  const baseStyles = {
    fontFamily: 'var(--font-primary)',
    fontWeight: 'var(--font-weight-medium)',
    transition: 'var(--transition-fast)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.6 : 1,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none',
    outline: 'none',
    ...getSizeStyles(size),
    ...getVariantStyles(variant, isHovered && !disabled),
    ...style,
  };

  return (
    <>
      <style jsx>{`
        .button:focus-visible {
          outline: none;
          box-shadow: var(--focus-ring);
          outline-offset: var(--focus-ring-offset);
        }
      `}</style>
      <button
        className="button"
        style={baseStyles}
        disabled={disabled}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {children}
      </button>
    </>
  );
}