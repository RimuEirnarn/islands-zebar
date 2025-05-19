export default function DateIsland(date) {
  console.log("[zebar/date]", date)
  return <div className="center">
    <div>{date?.formatted || 'XXX XX XXX XX.XX.XX'}</div>&nbsp;
    <button type='button' className="kill" onClick={window.close}><i className="nf nf-md-close"></i>Exit</button>
  </div>
}