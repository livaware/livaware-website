import Heading from '../Typography/Heading'

export default function BigTextBlock({
  mainText,
  bottomText,
}: {
  mainText: string
  bottomText?: string
}) {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center px-10 text-center">
      <div className="h-32"></div>
      <Heading variant="h1">{mainText}</Heading>
      <div className="flex h-32 flex-row items-end">
        {bottomText && (
          <p className="mb-10 text-center text-2xl">{bottomText}</p>
        )}
      </div>
    </div>
  )
}
