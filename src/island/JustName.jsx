export default function JustName({ isNight }) {
  return <div className={`left ${isNight ? 'night-glow' : ''}`}>
    <h2 className="cutesy">Rimu Aerisya / LUNA</h2>
  </div>
}
