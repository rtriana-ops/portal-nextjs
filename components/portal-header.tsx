'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, LogOut, ChevronDown } from 'lucide-react'
import { FundoLogo } from '@/components/fundo-logo'

interface PortalHeaderProps {
  isSidebarOpen: boolean
  setIsSidebarOpen: (open: boolean) => void
  isDropdownOpen: boolean
  setIsDropdownOpen: (open: boolean) => void
  dropdownRef: React.RefObject<HTMLDivElement>
}

export function PortalHeader({
  isSidebarOpen,
  setIsSidebarOpen,
  isDropdownOpen,
  setIsDropdownOpen,
  dropdownRef,
}: PortalHeaderProps) {
  return (
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
              <button className="w-full px-4 py-3 text-left text-gray-900 hover:bg-gray-50 flex items-center gap-2 font-sans font-medium">
                <LogOut className="w-5 h-5 text-gray-600" />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
