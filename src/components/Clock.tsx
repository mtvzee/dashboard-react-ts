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
    <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 drop-shadow-two">
      <div className="absolute -top-4 h-[64px] w-full text-center leading-[64px] text-[2.5rem] tracking-wider">
        {date.format('M月D日 dddd')}
      </div>
      <div className="text-[11rem]">{date.format('HH:mm')}</div>
    </div>
  );
};

export default Clock;
