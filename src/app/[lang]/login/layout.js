import '@/styles/globals.css'
import { ThemeProvider } from '@/providers'
import { Menu } from "@/components/Menu";
import Provider from '@/components/Provider/Provider';

export default function RootLayout({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <main>
        {children}
      </main>
    </ThemeProvider>
  )
}
