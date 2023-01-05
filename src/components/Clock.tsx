import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

const Clock = () => {
  const [date, setDate] = useState(dayjs());

  useEffect(() => {
    const timerId = setInterval(() => setDate(dayjs()), 1000);
    return () => clearInterval(timerId);
  }, []);

  return (
    <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 drop-shadow-[2px_2px_2px_rgba(0,0,0,0.3)]">
      <div className="text-[10rem] leading-none text-center ">
        {date.format('HH:mm')}
      </div>
      <div className="text-[4rem] tracking-wider">
        {date.format('YYYY/MM/DD(ddd)')}
      </div>
    </div>
  );
};

export default Clock;
