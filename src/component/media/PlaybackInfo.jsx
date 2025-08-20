import { truncate, formatNumber } from "../../utils";

const MAX_PLAYBACK_LENGTH = 55

function getCurrentPlaylistIndex(name, playlist) {

  let index = 0
  for (let value of playlist) {
    if (value.name == name) return index + 1;
    index += 1
  }
  return -1
}

export default function PlaybackInfo({ media, playlist }) {
  return (
    <div className="playback-info">
      <i className="nf nf-md-music_note"></i> {truncate(media.title, MAX_PLAYBACK_LENGTH)} | {formatNumber(media.meta.progress * 100)}% {`(${playlist ? getCurrentPlaylistIndex(media.meta.name, playlist) : -1}/${playlist?.length || -1})`}
    </div>
  )
}
