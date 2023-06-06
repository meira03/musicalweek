"use client"

import { useState, useEffect } from 'react';

const Contador = ({ targetDate, className }) => {
  
  const calculateTimeRemaining = () => {
    if(targetDate != null){
      const currentTime = new Date().getTime();
      const targetTime = new Date(targetDate.replace(' ', 'T')).getTime();
      const timeDifference = targetTime - currentTime;

      if (timeDifference <= 0) {
        // Tempo expirado
        return {
          days: '00',
          hours: '00',
          minutes: '00',
          seconds: '00'
        };
      }

      const oneDay = 24 * 60 * 60 * 1000;
      const oneHour = 60 * 60 * 1000;
      const oneMinute = 60 * 1000;

      const days = String(Math.floor(timeDifference / oneDay)).padStart(2, '0');
      const hours = String(Math.floor((timeDifference % oneDay) / oneHour)).padStart(2, '0');
      const minutes = String(Math.floor((timeDifference % oneHour) / oneMinute)).padStart(2, '0');
      const seconds = String(Math.floor((timeDifference % oneMinute) / 1000)).padStart(2, '0');

      return {
        days,
        hours,
        minutes,
        seconds
      };
    }
  };

  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  if(targetDate == null){
    return (
      <></>
    );
  }
  return (
    <span className={className}>
       {timeRemaining.hours}:{timeRemaining.minutes}:{timeRemaining.seconds}
    </span>
  );
};

export default Contador;