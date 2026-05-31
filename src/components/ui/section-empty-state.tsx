interface SectionEmptyStateProps {
  readonly message: string;
}

/**
 * SectionEmptyState displays a styled message when a section has no content
 * or encounters an error. Used as ErrorBoundary fallback.
 *
 * Validates: Requirements 10.6
 */
export function SectionEmptyState({ message }: SectionEmptyStateProps) {
  return (
    <div
      className="flex min-h-[200px] items-center justify-center rounded-xl border border-dashed border-border bg-muted/30 p-8"
      role="status"
      aria-live="polite"
    >
      <p className="text-center text-muted-foreground">{message}</p>
    </div>
  );
}
