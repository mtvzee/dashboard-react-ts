import dayjs from 'dayjs';
import 'dayjs/locale/ja';
import { useEffect, useState } from 'react';

const Clock = () => {
  const [date, setDate] = useState(dayjs());
  dayjs.locale('ja');

  useEffect(() => {
    const timerId = setInterval(() => setDate(dayjs()), 1000);
    return () => clearInterval(timerId);
  }, []);

  return (
    <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 ">
      <div className="absolute -top-4 h-[64px] w-full text-center leading-[64px] text-[3rem] tracking-wider drop-shadow-[1px_1.5px_2px_rgba(0,0,0,0.7)] font-medium">
        {date.format('M月D日 dddd')}
      </div>
      <div className="text-[12rem] drop-shadow-[1px_1.5px_3px_rgba(0,0,0,0.7)]">{date.format('HH:mm')}</div>
    </div>
  );
};

export default Clock;
