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

export default function Network({ data = DEFAULT }) {
  const network = data || DEFAULT

  return (
    <div className="network">
      <div className="net-info">
        {getNetworkIcon(network)}
        {network.defaultGateway.ssid}
      </div>
      <div className="net-io">
        <span className="net-read">{formatNumber(network.traffic.received.siValue / 8)} {network.traffic.received.siUnit} ↓</span>&nbsp;
        <span className="net-write">{formatNumber(network.traffic.transmitted.siValue / 8)} {network.traffic.transmitted.siUnit} ↑</span>
      </div>
    </div>
  )
}
