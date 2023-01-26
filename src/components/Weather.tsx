import { useContext, useEffect, useState } from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdClose } from 'react-icons/md';
import { ShowModalContext } from '../context/ShowModalContext';
import { WeatherData } from '../types/weather';

const Weather = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [city, setCity] = useState('');
  const [input, setInput] = useState('');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const { showModal, setShowModal } = useContext(ShowModalContext);

  const handleToggleData = () => {
    setShowModal({
      weather: !showModal.weather,
      todo: showModal?.todo,
    });
  };

  const handleToggleEdit = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setIsEditing(!isEditing);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCity(input);
    setInput('');
    localStorage.setItem('cityName', input);
    setIsEditing(false);
  };

  useEffect(() => {
    setCity(localStorage.getItem('cityName') ?? 'Tokyo');
  }, []);

  // OpenWeatherのAPIを用いて天気の情報を取得する
  useEffect(() => {
    const fetchWeatherData = async () => {
      // cityの状態が正しい都市名の時
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${
            import.meta.env.VITE_OW_API_KEY
          }&units=metric&lang=ja`
        );
        const data = await res.json();
        if (!res.ok) {
          throw new Error('都市名が間違っています');
        }
        setWeatherData(data);
      } catch (error) {
        // cityの状態が間違った都市名の時、東京都にリセットする
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

  // weatherDataを取得前にエラーが出ないようローディング状態にする
  if (!weatherData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="absolute top-4 right-4">
      {showModal.weather ? (
        // 詳細バージョン
        <div
          className="w-[400px] p-4 bg-black/20 backdrop-blur-xl rounded-xl cursor-pointer"
          onClick={handleToggleData}
        >
          {isEditing ? (
            <div className="relative">
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
                className="absolute top-1/2 right-1 -translate-y-1/2"
                onClick={(e) => handleToggleEdit(e)}
              >
                <MdClose className="w-7 h-7" />
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <h2 className="text-xl">{weatherData.name}</h2>
              <button onClick={(e) => handleToggleEdit(e)}>
                <AiOutlineEdit className="w-6 h-6 text-[#eeeeee] hover:text-white" />
              </button>
            </div>
          )}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div>
                <img
                  src={`https://api.openweathermap.org/img/w/${weatherData.weather[0].icon.replace(
                    'n',
                    'd'
                  )}.png`}
                  alt="天気のマーク"
                  className="w-[60px] h-[45px] object-cover"
                />
                <div className="text-center">
                  {weatherData.weather[0].description}
                </div>
              </div>
              <div>
                <div className="text-[42px] leading-[1.25]">
                  {weatherData.main.temp}
                  <span className="text-2xl">℃</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-xl text-[#FD3201]">
                    {weatherData.main.temp_max.toFixed(1)}
                    <span className="text-base">℃</span>
                  </div>
                  <div className="text-xl text-[#0B38E4]">
                    {weatherData.main.temp_min.toFixed(1)}
                    <span className="text-base">℃</span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div>
                風速：
                <span className="text-lg">
                  {weatherData.wind.speed.toFixed(1)}
                </span>
                m/s
              </div>
              <div>
                湿度：
                <span className="text-lg">{weatherData.main.humidity}</span>%
              </div>
              <div>
                体感：
                <span className="text-lg">
                  {weatherData.main.feels_like.toFixed(1)}
                </span>
                ℃
              </div>
              <div>
                気圧：
                <span className="text-lg">{weatherData.main.pressure}</span>hPa
              </div>
            </div>
          </div>
        </div>
      ) : (
        // 省略バージョン
        <div
          className="min-w-[100px] py-2 flex flex-col items-center bg-black/40 backdrop-blur-md rounded-md cursor-pointer relative gap-[35px]"
          onClick={handleToggleData}
        >
          <div>{weatherData.name}</div>
          <img
            src={`https://api.openweathermap.org/img/w/${weatherData.weather[0].icon.replace(
              'n',
              'd'
            )}.png`}
            alt="天気のマーク"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50px] h-[50px] object-cover"
          />
          <div>
            <span className="text-2xl">{weatherData.main.temp.toFixed(1)}</span>
            ℃
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
