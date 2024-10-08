import React from 'react'
import Particles from 'react-tsparticles'
import { loadFull } from "tsparticles";

export const Background = () => {
    const particlesInit = async (main) => {
        console.log(main);
     
        // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
        // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
        // starting from v2 you can add only the features you need reducing the bundle size
        await loadFull(main);
      };
     
      const particlesLoaded = (container) => {
        console.log(container);
      };
  return (
    <div className=' background-container'>
        <Particles
            id="tsparticles"
            init={particlesInit}
            loaded={particlesLoaded}
            options={{
            background: {
              color: '#000000',
            },
            fpsLimit: 40,
            interactivity: {
              detectsOn: 'canvas',
              events: {
                resize: true
              },
            },
            particles: {
              color: {
                value: "#f1f1f1"
              },
              move: {
              speed: 10,
              direction: "none",
              outModes: {
                default: "bounce"
              }
             },
              number: {
                density: {
                  enable: true,
                  area: 1080
                },
                limit: 0,
                value: 500,
              },
              opacity: {
                animation: {
                  enable: true,
                  minimumValue: 0.5,
                  speed: 6,
                  sync: false,
                },
                random: {
                  enable: true,
                  minimumValue: 0.1,
                },
                value: 1,
              },
              shape: {
                type: 'circle',
       
              },
              size: {
                random: {
                  enable: true,
                  minimumValue: 0.5
                },
                value: 1.2
              }
            }
          }}
        />
    </div>
  )
}
export default Background