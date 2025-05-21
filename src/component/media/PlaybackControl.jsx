/**
 *
 * @param {boolean} playbackStatus
 * @param {() => Promise<void>} callback
 * @returns
 */
function getPlaybackIcon(playbackStatus, callback) {
  return playbackStatus ? <i className="nf nf-fa-pause playback-toggle" onClick={callback}></i>
    : <i className="nf nf-fa-play playback-toggle" onClick={callback}></i>
}

export default function PlaybackControl({ isPlaying, tglPlay, plPrev, plNext }) {
  return (
    <div className='playback-control'>
      <i className="nf nf-md-skip_previous playback-prev" onClick={plPrev}></i>
      {getPlaybackIcon(isPlaying, tglPlay)}
      <i className="nf nf-md-skip_next playback-next m0-right" onClick={plNext}></i>
    </div>
  )
}
