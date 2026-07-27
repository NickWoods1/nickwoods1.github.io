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

      for (let y = 0; y < rows; y += 1) {
        for (let x = 0; x < columns; x += 1) {
          const ring = Math.sin(x * 0.31) + Math.cos(y * 0.23);
          const staticNoise = Math.sin((x * y + x + y) * 12.9898) * 43758.5453;
          grid[y * columns + x] =
            ring > 1.06 || staticNoise - Math.floor(staticNoise) > 0.79 ? 1 : 0;
        }
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

    const drawFractal = () => {
      context.save();
      context.translate(width * 0.74, height * 0.52);
      context.strokeStyle = "rgba(227, 255, 227, 0.52)";
      context.lineWidth = 1;

      const branch = (length: number, depth: number) => {
        if (depth <= 0) return;
        context.beginPath();
        context.moveTo(0, 0);
        context.lineTo(0, -length);
        context.stroke();
        context.translate(0, -length);
        const twist = Math.sin(frame * 0.018 + depth) * 0.22;
        context.save();
        context.rotate(0.48 + twist);
        branch(length * 0.68, depth - 1);
        context.restore();
        context.save();
        context.rotate(-0.62 + twist);
        branch(length * 0.63, depth - 1);
        context.restore();
      };

      branch(Math.min(width, height) * 0.13, 9);
      context.restore();
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

      if (frame % 137 === 0) {
        const cx = Math.floor(columns * (0.2 + ((frame / 137) % 5) * 0.13));
        const cy = Math.floor(rows * (0.25 + ((frame / 89) % 4) * 0.12));
        for (let y = -3; y <= 3; y += 1) {
          for (let x = -3; x <= 3; x += 1) {
            grid[((cy + y + rows) % rows) * columns + ((cx + x + columns) % columns)] = 1;
          }
        }
      }

      drawFractal();
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

function RecursiveBox({ depth }: { depth: number }) {
  if (depth === 0) {
    return <span className="kernel">nick@home:~$</span>;
  }

  return (
    <div className="recursive-box">
      <RecursiveBox depth={depth - 1} />
    </div>
  );
}

function App() {
  const canvasRef = useLifeCanvas();

  return (
    <main className="site">
      <canvas className="life-canvas" ref={canvasRef} aria-hidden="true" />
      <div className="scanlines" aria-hidden="true" />

      <header className="topline">
        <a href="/">nickwoods1.github.io</a>
        <nav aria-label="site">
          <a href="#signal">signal</a>
          <a href="#loops">loops</a>
          <a href="#contact">contact</a>
        </nav>
      </header>

      <section className="terminal-window" id="signal" aria-labelledby="title">
        <div className="window-chrome">
          <span>root</span>
          <span>chaos mode</span>
          <span>v0.0.1</span>
        </div>
        <div className="terminal-grid">
          <div>
            <p className="prompt">/home/nick/public_html</p>
            <h1 id="title">nick woods</h1>
            <p className="boot-text">
              personal site as unfinished machine. black screen, green signal,
              recursive junk drawer, browser toys, little haunted systems.
            </p>
            <div className="command-row">
              <a href="https://github.com/nickwoods1">./github</a>
              <a href="mailto:nickw9000@gmail.com">./email</a>
              <a href="#loops">./enter_loop</a>
            </div>
          </div>
          <RecursiveBox depth={7} />
        </div>
      </section>

      <section className="module-strip" id="loops" aria-label="future modules">
        {["game_of_life", "fractal_tree", "ascii_oracle", "broken_links"].map(
          (module, index) => (
            <article className="module-card" key={module}>
              <span>0{index + 1}</span>
              <h2>{module}</h2>
              <p>
                {index % 2 === 0
                  ? "running in the background. mutates when ignored."
                  : "placeholder for something dumb enough to become useful."}
              </p>
            </article>
          ),
        )}
      </section>

      <footer className="footer" id="contact">
        <span>last updated whenever</span>
        <span>view-source encouraged</span>
      </footer>
    </main>
  );
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
