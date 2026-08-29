'use client';

import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Download, ExternalLink, FileText, X } from 'lucide-react';

const RESUME_SRC = '/fullstack-developer-resume.pdf';
const RESUME_FILE = 'hasan-ekkeri-resume.pdf';

type ResumePreviewProps = {
  open: boolean;
  onClose: () => void;
};

export default function ResumePreview({ open, onClose }: ResumePreviewProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }
      if (event.key !== 'Tab') return;

      const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      if (!focusables?.length) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [open, onClose]);

  // `open` is false during SSR and only flips on a client click, so document.body exists here.
  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-100 flex items-end justify-center sm:items-center sm:p-6">
      <div
        aria-hidden="true"
        onClick={onClose}
        className="absolute inset-0 bg-brand-ink/55 backdrop-blur-[6px]"
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="resume-preview-title"
        className="relative flex h-[92vh] w-full flex-col overflow-hidden rounded-t-[1.75rem] border border-black/8 bg-brand-cream shadow-[0_40px_100px_rgba(17,17,17,0.3)] sm:h-[88vh] sm:max-w-4xl sm:rounded-[1.75rem]"
      >
        <div className="flex items-center justify-between gap-4 border-b border-black/8 bg-white/60 px-5 py-4 sm:px-6">
          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-[0.34em] text-brand-gold">
              Resume
            </p>
            <h2
              id="resume-preview-title"
              className="mt-1 truncate text-[15px] font-medium tracking-[-0.02em] text-brand-ink"
            >
              Hasan Ekkeri — Fullstack Developer
            </h2>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <a
              href={RESUME_SRC}
              target="_blank"
              rel="noreferrer"
              className="hidden h-10 items-center gap-2 rounded-full border border-black/8 bg-white px-4 text-[10px] uppercase tracking-[0.24em] text-brand-ink transition-colors duration-200 hover:bg-brand-paper focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold sm:inline-flex"
            >
              Open
              <ExternalLink size={13} />
            </a>
            <a
              href={RESUME_SRC}
              download={RESUME_FILE}
              className="inline-flex h-10 items-center gap-2 rounded-full bg-brand-ink px-4 text-[10px] uppercase tracking-[0.24em] text-white transition-colors duration-200 hover:bg-[#2B2B2B] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold"
            >
              <span className="hidden sm:inline">Download</span>
              <Download size={13} />
            </a>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close resume preview"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/8 bg-white text-brand-ink transition-colors duration-200 hover:bg-brand-paper focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        <div className="relative flex-1 bg-[#33322F]">
          <iframe
            title="Resume preview"
            src={`${RESUME_SRC}#toolbar=0&navpanes=0&view=FitH`}
            className="hidden h-full w-full sm:block"
          />

          <div className="flex h-full flex-col items-center justify-center gap-6 px-8 text-center sm:hidden">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/12 bg-white/8 text-white">
              <FileText size={24} />
            </div>
            <p className="max-w-70 text-[14px] leading-6 text-white/70">
              Inline PDF preview is unreliable on mobile browsers. Open it in your
              viewer instead.
            </p>
            <div className="flex flex-col items-stretch gap-3">
              <a
                href={RESUME_SRC}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-[10px] uppercase tracking-[0.24em] text-brand-ink"
              >
                Open resume
                <ExternalLink size={14} />
              </a>
              <a
                href={RESUME_SRC}
                download={RESUME_FILE}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/15 px-6 text-[10px] uppercase tracking-[0.24em] text-white"
              >
                Download
                <Download size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
