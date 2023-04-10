import Heading from '../Typography/Heading'

export default function BigTextBlock({
  mainText,
  bottomText,
  topText,
}: {
  mainText: string
  bottomText?: string
  topText?: string
}) {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center px-10 text-center">
      <div className="h-32">
        {topText && <p className="my-10">{topText}</p>}
      </div>
      <Heading variant="h1" className="whitespace-pre-line">
        {mainText}
      </Heading>
      <div className="flex h-32 flex-row items-end">
        {bottomText && <p className="mb-10">{bottomText}</p>}
      </div>
    </div>
  )
}
