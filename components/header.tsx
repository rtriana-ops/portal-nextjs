import Link from "next/link"
import { FundoLogo } from "./fundo-logo"

export function Header() {
  return (
    <header className="w-full px-4 lg:px-8 bg-white py-4 lg:py-6 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <FundoLogo className="h-5 lg:h-6 w-auto" />
        </Link>
      </div>
    </header>
  )
}
