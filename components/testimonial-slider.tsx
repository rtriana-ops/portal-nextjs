"use client"

import { useState, useEffect } from "react"
import { TestimonialCard } from "./testimonial-card"

const testimonials = [
  {
    name: "John Smith",
    title: "DoorDash Driver",
    image: "/professional-headshot.png",
    testimonial: "Exceptional service! The team exceeded our expectations and delivered a top-notch product on time.",
  },
  {
    name: "Maria Garcia",
    title: "Uber Driver",
    image: "/professional-headshot.png",
    testimonial: "Quick approval and great customer support. Got the funding I needed to grow my business.",
  },
  {
    name: "David Chen",
    title: "Lyft Driver",
    image: "/professional-headshot.png",
    testimonial: "Simple process and fast turnaround. Highly recommend for gig workers looking for financial support.",
  },
]

export function TestimonialSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="w-full space-y-3">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {testimonials.map((testimonial, index) => (
            <div key={index} className="w-full flex-shrink-0 px-1">
              <TestimonialCard {...testimonial} />
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center gap-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentIndex ? "w-8 bg-blue-600" : "w-2 bg-gray-300"
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
