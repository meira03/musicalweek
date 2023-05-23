import './globals.css'
import Menu from '@/components/Menu/Menu.js'
import Providers from '@/components/Providers/Providers.js'

export const metadata = {
  title: 'MusicalWeek',
  description: 'MusicalWeek',
}

export default async function RootLayout({children}) {
  return (
    <html lang="en">
      <body className='bg-white text-black dark:bg-black dark:text-white-400 mt-20 container m-auto'>
        <Providers>
          <Menu />
            {children}
        </Providers>
          
      </body>
    </html>
  )
}
