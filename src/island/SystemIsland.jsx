import Battery from "../component/system/Battery";
import CPU from "../component/system/CPU";
import Memory from "../component/system/Memory";
import Network from "../component/system/Network";
// import Weather from "../component/system/Weather";

const DEFAULT = {}

export default function SystemIsland(proc) {
  const output = proc.network ? proc : DEFAULT

  const { network, memory, cpu, battery, weather, isNight } = output
  return <div className={`right island ${isNight ? 'night' : ""}`}>
    <Network data={network}/>
    <div className="n2rowgrid">
      <Memory data={memory} className="ndiv1"/>
      <CPU data={cpu} className="ndiv2"/>
    </div>
    <Battery data={battery}/>
    {/* <Weather data={weather}/> */}
  </div>
}
