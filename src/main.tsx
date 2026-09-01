import React, { useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const glyphs = "01#$%&*+-/:;<=>?@[]{}~";

function useLifeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const cell = 8;
    let width = 0;
    let height = 0;
    let columns = 0;
    let rows = 0;
    let frame = 0;
    let grid: Uint8Array = new Uint8Array();
    let next: Uint8Array = new Uint8Array();
    let animation = 0;

    const seed = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.floor(width * window.devicePixelRatio);
      canvas.height = Math.floor(height * window.devicePixelRatio);
      context.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
      columns = Math.ceil(width / cell);
      rows = Math.ceil(height / cell);
      grid = new Uint8Array(columns * rows);
      next = new Uint8Array(columns * rows);

      for (let index = 0; index < grid.length; index += 1) {
        grid[index] = Math.random() < 0.28 ? 1 : 0;
      }
    };

    const countNeighbors = (x: number, y: number) => {
      let count = 0;
      for (let yy = -1; yy <= 1; yy += 1) {
        for (let xx = -1; xx <= 1; xx += 1) {
          if (xx === 0 && yy === 0) continue;
          const nx = (x + xx + columns) % columns;
          const ny = (y + yy + rows) % rows;
          count += grid[ny * columns + nx];
        }
      }
      return count;
    };

    const draw = () => {
      frame += 1;
      context.fillStyle = "rgba(0, 0, 0, 0.28)";
      context.fillRect(0, 0, width, height);
      context.font = "12px 'Courier New', monospace";
      context.textBaseline = "top";

      for (let y = 0; y < rows; y += 1) {
        for (let x = 0; x < columns; x += 1) {
          const index = y * columns + x;
          const alive = grid[index] === 1;
          const neighbors = countNeighbors(x, y);
          next[index] = alive
            ? neighbors === 2 || neighbors === 3
              ? 1
              : 0
            : neighbors === 3
              ? 1
              : 0;

          if (alive) {
            const glyph = glyphs[(x * 7 + y * 13 + frame) % glyphs.length];
            context.fillStyle = neighbors === 3 ? "#eaffea" : "#22ff66";
            context.fillText(glyph, x * cell, y * cell);
          }
        }
      }

      [grid, next] = [next, grid];

      animation = requestAnimationFrame(draw);
    };

    seed();
    draw();
    window.addEventListener("resize", seed);

    return () => {
      cancelAnimationFrame(animation);
      window.removeEventListener("resize", seed);
    };
  }, []);

  return canvasRef;
}

function App() {
  const canvasRef = useLifeCanvas();

  return (
    <main className="site">
      <canvas className="life-canvas" ref={canvasRef} aria-hidden="true" />
      <div className="scanlines" aria-hidden="true" />

      <h1 className="prompt" aria-label="nickwoods at home prompt">
        nickwoods@home:-$<span className="cursor" aria-hidden="true" />
      </h1>
      <nav className="link-dock" aria-label="Elsewhere">
        <a href="https://github.com/NickWoods1" target="_blank" rel="noreferrer">
          ./github
        </a>
        <a
          href="https://uk.linkedin.com/in/nick-woods-6431588a"
          target="_blank"
          rel="noreferrer"
        >
          ./linkedin
        </a>
        <a href="https://letterboxd.com/nicktsmitw/" target="_blank" rel="noreferrer">
          ./letterboxd
        </a>
        <a href="#tv-letterboxd" aria-disabled="true" title="Coming soon">
          ./letterboxd_tv [soon]
        </a>
      </nav>
    </main>
  );
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
