'use client';

import React, { useState } from 'react';
import { IconCheck, IconMinus } from '@tabler/icons-react';

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  description?: string;
  error?: string;
  indeterminate?: boolean;
  size?: 'sm' | 'base' | 'lg';
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ 
    label, 
    description, 
    error, 
    indeterminate = false,
    size = 'base', 
    className = '', 
    disabled = false,
    checked,
    onChange,
    ...props 
  }, ref) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const sizeClasses = {
      sm: 'checkbox-sm',
      base: 'checkbox-base', 
      lg: 'checkbox-lg'
    };

    const iconSize = {
      sm: 'var(--icon-xs)',
      base: 'var(--icon-sm)',
      lg: 'var(--icon-base)'
    };

    return (
      <div className={`checkbox-wrapper ${className}`}>
        <div className="checkbox-container">
          <div className="checkbox-input-container">
            <input
              {...props}
              ref={ref}
              type="checkbox"
              checked={checked}
              onChange={onChange}
              disabled={disabled}
              className="checkbox-input sr-only"
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
            <div
              className={`checkbox-visual ${sizeClasses[size]} ${disabled ? 'disabled' : ''} ${error ? 'error' : ''}`}
              style={{
                background: checked || indeterminate
                  ? disabled 
                    ? 'var(--color-gray-700)'
                    : isHovered 
                      ? 'var(--color-purple-400)' 
                      : 'var(--color-purple-500)'
                  : disabled
                    ? 'var(--color-gray-800)'
                    : isHovered
                      ? 'var(--bg-elevated)'
                      : 'var(--input-bg)',
                borderColor: error
                  ? 'var(--border-error)'
                  : checked || indeterminate
                    ? disabled
                      ? 'var(--color-gray-600)'
                      : 'var(--color-purple-500)'
                    : disabled
                      ? 'var(--color-gray-700)'
                      : isFocused
                        ? 'var(--border-focus)'
                        : isHovered
                          ? 'var(--border-primary)'
                          : 'var(--input-border)',
                boxShadow: isFocused && !disabled ? 'var(--focus-ring)' : 'none',
                cursor: disabled ? 'not-allowed' : 'pointer'
              }}
              onMouseEnter={() => !disabled && setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={() => {
                if (!disabled && onChange) {
                  const event = {
                    target: { checked: !checked }
                  } as React.ChangeEvent<HTMLInputElement>;
                  onChange(event);
                }
              }}
            >
              {(checked || indeterminate) && (
                <div className="checkbox-icon">
                  {indeterminate ? (
                    <IconMinus 
                      size={iconSize[size]}
                      style={{ 
                        color: disabled ? 'var(--text-disabled)' : 'var(--color-white)',
                        strokeWidth: 2.5
                      }}
                    />
                  ) : (
                    <IconCheck 
                      size={iconSize[size]}
                      style={{ 
                        color: disabled ? 'var(--text-disabled)' : 'var(--color-white)',
                        strokeWidth: 2.5
                      }}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
          
          {(label || description) && (
            <div className="checkbox-content">
              {label && (
                <label 
                  className={`checkbox-label ${disabled ? 'disabled' : ''}`}
                  style={{
                    color: disabled ? 'var(--text-disabled)' : 'var(--text-primary)',
                    cursor: disabled ? 'not-allowed' : 'pointer'
                  }}
                  onClick={() => {
                    if (!disabled && onChange) {
                      const event = {
                        target: { checked: !checked }
                      } as React.ChangeEvent<HTMLInputElement>;
                      onChange(event);
                    }
                  }}
                >
                  {label}
                </label>
              )}
              {description && (
                <div 
                  className="checkbox-description"
                  style={{
                    color: disabled ? 'var(--text-disabled)' : 'var(--text-secondary)'
                  }}
                >
                  {description}
                </div>
              )}
            </div>
          )}
        </div>
        
        {error && (
          <div 
            className="checkbox-error"
            style={{ color: 'var(--text-error)' }}
          >
            {error}
          </div>
        )}

        <style jsx>{`
          .checkbox-wrapper {
            display: flex;
            flex-direction: column;
            gap: var(--space-1_5);
          }

          .checkbox-container {
            display: flex;
            align-items: flex-start;
            gap: var(--space-3);
          }

          .checkbox-input-container {
            position: relative;
            flex-shrink: 0;
          }

          .sr-only {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border: 0;
          }

          .checkbox-visual {
            display: flex;
            align-items: center;
            justify-content: center;
            border: var(--border-thin) solid;
            transition: var(--transition-fast);
            position: relative;
          }

          .checkbox-visual.checkbox-sm {
            width: var(--space-4);
            height: var(--space-4);
            border-radius: var(--radius-base);
          }

          .checkbox-visual.checkbox-base {
            width: var(--space-5);
            height: var(--space-5);
            border-radius: var(--radius-md);
          }

          .checkbox-visual.checkbox-lg {
            width: var(--space-6);
            height: var(--space-6);
            border-radius: var(--radius-lg);
          }

          .checkbox-icon {
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .checkbox-content {
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: var(--space-1);
          }

          .checkbox-label {
            font-family: var(--font-primary);
            font-size: var(--font-base);
            font-weight: var(--font-weight-medium);
            line-height: var(--line-height-snug);
            transition: var(--transition-fast);
          }

          .checkbox-description {
            font-family: var(--font-primary);
            font-size: var(--font-sm);
            line-height: var(--line-height-normal);
          }

          .checkbox-error {
            font-family: var(--font-primary);
            font-size: var(--font-sm);
            font-weight: var(--font-weight-medium);
          }
        `}</style>
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

interface CheckboxGroupProps {
  children: React.ReactNode;
  label?: string;
  description?: string;
  error?: string;
  className?: string;
}

export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  children,
  label,
  description,
  error,
  className = ''
}) => {
  return (
    <div className={`checkbox-group ${className}`}>
      {label && (
        <div 
          className="checkbox-group-label"
          style={{ 
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-primary)',
            fontSize: 'var(--font-base)',
            fontWeight: 'var(--font-weight-semibold)',
            marginBottom: 'var(--space-2)'
          }}
        >
          {label}
        </div>
      )}
      
      {description && (
        <div 
          className="checkbox-group-description"
          style={{ 
            color: 'var(--text-secondary)',
            fontFamily: 'var(--font-primary)',
            fontSize: 'var(--font-sm)',
            marginBottom: 'var(--space-3)'
          }}
        >
          {description}
        </div>
      )}
      
      <div 
        className="checkbox-group-items"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-3)'
        }}
      >
        {children}
      </div>
      
      {error && (
        <div 
          className="checkbox-group-error"
          style={{ 
            color: 'var(--text-error)',
            fontFamily: 'var(--font-primary)',
            fontSize: 'var(--font-sm)',
            fontWeight: 'var(--font-weight-medium)',
            marginTop: 'var(--space-2)'
          }}
        >
          {error}
        </div>
      )}
    </div>
  );
};