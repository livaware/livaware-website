import useWindowSize from './useWindowSize'

export default function useIsMobile() {
  const size = useWindowSize()
  return (size.width ?? 0) <= 768
}
