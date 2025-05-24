import { getWeatherIcon } from "../../utils";

const DEFAULT = {
  status: "clear_day",
  celsiusTemp: NaN
}

export default function Weather({ data = DEFAULT }) {
  const weather = data || DEFAULT

  return (
    <div className="weather">
      {getWeatherIcon(weather)}
      {Math.round(weather.celsiusTemp)}°C
    </div>
  )
}
