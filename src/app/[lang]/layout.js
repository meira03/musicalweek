import '@/styles/globals.css'
import { ThemeProvider } from '@/providers'
import { Menu } from "@/components/Menu";
import Provider from '@/components/Provider/Provider';
import { getServerSession } from "next-auth";
import { authOption } from "@/app/api/auth/[...nextauth]/route";
import { Inter } from 'next/font/google';
import { getDictionary } from "@/utils/dictionaries";

const inter = Inter({ subsets: ['latin'] });
export const metadata = {
  title: {
    template: '%s | MusicalWeek',
    default: 'MusicalWeek',
  },
  description: 'MusicalWeek a musical network app',
}

export default async function RootLayout({ children, params: { lang } }) {
  let dict = await getDictionary(lang);
  dict = dict.lang_layout
  
  const session = await getServerSession(authOption)
  
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black-100 min-h-screen`}>
        <Provider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Menu logado={(session != null)} plano={session ? session.plano : 0} dict={dict.components_menu}/>
            <main className='w-11/12 mx-auto pt-5'>
              {children}
            </main>
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  )
}
