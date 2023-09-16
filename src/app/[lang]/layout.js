import '@/styles/globals.css'
import { ThemeProvider } from '@/providers'
import { Menu } from "@/components/Menu";

import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black-0 min-h-screen`}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Menu />
            <main>
              {children}
            </main>
          </ThemeProvider>
      </body>
    </html>
  )
}