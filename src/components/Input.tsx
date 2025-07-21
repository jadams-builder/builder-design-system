'use client';

import React from 'react';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  helperText?: string;
  error?: string;
  success?: string;
  size?: 'sm' | 'base' | 'lg';
  variant?: 'default' | 'filled';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export function Input({ 
  label,
  helperText,
  error,
  success,
  size = 'base',
  variant = 'default',
  leftIcon,
  rightIcon,
  className,
  style,
  disabled,
  ...props 
}: InputProps) {
  const [isFocused, setIsFocused] = React.useState(false);

  const getSizeStyles = (size: string) => {
    switch (size) {
      case 'sm':
        return {
          fontSize: 'var(--font-sm)',
          padding: 'var(--space-2) var(--space-3)',
          borderRadius: 'var(--radius-md)',
        };
      case 'base':
        return {
          fontSize: 'var(--input-font-size)',
          padding: 'var(--input-padding-y) var(--input-padding-x)',
          borderRadius: 'var(--input-border-radius)',
        };
      case 'lg':
        return {
          fontSize: 'var(--font-lg)',
          padding: 'var(--space-3_5) var(--space-4)',
          borderRadius: 'var(--radius-xl)',
        };
      default:
        return {};
    }
  };

  const getStateStyles = () => {
    if (disabled) {
      return {
        background: 'var(--input-bg-disabled)',
        borderColor: 'var(--border-secondary)',
        color: 'var(--text-disabled)',
        cursor: 'not-allowed',
      };
    }
    
    if (error) {
      return {
        background: isFocused ? 'var(--input-bg-focus)' : 'var(--input-bg)',
        borderColor: 'var(--input-border-error)',
        color: 'var(--input-text)',
      };
    }
    
    if (success) {
      return {
        background: isFocused ? 'var(--input-bg-focus)' : 'var(--input-bg)',
        borderColor: 'var(--border-success)',
        color: 'var(--input-text)',
      };
    }
    
    if (isFocused) {
      return {
        background: 'var(--input-bg-focus)',
        borderColor: 'var(--input-border-focus)',
        color: 'var(--input-text)',
        outline: 'none',
        boxShadow: 'var(--focus-ring)',
      };
    }
    
    return {
      background: variant === 'filled' ? 'var(--bg-elevated)' : 'var(--input-bg)',
      borderColor: 'var(--input-border)',
      color: 'var(--input-text)',
    };
  };

  const baseInputStyles = {
    fontFamily: 'var(--font-primary)',
    border: 'var(--border-thin) solid',
    transition: 'var(--transition-fast)',
    width: '100%',
    ...getSizeStyles(size),
    ...getStateStyles(),
    ...style,
  };

  const inputId = React.useId();
  const helperTextId = React.useId();
  const errorId = React.useId();

  return (
    <div className={`input-field ${className || ''}`}>
      {label && (
        <label 
          htmlFor={inputId}
          className="block font-medium mb-2"
          style={{ 
            color: disabled ? 'var(--text-disabled)' : 'var(--text-primary)',
            fontSize: 'var(--font-sm)'
          }}
        >
          {label}
        </label>
      )}
      
      <div className="relative">
        {leftIcon && (
          <div 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
            style={{ color: disabled ? 'var(--text-disabled)' : 'var(--text-tertiary)' }}
          >
            {leftIcon}
          </div>
        )}
        
        <input
          {...props}
          id={inputId}
          disabled={disabled}
          style={{
            ...baseInputStyles,
            paddingLeft: leftIcon ? 'var(--space-10)' : baseInputStyles.paddingLeft,
            paddingRight: rightIcon ? 'var(--space-10)' : baseInputStyles.paddingRight,
          }}
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
          placeholder={props.placeholder}
          aria-describedby={
            [
              helperText ? helperTextId : undefined,
              error ? errorId : undefined
            ].filter(Boolean).join(' ') || undefined
          }
          aria-invalid={error ? 'true' : undefined}
        />
        
        {rightIcon && (
          <div 
            className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
            style={{ color: disabled ? 'var(--text-disabled)' : 'var(--text-tertiary)' }}
          >
            {rightIcon}
          </div>
        )}
      </div>
      
      {(helperText || error || success) && (
        <div className="mt-2">
          {error && (
            <p 
              id={errorId}
              className="text-sm"
              style={{ color: 'var(--text-error)' }}
              role="alert"
            >
              {error}
            </p>
          )}
          
          {success && !error && (
            <p 
              className="text-sm"
              style={{ color: 'var(--text-success)' }}
            >
              {success}
            </p>
          )}
          
          {helperText && !error && !success && (
            <p 
              id={helperTextId}
              className="text-sm"
              style={{ color: 'var(--text-tertiary)' }}
            >
              {helperText}
            </p>
          )}
        </div>
      )}
    </div>
  );
}