import PortableTextRenderer from '@/lib/PortableTextRenderer'

export default function ColumnsBlock({
  leftContent,
  rightContent,
}: {
  leftContent: any
  rightContent: any
}) {
  return (
    <div className="grid grid-cols-2">
      <div>
        <PortableTextRenderer content={leftContent} />
      </div>
      <div>
        <PortableTextRenderer content={rightContent} />
      </div>
    </div>
  )
}
