import { formatNumber } from "../utils"

const DEFAULT = {
  usage: NaN
}

export default function Memory(proc) {
  const memory = proc?.data?.usage ? proc.data : DEFAULT

  return (
    <div className="memory">
      <i className="nf nf-fae-chip"></i>
      <span className={memory.usage > 75 ? 'high-usage' : ''}>
        {formatNumber(memory.usage)}%
      </span>
    </div>
  )
}
