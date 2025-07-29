'use client';

import React, { useState, useRef, useEffect } from 'react';
import { IconChevronDown, IconCheck, IconX, IconSearch } from '@tabler/icons-react';

interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
  description?: string;
}

interface SelectProps {
  options: SelectOption[];
  value?: string | number | (string | number)[];
  onChange?: (value: string | number | (string | number)[]) => void;
  placeholder?: string;
  label?: string;
  description?: string;
  error?: string;
  disabled?: boolean;
  multiple?: boolean;
  searchable?: boolean;
  clearable?: boolean;
  size?: 'sm' | 'base' | 'lg';
  maxHeight?: number;
  className?: string;
}

export const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select an option...',
  label,
  description,
  error,
  disabled = false,
  multiple = false,
  searchable = false,
  clearable = false,
  size = 'base',
  maxHeight = 200,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [isHover, setIsHover] = useState(false);
  
  const selectRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const normalizedValue = multiple 
    ? Array.isArray(value) ? value : (value !== undefined ? [value] : [])
    : value;

  const filteredOptions = searchable
    ? options.filter(option => 
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : options;

  const selectedOptions = multiple && Array.isArray(normalizedValue)
    ? options.filter(option => normalizedValue.includes(option.value))
    : [];

  const singleSelectedOption = !multiple && value !== undefined
    ? options.find(option => option.value === value)
    : undefined;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm('');
        setFocusedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && focusedIndex >= 0 && listRef.current) {
      const focusedElement = listRef.current.children[focusedIndex] as HTMLElement;
      if (focusedElement) {
        focusedElement.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [focusedIndex, isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          if (searchable && inputRef.current) {
            inputRef.current.focus();
          }
        } else if (focusedIndex >= 0) {
          handleOptionSelect(filteredOptions[focusedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSearchTerm('');
        setFocusedIndex(-1);
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else {
          setFocusedIndex(prev => 
            Math.min(prev + 1, filteredOptions.length - 1)
          );
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (isOpen) {
          setFocusedIndex(prev => Math.max(prev - 1, 0));
        }
        break;
    }
  };

  const handleOptionSelect = (option: SelectOption) => {
    if (option.disabled || !onChange) return;

    if (multiple) {
      const currentValue = Array.isArray(normalizedValue) ? normalizedValue : [];
      const newValue = currentValue.includes(option.value)
        ? currentValue.filter(v => v !== option.value)
        : [...currentValue, option.value];
      onChange(newValue);
    } else {
      onChange(option.value);
      setIsOpen(false);
    }
    
    setSearchTerm('');
    setFocusedIndex(-1);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onChange) {
      onChange(multiple ? [] : '');
    }
  };

  const getDisplayText = () => {
    if (multiple && selectedOptions.length > 0) {
      return `${selectedOptions.length} selected`;
    }
    return singleSelectedOption?.label || '';
  };

  const sizeStyles = {
    sm: {
      padding: 'var(--space-2) var(--space-3)',
      fontSize: 'var(--font-sm)',
      minHeight: 'var(--space-8)'
    },
    base: {
      padding: 'var(--input-padding-y) var(--input-padding-x)',
      fontSize: 'var(--font-base)',
      minHeight: 'var(--space-10)'
    },
    lg: {
      padding: 'var(--space-3) var(--space-4)',
      fontSize: 'var(--font-lg)',
      minHeight: 'var(--space-12)'
    }
  };

  return (
    <div className={`select-wrapper ${className}`} ref={selectRef}>
      {label && (
        <label 
          className="select-label"
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
        </label>
      )}

      {description && (
        <div 
          className="select-description"
          style={{
            color: disabled ? 'var(--text-disabled)' : 'var(--text-secondary)',
            fontFamily: 'var(--font-primary)',
            fontSize: 'var(--font-sm)',
            marginBottom: 'var(--space-2)'
          }}
        >
          {description}
        </div>
      )}

      <div className="select-container">
        <div
          className={`select-trigger ${isOpen ? 'open' : ''} ${error ? 'error' : ''}`}
          style={{
            ...sizeStyles[size],
            background: disabled 
              ? 'var(--input-bg-disabled)' 
              : isOpen || isHover
                ? 'var(--input-bg-focus)'
                : 'var(--input-bg)',
            borderColor: error
              ? 'var(--border-error)'
              : isOpen
                ? 'var(--input-border-focus)'
                : 'var(--input-border)',
            borderRadius: 'var(--input-border-radius)',
            border: 'var(--border-thin) solid',
            cursor: disabled ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 'var(--space-2)',
            transition: 'var(--transition-fast)',
            position: 'relative'
          }}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          tabIndex={disabled ? -1 : 0}
        >
          <div className="select-content" style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            {multiple && selectedOptions.length > 0 ? (
              <div className="select-tags" style={{ display: 'flex', gap: 'var(--space-1)', flexWrap: 'wrap' }}>
                {selectedOptions.slice(0, 3).map(option => (
                  <span
                    key={option.value}
                    className="select-tag"
                    style={{
                      background: 'var(--color-purple-500)',
                      color: 'var(--color-white)',
                      padding: 'var(--space-1) var(--space-2)',
                      borderRadius: 'var(--radius-base)',
                      fontSize: 'var(--font-xs)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--space-1)'
                    }}
                  >
                    {option.label}
                    <IconX 
                      size="var(--icon-xs)"
                      style={{ cursor: 'pointer' }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOptionSelect(option);
                      }}
                    />
                  </span>
                ))}
                {selectedOptions.length > 3 && (
                  <span
                    style={{
                      color: 'var(--text-secondary)',
                      fontSize: 'var(--font-xs)',
                      padding: 'var(--space-1)'
                    }}
                  >
                    +{selectedOptions.length - 3} more
                  </span>
                )}
              </div>
            ) : (
              <span
                style={{
                  color: getDisplayText() ? 'var(--text-primary)' : 'var(--text-subtle)',
                  fontFamily: 'var(--font-primary)',
                  flex: 1,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}
              >
                {getDisplayText() || placeholder}
              </span>
            )}
          </div>

          <div className="select-icons" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-1)' }}>
            {clearable && (getDisplayText() || (multiple && selectedOptions.length > 0)) && (
              <IconX
                size="var(--icon-sm)"
                style={{ 
                  color: 'var(--text-tertiary)',
                  cursor: 'pointer'
                }}
                onClick={handleClear}
              />
            )}
            <IconChevronDown
              size="var(--icon-base)"
              style={{
                color: 'var(--text-tertiary)',
                transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'var(--transition-fast)'
              }}
            />
          </div>
        </div>

        {isOpen && (
          <div
            className="select-dropdown"
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              zIndex: 'var(--z-index-dropdown)',
              background: 'var(--bg-tertiary)',
              border: 'var(--border-thin) solid var(--border-primary)',
              borderRadius: 'var(--radius-lg)',
              boxShadow: 'var(--shadow-lg)',
              marginTop: 'var(--space-1)',
              overflow: 'hidden'
            }}
          >
            {searchable && (
              <div
                className="select-search"
                style={{
                  padding: 'var(--space-3)',
                  borderBottom: 'var(--border-thin) solid var(--border-secondary)'
                }}
              >
                <div style={{ position: 'relative' }}>
                  <IconSearch
                    size="var(--icon-sm)"
                    style={{
                      position: 'absolute',
                      left: 'var(--space-3)',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: 'var(--text-tertiary)'
                    }}
                  />
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search options..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                      width: '100%',
                      padding: 'var(--space-2) var(--space-3) var(--space-2) var(--space-8)',
                      background: 'var(--input-bg)',
                      border: 'var(--border-thin) solid var(--input-border)',
                      borderRadius: 'var(--radius-md)',
                      color: 'var(--text-primary)',
                      fontFamily: 'var(--font-primary)',
                      fontSize: 'var(--font-sm)',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>
            )}

            <div
              ref={listRef}
              className="select-options"
              style={{
                maxHeight: `${maxHeight}px`,
                overflowY: 'auto',
                padding: 'var(--space-2) 0'
              }}
            >
              {filteredOptions.length === 0 ? (
                <div
                  style={{
                    padding: 'var(--space-4)',
                    color: 'var(--text-tertiary)',
                    textAlign: 'center',
                    fontSize: 'var(--font-sm)'
                  }}
                >
                  No options found
                </div>
              ) : (
                filteredOptions.map((option, index) => {
                  const isSelected = multiple
                    ? Array.isArray(normalizedValue) && normalizedValue.includes(option.value)
                    : normalizedValue === option.value;
                  const isFocused = index === focusedIndex;

                  return (
                    <div
                      key={option.value}
                      className="select-option"
                      style={{
                        padding: 'var(--space-3) var(--space-4)',
                        cursor: option.disabled ? 'not-allowed' : 'pointer',
                        background: option.disabled
                          ? 'transparent'
                          : isFocused
                            ? 'var(--bg-elevated)'
                            : isSelected
                              ? 'var(--color-purple-500)20'
                              : 'transparent',
                        color: option.disabled
                          ? 'var(--text-disabled)'
                          : isSelected
                            ? 'var(--color-purple-400)'
                            : 'var(--text-primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        fontSize: 'var(--font-sm)',
                        fontFamily: 'var(--font-primary)',
                        transition: 'var(--transition-fast)'
                      }}
                      onClick={() => !option.disabled && handleOptionSelect(option)}
                      onMouseEnter={() => setFocusedIndex(index)}
                    >
                      <div>
                        <div style={{ fontWeight: isSelected ? 'var(--font-weight-medium)' : 'var(--font-weight-normal)' }}>
                          {option.label}
                        </div>
                        {option.description && (
                          <div style={{ 
                            fontSize: 'var(--font-xs)', 
                            color: 'var(--text-secondary)',
                            marginTop: 'var(--space-0_5)'
                          }}>
                            {option.description}
                          </div>
                        )}
                      </div>
                      {isSelected && (
                        <IconCheck
                          size="var(--icon-sm)"
                          style={{ color: 'var(--color-purple-400)' }}
                        />
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}
      </div>

      {error && (
        <div
          className="select-error"
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
        .select-wrapper {
          position: relative;
          width: 100%;
        }

        .select-container {
          position: relative;
        }

        .select-trigger:focus {
          outline: none;
          box-shadow: var(--focus-ring);
        }

        .select-options {
          scrollbar-width: thin;
          scrollbar-color: var(--color-gray-600) transparent;
        }

        .select-options::-webkit-scrollbar {
          width: 6px;
        }

        .select-options::-webkit-scrollbar-track {
          background: transparent;
        }

        .select-options::-webkit-scrollbar-thumb {
          background-color: var(--color-gray-600);
          border-radius: 3px;
        }

        .select-options::-webkit-scrollbar-thumb:hover {
          background-color: var(--color-gray-500);
        }
      `}</style>
    </div>
  );
};