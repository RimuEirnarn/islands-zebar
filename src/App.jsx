import {
  useState,
  useEffect,
} from 'react';
import MediaIsland from "./MediaIsland"
import DateIsland from "./DateIsland"
import SystemIsland from "./SystemIsland"
import * as zebar from 'zebar';

const providers = zebar.createProviderGroup({
  host: { type: 'host' },
  network: { type: 'network' },
  cpu: { type: 'cpu' },
  date: { type: 'date', formatting: 'EEE d MMM TT' },
  battery: { type: 'battery' },
  memory: { type: 'memory' },
  weather: { type: 'weather' },
  audio: { type: 'audio' },
  media: { type: 'media' }
});

export default function App() {
  const [output, setOutput] = useState(providers.outputMap);

  useEffect(() => {
    providers.onOutput(() => setOutput(providers.outputMap));
  }, []);

  console.log(output)
  return (
    <div className="app">
      <MediaIsland />
      <DateIsland date={output.date} />
      <SystemIsland
        network={output.network}
        memory={output.memory}
        cpu={output.cpu}
        battery={output.battery}
        weather={output.weather}
      />
    </div>)
}