// components/Stars.tsx
import { useEffect, useRef, useState } from "react";

export default function Stars({ isNight }) {
  const canvasRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const fadingOut = useRef(false);
  const opacityRef = useRef(1);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationId;
    let stars = Array.from({ length: 100 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.5,
      o: Math.random(),
      d: Math.random() * 0.02,
    }));

    const draw = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((star) => {
        ctx.beginPath();
        ctx.globalAlpha = star.o;
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.fill();

        star.o += star.d;
        if (star.o <= 0 || star.o >= 1) star.d = -star.d;
      });

      if (fadingOut.current) {
        opacityRef.current -= 0.01;
        if (opacityRef.current <= 0) {
          cancelAnimationFrame(animationId);
          fadingOut.current = false;
          opacityRef.current = 1;
          setVisible(false);
          return;
        }
      }

      animationId = requestAnimationFrame(draw);
    };

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    draw();

    return () => cancelAnimationFrame(animationId);
  }, [isNight]);

  // Watch isNight changes
  useEffect(() => {
    if (isNight) {
      setVisible(true);
      fadingOut.current = false;
      opacityRef.current = 1;
    } else {
      fadingOut.current = true;
    }
  }, [isNight]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: -1,
        pointerEvents: "none",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.5s ease-in-out"
      }}
    />
  );
}
