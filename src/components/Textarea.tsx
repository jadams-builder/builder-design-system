'use client';

import React, { useState, useRef, useEffect } from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  description?: string;
  error?: string;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
  autoResize?: boolean;
  maxHeight?: number;
  minHeight?: number;
  showCharacterCount?: boolean;
  maxLength?: number;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({
    label,
    description,
    error,
    resize = 'vertical',
    autoResize = false,
    maxHeight,
    minHeight = 120,
    showCharacterCount = false,
    maxLength,
    className = '',
    disabled = false,
    value = '',
    onChange,
    onFocus,
    onBlur,
    ...props
  }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const composedRef = ref || textareaRef;

    const currentLength = typeof value === 'string' ? value.length : 0;
    const isOverLimit = maxLength ? currentLength > maxLength : false;

    useEffect(() => {
      if (autoResize && textareaRef.current) {
        const textarea = textareaRef.current;
        
        // Reset height to auto to get the correct scrollHeight
        textarea.style.height = 'auto';
        
        // Calculate new height
        let newHeight = Math.max(textarea.scrollHeight, minHeight);
        
        // Apply max height if specified
        if (maxHeight) {
          newHeight = Math.min(newHeight, maxHeight);
        }
        
        textarea.style.height = `${newHeight}px`;
      }
    }, [value, autoResize, minHeight, maxHeight]);

    const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setIsFocused(false);
      onBlur?.(e);
    };

    const getResizeStyle = () => {
      if (autoResize) return 'none';
      return resize;
    };

    return (
      <div className={`textarea-wrapper ${className}`}>
        {label && (
          <label
            className="textarea-label"
            style={{
              display: 'block',
              color: disabled ? 'var(--text-disabled)' : 'var(--text-primary)',
              fontFamily: 'var(--font-primary)',
              fontSize: 'var(--font-sm)',
              fontWeight: 'var(--font-weight-medium)',
              marginBottom: 'var(--space-1_5)'
            }}
          >
            {label}
            {maxLength && showCharacterCount && (
              <span
                style={{
                  float: 'right',
                  color: isOverLimit ? 'var(--text-error)' : 'var(--text-tertiary)',
                  fontWeight: 'var(--font-weight-normal)',
                  fontSize: 'var(--font-xs)'
                }}
              >
                {currentLength}{maxLength && `/${maxLength}`}
              </span>
            )}
          </label>
        )}

        {description && (
          <div
            className="textarea-description"
            style={{
              color: disabled ? 'var(--text-disabled)' : 'var(--text-secondary)',
              fontFamily: 'var(--font-primary)',
              fontSize: 'var(--font-sm)',
              marginBottom: 'var(--space-2)',
              lineHeight: 'var(--line-height-normal)'
            }}
          >
            {description}
          </div>
        )}

        <div className="textarea-container" style={{ position: 'relative' }}>
          <textarea
            {...props}
            ref={composedRef}
            value={value}
            onChange={onChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            disabled={disabled}
            maxLength={maxLength}
            className="textarea-input"
            style={{
              width: '100%',
              minHeight: autoResize ? `${minHeight}px` : undefined,
              maxHeight: maxHeight ? `${maxHeight}px` : undefined,
              height: autoResize ? undefined : `${minHeight}px`,
              padding: 'var(--input-padding-y) var(--input-padding-x)',
              background: disabled
                ? 'var(--input-bg-disabled)'
                : isFocused || isHovered
                ? 'var(--input-bg-focus)'
                : 'var(--input-bg)',
              border: 'var(--border-thin) solid',
              borderColor: error
                ? 'var(--input-border-error)'
                : isFocused
                ? 'var(--input-border-focus)'
                : 'var(--input-border)',
              borderRadius: 'var(--input-border-radius)',
              color: disabled ? 'var(--text-disabled)' : 'var(--input-text)',
              fontFamily: 'var(--font-primary)',
              fontSize: 'var(--input-font-size)',
              lineHeight: 'var(--line-height-relaxed)',
              resize: getResizeStyle(),
              transition: 'var(--transition-fast)',
              outline: 'none',
              boxShadow: isFocused && !disabled ? 'var(--focus-ring)' : 'none'
            }}
          />

          {/* Character count for bottom right position */}
          {showCharacterCount && !label && (
            <div
              style={{
                position: 'absolute',
                bottom: 'var(--space-2)',
                right: 'var(--space-3)',
                color: isOverLimit ? 'var(--text-error)' : 'var(--text-tertiary)',
                fontSize: 'var(--font-xs)',
                fontFamily: 'var(--font-primary)',
                background: disabled
                  ? 'var(--input-bg-disabled)'
                  : isFocused || isHovered
                  ? 'var(--input-bg-focus)'
                  : 'var(--input-bg)',
                padding: 'var(--space-1) var(--space-1_5)',
                borderRadius: 'var(--radius-base)',
                pointerEvents: 'none'
              }}
            >
              {currentLength}{maxLength && `/${maxLength}`}
            </div>
          )}
        </div>

        {error && (
          <div
            className="textarea-error"
            style={{
              color: 'var(--text-error)',
              fontFamily: 'var(--font-primary)',
              fontSize: 'var(--font-sm)',
              fontWeight: 'var(--font-weight-medium)',
              marginTop: 'var(--space-1_5)'
            }}
          >
            {error}
          </div>
        )}

        <style jsx>{`
          .textarea-wrapper {
            width: 100%;
          }

          .textarea-input {
            font-family: inherit;
          }

          .textarea-input::placeholder {
            color: var(--input-text-placeholder);
            opacity: 1;
          }

          .textarea-input:disabled {
            cursor: not-allowed;
            opacity: 0.6;
          }

          /* Custom scrollbar for textarea */
          .textarea-input {
            scrollbar-width: thin;
            scrollbar-color: var(--color-gray-600) transparent;
          }

          .textarea-input::-webkit-scrollbar {
            width: 8px;
          }

          .textarea-input::-webkit-scrollbar-track {
            background: transparent;
          }

          .textarea-input::-webkit-scrollbar-thumb {
            background-color: var(--color-gray-600);
            border-radius: var(--radius-base);
          }

          .textarea-input::-webkit-scrollbar-thumb:hover {
            background-color: var(--color-gray-500);
          }

          /* Remove default resize handle when using autoResize */
          .textarea-input[style*="resize: none"] {
            resize: none !important;
          }
        `}</style>
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';