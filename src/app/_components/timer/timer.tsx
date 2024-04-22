'use client'
import React, { useState, useEffect } from 'react';

const Timer = () => {
 const [currentTime, setCurrentTime] = useState('Loading...');
 const [isClient, setIsClient] = useState(false);

 useEffect(() => {
    // Set isClient to true after the component mounts on the client
    setIsClient(true);

    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleString());
    }, 1000);

    return () => clearInterval(interval);
 }, []);

 return (
    <div>
      <h1>Current Date and Time</h1>
      <p>{isClient ? currentTime : 'Loading...'}</p>
    </div>
 );
};

export default Timer;
