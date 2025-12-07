"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface Particle {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
  color: string
}

interface HexagonNode {
  id: number
  x: number
  y: number
  delay: number
}

interface ConnectionLine {
  id: number
  x1: number
  y1: number
  x2: number
  y2: number
  delay: number
}

const colors = [
  'rgba(67, 217, 173, 0.4)',  // primary
  'rgba(77, 91, 206, 0.4)',   // purple
  'rgba(233, 69, 96, 0.3)',   // red
  'rgba(255, 172, 51, 0.3)',  // orange
]

export function AnimatedBackground() {
  const [particles, setParticles] = useState<Particle[]>([])
  const [hexNodes, setHexNodes] = useState<HexagonNode[]>([])
  const [connections, setConnections] = useState<ConnectionLine[]>([])

  useEffect(() => {
    // Generate glowing particles
    const newParticles: Particle[] = []
    for (let i = 0; i < 40; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 6 + 2,
        duration: Math.random() * 15 + 8,
        delay: Math.random() * 8,
        color: colors[Math.floor(Math.random() * colors.length)],
      })
    }
    setParticles(newParticles)

    // Generate hexagon network nodes
    const newNodes: HexagonNode[] = []
    for (let i = 0; i < 12; i++) {
      newNodes.push({
        id: i,
        x: Math.random() * 90 + 5,
        y: Math.random() * 90 + 5,
        delay: Math.random() * 3,
      })
    }
    setHexNodes(newNodes)

    // Generate connection lines
    const newConnections: ConnectionLine[] = []
    for (let i = 0; i < 8; i++) {
      newConnections.push({
        id: i,
        x1: Math.random() * 100,
        y1: Math.random() * 100,
        x2: Math.random() * 100,
        y2: Math.random() * 100,
        delay: Math.random() * 5,
      })
    }
    setConnections(newConnections)
  }, [])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Morphing blob shapes */}
      <motion.div
        animate={{
          borderRadius: [
            "60% 40% 30% 70%/60% 30% 70% 40%",
            "30% 60% 70% 40%/50% 60% 30% 60%",
            "60% 40% 30% 70%/60% 30% 70% 40%",
          ],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-gradient-to-br from-primary/15 to-[#4d5bce]/10 blur-[80px]"
      />
      <motion.div
        animate={{
          borderRadius: [
            "30% 70% 70% 30%/30% 30% 70% 70%",
            "70% 30% 30% 70%/70% 70% 30% 30%",
            "30% 70% 70% 30%/30% 30% 70% 70%",
          ],
          rotate: [360, 180, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-1/3 left-1/4 w-[500px] h-[500px] bg-gradient-to-tr from-[#4d5bce]/10 to-accent/10 blur-[100px]"
      />
      <motion.div
        animate={{
          borderRadius: [
            "40% 60% 60% 40%/40% 40% 60% 60%",
            "60% 40% 40% 60%/60% 60% 40% 40%",
            "40% 60% 60% 40%/40% 40% 60% 60%",
          ],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/2 right-1/3 w-[300px] h-[300px] bg-gradient-to-bl from-[#e94560]/8 to-primary/8 blur-[80px]"
      />

      {/* Hexagon network nodes */}
      {hexNodes.map((node) => (
        <motion.div
          key={node.id}
          className="absolute"
          style={{ left: `${node.x}%`, top: `${node.y}%` }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.6, 0.3, 0.6, 0],
            scale: [0.5, 1, 0.8, 1, 0.5],
            rotate: [0, 60, 120, 180, 240],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            delay: node.delay,
            ease: "easeInOut",
          }}
        >
          <svg width="40" height="40" viewBox="0 0 40 40">
            <polygon
              points="20,2 36,10 36,30 20,38 4,30 4,10"
              fill="none"
              stroke="rgba(67, 217, 173, 0.3)"
              strokeWidth="1"
            />
          </svg>
        </motion.div>
      ))}

      {/* Animated connection lines */}
      <svg className="absolute inset-0 w-full h-full">
        {connections.map((conn) => (
          <motion.line
            key={conn.id}
            x1={`${conn.x1}%`}
            y1={`${conn.y1}%`}
            x2={`${conn.x2}%`}
            y2={`${conn.y2}%`}
            stroke="rgba(67, 217, 173, 0.1)"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: [0, 1, 1, 0],
              opacity: [0, 0.5, 0.5, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              delay: conn.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </svg>

      {/* Glowing orb particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            width: particle.size,
            height: particle.size,
            background: `radial-gradient(circle, ${particle.color} 0%, transparent 70%)`,
            boxShadow: `0 0 ${particle.size * 3}px ${particle.color}`,
          }}
          initial={{
            x: `${particle.x}vw`,
            y: `${particle.y}vh`,
            opacity: 0,
          }}
          animate={{
            x: [
              `${particle.x}vw`,
              `${particle.x + (Math.random() * 20 - 10)}vw`,
              `${particle.x}vw`,
            ],
            y: [
              `${particle.y}vh`,
              `${particle.y + (Math.random() * 20 - 10)}vh`,
              `${particle.y}vh`,
            ],
            opacity: [0, 1, 0.5, 1, 0],
            scale: [0.5, 1.5, 1, 1.5, 0.5],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Circular wave ripples */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-primary/10"
          style={{
            left: `${30 + i * 20}%`,
            top: `${40 + i * 10}%`,
          }}
          initial={{ width: 0, height: 0, opacity: 0.5 }}
          animate={{
            width: [0, 300, 500],
            height: [0, 300, 500],
            opacity: [0.3, 0.1, 0],
            x: [0, -150, -250],
            y: [0, -150, -250],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            delay: i * 2.5,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Floating brackets and code symbols */}
      {['<', '>', '{', '}', '/', '*', '=', '=>'].map((symbol, i) => (
        <motion.div
          key={i}
          className="absolute font-mono text-2xl text-primary/10 select-none"
          style={{
            left: `${10 + i * 11}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{
            y: [0, -30, 0],
            rotate: [0, 10, -10, 0],
            opacity: [0.05, 0.2, 0.05],
          }}
          transition={{
            duration: 6 + i,
            repeat: Infinity,
            delay: i * 0.8,
            ease: "easeInOut",
          }}
        >
          {symbol}
        </motion.div>
      ))}

      {/* DNA helix animation */}
      <div className="absolute right-10 top-1/4 h-1/2">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute flex items-center gap-8"
            style={{ top: `${i * 8}%` }}
            animate={{
              x: [0, 20, 0, -20, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
          >
            <motion.div
              className="w-2 h-2 rounded-full bg-primary/20"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.15,
              }}
            />
            <div className="w-12 h-[1px] bg-gradient-to-r from-primary/20 to-transparent" />
            <motion.div
              className="w-2 h-2 rounded-full bg-[#4d5bce]/20"
              animate={{ scale: [1.5, 1, 1.5] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.15,
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* Radar sweep */}
      <div className="absolute bottom-20 left-20 w-32 h-32">
        <motion.div
          className="absolute inset-0 rounded-full border border-primary/20"
          animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.1, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.div
          className="absolute inset-0 origin-center"
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute top-1/2 left-1/2 w-1/2 h-[2px] bg-gradient-to-r from-primary/40 to-transparent origin-left" />
        </motion.div>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="w-2 h-2 rounded-full bg-primary/50"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        </div>
      </div>

      {/* Noise overlay */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Vignette effect */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(1,12,21,0.4) 100%)',
        }}
      />
    </div>
  )
}
