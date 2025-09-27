import { useEffect, useState } from "react"
import SystemPrompt from "../component/system/SystemPrompt"

const DEFAULT_OBJ = {
  formatted: "XXX XX XXX XX.XX.XX"
}


/**
 *
 * @param {number} num
 */
function pad(num) {
  return num.toString().padStart(2, '0')
}

export default function DateIsland({ date, isNight, click, clickable }) {
  const output = date?.formatted ? date : DEFAULT_OBJ
  const _s = new Date()
  const _timed = {
    h: pad(_s.getHours()),
    m: pad(_s.getMinutes()),
    s: pad(_s.getSeconds())
  }
  const timed = `${_timed.h}.${_timed.m}.${_timed.s}`
  const size = 35;
  const [pr, set_pvisibility] = useState({ use: false, mi: false })

  useEffect(() => {
    const interval = setInterval(() => {
      set_pvisibility((prev => ({ use: !prev.use, mi: !prev.use })))
    }, 1000 * (30))
    return () => clearInterval(interval)
  }, [])

  return (
    <div className={`center island ${isNight ? 'night-glow' : ""} ${pr.use ? 'expand-4rem' : 'shrink-4rem'}`}>
      <img className={`profile-img ${clickable ? 'clickable' : ''}`}
        src="/public/5296ae24d121972a1c031fca5fdbb7a0.jpg"
        alt="profile"
        width={size}
        height={size}
        onClick={click} />
      <div className={`sysgrid ${clickable ? 'clickable' : ""}`}>
        <div className={`sysgrid-span ${pr.use ? 'anim-hidden' : ''}`}>
          <div className="clock">{timed}</div>
          <div className="date">{output.formatted}</div>
        </div>
        <div className={`sysgrid-span ${pr.use ? 'text-expand' : 'text-shrink'}`}> <SystemPrompt /> </div>
      </div>
    </div>)
}
