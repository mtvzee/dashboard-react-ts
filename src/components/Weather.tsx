import { AnimatePresence } from 'framer-motion';
import { useContext, useEffect, useState } from 'react';
import { ShowModalContext } from '../context/ShowModalContext';
import { WeatherData } from '../types/weather';
import WeatherDetails from './WeatherDetails';
import WeatherOutline from './WeatherOutline';

const Weather = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [city, setCity] = useState('');
  const { showModal, setShowModal } = useContext(ShowModalContext);

  const handleToggleData = () => {
    setShowModal({
      weather: !showModal.weather,
      todo: showModal?.todo,
    });
  };

  useEffect(() => {
    setCity(localStorage.getItem('cityName') ?? 'Tokyo');
  }, []);

  // OpenWeatherのAPIを用いて天気の情報を取得する
  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        // cityが正しい都市名の時
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${
            city || 'Tokyo'
          }&appid=${import.meta.env.VITE_OW_API_KEY}&units=metric&lang=ja`
        );
        const data = await res.json();
        if (!res.ok) {
          throw new Error('都市名が間違っています');
        }
        setWeatherData(data);
      } catch (error) {
        // cityが間違った都市名の時、tokyoで取得する
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=Tokyo&appid=${
            import.meta.env.VITE_OW_API_KEY
          }&units=metric&lang=ja`
        );
        const data = await res.json();
        setWeatherData(data);
        localStorage.setItem('cityName', 'Tokyo');
      }
    };
    fetchWeatherData();
  }, [city]);

  return (
    <div className="absolute top-4 right-4">
      <AnimatePresence initial={false} mode="wait">
        {showModal.weather ? (
          // 詳細バージョン
          <WeatherDetails
            weatherData={weatherData}
            setWeatherData={setWeatherData}
            setCity={setCity}
            handleToggleData={handleToggleData}
          />
        ) : (
          // 概要バージョン
          <WeatherOutline
            weatherData={weatherData}
            handleToggleData={handleToggleData}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Weather;
