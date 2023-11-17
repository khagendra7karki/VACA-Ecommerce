import React, { useState, useEffect } from 'react';

interface Iprops{
    targetDate : Date,
} 
const CountDownTimer = ({ targetDate }: Iprops ) => {
  
    const calculateTimeLeft: () => any = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft as any;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Clear the timeout if the component is unmounted
    return () => clearTimeout(timer);
  });

  return (
    <div style = {{ display: 'flex' , gap: '20px', paddingLeft: '100px'}}>
        <div style = {{display: 'flex', flexDirection: 'column'}}>
            <h5>
                Days
            </h5>
            <h3>
                {timeLeft.days ? `${timeLeft.days}` : "00"}
            </h3>

        </div>
        <div style = {{display: 'flex', flexDirection: 'column'}}>
            <h5>
                Hours
            </h5>
            <h3>

              {timeLeft.hours ? `${timeLeft.hours}` : "00"}
            </h3>

        </div>
        <div style = {{display: 'flex', flexDirection: 'column'}}>
            <h5>
                Minutes
            </h5>
            <h3>
                {timeLeft.minutes ? `${timeLeft.minutes}` : "00"}

            </h3>
        </div>
        <div style = {{display: 'flex', flexDirection: 'column'}}>
            <h5>
                Seconds
            </h5>
            <h3>
                {timeLeft.seconds ? `${timeLeft.seconds}` : "00"}
            </h3>
        </div>
    
    </div>
  );
};

export default CountDownTimer;