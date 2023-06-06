import './globals.css'

import { cookies } from 'next/headers';

import Menu from '@/components/Menu/Menu.js'
import Providers from '@/components/Providers/Providers.js'

export const metadata = {
  title: 'MusicalWeek',
  description: 'MusicalWeek',
}

export default async function RootLayout(params = {}) {
  const cookieStore = cookies();
  const id_user = cookieStore.get('id');

  return (
    <html>
      <body className='bg-white text-black dark:bg-black dark:text-white-400 mt-20 container m-auto relative -z-50'>
        <Providers>
          <Menu id={id_user} />
          {params.children}
        </Providers>
      </body>
    </html>
  )
}
