// hooks/useNightMode.ts
import { useEffect, useState } from "react";

function duringNight() {
  const hour = new Date().getHours()
  return hour >= 19 || hour < 5
}

function useNightMode() {
  const [isNight, setIsNight] = useState(false);

  useEffect(() => {
    const checkTime = () => {
      setIsNight(duringNight());
    };

    checkTime();
    const interval = setInterval(checkTime, 60 * 1000); // check every minute

    return () => clearInterval(interval);
  }, []);

  return [isNight, setIsNight];
}

export { duringNight, useNightMode }
