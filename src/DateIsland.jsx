const DEFAULT_OBJ = {
  date: {
    formatted: "XXX XX XXX XX.XX.XX"
  }
}

export default function DateIsland(out) {
  const output = out.date ? out : DEFAULT_OBJ

  const { date } = output
  return <div className="center">
    <div>{date.formatted}</div>&nbsp;
    <button type='button' className="kill" onClick={window.close}><i className="nf nf-md-close"></i>Exit</button>
  </div>
}