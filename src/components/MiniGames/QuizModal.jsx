import React, { useEffect, useRef } from 'react';

const FOCUSABLE = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

// Accessible modal shell for the mini-game quizzes: dialog semantics, Escape to
// close, focus kept inside while open and returned to the opener on close.
const QuizModal = ({ title, onClose, children }) => {
  const dialogRef = useRef(null);

  useEffect(() => {
    const opener = document.activeElement;
    const dialog = dialogRef.current;
    dialog.querySelector(FOCUSABLE)?.focus();

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab') return;
      const focusable = [...dialog.querySelectorAll(FOCUSABLE)];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      opener?.focus?.();
    };
  }, [onClose]);

  return (
    <div className="quiz-modal">
      <div className="quiz-modal-content" role="dialog" aria-modal="true" aria-label={title} ref={dialogRef}>
        <button type="button" className="close-modal-btn" onClick={onClose} aria-label="Close quiz">
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default QuizModal;
