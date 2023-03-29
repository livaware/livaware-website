export default function MenuButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      className="w-min h-min [background-image:linear-gradient(#020121_0_0)] [background-position:0_100%] [background-size:0%_2px] [transition:background-size_0.3s,background-position_0s_0.3s] [background-repeat:no-repeat] hover:[background-position:100%_100%] hover:[background-size:100%_2px] hover:text-bg-dark"
      onClick={onClick}
    >
      Menu
    </button>
  )
}
