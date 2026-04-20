import { Header } from "@/components/header"

export default function PortalPage() {
  return (
    <div className="min-h-screen bg-[#f7f9fd]">
      <Header />
      <main className="px-4 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl font-serif text-blue-900">Client Portal</h1>
          </div>
        </div>
      </main>
    </div>
  )
}
