interface TestimonialCardProps {
  name: string
  title: string
  image: string
  testimonial: string
}

export function TestimonialCard({ name, title, image, testimonial }: TestimonialCardProps) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 box-border">
      <div className="flex items-center gap-3 mb-4">
        <div>
          <h3 className="font-semibold text-gray-900">{name}</h3>
          <p className="text-sm text-gray-600">{title}</p>
        </div>
      </div>
      <p className="text-gray-700 leading-relaxed">{testimonial}</p>
    </div>
  )
}
