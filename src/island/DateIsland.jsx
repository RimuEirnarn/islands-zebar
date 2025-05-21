const DEFAULT_OBJ = {
  date: {
    formatted: "XXX XX XXX XX.XX.XX"
  }
}

export default function DateIsland(out) {
  const output = out.date ? out : DEFAULT_OBJ

  const { date } = output
  return <div className="center">
    <div>{date.formatted}</div>
  </div>
}