'use client';

import React, { useEffect, useRef } from 'react';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  children: React.ReactNode;
  closeOnBackdropClick?: boolean;
  closeOnEscape?: boolean;
  showCloseButton?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export function Modal({
  isOpen,
  onClose,
  size = 'md',
  children,
  closeOnBackdropClick = true,
  closeOnEscape = true,
  showCloseButton = true,
  className,
  style,
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // Handle escape key
  useEffect(() => {
    if (!isOpen || !closeOnEscape) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, closeOnEscape, onClose]);

  // Handle focus management
  useEffect(() => {
    if (isOpen) {
      // Store the currently focused element
      previousActiveElement.current = document.activeElement as HTMLElement;
      
      // Focus the modal
      if (modalRef.current) {
        modalRef.current.focus();
      }
      
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
    } else {
      // Restore focus to previously focused element
      if (previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
      
      // Restore body scroll
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const getSizeStyles = (size: string) => {
    switch (size) {
      case 'sm':
        return { width: 'var(--modal-sm-width)', maxWidth: '90vw' };
      case 'md':
        return { width: 'var(--modal-md-width)', maxWidth: '90vw' };
      case 'lg':
        return { width: 'var(--modal-lg-width)', maxWidth: '90vw' };
      case 'xl':
        return { width: 'var(--modal-xl-width)', maxWidth: '90vw' };
      case 'full':
        return { width: 'var(--modal-full-width)', height: 'calc(100vh - var(--space-8))', maxWidth: 'none' };
      default:
        return { width: 'var(--modal-md-width)', maxWidth: '90vw' };
    }
  };

  const handleBackdropClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget && closeOnBackdropClick) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="modal-backdrop"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'var(--modal-backdrop-bg)',
        backdropFilter: 'var(--modal-backdrop-blur)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--space-4)',
        zIndex: 'var(--z-index-modal)',
      }}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
    >
      <div
        ref={modalRef}
        className={`modal ${className || ''}`}
        style={{
          background: 'var(--modal-bg)',
          borderRadius: 'var(--modal-border-radius)',
          border: `var(--border-thin) solid var(--modal-border)`,
          boxShadow: 'var(--modal-shadow)',
          maxHeight: '90vh',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          outline: 'none',
          ...getSizeStyles(size),
          ...style,
        }}
        tabIndex={-1}
      >
        {showCloseButton && (
          <button
            onClick={onClose}
            className="modal-close-button"
            style={{
              position: 'absolute',
              top: 'var(--space-4)',
              right: 'var(--space-4)',
              background: 'transparent',
              border: 'none',
              color: 'var(--text-tertiary)',
              cursor: 'pointer',
              padding: 'var(--space-1)',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'var(--transition-fast)',
              zIndex: 1,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--bg-elevated)';
              e.currentTarget.style.color = 'var(--text-primary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = 'var(--text-tertiary)';
            }}
            aria-label="Close modal"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        )}
        {children}
      </div>
    </div>
  );
}

// Modal Header Component
export interface ModalHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function ModalHeader({ children, className, style, ...props }: ModalHeaderProps) {
  return (
    <div
      className={`modal-header ${className || ''}`}
      style={{
        padding: 'var(--modal-header-padding)',
        borderBottom: `var(--border-thin) solid var(--modal-header-border)`,
        ...style
      }}
      {...props}
    >
      {children}
    </div>
  );
}

// Modal Title Component
export interface ModalTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export function ModalTitle({ children, as: Component = 'h2', className, style, ...props }: ModalTitleProps) {
  return (
    <Component
      className={`modal-title ${className || ''}`}
      style={{
        fontSize: 'var(--font-xl)',
        fontWeight: 'var(--font-weight-semibold)',
        color: 'var(--text-primary)',
        margin: 0,
        lineHeight: 'var(--line-height-tight)',
        paddingRight: 'var(--space-8)', // Space for close button
        ...style
      }}
      {...props}
    >
      {children}
    </Component>
  );
}

// Modal Body Component
export interface ModalBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function ModalBody({ children, className, style, ...props }: ModalBodyProps) {
  return (
    <div
      className={`modal-body ${className || ''}`}
      style={{
        padding: 'var(--modal-padding)',
        flex: 1,
        overflow: 'auto',
        color: 'var(--text-primary)',
        ...style
      }}
      {...props}
    >
      {children}
    </div>
  );
}

// Modal Footer Component
export interface ModalFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function ModalFooter({ children, className, style, ...props }: ModalFooterProps) {
  return (
    <div
      className={`modal-footer ${className || ''}`}
      style={{
        padding: 'var(--modal-footer-padding)',
        borderTop: `var(--border-thin) solid var(--modal-footer-border)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: 'var(--space-3)',
        ...style
      }}
      {...props}
    >
      {children}
    </div>
  );
}

// Confirmation Modal - Common pattern
export interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'default' | 'danger';
}

export function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'default'
}: ConfirmationModalProps) {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <ModalHeader>
        <ModalTitle>{title}</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
          {message}
        </p>
      </ModalBody>
      <ModalFooter>
        <button
          onClick={onClose}
          style={{
            background: 'transparent',
            color: 'var(--text-secondary)',
            border: `var(--border-thin) solid var(--border-secondary)`,
            borderRadius: 'var(--radius-lg)',
            padding: 'var(--space-2_5) var(--space-4)',
            fontSize: 'var(--font-base)',
            fontFamily: 'var(--font-primary)',
            cursor: 'pointer',
            transition: 'var(--transition-fast)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--bg-elevated)';
            e.currentTarget.style.color = 'var(--text-primary)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = 'var(--text-secondary)';
          }}
        >
          {cancelText}
        </button>
        <button
          onClick={handleConfirm}
          style={{
            background: variant === 'danger' ? 'var(--color-error)' : 'var(--color-purple-500)',
            color: 'var(--color-white)',
            border: `var(--border-thin) solid ${variant === 'danger' ? 'var(--color-error)' : 'var(--color-purple-500)'}`,
            borderRadius: 'var(--radius-lg)',
            padding: 'var(--space-2_5) var(--space-4)',
            fontSize: 'var(--font-base)',
            fontFamily: 'var(--font-primary)',
            fontWeight: 'var(--font-weight-medium)',
            cursor: 'pointer',
            transition: 'var(--transition-fast)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = variant === 'danger' ? 'var(--color-red-400)' : 'var(--color-purple-400)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = variant === 'danger' ? 'var(--color-error)' : 'var(--color-purple-500)';
          }}
        >
          {confirmText}
        </button>
      </ModalFooter>
    </Modal>
  );
}