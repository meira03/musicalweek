import '@/styles/globals.css'
import { ThemeProvider } from '@/providers'
import { Menu } from "@/components/Menu";
import Provider from '@/components/Provider/Provider';

import { Inter } from 'next/font/google'
import { cookies } from "next/headers";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  const cookieStore = cookies();

  const logado = cookieStore.get('token') != undefined;
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black-0 min-h-screen`}>
        <Provider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Menu logado={logado} />
            <main>
              {children}
            </main>
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  )
}
