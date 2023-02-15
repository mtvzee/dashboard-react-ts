import { useState } from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import { BiCurrentLocation } from 'react-icons/bi';
import { MdClose } from 'react-icons/md';
import { WeatherData } from '../types/weather';

type Props = {
  weatherData: WeatherData | null;
  setWeatherData: React.Dispatch<React.SetStateAction<WeatherData | null>>;
  setCity: React.Dispatch<React.SetStateAction<string>>;
};

const WeatherHeader = ({ weatherData, setWeatherData, setCity }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [input, setInput] = useState('');

  const handleToggleEdit = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setIsEditing(!isEditing);
  };

  // 現在地点の経緯度を取得して、OpenWeather APIで天気情報を取得する
  const handleGetCurrentLocation = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    navigator.geolocation.getCurrentPosition(async ({ coords }) => {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${
          coords.latitude
        }&lon=${coords.longitude}&appid=${
          import.meta.env.VITE_OW_API_KEY
        }&units=metric&lang=ja`
      );
      const data: WeatherData = await res.json();
      setWeatherData(data);
      localStorage.setItem('cityName', data.name);
      setIsEditing(false);
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCity(input);
    setInput('');
    localStorage.setItem('cityName', input);
    setIsEditing(false);
  };

  return (
    <>
      {isEditing ? (
        // 天気情報の地点を変更する場合
        <header className="relative">
          <form onSubmit={(e) => handleSubmit(e)}>
            <input
              type="text"
              placeholder="都市名（例：Yokohama）"
              className="w-full p-2 bg-black/50  rounded-md outline-none"
              onClick={(e) => e.stopPropagation()}
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </form>
          <button
            className="absolute top-1/2 -translate-y-1/2 right-8 text-[#cccccc] hover:text-white"
            onClick={(e) => handleGetCurrentLocation(e)}
          >
            <BiCurrentLocation className="w-6 h-6" />
          </button>
          <button
            className="absolute top-1/2 right-1 -translate-y-1/2 text-[#cccccc] hover:text-white"
            onClick={(e) => handleToggleEdit(e)}
          >
            <MdClose className="w-6 h-6" />
          </button>
        </header>
      ) : (
        // 現在地点の地名
        <header className="flex items-center space-x-2">
          <h2 className="text-xl">{weatherData?.name}</h2>
          <button onClick={(e) => handleToggleEdit(e)}>
            <AiOutlineEdit className="w-6 h-6 text-[#eeeeee] hover:text-white" />
          </button>
        </header>
      )}
    </>
  );
};

export default WeatherHeader;
