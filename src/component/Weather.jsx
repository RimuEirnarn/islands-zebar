import { getWeatherIcon } from "../utils";

const DEFAULT = {
  status: "clear_day",
  celsiusTemp: NaN
}

export default function Weather(proc) {
  const weather = proc?.data?.status ? proc.data : DEFAULT

  return (
    <div className="weather">
      {getWeatherIcon(weather)}
      {Math.round(weather.celsiusTemp)}°C
    </div>
  )
}
