export default function ProgressBar({
  progress,
  className,
}: {
  progress: number
  className?: string
}) {
  return (
    <div className={`w-full h-1 ${className}`}>
      <div
        className="bg-brand-green h-1 [transition:width_0.3s]"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  )
}
