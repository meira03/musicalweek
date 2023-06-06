import Link from 'next/link';
import Image from "next/image";

export default function Home({ params }) {
  return (
    <main className='mx-auto sm:max-w-7xl px-2 sm:px-6 lg:px-8'>
        <div className="flex h-[75vh] w-full justify-center items-center flex-col">
            <div className="w-3/4 sm:w-1/3">
                <Image
                src="/darkmusicalweek.webp"
                alt="MusicalWeek Logo"
                width="0"
                height="0"
                sizes="100vw"
                className="w-full hidden dark:block"
                priority
                />
                <Image
                src="/musicalweek.webp"
                alt="MusicalWeek Logo"
                width="0"
                height="0"
                sizes="100vw"
                className="w-full dark:hidden"
                priority
                />
            </div>
            <Link href="/musica" className="text-2xl px-4 py-3 rounded-lg border-[1px] border-[#05d3f8] bg-gradient-to-t from-[#0f4571] to-[#386dbd] dark:from-white dark:to-white text-white dark:text-black dark:border-0 dark:bg-white mt-10">PARTICIPE AGORA!</Link>
        </div>
    </main>
  )
}
