import { useCallback, useEffect, useState } from "react"

export function useInView<T extends Element = HTMLElement>(threshold = 0.1) {
  const [isInView, setIsInView] = useState(false)
  const [node, setNode] = useState<T | null>(null)

  useEffect(() => {
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [node, threshold])

  const ref = useCallback((el: T | null) => {
    setNode(el)
  }, [])

  return { ref, isInView } as { ref: (el: T | null) => void; isInView: boolean }
}
