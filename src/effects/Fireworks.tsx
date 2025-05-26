import { Fireworks } from "@fireworks-js/react";
import type { FireworksHandlers } from '@fireworks-js/react'
import { useEffect, useRef } from "react";


export const UFireworks = ({playing}: {playing: boolean}) => {
    const ref = useRef<FireworksHandlers>(null)

    const toggle = () => {
        if (!ref.current) return
        if (ref.current.isRunning) {
          ref.current.waitStop()
        } else {
          ref.current.start()
        }
      }
      

      useEffect(() => {
        toggle();
      }, [playing]);

      useEffect(() => {
        if (ref.current && ref.current.isRunning) {
        ref.current.stop();
        }
      }, []);


    return ( 
        <Fireworks
        ref={ref}
        options={{ opacity: 1,
        acceleration: 1.05,
        friction: 0.97,
        gravity: 1.5,
        particles: 500,
        traceLength: 3,
        traceSpeed: 10,
        explosion: 5,
        intensity: 30,
        flickering: 50,
        lineStyle: "square",
        }}
        style={{
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        position: 'fixed',
        pointerEvents: 'none',
        zIndex: 5000,
        }}
        />
    )}