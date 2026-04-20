import Image from "next/image"

export function HeroImage() {
  return (
    <div className="relative w-full h-full lg:min-h-[600px] flex flex-col lg:block">
      {/* Main driver image */}
      <div className="hidden lg:block relative w-full lg:h-[700px] rounded-3xl overflow-hidden">
        <Image
          id="image"
          src="/images/image-right-column-desktop.png"
          alt="Professional driver"
          fill
          className="object-contain w-full h-full"
        />
      </div>
    </div>
  )
}
