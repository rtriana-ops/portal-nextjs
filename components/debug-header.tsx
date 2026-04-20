"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronRight } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

export function DebugHeader() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [expandedMenus, setExpandedMenus] = useState<string[]>([])

  const toggleSubmenu = (menuName: string) => {
    setExpandedMenus((prev) =>
      prev.includes(menuName) ? prev.filter((m) => m !== menuName) : [...prev, menuName]
    )
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <button
          className="hidden lg:block w-full h-[30px] bg-black hover:bg-gray-900 transition-colors cursor-pointer"
          aria-label="Navigation menu"
        >
          <span className="sr-only">Open navigation menu</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-64 max-h-[80vh] overflow-y-auto">
        {/* CONFIRMATION INFO */}
        <div className="px-2 py-2">
          <div className="text-xs font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded mb-1">CONFIRMATION INFO</div>
          <DropdownMenuItem onClick={() => router.push("/")} className="cursor-pointer">
            Home
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/add-number")} className="cursor-pointer">
            /add-number
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/first-name")} className="cursor-pointer">
            /first-name
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/last-name")} className="cursor-pointer">
            /last-name
          </DropdownMenuItem>
        </div>

        <DropdownMenuSeparator />

        {/* INCOME INFO */}
        <div className="px-2 py-2">
          <div className="text-xs font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded mb-1">INCOME INFO</div>
          <DropdownMenuItem onClick={() => router.push("/income")} className="cursor-pointer">
            /income
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/business-owner-company-name")} className="cursor-pointer">
            /business-owner-company-name
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/business-start-date")} className="cursor-pointer">
            /business-start-date
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/ownership")} className="cursor-pointer">
            /ownership
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push("/independent-contractor-company-name")}
            className="cursor-pointer"
          >
            /independent-contractor-company-name
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push("/independent-contractor-start-date")}
            className="cursor-pointer"
          >
            /independent-contractor-start-date
          </DropdownMenuItem>
        </div>

        <DropdownMenuSeparator />

        {/* LIGHTNING */}
        <div className="px-2 py-2">
          <div className="text-xs font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded mb-1">LIGHTNING</div>
          <DropdownMenuItem onClick={() => router.push("/lightning-home-address-step-1")} className="cursor-pointer">
            /lightning-home-address-step-1
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/lightning-state-of-residence-step-2")} className="cursor-pointer">
            /lightning-state-of-residence-step-2
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/lightning-date-of-birth-step-3")} className="cursor-pointer">
            /lightning-date-of-birth-step-3
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/lightning-ssn-verification-step-4")} className="cursor-pointer">
            /lightning-ssn-verification-step-4
          </DropdownMenuItem>
        </div>

        <DropdownMenuSeparator />

        {/* RESELLING */}
        <div className="px-2 py-2">
          <div className="text-xs font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded mb-1">RESELLING</div>
          <DropdownMenuItem onClick={() => router.push("/loader-reselling")} className="cursor-pointer">
            /loader-reselling
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/current-situation")} className="cursor-pointer">
            /current-situation
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/employer-name")} className="cursor-pointer">
            /employer-name
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/job-title")} className="cursor-pointer">
            /job-title
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/begin-working")} className="cursor-pointer">
            /begin-working
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/work-schedule")} className="cursor-pointer">
            /work-schedule
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/monthly-income")} className="cursor-pointer">
            /monthly-income
          </DropdownMenuItem>

          {/* reselling-w2 submenu */}
          <div className="ml-2 my-1">
            <button
              onClick={() => toggleSubmenu("reselling-w2")}
              className="w-full flex items-center justify-between px-2 py-1 text-sm rounded hover:bg-gray-100"
            >
              <span>reselling-w2</span>
              <ChevronRight
                size={16}
                className={`transition-transform ${expandedMenus.includes("reselling-w2") ? "rotate-90" : ""}`}
              />
            </button>
            {expandedMenus.includes("reselling-w2") && (
              <div className="ml-2 space-y-0.5">
                <DropdownMenuItem
                  onClick={() => router.push("/reselling-w2-step1")}
                  className="cursor-pointer text-sm"
                >
                  /reselling-w2-step1
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => router.push("/reselling-w2-step2")}
                  className="cursor-pointer text-sm"
                >
                  /reselling-w2-step2
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => router.push("/reselling-w2-step3")}
                  className="cursor-pointer text-sm"
                >
                  /reselling-w2-step3
                </DropdownMenuItem>
              </div>
            )}
          </div>

          {/* reselling-lightning submenu */}
          <div className="ml-2 my-1">
            <button
              onClick={() => toggleSubmenu("reselling-lightning")}
              className="w-full flex items-center justify-between px-2 py-1 text-sm rounded hover:bg-gray-100"
            >
              <span>reselling-lightning</span>
              <ChevronRight
                size={16}
                className={`transition-transform ${expandedMenus.includes("reselling-lightning") ? "rotate-90" : ""}`}
              />
            </button>
            {expandedMenus.includes("reselling-lightning") && (
              <div className="ml-2 space-y-0.5">
                <DropdownMenuItem
                  onClick={() => router.push("/reselling-lightning-step-1")}
                  className="cursor-pointer text-sm"
                >
                  /reselling-lightning-step-1
                </DropdownMenuItem>
              </div>
            )}
          </div>

          {/* reselling-WaOC submenu */}
          <div className="ml-2 my-1">
            <button
              onClick={() => toggleSubmenu("reselling-WaOC")}
              className="w-full flex items-center justify-between px-2 py-1 text-sm rounded hover:bg-gray-100"
            >
              <span>/reselling-WaOC</span>
              <ChevronRight
                size={16}
                className={`transition-transform ${expandedMenus.includes("reselling-WaOC") ? "rotate-90" : ""}`}
              />
            </button>
            {expandedMenus.includes("reselling-WaOC") && (
              <div className="ml-2 space-y-0.5">
                <DropdownMenuItem
                  onClick={() => router.push("/reselling-WaOC-step-7")}
                  className="cursor-pointer text-sm"
                >
                  /reselling-WaOC-step-7
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => router.push("/reselling-WaOC-step-3")}
                  className="cursor-pointer text-sm"
                >
                  /reselling-WaOC-step-3
                </DropdownMenuItem>
              </div>
            )}
          </div>

          <DropdownMenuItem onClick={() => router.push("/reselling-no-match")} className="cursor-pointer">
            /reselling-no-match
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/reselling-congrats")} className="cursor-pointer">
            /reselling-congrats
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/pay-schedule")} className="cursor-pointer">
            /pay-schedule
          </DropdownMenuItem>
        </div>

        <DropdownMenuSeparator />

        {/* BANK */}
        <div className="px-2 py-2">
          <div className="text-xs font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded mb-1">BANK</div>
          <DropdownMenuItem onClick={() => router.push("/bank-verification")} className="cursor-pointer">
            /bank-verification
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/connect-multiple-bank-accounts")} className="cursor-pointer">
            /connect-multiple-bank-accounts
          </DropdownMenuItem>
        </div>

        <DropdownMenuSeparator />

        {/* PORTAL */}
        <div className="px-2 py-2">
          <div className="text-xs font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded mb-1">PORTAL</div>
          <DropdownMenuItem onClick={() => router.push("/portal-base-design")} className="cursor-pointer">
            /portal-base-design
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/portal-dashboard-advances")} className="cursor-pointer">
            /portal-dashboard-advances
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/portal-advances-listing")} className="cursor-pointer">
            /portal-advances-listing
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/portal-advances-detail")} className="cursor-pointer">
            /portal-advances-detail
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/portal-advances-detail-past-due")} className="cursor-pointer">
            /portal-advances-detail-past-due
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/portal-advances-detail-emptystates")} className="cursor-pointer">
            /portal-advances-detail-emptystates
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/portal-advances-detail-collections")} className="cursor-pointer">
            /portal-advances-detail-collections
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/portal-advances-detail-paidoff")} className="cursor-pointer">
            /portal-advances-detail-paidoff
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/portal-advances-detail-voided")} className="cursor-pointer">
            /portal-advances-detail-voided
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/portal-advances-empty-state")} className="cursor-pointer">
            /portal-advances-empty-state
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/portal-advances-detail-empty-state")} className="cursor-pointer">
            /portal-advances-detail-empty-state
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/portal-unsubscribe-1")} className="cursor-pointer">
            /portal-unsubscribe-1
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/portal-unsubscribe-2")} className="cursor-pointer">
            /portal-unsubscribe-2
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/portal-unsubscribe-3")} className="cursor-pointer">
            /portal-unsubscribe-3
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/portal-unsubscribe-4")} className="cursor-pointer">
            /portal-unsubscribe-4
          </DropdownMenuItem>
        </div>

        <DropdownMenuSeparator />

        {/* COMPLETION PAGES */}
        <div className="px-2 py-2">
          <div className="text-xs font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded mb-1">COMPLETION PAGES</div>
          <DropdownMenuItem onClick={() => router.push("/debit-card")} className="cursor-pointer">
            /debit-card
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/offer-calculation")} className="cursor-pointer">
            /offer-calculation
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/mays-programs")} className="cursor-pointer">
            /mays-programs
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/view-agreement-mays-programs")} className="cursor-pointer">
            /view-agreement-mays-programs
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/offer-calculation-no-offers")} className="cursor-pointer">
            /offer-calculation-no-offers
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/offer-calculation-loader")} className="cursor-pointer">
            /offer-calculation-loader
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/re-sign-agreement")} className="cursor-pointer">
            /re-sign-agreement
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/view-agreement")} className="cursor-pointer">
            /view-agreement
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/documents-verification")} className="cursor-pointer">
            /documents-verification
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/ocrolus")} className="cursor-pointer">
            /ocrolus
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/offer-recovery")} className="cursor-pointer">
            /offer-recovery
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/ocrolus-success")} className="cursor-pointer">
            /ocrolus-success
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/offer-recovery-success")} className="cursor-pointer">
            /offer-recovery-success
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/application-completed")} className="cursor-pointer">
            /application-completed
          </DropdownMenuItem>
        </div>

        <DropdownMenuSeparator />

        {/* CEMENTERY */}
        <div className="px-2 py-2">
          <div className="text-xs font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded mb-1">CEMENTERY</div>
          <DropdownMenuItem onClick={() => router.push("/reselling-lightning-step-2")} className="cursor-pointer">
            /reselling-lightning-step-2
          </DropdownMenuItem>
        </div>

        <DropdownMenuSeparator />

        {/* STATUS PAGES */}
        <div className="px-2 py-2">
          <div className="text-xs font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded mb-1">STATUS PAGES</div>
          <DropdownMenuItem onClick={() => router.push("/loader")} className="cursor-pointer">
            /loader
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/notificacion")} className="cursor-pointer">
            /notificacion
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/not-found")} className="cursor-pointer">
            /not-found
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/verifying")} className="cursor-pointer">
            /verifying
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/loader-layer")} className="cursor-pointer">
            /loader-layer
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/loader-calculation")} className="cursor-pointer">
            /loader-calculation
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/deny-email-ssn")} className="cursor-pointer">
            /deny-email-ssn
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/transition")} className="cursor-pointer">
            /transition
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
