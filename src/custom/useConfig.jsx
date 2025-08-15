import { useState, useEffect } from "react"

const URL = "http://localhost:9999/config.json"

const EXAMPLE_CFG = {
  left: "media",
  center: "data",
  right: "system"
}
const CONFIG_INTERVAL = 5 // seconds

async function fetcher() {
  const data = await fetch(URL)
  if (!data.ok) throw new Error("Cannot reach for config");
  return await data.json()
}

function useConfig() {
  const [config, setConfig] = useState(EXAMPLE_CFG)

  useEffect(async () => {
    let timeout;

    const looper = async () => {
      try {
        setConfig(await fetcher())
      } catch (e) {
        console.error(e)
        setConfig(EXAMPLE_CFG)
      }
      timeout = setTimeout(looper, CONFIG_INTERVAL * 1000)
    }

    looper()
    return () => {
      clearTimeout(timeout)
    }
  }, [])

  return [config, setConfig]
}

export { useConfig }
