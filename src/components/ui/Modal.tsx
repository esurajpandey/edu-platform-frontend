'use client';

import { ReactNode, useEffect, useId, useRef } from 'react';
import { createPortal } from 'react-dom';
import Icon from '@/components/Icon';
import { cn } from '@/lib/cn';
import { ModalSize } from '@/types';
import Button from './Button';

const modalSizeClasses: Record<ModalSize, string> = {
  sm: 'max-w-md',
  md: 'max-w-xl',
  lg: 'max-w-3xl',
  xl: 'max-w-5xl',
};

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  size?: ModalSize;
  closeOnBackdrop?: boolean;
  closeOnEscape?: boolean;
  hideCloseButton?: boolean;
  panelClassName?: string;
  bodyClassName?: string;
  overlayClassName?: string;
};

export default function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  size = 'md',
  closeOnBackdrop = true,
  closeOnEscape = true,
  hideCloseButton = false,
  panelClassName,
  bodyClassName,
  overlayClassName,
}: ModalProps) {
  const titleId = useId();
  const descriptionId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const previousActiveElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen || !closeOnEscape) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [closeOnEscape, isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    previousActiveElementRef.current = document.activeElement as HTMLElement | null;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const panel = panelRef.current;
    if (panel) {
      const focusableElements = panel.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );

      const initialTarget = focusableElements[0] ?? panel;
      window.requestAnimationFrame(() => {
        initialTarget.focus();
      });
    }

    return () => {
      document.body.style.overflow = originalOverflow;
      previousActiveElementRef.current?.focus();
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const panel = panelRef.current;
    if (!panel) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') {
        return;
      }

      const focusableElements = Array.from(
        panel.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => !element.hasAttribute('hidden'));

      if (focusableElements.length === 0) {
        event.preventDefault();
        panel.focus();
        return;
      }

      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];
      const activeElement = document.activeElement as HTMLElement | null;

      if (event.shiftKey && activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    panel.addEventListener('keydown', handleKeyDown);
    return () => panel.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  if (!isOpen || typeof document === 'undefined') {
    return null;
  }

  return createPortal(
    <div
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center bg-text/45 px-4 py-8 backdrop-blur-[2px]',
        overlayClassName,
      )}
      onClick={closeOnBackdrop ? onClose : undefined}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-describedby={description ? descriptionId : undefined}
        tabIndex={-1}
        ref={panelRef}
        className={cn(
          'w-full max-h-[calc(100vh-4rem)] overflow-hidden rounded-[28px] border border-surfaceSoft bg-surface shadow-[0_24px_80px_rgba(31,41,55,0.18)]',
          modalSizeClasses[size],
          panelClassName,
        )}
        onClick={(event) => event.stopPropagation()}
      >
        {(title || description || !hideCloseButton) && (
          <div className="flex items-start justify-between gap-4 border-b border-surfaceSoft px-6 py-5">
            <div className="min-w-0">
              {title ? (
                <h2 id={titleId} className="text-xl font-semibold tracking-tight text-text">
                  {title}
                </h2>
              ) : null}
              {description ? (
                <p id={descriptionId} className="mt-1 text-sm text-textLight">
                  {description}
                </p>
              ) : null}
            </div>
            {!hideCloseButton ? (
              <Button
                aria-label="Close modal"
                variant="ghost"
                tone="neutral"
                size="small"
                className="min-h-10 min-w-10 px-0"
                onClick={onClose}
              >
                <Icon name="close" size="small" />
              </Button>
            ) : null}
          </div>
        )}

        <div className={cn('max-h-[calc(100vh-12rem)] overflow-y-auto px-6 py-6', bodyClassName)}>
          {children}
        </div>

        {footer ? <div className="border-t border-surfaceSoft px-6 py-5">{footer}</div> : null}
      </div>
    </div>,
    document.body,
  );
}
