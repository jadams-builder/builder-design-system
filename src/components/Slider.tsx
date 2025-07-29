'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';

interface SliderProps {
  value?: number | [number, number];
  onChange?: (value: number | [number, number]) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  description?: string;
  error?: string;
  disabled?: boolean;
  showValue?: boolean;
  showTicks?: boolean;
  tickCount?: number;
  formatValue?: (value: number) => string;
  className?: string;
  dual?: boolean;
}

export const Slider: React.FC<SliderProps> = ({
  value = 50,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  label,
  description,
  error,
  disabled = false,
  showValue = false,
  showTicks = false,
  tickCount = 5,
  formatValue = (val) => val.toString(),
  className = '',
  dual = false
}) => {
  const [isDragging, setIsDragging] = useState<'min' | 'max' | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Normalize value to always be array for dual mode, number for single mode
  const normalizedValue = dual
    ? Array.isArray(value) ? value : [min, typeof value === 'number' ? value : max]
    : Array.isArray(value) ? value[0] : value;

  const minValue = dual ? (normalizedValue as [number, number])[0] : min;
  const maxValue = dual ? (normalizedValue as [number, number])[1] : (normalizedValue as number);

  const getPercentage = (val: number) => ((val - min) / (max - min)) * 100;

  const getValueFromPosition = useCallback((clientX: number) => {
    if (!sliderRef.current) return min;
    
    const rect = sliderRef.current.getBoundingClientRect();
    const percentage = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const rawValue = min + percentage * (max - min);
    
    // Round to nearest step
    const steppedValue = Math.round(rawValue / step) * step;
    return Math.max(min, Math.min(max, steppedValue));
  }, [min, max, step]);

  const handleMouseDown = (thumb: 'min' | 'max') => (e: React.MouseEvent) => {
    if (disabled) return;
    e.preventDefault();
    setIsDragging(thumb);
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || disabled) return;
    
    const newValue = getValueFromPosition(e.clientX);
    
    if (dual) {
      const currentValue = normalizedValue as [number, number];
      let newMin = currentValue[0];
      let newMax = currentValue[1];
      
      if (isDragging === 'min') {
        newMin = Math.min(newValue, newMax);
      } else {
        newMax = Math.max(newValue, newMin);
      }
      
      if (onChange) {
        onChange([newMin, newMax]);
      }
    } else {
      if (onChange) {
        onChange(newValue);
      }
    }
  }, [isDragging, disabled, getValueFromPosition, dual, normalizedValue, onChange]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(null);
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const handleTrackClick = (e: React.MouseEvent) => {
    if (disabled || isDragging) return;
    
    const newValue = getValueFromPosition(e.clientX);
    
    if (dual) {
      const currentValue = normalizedValue as [number, number];
      const minDistance = Math.abs(newValue - currentValue[0]);
      const maxDistance = Math.abs(newValue - currentValue[1]);
      
      // Move the closest thumb
      if (minDistance <= maxDistance) {
        if (onChange) {
          onChange([Math.min(newValue, currentValue[1]), currentValue[1]]);
        }
      } else {
        if (onChange) {
          onChange([currentValue[0], Math.max(newValue, currentValue[0])]);
        }
      }
    } else {
      if (onChange) {
        onChange(newValue);
      }
    }
  };

  const handleKeyDown = (thumb: 'min' | 'max') => (e: React.KeyboardEvent) => {
    if (disabled) return;
    
    let delta = 0;
    switch (e.key) {
      case 'ArrowLeft':
      case 'ArrowDown':
        delta = -step;
        break;
      case 'ArrowRight':
      case 'ArrowUp':
        delta = step;
        break;
      case 'Home':
        delta = min - (dual ? (thumb === 'min' ? minValue : maxValue) : maxValue);
        break;
      case 'End':
        delta = max - (dual ? (thumb === 'min' ? minValue : maxValue) : maxValue);
        break;
      case 'PageDown':
        delta = -step * 10;
        break;
      case 'PageUp':
        delta = step * 10;
        break;
      default:
        return;
    }
    
    e.preventDefault();
    
    if (dual) {
      const currentValue = normalizedValue as [number, number];
      let newMin = currentValue[0];
      let newMax = currentValue[1];
      
      if (thumb === 'min') {
        newMin = Math.max(min, Math.min(currentValue[1], currentValue[0] + delta));
      } else {
        newMax = Math.min(max, Math.max(currentValue[0], currentValue[1] + delta));
      }
      
      if (onChange) {
        onChange([newMin, newMax]);
      }
    } else {
      const newValue = Math.max(min, Math.min(max, maxValue + delta));
      if (onChange) {
        onChange(newValue);
      }
    }
  };

  const renderTicks = () => {
    if (!showTicks) return null;
    
    const ticks = [];
    const tickStep = (max - min) / (tickCount - 1);
    
    for (let i = 0; i < tickCount; i++) {
      const tickValue = min + i * tickStep;
      const percentage = getPercentage(tickValue);
      
      ticks.push(
        <div
          key={i}
          className="slider-tick"
          style={{
            position: 'absolute',
            left: `${percentage}%`,
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: '2px',
            height: '8px',
            background: 'var(--color-gray-500)',
            borderRadius: '1px'
          }}
        />
      );
    }
    
    return ticks;
  };

  return (
    <div className={`slider-wrapper ${className}`}>
      {label && (
        <div className="slider-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-2)' }}>
          <label
            className="slider-label"
            style={{
              color: disabled ? 'var(--text-disabled)' : 'var(--text-primary)',
              fontFamily: 'var(--font-primary)',
              fontSize: 'var(--font-sm)',
              fontWeight: 'var(--font-weight-medium)'
            }}
          >
            {label}
          </label>
          {showValue && (
            <div
              className="slider-value"
              style={{
                color: disabled ? 'var(--text-disabled)' : 'var(--text-secondary)',
                fontFamily: 'var(--font-primary)',
                fontSize: 'var(--font-sm)',
                fontWeight: 'var(--font-weight-medium)'
              }}
            >
              {dual
                ? `${formatValue(minValue)} - ${formatValue(maxValue)}`
                : formatValue(maxValue)
              }
            </div>
          )}
        </div>
      )}

      {description && (
        <div
          className="slider-description"
          style={{
            color: disabled ? 'var(--text-disabled)' : 'var(--text-secondary)',
            fontFamily: 'var(--font-primary)',
            fontSize: 'var(--font-sm)',
            marginBottom: 'var(--space-3)',
            lineHeight: 'var(--line-height-normal)'
          }}
        >
          {description}
        </div>
      )}

      <div
        className="slider-container"
        style={{ position: 'relative', padding: 'var(--space-4) 0' }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          ref={sliderRef}
          className="slider-track"
          style={{
            position: 'relative',
            height: '6px',
            background: 'var(--color-gray-700)',
            borderRadius: '3px',
            cursor: disabled ? 'not-allowed' : 'pointer'
          }}
          onClick={handleTrackClick}
        >
          {/* Progress fill */}
          <div
            className="slider-fill"
            style={{
              position: 'absolute',
              top: 0,
              left: dual ? `${getPercentage(minValue)}%` : '0%',
              right: dual ? `${100 - getPercentage(maxValue)}%` : `${100 - getPercentage(maxValue)}%`,
              height: '100%',
              background: disabled
                ? 'var(--color-gray-600)'
                : 'var(--color-purple-500)',
              borderRadius: '3px',
              transition: disabled ? 'none' : 'var(--transition-fast)'
            }}
          />

          {renderTicks()}

          {/* Min thumb (dual mode) */}
          {dual && (
            <div
              className="slider-thumb"
              style={{
                position: 'absolute',
                top: '50%',
                left: `${getPercentage(minValue)}%`,
                transform: 'translate(-50%, -50%)',
                width: '20px',
                height: '20px',
                background: disabled ? 'var(--color-gray-500)' : 'var(--color-white)',
                border: '2px solid',
                borderColor: disabled
                  ? 'var(--color-gray-600)'
                  : isDragging === 'min' || isHovered
                    ? 'var(--color-purple-400)'
                    : 'var(--color-purple-500)',
                borderRadius: '50%',
                cursor: disabled ? 'not-allowed' : 'grab',
                boxShadow: disabled
                  ? 'none'
                  : '0 2px 4px rgba(0, 0, 0, 0.2), 0 1px 2px rgba(0, 0, 0, 0.1)',
                transition: 'var(--transition-fast)',
                zIndex: isDragging === 'min' ? 2 : 1
              }}
              onMouseDown={handleMouseDown('min')}
              onKeyDown={handleKeyDown('min')}
              tabIndex={disabled ? -1 : 0}
              role="slider"
              aria-valuenow={minValue}
              aria-valuemin={min}
              aria-valuemax={dual ? maxValue : max}
              aria-label={`Minimum value: ${formatValue(minValue)}`}
            />
          )}

          {/* Max thumb (or single thumb) */}
          <div
            className="slider-thumb"
            style={{
              position: 'absolute',
              top: '50%',
              left: `${getPercentage(maxValue)}%`,
              transform: 'translate(-50%, -50%)',
              width: '20px',
              height: '20px',
              background: disabled ? 'var(--color-gray-500)' : 'var(--color-white)',
              border: '2px solid',
              borderColor: disabled
                ? 'var(--color-gray-600)'
                : isDragging === 'max' || (isDragging === null && isHovered)
                  ? 'var(--color-purple-400)'
                  : 'var(--color-purple-500)',
              borderRadius: '50%',
              cursor: disabled ? 'not-allowed' : 'grab',
              boxShadow: disabled
                ? 'none'
                : '0 2px 4px rgba(0, 0, 0, 0.2), 0 1px 2px rgba(0, 0, 0, 0.1)',
              transition: 'var(--transition-fast)',
              zIndex: isDragging === 'max' ? 2 : 1,
              outline: 'none'
            }}
            onMouseDown={handleMouseDown('max')}
            onKeyDown={handleKeyDown('max')}
            tabIndex={disabled ? -1 : 0}
            role="slider"
            aria-valuenow={maxValue}
            aria-valuemin={dual ? minValue : min}
            aria-valuemax={max}
            aria-label={dual ? `Maximum value: ${formatValue(maxValue)}` : `Value: ${formatValue(maxValue)}`}
          />
        </div>
      </div>

      {error && (
        <div
          className="slider-error"
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
        .slider-wrapper {
          width: 100%;
        }

        .slider-thumb:focus {
          outline: none;
          box-shadow: var(--focus-ring), 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .slider-thumb:active {
          cursor: grabbing;
        }
      `}</style>
    </div>
  );
};