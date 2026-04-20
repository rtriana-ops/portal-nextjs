import Image from "next/image"

export function DriverImage() {
  return (
    <div className="relative w-full max-w-full aspect-[4/5] rounded-3xl overflow-hidden">
      <Image src="/images/banner-image.png" alt="Professional rideshare driver" fill className="object-cover" />
    </div>
  )
}
