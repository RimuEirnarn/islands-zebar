import { formatNumber, getBatteryIcon } from "../../utils";

const DEFAULT = {
  isCharging: false,
  chargePercent: NaN
}

export default function Battery({ data = DEFAULT }) {
  const battery = data || DEFAULT
  const p = Math.min(100, Math.max(0, battery.chargePercent))

  return (
    <div className="battery">
      {/* Show icon for whether battery is charging. */}
      {/* {battery.isCharging && ( */}
      {/* <i className="nf nf-md-power_plug charging-icon"></i> */}
      {/* )} */}
      <div className="battery-width" style={{ width: `${p}%` }}></div>
      <span>
        {getBatteryIcon(battery)}
        {formatNumber(battery.chargePercent)}%
      </span>
    </div>
  )
}
