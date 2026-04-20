"use client"

import { useRef, useEffect, useState, useCallback } from "react"

interface WheelPickerProps {
  items: string[]
  selectedValue: string
  onValueChange: (value: string) => void
}

const ITEM_HEIGHT = 50

export function WheelPicker({ items, selectedValue, onValueChange }: WheelPickerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const scrollTimeoutRef = useRef<NodeJS.Timeout>()
  const velocityRef = useRef(0)
  const lastScrollTopRef = useRef(0)
  const lastTimeRef = useRef(Date.now())

  const selectedIndex = items.indexOf(selectedValue)

  // Initialize scroll position
  useEffect(() => {
    if (containerRef.current && selectedIndex !== -1) {
      const scrollTop = selectedIndex * ITEM_HEIGHT - ITEM_HEIGHT * 2
      containerRef.current.scrollTop = scrollTop
      lastScrollTopRef.current = scrollTop
    }
  }, [selectedIndex, items.length])

  // Snap to nearest item
  const snapToClosest = useCallback(() => {
    if (!containerRef.current) return

    const scrollTop = containerRef.current.scrollTop
    const index = Math.round(scrollTop / ITEM_HEIGHT)
    const snappedIndex = Math.max(0, Math.min(index, items.length - 1))
    const snappedValue = items[snappedIndex]

    if (snappedValue !== selectedValue) {
      onValueChange(snappedValue)
    }

    // Smooth snap to exact position
    const targetScroll = snappedIndex * ITEM_HEIGHT - ITEM_HEIGHT * 2
    if (Math.abs(containerRef.current.scrollTop - targetScroll) > 1) {
      containerRef.current.scrollTo({
        top: targetScroll,
        behavior: "smooth",
      })
    }
  }, [selectedValue, items, onValueChange])

  // Handle scroll with debouncing
  const handleScroll = useCallback(() => {
    if (!containerRef.current) return

    const now = Date.now()
    const scrollTop = containerRef.current.scrollTop
    const timeDiff = now - lastTimeRef.current

    // Calculate velocity for momentum
    if (timeDiff > 0) {
      velocityRef.current = (scrollTop - lastScrollTopRef.current) / timeDiff
    }

    lastScrollTopRef.current = scrollTop
    lastTimeRef.current = now

    setIsAnimating(true)

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current)
    }

    // Increase debounce time for better stability
    scrollTimeoutRef.current = setTimeout(() => {
      setIsAnimating(false)
      snapToClosest()
    }, 200)
  }, [snapToClosest])

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [])

  return (
    <div className="relative overflow-hidden">
      {/* Center highlight background */}
      <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-14 bg-gray-200 z-10 pointer-events-none rounded-lg" />

      {/* Top divider line */}
      <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-px bg-gray-300 z-20 pointer-events-none" />

      {/* Bottom divider line */}
      <div className="absolute top-1/2 left-0 right-0 translate-y-1/2 h-px bg-gray-300 z-20 pointer-events-none" />

      {/* Scroll container - increased height to 280px */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="h-72 overflow-y-scroll"
        style={{
          scrollBehavior: "smooth",
          WebkitOverflowScrolling: "touch",
          msOverflowStyle: "none",
          scrollbarWidth: "none",
        }}
      >
        {/* Hide scrollbar for all browsers */}
        <style>{`
          div[class*="overflow-y-scroll"]::-webkit-scrollbar {
            display: none;
          }
        `}</style>

        {/* Top padding - 2 items */}
        <div style={{ height: ITEM_HEIGHT * 2 }} className="flex-shrink-0" />

        {/* Items with improved styling */}
        {items.map((item, index) => {
          const distance = Math.abs(index - selectedIndex)
          const isSelected = index === selectedIndex
          const isNearby = distance === 1
          const isVisible = distance <= 2

          return (
            <div
              key={`${item}-${index}`}
              style={{ height: ITEM_HEIGHT }}
              className={`flex items-center justify-center text-xl transition-all duration-150 flex-shrink-0 ${
                isSelected
                  ? "font-bold text-gray-900"
                  : isNearby
                    ? "font-normal text-gray-500"
                    : isVisible
                      ? "font-normal text-gray-300"
                      : "font-normal text-gray-100"
              }`}
            >
              {item}
            </div>
          )
        })}

        {/* Bottom padding - 2 items */}
        <div style={{ height: ITEM_HEIGHT * 2 }} className="flex-shrink-0" />
      </div>
    </div>
  )
}
