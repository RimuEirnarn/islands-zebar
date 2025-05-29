const DEFAULT_OBJ = {
  formatted: "XXX XX XXX XX.XX.XX"
}

export default function DateIsland({ date, isNight }) {
  const output = date?.formatted ? date : DEFAULT_OBJ

  return <div className={`center island ${isNight ? 'night-glow' : ""}`}>
    <div>{output.formatted}</div>
  </div>
}
