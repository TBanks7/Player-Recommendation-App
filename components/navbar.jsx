// components/Navbar.tsx
import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function Navbar() {
  return (
    <nav className="bg-transparent text-blue-600">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold flex items-center">
          <svg className="w-8 h-8 mr-2" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
            <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 8c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" />
          </svg>
          PlayerMatch
        </Link>
        <div className="flex items-center space-x-4">
          <Link href="#" className="hover:underline">Home</Link>
          <Link href="#" className="hover:underline">Compare</Link>
          {/* <Link href="#" className="hover:underline">About</Link>
          <Button variant="outline" className="text-blue-700 border-white hover:bg-white hover:text-blue-700">
            Sign In
          </Button> */}
        </div>
      </div>
    </nav>
  )
}