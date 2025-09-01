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
  if (value < 1 && value > 0) return {value: formatNumber(value * 1000), unit: mapper(unit, false)}
  return {value: formatNumber(value), unit}
}

export default function Network({ data = DEFAULT }) {
  const network = data || DEFAULT
  const TX = network.traffic.transmitted
  const RX = network.traffic.received

  const rx = reTransmit(RX.siValue / 8, RX.siUnit)
  const tx = reTransmit(TX.siValue / 8, TX.siUnit)
  /** @type {string} */
  const _net = network?.defaultGateway?.ssid || "???"

  const net = _net.length <= 15 ? _net : _net.slice(0, 12).padEnd(15, '...')

  return (
    <div className="netgrid network">
    <div className="div1 net-info" title={`WiFi: ${_net}`}>
        {getNetworkIcon(network)}
        {net}
      </div>
      <div className="div2 netiogrid net-io">
        <span className="ndiv1 net-read">{rx.value} {rx.unit} ↓</span>
        <span className="ndiv2 net-write">{tx.value} {tx.unit} ↑</span>
      </div>
    </div>
  )
}
