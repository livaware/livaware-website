export default function splitCharacters(input: string) {
  return Array.from(input).map((x, i) => (
    <span key={i} className="opacity-0">
      {x}
    </span>
  ))
}
