import Heading from '../Typography/Heading'

export default function HeroHeader({
  topText,
  mainText,
  subTitleText,
  underlineColor,
  imageUrl,
}: {
  topText?: string
  mainText?: string
  subTitleText?: string
  underlineColor?: string
  imageUrl?: string
}) {
  return (
    <div className="relative grid min-h-screen-minus-header grid-cols-1 grid-rows-1 md:grid-cols-2 md:grid-rows-1">
      <div className="bg-brand-navy p-10 text-white">
        <span
          className="border-b pb-1 text-lg font-light"
          style={{
            borderColor: underlineColor,
          }}
        >
          {topText}
        </span>
        <Heading variant="h1" className="pt-20 pb-11">
          {mainText}
        </Heading>
        <p className="text-lg">{subTitleText}</p>
      </div>
      <div
        className="hidden bg-cover md:block"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      ></div>
    </div>
  )
}
