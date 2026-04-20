'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, LogOut, ChevronDown, FileText, DollarSign, Receipt, Timer, Zap } from 'lucide-react'
import { FundoLogo } from '@/components/fundo-logo'
import { PortalAdvancesDetailSkeleton } from '@/components/portal-advances-detail-skeleton'

export default function PortalAdvancesDetailCollectionsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [showSkeleton, setShowSkeleton] = useState(true)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Skeleton loader timer
  useEffect(() => {
    const skeletonTimer = setTimeout(() => {
      setShowSkeleton(false)
    }, 1500)

    return () => clearTimeout(skeletonTimer)
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isSidebarOpen) {
        const target = event.target as HTMLElement
        if (!target.closest('[data-sidebar]') && !target.closest('button')) {
          setIsSidebarOpen(false)
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isSidebarOpen])

  return (
    <>
      <style>{`
        @media (min-width: 1024px) and (max-width: 1279px) {
          .advances-tablet-width {
            width: 328px;
          }
        }
      `}</style>
      <div className="bg-[#e8e8e8] flex flex-col min-h-screen">
      {/* Mobile Menu Button */}
      <div className="lg:hidden bg-transparent border-b-0 z-40">
        <div className="flex items-center justify-between px-4 py-4">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-blue-600"
          >
            <Menu className="w-6 h-6" />
          </button>
          <FundoLogo className="h-6 w-auto" />
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2"
            >
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white flex-shrink-0">
                <svg width="18" height="19" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
                  <path d="M20.4854 3.66134C18.5224 1.6164 15.9393 0.34375 13.1764 0.0602345C10.4136 -0.223281 7.64177 0.499881 5.33336 2.1065C3.02496 3.71312 1.32276 6.1038 0.516794 8.87119C-0.289169 11.6386 -0.149026 14.6115 0.913345 17.2833C1.97571 19.9551 3.89458 22.1606 6.34299 23.5239C8.7914 24.8872 11.6179 25.324 14.3408 24.7599C17.0637 24.1957 19.5146 22.6656 21.2759 20.4302C23.0372 18.1947 23.9999 15.3923 24 12.5003C24.0021 10.8585 23.6926 9.23239 23.0895 7.71551C22.4863 6.19862 21.6014 4.82084 20.4854 3.66134ZM19.8689 20.2483C18.7632 17.8318 17.2711 17.2878 16.0406 16.8406C15.3338 16.5833 14.7398 16.3673 14.5114 15.7278C14.3659 15.2772 14.3001 14.8029 14.3174 14.3278C14.3042 14.1095 14.3622 13.893 14.4821 13.7133C15.0942 13.1462 15.5601 12.4283 15.8374 11.6253C16.1472 10.7291 16.2993 9.78204 16.2864 8.82959C16.2864 7.6454 15.8348 6.50971 15.0309 5.67236C14.2271 4.83501 13.1368 4.36459 12 4.36459C10.8632 4.36459 9.77291 4.83501 8.96906 5.67236C8.1652 6.50971 7.7136 7.6454 7.7136 8.82959C7.70071 9.78204 7.85282 10.7291 8.16264 11.6253C8.43981 12.4285 8.90576 13.1465 9.51792 13.7138C9.63776 13.8935 9.69578 14.11 9.68256 14.3283C9.69984 14.8034 9.63414 15.2777 9.48864 15.7283C9.26016 16.3678 8.66616 16.5838 7.95936 16.8411C6.72888 17.2878 5.2368 17.8318 4.13112 20.2483C2.67786 18.6468 1.70683 16.6369 1.33799 14.4669C0.969152 12.2969 1.21866 10.0619 2.05569 8.03799C2.89271 6.01406 4.28059 4.2899 6.04787 3.07849C7.81515 1.86708 9.8844 1.2215 12 1.2215C14.1156 1.2215 16.1848 1.86708 17.9521 3.07849C19.7194 4.2899 21.1073 6.01406 21.9443 8.03799C22.7813 10.0619 23.0308 12.2969 22.662 14.4669C22.2932 16.6369 21.3221 18.6468 19.8689 20.2483Z" fill="white"/>
                </svg>
              </div>
              <ChevronDown className="w-5 h-5 text-gray-600" />
            </button>

            {isDropdownOpen && (
              <div className="absolute top-full right-0 mt-2 w-64 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden">
                {/* User Info Section */}
                <div className="p-4 flex items-center gap-3 border-b border-gray-200">
                  <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white flex-shrink-0">
                    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
                      <path d="M20.4854 3.66134C18.5224 1.6164 15.9393 0.34375 13.1764 0.0602345C10.4136 -0.223281 7.64177 0.499881 5.33336 2.1065C3.02496 3.71312 1.32276 6.1038 0.516794 8.87119C-0.289169 11.6386 -0.149026 14.6115 0.913345 17.2833C1.97571 19.9551 3.89458 22.1606 6.34299 23.5239C8.7914 24.8872 11.6179 25.324 14.3408 24.7599C17.0637 24.1957 19.5146 22.6656 21.2759 20.4302C23.0372 18.1947 23.9999 15.3923 24 12.5003C24.0021 10.8585 23.6926 9.23239 23.0895 7.71551C22.4863 6.19862 21.6014 4.82084 20.4854 3.66134ZM19.8689 20.2483C18.7632 17.8318 17.2711 17.2878 16.0406 16.8406C15.3338 16.5833 14.7398 16.3673 14.5114 15.7278C14.3659 15.2772 14.3001 14.8029 14.3174 14.3278C14.3042 14.1095 14.3622 13.893 14.4821 13.7133C15.0942 13.1462 15.5601 12.4283 15.8374 11.6253C16.1472 10.7291 16.2993 9.78204 16.2864 8.82959C16.2864 7.6454 15.8348 6.50971 15.0309 5.67236C14.2271 4.83501 13.1368 4.36459 12 4.36459C10.8632 4.36459 9.77291 4.83501 8.96906 5.67236C8.1652 6.50971 7.7136 7.6454 7.7136 8.82959C7.70071 9.78204 7.85282 10.7291 8.16264 11.6253C8.43981 12.4285 8.90576 13.1465 9.51792 13.7138C9.63776 13.8935 9.69578 14.11 9.68256 14.3283C9.69984 14.8034 9.63414 15.2777 9.48864 15.7283C9.26016 16.3678 8.66616 16.5838 7.95936 16.8411C6.72888 17.2878 5.2368 17.8318 4.13112 20.2483C2.67786 18.6468 1.70683 16.6369 1.33799 14.4669C0.969152 12.2969 1.21866 10.0619 2.05569 8.03799C2.89271 6.01406 4.28059 4.2899 6.04787 3.07849C7.81515 1.86708 9.8844 1.2215 12 1.2215C14.1156 1.2215 16.1848 1.86708 17.9521 3.07849C19.7194 4.2899 21.1073 6.01406 21.9443 8.03799C22.7813 10.0619 23.0308 12.2969 22.662 14.4669C22.2932 16.6369 21.3221 18.6468 19.8689 20.2483Z" fill="white"/>
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-900 font-semibold text-sm">John Doe</span>
                    <span className="text-gray-600 text-xs">jgomez+3864@fundo.com</span>
                    <span className="text-gray-600 text-xs">407 556 5456</span>
                  </div>
                </div>
                
                {/* Sign Out Button */}
                <button 
                  onClick={() => setIsDropdownOpen(false)}
                  className="w-full px-4 py-3 text-left text-gray-900 hover:bg-gray-50 flex items-center gap-2 font-sans font-medium">
                  <LogOut className="w-5 h-5 text-gray-600" />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Layout Container - Two columns */}
      <div className="flex-1 xl:ml-[5vw] xl:mr-[5vw] xl:flex xl:max-w-[90vw] xl:mx-auto flex pt-0 lg:pt-0">
        {/* Desktop Sidebar */}
        <div className="hidden lg:flex lg:w-80 lg:bg-transparent lg:flex-col lg:px-6 lg:py-8">
          {/* Logo */}
          <div className="mb-20">
            <FundoLogo className="h-6 w-auto" />
          </div>

          {/* Navigation */}
          <nav className="space-y-4">
            <Link
              href="/portal-base-design"
              className="flex items-center gap-3 px-4 py-3 rounded-lg font-medium font-sans text-gray-600 hover:bg-gray-50"
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
              className="flex items-center gap-3 px-4 py-3 bg-[rgba(209,211,227,1)] text-blue-900 rounded-lg font-sans font-semibold"
            >
              <Zap className="w-6 h-6" />
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
                className="flex items-center gap-3 px-4 py-3 bg-[rgba(209,211,227,1)] text-blue-900 rounded-lg font-sans font-semibold"
                onClick={() => setIsSidebarOpen(false)}
              >
                <Zap className="w-6 h-6" />
                Advances
              </Link>
            </nav>
          </div>
        </div>
      )}

      {/* Main Page Content */}
      <main className="flex-1 flex items-start justify-center">
        {showSkeleton ? (
          <PortalAdvancesDetailSkeleton />
        ) : (
            <>
          {/* Main Content Container */}
          <div className="bg-transparent lg:bg-white rounded-2xl border p-4 lg:p-8 w-full md:max-w-[600px] xl:max-w-[1100px] border-gray-200 shadow-none lg:shadow-md md:mx-auto lg:ml-0 lg:mt-20 mb-12">
            {/* Header with Title and Profile */}
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-0">
              {/* Welcome Section */}
              <div className="lg:mb-0 mb-1.5">
                <Link href="/portal-advances-listing" className="flex items-center gap-2 text-blue-600 font-sans font-medium text-sm hover:text-blue-700 mb-3">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 12H5M12 19l-7-7 7-7"/>
                  </svg>
                  Back to Cash Advances
                </Link>
                <div className="flex flex-col lg:flex-row lg:items-center lg:gap-4 gap-1">
                  <h2 className="text-3xl font-bold text-gray-900">$850.00</h2>
                  <span className="inline-flex items-center w-fit bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full">Collections</span>
                </div>
                <p className="text-gray-600 text-sm mt-0">Funded: Jan 15, 2025</p>
              </div>

              {/* Profile Dropdown - Desktop only */}
              <div className="hidden lg:relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-3 px-6 py-3 rounded-xl border border-transparent bg-white hover:opacity-80 transition-opacity cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white flex-shrink-0">
                    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
                      <path d="M20.4854 3.66134C18.5224 1.6164 15.9393 0.34375 13.1764 0.0602345C10.4136 -0.223281 7.64177 0.499881 5.33336 2.1065C3.02496 3.71312 1.32276 6.1038 0.516794 8.87119C-0.289169 11.6386 -0.149026 14.6115 0.913345 17.2833C1.97571 19.9551 3.89458 22.1606 6.34299 23.5239C8.7914 24.8872 11.6179 25.324 14.3408 24.7599C17.0637 24.1957 19.5146 22.6656 21.2759 20.4302C23.0372 18.1947 23.9999 15.3923 24 12.5003C24.0021 10.8585 23.6926 9.23239 23.0895 7.71551C22.4863 6.19862 21.6014 4.82084 20.4854 3.66134ZM19.8689 20.2483C18.7632 17.8318 17.2711 17.2878 16.0406 16.8406C15.3338 16.5833 14.7398 16.3673 14.5114 15.7278C14.3659 15.2772 14.3001 14.8029 14.3174 14.3278C14.3042 14.1095 14.3622 13.893 14.4821 13.7133C15.0942 13.1462 15.5601 12.4283 15.8374 11.6253C16.1472 10.7291 16.2993 9.78204 16.2864 8.82959C16.2864 7.6454 15.8348 6.50971 15.0309 5.67236C14.2271 4.83501 13.1368 4.36459 12 4.36459C10.8632 4.36459 9.77291 4.83501 8.96906 5.67236C8.1652 6.50971 7.7136 7.6454 7.7136 8.82959C7.70071 9.78204 7.85282 10.7291 8.16264 11.6253C8.43981 12.4285 8.90576 13.1465 9.51792 13.7138C9.63776 13.8935 9.69578 14.11 9.68256 14.3283C9.69984 14.8034 9.63414 15.2777 9.48864 15.7283C9.26016 16.3678 8.66616 16.5838 7.95936 16.8411C6.72888 17.2878 5.2368 17.8318 4.13112 20.2483C2.67786 18.6468 1.70683 16.6369 1.33799 14.4669C0.969152 12.2969 1.21866 10.0619 2.05569 8.03799C2.89271 6.01406 4.28059 4.2899 6.04787 3.07849C7.81515 1.86708 9.8844 1.2215 12 1.2215C14.1156 1.2215 16.1848 1.86708 17.9521 3.07849C19.7194 4.2899 21.1073 6.01406 21.9443 8.03799C22.7813 10.0619 23.0308 12.2969 22.662 14.4669C22.2932 16.6369 21.3221 18.6468 19.8689 20.2483Z" fill="white"/>
                    </svg>
                  </div>
                  <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                </button>

                {isDropdownOpen && (
                  <div className="absolute top-full right-0 mt-2 w-64 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden">
                    {/* User Info Section */}
                    <div className="p-4 flex items-center gap-3 border-b border-gray-200">
                      <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white flex-shrink-0">
                        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
                          <path d="M20.4854 3.66134C18.5224 1.6164 15.9393 0.34375 13.1764 0.0602345C10.4136 -0.223281 7.64177 0.499881 5.33336 2.1065C3.02496 3.71312 1.32276 6.1038 0.516794 8.87119C-0.289169 11.6386 -0.149026 14.6115 0.913345 17.2833C1.97571 19.9551 3.89458 22.1606 6.34299 23.5239C8.7914 24.8872 11.6179 25.324 14.3408 24.7599C17.0637 24.1957 19.5146 22.6656 21.2759 20.4302C23.0372 18.1947 23.9999 15.3923 24 12.5003C24.0021 10.8585 23.6926 9.23239 23.0895 7.71551C22.4863 6.19862 21.6014 4.82084 20.4854 3.66134ZM19.8689 20.2483C18.7632 17.8318 17.2711 17.2878 16.0406 16.8406C15.3338 16.5833 14.7398 16.3673 14.5114 15.7278C14.3659 15.2772 14.3001 14.8029 14.3174 14.3278C14.3042 14.1095 14.3622 13.893 14.4821 13.7133C15.0942 13.1462 15.5601 12.4283 15.8374 11.6253C16.1472 10.7291 16.2993 9.78204 16.2864 8.82959C16.2864 7.6454 15.8348 6.50971 15.0309 5.67236C14.2271 4.83501 13.1368 4.36459 12 4.36459C10.8632 4.36459 9.77291 4.83501 8.96906 5.67236C8.1652 6.50971 7.7136 7.6454 7.7136 8.82959C7.70071 9.78204 7.85282 10.7291 8.16264 11.6253C8.43981 12.4285 8.90576 13.1465 9.51792 13.7138C9.63776 13.8935 9.69578 14.11 9.68256 14.3283C9.69984 14.8034 9.63414 15.2777 9.48864 15.7283C9.26016 16.3678 8.66616 16.5838 7.95936 16.8411C6.72888 17.2878 5.2368 17.8318 4.13112 20.2483C2.67786 18.6468 1.70683 16.6369 1.33799 14.4669C0.969152 12.2969 1.21866 10.0619 2.05569 8.03799C2.89271 6.01406 4.28059 4.2899 6.04787 3.07849C7.81515 1.86708 9.8844 1.2215 12 1.2215C14.1156 1.2215 16.1848 1.86708 17.9521 3.07849C19.7194 4.2899 21.1073 6.01406 21.9443 8.03799C22.7813 10.0619 23.0308 12.2969 22.662 14.4669C22.2932 16.6369 21.3221 18.6468 19.8689 20.2483Z" fill="white"/>
                        </svg>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-gray-900 font-semibold text-sm">John Doe</span>
                        <span className="text-gray-600 text-xs">jgomez+3864@fundo.com</span>
                        <span className="text-gray-600 text-xs">407 556 5456</span>
                      </div>
                    </div>
                    
                    {/* Sign Out Button */}
                    <button className="w-full px-4 py-3 text-left text-gray-900 hover:bg-gray-50 flex items-center gap-2 font-sans border-b border-gray-200">
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Main Content - Full Width */}
            <div className="mt-8">
              {/* Metrics Cards - 4 Columns */}
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 mb-3 gap-2.5">
                {/* Amount Paid */}
                <div className="bg-gray-100 rounded-2xl p-5">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="bg-white rounded-full p-2 flex-shrink-0">
                      <DollarSign className="w-5 h-5 text-green-600" />
                    </div>
                    <span className="text-xs text-gray-600 pt-2">Amount Paid</span>
                  </div>
                  <p className="text-xl font-bold text-green-600">$466.50</p>
                </div>

                {/* Remaining Balance */}
                <div className="bg-gray-100 rounded-2xl p-5">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="bg-white rounded-full p-2 flex-shrink-0">
                      <Receipt className="w-5 h-5 text-orange-600" />
                    </div>
                    <span className="text-xs text-gray-600 pt-2">Remaining Balance</span>
                  </div>
                  <p className="text-xl font-bold text-gray-900">$1,408.50</p>
                </div>

                {/* Payment plan */}
                <div className="bg-gray-100 rounded-2xl p-5">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="bg-white rounded-full p-2 flex-shrink-0">
                      <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-5.04-6.71l-2.75 3.54-1.3-1.54c-.39-.49-1.02-.49-1.41 0-.39.49-.39 1.28 0 1.77l2 2.34c.39.49 1.02.49 1.41 0L17.6 9.9c.39-.49.39-1.28 0-1.77-.39-.48-1.02-.48-1.41 0z"/>
                      </svg>
                    </div>
                    <span className="text-xs text-gray-600 pt-2">Payment plan</span>
                  </div>
                  <p className="text-xl font-bold text-gray-900">$93.33</p>
                </div>

                {/* Remaining payments */}
                <div className="bg-gray-100 rounded-2xl p-5">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="bg-white rounded-full p-2 flex-shrink-0">
                      <Timer className="w-5 h-5 text-purple-600" />
                    </div>
                    <span className="text-xs text-gray-600 pt-2">Remaining payments</span>
                  </div>
                  <p className="text-xl font-bold text-purple-600">15</p>
                </div>
              </div>

              {/* 2 Column Layout - Left and Right */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                {/* Left Column */}
                <div className="space-y-3">
                  {/* Next Payment */}
                  <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                    <div className="flex items-center gap-2 mb-3">
                      <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/>
                      </svg>
                      <h3 className="font-semibold text-gray-900">Next Payment</h3>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <p className="text-xs text-gray-600">Due Date</p>
                        <p className="text-lg font-bold text-gray-900">April 11, 2026</p>
                      </div>
                      <div className="pt-2 border-t border-green-200">
                        <p className="text-xs text-gray-600">Amount</p>
                        <p className="text-lg font-bold text-green-600">$93.33</p>
                      </div>
                      <p className="text-xs text-gray-600 pt-2">Weekly Remittance: $93.33</p>
                    </div>
                  </div>



                  {/* Advance Details */}
                  <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <h3 className="font-semibold text-gray-900 mb-4">Advance Details</h3>
                    <div className="space-y-3">
                    <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                        <span className="text-sm text-gray-600">Funded Date</span>
                        <span className="text-sm font-semibold text-gray-900">January 15, 2025</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Payment Progress</span>
                        <span className="text-sm font-semibold text-gray-900">5 of 20</span>
                      </div>
                      <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                        <span className="text-sm text-gray-600">Payment Progress</span>
                        <span className="text-sm font-semibold text-gray-900">5 of 20</span>
                      </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Contact Support</span>
                    <span className="text-sm font-semibold text-gray-900 text-right">support@fundo.com <br/>1-866-393-8636 (9am and 5:00 EST)</span>
                  </div>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-3">
                  {/* Payment History */}
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center gap-2 mb-3">
                      <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                      </svg>
                      <h3 className="font-semibold text-gray-900">Payment History</h3>
                    </div>
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {[
                        { date: 'March 01, 2026', amount: '$93.33', status: 'Overdue', paymentNum: '10' },
                        { date: 'February 28, 2026', amount: '$93.33', status: 'Paid', paymentNum: '9' },
                        { date: 'February 15, 2026', amount: '$93.33', status: 'Paid', paymentNum: '8' },
                        { date: 'February 15, 2026', amount: '$93.33', status: 'Paid', paymentNum: '7' },
                        { date: 'February 15, 2026', amount: '$93.33', status: 'Paid', paymentNum: '6' },
                        { date: 'February 15, 2026', amount: '$93.33', status: 'Paid', paymentNum: '15' }
                      ].map((payment, idx) => (
                        <div key={idx} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                          <div className="flex items-center gap-2">
                            {payment.status === 'Next Payment' && (
                              <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs">✓</div>
                            )}
                            {payment.status === 'Overdue' && (
                              <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center text-white text-xs">!</div>
                            )}
                            {payment.status === 'Paid' && (
                              <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-xs">✓</div>
                            )}
                            <div>
                              <p className="text-sm font-medium text-gray-900">{payment.date}</p>
                              <p className="text-xs text-gray-500">Payment {payment.paymentNum} of 20</p>
                            </div>
                          </div>
                          <p className="text-sm font-semibold text-gray-900">{payment.amount}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="bg-white rounded-lg border border-gray-200 p-4 py-2.5 px-2.5">
                    <button 
                      onClick={() => window.open('/advance-agreement.pdf', '_blank')}
                      className="w-full flex items-center justify-center gap-2 text-blue-600 font-semibold text-sm hover:text-blue-700 py-2">
                      <FileText className="w-5 h-5" />
                      Download Agreement
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </>
          )}
        </main>
      </div>
      </div>
    </>
  )
}
