"use client"
import {ThemeProvider} from 'next-themes';

export default async function Providers(params = {}) {
  return (
        <ThemeProvider attribute="class">
            {params.children}
        </ThemeProvider>
    )
}
