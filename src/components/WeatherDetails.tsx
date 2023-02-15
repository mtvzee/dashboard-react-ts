import { motion } from "framer-motion";
import { WeatherData } from "../types/weather";
import WeatherHeader from "./WeatherHeader";

type Props = {
  weatherData: WeatherData | null;
  setWeatherData: React.Dispatch<React.SetStateAction<WeatherData | null>>;
  setCity: React.Dispatch<React.SetStateAction<string>>;
  handleToggleData: () => void;
};

const WeatherDetails = ({
  weatherData,
  setWeatherData,
  setCity,
  handleToggleData,
}: Props) => {
  if (!weatherData) return <div></div>;
  return (
    <motion.div
      key="details"
      initial={{ opacity: 0, x: 1000 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 1000 }}
      transition={{ duration: 0.5 }}
      className="w-[400px] p-4 bg-black/20 backdrop-blur-xl rounded-xl cursor-pointer"
      onClick={handleToggleData}
    >
      <WeatherHeader
        weatherData={weatherData}
        setWeatherData={setWeatherData}
        setCity={setCity}
      />
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div>
            <img
              src={`https://api.openweathermap.org/img/w/${weatherData?.weather[0].icon.replace(
                "n",
                "d"
              )}.png`}
              alt="天気のマーク"
              className="w-[60px] h-[45px] object-cover"
            />
            <div className="text-center">
              {weatherData?.weather[0].description}
            </div>
          </div>
          <div>
            <div className="text-[42px] leading-[1.25]">
              {weatherData?.main.temp}
              <span className="text-2xl">℃</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="text-xl text-[#FD3201]">
                {weatherData?.main.temp_max.toFixed(1)}
                <span className="text-base">℃</span>
              </div>
              <div className="text-xl text-[#0B38E4]">
                {weatherData?.main.temp_min.toFixed(1)}
                <span className="text-base">℃</span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div>
            風速：
            <span className="text-lg">
              {weatherData?.wind.speed.toFixed(1)}
            </span>
            m/s
          </div>
          <div>
            湿度：
            <span className="text-lg">{weatherData?.main.humidity}</span>%
          </div>
          <div>
            体感：
            <span className="text-lg">
              {weatherData?.main.feels_like.toFixed(1)}
            </span>
            ℃
          </div>
          <div>
            気圧：
            <span className="text-lg">{weatherData?.main.pressure}</span>
            hPa
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default WeatherDetails;
