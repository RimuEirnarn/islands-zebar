// components/Stars.tsx
import { useEffect, useRef } from "react";

export default function Stars({ isNight }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!isNight || !canvasRef.current) return;

    const canvas = canvasRef.current;
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

      animationId = requestAnimationFrame(draw);
    };

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    draw();

    return () => cancelAnimationFrame(animationId);
  }, [isNight]);

  if (!isNight) return null;
  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: -1,
        pointerEvents: "none",
      }}
    />
  );
}
