import PortableTextRenderer from '@/lib/PortableTextRenderer'

export default function ColumnsBlock({
  leftContent,
  rightContent,
}: {
  leftContent: any
  rightContent: any
}) {
  return (
    <div className="my-8 mx-4 grid grid-cols-1 gap-4 md:mx-8 md:grid-cols-2">
      <div className="relative">
        <PortableTextRenderer content={leftContent} />
      </div>
      <div className="relative">
        <PortableTextRenderer content={rightContent} />
      </div>
    </div>
  )
}
