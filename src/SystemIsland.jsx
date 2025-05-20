import Battery from "./component/Battery";
import CPU from "./component/CPU";
import Memory from "./component/Memory";
import Network from "./component/Network";
import Weather from "./component/weather";

const OUTPUT_DEFAULT = {
  disk: {
    disks: [{
      mountPoint: "A:\\",
      totalSpace: {
        siValue: NaN,
        siUnit: "kB"
      },
      availableSpace: {
        siValue: NaN,
        siUnit: 'kB'
      },
      drive: "???"
    }]
  }
}

export default function SystemIsland(proc) {
  const output = proc.network ? proc : OUTPUT_DEFAULT

  const { network, memory, cpu, battery, weather } = output
  return <div className="right">
    <Network data={network}/>
    <Memory data={memory}/>
    <CPU data={cpu}/>
    <Battery data={battery}/>
    <Weather data={weather}/>
  </div>
}
