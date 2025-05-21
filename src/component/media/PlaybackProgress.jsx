export default function PlaybackProgress({ progress, onSeek, isPlaying }) {
  return (
    <div className="vlc-progress-container-child" onClick={onSeek}>
      <div className={`vlc-progress-bar ${isPlaying ? 'pulse' : 'paused'}`} style={{ width: `${Math.min(100, Math.max(0, progress * 100))}%` }}></div>
      <div className="vlc-progress-hover"></div>
    </div>
  )
}
