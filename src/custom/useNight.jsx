// hooks/useNightMode.ts
import { useEffect, useState } from "react";

export default function useNightMode() {
  const [isNight, setIsNight] = useState(false);

  useEffect(() => {
    const checkTime = () => {
      const hour = new Date().getHours();
      setIsNight(hour >= 21 || hour < 5);
      // setIsNight(true)
    };

    checkTime();
    const interval = setInterval(checkTime, 60 * 1000); // check every minute

    return () => clearInterval(interval);
  }, []);

  return isNight;
}
