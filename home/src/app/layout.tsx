import './globals.css'
import type { Metadata } from 'next'
import Navbar from "../components/Navbar"

export const metadata: Metadata = {
  title: 'Home - MyStore',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <div className="pt-16">{children}</div>
      </body>
    </html>
  )
}
