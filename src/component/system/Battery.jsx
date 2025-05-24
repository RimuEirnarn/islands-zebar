import { formatNumber, getBatteryIcon } from "../../utils";

const DEFAULT = {
  isCharging: false,
  chargePercent: NaN
}

export default function Battery({ data = DEFAULT }) {
  const battery = data || DEFAULT

  return (
    <div className="battery">
      {/* Show icon for whether battery is charging. */}
      {battery.isCharging && (
        <i className="nf nf-md-power_plug charging-icon"></i>
      )}
      {getBatteryIcon(battery)}
      {formatNumber(battery.chargePercent)}%
    </div>
  )
}
