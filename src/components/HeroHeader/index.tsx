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
    <div
      className="bg-cover"
      style={{
        backgroundImage: `url(${imageUrl})`,
      }}
    >
      <div className="relative grid min-h-screen-minus-header grid-cols-1 grid-rows-1 md:grid-cols-2 md:grid-rows-1">
        <div className="bg-brand-navy bg-opacity-80 p-10 text-white">
          <span
            className="border-b"
            style={{
              borderColor: underlineColor,
            }}
          >
            {topText}
          </span>
          <h1>{mainText}</h1>
          <h2>{subTitleText}</h2>
        </div>
        <div className="hidden md:block"></div>
      </div>
    </div>
  )
}
