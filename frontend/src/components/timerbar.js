import React, { useEffect, useState } from 'react';

const TimerBar = () => {
  const [percent, setPercent] = useState(100);

  useEffect(() => {
    const totalDuration = 60 * 1000; // 60 segundos
    const intervalDuration = 100; // Atualiza a cada 100ms
    const steps = totalDuration / intervalDuration;
    const decrement = 100 / steps;

    const interval = setInterval(() => {
      setPercent(prev => {
        if (prev <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prev - decrement;
      });
    }, intervalDuration);

    return () => clearInterval(interval); // limpa no unmount
  }, []);

  return (
    <div style={{ backgroundColor: '#2a2a6b', borderRadius: 10, height: 15, margin: 10 }}>
      <div
        style={{
          width: `${percent}%`,
          backgroundColor: '#ff4d4d',
          height: '100%',
          borderRadius: 10,
          transition: 'width 0.1s linear'
        }}
      />
    </div>
  );
};

export default TimerBar;
