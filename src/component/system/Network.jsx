import { getNetworkIcon, formatNumber } from "../../utils"


const DEFAULT = {
  defaultInterface: {
    type: null
  },
  defaultGateway: {
    ssid: "Unknown",
    signalStrength: ""
  },
  traffic: {
    received: {
      siValue: NaN,
      siUnit: "kB"
    },
    transmitted: {
      siValue: NaN,
      siUnit: "kB"
    }
  }
}

const MAP = {
  kB: [" B", "MB"],
  MB: ["kB", "GB"],
  GB: ['MB', "PB"]
}

/**
 * mapper unit into desired unit type
 * @param {string} unit
 * @param {boolean} up
 */
function mapper(unit, up) {
  if (!(unit in MAP)) return "??"
  return MAP[unit][Number(up)]
}

/**
 * Retransmit number into different unit value
 * @param {number} value
 * @param {string} unit
 * @returns
 */
function reTransmit(value, unit) {
  if (value < 1 && value > 0) return {value: formatNumber(value * 100), unit: mapper(unit, false)}
  return {value: formatNumber(value), unit}
}

export default function Network({ data = DEFAULT }) {
  const network = data || DEFAULT
  const TX = network.traffic.transmitted
  const RX = network.traffic.received

  const rx = reTransmit(RX.siValue / 8, RX.siUnit)
  const tx = reTransmit(TX.siValue / 8, TX.siUnit)

  return (
    <div className="network">
      <div className="net-info">
        {getNetworkIcon(network)}
        {network?.defaultGateway?.ssid || "Unknown"}
      </div>
      <div className="net-io">
        <span className="net-read">{rx.value} {rx.unit} ↓</span>&nbsp;
        <span className="net-write">{tx.value} {tx.unit} ↑</span>
      </div>
    </div>
  )
}
