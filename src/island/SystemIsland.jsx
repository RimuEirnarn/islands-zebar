import Battery from "../component/system/Battery";
import CPU from "../component/system/CPU";
import Memory from "../component/system/Memory";
import Network from "../component/system/Network";
import Weather from "../component/system/Weather";

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
