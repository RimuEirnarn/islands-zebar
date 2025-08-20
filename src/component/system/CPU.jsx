import { formatNumber } from "../../utils"

const DEFAULT = {
  usage: NaN
}

export default function CPU({ data = DEFAULT }) {
  const cpu = data || DEFAULT

  return (
    <div className="cpu">
      <i className="nf nf-oct-cpu"></i>

      {/* Change the text color if the CPU usage is high. */}
      <span
        className={cpu.usage > 75 ? 'high-usage' : ''}
      >
        {formatNumber(cpu.usage)}% [CPU]
      </span>
    </div>
  )
}
