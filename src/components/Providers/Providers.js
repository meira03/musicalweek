"use client";

import {ThemeProvider} from 'next-themes';

const Providers = async ({children, locale}) => {  
    return ( 
        <>
        <ThemeProvider attribute="class">
          {children}
        </ThemeProvider>
        </>
     );
}
 
export default Providers;