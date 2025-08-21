import {
  useState,
  useEffect,
} from 'react';
import PlaybackInfo from '../component/media/PlaybackInfo';
import PlaybackProgress from '../component/media/PlaybackProgress';
import PlaybackControl from '../component/media/PlaybackControl';

const VLC_BASE_URL = 'http://localhost:12345/vlc/requests/status.json'
const VLC_PLAYLIST = 'http://localhost:12345/vlc/requests/playlist.json'
const CONFIG_URL = 'http://localhost:12345/config.json'
const MAX_DURATION = 750

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
      console.debug("[Rimu/VLC] Fetching playlist (playlist.json)", obj)
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
      console.debug("[Rimu/VLC] Fetching data (status.json)", obj)
    } else {
      callbackset(DUMMY_MEDIA)
    }
  } catch (err) {
    callbackset(DUMMY_MEDIA)
  }
}

async function handleSeek(media, e) {
  if (!media || typeof media?.meta.length !== 'number') return

  const rect = e.currentTarget.getBoundingClientRect()
  const clickX = e.clientX - rect.left
  const width = rect.width
  const percent = clickX / width
  const seekTime = media.meta.length * percent

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
      progress: json.position || 0,
      length: json.length || 0
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



export default function MediaIsland({ isNight }) {
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
      timeout = setTimeout(fetchLoop, Math.max(0, MAX_DURATION - duration)); // wait 500ms AFTER fetch
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
  const seek = (e) => handleSeek(vlcMedia, e)

  // const NO_VLC = vlcMedia.title == DUMMY_MEDIA.title
  const NO_VLC = false
  return (
    <div className={`left ${NO_VLC ? 'disappear' : ''}`}>
      <div className={`confinement island ${isNight ? 'night' : ""}`}>
        {vlcMedia && (
          <>
            <div className={`playback ${NO_VLC ? 'disappear' : ''}`}>
              <PlaybackInfo media={vlcMedia} playlist={vlcPlaylist} />
              <PlaybackProgress progress={vlcMedia.meta.progress} onSeek={seek} isPlaying={vlcMedia.isPlaying} />
            </div>
            <PlaybackControl isPlaying={vlcMedia.isPlaying} plNext={plNext} plPrev={plPrev} tglPlay={tglPlay} shouldHide={NO_VLC}/>
          </>
        )}
      </div>
    </div>)
}
