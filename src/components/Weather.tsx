import { useEffect, useState } from 'react';
import { WeatherData } from '../types/weather';

const Weather = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=suginami&appid=${
          import.meta.env.VITE_OW_API_KEY
        }&units=metric&lang=ja`
      );
      const data = await res.json();
      setWeatherData(data);
    };
    fetchWeatherData();
  }, []);

  return (
    <div className="absolute top-4 right-4 w-[120px] h-[56px] drop-shadow-primary">
      <div className="relative h-[32px]">
        <img
          src={`https://api.openweathermap.org/img/w/${weatherData?.weather[0].icon.replace(
            'n',
            'd'
          )}.png`}
          alt="天気のマーク"
          className="absolute -top-[6px] left-1 w-12 h-12"
        />
        <div className="absolute top-0 right-0 text-2xl">24.4℃</div>
      </div>
      <div className=" text-right">{weatherData?.name}</div>
    </div>
  );
};

export default Weather;
