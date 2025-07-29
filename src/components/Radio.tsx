'use client';

import React, { useState, createContext, useContext } from 'react';

interface RadioContextType {
  name?: string;
  value?: string | number;
  onChange?: (value: string | number) => void;
  disabled?: boolean;
  size?: 'sm' | 'base' | 'lg';
}

const RadioContext = createContext<RadioContextType | undefined>(undefined);

interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  label?: string;
  description?: string;
  error?: string;
  size?: 'sm' | 'base' | 'lg';
  value: string | number;
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ 
    label, 
    description, 
    error, 
    size: propSize = 'base',
    value,
    className = '', 
    disabled: propDisabled = false,
    checked: propChecked,
    onChange: propOnChange,
    name: propName,
    ...props 
  }, ref) => {
    const context = useContext(RadioContext);
    const [isHovered, setIsHovered] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const name = propName || context?.name;
    const size = propSize || context?.size || 'base';
    const disabled = propDisabled || context?.disabled || false;
    const checked = propChecked !== undefined ? propChecked : context?.value === value;
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (propOnChange) {
        propOnChange(e);
      } else if (context?.onChange) {
        context.onChange(value);
      }
    };

    const sizeClasses = {
      sm: 'radio-sm',
      base: 'radio-base', 
      lg: 'radio-lg'
    };

    const dotSize = {
      sm: 'var(--space-1_5)',
      base: 'var(--space-2)',
      lg: 'var(--space-2_5)'
    };

    return (
      <div className={`radio-wrapper ${className}`}>
        <div className="radio-container">
          <div className="radio-input-container">
            <input
              {...props}
              ref={ref}
              type="radio"
              name={name}
              value={value}
              checked={checked}
              onChange={handleChange}
              disabled={disabled}
              className="radio-input sr-only"
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
            <div
              className={`radio-visual ${sizeClasses[size]} ${disabled ? 'disabled' : ''} ${error ? 'error' : ''}`}
              style={{
                background: disabled
                  ? 'var(--color-gray-800)'
                  : isHovered
                    ? 'var(--bg-elevated)'
                    : 'var(--input-bg)',
                borderColor: error
                  ? 'var(--border-error)'
                  : checked
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
                if (!disabled && context?.onChange) {
                  context.onChange(value);
                } else if (!disabled && propOnChange) {
                  const event = {
                    target: { value, checked: true }
                  } as React.ChangeEvent<HTMLInputElement>;
                  propOnChange(event);
                }
              }}
            >
              {checked && (
                <div 
                  className="radio-dot"
                  style={{
                    width: dotSize[size],
                    height: dotSize[size],
                    background: disabled 
                      ? 'var(--text-disabled)' 
                      : 'var(--color-purple-500)',
                    borderRadius: '50%',
                    transition: 'var(--transition-fast)'
                  }}
                />
              )}
            </div>
          </div>
          
          {(label || description) && (
            <div className="radio-content">
              {label && (
                <label 
                  className={`radio-label ${disabled ? 'disabled' : ''}`}
                  style={{
                    color: disabled ? 'var(--text-disabled)' : 'var(--text-primary)',
                    cursor: disabled ? 'not-allowed' : 'pointer'
                  }}
                  onClick={() => {
                    if (!disabled && context?.onChange) {
                      context.onChange(value);
                    } else if (!disabled && propOnChange) {
                      const event = {
                        target: { value, checked: true }
                      } as React.ChangeEvent<HTMLInputElement>;
                      propOnChange(event);
                    }
                  }}
                >
                  {label}
                </label>
              )}
              {description && (
                <div 
                  className="radio-description"
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
            className="radio-error"
            style={{ color: 'var(--text-error)' }}
          >
            {error}
          </div>
        )}

        <style jsx>{`
          .radio-wrapper {
            display: flex;
            flex-direction: column;
            gap: var(--space-1_5);
          }

          .radio-container {
            display: flex;
            align-items: flex-start;
            gap: var(--space-3);
          }

          .radio-input-container {
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

          .radio-visual {
            display: flex;
            align-items: center;
            justify-content: center;
            border: var(--border-thin) solid;
            border-radius: 50%;
            transition: var(--transition-fast);
            position: relative;
          }

          .radio-visual.radio-sm {
            width: var(--space-4);
            height: var(--space-4);
          }

          .radio-visual.radio-base {
            width: var(--space-5);
            height: var(--space-5);
          }

          .radio-visual.radio-lg {
            width: var(--space-6);
            height: var(--space-6);
          }

          .radio-dot {
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .radio-content {
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: var(--space-1);
          }

          .radio-label {
            font-family: var(--font-primary);
            font-size: var(--font-base);
            font-weight: var(--font-weight-medium);
            line-height: var(--line-height-snug);
            transition: var(--transition-fast);
          }

          .radio-description {
            font-family: var(--font-primary);
            font-size: var(--font-sm);
            line-height: var(--line-height-normal);
          }

          .radio-error {
            font-family: var(--font-primary);
            font-size: var(--font-sm);
            font-weight: var(--font-weight-medium);
          }
        `}</style>
      </div>
    );
  }
);

Radio.displayName = 'Radio';

interface RadioGroupProps {
  children: React.ReactNode;
  value?: string | number;
  onChange?: (value: string | number) => void;
  name?: string;
  label?: string;
  description?: string;
  error?: string;
  disabled?: boolean;
  size?: 'sm' | 'base' | 'lg';
  className?: string;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  children,
  value,
  onChange,
  name,
  label,
  description,
  error,
  disabled = false,
  size = 'base',
  className = ''
}) => {
  const contextValue: RadioContextType = {
    name,
    value,
    onChange,
    disabled,
    size
  };

  return (
    <RadioContext.Provider value={contextValue}>
      <div className={`radio-group ${className}`}>
        {label && (
          <div 
            className="radio-group-label"
            style={{ 
              color: disabled ? 'var(--text-disabled)' : 'var(--text-primary)',
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
            className="radio-group-description"
            style={{ 
              color: disabled ? 'var(--text-disabled)' : 'var(--text-secondary)',
              fontFamily: 'var(--font-primary)',
              fontSize: 'var(--font-sm)',
              marginBottom: 'var(--space-3)'
            }}
          >
            {description}
          </div>
        )}
        
        <div 
          className="radio-group-items"
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
            className="radio-group-error"
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
    </RadioContext.Provider>
  );
};