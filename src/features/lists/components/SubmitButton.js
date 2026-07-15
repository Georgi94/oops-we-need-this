'use client';
// Must be a child of <form> so useFormStatus reads the parent form's pending state.

import { useFormStatus } from 'react-dom';

export function SubmitButton({ className, children, pendingLabel = 'Момент…' }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className={className}>
      {pending ? pendingLabel : children}
    </button>
  );
}
