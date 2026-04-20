interface PromoCardsProps {
  variant?: 'grid' | 'horizontal'
}

export function PromoCards({ variant = 'grid' }: PromoCardsProps) {
  const containerClasses = variant === 'horizontal' 
    ? 'flex flex-row md:flex-row gap-4 mb-6 overflow-x-auto md:overflow-visible flex-nowrap -mx-2 px-2 lg:mx-0 lg:px-0 [&::-webkit-scrollbar]:h-0 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-transparent scrollbar-hide mt-0'
    : 'flex flex-col 2xl:flex-row gap-4 text-left items-center'

  const cardClasses = variant === 'horizontal'
    ? 'flex-shrink-0'
    : ''

  return (
    <div className={containerClasses}>
      {/* Blue Promo Card - You're approved for an advance */}
      <div className={`bg-[#1e40af] rounded-sm overflow-hidden w-[277px] h-[122px] flex items-stretch ${cardClasses}`}>
        <div className="w-[65%] p-6 text-white flex flex-col justify-between px-2.5 py-2.5 bg-cyan-300">
          <div>
            <h3 className="font-bold leading-tight text-sm mb-1 font-serif leading-4 text-blue-900">
              You&apos;re approved for an advance
            </h3>
            <p className="font-light text-xs leading-4 text-blue-900">
              Apply in Minutes, Competitive rates
            </p>
          </div>
          <button className="bg-white text-[#1e40af] rounded-full w-fit hover:bg-gray-100 text-xs py-1 px-3 font-medium text-slate-900">
            Get Your Advance
          </button>
        </div>
        <div className="w-[35%] overflow-hidden bg-cyan-300">
          <img 
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/woman-wih-flyng-money%202-RPqvgICVxyCOWAlpFYYmwiiDmv8K5i.png" 
            alt="Approved advance" 
            className="object-cover bg-cyan-300 w-24 h-24 mt-3" 
          />
        </div>
      </div>

      {/* Cyan Promo Card - Special Early Pay-Off Offer */}
      <div className={`bg-[#0891b2] rounded-sm overflow-hidden w-[277px] h-[122px] flex items-stretch ${cardClasses}`}>
        <div className="w-[65%] p-6 text-white flex flex-col justify-between bg-teal-300 px-2.5 py-2.5">
          <div>
            <h3 className="font-bold leading-tight text-sm text-blue-900 mb-1">
              Special Early Pay-Off Offer
            </h3>
            <p className="font-light text-blue-900 leading-4 text-xs">
              Please add your content here. Keep it short.
            </p>
          </div>
          <button className="bg-white text-[#0891b2] rounded-full font-bold w-fit hover:bg-gray-100 px-3 py-1 text-xs">
            Chat with us
          </button>
        </div>
        <div className="w-[35%] overflow-hidden bg-teal-300">
          <img 
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/offer-celebration-akbeyStop2TvnNgm0DNWgqqEIwhCTV.png" 
            alt="Early payoff offer" 
            className="object-cover bg-teal-300 w-24 h-24 mt-2.5" 
          />
        </div>
      </div>
    </div>
  )
}
