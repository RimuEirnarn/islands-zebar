/**
 * Format to a beautiful float
 * @param {number} x
 * @returns
 */
function formatNumber(x) {
  if (x.hasOwnProperty('toFixed') || x.toFixed) return x.toFixed(2)
  return x
}

/**
 * Truncate the title depending on the length
 * @param {string} title
 * @param {number} length
 * @returns
 */
function truncate(title, length) {
  return title.length > length ? title.slice(0, length - 3) + '...' : title
}

// Get icon to show for current network status.
function getNetworkIcon(networkOutput) {
  const type = networkOutput?.defaultInterface?.type || "NULL"
  const signalStrength = networkOutput?.defaultGateway?.signalStrength || 0
  switch (type) {
    case 'ethernet':
      return <i className="nf nf-md-ethernet_cable"></i>;
    case 'wifi':
      if (signalStrength >= 80) {
        return <i className="nf nf-md-wifi_strength_4"></i>;
      } if (
        signalStrength >= 65
      ) {
        return <i className="nf nf-md-wifi_strength_3"></i>;
      } if (
        signalStrength >= 40
      ) {
        return <i className="nf nf-md-wifi_strength_2"></i>;
      } if (
        signalStrength >= 25
      ) {
        return <i className="nf nf-md-wifi_strength_1"></i>;
      }

      return <i className="nf nf-md-wifi_strength_outline"></i>;
    default:
      return (
        <i className="nf nf-md-wifi_strength_off_outline"></i>
      );
  }
}

// Get icon to show for how much of the battery is charged.
function getBatteryIcon(batteryOutput) {
  const chargePercent = batteryOutput?.chargePercent || 0
  if (chargePercent > 90)
    return <i className="nf nf-fa-battery_4"></i>;
  if (chargePercent > 70)
    return <i className="nf nf-fa-battery_3"></i>;
  if (chargePercent > 40)
    return <i className="nf nf-fa-battery_2"></i>;
  if (chargePercent > 20)
    return <i className="nf nf-fa-battery_1"></i>;
  return <i className="nf nf-fa-battery_0"></i>;
}

// Get icon to show for current weather status.
function getWeatherIcon(weatherOutput) {
  switch (weatherOutput?.status) {
    case 'clear_day':
      return <i className="nf nf-weather-day_sunny"></i>;
    case 'clear_night':
      return <i className="nf nf-weather-night_clear"></i>;
    case 'cloudy_day':
      return <i className="nf nf-weather-day_cloudy"></i>;
    case 'cloudy_night':
      return <i className="nf nf-weather-night_alt_cloudy"></i>;
    case 'light_rain_day':
      return <i className="nf nf-weather-day_sprinkle"></i>;
    case 'light_rain_night':
      return <i className="nf nf-weather-night_alt_sprinkle"></i>;
    case 'heavy_rain_day':
      return <i className="nf nf-weather-day_rain"></i>;
    case 'heavy_rain_night':
      return <i className="nf nf-weather-night_alt_rain"></i>;
    case 'snow_day':
      return <i className="nf nf-weather-day_snow"></i>;
    case 'snow_night':
      return <i className="nf nf-weather-night_alt_snow"></i>;
    case 'thunder_day':
      return <i className="nf nf-weather-day_lightning"></i>;
    case 'thunder_night':
      return <i className="nf nf-weather-night_alt_lightning"></i>;
  }
}

export { formatNumber, truncate, getNetworkIcon, getWeatherIcon, getBatteryIcon }
