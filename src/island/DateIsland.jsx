const DEFAULT_OBJ = {
  formatted: "XXX XX XXX XX.XX.XX"
}

export default function DateIsland({ date, isNight, click, clickable }) {
  const output = date?.formatted ? date : DEFAULT_OBJ

  return <div className={`center island ${isNight ? 'night-glow' : ""} ${clickable ? 'clickable' : ''}`} onClick={click}>
    <div className={`${clickable ? 'clickable' : ""}`}>{output.formatted}</div>
  </div>
}
