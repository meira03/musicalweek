"use client"

import  { usePathname,  } from 'next/navigation';

const ProgressBar = () => {
  const route = usePathname().split("/")[1];
  const progressBar = `
    h-3 -z-10 bg-zinc-300 dark:bg-zinc-800 rounded-lg
  `;

  const progressBarActive = `
    h-3 -z-10 bg-sky-400 animate-pulse rounded-lg
  `;

  const progressBarOn = `
    h-3 -z-10 bg-sky-400 rounded-lg
  `;
  var bars = [progressBar,progressBar,progressBar];

  switch (route) {
    case "music":
      bars = [progressBarActive,progressBar,progressBar];
      break;

    case "genre":
      bars = [progressBarOn,progressBarActive,progressBar];
      break;
  
    default:
      bars = [progressBar,progressBar,progressBar];
      break;
  }
  
  

  return (
    <div className="grid grid-cols-3 w-full gap-4">
      <div className={bars[0]}></div>
      <div className={bars[1]}></div>
      <div className={bars[2]}></div>
    </div>
  );
};

export default ProgressBar;
