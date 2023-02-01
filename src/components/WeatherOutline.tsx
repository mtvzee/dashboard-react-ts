import { motion } from 'framer-motion';
import { WeatherData } from '../types/weather';

type Props = {
  weatherData: WeatherData | null;
  handleToggleData: () => void;
};

const WeatherOutline = ({ weatherData, handleToggleData }: Props) => {
  return (
    <motion.div
      key="outline"
      initial={{ opacity: 0, x: 1000 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 1000 }}
      transition={{ duration: 0.5 }}
      className="min-w-[100px] py-2 flex flex-col items-center bg-black/40 backdrop-blur-md rounded-md cursor-pointer relative gap-[35px]"
      onClick={handleToggleData}
    >
      <div>{weatherData?.name}</div>
      <img
        src={`https://api.openweathermap.org/img/w/${weatherData?.weather[0].icon.replace(
          'n',
          'd'
        )}.png`}
        alt="天気のマーク"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50px] h-[50px] object-cover"
      />
      <div>
        <span className="text-2xl">{weatherData?.main.temp.toFixed(1)}</span>℃
      </div>
    </motion.div>
  );
};

export default WeatherOutline;
