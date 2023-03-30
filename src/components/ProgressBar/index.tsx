export default function ProgressBar({ progress }: { progress: number }) {
  return (
    <div className="w-full h-1">
      <div
        className="bg-brand-green h-1 transition-all"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  )
}
