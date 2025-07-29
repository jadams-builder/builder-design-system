'use client';

import React, { useState } from 'react';

interface ToggleProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  label?: string;
  description?: string;
  error?: string;
  size?: 'sm' | 'base' | 'lg';
  labelPosition?: 'left' | 'right';
}

export const Toggle = React.forwardRef<HTMLInputElement, ToggleProps>(
  ({
    label,
    description,
    error,
    size = 'base',
    labelPosition = 'right',
    className = '',
    disabled = false,
    checked = false,
    onChange,
    ...props
  }, ref) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const sizeConfig = {
      sm: {
        trackWidth: '2.5rem', // 40px
        trackHeight: '1.25rem', // 20px
        thumbSize: '1rem', // 16px
        thumbOffset: '0.125rem', // 2px
        checkedOffset: '1.25rem' // 20px
      },
      base: {
        trackWidth: '3rem', // 48px
        trackHeight: '1.5rem', // 24px
        thumbSize: '1.25rem', // 20px
        thumbOffset: '0.125rem', // 2px
        checkedOffset: '1.5rem' // 24px
      },
      lg: {
        trackWidth: '3.5rem', // 56px
        trackHeight: '1.75rem', // 28px
        thumbSize: '1.5rem', // 24px
        thumbOffset: '0.125rem', // 2px
        checkedOffset: '1.75rem' // 28px
      }
    };

    const config = sizeConfig[size];

    const getTrackStyles = () => ({
      width: config.trackWidth,
      height: config.trackHeight,
      background: checked
        ? disabled
          ? 'var(--color-gray-600)'
          : isHovered
            ? 'var(--color-purple-400)'
            : 'var(--color-purple-500)'
        : disabled
          ? 'var(--color-gray-700)'
          : isHovered
            ? 'var(--color-gray-600)'
            : 'var(--color-gray-650)',
      borderRadius: config.trackHeight,
      position: 'relative' as const,
      transition: 'var(--transition-fast)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      border: 'var(--border-thin) solid',
      borderColor: checked
        ? disabled
          ? 'var(--color-gray-600)'
          : 'var(--color-purple-500)'
        : disabled
          ? 'var(--color-gray-700)'
          : 'var(--color-gray-600)',
      boxShadow: isFocused && !disabled ? 'var(--focus-ring)' : 'none'
    });

    const getThumbStyles = () => ({
      width: config.thumbSize,
      height: config.thumbSize,
      background: disabled
        ? 'var(--color-gray-500)'
        : 'var(--color-white)',
      borderRadius: '50%',
      position: 'absolute' as const,
      top: config.thumbOffset,
      left: checked ? config.checkedOffset : config.thumbOffset,
      transition: 'var(--transition-fast)',
      boxShadow: disabled
        ? 'none'
        : '0 2px 4px rgba(0, 0, 0, 0.2), 0 1px 2px rgba(0, 0, 0, 0.1)'
    });

    const handleToggle = () => {
      if (!disabled && onChange) {
        const event = {
          target: { checked: !checked }
        } as React.ChangeEvent<HTMLInputElement>;
        onChange(event);
      }
    };

    const toggleElement = (
      <div className="toggle-container">
        <input
          {...props}
          ref={ref}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className="toggle-input sr-only"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <div
          className="toggle-track"
          style={getTrackStyles()}
          onClick={handleToggle}
          onMouseEnter={() => !disabled && setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="toggle-thumb" style={getThumbStyles()} />
        </div>
      </div>
    );

    const labelElement = (label || description) && (
      <div className="toggle-content">
        {label && (
          <label 
            className={`toggle-label ${disabled ? 'disabled' : ''}`}
            style={{
              color: disabled ? 'var(--text-disabled)' : 'var(--text-primary)',
              cursor: disabled ? 'not-allowed' : 'pointer'
            }}
            onClick={handleToggle}
          >
            {label}
          </label>
        )}
        {description && (
          <div 
            className="toggle-description"
            style={{
              color: disabled ? 'var(--text-disabled)' : 'var(--text-secondary)'
            }}
          >
            {description}
          </div>
        )}
      </div>
    );

    return (
      <div className={`toggle-wrapper ${className}`}>
        <div className="toggle-main">
          {labelPosition === 'left' && labelElement}
          {toggleElement}  
          {labelPosition === 'right' && labelElement}
        </div>
        
        {error && (
          <div 
            className="toggle-error"
            style={{ color: 'var(--text-error)' }}
          >
            {error}
          </div>
        )}

        <style jsx>{`
          .toggle-wrapper {
            display: flex;
            flex-direction: column;
            gap: var(--space-1_5);
          }

          .toggle-main {
            display: flex;
            align-items: flex-start;
            gap: var(--space-3);
          }

          .toggle-container {
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

          .toggle-content {
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: var(--space-1);
          }

          .toggle-label {
            font-family: var(--font-primary);
            font-size: var(--font-base);
            font-weight: var(--font-weight-medium);
            line-height: var(--line-height-snug);
            transition: var(--transition-fast);
          }

          .toggle-description {
            font-family: var(--font-primary);
            font-size: var(--font-sm);
            line-height: var(--line-height-normal);
          }

          .toggle-error {
            font-family: var(--font-primary);
            font-size: var(--font-sm);
            font-weight: var(--font-weight-medium);
          }
        `}</style>
      </div>
    );
  }
);

Toggle.displayName = 'Toggle';

interface ToggleGroupProps {
  children: React.ReactNode;
  label?: string;
  description?: string;
  error?: string;
  className?: string;
}

export const ToggleGroup: React.FC<ToggleGroupProps> = ({
  children,
  label,
  description,
  error,
  className = ''
}) => {
  return (
    <div className={`toggle-group ${className}`}>
      {label && (
        <div 
          className="toggle-group-label"
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
          className="toggle-group-description"
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
        className="toggle-group-items"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-4)'
        }}
      >
        {children}
      </div>
      
      {error && (
        <div 
          className="toggle-group-error"
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