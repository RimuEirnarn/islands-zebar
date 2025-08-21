import {
  useState,
  useEffect,
} from 'react';
import MediaIsland from "./island/MediaIsland"
import DateIsland from "./island/DateIsland"
import SystemIsland from "./island/SystemIsland"
import { useNightMode, duringNight } from './custom/useNight';
import { useConfig } from './custom/useConfig';
import Stars from './custom/Stars';
import * as zebar from 'zebar';

const providers = zebar.createProviderGroup({
  host: { type: 'host' },
  network: { type: 'network' },
  cpu: { type: 'cpu' },
  date: { type: 'date', formatting: 'EEEE, d/MM' },
  battery: { type: 'battery' },
  memory: { type: 'memory' },
  weather: { type: 'weather' },
  audio: { type: 'audio' },
  media: { type: 'media' },
});

export default function App() {
  const [output, setOutput] = useState(providers.outputMap)
  const [config, setConfig] = useConfig()
  const [isNight, setNight] = useNightMode()

  useEffect(() => {
    providers.onOutput(() => setOutput(providers.outputMap));
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const data = await (await fetch(`http://localhost:9100/mem?ts=${Date.now()}`)).json()
        console.log("[Rimu/Restart Service] Webview RAM Usage: ", data.memory_mb, "MB")
        if (data.memory_mb > 1024) {
          alert("Zebar child mem has reached 1GB, attempting process kill")
          await fetch(`http://localhost:9100/kill?ts=${Date.now()}`)
        }
      } catch (e) {
        console.error("[Rimu/Restart Service] service unavailable", e)
      }
    }, 1000 * (60 * 5))

    return () => clearInterval(interval)
  }, [])

  function toggleNight() {
    if (!duringNight) return;
    return setNight(!isNight)
  }

  return (
    <div className={`sys-root ${isNight ? 'sys-night' : ''}`}>
      <div className='sys-div1 scooped-box'></div>
      <Stars isNight={isNight} />
      <div className={`sys-div2 app ${isNight ? 'night' : ''}`}>
        <MediaIsland isNight={isNight} />
        <DateIsland date={output.date} isNight={isNight} click={toggleNight} clickable={true} />
        <SystemIsland
          isNight={isNight}
          network={output.network}
          memory={output.memory}
          cpu={output.cpu}
          battery={output.battery}
          weather={output.weather}
        />
      </div>
      <div className='sys-div3 scooped-box'></div>
    </div>)
}
