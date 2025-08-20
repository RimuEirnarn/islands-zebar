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

  return (
    <div className={`center island ${isNight ? 'night-glow' : ""} ${clickable ? 'clickable' : ''}`} onClick={click}>
      <img className="profile-img" src="/public/5296ae24d121972a1c031fca5fdbb7a0.jpg" alt="profile" width={size} height={size} />
      <div className={`sysgrid ${clickable ? 'clickable' : ""}`}>
        <div className="sysgrid-span">
          <div className="clock">{timed}</div>
          <div className="date">{output.formatted}</div>
        </div>
      </div>
    </div>)
}
