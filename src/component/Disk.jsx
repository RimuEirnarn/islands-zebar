export default function Disk(prop) {
  const { mount, total, avail, type, tUnit, aUnit } = prop

  return <div>
    {mount} [{total - avail} {aUnit}/{total} {tUnit} | {type}]
  </div>
}