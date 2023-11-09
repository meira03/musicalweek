import '@/styles/globals.css'
import { ThemeProvider } from '@/providers'
import { Menu } from "@/components/Menu";
import Provider from '@/components/Provider/Provider';

import { Inter } from 'next/font/google'
import { cookies } from "next/headers";

const inter = Inter({ subsets: ['latin'] });
export const metadata = {
  title: {
    template: '%s | MusicalWeek',
    default: 'MusicalWeek',
  },
  description: 'MusicalWeek a musical network app',
}

export default function RootLayout({ children }) {
  const cookieStore = cookies();

  const logado = cookieStore.get('token') != undefined;
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black-100 min-h-screen`}>
        <Provider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Menu logado={logado} />
            <main className='w-11/12 mx-auto pt-5'>
              {children}
            </main>
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  )
}
