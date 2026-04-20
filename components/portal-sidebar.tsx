'use client'

import Link from 'next/link'
import { X } from 'lucide-react'
import { FundoLogo } from '@/components/fundo-logo'

interface PortalSidebarProps {
  isSidebarOpen: boolean
  setIsSidebarOpen: (open: boolean) => void
}

export function PortalSidebar({ isSidebarOpen, setIsSidebarOpen }: PortalSidebarProps) {
  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:w-80 lg:bg-transparent lg:flex-col lg:px-6 lg:py-8">
        <div className="mb-20">
          <FundoLogo className="h-6 w-auto" />
        </div>

        <nav className="space-y-4">
          <Link
            href="/portal-base-design"
            className="flex items-center gap-3 px-4 py-3 rounded-lg font-medium font-sans text-blue-900 bg-[rgba(209,211,227,1)]"
          >
            <svg className="w-6 h-6" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_14024_120)">
                <path d="M9.63574 -0.0996094C10.6923 -0.0994066 11.5586 0.726117 11.5586 1.75V6.25C11.5586 7.27403 10.6923 8.09941 9.63574 8.09961H1.82324C0.766742 8.09961 -0.0995749 7.27415 -0.0996094 6.25V1.75C-0.0996094 0.725998 0.766728 -0.0996094 1.82324 -0.0996094H9.63574ZM1.82324 1.59961C1.73096 1.59961 1.66211 1.67116 1.66211 1.75V6.25C1.66214 6.32905 1.73103 6.40039 1.82324 6.40039H9.63574C9.72799 6.40019 9.79586 6.32889 9.7959 6.25V1.75C9.7959 1.67132 9.72807 1.59981 9.63574 1.59961H1.82324Z" fill="#05055C" stroke="#05055C" strokeWidth="0.2"/>
                <path d="M9.63574 9.90033C10.6922 9.90053 11.5585 10.7259 11.5586 11.7499V22.2499C11.5586 23.2738 10.6923 24.0993 9.63574 24.0995H1.82324C0.766728 24.0995 -0.0996094 23.2739 -0.0996094 22.2499V11.7499C-0.0995407 10.7258 0.766763 9.90033 1.82324 9.90033H9.63574ZM1.82324 11.5995C1.73106 11.5995 1.66218 11.6709 1.66211 11.7499V22.2499C1.66211 22.3288 1.73096 22.4003 1.82324 22.4003H9.63574C9.72807 22.4001 9.7959 22.3286 9.7959 22.2499V11.7499C9.79583 11.6711 9.72797 11.5997 9.63574 11.5995H1.82324Z" fill="#05055C" stroke="#05055C" strokeWidth="0.2"/>
                <path d="M23.1774 15.9003C24.2337 15.9004 25.1001 16.7259 25.1002 17.7499V22.2499C25.1002 23.2739 24.2338 24.0994 23.1774 24.0995H15.3649C14.3082 24.0995 13.442 23.2739 13.442 22.2499V17.7499C13.4421 16.7258 14.3082 15.9003 15.3649 15.9003H23.1774ZM15.3649 17.5995C15.2724 17.5995 15.2038 17.671 15.2037 17.7499V22.2499C15.2037 22.3287 15.2723 22.4003 15.3649 22.4003H23.1774C23.2695 22.4002 23.3375 22.3287 23.3375 22.2499V17.7499C23.3374 17.671 23.2694 17.5996 23.1774 17.5995H15.3649Z" fill="#05055C" stroke="#05055C" strokeWidth="0.2"/>
                <path d="M23.1774 -0.0996094C24.2338 -0.099506 25.1002 0.726062 25.1002 1.75V12.25C25.1002 13.2741 24.2338 14.0995 23.1774 14.0996H15.3649C14.3082 14.0996 13.442 13.2742 13.442 12.25V1.75C13.442 0.725991 14.3082 -0.0996094 15.3649 -0.0996094H23.1774ZM15.3649 1.59961C15.2723 1.59961 15.2037 1.6712 15.2037 1.75V12.25C15.2038 12.329 15.2724 12.4004 15.3649 12.4004H23.1774C23.2695 12.4003 23.3375 12.329 23.3375 12.25V1.75C23.3375 1.67121 23.2695 1.59971 23.1774 1.59961H15.3649Z" fill="#05055C" stroke="#05055C" strokeWidth="0.2"/>
              </g>
              <defs>
                <clipPath id="clip0_14024_120">
                  <rect width="25" height="24" fill="white"/>
                </clipPath>
              </defs>
            </svg>
            Dashboard
          </Link>

          <Link
            href="#"
            className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg font-sans"
          >
            <svg className="w-6 h-6" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_14024_126)">
                <path d="M21.9072 0.900391C23.3404 0.900405 24.5068 2.06678 24.5068 3.5V20.5C24.5068 21.9332 23.3404 23.0996 21.9072 23.0996H2.90723C1.474 23.0996 0.307617 21.9332 0.307617 20.5V3.5C0.307617 2.06677 1.474 0.900392 2.90723 0.900391H21.9072ZM1.50684 20.5C1.50684 21.2718 2.13546 21.9004 2.90723 21.9004H21.9072C22.679 21.9004 23.3076 21.2718 23.3076 20.5V6.09961H1.50684V20.5ZM2.90723 2.09961C2.13546 2.09961 1.50684 2.72823 1.50684 3.5V4.90039H23.3076V3.5C23.3076 2.72824 22.679 2.09962 21.9072 2.09961H2.90723Z" fill="currentColor" stroke="currentColor" strokeWidth="0.2"/>
                <path d="M2.90723 2.90039C3.2386 2.90039 3.50684 3.16863 3.50684 3.5C3.50684 3.83137 3.2386 4.09961 2.90723 4.09961C2.57585 4.09961 2.30762 3.83137 2.30762 3.5C2.30762 3.16863 2.57585 2.90039 2.90723 2.90039Z" fill="currentColor" stroke="currentColor" strokeWidth="0.2"/>
                <path d="M4.90723 2.90039C5.2386 2.90039 5.50684 3.16863 5.50684 3.5C5.50684 3.83137 5.2386 4.09961 4.90723 4.09961C4.57585 4.09961 4.30762 3.83137 4.30762 3.5C4.30762 3.16863 4.57585 2.90039 4.90723 2.90039Z" fill="currentColor" stroke="currentColor" strokeWidth="0.2"/>
                <path d="M6.90723 2.90039C7.2386 2.90039 7.50684 3.16863 7.50684 3.5C7.50684 3.83137 7.2386 4.09961 6.90723 4.09961C6.57585 4.09961 6.30762 3.83137 6.30762 3.5C6.30762 3.16863 6.57585 2.90039 6.90723 2.90039Z" fill="currentColor" stroke="currentColor" strokeWidth="0.2"/>
              </g>
              <defs>
                <clipPath id="clip0_14024_126">
                  <rect width="25" height="24" fill="white"/>
                </clipPath>
              </defs>
            </svg>
            Manage Debit Cards
          </Link>

          <Link
            href="/portal-advances-listing"
            className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg font-sans"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor"/>
            </svg>
            Advances
          </Link>
        </nav>
      </div>

      {/* Mobile Sidebar */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-30 lg:hidden">
          <div className="absolute inset-0 bg-black/20" onClick={() => setIsSidebarOpen(false)} />
          <div data-sidebar className="absolute inset-y-0 left-0 w-72 bg-white shadow-lg flex flex-col pt-4 px-6">
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="self-start text-gray-600 mb-8"
            >
              <X className="w-6 h-6" />
            </button>

            <nav className="space-y-4">
              <Link
                href="/portal-base-design"
                className="flex items-center gap-3 px-4 py-3 rounded-lg bg-blue-100 text-blue-700 font-medium font-sans"
                onClick={() => setIsSidebarOpen(false)}
              >
                <svg className="w-6 h-6" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_14024_120)">
                    <path d="M9.63574 -0.0996094C10.6923 -0.0994066 11.5586 0.726117 11.5586 1.75V6.25C11.5586 7.27403 10.6923 8.09941 9.63574 8.09961H1.82324C0.766742 8.09961 -0.0995749 7.27415 -0.0996094 6.25V1.75C-0.0996094 0.725998 0.766728 -0.0996094 1.82324 -0.0996094H9.63574ZM1.82324 1.59961C1.73096 1.59961 1.66211 1.67116 1.66211 1.75V6.25C1.66214 6.32905 1.73103 6.40039 1.82324 6.40039H9.63574C9.72799 6.40019 9.79586 6.32889 9.7959 6.25V1.75C9.7959 1.67132 9.72807 1.59981 9.63574 1.59961H1.82324Z" fill="currentColor" stroke="currentColor" strokeWidth="0.2"/>
                    <path d="M9.63574 9.90033C10.6922 9.90053 11.5585 10.7259 11.5586 11.7499V22.2499C11.5586 23.2738 10.6923 24.0993 9.63574 24.0995H1.82324C0.766728 24.0995 -0.0996094 23.2739 -0.0996094 22.2499V11.7499C-0.0995407 10.7258 0.766763 9.90033 1.82324 9.90033H9.63574ZM1.82324 11.5995C1.73106 11.5995 1.66218 11.6709 1.66211 11.7499V22.2499C1.66211 22.3288 1.73096 22.4003 1.82324 22.4003H9.63574C9.72807 22.4001 9.7959 22.3286 9.7959 22.2499V11.7499C9.79583 11.6711 9.72797 11.5997 9.63574 11.5995H1.82324Z" fill="currentColor" stroke="currentColor" strokeWidth="0.2"/>
                    <path d="M23.1774 15.9003C24.2337 15.9004 25.1001 16.7259 25.1002 17.7499V22.2499C25.1002 23.2739 24.2338 24.0994 23.1774 24.0995H15.3649C14.3082 24.0995 13.442 23.2739 13.442 22.2499V17.7499C13.4421 16.7258 14.3082 15.9003 15.3649 15.9003H23.1774ZM15.3649 17.5995C15.2724 17.5995 15.2038 17.671 15.2037 17.7499V22.2499C15.2037 22.3287 15.2723 22.4003 15.3649 22.4003H23.1774C23.2695 22.4002 23.3375 22.3287 23.3375 22.2499V17.7499C23.3374 17.671 23.2694 17.5996 23.1774 17.5995H15.3649Z" fill="currentColor" stroke="currentColor" strokeWidth="0.2"/>
                    <path d="M23.1774 -0.0996094C24.2338 -0.099506 25.1002 0.726062 25.1002 1.75V12.25C25.1002 13.2741 24.2338 14.0995 23.1774 14.0996H15.3649C14.3082 14.0996 13.442 13.2742 13.442 12.25V1.75C13.442 0.725991 14.3082 -0.0996094 15.3649 -0.0996094H23.1774ZM15.3649 1.59961C15.2723 1.59961 15.2037 1.6712 15.2037 1.75V12.25C15.2038 12.329 15.2724 12.4004 15.3649 12.4004H23.1774C23.2695 12.4003 23.3375 12.329 23.3375 12.25V1.75C23.3375 1.67121 23.2695 1.59971 23.1774 1.59961H15.3649Z" fill="currentColor" stroke="currentColor" strokeWidth="0.2"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_14024_120_mobile">
                      <rect width="25" height="24" fill="white"/>
                    </clipPath>
                  </defs>
                </svg>
                Dashboard
              </Link>

              <Link
                href="#"
                className="flex items-center gap-3 px-4 py-3 text-gray-600 font-sans"
                onClick={() => setIsSidebarOpen(false)}
              >
                <svg className="w-6 h-6" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_14024_126)">
                    <path d="M21.9072 0.900391C23.3404 0.900405 24.5068 2.06678 24.5068 3.5V20.5C24.5068 21.9332 23.3404 23.0996 21.9072 23.0996H2.90723C1.474 23.0996 0.307617 21.9332 0.307617 20.5V3.5C0.307617 2.06677 1.474 0.900392 2.90723 0.900391H21.9072ZM1.50684 20.5C1.50684 21.2718 2.13546 21.9004 2.90723 21.9004H21.9072C22.679 21.9004 23.3076 21.2718 23.3076 20.5V6.09961H1.50684V20.5ZM2.90723 2.09961C2.13546 2.09961 1.50684 2.72823 1.50684 3.5V4.90039H23.3076V3.5C23.3076 2.72824 22.679 2.09962 21.9072 2.09961H2.90723Z" fill="currentColor" stroke="currentColor" strokeWidth="0.2"/>
                    <path d="M2.90723 2.90039C3.2386 2.90039 3.50684 3.16863 3.50684 3.5C3.50684 3.83137 3.2386 4.09961 2.90723 4.09961C2.57585 4.09961 2.30762 3.83137 2.30762 3.5C2.30762 3.16863 2.57585 2.90039 2.90723 2.90039Z" fill="currentColor" stroke="currentColor" strokeWidth="0.2"/>
                    <path d="M4.90723 2.90039C5.2386 2.90039 5.50684 3.16863 5.50684 3.5C5.50684 3.83137 5.2386 4.09961 4.90723 4.09961C4.57585 4.09961 4.30762 3.83137 4.30762 3.5C4.30762 3.16863 4.57585 2.90039 4.90723 2.90039Z" fill="currentColor" stroke="currentColor" strokeWidth="0.2"/>
                    <path d="M6.90723 2.90039C7.2386 2.90039 7.50684 3.16863 7.50684 3.5C7.50684 3.83137 7.2386 4.09961 6.90723 4.09961C6.57585 4.09961 6.30762 3.83137 6.30762 3.5C6.30762 3.16863 6.57585 2.90039 6.90723 2.90039Z" fill="currentColor" stroke="currentColor" strokeWidth="0.2"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_14024_126">
                      <rect width="25" height="24" fill="white"/>
                    </clipPath>
                  </defs>
                </svg>
                Manage Debit Cards
              </Link>

              <Link
                href="/portal-advances-listing"
                className="flex items-center gap-3 px-4 py-3 text-gray-600 font-sans"
                onClick={() => setIsSidebarOpen(false)}
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor"/>
                </svg>
                Advances
              </Link>
            </nav>
          </div>
        </div>
      )}
    </>
  )
}
