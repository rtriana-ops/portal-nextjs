import Image from "next/image"

export function FeatureList() {
  const features = [
    {
      icon: "/icons/analysis.svg",
      text: "Start with a few basic details.",
      bgColor: "#8B3A3A",
    },
    {
      icon: "/icons/plug.svg",
      text: "Connect your bank securely with Plaid.",
      bgColor: "#10A37F",
    },
    {
      icon: "/icons/dollar-sign.svg",
      text: "Get your Advance and move forward right away.",
      bgColor: "#00A3E0",
    },
  ]

  return (
    <div className="space-y-4">
      {features.map((feature, index) => (
        <div key={index} className="flex items-start gap-4">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: feature.bgColor }}
          >
            <Image src={feature.icon || "/placeholder.svg"} alt="" width={20} height={20} className="w-5 h-5" />
          </div>
          <p className={`text-foreground text-base leading-relaxed pt-0 ${index === 2 ? "font-bold" : ""}`}>
            {feature.text}
          </p>
        </div>
      ))}
    </div>
  )
}
