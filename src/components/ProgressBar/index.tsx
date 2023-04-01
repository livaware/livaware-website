export default function ProgressBar({
  progress,
  className,
}: {
  progress: number
  className?: string
}) {
  return (
    <div className={`h-1 w-full ${className}`}>
      <div
        className="h-1 bg-brand-green [transition:width_0.3s]"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  )
}
