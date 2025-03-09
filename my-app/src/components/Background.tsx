import { useCallback } from "react";
import Particles from "react-tsparticles";
import type { Engine } from "tsparticles-engine";
import { loadFull } from "tsparticles";

interface Props {
  children: React.ReactNode;
}

const Background = ({ children }: Props) => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  return (
    <>
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fullScreen: {
            enable: true,
            zIndex: -1,
          },
          background: {
            color: "#0f172a",
          },
          fpsLimit: 120,
          particles: {
            color: {
              value: ["#9333EA", "#6366F1", "#A855F7"],
            },
            links: {
              color: "#6366F1",
              distance: 150,
              enable: true,
              opacity: 0.3,
              width: 1,
            },
            collisions: { enable: true },
            move: {
              direction: "none",
              enable: true,
              outModes: { default: "bounce" },
              random: true,
              speed: 1,
              straight: false,
            },
            number: {
              density: { enable: true, area: 800 },
              value: 80,
            },
            opacity: {
              value: 0.5,
              animation: { enable: true, speed: 1, minimumValue: 0.1 },
            },
            shape: { type: ["circle", "triangle", "star"] },
            size: {
              value: { min: 1, max: 3 },
              animation: { enable: true, speed: 2, minimumValue: 0.1 },
            },
          },
          interactivity: {
            events: {
              onClick: { enable: true, mode: "push" },
              onHover: { enable: true, mode: "repulse" },
              resize: true,
            },
            modes: {
              push: { quantity: 4 },
              repulse: { distance: 100, duration: 0.4 },
            },
          },
          detectRetina: true,
        }}
      />
      <div className="relative z-10">{children}</div>
    </>
  );
};

export default Background;