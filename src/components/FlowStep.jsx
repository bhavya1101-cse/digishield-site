export default function FlowStep({ index, label, isLast }) {
  return (
    <div className="flex items-center">
      <div className="flex flex-col items-center gap-2 text-center">
        <div className="flex h-10 w-10 flex-none items-center justify-center rounded-full border border-accent/40 bg-surface text-sm font-semibold text-accent">
          {index}
        </div>
        <p className="max-w-[6.5rem] text-xs text-muted">{label}</p>
      </div>
      {!isLast && (
        <div className="mx-2 h-px w-8 flex-none bg-border sm:w-12" />
      )}
    </div>
  );
}