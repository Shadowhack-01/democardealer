import { useCallback, useEffect, useState } from "react"

export function useInView(threshold = 0.1) {
  const [isInView, setIsInView] = useState(false)
  const [node, setNode] = useState<Element | null>(null)

  useEffect(() => {
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [node, threshold])

  const ref = useCallback((el: Element | null) => {
    setNode(el)
  }, [])

  return { ref, isInView }
}
