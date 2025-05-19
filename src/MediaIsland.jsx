import {
  useState,
  useEffect,
} from 'react';
import { truncate, formatNumber } from "./utils"

const MAX_PLAYBACK_LENGTH = 55
const VLC_BASE_URL = 'http://localhost:12345/vlc/requests/status.json'
const VLC_PLAYLIST = 'http://localhost:12345/vlc/requests/playlist.json'
const CONFIG_URL = 'http://localhost:12345/config.json'


const DUMMY_MEDIA = {
  title: "VLC Interface is offline",
  meta: {
    name: "VLC Interface is offline",
    progress: 0,
    length: 0
  },
  isPlaying: false
}

async function vlcCommand(command) {
  try {
    const res = await fetch(`${VLC_BASE_URL}?command=${command}`)
    if (!res.ok) throw new Error(`Command failed: ${command}`)
  } catch (err) {
    console.error(`[VLC] Failed to send command '${command}':`, err)
  }
}

async function vlcFetchPlaylist(callbackset) {
  if (callbackset === undefined) throw new Error("[Rimu/VLC Playlist] Undefined callback")
  try {
    const res = await fetch(VLC_PLAYLIST)

    if (res.ok) {
      const obj = await makeVlcPlaylistObj(res)
      callbackset(obj)
      console.log("[Rimu/VLC] Fetching playlist (playlist.json)", obj)
    } else {
      callbackset(null)
    }
  } catch (err) {
    callbackset(null)
  }
}

async function vlcFetch(callbackset) {
  if (callbackset === undefined) throw new Error("[Rimu/VLC] Undefined callback")
  try {
    const res = await fetch(`${VLC_BASE_URL}`)

    if (res.ok) {
      const obj = await makeVlcObject(res)
      callbackset(obj)
      console.log("[Rimu/VLC] Fetching data (status.json)", obj)
    } else {
      callbackset(DUMMY_MEDIA)
    }
  } catch (err) {
    callbackset(DUMMY_MEDIA)
  }
}

async function handleSeek(e) {
  if (!vlcMedia || typeof vlcMedia?.meta.length !== 'number') return

  const rect = e.currentTarget.getBoundingClientRect()
  const clickX = e.clientX - rect.left
  const width = rect.width
  const percent = clickX / width
  const seekTime = vlcMedia.meta.length * percent

  try {
    await vlcCommand(`seek&val=${Math.floor(seekTime)}`)
    console.log(`[Rimu/VLC] Seek to ${seekTime}s`)
  } catch (err) {
    console.error('[Rimu/VLC] Seek failed', err)
  }
}

async function togglePlayPause(baseset, playset) {
  await vlcCommand('pl_pause')
  await vlcFetch(baseset)
  await vlcFetchPlaylist(playset)
}

async function playNext(baseset, playset) {
  await vlcCommand('pl_next')
  await vlcFetch(baseset)
  await vlcFetchPlaylist(playset)
}

async function playPrevious(callbackset, playset) {
  await vlcCommand('pl_previous')
  await vlcFetch(callbackset)
  await vlcFetchPlaylist(playset)
}

function getCurrentPlaylistIndex(name, playlist) {

  let index = 0
  for (let value of playlist) {
    if (value.name == name) return index;
    index += 1
  }
  return -1
}

async function makeVlcObject(res) {
  const json = await res.json()
  const meta = json.information?.category?.meta || {}
  const title = meta.title || 'Unknown Title'
  const artist = meta.artist || ''
  const isPlaying = json.state === 'playing'

  return {
    title: artist ? `${artist} - ${title}` : title,
    meta: {
      name: title,
      progress: json.position || NaN,
      length: json.length || NaN
    },
    isPlaying
  }
}

async function makeVlcPlaylistObj(res) {
  const json = await res.json()
  const children = json.children[0].children;
  const mapped = []
  children.forEach(value => {
    mapped.push({
      name: value.name,
      duration: value.duration
    })
  })
  return mapped
}

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

export default function MediaIsland() {
  const [vlcMedia, setMedia] = useState(DUMMY_MEDIA)
  const [vlcPlaylist, setVlcPlaylist] = useState(null)


  useEffect(() => {
    let isMounted = true;
    let timeout;

    const fetchLoop = async () => {
      await vlcFetchPlaylist(setVlcPlaylist); // do your thing
      if (!isMounted) return;
      timeout = setTimeout(fetchLoop, 5000); // wait 5000ms AFTER fetch
    };

    fetchLoop(); // kick it off

    return () => {
      isMounted = false;
      clearTimeout(timeout);
    };
  }, [])

  useEffect(() => {
    let isMounted = true;
    let timeout;

    const fetchLoop = async () => {
      const start = performance.now()
      await vlcFetch(setMedia); // do your thing
      const duration = performance.now() - start
      if (!isMounted) return;
      timeout = setTimeout(fetchLoop, Math.max(0, 200 - duration)); // wait 500ms AFTER fetch
    };

    fetchLoop(); // kick it off

    return () => {
      isMounted = false;
      clearTimeout(timeout);
    };
  }, [])

  const plNext = () => playNext(setMedia, setVlcPlaylist)
  const plPrev = () => playPrevious(setMedia, setVlcPlaylist)
  const tglPlay = () => togglePlayPause(setMedia, setVlcPlaylist)

  return (
    <div className="left">
      <div className='confinement'>
        {vlcMedia && (
          <>
            <div className="playback">
              <div className="playback-info">
                <i className="nf nf-md-music_note"></i> {truncate(vlcMedia.title, MAX_PLAYBACK_LENGTH)} | {formatNumber(vlcMedia.meta.progress * 100)}% {`(${vlcPlaylist ? getCurrentPlaylistIndex(vlcMedia.meta.name, vlcPlaylist) : -1}/${vlcPlaylist?.length || -1})`}
              </div>
              <div className="vlc-progress-container-child" onClick={handleSeek}>
                <div className={`vlc-progress-bar ${vlcMedia.isPlaying ? 'pulse' : 'paused'}`} style={{ width: `${Math.min(100, Math.max(0, vlcMedia.meta.progress * 100))}%` }}></div>
                <div className="vlc-progress-hover"></div>
              </div>
            </div>
            <div className='playback-control'>
              <i className="nf nf-md-skip_previous playback-prev" onClick={plPrev}></i>
              {getPlaybackIcon(vlcMedia.isPlaying, tglPlay)}
              <i className="nf nf-md-skip_next playback-next m0-right" onClick={plNext}></i>
            </div>
          </>
        )}
      </div>
    </div>)
}